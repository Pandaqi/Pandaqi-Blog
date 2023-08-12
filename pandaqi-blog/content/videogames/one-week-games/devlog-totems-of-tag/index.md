---
title: 'Totems of Tag'
thumbnail_media: totems-of-tag-header.webp
tags: ["mini devlog"]
date: 2021-07-17 14:00:00
emoji: "⛹️"
---

Welcome to another devlog about a "One Week Game"! (Which are,
unsurprisingly, games completely developed in a single week.)

This one is about [Totems of Tag](https://pandaqi.com/totems-of-tag). (Click the link to visit the
official page. The game is for 2-4 players and free on all platforms.)

The first *one week games* were "A Recipe For Disaster" and "I Wish You
Good Hug". Both projects were a great success. Especially for something
made in just a week!

But ... they were very similar. Both featured a grid, throwing stuff,
and cooperation enforced by people being split into their own separate
regions.

Another problem was their *scope*. Even though I managed to finish them,
they were still *too large* for my liking (and stress levels).

That's why I wanted to try something different! A silly physics-based
game, that should be *very very simple*.

In the end, I settled on the idea of making a game like "dodgeball" (you
know, from high school PE), but with a few clever twists.

All the other ideas I had were perhaps better, but also *larger*. I do
these projects to help me finish stuff and keep it simple, so I want to
do the simplest ideas first.

What's the idea?
----------------

All players are dropped in a single-screen arena, with a few lives, and
a few *balls*.

Throwing a ball against someone else removes one of their lives! When
you have no lives left, you die and are out of the game. The winner is
the last one standing.

So far, so simple, right? Well, yeah. And developer can make this in a
few hours, which also means it would be quite *boring and cliché*.

So I permitted myself a few twists:

-   When throwing, you can rotate your character to add *curve* to the
    ball.

-   There are all sorts of *special powerups and ball types.* (Both good
    and bad.)

-   Many powerups can only be acquired by throwing a ball against them,
    from a distance.

-   I planned a second button for ... something, but I didn't know what
    at this time.

In my head, I had this image of these circular *totems* with parts that
could rotate independently from each other. The more you rotated (when
powering up your throw), the more your ball would curve. (This image was
partly inspired by the boardgame *Iwarii*.)

Lesson \#1: Don't leave visuals for last
----------------------------------------

The general consensus, which I've read/heard time and time again over
the years, is to "build the whole game first with placeholder graphics,
then add the actual graphics at the end"

Usually, graphics and design are seen as the *very last things* you do
to the game. And I see where people are coming from and largely agreed
all those years.

But more and more ... I realize this isn't necessarily a good idea.

You see, I was ready to give up this project. I woke up and was like
"what am I doing, wasting a whole week on a very boring and simple
game?" I just wasn't impressed by any of the ideas or mechanics, and had
a million ideas I was more excited about.

Trying to convince myself to at least do *something* for the project, I
started creating visuals. Some cute characters (with different angles
for rotation), some actual colored balls, some particles, some
animations.

I basically spent 5 hours, right at the start of the project, creating
*all those things* you are supposed to leave for the end. And guess
what? It completely restored my faith in the project. Many of these
visuals are still in the game, because they ended up being fitting
perfectly.

Over the course of the week, whenever I was losing motivation, I
repeated this exercise. I searched for an area that could be improved
and created some *visual* thing (a sprite, an animation, particles,
tween, whatever) to make it just a little nicer.

If I hadn't done so, this project would never have gotten further than
the "some square people on a grey background are throwing circles at
each other"

**The main lesson?** Visuals are *vital* to any game. Use them to
motivate yourself and make your project look/feel fun as early as
possible. Visuals should inform gameplay, and vice versa. Don't just
slap them on at the end.

Lesson \#2: 2D isn't always easier than 3D
------------------------------------------

At first, I wanted to make this game 3D. It just feels like a better
fit: totems feel like something I could create and animate in 3D (with
my very limited skills). And if that's done, I just need to give
everything a proper collision body, and basically 90% of the game is
done.

But I didn't do it. Why? Again, because I needed to keep this game
simple. And in my experience, 2D was always way easier than 3D.

This was probably a mistake.

If you work in a sort of "fake 3D" world, you need to apply *many*
tricks to make it look and feel realistic. I had to think a lot about
how to *draw stuff*, which *collision shapes* to give them, and more
detailed physics-related stuff.

Why? Let's say a shrub is standing in the middle of the field. If a
player approaches from the back, they need to be stopped by it, but not
immediately! They should be able to *stand behind* the shrub, moving a
few pixels into the sprite before stopped, because that's how it would
work in 3D.

Moreover, the ball floats a bit above the ground when thrown. So, it
should be able to move *even further into the sprite* than players,
because it's higher off the ground!

