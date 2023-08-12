---
title: 'One Pizza The Puzzle (Part 3)'
thumbnail_media: ../../one-pizza-header.webp
tags: ["devlog"]
date: 2020-10-25 11:00:00
---

Welcome to part 3 of my devlog for my game "One Pizza the Puzzle".

{{% multipart-message %}}

Solving the issue of Interactivity
----------------------------------

During my test games, subways were never used. Not a single time.

Why is that?

-   There aren't many of them, and they aren't always placed at useful
    positions. So you need to move *out of your way* to reach them.

-   You *also* need a specific ingredient (Onion, in this case) and pay
    that.

That's just too harsh.

I decided to make subways **free to use**. If you're near one, and you
want to use it, just teleport to another subway and continue your line
there!

(I also greatly improved the board generation algorithm. Now it places
subways intelligently and more often. There's also a slider for
"variation": on higher settings, the roads curve and bend a lot more,
which removes those boring stretches of straight roads. I also fixed
like ten other issues, such as making boards smaller and tighter, but
that's something for the *technical devlog*.)

So ... what should we do with the ~~drunken sailor~~ **Onion
ingredient?** Let's grab this opportunity to get that juicy
*interactivity* into our game. What's an easy way to *block* or at least
*divert* your opponent's plans?

Well, by literally diverting their couriers. This is what the Onion does
now:

\> **Onion:** Perform one "Move" action for a courier of *another
player*. Alternatively, move *all their couriers* by a single step.

Yes, this means you can also *reset* the courier of another player,
although the rules state that you don't suffer the penalty in that case.
(That would be *way* too harsh.)

This also means you have an interesting choice to make when someone has
multiple couriers: divert one of them by *a lot*, or divert each of them
a tiny bit?

Playtest Session \#2
--------------------

My second set of games revealed some more glaring issues with the game.
(Also because there were more players and they weren't typical gamers,
so it took more time to understand the rules.)

**Big problem \#1:** the "Prepare" action takes a *looong time*. It
slows down the game and most players hate having to take that action.

So ... let's just cut it from the rules completely? It was originally
put in for thematic sake *and* in hopes of introducing an element of
timing, but those positives don't outweigh the negatives.

The new rule is simply: "you can deliver any pizza as long as you have
the ingredients in your inventory". Should also help clear some space on
the board and simplify the rules. For now, I've decided to move this
mechanic to an expansion and probably *modify* it to be more fun.

(Additionally, if you didn't write your ingredients cleanly in your
restaurant ... it was really hard to bake them into a pizza later. If
they are very far apart, there's just no way to draw a circle around
them all without creating a mess.)

**Update!** After thinking about it some more, I realized why this
action doesn't work. It's supposed to add an element of timing -- will I
move my courier now, or spend the turn preparing the ingredients? -- but
most players just ... baked everything at the last second. There's no
strong reason to do it any earlier. That's why the mechanic fell flat on
its face.

You could fix that by making the "Prepare" action time-dependent. For
example, you could change the action to "Turn on the oven". After you've
done that, you can bake an ingredient *for free* each turn, because now
your oven is on. Once you deliver a pizza, the oven turns off again.

This way, there's a clear benefit to "wasting" a turn earlier in the
game to bake more ingredients.

However, explaining this in the rules will take up some time and space,
which I can't spare. I need to keep the (base) game simple. So for now,
my decision remains: this whole action is out of the game.

**Big problem \#2:** now you can run parallel another player ... always.
This means that it's quite rare that you actually *block* another player
completely, because they can just follow your line until they get where
they want to be. As a result, most players don't follow a clear
strategy, but just try to collect as many ingredients as they can, and
hope to find a use for them later.

So ... let's forbid that? I'm thinking of at least these two
possibilities:

-   Simply forbid more than *two* parallel lines.

-   Give on ingredient an action that can completely *block* a path. For
    example, you can "place a fence", which is a simple cross icon that
    prevents anyone from going through that cell.

**(Big) problem \#3:** now there's a constant, repetitive flow to the
game. Moving is *always* three steps per courier. Maybe there should be
some way to *speed this up*? (In a sense, most ingredients already do
this, by allowing you to go through buildings (Bacon) or race in a
straight line (Cheese).

So I don't know if this is a problem, or it simply takes some time
before players realize how *useful that is*.

**(Big) problem \#4:** another thing is the disparity between moving
and eating. Once you have two or three couriers, moving becomes way more
powerful than eating an ingredient. (Because in that case, you can move
9 steps, as opposed to taking one special action.)*

Maybe the "Eat" action should also grow with the number of couriers?
For example, if you're allowed to split your line, you may split all
your lines instead of just one.

Or, normally when you use Cheese, you may move in a straight line as
far as you want, as long as you pass at most one entrance. We can change
that to: you may pass at most X entrances, where X is equal to your
number of couriers.

Perhaps even simpler, I can just say:

\> **Eat** **(action):** "you may eat (at most) as many ingredients as
your number of couriers"

Despite these issues, the game worked reasonably well, was balanced,
and players had fun.

(How do I know it's balanced? One game, I won. But if there was one
more turn, another player would've won. And if there were two more
turns, another player would've won. And we all had different strategies.
I delivered many small pizzas, another went for the big one of 10 euros,
and another had many couriers to zoom around the board.)

It's just that I notice these issues and want to solve them, because I
want the (base) game to be as perfect as possible, especially before
moving on to expansions.

As you might understand, it's not enough for me to see players having
"a bit of fun" or "liking a game", I want them to love the game and have
loads of fun.

I will now improve the game (and hopefully test it again soon) with
these steps:

-   Remove the Prepare action.

-   Change the "Eat" action to scale with couriers. (Now having an
    extra courier becomes super powerful, so I need to make sure to
    balance that.)

-   Change some ingredient actions to allow even more blocking,
    interactivity and speed

Remark: unfortunately, I was still playing on old boards in these
sessions. I hadn't been able to finish and print the new game boards
yet. The new ones are smaller, better distributed, and have more
interesting layouts, which should already help the game speed and flow a
lot.

This devlog continues at part 4, where I'll explain what I ended up doing to fix the base game!