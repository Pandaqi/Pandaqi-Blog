---
title: 'Peer to peer connections'
thumbnail_media: '../../pizza-peers-static.png'
tags: ["devlog"]
date: 2020-04-29 12:00:00
---

This is part 3 in my article series about how I created "Pizza Peers".

Haven't read the other entries? Go to the [devlog overview](../).

As stated earlier, I used the [simple-peer](https://github.com/feross/simple-peer/)
library. It's free, it's small, just grab it from GitHub and include it
at the top of your index.html page.

In the code from the previous article, you saw the function "createPeer()". In this article
we'll actually write that function.

Creating peers
--------------

The code below creates the peer and then attaches the proper listeners
(just like everything we've done before).

The "on(data)" call is where all the magic happens. As said before, once
the connection is established, *all* communication goes via that
listener and *none* of it uses the server anymore. 

{{< highlight Javascript >}}
function createPeer(initiator, connection) {
  var peer = new SimplePeer({
    initiator: initiator,
    trickle: false,
    config: { iceServers: [/* read my bit about ICE and how peer to peer works */] },
  })

  // here we can attach some variables to the peer regarding game state, such as ...
  peer.isConnected = false;
  peer.hasDisconnected = false;
  peer.gameOver = false;

  peer.on('error', function(err) {
    // do something with the error
    console.log('error', err);
  })

  peer.on('close', function() {
    // do something when a peer closes/disconnects, perhaps
  })

  // this function is called when the peer wants to SEND OUT a signal
  // we call p.signal(...) => the peer starts to formulate a response => once done, it triggers this event (where data is the new signal)
  peer.on('signal', function(data) {
    // if it's an OFFER, push it to the websocket (along with joinRoom credentials)
    if(data.type == 'offer') {
      var roomVal = document.getElementById('roomInput').value.toUpperCase();
      var usn = document.getElementById('usernameInput').value.toUpperCase();

      var message = { "action": 'joinRoom', "room": roomVal, "username": usn,"offer": data }
      connection.send( JSON.stringify(message) );
    }

    // If it's an ANSWER, push it to the websocket
    if(data.type == 'answer') {
      var message = { "action": "offerResponse", "clientUsername": peer.curClientUsername, "response": data }
      connection.send( JSON.stringify(message) );
    }
  })

  peer.on('connect', function() {
    // remember we're connected
    peer.isConnected = true;

    // if we were the initiator of a connection, we are a PLAYER
    if(initiator) {
      // @TODO: initialize our interface (on the phone)!

    // otherwise, we're the computer
    } else {
      // add player into the game
    }
  })

  peer.on('data', function(data) {
    // parse the message
    data = JSON.parse(data);

    // now DO something
  })

  return peer;
}
{{< /highlight >}}

<!-- {{< gist Pandaqi 9553ee6e7646bc140bd4c0f77bcba4f4 >}} -->

At the top of the function you can see the actual peer being created.

The option "initiator" is true for players (because they *initiate* the
connection), and false for the computer.

**NOTE:** The player only creates a single peer and then tries to
connect with the computer. The computer creates a *new* peer for every
player that wants to connect! That's also why we can save variables on
the peers relating to the specific player (such as its username or index
in the game), because every player has a unique peer.

Remember: peer-to-peer is always a direct two-way connection between two
peers. If you add a third player, for example, and want to connect
everyone with everyone, you'd need to create *two peers per player*.

(I emphasize this, because it's the reason it took me a whole day to get
simple peers working. I didn't fully understand what it did, what the
"initiator" meant, and what ICE servers are. So, read on before you make
the same mistake!)

ICE Servers
-----------

The option "iceServers" requires some more explanation.

As said before, allowing any device to reach any other device is not
very secure (and sometimes very hard to do). Thus, in some cases, you
need so-called **STUN** and **TURN** servers to establish the
connection.

-   A STUN server basically acts as a mirror and allows a computer to
    find out its own IP-address, by bouncing a signal off of it.

-   A TURN server is simply a middleman: it relays your signals directly
    to the other person.

As such, STUN servers are free and easy to get, because they barely do
anything. TURN servers, on the other hand, will relay tons of data every
second and are very expensive.

Luckily, these servers are rarely needed (perhaps 85-90% of the
connections work without them).

Even better: **if you are on the same Wi-Fi, you should never need
them**. You can just leave this option empty and it should work. (In the
final version of Pizza Peers, I did acquire a free STUN and TURN server,
just to cover all bases. But it's not necessary for a *local* game.)

What now?
---------

All the code seen so far should be enough to connect to a server (and
serve the game files), create a room, and allow players to create
peer-to-peer connections within that room.

This is just the basic structure for networking. There's no game or
anything yet.

That's our next stop along this adventure!

We'll now look at the following elements:

-   Starting and managing a game using Phaser.io

-   Sending data from the game through a peer.

-   The reverse: receiving data in a peer and sending it to the game.

-   Creating the mobile interface =\> how to listen for input and other
    things to keep in mind.

-   Creating the actual game =\> I won't talk about everything, just the
    interesting bits like random city and kitchen generation

See you at part 4!