If all of this is confusing, let me tell you: yeah, it is. It was a lot
of work to make the physics, the perspective, the sprites all work
together (and properly sorted) to give the illusion of a 3D playing
field.

In the end, that energy was probably better spent *actually creating
this game in 3D*. Which I might still do as my next project.

**The main lesson?** 2D is easier than 3D, but not if you try to *force
2D to be fake 3D*. In that case, just bite the bullet and go full 3D.

Lesson \#3: Be mindful of taking decision away from players
-----------------------------------------------------------

Okay, let me explain that heading.

When I first started making games, I was like: "players should be able
to have total freedom! In *my games*, they can decide whatever they
want, have control over everything, hooray!"

After some projects, though, I realized the error of my ways. Such
amount of freedom, such choices, are *overwhelming*. Most players aren't
even looking for that. They just want the game delivered in a clear-cut
way that makes it the most fun for them, which usually means that many
parts of the game are *decided* or *automated* by the code.

**For example:** take the FIFA games. By default, many things are
enabled to *help* you. When shooting or passing a ball, it automatically
picks a corner/teammate which *roughly corresponds with where your stick
is pointing*. You can turn this off, if you want! You can enable
*manual* aiming, which allows you to be much more precise ... but is
also *waaay harder to pull off*. Most people just aren't looking for
that. They are fine with the help, with the decision being taken away.

So, when I developed this game, I locked in almost everything. Powerups
were always **good**. But if you get hit with a "bad ball", you receive
a random powerup that is always **bad**.

Your **throwing power** and **throwing curve** were always the same.
(The more curve, the harder the shot.)

All powerups and balls were picked up by simple walking over them.

I removed almost all freedom and it **hurt the game severely**. Yes, it
made the game very simple to play, but it also turned the game into more
of a ... simulation? You could do and decided *so little*, that each
round turned out similar to the last. You couldn't really *train* to
improve your skill.

That's why I gave the player more choice again:

-   All powerups can be good or bad.

-   Some powerups are picked up by walking over them, but others must be
    *actively* grabbed by throwing a ball against it.

-   Balls must always be grabbed. This also immediately added the
    mechanic of "catching a ball" before it could hurt you.

-   Throwing **power** is controlled by **how long you hold the
    button**.

-   Throwing **curve** is controlled by **how much** **you rotate**.

This way, you can make a strategy. You can decide to work a little
harder to pick up a *really useful powerup*. Or, if you don't watch out,
you can accidentally get yourself stuck with very *bad ones*.

Similarly, if you train a bit, you can throw the ball any way you like.
A soft curve ball. A fast straight ball. You can take quick surprise
shots (by quickly tapping the throw button), but can't really aim those.
Or you can take a few seconds to line up the perfect throw.

Making these changes made the game way more strategical, yet also
skill-based. And it was all a result of *doing less work* and giving
many decisions *to the players*. (Instead of programming my own code to
help you, I just ... removed that code.)

**The main lesson?** Strike a balance between giving freedom/decisions
to players, and helping them by making the computer take care of stuff.

Lesson \#4: Make the bare minimum fun
-------------------------------------

**This one is very important, learned after many years of making
games!**

Games are about challenge. You try to reach an objective, but something
is in the way. By trying stuff, playing again and again, you get
*better* and get more *skill* with the game's controls and mechanics.

However, challenge is very subjective. What I might find easy, is too
hard for others. Failure that makes me go "hmm, interesting, I should
try X next time", makes others go "huh? Weird game, I'll just try the
same thing again. Or quit."

The last few years, I've created many games (or small prototypes), and
asked other people to test them. And guess what? Many of them don't care
about all those challenging mechanics I put in the game. They might not
even care about what all the buttons do. They're contend with learning
the basic controls (usually moving + one button) and just doing
something.

In other words, they will **do the bare minimum**. And you, the
developer, should **make that fun as well.**

This is, I think, one of the big failures of my past games. Their "fun"
was only unlocked if you knew your way around a controller, played quite
seriously, "understood" what it was trying to do.

For this game, I fixed that from the start. (And I will do that for all
games going forward.)

**Case Study:** let's meet "Hank". He's not a pro gamer and just wants
to have some fun. He only knows the controls for movement and that
pressing a button will do something.

What will they try? And how do we make sure they have fun?

-   If they walk up to a ball, and press that button, they should *grab
    it*. Even if it's not that precise. Even if their timing is off.

-   If they release the button, the ball should be thrown *with
    considerable speed*. Even without charging power, or adding curve,
    they should be able to throw balls and hit others.

-   If they accidentally walk over a powerup, they automatically enable
    it, so that works. (They are not "locked out" of that system in the
    game.)

This way, they don't need to be good at the game, or know *all* the
controls or mechanics, to **have fun** and **take (serious) part in the
game.**

