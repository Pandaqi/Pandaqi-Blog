---
draft: true
title: 'Why only local multiplayer?'
thumbnail_media: "localvsonline.webp"
tags: ["thoughts"]
date: 2023-01-21 12:12:12
emoji: "👥"
---

Whenever I visit the Steam page for a multiplayer game, I'm invariably
greeted by a sad sight.

People leaving bad reviews, saying terrible things about the game, which
all come down to this:

> "There is no online multiplayer! The devs are terrible! This game
> sucks! It's a scam! I'm going to keep being annoying and leave
> negative reviews until you add online multiplayer! BOO!"

There's this strange idea that a game is automatically worthless if it
doesn't have online features. Even stranger, there's this idea that
adding *online multiplayer* to a game is somehow an *easy and cheap*
thing anyone can just do.

(And even stranger than *that*, is the fact that people complain about
it and say they were surprised, when the store listing clearly states --
numerous times -- that it's LOCAL only.)

In this article, I will explain why I only make **local multiplayer**
games. It wasn't an easy decision! There are still moments when I have
doubts!

Clearly, there are pros and cons to both sides of the coin. So, let's
start by examining those.

The advantages of online multiplayer
------------------------------------

These are the biggest advantages I can see:

-   Ability to play together with friends/family *even when you're not
    close to each other*

-   No need for a huge number of controllers/devices to attach to your
    computer.

-   Ability to support much more people within a single game.

-   Individual screens per player (instead of one shared screen), which
    means more screen space, more information to give, etcetera.

-   As large an audience as possible.

Those are significant advantages!

Of course I want my games to be enjoyed by *as many people as possible*.

I don't want there to be barriers, such as requiring you to buy a few
controllers to plug in, or simply requiring you to be physically
together in the same space (with your friends/family).

Especially during these COVID times, it's rare that you just happen to
have people around to play a local multiplayer game.

Almost all my games had moments where I was like "man, if only I had
*more screen space* for the interfaces/icons/whatever, or if only I
could send *secret information* to individual players"

So yes, there are advantages, and there are good reasons to *request*
this feature from developers. If they're open to it, if it's possible,
they might even give in.

(Look at Overcooked. The first installment became a *huge* success, but
it was local multiplayer only! Naturally, people told the developers
they would like to see that. For the second installment, adding online
multiplayer was one of their main priorities.)

The disadvantages of online multiplayer
---------------------------------------

Let's now look at the disadvantages:

-   Writing (good) networking code is *probably the hardest thing in
    game development*, period.

-   Maintaining servers is *very expensive*.

    -   (There are ways to circumvent this, but it usually still means
        paying *something* and using some third-party library that might
        not be ideal.)

-   In this increasingly separated world, I do not want to give people
    even more reasons to stay apart and sit alone in a room. I *want*
    people to come together, to visit each other physically.

-   Not everyone has internet, let alone internet that is *fast and
    reliable enough*.

    -   (For years, that was the reason I couldn't play any online
        games, and obviously couldn't make them myself. And I live in
        the Netherlands, which is relatively well-connected.)

-   In some games, even the *tiniest delay* from an online game could
    ruin the whole experience.

-   Some games are *meant* to be played live, because communication,
    gestures, reactions, etcetera *are a huge part of the fun*.

Implementing online multiplayer is a *choice*, and sometimes it's the
wrong choice for the type of game you're making. Some games really do
not benefit from it. The only result will be people saying: "yeah, this
game has online multiplayer ... but it's laggy and no fun at all!"

And even *if* you decide to do it, it's a question of budget, resources
and skill. I have experience building some online turn-based stuff ...
but that was already a bit over my head. (I managed to understand it,
and get it working smoothly, but that took *months* of trial-and-error,
research, reading articles, and mostly frustration.)

Adding online multiplayer means such an increase in workload and
expenditures, that it might delay a game for half a year, *and* increase
the final price by 10 dollars.

So ask yourself this: do I want to wait longer and pay more *just so
developers can add that online mode*? Or isn't it much better to let
developers make the best game possible, as quick as possible, at the
lowest possible price?

And if that's not enough to convince you, there are *many* clear
benefits from playing locally (and/or cooperatively) that have nothing
to do with the game itself, but everything with psychology, social
behavior, feelings of competence and fairness, etcetera.

This paper is an interesting read: **Designing for Couch Co-op (NTNU)**

The introduction states many studies that prove benefits to local
cooperative games. After that, it includes many great tips to make these
games as good as possible.

Why I only do local multiplayer
-------------------------------

I cannot speak for the reasons of other developers, but I'm quite
certain they are *similar to mine*.

There are clear advantages and disadvantages to both online and offline
multiplayer ... there's bound to be something that stands out and forces
the decision.

For me, it's these reasons:

-   I am a physical person. I play games *for the other people*, I want
    to be physically near people when talking to them, I become unhappy
    from sitting alone behind a screen (whatever I'm doing). And, as
    stated a few paragraphs ago, scientific studies confirm the fact
    that *most people* have the same desires and feel better about
    offline game activities.

-   I'm alone, without any big company, or budget, or whatever behind
    me. I cannot afford to implement online multiplayer, unless I get
    some huge successes the next few years and make a big name for
    myself.

-   The type of games I make just *do not work (well)* with online
    multiplayer.

Many of my games require constant cooperation, often with split-second
decisions and reactions. You cannot win my games without constantly
talking, pointing, throwing stuff to the other player, making plans,
etcetera.

Removing that aspect, and adding all sorts of delays to the input and
actions, just makes this impossible.

But mostly: why would I make a game I would (or could) *never* play
myself? Our internet can be terrible. Even when it's not, I never play
online multiplayer games. It gives me no joy, whilst I very regularly
play local multiplayer games, and am always up for playing more.

With that knowledge, the choice is obvious. I can make local multiplayer
games that take *full advantage of the fact they're local*, which I can
play and enjoy myself (with the people dear to me), at a fraction of the
monetary and time cost of building it to be online.

But there's no reason to be stubborn
------------------------------------

As you create more games, you learn to generalize and "abstract" common
things. For example, instead of hardcoding "this button moves this
character left" (which I used to do when I started ...), characters can
receive any "movement signals", and any other script can send them. As
such, if I had a server, I could just swap one script for another and it
should work fine.

As such, most of my games *could have online multiplayer added*, without
needing to rewrite the whole thing. If I had the money and motivation,
online features could be added within a month or two.

It's not my goal to steer everyone away from online games. It's not even
my goal to make 100% local multiplayer games my whole life. Many games
*could* have online features added. And if there's much desire for it,
and I think it could work, then I might do it.

In any case, more and more utilities are showing up that **allow local
games to be played online anyway!** With a few clicks, a developer can
enable "Steam Remote Play" on their Steam game, which works "well
enough" for most games. If I were to publish my games on Steam -- which
will happen at some point in the future -- I'd surely support that.

(The system works by playing the game on one computer, and simply
*screen sharing* with all the other players. This does introduce some
delays, so it might be some extra work to *really* support it. But it
works, there's no unfairness or extra bugs, and adds many of the
advantages of online multiplayer!)

To everyone complaining about online features lacking -- whether it was
clearly communicated beforehand or not -- I want to propose one last
thought.

Restrictions breed creativity
-----------------------------

Remember how I explained some spatial constraints at the beginning? Lack
of space on the screen, for example?

Well, at first glance, it does look like a clear disadvantage. More
space is always better, right? More ways to communicate to the player is
better, right?

Over the years I've learned that the answer is: **no, it's only better
in the hands of a lazy person**.

These restrictions force me to be creative. They force me to *simplify*
game ideas.

I do not have space for lots of counters, or icons, or whatever when I
need to have *four interfaces on the screen* (for 4 players). So what do
you do? You simplify it. You give each player maybe 1 or 2 things in
their interface, and that's it.

This is another restriction. Guess what? You think harder and come up
with creative ways to *make your game challenging*, even when the rules
and interface are so simple.

I'm not saying my games are genius and I'm amazing at this -- if they
were, I would be famous by now :p I'm just saying that restrictions
breed creativity. Forcing myself to keep each game *local multiplayer*,
has generated ideas, mechanics, solutions that I've *never seen before*
and I would've *never thought of* otherwise.

As I write this article, my latest game "Good Friends are Hard to Find"
just launched. (If everything went according to plan ...)

That game is almost the *definition* of a local multiplayer game.
Everyone is looking at the same screen and you're supposed to hide
yourself, yet figure out where the others are and eliminate them
(stealthily, in most cases).

Instead of hoping the players "don't cheat" by listening to audio cues
(such as others pressing a button), I made it a part of the game. Most
games have a button that *does absolutely nothing* or that *reverses*
your action. So pressing it at a smart moment is actually a way to
*throw off* your opponents.

Instead of forcing players to give themselves away, you can hide quite
well if you manage to "blend in" with the NPCs nicely. If people weren't
looking at the same screen, and there was some
delay/interpolation/extrapolation on player movements, players would
stand out much more ... and they couldn't do anything about it.

The idea for the game, the modes in it, the way I executed it ... all
because I knew I was making a *local multiplayer* game.

Some general advice
-------------------

In the end, it comes down to the following: some games work better as
local multiplayer, others work better online. Find out which one your
game is.

But how do you find that out? Here's what I've learned:

### Go online?

**Advice \#1:** If the game plays in a big world, where the *locations*
and *actions* of individual players should not be public information,
it's better to go **online**.

-   Obviously, there's no secrecy in local multiplayer.

-   (Although my latest game finds a few ways around that, with secret
    hidden roles in a local multiplayer game. But that system only works
    in *that* particular game.)

**Advice \#2:** If a game relies a lot on the *interface* (such as
managing inventory or a large army or whatever), or beautiful/intense
graphics, you should go **online**.

-   There's just no space on the screen for this.

-   And even if there were, all the competing elements would reduce the
    quality (and impact) of all those beautiful graphics and animations,
    basically wasting them.

**Advice \#3:** If the game only works with groups of people (larger
than, say, 4-6 players), you should go **online**.

