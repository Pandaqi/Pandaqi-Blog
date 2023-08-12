---
title: 'A Recipe For Disaster'
categories: ["blog"]
tags: ["mini devlog"]
thumbnail_media: recipe-for-disaster-header.webp
date: 2021-04-27 14:00:00
emoji: "🥯"
---

Last week, I created *A Recipe For Disaster*. A couch co-op game for 1-4
players, for literally all ages and skill levels, about running a
bakery.

You can download it here (for free, any platform except iOS):
[A Recipe For Disaster - on itch.io](https://pandaqi.itch.io/a-recipe-for-disaster)

(You only have two buttons to learn, *move* and *throw*, and the
campaign is basically one huge interactive tutorial that teaches you how
to bake bread step-by-step.)

Why? Because this was an old idea of mine that seemed fun.

Also why? Because I challenged myself to make and release a complete
game in *one week*.

I have the terrible habit of trying to make every project of mine "the
next big super successful project!" The result? Even the simplest of
projects becomes way too big, I lose motivation, I make too many
mistakes, and I abandon the project.

So I said to myself: "one week to make a game -- whatever state it's in,
you must publish it after a week and move on"

And I have to say that this was **the best possible thing I could have
said to myself.** I actually finished the game, had 100% fun and
motivation in doing so, and had loads of fun playing the game with
others. (I will, therefore, probably do more of these "one week games"
in the future!)

In this devlog, I want to **tell you the greatest lessons I've learned**
and **convince you to try this yourself**.

What's the idea?
----------------

This was the original idea:

"Cooperative. 1-4 players. Each player has their *own separate area*,
and you can't visit others. Any time you want to use a machine, you must
*throw* your ingredient into the machine. The catch? Once done, it will
fly out of the machine *on the other side*."

Basically, I wanted to make a cooperative chaotic cooking game
(obviously inspired by Overcooked), which *forces* you to work together
100% of the time, just by employing this simple rule. "Anything you put
in, will come out in the area of the player on the other side."

That was the full idea I'd written down a few years ago.

Lesson 0: "Finishing" is 50% of the process
-------------------------------------------

I made the *game itself* in a week. Five days actually.

But the menus and buttons? The settings? Perfecting mechanics, adding
particles, fixing bugs? A few extra days.

Playtesting the game? With different groups, multiple times? A few extra
days.

Creating trailers? A game website? Screenshots? You get the idea.

Combining everything, I think a week was spent actually developing the
game, and another week in making sure more people will actually find and
play it (besides me and my family).

But hey, "two week games" just doesn't have the same ring to it.

Lesson 1: Stay true to your course
----------------------------------

As I was programming the first few machines and ingredients, I quickly
had to make a choice: *what are you going to make? What type of
restaurant are you?*

It became a bakery. (Why? I was, at that time, writing a scene from a
novel that took place in a bakery. Simple as that.)

Of course, my mind rebelled. *What if we add all sorts of sidedishes?
Like coffee and tea? Pie? Cookies?*

I constantly had to remind myself that "no, it's a game about baking
bread, nothing else!" And this was instrumental in being able to finish
the game in a week.

Every time I was stuck, I only had to ask myself the simple question:
"what's the next step when making bread? What ingredient/machine/process
do we need?"

And then I just implemented that.

This continued until I'd basically covered the whole process from
planting a seed =\> slicing/toasting bread. To be honest, I could've
stopped way earlier, or ignored the slicing/toasting of bread. But,
given my history, it's a miracle I even stopped there :p

During that time, I had other ideas, like: *what if you could also make
croissants? Or baguettes? Or add nuts and spices to the bread?*

All perfectly fine ideas ... but I ignored them. Maybe for expansions,
maybe for a future update.

But for now, it's a game about baking plain old bread, together, in the
silliest way possible. Nothing more, nothing less.

Lesson 2: Help players, but make it optional
--------------------------------------------

As I played the game, I noticed I sometimes got stuck for a few seconds.
I would try to move through a tight space, *thinking* I had my joystick
pointed in the right direction, but I was slightly off and just kept
bumping into something.

*If I, the creator of this game, with a joypad, have this problem ...
surely others will.*

And that's a good thought. I added some simple code to help you get
around obstacles if you run into them, and movement was way smoother.

However ... you're basically lying to the player, tweaking their
movement without them knowing it.

This can also lead to extra confusion. Some of my players kept saying
things like "why won't it let me throw this onto that?! I keep moving
past it?!"

Intuitively in games, people try to "run into" objects to steady
themselves, before doing an important action. (You need to put the bread
in the oven? Run into the oven, make sure you're lined up, and *then*
throw the bread.)

But with my "helping code" active, you couldn't do that! You'd just run
past it diagonally.

So I made it optional in the settings.

Lesson 3: Create a "core game bible"
------------------------------------

Over the years, I've developed this idea that good games (in my opinion)
are as simple as they can be, both in *input* and *general rules*.

This means that I always ...

-   Try to do everything *with as few buttons as possible*.

-   Try to come up with a handful of *general rules* that are applicable
    and lead to interesting systems in all levels.

It helps to write this down. At the top of my document, I have a list of
5-10 items, which state the core rules of the game that everything must
follow.

The important ones are these:

-   The players have two actions: **move** and **throw**. Everything
    must use one of these actions, I'm not allowed to create more.

-   Whenever an **object** is thrown against something, its content
    **scatters**. (It's randomly thrown onto adjacent squares.)

-   Cells only accept ingredients/objects if **they can use them**.
    Otherwise, they'll just fly over those cells.

Really, if you remember these, you know almost everything you need for
the game.

You might think that this is very restrictive. Boring, even. Just a few
rules, how will the game stay interesting after level 1?

But that's the beauty of restrictions. **Restrictions breed
creativity.** I had to think "out of the box" to invent 20 unique and
interesting levels, without changing any of these rules.

For example, the whole concept of "scattering" was a result of such a
brainstorm session.

If I can't *pick up* objects ... how will this game work? Oh, I know,
you *automatically pick up* stuff on your cell, or you can *remove them*
by throwing something against it.

Gradually, this developed into "scattering", which is used for (nearly)
everything.

I did not know beforehand, when I started the project, that something
like that would even exist or become a core part of the gameplay. It was
a result of the game bible, the restrictions, trying to keep it simple
and streamlined.

**Another example:** the maximum backpack size. At first, cells and
players could hold any number of objects!

I thought it was "too difficult" to explain a max inventory and ask
players to keep track of that during gameplay.

As it turns out ... it's even *more difficult* to keep track of what's
happening if you literally have *ten things in your backpack*. It's too
much! Too overwhelming!

On the last day, therefore, I added a **maximum of 4 things.** At most
four things in your backpack. At most four things in a cell. Something
doesn't fit? You simply don't pick it up and it keeps flying. The thing
can't go *anywhere*? Your fault, it's destroyed :p

There is no tutorial explaining this maximum. It was added last-second.
Yet it made all the difference when I played the game with others. Just
a simple, red feedback message "Backpack full!" is enough for them to
get the hint.

Which leads me to ...

Lesson 4: Tutorials
-------------------

I like to think I've gotten quite good at tutorials. All my latest games
have simple, one-liner rules which are explained with clear images *when
needed*.

(That's why my games usually have "worlds" or "campaigns", where each
level introduces the next tiny step towards the final level, in which I
can finally enable ALL the cool rules and systems I implemented.)

At the same time ... this is what many people do:

-   They don't read text

-   They immediately say/think "this is too difficult" or "I don't
    understand"

-   They immediately press the button to start

-   And hope they'll figure it out as they go

Not everyone, and the tutorials still manage to get the *gist* of the
idea across most of the time, but it's not ideal.

So for future games I'll try something different. No static images at
the start.

When you start a level, you just *immediately start*. However, new
elements get a small box hovering next to them, with a short
icon/explanation. Or simply prompting you to "try out the new location,
see what it does!"

This removes any upfront tutorial and hopefully encourages player to
engage with the new rule/element more.

**Remark:** at the same time, I'm working towards a future where I can
make games that only have *one input* (probably the joystick for
*movement*) and still make them fun and challenging :p I doubt if I'll
ever succeed, but it's something to work towards.

Lesson 5: Iteration
-------------------

My games share many similarities. As I said earlier, they often have
"worlds" or a "campaign". They often allow keyboard and gamepad input,
for 1-4 players. They often future moving characters, on a grid.

You see what I see? It's an opportunity to **use old code** and
**iterate on it**.

Looking at my old code for managing *controllers*, for example, I could
immediately spot 10+ ways to make it more efficient and robust.

Using this iteration principle, every game I make will always be
*quicker to create*, but still *more efficient and robust*.

**Remark:** as I write this, I've already started my next one-week game.
And again, I could iterate on some existing code, improving it. Heck, I
even managed to get *multidirectional conveyor belts* fully functional
in less than an hour! Which is the real benchmark for efficiency when
creating games, as we all know.

It's a tiny thing, just taking an hour to *improve* or *rewrite* some
old code. But game after game, you start building a huge codebase that
makes every new project way easier to prototype and (bug)fix.

Lesson 6: Marketing takes time, but not that much
-------------------------------------------------

Yes, screen grabbing all parts of your game and turning them into
trailers and screenshots is a *lot of work*.

Similarly, creating your pages, with nice images, fonts, color scheme,
description, tagline, also takes *a lot of work*.

And it's mostly busy work. You already know how the game works, how it
looks, that it's fun. You're done with the game itself! But others don't
know. And they will never know if their first glance at your game leaves
a bad impression, or no impression at all.

When I actually sat down to do it, I think fully creating the trailers
(both PC and Mobile) took at most 2 hours. Getting screenshots from my
recorded play sessions (and sometimes editing them) took another hour.
Creating the logo, background pattern, marketing text, etcetera another
2 hours at most.

(After creating the game, you already have all the assets and visuals
you need for marketing, so it's mostly *searching, searching, searching
-- hey, I can use that, let's copy and paste it here.*)

So don't skip out on it. If you do this challenge, reserve day 7 for all
the marketing stuff. You should be able to get it done (somewhat
properly) in that time, giving your project just that final touch it
often needs to be more than a simple prototype.

Lesson 7: Audio fun
-------------------

A short one. Usually, I just play a nice piano track for the background,
and get my sound effects from a free Sound FX website *or* generate them
myself using something like Bfxr.

But I want to be better than that!

So this time, I actually recorded a background track with my microphone.
(Guitar, clapping, etc.) In fact, I recorded a special song for the
trailer which (in a funny way) sings how the game works. I think it's
really fun and will probably try to do that again.

I also recorded all Sound FX myself. I opened and closed doors (loudly),
dropped stuff, made noises with my mouth, clicked pens, etc.

I think it turned out quite alright for a first try!

However, the sound effects are a bit unbalanced in terms of
volume/energy. Some can fall away completely in many situations. And I'm
certainly not the best *audio engineer* in the world, but I'm learning.

Anyway: try to create all sound (effects) yourself for your next game,
or just do something *different* from your usual style. You'll learn a
lot about how to actually make good/fun/fitting/atmospheric sounds.

Why you should do this challenge
--------------------------------

Now let me get serious for a moment.

From a young age, I've heard these one-liners over and over:

-   When you get out of school, you'll need to make a living, earn your
    own money!

-   Right now you can play and fool around, but when you have your
    diploma, you should know what you want and get your career going!

-   You can't just make whatever you want! It needs to be useful --
    think about marketing, career, income!

-   Okay, great, you made this game. But how will you sell it? You
    should send it to publishers! Start spamming it on your social
    media. Oh, and put ads in it! Ads everywhere!

-   Many more like it.

The result? I tried to turn every idea I had, from the age of just 12
years old, into something "big and successful and practical and
income-generating".

Which is just wrong. Very, very wrong.

It stifles creativity. It stifles experimentation, personal growth, and
development. It takes all the fun, the spontaneity, the passion out of
your (creative) work. Because *everything* needs to be perfect, and it
needs to sell, and it needs to be big and portfolio worthy.

No. Stop that. It's hurting everyone growing up around the world.

I just made a game which will generate me *no income at all*, and will
surely not be enough to get *exposure* or land a deal with a publisher
somewhere. (I've been dreaming of getting into the ID\@Xbox program for
a few years now ... this will surely not impress them.)

But I only spent a *week* on it. And I had fun. I learned a lot. I
created systems I can re-use in future projects. I generated more ideas,
some of which are halfway done as we speak. I think this might actually
be *the most fun project I ever made*. And hey, I can still add it to my
portfolio, my website, and who knows? Maybe it *will* impress the right
people and get me somewhere. ("Woah, what a coincidence, we need someone
to program a co-op bakery game, and this guy already made one!")

Anyway, my point is: if you're like me, if you've been stuck in huge
projects and huge expectations for years, try something like this. Pick
an idea of which you thought "should create that in the future", and
just *make it now*, and see how far you get *in a week*.

(Or a month, or a day, depending, on your schedule and project type of
course. I had the whole week of spare time, minus a few appointments and
other minor projects, to dedicate to this project.)

Conclusion
----------

Try the game if it looks like something you'd enjoy!

It has a solo mode, although I must say it's not the best mode, because
it was obviously built to be a cooperative game.

It's playable on literally anything. (Except iPhones, because screw
Apple and their practices. I can't afford their expensive devices just
so I can export a perfectly functioning game to their app store.)

Try the "one week game" challenge if you feel stuck, or without
inspiration/motivation, or just want to pad your portfolio.

(Frankly, numbers impress people. They shouldn't, but they often do. The
pages on my personal blog where I list all my projects in a certain
category have the highest click-through and response rate of
everything.)

And that's it for "A Recipe for Disaster"
