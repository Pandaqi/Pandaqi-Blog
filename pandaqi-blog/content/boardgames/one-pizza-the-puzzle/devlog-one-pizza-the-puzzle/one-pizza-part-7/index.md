---
title: 'One Pizza The Puzzle (Part 7)'
thumbnail_media: ../../one-pizza-header.webp
tags: ["devlog"]
date: 2020-10-25 15:00:00
---

This is part 7 of the devlog for my game "One Pizza the Puzzle". (It's also the final part of the devlog.)

{{% multipart-message %}}

Pre-Playtest
------------

When you make many games, and play/test them often, you get a certain
"sense" or "intuition" for what works and what doesn't. As such, when
*preparing* for my next testing session, I suddenly realized there were
some issues with the game that would probably lead to trouble if
unchanged.

**Subways:** if you take multiple subways ... there's no way to know
where your current line is! Because you teleport across the map, you
don't know *where* you teleported to.

After some thinking, I added **numbers** to subways. You must always
teleport to the *next* number (e.g. from subway 3 -\> subway 4). Players
also may **not** use subways more than once.

It adds one extra rule to the subway mechanic, but I think it's worth it
for the enormous clarity it gives.

**Skip-shapes:** in the list of movement shapes, I included two (a
straight and a corner) that allow you to **skip** a square. This was
added to make the game a little less harsh (if you're almost stuck, this
shape can often help you do *something*), but it has some issues:

-   It's incredibly similar to a normal *straight* and *corner* shape. I
    don't see any use in including *both*, so I wrote some code to
    include only one shape of this type and then destroy the others.

-   It was hard to concisely explain this shape within the base rules.
    So I made a small section at the back of the rules with a *full
    overview* of all the shapes, which also explains the skip shape.

-   Why is it hard? Because "skip" can mean a number of things, so I
    need to clarify that. In this case, you literally ignore what's on
    that square (be it couriers or entrances) and continue after it.

At this point, just before testing the game, I think the game is near
finished ... but I still have these doubts I want to challenge:

-   The base game has become *just* too complex. (With the extra rules
    for subways, splitting lines, and the skip-shape.)

-   I'm not sure if the board will remain readable and clear. I've done
    everything I could to prevent the couriers/drawn lines from turning
    into a mess, but we'll need to see how it works in practice.

-   I've tried to balance the game in a few major ways (for example,
    there are no 1 dollar pizzas anymore, because that made the game too
    slow). It remains to be seen if those were indeed improvements.

So, let's go!

**Remark:** yes, this devlog turned out *way longer* than I anticipated
at the start. I thought I had the game mechanics figured out, it was so
simple and it *just worked*, but testing the game revealed major flaws
*and* major ways to improve it.

So although I'm always slightly frustrated by the fact that nothing
works the first time, that's just the way creative projects go. In the
end, after many different tests, versions and experiments, this game is
a much better version than the original idea. And that's what it's all
about.

Playtest Session \#4
--------------------

The playtest went really well!

The game was quick, competitive, easy to understand. The board remained
clean and readable the whole game, thanks to the improved rules for
splitting lines and subways.

In fact, there might be just a little too much space on the board.
However, with the expansions enabled, you really need that space (for
many reasons), so I'm not going to change that.

These were the last few issues I've noted:

**Problem \#1**: There's a bug in the algorithm for generating the
boards. This caused some ingredient buildings to be without entrance,
which is a bad thing. I'll fix that.

**Problem \#2:** Some elements might be *slightly* overpowered:

-   Your starting restaurant. (However, you can choose this yourself. So
    it comes down to being able to estimate how useful each location is
    when you start the game, which you get better at as you play more
    games.)

-   Resetting your courier.

-   The 10\$ pizzas.

Many games were (almost) won by somebody suddenly delivering that one
10-dollar pizza. Although this was by design, and means the game is
quite well balanced, it feels some part of this strategy is overpowered.

After many games, I've found the culprit: *resetting*. Many players won
by resetting their courier once they had all ingredients, and then
racing to that 10-dollar pizza.

As such, I might raise the penalty for resetting.

On the other hand, the expansions were made exactly to combat this. In
each expansion, there are more ways to block other players, or even
steal ingredients from them. This makes it more likely that somebody who
is *clearly* going for the 10-dollar pizza, gets more pushback.

So I'm still on the fence about this, because I want to keep the base
game as *simple* and *straightforward* as possible.

**Problem \#3:** the duration of the game raises consistently with the
player count. This is not a big deal, because I don't think anybody
expects a 6-player game to be as short as a 2-player one. Nevertheless,
I think it's a good idea to *inform* people of this:

\> The game takes roughly 10-15 minutes *per player*.

**Problem \#4:** players easily forget that you must choose *different
movement shapes* for each of your couriers. That's too bad, especially
because it's an important rule for balance in the later stage of the
game. I will probably put a reminder of that on each generated board.

Conclusion
----------

But that's all. There were no significant problems with any part of the
game, and any variation or imbalances came from the fact that boards are
randomly generated. (And players have different skill levels, because
some of them have already tested this game multiple times, and some were
completely new.)

That's why I'm going to call this game finished! (After I fix the bugs,
of course.)

Feel free to play the game as much as you like, enjoy it, and tell me
the results! Any feedback as welcome.

As always, I hope this devlog was interesting and informative, or at
least fun to read.

Until the next devlog,

Pandaqi