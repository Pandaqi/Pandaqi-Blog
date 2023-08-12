---
title: 'How I Created "Pizza Peers"'
thumbnail_media: '../../pizza-peers-static.png'
tags: ["devlog"]
date: 2020-04-29 10:00:00
---

Hi, I am **Pandaqi**, an indie game developer who almost exclusively creates
local multiplayer games.

I've been trying to create those kinds of games for several years now,
which means I've hit every obstacle and roadblock imaginable.

In this article series I want to explain ...

-   **Why** I created "Pizza Peers" (and the underlying system)

-   **How** I created it (with some code, some nice images, and a bunch
    of text)

-   And why I think it might be the best thing I ever made and will be
    creating many more games like these.

If you want to know more (including explanation of the game), visit the official game page: [Pizza Peers - Tasty Multiplayer Fun](https://pandaqi.com/pizza-peers)

If you want to play the game, simply visit the server in any browser: [Pizza Peers](https://pizza-peers.herokuapp.com)

If you're reading this as a programmer, you're in luck: I made the full
source code publicly available! (I even did my best to clean it up and
comment everything nicely.)

> [Pizza Peers on GitHub](http://github.com/pandaqi/peer-to-peer)

The problem with multiplayer
----------------------------

I want to create local multiplayer experiences for the whole family. The
games must be accessible to all ages, to both gamers and non-gamers, and
most of all: cooperative multiplayer.

(Not always, of course. I make single player games and competitive
multiplayer. It's just that cooperative is the best choice for families
and non-gamers, because they don't tend to go well with competitive
environments ...)

**First thing I ever tried**: one person using the keyboard, one using
the mouse. As you might expect, this was a mess. (And didn't scale to
more than two players, obviously. Nobody is going to attach four mice
(mouses?) to their computer.)

**Second try**: two people on the same keyboard. In fact, I even made
games for three and four people on the same keyboard. While this worked
and was kinda fun, it's just very cramped and doesn't *feel* fun.
Pressing tiny buttons with letters on them is not an *intuitive* way to
control a game.

**Third try:** controllers / joysticks / gamepads (however people want
to call them). Controllers feel the most fun and intuitive when playing
a game. The number of people with at least one controller is quite high
(in my experience), and this scales perfectly to higher player counts.

I really like playing with a controller, and so does everyone around me
(they are visibly having more fun if each of them gets their own
controller), so this seems like the perfect option.

*However*, not everybody has a controller, and certainly not more than
two. Additionally, to non-gamers a controller feels "intimidating". They
immediately get the feeling that this game is going to be difficult and
that they won't understand it.

(Additionally, the setup can be draining. Having to connect all the
controllers to a system before getting to play a game, and having to
*explain* the buttons, costs a lot of time and energy. By the time the
setup is done, half the people have already lost motivation.)

**Fourth try:** what if ... we could use people's *smartphones* as the
controller?

I know about the **Jackbox** games, but those are mostly (social)
turn-based games.

I know about **AirConsole**, but that service uses a server that
introduces noticeable delays, and the games on there are -- in my
probably worthless opinion -- not that exciting or accessible. (Plus, it
costs money. That's not a criticism: it's fair to ask money for such a
service. It's just that I don't personally have the money to spend.)

Instead, I remembered an old technique that now seems long forgotten in
the gaming world: **peer to peer**. (I'll explain this more in the third
article.)

If you are playing on the same Wi-Fi network, using a peer-to-peer
connection is **as good as instant**. And indeed, in all the games I've
played using my system, everyone immediately forgets that they're
playing over the internet because everything happens as if you were
holding a controller.

Suddenly, everyone with a smartphone can join the game within 5-10
seconds! Most people *have* a smartphone and *understand* how it works,
which means these games are not intimidating and do not require you to
buy loads of controllers.

So, what *is* "Pizza Peers"?
----------------------------

That's what Pizza Peers is: **a cooperative multiplayer game in the web
browser, where everyone can use their smartphone as the controller**.

More specifically, you'll be running a pizza place and trying to prepare
and deliver pizzas throughout the city.

To start the game, all you need to do is visit
**<https://pizza-peers.herokuapp.com>** on a computer. Press the "create
game" button.

Now, everyone can whip out their smartphone and visit the same address
in their browser. They simply enter the *room code* (displayed on
screen) and a *fun username*, and then click "join game".

It only takes 5-10 seconds to fully create and load the game. It also
only takes 5-10 seconds for players to connect (which they can do
simultaneously, by the way). No need to download or install anything, no
delays, you're playing in no-time.

I can't stress enough how important this is. With my previous games, I'd
need to ask, "do you want to try my game?", and if they said yes, it
would take a good 10-15 minutes to setup everything and get everyone
ready.

Now I can ask that question, point everyone to the web address, and
within a minute we're already playing. Needless to say, I've already
playtested this game more often than many of my other games.

**Remark:** in hindsight, though, I probably should have started with a
simpler game. Pizza Peers is essentially a slightly different and
watered-down version of the game Overcooked. Trying to create a
fully-fledged game on your first peer-to-peer try isn't ideal. I should
have made multiplayer pong or something, or multiplayer flappy bird
(however that might work), but oh well.

Why I wrote this article series
-------------------------------

I would *love* to see a world with more games like this. Games you can
play with anyone, games that are extremely easy to start and access,
cooperative multiplayer with everyone being in the same room.

(Sure, you can also play remotely if the host screenshares his computer.
But that will introduce delays and probably not make the game more fun.)

I'm sharing this project, my source code, and my ideas behind it to show
people what is possible and to hopefully help other game developers.

**It's not that hard.** Seriously, the code for connecting people and
sending signals through peer-to-peer is only a few hundred lines. (Which
includes error handling, comments, lots of whitespace because I like
whitespace, etcetera.)

Additionally, I haven't found anyone else talk about this or share these
kinds of ideas. I might be the first one to do this, although I highly
doubt that.

**It opens a whole new world of possibilities.**

A smartphone, for example, is not static (like a controller). You can
*change* the interface during the game, you can send chat messages, you
can shake the phone to do something in-game, you can even livestream
everyone's camera to the screen if you want. (Not sure how you'd use
that in a game, but you *can*!)

I've tested this game on a nearly 10-year old iMac (as the host) and my
own 5-year old smartphone (which was the cheapest available at the
time). Surely everyone must be able to play these kinds of games :p

So, let's get started! Topics like web sockets and Node.js servers, what
an exciting time!