---
title: 'Timely Transports (Part 3)'
thumbnail_media: ../../timely-transports-header.webp
tags: ["devlog"]
date: 2020-08-05 11:00:00
---

Welcome to part 3 of the devlog. Finally, we get to test the first prototype/draft of the game!

Before the playtest
-------------------

Before I test a game, I always have some things I want to check or
confirm. I have doubts about certain mechanics, or ideas for more
interesting rules, and I need to see if they hold up.

This time, this is what worried me:

-   **Space!** Still! I just don't know if, on larger player counts, the
    board will become a huge unplayable mess. It could be fine, I just
    don't know yet!

-   **Stress!** I don't know if the timers add more stress than some
    players can handle, or if players will go the other way and just ...
    relax and do nothing while they wait for one specific vehicle to
    finish moving.

-   **Strategy!** The game hinges on *fast-paced decision making*. The
    person who wins, is the one who can manage their time (and vehicles)
    better than the rest, and who is more alert to the current board
    state, new goods and other events. I don't know if this is enough,
    or even very interesting after several plays.

    -   As such, I was toying with this rule: only **2 vehicles** may
        occupy a city at the same time. (And maybe, in expansions,
        different cities could have a different capacity.)

    -   This makes the game much more strategic. If somebody is blocking
        your path, you *must* go do something else or find the quickest
        way around it.

    -   It also solves the space problem.

    -   (An additional rule could be: during *movement*, place the
        vehicle halfway the route you're moving on. This would remove
        them from their city and spread more evenly across the board.)

As you can see, all these things could be fine, you just can't know
until the first few playtesting sessions.

So let's go!

A Quick Intermezzo
------------------

**Update:** I just had this amazing idea!

It's quite easy to reduce the stress level and the number of mistakes
people make ... if I just build a "break" or "time-out" function into
the game! Just spewing my first thoughts here:

-   Option 1: the interface is programmed to *always* start a break
    after 5 minutes of play. To end this, either wait 30 seconds, or
    press "continue playing" on your phone.

-   Option 2: there are squares/locations on the board. If you pass
    them, you can *call* for a break. All players can pause their
    interface, and you can collectively have a break and discuss things
    for as long as you like.

-   Option 3: breaks are completely voluntary. It's a button on the
    corner of your device, so anyone can press it and yell "Time-out!"
    so the rest does the same.

I think this would be a wonderful feature (if I make it optional in the
settings). I can already imagine people relaxing when I explain the game
and tell them "don't worry, in this first game, you can start a time-out
any time you like".

By the way, *this* is the primary reason I write devlogs and would urge
anyone else to do the same. I only got the idea(s) above while writing
this devlog for an hour, but not in all the weeks of development before.
Writing about your thought process and reasons why you did (or did not)
do something is *so useful* for figuring things out and getting new
ideas.

First Playtest Session!
-----------------------

Finally, finally, the time has arrived for the first official playtest!

(Of course, as I develop, I try the game, check if anything's wrong,
etcetera. But this is the first play test with the *full game*, with
everything *finished and working*, with a *new group of people that have
never seen the game before*.)

**IT WENT AWESOME!** (... is that even a correct English sentence?)

The game was really fun, easy to explain, easy to get into, fast,
(mostly) intuitive. I played a handful of games in succession, each time
changing the rules a bit to test my doubts I wrote above.

This was the conclusion:

-   Starting with all four vehicles on your capital ... is overwhelming
    and actually a dumb idea. Let's gamify it: you start with only **one
    vehicle** on your capital. To **add a vehicle** (from your supply)
    to the board, you must use a timer as well! It has the exact same
    rules as moving a vehicle, now you're just moving it from your
    supply to your capital.

-   Everyone forgot the rule about "you always get 1 point for moving a
    good". So I just removed it, because the changes below made sure it
    wasn't needed anymore.

-   We really need a timer on the "New Good!" message. Otherwise,
    players will miss it or simply ignore it (because they're busy with
    something else), which is unfair. It means they get an advantage
    while putting the other players at a disadvantage ( = there are
    fewer goods on the board).

-   Yes, it's way more intuitive to put a vehicle *halfway* between city
    A and B, when you're moving from A to B. It also frees up lots of
    space on the cities. (And when moving a plane, just put it in front
    of you or whatever.)

-   That rule about a maximum of vehicles per city? I know something
    even better now! Whenever you enter a city that already has a
    vehicle ... **bump that vehicle off the board!** Because I added
    this simple rule about "adding vehicles back to the board", I could
    allow vehicles to be removed from the board all the time.

Especially the last addition is a huge one. (As in, it's a really simple
addition that solves almost all problems the game currently has.)

