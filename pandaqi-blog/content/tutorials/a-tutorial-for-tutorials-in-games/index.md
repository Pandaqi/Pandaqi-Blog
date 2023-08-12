---
draft: true
title: 'A tutorial for tutorials in games'
tags: ["tutorial"]
date: 2023-01-01 12:12:12
---

I've been making both boardgames and videogames for a while now.

I'm not an expert or award-winning creator -- as will become apparent
when you read this article and see all my mistakes -- but I *do* have a
passion for learning, teaching, and inventing special types of games.

That's why I've always tried to improve my tutorials. To find better,
faster, easier, simpler ways to *teach* a new game to new players. (Also
because of the obvious reasons: *if players don't understand the game,
they can't play it* and *tutorials are the first thing someone sees*.)

In this article, I want to show you the evolution of tutorials in my
games. Where I started, what was wrong with that, and where I'm
currently. Hopefully it can give tips for creating better tutorials in
your games!

*Remark:* most of my oldest games are not available online, or even
anywhere, so I have no screenshots/links to provide. But examples from
the latter half of the article *do* have links where you can check them
out and see these tutorials in action.

My first games ...
------------------

... had no tutorial.

I was young, I was naïve. I thought: "everyone knows you MOVE with the
arrow keys, right?"

As it turns out, most people do not know. Or they know, but won't just
*assume* that a new game uses those keys (without any explanation or
confirmation). Even if people *know* and *try* those keys immediately,
it's still a failure on my part and causes friction during the first
impressions of the game.

I'm *not* saying: "explain absolutely everything to the player before
they play"

As you will see, I've learned that *discovery* and *testing the system*
is a large part of the fun for players. It's also a way better method of
actually learning a new system or set of rules, as opposed to simply
*reading* them and hoping you don't forget.

There's a balance here. But including absolutely *no tutorial* is quite
obviously an extreme situation that's not desirable :p

Text on a screen
----------------

I learned my lesson. My games after that had a **block of text** when
you first started the game.

It said something like this:

> "Your goal is to get 10 points before the opponent. Move with the
> ARROW KEYS. Pick things up with SPACEBAR. Tip: try moving more
> efficiently than your opponents. There are powerups in the game that
> might help you (or not), these are ... bla bla ... bla bla bla"

I was proud of this. I basically wrote down *all the rules* for the game
in a single (perhaps long) paragraph. I *told* the player exactly what
to do, what buttons to press, maybe even "tips" for the game.

As you'd expect, this wasn't great either.

It's just *too much information*. Even if a player bothered to pay
attention and actually read the full thing, they'd forget 90% of it, and
probably lost all initial enthusiasm for the game in the progress. (And,
again, that "discover the rules" part was missing when I explicitly told
you how to be better at the game.)

Image on a screen
-----------------

Okay, so, I just learned (video) games are a *visual medium*. And people
like images and icons.

What if we transform that wall of text ... into a big image?

And that's what I did, quite literally. I wrote the same "wall of text"
for each game, but when I was done, I turned as many things as I could
into images.

This was the *first time* I'd actually *drawn the arrow keys* on a
keyboard. (Eliminating all my family's questions of: "huh, what are
arrow keys?")

This was the *first time* I'd used *icons* to signal important parts of
the game, such as "objective", "input", and "how many lives you have"

And lastly, this was the first time I'd used my drawing for the player
*in the tutorial itself*, instead of just referring to some mystical
"player" and hoping everyone figures out the connection.

Looking back, it's stupid I didn't realize this sooner. But hey, that's
how learning goes: you try something, you make mistakes, you learn from
it.

This image was a *huge improvement*. It looked cleaner and better. It
had more color, people knew what to expect (because they'd seen what
their player looked like), it looked more professional.

But it was still **one huge image** with all information on there.
People still forgot 90% of the information on it. Many of my playtesters
(usually my friends and family, at the time) didn't even read it. They
were like "wow, you know what? Let me just start playing and we'll
figure it out!"

Better image on a screen
------------------------

Around this time, I had learned the importance of visual design. Both in
terms of *making things look good*, but also in terms of *structuring
lay-outs in a good way*.

(I must ashamedly admit that I always looked down upon people who
thought graphics, design, marketing, etc. were hard to do or even
*important*. I grew up playing loads of boardgames, which probably gave
me the attitude: "it's about the *rules and mechanics*, the rest is just
fluff!"\
\
Well, I was wrong. Nowadays, I probably spend way more time trying to
make things look good and well-structured, than actually creating the
game. And it's time well-spent.)

Previously, I approached the tutorial like it was a *single paragraph*.
A wall of information, read it from top to bottom (left to right), and
when it ends you're done.

But when I took a good look at rulebooks (which I found beautiful and
well-made), they *always* had very clear *sections*. And the actual
paragraphs and sentences could be extremely short.

So I did the same thing:

\<IMAGE HERE (use from my Suspicious Fishes) tutorials?\>

**Remark:** this example is actually from a "work-in-progress" game,
which might be released by the time you read this: "Good Friends are
Hard to Find". The reason I chose to use this structure, rather than the
"better ones" I give below, is because the game consists of 10+ unique
"game modes". Each has their own rules. They are simple enough that the
image above is literally all you need. But I couldn't make a "general
tutorial" for all modes, because they're too different!

Anyway, this was another clear improvement. It's (again) shorter,
cleaner, easier to parse, and keeps more of that initial enthusiasm for
the game.

Wait, we have infinite space!
-----------------------------

So far, I'd never done a tutorial that was *more than a single
screen/image*.

And then I realized: we're making a video game here ... I can just break
this up. There's nothing deterring me from breaking this big image into
10 small ones.

Instead of one screen showing the usual stuff (objective, input, general
rules, etc.), each section received its own image.

At first, they automatically changed. (So every 10 seconds, it would
switch to the next screen.) Bad idea, obviously. Some people read
slower, others read faster.

I changed it so people could press any button to progress. And once they
were through all screens, the game started!

I don't have a good example for this, because I *very quickly* realized
the next step!

Wait, we have infinite levels!
------------------------------

Breaking a big image into 10 small ones *still meant an information
overload*, just with better structure and some pauses in-between.

But then I realized: **it's a game, we can have multiple levels!**

And each level can teach *one new thing*. You don't get all information
up-front, you get it spread across 10 levels, and you only get the
information you *need*.

I've used this technique in my first two "One Week Games": 

* [A Recipe for Disaster](https://pandaqi.com/a-recipe-for-disaster)
* [I Wish You Good Hug](https://pandaqi.com/i-wish-you-good-hug)

Now, often it's hard to break a game concept into 10 pieces that
perfectly build on top of each other. Often, systems are related, rules
are balanced against each other, so you can't just *not explain
something* and expect it to work out.

How to solve this? Well, by literally *forcefully removing rules* (or
simplifying them) during the tutorial levels.

I created a simple system where I have a huge "configuration/settings"
object, where I can toggle any settings on/off per level. Independently
of one another.

In "I Wish You Good Hug", you only learn to *rotate* after a few levels.
Before that moment, I simply set "players\_can\_rotate = false", which
is then used to disable that input entirely. So you can't "accidentally"
rotate, or use the mechanic when you were not supposed to, or whatever.

\<@TODO: Image here\>

Of course, this also often means inventing "tiny systems" to keep the
tutorial levels balanced or even playable. In this case, in level 1 the
players *automatically rotate* (to a fixed timer), and in level 2 they
get a *rotator cell* (stand on it to rotate).

\<@TODO: Image here\>

In the end, these games feature 20-30 levels. Each level has a tutorial
image, but it usually just explains *one simple new thing*. And because
it's so simple, it has more than enough room to add an image/animation
and a nice lay-out.

\<@TODO: Image here\>

A short detour
--------------

Somewhere around this period, I made two games that needed some
tutorial: [Into My Arms](https://pandaqi.com/into-my-arms) and [Mission Uncontrollable](https://pandaqi.com/mission-Uncontrollable).

Both were made for game jams, but I ended up turning the first into a
full-fledged puzzle game. However, because of the time limit, I kind of
"reverted back to old habits".

"Into My Arms" features a small introductory animation, which introduces
the story + the main game mechanic. After that, each level has one or
two "verses" of text around it. Most of the time, these just continue
the story. But at the start of the game, these tell you the game rules
and the controls.

\<IMAGE HERE: Into My Arms puzzles with text around them\>

This was a cute idea and worked relatively *fine* ... but it's a very
vague explanation. Many people still didn't know exactly what to do, no
matter how many times they read this text. It would've been better to
add a clear *animation* + *logical explanation* where needed and leave
the story texts for later levels.

"Mission Uncontrollable" gives you the option (at the menu) to include a
tutorial room at the start. (Each game is randomly generated from a
bunch of rooms connected to each other.) This "room" is simply empty
space, with the instructions as an image on the back wall.

\<IMAGE HERE: Mission Uncontrollable tutorial room\>

Again, this was *fine* ... but not ideal. The lack of space meant I
literally forgot to explain some rules that were quite important.
(Luckily, they were intuitive enough that 95% of the people playing it
knew what to do.) And it was easy to (accidentally) fall out of this
room within a few seconds, meaning you couldn't read the tutorial
anymore.

Input = Immediately testable
----------------------------

By now, I realized my tutorials were *waaaaay* better than before.
People easily understood them, got through them, and had fun. Great!

However, a pattern emerged after so many games and playtesting sessions:
people still skimped on the parts where *input/buttons/controls* where
explained.

And this is actually quite logical.

-   The game says "find this button on your device"

-   People look down at their controller/keyboard to find the button

-   "When you use it in the game, you will do this or that"

-   People are like "ah, okay, we'll see I guess"

-   It takes at least a few seconds (usually much longer) before they
    can actually *try it* and *use it*.

Input is essential to convey well. (Without it, you literally cannot
play the game :p) It's also the one thing that is immediately testable
and usable.

If I say "press this button" ... I should allow the player to do so
immediately and get the result.

For my third One Week Game, called [Totems of Tag](https://pandaqi.com/totems-of-tag), I
leaned into this.

There is no tutorial. When you play your first game, simple *speech
bubbles* appear above the player's heads. They say:

-   "Use these keys to move around" =\> after moving for at least 300
    pixels, it changes to ...

-   "Press this button to throw a ball" =\> after throwing at least 3
    balls, it changes to ...

-   "Press this button to dash" =\> after dashing at least 3 times, it
    goes away

(There are some extra steps in the real tutorial, but I've left them out
here for simplicity's sake.)

\<@TODO: IMAGE HERE (Totems of Tag tutorial)\>

These keys and buttons *depend on the player* (aka a keyboard player
uses something different from someone with a controller). So it only
makes sense to show the "tutorial" for it *near the player that needs
it*.

Secondly, they can immediately test it, and automatically progress when
they've *shown* they can find the button and do something with it.
(Although these "tests" mustn't be too hard, of course, or people get
stuck halfway the tutorial :p)

The result? Nobody cared there wasn't a tutorial, nobody missed it or
was looking for it. They just pressed "play", learned as they went, and
could *fully play and enjoy the game* after playing the first round.

Admittedly, this is a relatively *simple* game, which is a real-time
chaotic multiplayer. This is harder to do in complex turn-based games,
especially those that require strategy from the get-go.

But after trying this system once, I knew I could never go back. It was
far superior to anything else. Even if it means a lot more work on my
part -- creating a unique tutorial level, with some unique settings and
things to balance it, which teaches the game well -- it's totally worth
it.

Inspiration from playing cards
------------------------------

One thing I've always noticed, is that games with *cards* can be
extremely complex ... yet super simple and quick to teach to new
players.

Why is that? Well, all the "rules" and "complexity" is hidden on the
cards. You don't explain the exact action/cost/function of *every card
in the game*. You just say "this is what a card looks like, read it to
know what it does".

In a sense, it's identical to the system I described above: precisely
when you need it, there's a short prompt that tells you exactly what to
do.

This gave me inspiration to try an even *better* tutorial for my next
game: [Company of the Tackling Tourists](https://pandaqi.com/company-of-the-tackling-tourists).

### First Improvement

When you start the game, you get the (expected) prompt to log in your
devices. That's nothing new. But when you do so, you now immediately get
a *character* on the screen with a bubble above its head saying, "move
with these keys".

In other words, right after logging in, people can already test *moving
around* (and they know what their character and game looks like in
general).

To start the game, all players need to move to the "play" icon. Which is
not only a fun way to do a menu, it also "tests" if they can move
somewhat adequately.

At this point, you haven't even started a level yet. Yet every player
knows how to move -- nothing else needs to explain or test that.

### Second Improvement

So far, I've brought the tutorial (per level) down to "a single image
with not so much content".

We can go even further than that!

We can break an image down into *pieces of information*. Each piece is
then placed on a "playing card". When you start the level, you only see
the first card. When you're ready, press a button to flip the card next
to it. Once all cards are flipped -- and thus all new rules read and
understood -- the game starts.

It looks like this:

\<@TODO: IMAGE HERE (from Level Tutorial in Tackling Tourists)\>

In this game, there are basically 5 different "card types" that can
appear:

-   **Control** =\> teaches a new button to use

-   **Landmark** =\> teaches a new landmark you can visit

-   **Tourist** =\> teaches a new tourist you can pick up

-   **Terrain** =\> teaches a new terrain type that can appear in the
    world

-   **Rule** =\> teaches a general rule that goes into effect from now
    on (such as "tourists can't walk over water")

Each level has one of these cards that you can reveal. (Early levels
might have two or three, as some things had to be taught
simultaneously.)

This feeds information to players in the absolute *smallest* and
*simplest* way. (At least, the simplest way I can imagine, at the
moment.) But it also adds a nice sense of discovery and anticipation:
with each new rule, it's as if you were collecting cards in a real
trading card game.

Maybe I discover even better ways in the future, but I don't see how.

### Why not 100% interactive?

Yes, these are still "images" before playing. Ideally, you'd make all of
this interactive. For example, a prompt about a new rule *only pops up*
the first time this rules has an effect.

But this has several issues:

-   Some things just *cannot be taught this way*. For example, terrain
    types are present *from the start of the game*, so the tutorial
    would happen immediately before playing anyway. Or a general rule
    that *always has an effect* creates the same problem.

-   Not knowing how something works, would prohibit you from doing
    "sensible things". If you don't know *how* a new landmark must be
    visited, you cannot strategize, and will probably do dumb stuff that
    just wastes time. (Maybe players *never* come close to figuring out
    how to visit it, so the tutorial prompt never appears.)

-   And mixing *interactive teaching* with *tutorials* is a fine line.
    If done poorly, the players would never know whether something has
    already been taught, or a new rule will suddenly pop up during play!

The conclusion is: teach as much as you can *interactively* (when you
need it, get the info and immediately test it -- especially input). But
do the rest via *bite-sized, absolute smallest piece* tutorials
beforehand.

If needed, remove whole systems and mechanics at first, just to start
with the basics.

And if you think you can't go any simpler/smaller, think again :p When I
made my first games, I was *so convinced* that I made it short and
sweet. This couldn't possibly be simpler! The tutorial cannot be more
succinct!

But I was completely wrong -- if I were to remake those old tutorials
today, I would probably teach 50% of it interactively, and the rest
spread across 5+ levels with *extremely simple* tutorial
images/animations.

And yes, that takes exponentially more time to make and implement. But
it's worth it. Because nobody wanted to play those older games of mine
(causing me to even lose most of them entirely), while my newer games
are actually played and enjoyed. And sometimes, one of my newer games
even used an idea/mechanic *I invented 10 years ago and also used for an
older game* :p

Closing remarks
---------------

I have several closing remarks I didn't know where else to put.

### Campaign vs "Free Play"

For "Totems of Tag", I made *everything* configurable from the start.
Before playing a game, you can select which items you want to include.
When hovering over an item, it gives a quick explanation of how it
works.

This actually worked great! It forced me to keep all powerups/rules/ball
types/etc. simple. And that one-liner explanation was always enough, at
least to get the gist of it.

But ... that was a very easy game to understand.

"Company of the Tackling Tourists" is much more complex. It has more
content, more rules, more variation, more to learn!

I gave that game a "campaign" or "free play" structure. At the start,
you can choose what you want to do. The first one has loads of levels,
in the right order, each teaching you the next step. The second one
leads to a configuration screen, much like Totems of Tag, where you
*choose* which tourists/landmark/terrain/rules to include.

I think this is the best structure. It doesn't limit players from making
their own custom game, leaving out things they might not enjoy that
much.

But it also ensures that tutorials don't get in the way of that "free
play" experience. You only get the tutorial if you do the campaign.

(This also means that, in case you have new people playing, you can play
campaign levels to teach them the game. It's not a one-time thing. And
you don't need to do a boring rules explanation beforehand.)

My opinion on this might change. I haven't done this often enough to be
certain. But for now, this works wonders.

### Board games?

I've mostly been talking about video games. Of course, the general ideas
still hold for board games:

-   Make everything as simple as you can

-   Feed information in the smallest possible chunks, preferably exactly
    when someone needs it. (On a playing card, when someone can play it.
    Icons on the board, when somebody visits that location.)

-   Use images, icons, "testable examples".

But there's a limit here. The board game *cannot push you back* when you
break the rules. It cannot forcibly turn rules on/off, or "test" whether
you understood what an action means.

A rulebook and a short teaching/learning period before playing a
boardgame will, I think, *always* stay necessary.

However, there is still something to learn here. I rarely see boardgames
using a "campaign" structure or "difficulty levels" like video games do!
Even though we *know* it works well.

(An example that comes to mind is "Magic Maze". It has a set of
scenarios, where the first one is extremely simple -- just the basic
rules -- but later ones get all these special abilities, icons on the
board, interesting restrictions, etcetera. The game is fun *whatever
scenario you play*, but because of this structure, there's almost no
tutorial necessary and you learn as you go.)

And even then, you can make it more interactive. For example, you might
add a deck of "tutorial cards". The back of the card shows a certain
action or situation -- whenever that happens, you pick up the card and
read the front! (And the "front" obviously contains the necessary rules
to learn for the action/situation you just decided to do.)

I'm not saying this works for all games, or that it is surely an
improvement everywhere, or that you have to do it with playing cards.
I'm just saying there's room for developing systems *in boardgames* to
provide better tutorials. Because right now, expecting someone to read
10 pages full of text and rules and difficult mechanics ... and then
explain that to a table full of people eager to actually *play* ... is
kind of ridiculous.

And those are my thoughts on tutorials, what I've learned, and what I
think works well (or at least better than my initial failures).

Until the next time,

Pandaqi
