---
title: 'WebSockets + Node.js server'
thumbnail_media: '../../pizza-peers-static.png'
tags: ["devlog"]
date: 2020-04-29 11:00:00
---

This is part 2 in my article series about how I created "Pizza Peers".

Haven't read the other entries? Go to the [devlog overview](../).

So, first things first, we need:

-   A server that hosts our game (and serves the game files)

-   A server that receives connections from both the players and the
    computer, so that it can *connect* them directly. (Once connected,
    the whole game goes via peer-to-peer.)

Obviously, we'll use the same server for both these things.

**IMPORTANT REMARK:** In these articles, I will not show the full code
(as it's too complicated and specific, thus not so good for teaching or
explaining). Instead, I give a template and some pseudo-code where
needed. If you want to implement these things yourself, check out the
source code for all the details and exceptions.

Node.js
-------

For the server side, we'll use Node.js. It is simple and small, it uses
JavaScript (which we'll also use in the game itself), and I have some
experience with it.

Below is the template for this server. It simply sets up a server that
servers both static files (which are the game files) and accepts
websocket connections (which are needed to connect players with the
computer). 

{{< highlight javascript >}}
process.title = 'pizza-peers';
var webSocketsServerPort = process.env.PORT || 8888;

var WebSocketServer = require('websocket').server;
var http = require('http');

// stuff for creating an app that is a WEBSOCKET and also serves STATIC FILES
var WebSocketServer = require('websocket').server;
var express         = require('express');
var app             = express();
var server          = app.listen(webSocketsServerPort, function() {
	console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

// create the web socket server (using the HTTP server as a basis)
var wsServer        = new WebSocketServer({ httpServer : server });

// this will make Express serve your static files (from the folder /public)
app.use(express.static(__dirname + '/public'));

// Global variable that contains all games currently being played!
var rooms = {}

// WebSocket server
wsServer.on('request', function(request) {
	// accept the connection
	var connection = request.accept(null, request.origin);

	// The most important callback: we'll handle all messages from users here.
	connection.on('message', function(message) {
		// @TODO: Any message sent to the server is handled here
	});

	// user connection closed
	connection.on('close', function(connection) {
    // if you want, you can use this space to delete games and free up space once a game has ended
	});
});
{{< /highlight >}}

<!-- {{< gist Pandaqi 1d5c9db5d60fb0612bd94cb6f29c6202 >}} -->

Of course, all the magic is going to happen in that "on(message)" block.

Peer to Peer
------------

Which messages do we need to send? For that, we need to understand how
peer-to-peer works.

Instead of creating a connection with the *server*, a peer connection is
a direct connection *between two devices*. So, once established, your
smartphone has a direct link with the computer (that hosts the game),
and vice versa. This is what makes it so incredibly quick and easy.

However, we cannot allow devices to just establish connections as they
please. That would not be very secure.

Instead, there's a handshake protocol we need to follow:

-   Device A wants to connect with device B

-   A creates a peer (on their side) and sends out an **offer**

-   B receives the offer, creates its own peer, and formulates a
    **response**.

-   Once A has received and validated the response, both are officially
    connected.

For generating the offer and response signals, I use the [simple-peer](https://github.com/feross/simple-peer)
library. I don't need to understand what it's doing with
those signals or what all the information means, and neither do you. I
just pass the signals along.

Speaking about that: we've encountered an issue. A needs to send an
offer to B. But ... they are not connected yet. How is A going to find
B?

That's where our WebSockets come in!

Signaling server
----------------

In order to exchange signals, we turn our server into a so-called
"signaling server".

The idea is very simple:

-   A generates a signal and sends it to the server.

-   The *server* determines the intended recipient and relays the
    signal.

-   B receives it, creates a response, sends it back.

-   The *server* determines that the response must return to A.

-   And voila, peer to peer connection!

So, at our server, we need a way to receive and pass on messages.

In my case, this is even more simplified:

-   The *player* (with the smartphone) is always the initiator of the
    connection.

-   The *computer* (that hosts the game) is always the one responding.

See the code below for the basic structure of this system. (It will make
even more sense once we've created the client side.) 

{{< highlight javascript >}}
// WebSocket server
wsServer.on('request', function(request) {
	// accept the connection
	var connection = request.accept(null, request.origin);

	// create a persistent variable for our roomID; means we don't need to look it up all the time, which is faster
	var roomID = -1;
	var isServer = false;

	// The most important callback: we'll handle all messages from users here.
	connection.on('message', function(message) {

		//
		// if this message is a CREATE ROOM message
		//
		if(message.action == "createRoom") {
			// generate a (non-existing) ID
			var id = generateID();

			// insert it into rooms (effectively creating a new room)
			// each room simply knows which socket is the server, and which are the players
			rooms[id] = {
				"server": connection,
				"players": [],
				"gameStarted": false
			};

			// remember our roomID
			roomID = id;

			// rember we function as a server
			isServer = true;

			// beam the room number back to the connection
			connection.sendUTF(JSON.stringify({ "type": "confirmRoom", "room": roomID }));

		//
		// if this message is a JOIN ROOM message
		//
		} else if(message.action == "joinRoom") {
			// which room should we join?
			var roomToJoin = message.room

			// what is the player username?
			var usn = message.username

			// add this player to that room
			rooms[roomToJoin].players[usn] = connection;

			// remember we joined the room
			roomID = roomToJoin;

			// we want to connect with the server (peer-to-peer)
			// for this, the player generates an "invitation" or "offer"
			// it sends this along with the message
			var offer = message.offer;

			// append the USERNAME of the client extending the offer
			// (otherwise, the server doesn't know to whom the response needs to be send)
			offer.clientUsername = usn;

			// now relay this offer to the server
			rooms[roomToJoin].server.sendUTF(JSON.stringify(offer));

		//
		// if this message is an OFFER RESPONSE
		//
		} else if(message.action == "offerResponse") {
			// get the client that should receive it
			var receivingClient = message.clientUsername

			// get the response
			var offerResponse = message.response;

			// send the response
			rooms[roomID].players[receivingClient].sendUTF(JSON.stringify(offerResponse));
	});
});
{{< /highlight >}}

<!-- {{< gist Pandaqi bf2c6215922a302a042126bb60c245c3 >}} -->

In fact, this is almost *all* the code on the server. The only thing I
added in the real game is more robust error handling and handling some
extra cases/exceptions.

Client side - Websockets
------------------------

So far, we've created the server only. It accepts web sockets and passes
along signals ... but we still need a client side to actually create
those web sockets and signals.

I assume you know how to set up a basic HTML page. If not, check out
index.html in my source code.

Then, make sure the JavaScript below is run (*once the page has finished
loading*): 

{{< highlight javascript >}}
// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

// assuming a https connection here, otherwise use "ws://"
host = 'wss://' + location.host;

// this creates the connection and keeps a reference to it
var connection = new WebSocket(host);

var curPeer = null;

// if browser doesn't support WebSocket, just show some notification and exit
if (!window.WebSocket) {
  updateStatus('Sorry, but your browser doesn\'t support WebSocket.');
  return;
}

connection.onopen = function () {
  // connection is opened and ready to use
};

connection.onerror = function (error) {
  // an error occurred when sending/receiving data, display error message
};

connection.onmessage = function (message) {
  // parse message
  message = JSON.parse(message.data);

  // if it's a confirmation of the created game (room) ...
  if(message.type == 'confirmRoom') {
    // start the actual game (Phaser.io)
  }

  // if it's an OFFER ...
  if(message.type == 'offer') {
    // Create new peer; initiator = false (you'll learn about this later)
    curPeer = createPeer(...);

    // delete some info from the message (to save bandwidth)
    delete message.clientUsername;

    // put this signal into our peer (should be the last one we created)
    // (when it has formulated an answer, it will automatically send that back)
    curPeer.signal(message);
  }

  // if it's a RESPONSE to an offer
  if(message.type == 'answer') {
    // simply relay it to the peer
    // we should be a player, who only has a single peer active
    // (NOTE: if accepted, ALL communication henceforth should be peer-to-peer)
    curPeer.signal(message);
  }
};

// Listen to button for CREATING games
document.getElementById("createGameBtn").addEventListener('click', function(ev) {
    // Send a message to the websocket server, creating a game and opening ourselves to connections
    var msg = { "action": 'createRoom' } 
    connection.send( JSON.stringify(msg) );
});

// Listen to button for JOINING games
document.getElementById("joinGameBtn").addEventListener('click', function(ev) {
    // Create peer; initiator = true (again, you'll learn about this soon)
    // NOTE: Once the peer is done and it can start pairing, it will inform the websocket server
    curPeer = createPeer(...);
});
{{< /highlight >}}

<!-- {{< gist Pandaqi 33474e8bda094296af95e6b8d53a367d >}} -->

This bit of code opens the web socket connection, then listens for
responses from the server. When necessary, it creates a new peer.

The "peer.signal(...)" bit will be explained soon. Essentially, we just
pass the "signal message" directly into the peer and let it formulate
its response. (Remember when I told you that I don't know what's inside
those signals? Those things are put in here.)

**NOTE:** All messages are JSON. However, we cannot (and don't want to)
send objects over the internet. So, before sending, we must always
*stringify* the object. At the receiving end, we always *parse* it, so
it returns to the original JSON object.

Almost done ...
---------------

All the code above still does not complete our system for connecting --
so don't try to run out -- but we're very close.

This is what we've achieved so far:

-   A server that servers our game files.

-   A server that accepts socket connections, gets messages, and then
    relays them to the right connection.

-   A client side that connects with the server, and also sends/receives
    the right messages, and creates the proper peers when needed.

All that's left to do, is actually create the peers. For that, see you
at part 3!