-   For the same reasons described above: more people than that usually
    don't fit before the same screen, cannot be connected with the same
    device, or there's not enough screen real estate.

-   (I actually made a game once that is controlled with your *phone*.
    This circumvents the whole "plug loads of controllers into the PC"
    problem, which is why I set *no cap* on the player count. Guess
    what? We played it once with 10 players. And the game itself worked
    ... but half of those players just couldn't see what was happening
    on such a tiny screen :p)

-   I'm sure many games immediately come to mind: battle royale games,
    shooter games, online real-time strategy games, etcetera.

### Go oFfline?

**Advice \#1:** If a game is *offline only*, it's almost essential to
have a **single player mode.**

-   This allows the game to also be enjoyed when somebody has no friends
    around.

-   And it allows someone to "test" or "learn" the game on their own.
    (So they know if they want to buy it. Or can easily teach it to new
    players when they visit.)

**Advice \#2:** Continuing that thought, it's also better to make it
**cooperative.**

-   Why? Because a cooperative game is "players versus game", and thus
    automatically supports a single player mode.

-   In competitive games, it's "player versus player". Which means a lot
    of extra work (to program really smart AI) if you want to support
    solo mode.

**Advice \#3:** But there's a **common negative connotation to
cooperative games**.

-   For some people, it means "somebody does everything, and someone
    else just does some basic helpful action 5% of the time"

-   (Like, in Super Mario Odyssey you have Mario doing everything ...
    and Cappy can help out too, sometimes, I guess. Most games are even
    *worse* in that aspect.)

-   This causes some people to outright dismiss those games.

-   So, in the marketing, clearly show that it's really cooperative and
    everyone is always doing important stuff.

-   And if you want to hit *bullseye*, you'd create a game that has
    **both cooperative and competitive modes.**

-   Well, if you want *double bullseye,* you create a game that is
    **both online and offline**.

Conclusions
-----------

So that's it. My reasons, and the general reasons, why games do not
support online multiplayer.

It's not that developers are lazy, or they suck, or they don't care
about their game/their players/whatever. It's much more complicated than
that. It's a choice. And making the wrong choice will hurt a game *much
more*.

Hopefully this can at least remove *some* of those default negative
reviews. Or clear up some doubts or questions you might have had.

(Because I know that many people who *don't* develop games themselves,
are *honestly* surprised about the fact that it takes a lot of work.
They just didn't know. They assumed it was as easy a feature as creating
the menu buttons.)

Until the next time,

Pandaqi
