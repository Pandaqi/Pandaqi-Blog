---
title: "Balancing Games That Cannot Be Balanced"
tags: ["tutorial"]
date: 2023-01-01
---

We all know *balancing* is a very important part of game design. The only problem is that it's an *art* to get it right, and even worse, some types of games are near impossible to balance.

I happen to make such games most of the time. My games are usually:

-   A local multiplayer (party game)
-   With one simple, unique core mechanic. (The thing that interested me in the first place and hopefully interests my fans.)
-   With *loads* of powerups, variations, tweaks, levels, etcetera to play with and keep it interesting.

I will group them all into the category "powerups" for this article, but they don't have to be that specifically. A game with 20 different arenas to play (with their own rules) follows the same idea.

Because these powerups can appear in *any number* and *any combination* ... I'd have to literally test thousands if not millions of configurations if I want to be sure they're all balanced or fair.

That's impossible. So, they game can't be balanced right? I just have to hope people have a good time and most of the configurations aren't wildly unbalanced?

In some sense, yes, because nothing changes the fact that I can't test them all. But I've learned two strategies to combat this issue:

-   Thinking in terms of powerup *groups* and putting general restrictions on them.
-   Applying *fail-safe balance measures*.

Here I want to explain them both and how to use them in your own projects. But first ...

## What is balance?

I won't give any hard definition here, but more a general intuition I follow.

A game is **balanced** if **no player has a (dis)advantage that reduces the fun they (or others) have.**

It doesn't even need to be fair. Many games are wildly unfair, but it adds to the tension and the excitement, so it's a *feature* and not a *bug*.

It's all about the fun, the engagement, the accessibility, the understanding and feasibility of your goal.

If my game leads to situations where people just aren't having fun (because they can't do anything, because they're too far behind, because they don't understand what's happening anymore) ... it's not balanced, and it's bad.

## An example

An example to illustrate the point. In a recent game I made for the GitHub game jam (*Windowsilk*), you were a spider walking on a spider web. Whenever bugs ran into your sticky silk, there was a chance they'd get *stuck*. This also includes *other players*! They walking over the web as well, so it's fun and logical that the rule applies to them as well.

But here's the point. When you get stuck ... you can't do anything. You literally have to wait until a player (or another bug) eats you, before you're reset and can play again. If other players are smart, they won't eat you and keep you out of the game.

It's not unfair. I mean, if you walked right into someone else's silk, you just played a bad strategy :p It's not like you were unlucky, or the game dealt you a bad hand, or whatever. But it's still not fun for everyone and therefore not balanced.

In the end, I solved it this way:

-   "Owners" fade away. After 15-20 seconds, you don't own that line of the web anymore. (This was already in the game.)
-   When that happens, *players that are stuck are free again.*
-   There's one situation in which you become the *permanent* owner of a line. In those situations, I subtly disallow players getting stuck, and most people won't notice at all.

But this is a very specific solution for a specific balancing problem. Now let's scale it up to see what we can do when we have *loads* of powerups that mingle.

## Powerup Groups

Most of the time, powerups can be put into categories.

For example, you might have 5 powerups that *all* do something with "movement":

-   Move faster
-   Move slower
-   Move like you're sliding on ice
-   Move with inverted controls
-   Moving costs stamina, you need to pause once in a while

They are all distinct enough to be their own powerup, yet they clearly have overlapping functionality and feeling.

So, what do you do?

-   You actively put all powerups in categories
-   You ensure there are never too many from the same category. (Maybe even as simple as: every time you spawn a powerup, pick a category that's not on the field yet.)
-   Then *balance the categories*, not the individual powerups.

Maybe, after some testing, movement reveals itself as a crucial part of your game. It's more important than any other aspect, such as strength or health.

In that case, you simply *reduce* the power of *all powerups in the movement category*.

You don't need to test them all individually again. You know that this is at least a big step in the right direction for all of these.

Applying this consistently allows you to think "big picture" instead of getting bogged down in details. It changes your job from "making sure 50 items are balanced in any combination" to "making sure the general mechanics and systems in the game are balanced with each other"

## Fail-safes

Even with your powerup groups, even with a *general* overall balance, weird situations might still occur.

If everything goes wrong, you might still end up with one game where players just can't do something (or maybe can't even win!). (Or, if everything goes *right*, you might get a game that is sometimes exceptionally easy to win.)

These will occur once every 100 plays, or maybe even once every 1000 plays, or maybe only with 3 players in a specific level. So you can't test them yourself, and can't rely on (many) playtesters to surely find them.

In that case, you need to think ahead: what are *potential* issues with this game? Assuming *everything goes wrong*, what unbalanced situations could appear?

Once you find one, create a **fail-safe** for it. A hard line that the game can't cross. A hard reset if things get out of hand. In most cases, it might feel like cheating or breaking your own rules, but players won't notice and it makes the game much, much better.

Let's take that *Windowsilk* game again (for simplicity). In that game, players and bugs are constantly walking over the web (or flying across it), which might *change and shift* at any moment. (You can add lines by jumping, remove them with powerups, *move* points with another powerup, etcetera.)

No matter how good my code, things might go wrong. In rare instances, a bug flies off-screen, never to be seen again. Or an edge might move *so drastically* that a bug can't follow, and it either hangs in empty space or ends up on a *different* edge.

For cases like these, I have fail-safes.

-   Any entity out of bounds just dies immediately.
-   If a bug can't find its edge under its feet, I do a quick physics check for *anything* near it. If I find something, it snaps to that edge. If not, it dies.

These are, again, quite small and specific. But you can make it larger.

Maybe you have a party game where you play X rounds, or until someone has Y points. In cases like this, the issue of a runaway leader (or runaway loser :p) always comes into play. Because you play for a longer time, accumulating points, it's quite likely that someone will get a lead that just ... demotivates any other players.

How do we solve that? By adding fail-safes. Either explicitly ( = the player knows what's happening) or invisibly ( = nudging players to a more balanced game).

-   Explicit: the *more* you're ahead, the *less* points you earn for winning. (Although, if you don't tell this to players, they might not even notice.)
-   Implicit: every level you play, the player who is ahead has a *higher chance* of getting unlucky or getting targeted by traps/enemies/whatever.
-   Explicit: if at some point a player has a lead of 15+ points, add a special "bonus round" where everyone can catch up and get huge points.
-   Implicit: when spawning powerups, only spawn *bad ones* near the player who is ahead.

No matter how the game unfolds, fail-safes like these will get it back on track. It somewhat removes the need to balance all parts of your game individually, but not entirely of course.

And the added benefit is that it *allows* games to get a bit out of hand. It allows crazy runs, crazy situations, 1-in-a-1000 scenes. If you had exquisitely balanced all elements to be perfect counterweights to each other ... you lose this possibility and the game just becomes, well, boring?

(You might think: "well I'll just do whatever I want, and then add some hard fail-safes at the end!" But there's a world of difference between "nudging players towards a more fun game" and "creating a bad game and artificially pretending it's tense")

## Conclusion

That was my short article on balancing (near) unbalanceable games.

-   Put smaller elements into bigger groups.
-   Think about those *overall groups* when designing and balancing.
-   And think about *general situations that could go wrong* (if all fails) and design fail-safes for that.
-   And realize that games are fun *because* of the unexpected, the tension, the sudden unfairness you need to overcome. Balance is not about making everything equal and fair. It's about making sure everyone's *fun* is equal.

Hopefully you can apply this to your own games!

Until the next time,

Pandaqi
