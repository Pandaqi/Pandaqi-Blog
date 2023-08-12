---
title: 'Problems with P2P'
thumbnail_media: '../../pizza-peers-static.png'
tags: ["devlog"]
date: 2020-04-29 15:00:00
---

This is part 6 in my article series about how I created "Pizza Peers".

Haven't read the other entries? Go to the [devlog overview](../).

So, let's talk about our current setup:

-   The game is started on a single computer. This computer is the host
    and also the boss about any game logic.

-   Phones can connect to this computer and directly send input.

As I created "Pizza Peers", the big problem with this setup gradually
came to light: **the game is basically played on X screens
simultaneously**.

If you have 4 players, there are 5 screens that need to be updated
(players + computer host). Most importantly, they need to **stay in
sync**.

Let's say you are standing at a table to drop an ingredient (for your
pizza). Another player comes in and swiftly drops his own backpack on
the table, just before you pressed your button.

What happens now? Is your input ignored? Are both your inputs valid? Do
I need to update your screen every time something changes at the table,
and how do I do that?

And what if one of the players disconnects? A few articles ago, I
mentioned the importance of keeping the player list intact, because we
use it to convert the *peer* to the corresponding *player*.

Let's see how I tackled these problems. I don't know if it's the best
way, but it's *a* way.

Syncing players
---------------

Synchronizing players and keeping an online multiplayer game "fair" is
one of the hardest things to do. I've tried it several times and still
fail to grasp some of the concepts.

(For example, a large part of it has to do with the server being ahead
of all the players and being able to go backward/forward in time to
evaluate the game state for a given player at a given timestamp. Yeah,
try to code that.)

**Fortunately**, we do not need this. Because there is a *single screen*
on which the game is played and hosted, we do not need to update the
whole game on multiple screens.

All we need to do, is update the *interface* on each smartphone to match
the current game state.

Because updates are (as good as) instant, we don't need to be careful
about this either.

In the final game, I simply do the following:

-   Player A stands at a table and changes something.

-   Now the game checks if any other players are at the same table.

-   If so, it sends out a message to all of them with the *new*
    composition of the table.

I've had several games where two or three players were using the same
table, and it never led to issues.

Of course, you do need to be very diligent with **error checking**
within the game. Before any transaction, check if players are allowed to
do this transaction. Don't blindly assume that input is correct by any
means.

For example, whenever someone tries to update a table, I *always* check
the following things first:

-   Is this player valid?

-   Is this player actually at this specific table?

-   Is the ingredient he wants to add a valid ingredient? (Not all
    numbers correspond to a valid pizza.)

-   Is he allowed to do this (given the current ingredients on the
    table)?

-   (And sometimes even more)

So far, this has never errored or caused glitches. Whenever somebody
changes a table, everyone connected to it is instantly updated on the
new game state.

The same principle applies to all other things.

**A good alternative** would be to change your game's design. Simply do
not *allow* more than one player to use something. Limitations like that
often lead to cleaner, less error-prone, more elegant games designs.

**Another alternative** is a sort of "voting" system. If the game is
uncertain about the reality or current state of things, it simply polls
all players. The value that occurs most often is deemed the right one.
(Really, in such a tiny local multiplayer game this doesn't matter.
Might even add to the fun.)

Smartphone weirdness
--------------------

A huge drawback with creating a browser game, is that all browsers have
their own ideas about how things should work.

I've created many games that worked flawlessly on my device or browser,
but completely broke down elsewhere. Sometimes, the fix was simple (add
a vendor prefix to the CSS or look up when a certain JavaScript feature
was introduced).

But sometimes I found out the hard way that I had to redo all my code,
because a browser simply didn't *have* a feature or implemented it *in
the complete opposite way*.

Things to keep in mind are:

-   Vendor prefixes in CSS

-   JavaScript versions and supported functionality.

-   Supported file types (e.g. for audio)

-   Different screen sizes: usually best to use "overflow:hidden" (never
    allow scrolling on the interface) and minimize the use of dynamic
    elements that might mess with your size (such as images, videos,
    blocks that appear/disappear, ...)

-   Apple is annoying. They only update Safari when they release a new
    version/new product, and they are often late to the party on all
    features.

-   Try to include *every single property* in your CSS. Why? Because
    each browser and device has a different *default look* for buttons,
    input, links, etc. You want the game and interface to look
    consistent.

-   If you work with touch events, make sure to prevent propagation,
    otherwise the same event gets fired twice on most systems. Also make
    sure you manually check all your values, because I've found error
    logging to be quite useless when working with event listeners.

Disconnecting & Crashes
-----------------------

When a peer falls away, the whole connection immediately breaks down.
This is a side-effect of direct communication: there's no server in
between to mitigate this or solve the problem.

If the computer host falls away, the game is simply terminated and you
need to restart. There's no proper way to save the game state and
restore it, unless we want to copy the whole game state to all
smartphones at all times.

If a player falls away, however, we can fall back to the idea of "the
host is the boss". Whenever anything goes wrong, I simply pause the game
and show an error message with possible causes and solutions.

Most importantly: I set a flag on the computer so it knows people will
try to reconnect.

When you connect to the game, and the game is in "reconnect" mode, it
just searches through the players until it finds the one with a matching
username. It swaps the old peer for the new one (which you used to
connect the second time) and tada: you've regained control of your old
player sprite!

I've found this to be the most elegant and quick way to solve the issue
of disconnecting and crashing.

There are still some problems, though, that I must solve at this time:

-   If a smartphone goes into standby, the connection is also lost. In
    between games, people usually go for a snack or a drink, and by the
    time they get back they are all disconnected.

-   The first player to connect becomes the VIP. This means that they
    get the button to "start the game!" or "play again!" If they
    disconnect ... well, then I need some way to transfer that VIP to
    someone else.

-   What if a player simply wants to *leave* instead of reconnect?

It's my experience that gracefully dealing with disconnects and crashes
is a never-ending story, that's why I write this bit even though not all
problems are resolved. They will never all be resolved :p

Conclusion
----------

Hopefully you now have an idea of the pros and cons of this system, and
how to make it all work smoothly.

You also know how to setup the connections, the game, how to send and
receive data, and how to properly act on that data.

I could leave you here and you could create your own peer-to-peer games!

(In fact, if that's what you came to do, you can leave now and make your
dream project!)

There are some parts of "Pizza Peers", however, that I find too
interesting not to share. I'm talking about the algorithms I used to
randomly generate cities and kitchens. They are quite simple and naïve
approaches, but they worked wonderfully (to my surprise).

I also have some things to say about Pixel Art (this is my first attempt
at creating a pixel art game) and other aspects of game development in
general.

So, see you in the next (and probably final) article!