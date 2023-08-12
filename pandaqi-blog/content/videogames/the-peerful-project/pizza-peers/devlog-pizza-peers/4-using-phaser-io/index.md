---
title: 'Using Phaser.io'
thumbnail_media: '../../pizza-peers-static.png'
tags: ["devlog"]
date: 2020-04-29 13:00:00
---

This is part 4 in my article series about how I created "Pizza Peers".

Haven't read the other entries? Go to the [devlog overview](../).

So far, we've created a system that allows connecting to a server,
creating a room, and then directly connecting all players within that
room (via peer-to-peer).

Now we just need a game that can send and receive information over those
connections.

For browser games, there's really no better option than the free
**Phaser** library. I've been using it since the day it was created, and
it's only gained popularity (and features) since then.

(This surprised me a bit, to be honest. Feels like ages ago that I first
learnt how to make browser games. I almost feel like a proud daddy who
watched his kid grow and become one of the most used gaming libraries.)

I must say, however, that I haven't used Phaser the past couple of
years. (For the simple reason that I wasn't creating browser games.)
Since then, version 3 was released, which made a ton of changes to the
overall design and structure of the framework.

After using it for this game, I must say that Phaser is still awesome
and that version 3 is again a leap forward! However, because it was my
first time working with v3, my code probably can't be called "optimized"
or "best practice".

Anyway, let's get started!

*Remark:* By default, Phaser is a 2D library, but there are extensions
for 3D in which I have a great interest. Hopefully I'll be able to try
these out soon and report the results.

Initializing the game
---------------------

I usually make the game full screen by putting it inside an absolutely
positioned \<div\> element.

The rest of the webpage functions as an "overlay" on top of that.

This is one great advantage of browser games: they can use **canvas**
and **regular website stuff** combined. For example, creating buttons,
or links, or responsive UIs is *really* easy in website code. So I'd
rather place those things in an overlay with minimal effort, than try to
recreate it inside Phaser.

So, all the buttons for "create game" and "join game" and all that jazz
are default HTML code. They are within the overlay and I will not
discuss them here.

Once "create game" is pressed, however, a function "startPhaser()" is
called that does the following: 

{{< highlight Javascript >}}
function startPhaser(connection) {
  // initialize Phaser game
  // inside a div with id "phaser-game"
  var config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    backgroundColor: '#8EB526',
    parent: 'phaser-game',
    scene: [MainGame, GameOver],
    physics: {
        default: 'arcade',
        arcade: { 
          debug: false,
        }
    },
    pixelArt: true,
    antialias: false,
  }

  // create the game and save it in a GLOBAL variable, accessible anywhere
  window.GAME = new Phaser.Game(config); 

  // Start both scenes (the "gameOver" scene also holds the welcome screen and lobby screen)
  GAME.scene.start('mainGame', { roomCode: connection.room });
  GAME.scene.start('gameOver', {});
}
{{< /highlight >}}

<!-- {{< gist Pandaqi a151bd4fecd00c4e91aa1d8629acc770 >}} -->

You'll see here that **GAME** is a global variable. This is just an easy
way to make it accessible in all modules -- you can do this differently
if you want to. Global variables are generally bad practice.

Phaser works with **scenes**, which you can also view as "modules" or
"components". You can have as many scenes active as you like, you can
toggle them on/off when you want, etcetera. If you want, you can
structure your code to the extreme, creating a single scene for every
bit of functionality. But we'll keep it simple here.

The scenes **mainGame** and **gameOver** do what you think they do. We
will not look at the game over scene, as it's not interesting (and the
source code is extremely self-explanatory).

Instead, over the course of the next few articles, we'll look at the
critical parts of the "main game".

Communication with p2p
----------------------

How do we communicate over the internet?

Well, we need a two-way street:

-   When a certain **player** does something, we want to send a message
    over the corresponding **peer**.

-   When we receive a message from a **peer**, we want to relay that to
    the corresponding **player**.

During the game, we must keep a list that allows us to easily convert
player \<=\> peer.

-   The game keeps a list of all players. When we create a new player,
    we save its **index** in the list on the peer.

    -   Yes, this means that the player list may never change order, but
        that's a workable constraint.

-   Conversely, once the player is created, we save the **peer** on the
    player.

    -   This is easy: "player.myPeer = peer"

The addPlayer function becomes something like this: 

{{< highlight Javascript >}}
addPlayer: function(peer) {
  // determine a random position for the player ...

  // create new player (use graphics as base, turn into sprite within player group)
  var newPlayer = this.playerBodies.create(randX, randY, 'dude');

  // save player in array
  this.players.push(newPlayer);

  // save player index on peer
  peer.playerGameIndex = (this.players.length - 1);

  // and save peer on the player
  newPlayer.myPeer = peer;

  // ... and create a bunch of properties, settings, visual effects, and stuff for the player here
},
{{< /highlight >}}

<!-- {{< gist Pandaqi 60311f3acc1935e4ba6d977f34ae1133 >}} -->

**NOTE:** The variable **this.players = \[\]** is initialized when the
scene is created. I'll remind you again when we talk about randomly
generating the city and game world.

Now, whenever we *receive* a signal, we can convert the peer to the
corresponding player.

And whenever we want to *send* a signal, we can convert the player to
its peer.

That's, in essence, all that is needed to communicate between the game
and the p2p signals.

Moving players
--------------

To hammer home the concept, let me give you an example of the most basic
input in the game: movement. (Which is also the first thing I
implemented and tested.)

The smartphone sends a message to the computer (using their p2p
connection). This message contains a movement vector.

The computer receives this message and calls "updatePlayer()", which is
a very simple function: 

{{< highlight Javascript >}}
// vec = a 2D movement vector; 
// vec[0] is movement over the X-axis, vec[1] over the Y-axis

updatePlayer: function(peer, vec) {
  // ... do some error checking to make sure the player exists and vector is valid ...

  // grab the player (because we know the peer!)
  var player = this.players[peer.playerGameIndex];

  // just move the player according to velocity vector
  player.setVelocity(vec[0] * speed, vec[1] * speed);

  // ... animate some stuff here, dust particles when moving, etc ...
},
{{< /highlight >}}

<!-- {{< gist Pandaqi db5c5842772525758dd4df6420a095b8 >}} -->

**That's it!**

Well, we're not completely done yet. I still haven't shown you how to
create the interface on the phone and send these messages. Guess what:
we're going to do that in part 5!

See you there.