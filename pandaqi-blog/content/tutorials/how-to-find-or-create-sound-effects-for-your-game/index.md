---
title: 'Find/create sound FX for your game'
thumbnail_media: "sound-effects-header.webp"
tags: ["tutorial"]
date: 2022-01-13 23:46:32
emoji: "🔊"
---

Sound is one of those things game developers rarely talk about. Whenever
you watch a devlog or tutorial, it's always about the code, the idea,
the visuals, but never about sound!

And that's quite strange, because *every game needs sound*. In fact,
*bad (or no) sound effects can completely ruin any game*. It's often
seen as this annoying thing you'll have to do at some point. But after
making loads of games ... this means I've probably spent 100+ hours on
sounds alone.

As such, I had to learn *how to find sound effects* (or create them
myself) all on my own. Below I'll share what I've learned.

**Before we start:** when I mention doing something in a "DAW", I refer
to a Digital Audio Workstation ... which is simply software that can
manipulate audio. If you're a game developer, you probably already have
one installed and used it before. If not, the free [Audacity](https://www.audacityteam.org/)  can do all of this easily, and I use it 99% of the time.

Step 1: keep a list
-------------------

It's easy to miss opportunities for sound effects. Especially if you've
been developing/testing the game for a long time *without sound*. After
a while, the silence feels like the natural way to you, and you just
forget sound is an option.

(For example, there have been many games where I completely forgot to
add sounds to the interface, or when the player is walking.)

As such, when I create a game, I also keep a list of needed sound
effects. (If possible, I already write the line of code that calls the
right effect by name. During early development, the "audio manager"
simply ignores those calls. But when it's time to add the effects, I
turn it on again.)

For most games of mine, this list ended up being 1 or 2 pages in a Word
document, saying things like:

-   Trampoline =\> needs bouncy effect

-   Player =\> needs repeating footsteps

-   Buttons =\> need satisfying "click" or "pop" sound

When it's time to do the sound, I can just go through this list one by
one, and find what I need.

However, you'll notice these descriptions are a bit vague ("needs bouncy
effect") ...

Step 2: clearly define what you need
------------------------------------

With my first games, my descriptions were even worse!

I would literally say: "Trampoline: needs trampoline sound"

This is extremely *vague* and doesn't really help you when searching for
sounds. What *is* a trampoline sound? Different trampolines sound
different. Do you want the sound of someone *jumping* on it, or someone
*entering* it, or someone slapping the outer ring (that most big
trampolines have), or kids cheering and having fun?

Make it concrete. At first, this can still be a bit general, like my
list above. "Trampoline: needs bouncy effect."

But as soon as you start to search for the actual sound, you *need* a
clear picture. Try to imagine what works best for your game. Try to
associate what kinds of sounds could "simulate" a trampoline bounce.

And then use something called **the internet** to find them. There are
many websites with free sounds that are fine. (ZapSplat is a popular one
that comes to mind now.) Most of them also have premium sounds, which
are also fine (if you're able to pay for those).

However, there are two rules:

-   You will **never find the effect you need by simply searching for
    the obvious terminology.**

-   And you will **never be able to immediately use the effect in your
    game**.

If you search for "trampoline sound effect", you get a few results that
either sound way too realistic to be used in a game (they were literally
recorded by someone jumping on a trampoline and holding a microphone),
and a few cartoon ones that sound like they're from a bad kids' TV show.

It's highly unlikely this is what you need. It's also highly unlikely
that you can just download these, put them in the game, and it's
perfect.

Instead, try to define the effect you need in terms you can search for.

For example, I want my trampoline sound to be:

-   A bit cartoony, but not too much

-   To have real weight to it, a real *oomph*

-   To be quite long, so it needs a tail that lasts until the player has
    landed again

Step 3: Combine multiple sounds
-------------------------------

These are things you can search for. You can associate real-life objects
or sounds with these ideas.

And then? Then you can search for each individual association/sound ...
and combine them in your favorite audio editor.

**Why would I go through all this trouble?** As I said, you will never
find a single pre-made sound that has all these properties you need and
fits exactly into your game. No, such a sound has to be *designed* by
yourself.

Additionally, if you use sounds from the internet 1-on-1 in your
project, it's likely the identical sound is also *part of many other
games*. Your game will get a bad reputation, it will sound unoriginal,
and people might even subconsciously associate it with those other
games.

For example: in an older game of mine (*Square Ogre*), I ended up
creating a trampoline sound this way:

-   I took a cartoony "pooooiiiiingggg" sound (cartoony)

-   I took a low "thump" sound (weight, bass frequencies)

-   I took the sound of a (panicked) bird flapping its wings (gives a
    tail and extra power to the sound)

Overlaying these sounds and lining them up (so none of them starts too
late or lasts too long) created a sound that was *exactly what I needed*
and just sounded *awesome* in general.

Here's the trailer for "Square Ogre". From 00:38 seconds, you can hear a
few trampolines after each other:

[plugin:youtube](https://www.youtube.com/watch?v=wbbFJdYkwZ4)

If you play the trailer from the start, you can also hear other sounds,
such as footsteps and a "success" (or "failure") sound. You guessed it:
these aren't singular sounds. They are multiple sounds, layered on top
of each other. You can hear this especially in the "success" sound: it
has three different parts that quickly fire after each other.

**Remark:** the actual *background theme* for this game was *not* made
in Audacity nor with the techniques discussed here. These techniques are
for *sound effects*. That's different! When I record a theme song, I use
real instruments, music theory, practices from mixing music, and I
record it with Studio One.

So, in conclusion, that's how you need to think:

-   What properties do I need?

-   What (real-life, existing) sounds have those properties?

-   Search for those sounds until you find those that fit the best

-   Combine them into the perfect sound for your game

Step 4: Normalize
-----------------

Sound sources from the internet, or even those you recorded yourself,
will have all sorts of different **volume levels.**

One might be rather quiet. Another might be *as loud as is physically
possible*.

If you combine these in your game, it will sound awful. The quiet
effects simply fall away and can't be heard, the louder ones make people
scared and annoyed (and take over the whole soundscape).

Instead, once you have all your sounds, **normalize them**. Put them all
in your favorite DAW ("Digital Audio Workstation") and find the button
for "normalize".

This brings them all to the same volume at the maximum possible
loudness.

(At least, that's the *goal*. Your DAW might mean a slightly different
thing with "normalize", in which case you'll have to manually do some
extra steps.)

In most games, having all sound effects at the same volume is the way to
go. There will be some sound effects that need further tuning (just a
little softer, just a little louder, etc.) You can do that in your game
engine by tweaking their specific volumes.

By having everything at the same base volume, it just makes those tweaks
much simpler (and faster to execute).

Step 5: Standard edits
----------------------

Besides normalizing, there are some standard edits I've learnt to do.
Believe me, I tried to ignore these (as they can be boring and
time-consuming), but it just makes a big difference.

Those edits are:

-   Make the effect as *short as possible*. Usually, you can cut some at
    the start (before the sound really starts) and loads at the end
    (when the sound is already softening or barely audible).

-   Apply a "fade in" at the start of the effect.

-   Apply a "fade out" at the end of the effect.

Be generous here. *Rarely does a game benefit from overly long sounds.*
Especially if you have many sounds at the same time -- it just becomes a
confusing mess. I've found that \~0.3 seconds is the sweet spot for most
of these.

Applying the fades ensures there's no "sudden stop" or "pop" when an
effect starts or ends.

Additionally, these are some things I've learnt:

-   Shortening existing sounds, to shorten the overall length of the
    effect, is usually *fine*. Most software can do this easily without
    making it sound weird.

-   In general, just don't be afraid to take existing sounds and
    completely *destroy them*. Change their pitch, add effects, cut them
    into pieces, reverse them, whatever it takes to get a certain sound!

-   The shorter and more impactful the sound, the less recording and
    editing quality matters.

-   Try to avoid sounds with lots of *reverb* (or other effects) built
    into them. Instead, get *dry/clean* sounds, and add the effects
    yourself if needed. (If your game engine supports it, add those
    effects in real-time in the game. Take the trailer as an example
    again: the slight reverb you hear there is all done by the game
    engine.)

-   If you need a big sound, don't just make it louder, or combine two
    similar effects. Instead, I usually layer three effects that are *as
    different as possible*. One is the "main sound", one is pitched
    lower, and one is pitched higher. (For example, take three
    explosions, and shift one downwards in pitch, and another upwards.)

Step 6: repetition is annoying (and unrealistic)
------------------------------------------------

If a sound effect happens often in the game, make sure it's not just *a
single effect repeating constantly*.

The first thing, which most game engines support, is **pitch shifting**.
Any time you play the sound, randomly shift the pitch up or down. (Maybe
even change the speed or other properties.) If you do this *slightly*,
it remains the same sound effect, but also has variation and surprise.

The second thing is to simply have **multiple effects for the same
thing.** One of my games has *four different sounds* for coins. My
"button click sound" in the interface is usually a list of 5+ sounds
that are slightly different. Whenever I need to play such a sound, it
just selects randomly from the list.

(There's a danger here of being *too varied*. The players should still
hear the sound and know what it means, instantly. If they're too
different, you lose this connection, which means you lose 90% of the
reason why you'd add sound effects in the first place.)

And if you think about it, this is only logical. Sounds in real life are
never *100% identical*. Hitting something twice in a row will never
produce an identical waveform. So add that variety to your sound effects
as well.

Step 7: Record them yourself
----------------------------

If you can't find the sounds you need, if you can't make it work ...
well, no issue, you can always record your own!

Technology has advanced in leaps and bounds the past ten years, and
microphone quality has advanced with it. You can record effects with
your phone, your laptop, whatever and it will be fine 99% of the time.

(Although I've noticed that most game developers also have an interest
in music, or recording devlogs, which means they already have a good
microphone! Use that instead!)

For these sounds, all the same steps still hold. Most games are *not*
the same as reality and thus do not *want* sound effects that sound very
realistic, so you won't find the perfect sound (which you don't need to
edit) in the wild.

The main point, though, is that **recording sounds is free.** You can
literally walk around the house for an hour, microphone (or smartphone)
in hand, and make all sorts of noises. Hit stuff, jump, slam doors,
start a blender, anything.

Later, you can throw away the 55 minutes you don't need, and keep the
sounds that ended up being great ideas!

The end
-------

That's it!

Whatever sound you need, you can usually get it (for free). But don't
assume you will just be able to search for it, then plop a .mp3 into
your game and be done.

Design your sounds. Define the characteristics you want, find sounds
that have that, then mix them together into your ultimate sounds.

Do this in a few different ways to get variety (or just to experiment
and find the best one).

Rinse and repeat.

Whatever you do, don't settle for the exact same sounds in all of your
games. I see *many* game developers using a tool like Bfxr to get a few
similar-sounding arcade sounds, which they use for absolutely
everything. Most of the time, the sounds just don't fit, and their use
sounds cliché and amateur to me.

Sound is important. It's a huge area of expertise. Even my smallest
games can have hundreds of sounds. So *design* your sounds and give it
the attention it deserves.

Hope this helped, until the next one,

Pandaqi

Some remarks
------------

**Remark 1:** This idea of "layering existing sounds to get what you
want" isn't just restricted to games, of course. It's used everywhere.
It's what your favorite musician uses to get their own distinct sound
out of basic instruments and stock plugins.

(Off the top of my head, I recall Finneas saying this exact thing: when
he needs drums for a song, he takes a few stock drum samples and then
*lays them on top of each other* to get a unique drum sound.)

**Remark 2:** I mostly make *local multiplayer* games (sometimes with a
solo mode, sometimes not), which means there are usually *multiple
characters on a single screen*, which all need sound feedback.

At first, I used default "static" sounds for that. But that was a mess.
If a player was in the left corner doing something, you don't want that
sound effect blasting full-volume through the center, confusing everyone
else.

So I switched to (mostly) "positional" sounds. (This is a built-in thing
in most game engines.) Now, when a player does something in the left
corner, the effect will *sound* like it's coming from that corner. (It
only plays in the left speaker, perhaps with a softer volume.)

But this still wasn't enough! Because when you have a single screen,
there might be loads of things happening ... without any player nearby
to see it.

(For example, in my game "Company of the Tackling Tourists", the screen
is a full map with hazards appearing and disappearing all the time. It
would be absolute chaos to play the sound effect for each one of them,
even if nobody even saw it happening!)

As such, I learned to make most sound effects "distance based". For
those, I calculate the minimum distance to *any player*. If this is too
large, the sound isn't played at all. Otherwise, the volume is scaled
according to that distance. (The closer the player gets, the louder this
sound effect becomes.)

Granted, this is a specific issue with *local multiplayer games*. If
you're making a regular single-player experience, there's only one
player, and the camera focuses on them -- so no need to do any of this!
