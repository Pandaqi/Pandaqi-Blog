---
title: 'Starry Skylines (Part 3)'
thumbnail_media: ../../starry-skylines-header.webp
tags: ["devlog"]
date: 2020-08-30 12:00:00
---

This is part 3 of my devlog about the game [**Starry
Skylines**](https://pandaqi.com/starry-skylines)! 

Haven't read the other entries? Go to the [devlog overview](../).

Intermezzo: bigger is not always better
---------------------------------------

**By far the biggest issue though** (after some more quick playtests and
careful consideration), is the sheer number of possible buildings and
effects in the game. I need to find a way to make it slightly less
random and more likely that you can use combos/follow a strategy/have
some idea about which buildings to expect.

> For example, I've had one game where 6 or 7 "wheat fields" appeared.
> However, they only work in combination with Farms/Bakeries. On their
> own they do nothing. Guess what? Absolutely NO farm or bakery
> appeared, even though they have quite a high probability of doing so.
>
> This means that it becomes hard to plan ahead and actually strategize
> and build something nice. Many of the things you do ... will just not
> have any effect (if we're unlucky with the random generation).

The first solution is to alter the probabilities. Now many buildings
have roughly equal chance of being picked; I should change that so
buildings that have a greater effect (or belong together) have a greater
probability of being picked.

The second solution is to prune some of the tree. Remove the buildings
that are least fun, only keep the best ones.

But all those solutions are imperfect, as they can only soften the
problem, so I'm considering the following strategy: include
"combo"-information on the buildings and events.

Whenever I show a certain component, I remember that information. The
next time, I increase the probability of picking something that is
*somehow related* to this previous component. This shouldn't be a
certainty ("oh, we have a police station this round, surely some
criminals will pop up next round"), but it should increase the
probability that options you pick (and events that appear) actually
influence each other a lot.

I don't know how feasible or helpful this is. I've never done it before.
But I don't see any other solution: all buildings/events/themes/planets
I've created so far, are really nice and interesting. I'm happy that I
could create such a big list of diverse mechanics and situations, but
with every playtest I see this huge size as more of an obstacle than a
feature.

(I already increase the probability of buildings *of the specific planet
you're playing*, which helps somewhat. If this is your first time
playing *Intervenus*, its unique buildings (such as Police Stations)
show up way more often, allowing you to get comfortable with them.)

Intermezzo II: for sure, bigger isn't better
--------------------------------------------

After thinking about it some more, you could of course ask another
question: should this even be one game? The mechanics are so diverse and
widespread, shouldn't this just be multiple games?

I think the answer is: no. The core of the game stays exactly the same
between planets, and I don't see any significant changes I could make to
reasonably split this into 2, 3 or maybe even 4 games.

Instead, it's probably more helpful to think in the other direction: if
this must stay the same game, how do we make each planet feel unique and
coherent within the whole game? And then I'm starting to think I need
more *options/settings* for the game.

Instead of picking a planet and getting all previous planets as well,
you can cherry pick which "expansions sets" to use. Maybe I could even
create something similar to "decks" in those trading card games. One of
those decks could be "Nature", which includes the planets Marsh and
Pluto, as they are the only ones strictly focused on nature. Another
could be "Leadership", which contains Uronus and Intervenus, both
focusing on government and planet leadership stuff.

Hmm ... hard to make an informed decision on this one. I'll just keep
polishing and 100% finishing the current game while thinking about a
solution to this whole thing.

What I ended up doing ...
-------------------------

I ended up implementing a mix of all these ideas.

I would've loved to implement an algorithm that picks random buildings
*that are somehow related*, but it just wouldn't work.

Why not? Let's say I create a set of 20 unique buildings. And, by
chance, only one or two of those use the resource grid (and the rest
doesn't).

Then I would *have* to include the resource line component, and it would
show up quite often, even though it's only rarely useful. Which is
annoying. It skews probabilities in the wrong direction, and I can't do
much about that.

So, the safest bet is to create random sets of complete "planets", and
limit those sets to at most 3 or 4 planets. This way, everything will
surely be related, and nothing shows up way too often or way too little.
Yes, again, I would've loved more variety and randomness, but this is
the only way I saw this working out.

Lesson learned for future games: think about the problem of *quantity*
beforehand. There is such a thing as *too many options* or *too much
stuff* in a game, which causes a game to lose focus and
interconnectivity.

Fourth Playtest
---------------

So, after some more rounds of playtests, I've made these observations.

**First of all:** this was the first playtest with a starting setup
generated by the computer (I had just coded this part of the website)
and proper planet sets. Fortunately, all of that works great! No need to
tweak that very much.

**Issue \#1:** currently, when you play with 2-3 players I have the rule
that you can't choose an option that another player already chose. That
works really well, which is why it's a shame that I throw away this rule
on 4+ players.

Additionally, it's a bit confusing that there are *three options* per
round, but there can be *four players* on a planet.

So, I changed the rule to be more general: "each planet starts with 3
players, each of which must pick a different option" (Way simpler, more
logical.)

**Issue \#2:** there were *some* buildings that showed up, which were
ultimately useless. For example, in one game we had loads of *Paddy
Fields* ... but they can only be built on water, and we had no water,
because our set of planets did not include the "water planet" (which is
Marsh).

How to fix? These kinds of buildings are, fortunately, the exception to
the rule. I can add a parameter (in my gigantic list of buildings) that
says "requiredPlanet = blabla". Subsequently, the building is only
included if the required planet is available.

Additionally, some buildings might just move to the first planet (the
"core set"). They are so useful and interesting, that it's a shame to
hide them on another planet.

> For example: one cool feature of this game is that you can travel
> between planets. But the only building that allows you to do so,
> appears on Uronus. Which is a shame, because that planet will not be
> included in the set a large chunk of the time.

In conclusion: I need to take a hard look at my first planet and make
sure it includes all the best bits.

**Issue \#3:** in this game, you can place stuff *anywhere you want*.

In the first version, the rules were way more restrictive. You could
only place a building/street if it was *adjacent* to another thing you
owned. Although that worked fine, it wasn't much fun, and it was easy to
lose the game halfway because you just didn't have any connections left.

I completely removed that rule, which was *an improvement*, but still
isn't perfect. There's often no reason to plan ahead or create beautiful
street networks, because ... well ... anyone can block your plans at any
time, and you can do the same to others.

I need *some rule* that restricts placement, but only slightly ...

Better Player Powers
--------------------

At this point, I remembered that my idea for "unique player powers" was
also broken.

(I had 8 different powers, which were unbalanced, hard to understand,
and sometimes worthless unless you were playing one of the later
planets. Yeah, these relics were left over from the very first draft of
the rules for this game :p)

So, let's do the age-old trick of **combining problems to get a single
solution**!

I want every *player power* to have both an **advantage** and a
**disadvantage.**

The advantage can be something like: "you start with one more path than
the others" (which also nicely breaks ties for start player).

The disadvantage is something that restricts placement: "but you may not
place buildings next to paths owned by someone else!"

**What am I going to do now?** I'm going to think about these player
powers, fix the rules, add some more parameters and balancing to the
huge list of buildings, and perform another playtest session. I think
the game is nearing completion, but I must also say I'm growing tired of
this game. (As I'll explain below, I created a game in a genre that I
don't even like myself, and it's become way too big. So that was a
recipe for motivational disaster :p)

**Why do we even need player powers?** Without player powers, the game
is completely symmetric, which means there's no fair way to decide a
start player (or general turn order) and everyone can mostly copy each
other's turns. Additionally, I've learned that it's always good to give
players a sense of ownership/customization: by choosing which "role"
they want to play, they become more engaged with and interested in the
game.

Final version?
--------------

So, all elements are done and working, the game is as finetuned/balanced
as I can currently make it, time for the fifth playtesting session.

It went well! (As the heading of this section already spoiled, kinda.)

It's hard to playtest this game well, on my own, as it's just so
*large*. There are 8 planets, over 100 buildings and effects in the
final game, and this game is best played as a *campaign* (where you play
through all these planets with the same group).

As such, I'm most uncertain about the later planets and the game as a
whole, but ... the first few planets are certainly fun, easy to explain,
easy to play, and quite addictive as well!

It's like I said: this game is nothing more than presenting three
interesting choices each round.

I must say, though, that I have a slight feeling of ... disappointment.
But that's not the game's fault, I've realized, as it works great and
people have a lot of fun. (It's actually the favorite game out of all my
games for some people I've played with.)

I think it's because I've never been a fan of "point salad" games. And
this game is almost the definition: you score points for *all sorts of
things* in this game, and you only know who won by performing a few
minutes of calculation at the end. It's the first "point salad" game
I've ever made, and I highly doubt I'll make one again.

Conclusion
----------

This is probably my "biggest" game yet, and also the game that is most
*unlike* anything I've ever made before. The fact that it's even
playable and actually quite good, means it's a success for me!

I've planned more balancing and playtesting sessions in the near future.

(I actually do this for most games: plan a date in my agenda, a few
weeks or months later, to play the game again. Usually reveals quite
some flaws and polishing issues that I was too blind to see when I was
full-on developing the game. And, more playtests are always a good
thing!)

Additionally, I've written quite an extensive to-do list for possible
future improvements/changes. I'm just never really satisfied with my
work (which is both a blessing and a curse), so although the current
game is fun and polished, it might get a big overhaul at some date in
the future.

Hopefully you learned something from this devlog, and hopefully you have
fun playing this game!

Until the next devlog,

Pandaqi