It might feel stupid. Like treating your players like idiots or
rewarding them for doing nothing. But it's absolutely the right thing to
do and an art in itself. Just make sure that "doing the bare minimum" is
not rewarded 100%, not the best strategy. There should be room to grow,
expand your skill, be better than that.

**The main lesson?** Make every separate mechanic/system/part of the
game fun and easy to interact with, so even the bare minimum means
you're having fun. And yes, this will feel like treating your players
like idiots.

Lesson \#5: Hardcoding is fine
------------------------------

I love random generation. I'm just endlessly interested in *what the
computer will come up with*, given a few simple rules. It creates
infinite variation and surprises in a game.

But ... not everything is suited to random generation. I tried to
randomly generate the arenas, but soon realized it wasn't worth the
effort.

The results were just bad and unfair. On such a small space, where
hitting someone can come down to a few pixels, it's just not *fun* to
start with potentially unbalanced or ugly arenas.

Okay, plan B: manually create a few maps out of a set of *tiles*. This
would have been a good idea *if the game didn't have this weird fake 3D
effect going on*. Due to that, it was hard to make tiles that seamlessly
fit together, both visually and physically. (Placing two blocks after
each other, for example, should *not* leave a gap that a ball or player
can fly through.)

So I settled on plan C: manually create every map from scratch. This
meant that I could draw *anything*, and just import it into the game
engine, and add bodies/functionality where needed. As such, most arenas
in the game are just a few *huge sprites* with smaller sprites for
objects that should be separate (e.g. because you can move them around
or stand behind them).

And you know what? Even though I'd never done it this way before, and it
felt ... weird to me, it was *absolutely fine*. It allowed me to create
a few varied arenas very quickly. (Considerably quicker than writing all
the code for randomly generating them.) It allowed me, again, to finish
this game within a week.

**The main lesson?** Manually creating a small amount of content can be
completely fine, and can be preferable over random generation.

(This motto was literally written, in all caps, on top of my notebook:
"Stop thinking in terms of tiles, just sketch the full area and build
it." I've done so many tile/grid-based games, it was hard to get out of
the mindset :p)

Lesson \#6: Sharing is comparing
--------------------------------

These are **local multiplayer games**. I make these because I don't play
games for myself, I play them for the social experience. To share a
moment with others, have fun with others.

That's why I think it's perhaps more important to focus on that social
aspect, than the game itself.

And when it comes to humans, we are weird social creatures that enjoy
*comparing* ourselves with others. Cheering when we do something nice,
talking smack when somebody does something annoying.

So here are some things I added to this game to facilitate that:

-   At the game over screen, it shows *statistics* for each player. Hit
    the most players? You're a sniper. Walked the largest distance?
    You're a runner.

-   During the game, there are some messages reacting to the game state.
    If you hit someone that previously hit you, you get a "Revenge!" If
    a ball misses you by the *slimmest of margins* you get a "Ha,
    almost!"

These are small things, because I didn't have the time for more (and
don't have much experience with coding these things yet). But they help
*a lot* and always result in a fun discussion during/after a game.

**The main lesson?** I'm learning more and more that creating a fun game
doesn't necessarily mean the game *mechanics* are absolutely amazing,
but also means the whole *experience* around it (game feel, tiny
details, effects, etc.) is just "fun". So it's okay to focus on that a
lot and make the game itself pretty simple or standard.

Lesson \#7: UI = first impression
---------------------------------

Usually, game developers leave the menus and buttons and UI (user
interface) for last. But with each game I make, I learn (even more) how
important the interface is, and how you should spend more time on it.

For this game, the interface is all about configuring the game you want
to play. Which arena do you want? Which balls do you want to include?
Which powerups? Etcetera.

At first, I sketched a big screen full of sliders and buttons and stuff.
Because that's how many games do this: a plain old "settings" menu.

But then some of my previous experience kicked in and said: "No! This is
too hard to comprehend, too many options to process, too much on one
screen."

So I split it up. The interface now has multiple screens, in order,
where you choose your settings. First it only shows the "arenas" and you
can select the one you want. Continue. It shows all different ball
types, you can select the ones you want. Continue. After four screens,
you continue into the actual game.

Yes, this took some effort to implement, especially since I've never
done this before. But it made a *huge difference*. Configuring your game
was now a quick experience. Each screen only showed a few options, all
within the same category. You only had to move around (using your
default move input, aka *arrow keys* or *joystick*) and toggle stuff
on/off with the press of a button.

From now on, I'll probably do this for all games.

But the story continues! At first, all navigation was done with your
move input. If you tried to move right, but there was no option anymore
(you were at the edge of the grid), it would automatically continue to
the next screen.

