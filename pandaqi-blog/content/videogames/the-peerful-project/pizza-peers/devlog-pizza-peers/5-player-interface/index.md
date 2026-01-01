---
title: 'Player interface'
thumbnail_media: '../../pizza-peers-static.png'
tags: ["devlog"]
date: 2020-04-29 14:00:00
---

This is part 5 in my article series about how I created "Pizza Peers".

Haven't read the other entries? Go to the [devlog overview](../).

Now that we can communicate with the game over the internet, we need an
*interface* to make this communication easy and intuitive.

At the end of the previous article, I showed you the "updatePlayer()"
function. We'll be creating the interface for that in this article.

(The rest of the interface consists of buttons, buttons, and even more
buttons. I'll give one example of how such a button works, and that
should be enough.)

Receiving signals
-----------------

In the previous article, I showed you how the *game* could send and
receive signals.

Now I'll show you how the *player* (the one holding the smartphone) can
do this.

Remember the "on(data)" listener we placed on the peer? The one I told
you would do all the magic? Well, that was no understatement.

It actually handles all signals for both computer and player. It's just
that the computer needs an extra step to relay this information to the
in-game objects.

The code below is all placed within the on(data) listener on the peer.

This code is for buying ingredients. The first statement actually
performs the buying action within the game. The second is triggered when
a player *enters* a buying location, the third when that player *leaves*
the location again. 

{{< highlight javascript >}}
//
// This signal is handled by the computer
// gm = a reference to the mainGame scene within Phaser
//

// player has requested to BUY an ingredient
if(data.type == 'buy') {
  gm.buyAction(peer);
}

// 
// These signals are both handled by the player
//

// player is at an INGREDIENT location
if(data.type == 'ing') {
  // create the button
  var button = document.createElement("button");
  button.classList.add('buyButton');
  button.innerHTML = "Buy " + data.ing + " for " + data.price + "";

  // append to dynamic interface
  document.getElementById('dynamicInterface').appendChild(button);

  // add event handler
  // when we click this button ...
  button.addEventListener ("click", function() {
    // we buy the ingredient for that price!
    // (the computer should remember the offer it made)
    var msg = { 'type':'buy' }
    peer.send( JSON.stringify(msg) );
  });
}

// player has moved away from an INGREDIENT location 
// so clear the interface
if(data.type == 'ing-end') {
  document.getElementById('dynamicInterface').innerHTML = '';
}
{{< /highlight >}}

<!-- {{< gist Pandaqi d7b1fd9b15c034849239b78dcf573253 >}} -->

**NOTE:** Even though computers and players use *different parts*, it's
all collected within the same listener. (A player will simply never
received a "buy" event, so it will always ignore that if-statement.)

Anything you want to happen within the game, just use the structure
above. Make up the signals you need and send/receive them on the peer.
If it's the computer, relay the signal to the game object (if needed).

Moving players, again
---------------------

Phones do not have a joystick, or moving parts at all for that matter. I
also don't want to emulate a keyboard and print a bunch of (arrow) keys
on the screen.

So, how do we allow 360 degree movement on the smartphone? Well, I chose
the simplest route: **simply treat the whole screen as the joystick**.

Whenever you touch the screen, it calculates the vector between the
*center of the screen* and your *touch*, and that's your movement.

The code below is all you need.

(In the full code I also allow using a non-touch screen to control the
game, but I want to keep it simple. I mainly allowed mouse input because
it made testing much quicker on my laptop.) 

{{< highlight javascript >}}
// the current peer connected with this (smartphone) interface
var curPeer = null;

function startController(peer) {
  // save reference to our peer
  curPeer = peer;

  gameDiv.addEventListener('touchstart', onTouchEvent);
  gameDiv.addEventListener('touchmove', onTouchEvent);
  gameDiv.addEventListener('touchend', onTouchEvent);
  gameDiv.addEventListener('touchcancel', onTouchEvent);

  // insert movement image at the center
  // (it rotates to show how you're currently moving)
  document.getElementById('movementArrow').style.display = 'block';
}

function onTouchEvent(e) {
  var x = 0, y = 0;

  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
    // these coordinates are not available when touch ends
    // because, well, there's no touch anymore
    if(e.type == 'touchstart' || e.type == 'touchmove') {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    }

    // prevent default behaviour + bubbling from touch into mouse events
    e.preventDefault();
    e.stopPropagation();
  }

  // if the interaction has ENDED, reset vector so player becomes static
  // don't do anything else
  if(e.type == 'touchend' || e.type == 'touchcancel') {
    var msg = { 'type': 'move', 'vec': [0,0] };
    curPeer.send( JSON.stringify(msg) );

    return false;
  }

  // get center of screen
  var w  = document.documentElement.clientWidth, 
      h  = document.documentElement.clientHeight;
  var cX = 0.5*w, 
      cY = 0.5*h;

  // get vector between position and center, normalize it
  var length = Math.sqrt((x-cX)*(x-cX) + (y-cY)*(y-cY))
  var vector = [(x - cX)/length, (y - cY)/length];

  // rotate movement arrow to match
  var angle = Math.atan2(vector[1], vector[0]) * 180 / Math.PI;
  if(angle < 0) { angle += 360; }
  document.getElementById('movementArrow').style.transform = 'rotate(' + angle + 'deg)';

  // send this vector across the network
  var message = { 'type': 'move', 'vec': vector }
  curPeer.send( JSON.stringify(message) );

  return false;
}
{{< /highlight >}}

<!-- {{< gist Pandaqi fe547cf4a78b0a8b1460b62821f3228b >}} -->

All we need to do to send a signal, is call ``peer.send( message )``.

The message is, again, stringified JSON. We can put in any properties we
like, but I recommend keeping it as small and simple as possible. You
don't want to waste any bandwidth with online games.

What now?
---------

You might be thinking: woah, it's that simple? Why doesn't everyone use
this technique if it offers realtime (online) multiplayer?

(If you weren't thinking that, well, eh, I'm gonna continue this line of
thought anyway.)

Of course, there are downsides to this. There are things you simply
cannot do and exceptions you need to take into account every step of the
way.

The next article will talk about those!