It gives a *lot* of space and clarity on the board, whilst introducing
an interesting game element: will you go for the good, or will you bump
a player's vehicle off the board to set them back in time? And if you
want to prevent that, you need to keep all your vehicles busy with
*something* all the time, which is even more challenging.

(It also removes that "Teleportation Rule", which means one less rule to
explain and one fewer nasty exception in the rulebook.)

Lastly, I saw that people became really enthusiastic and engaged whilst
playing. They were 100% focused on moving goods, checking what's new,
checking what the hell their airplane was doing in that city,
frantically pressing timers on/off on their phone, and just having a
good time.

People also became *better* at the game, within just a few rounds. They
learnt to make better choices, use more vehicles simultaneously,
position them at locations where goods are more likely to be useful,
etcetera.

Our first game, we quickly became overwhelmed by the sheer number of
resources on the board. In the last game, there were a few moments when
everyone was *so efficient*, that all resources were off the board.
(Which caused me to make the resource timer slightly faster.)

Bugs, bugs, bugs
----------------

Of course, when creating such a complex interconnected game with both
physical and digital components, there are going to be some first-time
problems.

Some example problems:

-   Some phones did not play audio. (Apple ... why don't you just update
    your technology like the rest of the world?)

-   The phones were using *all* cities, even on lower player counts,
    which was confusing (because it kept giving us goods to place at
    cities ... that didn't exist on our current board).

-   The board generation *always* placed an airport at the first city
    (Al Riz). That's not only a bug and boring, it also gives the first
    player a huge advantage, as their capital has an airport while the
    rest probably doesn't.

-   Some elements of the game weren't paused when you won. (Which means
    you could still lose points after winning, bringing your total back
    to a value under 30, creating a mess.)

But after 60 minutes of programming, these were all fixed!

Additionally, I noticed that larger player boards were actually ... more
fun? I thought it would become a mess quickly, or just too hard (because
there were so many cities to go to), but the opposite was true. I played
one game with 2 players on a 4-player board, and it felt more engaging,
because you were actually exploring a larger world and occasionally
bumping into players who were traveling all over the board.

It just felt like actually moving through a jungle, discovering new
paths, sometimes bumping into friends (or, in this case, competitor
transport companies), and planning ahead (to optimize your vehicle
movements through this large space).

So, I might just increase the default number of cities and connections,
on all player counts.

The airport was a bit hard to see. Then again, I printed everything in
black-and-white, and I keep getting surprised by how dark everything
becomes. As such, I'm currently working on all the icons again to use
brighter colors (and testing it with a black-and-white adjustment layer
to see how it would look).

Luckily, I *did* plan ahead for this, and my randomly generated "print
friendly" boards looked very good. Easily readable, as little ink wasted
as possible, I don't think anyone ever had a hard time finding a city or
route.

All in all, this is a **big success!**

(It feels ... kind of arrogant to say all of this, but I really mean it.
I'm happy that this very experimental idea actually works and speaks to
people. I cannot wait to fix all the bugs, improve all details that need
improving, and play the game again. And then the expansions!)

A Quick Intermezzo, again
-------------------------

Man, I just keep getting the best ideas while writing devlogs.

Remember when I talked at length about how hard it is to "connect"
phones to a board game?

Well, stupid me somehow forgot the most important tool in random
generation: **seeding**.

A **seed** is a number you feed into your random number generator (in
your programming language), which determines the sequence of numbers
that comes out.

If you randomize the seed as well, by e.g. taking the current time on
the computer, that's how you get random numbers.

But if you keep the seed constant ... any device should get the exact
same sequence of numbers. If I tell my game "use seed 10", it should
always reproduce the same sequence of numbers, which means it should get
the same results during generation.

See where I am going with this?

I can print the **seed** used in random generation on the game board.
Then players could type this exact seed into their phones, and both
should know *exactly* what the board looks like and what they can and
cannot do!

(To make this more straightforward, I could use a random **word** as
seed, and then just convert that to a number behind the scenes. It's way
more fun to type "JUNGLE" into your phone before playing a game, than
"1903910690928")

I could go even further and ask players to enter their player number. (A
simply prompt at the start of the game saying "which player are you?"
with a dropdown list of numbers 1-8.) Then I could show different events
at different times, based on player number.

> *How can this be useful?* Well, currently, new goods are announced
> *completely randomly*. This could mean that all players get this
> message *at the same time*, creating a bit of chaos on the board. It
> could also mean that, just by chance, nobody gets this message for two
> minutes.
>
> If I know which player is which, I could time these events and space
> them out nicely. First show one to player 1, then another to player 2,
> and so on.

I don't know if I'll use this in Timely Transports. It would require
rewriting a ton of code, whilst I don't see pressing benefits at the
moment. But future hybrid games will certainly use seeds for cool
features!

In the next article, I'll discuss playtesting this new and improved version of the idea!