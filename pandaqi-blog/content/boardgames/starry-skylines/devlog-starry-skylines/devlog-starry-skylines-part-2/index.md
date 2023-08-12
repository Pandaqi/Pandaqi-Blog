---
title: 'Starry Skylines (Part 2)'
thumbnail_media: ../../starry-skylines-header.webp
tags: ["devlog"]
date: 2020-08-30 11:00:00
---

This is part 2 of my devlog about the game [**Starry
Skylines**](https://pandaqi.com/starry-skylines)! 

Haven't read the other entries? Go to the [devlog overview](../).

The Planet Campaign
-------------------

Finally, my theme is helping me out here!

I think difficulty levels are a *great* idea for board games, but you
must take some care when implementing them.

I didn't want to say "Level 1", "Level 2", etcetera

I also don't like "Difficulty: Easy / Medium / Challenging / Hard / ...
" First of all: it implies people being stupid. ("You must play on
*Easy*, because you're just so bad at this game") Secondly: this game is
highly interactive multiplayer, so difficulty *mostly* comes from the
skill of other players.

Then I realized: I can make each level a different **planet** that you
discover! Each planet has its own quirks: new rules, mechanics, and
buildings it introduces.

Even better, the theme is *space travel*, so if you don't throw away
your paper after playing, you can *go back* to previous planets and turn
this game into a whole campaign!

To be honest, I was feeling kind of down about this whole game, because
there were just so many issues to solve -- but when I got this idea, the
project was completely revived.

I distributed the mechanics over the planets, creating a set of eight
planets modeled after our own solar system:

-   **Learnth**: your first game, only the most essential buildings and
    effects, no special rules.

-   **Uronus**: introduces *space travel*. You can now build stuff to go
    back to previous planets, discover a new planet during the game, or
    *use* things you built on previous games. Additionally, tourists
    will come, and aliens will attack.

-   **Marsh**: introduces *nature*. Adds different ground types, which
    can make a neighborhood more beautiful, or add obstacles. The most
    prominent addition is *water*, allowing you to create rivers through
    the city and build docks and whatnot.

-   **Yumpiter**: introduces *food*. (This pun by my little sister
    sparked the whole idea. She randomly wrote down *Yumpiter* after
    playtesting the game, and my brain thought: well obviously, that's a
    planet focused on food.) Now you can feed your citizens, which
    yields more points and attracts more people.

-   **Meercury**: introduces *resources*. This is where the *resource
    grid* mechanic comes in. All buildings from this planet require
    something (water, electricity, gold, etc.), so you must work to
    extend the resource grid and built the generators.

-   **Intervenus**: introduces *(emergency) services*. This adds a
    police station ( + criminality), a hospital ( + sick people), stuff
    like that. This was actually planned from the beginning, and I saw
    people being really enthusiastic about these mechanics, but I had to
    move them back because they added *so much complexity*.

-   **Pluto**: introduces *wildlife*. Adds several more environment
    types and the possibility to discover or keep animals. (When
    explaining these ideas to someone else, I called this planet and the
    next one the "pleasure planets". They don't introduce any difficult
    mechanics or buildings anymore, they just add fun additions to
    everything you've already learned.)

-   **Naptune**: introduces *(advanced) entertainment*. Adds all sorts
    of entertaining stuff, like theme parks and sleep centers (to help
    you sleep better with lullabies ... or as I like to call them, *nap
    tunes*.)

This distribution seemed like a good difficulty/learning curve and each
addition was either something sorely needed (such as the resources,
growing food or emergency services) or desired (many players called for
certain themes, like animals and wildlife, or buildings, like a theme
park).

Note that, at this point, I had not created any actual buildings for
each of these. This was just a very general overview of what was
*probably* a good idea.

Events
------

As I make more games, I finally realize why *so many games* add
**events**. Even games that don't really need it, often add a deck of
10-20 cards with random events.

Why? Because it's such an *easy* and *accessible* way to make each game
more varied and challenging. Even if you have the perfect strategy,
building the best city possible under the circumstances, you never know
which event might pop up. And such an event might *completely* change
your plans.

(It's also related to the fact that people just get excited about *news*
or *new stuff*. The possibility of a new random event popping up, even
if it could be something very negative, makes us excited to play on and
react to what happens.)

That's why I decided to add events to this game as well, even though I
felt like I'd already done that too many times.

For each planet, I decided to follow this template:

-   Add \~10 effects, with *at least* one of each type (entertainment,
    government, environment, enhancement, effect)

-   Add at least 6 events

-   Try to connect at least 2 events/effects to mechanics from previous
    planets. The rest may be self-contained (only referring to or using
    stuff from this planet)

A Quick Aside: Programming
--------------------------

The (website) code for this game is very straightforward. (Waaaay
simpler than my previous OPG, Wondering Witches.)

I have a huge list of *effects* and *events*. Each of these has a
**name**, a **description**, a **probability** and the **planet** they
belong to.

When you start a game, I simply remove everything from a *later* planet
than the one you're currently playing. I also calculate the *total
probability* by summing all *probability* values.

Why? Because I need it whenever I want to sample a *random* element.
This is an algorithm that I've used extensively since the first time I
encountered it, because it's a really simple way to pick random elements
*following some probability distribution*. It looks like this:

{{< highlight Javascript >}}
//
// This is executed once at the start, to compile the full list for this particular game
//
function initList(myType, list) {
	totalProbabilities[myType] = 0;

	for(name in list) {
		var obj = list[name]
		var planet = obj.planet || "Learnth";
		var myDifficulty = mapPlanetToDifficulty(planet);

		// if we're working from a "planet set", remove everything that's not from one of those planets
		if(planetSetEnabled) {
			if(PLANET_SET.indexOf(planet) == -1) {
				delete list[name];
				continue;
      }

		// otherwise, we're looking at difficulty only, and include everything up to and including our current difficulty
		} else {
			if(myDifficulty > gameDifficulty) {
				delete list[name];
				continue;
			}
		}

		if(myDifficulty == gameDifficulty && !playingManualCombo) {
			obj.prob *= 2;
		}

		totalProbabilities[myType] += list[name].prob || 0;
	}
}

//
// Then, any time we need to draw a random element of a certain type, we call this function
//
function getRandom(myType, list) {
	const rand = Math.random();
	const total = totalProbabilities[myType];

	var sum = 0;
	for(key in list) {
		sum += (list[key].prob / total);

		if(sum >= rand) {
			return key;
		}
	}
}
{{< /highlight >}}

<!-- {{< gist Pandaqi 091218e52231500fd8fda509a3fbb3b3 >}} -->

Don't worry if you don't understand this immediately, just look it over
a few times.

That's really all there is to it. The *numbers* are also weighted
(numbers in the middle have a higher probability of appearing).

Once I have my random numbers, effects and events, I simply display them
with some default HTML elements and CSS Grid markup.

As usual, the devil is in the details: all complexity and variation in
this game comes from the *gigantic* list of possible effects and events.

This took me *weeks* to compile. (Spoiler alert: the final version of the list ook me months to compile.)

(Although I took many breaks, because
after hours of non-stop brainstorming about buildings and events that
are interesting but do not introduce inconsistencies, your brain is
fried.)

**Note:** one interesting detail I forgot to mention, is my "double
rule". When you play a planet, everything from that specific planet has
*double* the chance of appearing! Why? Well, for example, when you play
the Yumpiter planet, restaurants are introduced for the first time. To
make sure they appear in the game, and that players get enough chances
to use and understand them, I double its probability of appearing.

The Second Playtest
-------------------

At this moment, I had completely written the first five planets, and
implemented everything I mentioned above. I was able to play several
games with the same group, which also allowed me to test the Planet
Campaign. (Although I did not get to the fifth planet, yet.)

First reaction: yes, the game has improved! Being able to go back to
previous planets, or planning ahead for future games, is a really
interesting addition. Also, each planet introduces *just enough* to keep
people interested, but not so much that they are overwhelmed.

Second reaction: but there is still much to improve!

**Issue 1:** play becomes repetitive after multiple games, presumably
because it's always the same turn. Pick an option. Place the number,
build the building. Repeat. Even with a great variety in buildings, this
is still repetitive.

As an additional problem (as regular readers might know by now, I love
solving multiple problems with one solution), when new mechanics are
introduced, the turns become messy. For example, the Meercury planet
introduces a third option (extend the resource grid) ... but, that's not
indicated anywhere on the options! And it's not an extra, it's a
*replacement* of the number, which is extra confusing!

-   *How to solve?* It took a few days of brainstorming (on the
    background, whilst doing other activities) to figure out any sort of
    solution. It happened when I could finally think "out of the box".
    Why constrain the game to this pattern of *number + effect*? Why not
    diversify the options?!

-   Instead, I could say something like this: each option can have 1-3
    components. When you pick an option, you must execute *all* of these
    components.

-   A *component* can be one of the following things: a *number*, a
    *building*, an *effect*, a *resource line*, a *person*, maybe even
    more.

-   This way, options become much more diverse. One option might be
    "place these TWO numbers", while another option could be "place this
    building, extend the water grid, and add one person"

-   This adds a huge amount of strategy, while actually making the game
    *simpler* to read and understand. The options are *right there in
    front of you*. There's no hidden rule to remember, no extra option
    that's not displayed.

In fact, this solved *another* issue! (That's when you know you found
the good solution!)

Remember when I talked about the board filling up too quickly? Well, if
options don't necessarily add a square, this slows down considerably. On
average, only one or two squares might actually be filled per round,
because all other options were (for example) adding people to buildings.

**Issue 2:** still, turn order. I really need some clever way to
determine who goes first, but without giving players individual turns.
Why not? Because that destroys the "simultaneous play" aspect of the
game, which is a key part in making it quick and accessible.

-   *How to solve?*

-   First of all, we can keep play simultaneous for players *on
    different papers*. I don't know why I didn't realize this before. If
    you are currently building on paper 1, you will never interfere with
    the actions of players on paper 2, for example.

-   Secondly, my solution above (giving each action 1-3 components)
    actually helps here as well! I can say that people must take their
    action *after each other*, but they only execute one component at a
    time. This ensures that turns are quick and people stay "in the
    game", because there's only a short amount of time between turns.
    (Perhaps, to prevent *analysis paralysis* even more, I might force
    players to execute components top to bottom.)

-   This completely removes the idea of "challenging", which removes the
    benefit from having the longest street. That's quite an issue, as
    building streets is a big part of the game ... *unless* we make the
    player with the longest street the *starting player*! During my
    playtests, I found there are often "highly contended squares" that
    every player wants for some reason, so being the first player to do
    their action is enormous.

**Issue 3:** player powers are not that amazing yet, could use slight
improvements. Additionally, the rule for 2-3 players that forces you to
pick *unique options* is weak. Currently, it's "the person with the most
entertainment buildings wins". But there are way too few entertainment
buildings for this to ever make a difference :p

-   *How to solve?*

-   Option 1: Add more entertainment buildings, but that's not really
    the strongest solution.

-   Option 2: just use the result of my solution above. If we use turns,
    and we have a starting player, well ... then players simply aren't
    allowed to choose something that *somebody else* has already chosen
    before them.

(I *do* need to make entertainment buildings more valuable in some other
way then. Otherwise they are literally only in the game for
entertainment :p)

**Issue 4:** Several small issues.

On later planets, there might be *so many* different things to build,
that the probability of any one appearing is really low. This might make
the game too unpredictable and too widespread, making any sort of
long-term strategy quite impossible. But I don't know this for sure, as
I haven't played the full game in all its glory (multiple times).

On one game, we completely forgot to count the points for one type of
building (the radio station). That's a downside of having the
complexity/explanations hidden inside the computer: you can forget some
of the rules or how a building scores points exactly. The fact that we
only forgot this *for one building* in all games, shows this isn't a big
deal. But I might add a full list of *all* buildings and *how* they
score points somewhere, which you can quickly search.

Darn it, I wanted to mention another important issue here, but then I
went to grab a drink and now I completely forgot what I wanted to say.
Maybe it was one of these things:

-   Games can take a bit longer than I want. Then again, these were
    mostly *first time* games, and we went a little overboard with
    drawing all the buildings.

-   With many different building types, it can be hard to draw them in a
    distinct way and see at a glance what they represent. I already
    recommend people to write the name of the building (or an
    abbreviation) if it's unclear. But I *might* create some icons or
    designs for different building categories, just to give players a
    first line of defense against visual unclarity.

-   YES! This was what I wanted to say: right now, most buildings and
    effects work *anywhere*. Which is strange and defeats the purpose of
    planning ahead with your buildings and roads. So, most of them
    should only work *if adjacent to a street/building you own*, or
    under other conditions that require some thought.

Blasting through the Buildings!
-------------------------------

This is the moment, which happens in all games, where I just need to put
my ass to the chair and finish all the content.

I have three planets left to create. I have all issues above to fix
(which require significant changes in the rulebook and even more
significant changes in the website code). And then I have to create some
nice images/icons/logos to display everywhere, and playtest the game
into perfection.

It will probably take a few more days to do this, depending on how well
my other projects progress. (Recording music is always an uncertainty.
Sometimes I play something once and it sounds great, sometimes it takes
me three hours to flawlessly record a simple melody *I composed myself*.
Anyway, let's continue talking about games.)

It\'s time for the third playtest session!
------------------------------------------

This took me waaaay longer than I thought. Coming up with new buildings
and mechanics was the easy part, *balancing* them all and picking only
the *best/most intuitive* ones was hard.

In the end, I managed to get some strong new mechanics for each planet,
and they seem to be working quite well together, although more playtests
are surely needed for some vital finetuning.

(Updating the website to the new system was actually a breeze, partly
because it *is* more intuitive and straightforward than the old system.
Now I can just load 1-3 components for each option, picking randomly
from a set of options/icons. It looks good, it creates interesting
choices, and the code is much simpler.)

These were some of the issues from this playtest:

-   Some buildings really need to appear more often, otherwise it's
    almost impossible to get "combos" that score lots of points.

-   I need to implement more rules about the older planets, otherwise
    the whole "campaign" thing feels a bit flimsy. (And besides, that's
    just an interesting aspect of the game I want to explore. I could
    say easy things like "for this game, the player who had the most
    people on the previous planet may start, or gets another big
    starting bonus or reward" If you know this, you can strategize even
    more!)

-   Right now, you can *usually* place your buildings and streets
    anywhere. The number of buildings/effects that require (or forbid) a
    certain placement is only about 20%. (For example, a *house* gives
    you a bonus person when placed next to a street you own.) This isn't
    really ideal, as it makes play more random than I'd like. So I'll
    need to go back and change some buildings to use these conditions.

-   Perhaps events need to appear more often, as many buildings only
    have a benefit *if certain events show up*. And right now, they
    often don't.

So, I will now solve these issues!

Additionally, I think it's time to build the *solo mode* (which is a
small part of the website you can play against) and a *random board
generator*.

This shouldn't be too hard, as my previous games (Timely Transports and
Wondering Witches) features *way more complex* computer components. I
only need to place some random rocks, streets, trees and buildings
across the paper, instead of finding routes between cities and all that
complex stuff from the previous games.

Continue reading this devlog at part 3! (At which I'll tell you why I'm both happy and disappointed when it comes to this game, and how that relates to having *too much stuff* in a single game.)