Even though I really like this and think it's intuitive ... it's not so
*quick* when you don't want to change a lot of settings. In that case,
you are just pressing *right, right, right, right* at least twenty times
before the game actually starts. (My playtesters actually revealed this
flaw and I just *saw* their mood dropping when they realized they had to
move through the whole menu again.)

As usual with these One Week Games, there is some "bonus time". A full
day, maybe more (or less) after the week has ended, where I'm allowed to
fix the most important stuff.

Well, quite some time was spent adding better controls and graphics to
the interface. Now you can immediately skip screens by pressing SPACE
(forward) or BACKSPACE (backward). Underneath the arrows is a picture of
this key (or the corresponding key on your controller).

In fact, almost all *text* has been removed from the whole interface
now, and you can very quickly move around.

The result? My playtesters did not mind going through the interface and
changing some settings anymore, and I did not see their mood or energy
drop when they had to do that. It's literally 5-10 seconds between
startup and playing a game (if you want to keep your previous settings).

Even though that did not change gameplay *at all*, I think it made every
impression of the game at least ten times as good.

Lesson \#8: Start with extremes, then scale back
------------------------------------------------

Many properties of this game used to be more extreme, but were softened
after I did some playtests. I see this pattern a lot and think it's more
useful than the other way around (i.e. being very careful with your
settings, then cranking them up when they don't seem to work).

For example, you used to be able to dash and tackle continuously. Then
you could only dash once the previous dash ended. Now there's a timer of
5 seconds before you can dash again.

Or the "shrinking field" rule (where the arena slowly shrinks, and you
die if you're outside the "safe zone") used to be too quick and
unexpected. A game with this rule enabled would end within a minute, and
mostly because players didn't see it coming and suddenly died (to their
annoyance ...) So now it waits longer *and* flashes a short warning
before it starts to shrink.

Or the "statistics/traits" shown at the game over screen. At first, it
showed 3 per person. But that's *12 traits appearing on your screen* for
4 players! Just too much, overwhelming, and players stop reading them
after the first game. So I scaled back and it now randomly shows between
1-3 traits.

(The list goes on and on. There used to be more teleports in that
"teleport arena", the edges of the arena used to be pushed more outward
but it caused players to lose their character if too close to the edge,
there were originally 6 powerup slots (SIX! What was I thinking?!) per
player.)

Working this way, I think most values and mechanisms in the game ended
up quite balanced. Only a few playtests, a few days, were needed to
scale back from the extreme.

Properties that went the other way around, however, gave me more
trouble. When I first implemented "throwing the ball", they went too
slowly. So I increased the power. And I increased it more. I did a
playtest and increased it even further. But no matter how often this
cycle repeats, I was never *completely* satisfied.

Probably because I (and my playtesters) got used to the game, and the
old rules, so now they were like "why am I walking so slow?" and "why
can't I throw the ball faster?"

I don't know if I'm adequately explaining this, maybe I can do a better
job once I understand it better myself. It just feels like it's better
to balance games by starting with extremes, because starting
"conservatively" makes it easy to just completely miss mechanics or
their impact, so you don't even *know what you're trying to balance*.

**Remark:** on a related note, I have the tendency to think "oh man this
mechanic just *doesn't work*" when my playtesters don't really
understand or use it. But that's way too radical :p Usually, the problem
is one of *balance*, of *tuning the parameters*. Maybe players don't use
mechanic X because it's too weak right now, but if I make it twice as
fast it might be the best thing ever. So I try to catch myself when I'm
having these thoughts, and simply try other values/parameters *before*
scrapping the whole idea.

Conclusion
----------

So yeah, that's it. A game that's nothing special, very small, good for
a few quick rounds here and there.

But still, it's a game. A finished game people enjoy. Something that
taught me these lessons I explained above.

And that's what these "one week games" are all about: finishing,
learning, and mostly having a good time with my friends/family when
testing these games.

The next one will probably be completely different again. After all the
wonky physics stuff I did for this one, I'm done with that part of game
dev for the time being :p

Alternatively, if I find the courage, I will port this game to actual
3D.

Until the next devlog,

Pandaqi

**Remark:** Just wanted to state that I lost *hours* trying to find the
weirdest bug of my life. Whenever I exported the game, half of my font
files were just ... missing. It seemed really random, because the exact
same font would work in one scene, but be gone in the other.

It turned out that it was an issue with *case sensitivity*. Apparently,
when creating the project, I called the "Fonts" folder "FOnts" instead.
A simply typo, which I immediately fixed ... or so I thought. I had
already used the font in a few locations before changing the name. (I've
done this so many times, that I probably did it within a minute, on
autopilot.) So when I changed the folder name (*outside of my game
engine*), it all went mayhem a few days later.

So I renamed all font-related stuff "snake\_case"-style, relinked
everything, and it was fine. (I use *Godot game engine* by the way.)
