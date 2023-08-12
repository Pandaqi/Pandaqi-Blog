---
title: "Wondering Witches: Version 2!"
thumbnail_media: '../wondering-witches-header.webp'
date: 2023-02-17
emoji: "🔮"
---

A few years ago, I created the game [Wondering Witches](https://pandaqi.com/wondering-witches). It was a first for me, in many ways.

* First "hybrid" game (played both on paper and using a device/website)
* First time writing in-depth devlogs about the process, and doing so using _markdown_
* First time I felt like a game of mine was nearing the professional level

Now I have many games under my belt. Some older games of mine turn out to be ... mediocre (at best). I decided not to waste more time on them, and they might even be entirely removed from this website at some point.

But this one was "mediocre" for other reasons. Reasons that could be fixed, because I knew the game would shine if I did so.

That's why I invested some time into creating "version 2" of this game. It's not merely an update; it's almost entirely a rewrite.

Below, I'll explain what I changed and why.

## The issues

What was wrong with the previous version? The rules were _unnecessarily complicated and restricting_. They weren't too bad: only three pages, and that's with big fonts and image examples. 

But when I read them again, I saw immediate areas for simplification. The complexity in this game comes from the _puzzle_. The randomly generated puzzle is already hard enough. The rules for solving it should be as simple and straightforward as possible.

As a result of complicated rules ...

* The random board generation was needlessly complicated. (It worked and looked nice. But it could be _better_, with cleaner code.)
* There were some variants that never got a proper implementation. (Competitive mode, solo mode, offline mode, ...)
* I probably tried to compensate by coming up with _loads_ of effects for the expansions, which makes _them_ needlessly complicated as well!

In short? The game should be simplified to lose at least 50% of its rulebook. In doing so, it should allow me to generate better boards and game variants. Together, I hope this game will be tried and enjoyed by more people.

## Issue 1: Cauldrons vs Gardens

In the original game, you did one of three actions on your turn.

* Place a new ingredient (of choice)
* Grow an ingredient one step
* Pluck an ingredient to put it in a cauldron

Once a cauldron was _full_, you immediately had to test its potion against the website. This meant that gardens could be any shape/size, but cauldrons were limited and always a rectangle. 

Why is this a problem? 

* If you filled all your 4-space cauldrons, you could never win the game anymore, because the potion has length 4. 
* This filled the board very quickly (as you were constantly copying grown ingredients).
* Cauldrons needed some _order_ in which to fill them. This became "spiral order", which takes time to explain in the rules, and many people will not understand (immediately).
* But because of that order, the game was _very hard_! Because you needed to think many steps in advance, or your ingredients would have the wrong order.
* Also, 4 different actions/steps on a turn is just not warranted for such a simple game.

All in all, this just added a full page of exceptions and extra rules to the game.

In hindsight, I should've ditched the cauldron idea at the start. But I remember being so enamored by it, as it was in the original game idea.

> A game where you throw ingredients into cauldrons, then test their content to figure out a secret potion!

But it's the obvious solution: **Remove cauldrons. The board just has gardens in random shapes.**

Your turn becomes,

* Plant a new ingredient
* Grow an ingredient one step
* Test one of your gardens (on the website)

Much simpler. Much more freedom. The focus can be on the _puzzle_, not the tiny rules around it.

## Issue 2: simultaneous play

The absolute first draft of the game had players taking turns, using one paper as the board. 

One playtest later, I immediately improved this to something more fun. You play simultaneously. You cut the board into pieces, so every player has _their own little garden_. The game became faster, more immediate, without any "down time" for anyone. (And people just like growing their garden. I might create another game just based on that.)

But it still wasn't ideal. So I added an extra rule: instead of plucking an ingredient from your own garden (for a cauldron), you could take one from another player (if both agreed to it). 

This was also an improvement ... but still not enough.

Most of the game, people were still looking at their own garden, doing their turns in isolation. (Additionally, now that "pluck an ingredient" isn't a thing anymore, we need some substitute.)

Then I remembered playing a game called _Tiny Towns_. It has a great solution to this problem:

* On your turn, you call out one resource.
* _All players_ get that resource and place it on their own field.

That game is _fast_ and you're doing something all the time. But you still have a lot of agency and interaction.

Let's use that!

* On your turn, you call out an ingredient
* All players either place a new one of these, or grow an existing one
* If they don't want to place it (or can't), they must test a potion

Boom. Simple, keeps everyone busy, makes the game faster.

## Issue 3: testing potions

This issue is mostly resolved by the fixes above. But we can go further.

First of all, the website had some clunky parts.

* It scrolled around to keep the recipe in view, but it did so ... erm ... not-so-smoothly
* The big red button to view the solution had no "Are you sure?!?!" check on it, which can lead to annoying accidents where people see the solution too early.
* A bit too much text
* It's messy to keep the interface on the same page as the website. Instead, I want to move it to a separate page, on its own.

Secondly, we can add some minor (intuitive) rules around them.

* When you test a garden, you test everything inside (in whatever order you want)
* Afterwards, that whole garden is _exhausted_ (cross it out, can't use it anymore)
* Write the _results_ of using that garden inside of it.

The point here is that you can test a garden any time you want. But it might be a waste if you do that too early, because there are still many empty spots left inside that garden.

The third bullet point is absolutely necessary to make sense of the game. You can't remember the results of all the potions and solve the puzzle purely in your head. (First, it was a "tip" somewhere in the rulebook. But that's not strong enough, so I made it a rule.)

I also did something weird (though I understand why) with the **win condition**: it's different between the base game and the expansion. This keeps the explanation for the base game simple ... but is also a weird hiccup if you want to play more than that.

So I decided to streamline it. Mention the win condition once, it's the same for all variants:

> To win, provide a potion as long as the secret recipe (or longer), which is 100% correct

What is "correct"? The secret numbers are in the right order. (And expansions can alter this, changing what is "the right order", which is the reason for the original disconnect between objectives.)

## Issue 4: other modes

### Offline
The "offline mode" actually had somewhat proper implementation.

* There were images of boards to copy (for all player counts)
* There were solid instructions for what changes and how the "High Witch" behaves
* And all of that works fine

But it was, again, too long. The rules stayed the same, mostly, but were written down better.

### Many players
Playing with more than 4 players required you to "team up". I thought and thought ... but found no solution. I also don't think such a puzzle game is ever fun with 5+ players, so I simply removed that and lowered player count to 4.

### Competitive
With the new rules, competitive mode presents itself. We don't need to change a thing! 

When you test a potion, you must simply present the results to everyone. This way, everyone can do their own puzzling.

This does make the game harder, though. As you obviously aren't working together and only have a smaller number of squares to work with.

To combat this, the secret potion is always a short length _and_ this length is communicated to players.

Additionally, we can look at more interactive elements here. Like,

* You can steal an ingredient from somebody else. But only if you don't have it yourself.
* You can steal an ingredient from somebody else. But only if you pay for it by crossing out an empty square (or an ingredient of your own?)

### Solo Mode

In a way, we get solo mode for free. You can just use the whole paper for yourself and play like normal!

But this is a bit _too_ barebones for my taste. This got me thinking about ways to improve it, and the obvious answer was

* To let the computer do it (so players don't need to read/remember any more rules)
* As a result of testing potions

What do I mean? I should add ingredient effects that _change the game_. So far, I only have one: a player can get poisoned. But we can do much more with that!

For example, 

* Until your next potion, you need to place each ingredient _twice_
* Until your next potion, you cannot grow an ingredient beyond 2 steps
* ...

This varies the game and makes it more interactive. It also adds an extra layer: you obviously want to suss out the "bad ingredient" early so you don't get hammered with the same curse every time. (Or you strategically use it to your advantage!)

Which leads me to something else I only discovered _after_ making this game: random events. Randomly, after trying a potion, I can print a random event to change up the game. This will mostly be weather conditions influencing the growing of potions, but might also be fun ideas for changing the "magic" of the witches.

## Keep it a "game"

This project had the issue of having such a strong puzzle, that the "game" aspect is constantly left behind. How do we keep this an actual _game_ to play (with interactivity, other players, ...), instead of just a puzzle you happen to solve with others?

As such, when reworking it I constantly asked myself: does this gamify the idea, or turn it into an even more logical puzzle?

The ideas above, in my opinion, help enormously. Especially those for the solo mode---the one that _forced_ me to think of ways to "gamify" it.

At the same time, I also realize how this is really just a dressed-up puzzle. Hopefully, I find stronger ways (with new game ideas) to combat this.

Anyway, events are always a great addition. They allow you to really make a game different and challenging every time. But players don't need to learn/remember loads of rules (beforehand)---they only know the _one rule_ (from the event) that's spelled out _right in front of them_. They're also fun to invent and easy to code.

## The big rewrite

I did the big rewrite. It took me a full day of non-stop work. (And a bit here and there the days after that.)

* Rewrite the game interface code
* Rewrite the game board generation code
* Rewrite the rules
* (Some additions, like those events.)

First of all: wow, what a difference a few years can make. My old code was a _mess_. And that was only three years ago! I remember spending _at least_ 2 weeks on that code. Now I could rewrite it---way better and more professional---in a day. In hindsight, you always realize how stupid you were :p

But now the code is solid, clean, easily readable, with less potential for mistakes. Additionally, the code uses my general "system" for (interactive) board games that powers the whole website. This was the last game that I had _not_ transferred to that system yet. It feels good to finally have it all cleaned-up.

Secondly, this brought some more problems to light.

There's something about _seeing_ your game in action (testing the boards, testing the interface, ...) for a whole day ... that finally allows you to see clearly what your game needs.

Here's the problem.

* The board and the interface are _linked_. If you enable a certain expansion in your game, you also need a board with that expansion enabled (most of the time). 
* But they are clearly separate steps. I don't want to overwhelm (new) players with all of that at once. I want to allow playing the game _without_ generating a new board, or just generating a bunch of boards and playing the game _later_.
* To make matters worse, the puzzle generation algorithm can sometimes get stuck for _minutes_ (if not more) on the higher difficulties. Sometimes it even entered infinite loops.

I made the game too "involved" again. My never-ending vice.

### The solution?

I thought and thought, but saw now solution to the "linking". I'd either have to write a whole new system to smartly update the settings of the board when you start a game, or vice versa ... or require players to input the same things _twice_.

But there's always the third solution to any problem: changing the rules of the problem.

The "linking" issue only existed because ...

* There was one difficulty setting (from low to high), which changed a lot of things behind the scenes.
* I thought it was a good idea to raise some properties (like the _length_ of the secret recipe) as you raised the number of ingredients

This wasn't necessary! This is just a relic from the old design! One that makes the game almost impossibly hard.

So I just removed that.

* The secret recipe is _always_ 4 ingredients. (Even if you have 10 ingredients total.)
* The different "expansions" are now actually different checkboxes. You can enable/disable any of them separately. With that change, it turns out the _board_ only depends on _one_ thing: if you've enabled special cells or not.

This paved the way to other simplifications.

* Your first game is without "decoys". (Ingredients that aren't part of the secret recipe. They have no number and therefore exist to throw you off the scent.) It used to be 6 ingredients: 4 real, 2 decoys. Now it's just 4 real ones.
* This means we don't _need_ the backside of the paper anymore. We still require it for expansions, but not for the base game. So those lines/explanations can be removed from the website and rules.

Yes, these are tiny things. Only a few lines here and there. But _any_ hurdle between the player and trying a (new) game is a bad one.

I considered adding a "seed" field to the settings. If you really care about linking a board and a game, you can enter the seed (printed on the board) and it knows what to do. But I removed it again. It was one extra step, one extra input field. And for what? I can remove any friction between the board and the game by just _fixing_ which ingredients are used (at a certain potion length). 

(4 ingredients? You use the first four in my list. 5 ingredients? You use the first five. That simple system is better than adding more options on the website.)

### Infinite loops

This also "softened" the generation issue! 

If the secret recipe is only length 4 (not 6), it doesn't need to check as many combinations of possibilities. It will likely return a valid result within a fraction of a second.

But I wanted more certainty. Can we apply some trick, some "heuristic", to weed out wasted time in the algorithm? To quickly spot if a combination of ingredients _might_ be a valid puzzle or not?

Remember: if we don't, we're potentially testing `10^10` combinations. Which is ... a lot.

Then I realized something.

* Even if effects mess things up, the recipe will _generally_ be in the right order: ingredient with secret number 1, then ingredient with secret number 2, etcetera.
* Then we can just try small deviations from that, perhaps 1000 times. If there's a solution, we're likely to find it. If not, it's probably better to just bin it and start again with a new set of ingredients.

Implementing this ensured you get a puzzle within a fraction of a second.

## Conclusion

That's about it. Three years after designing it, I was able to design a _way better version_ of a board game within a few days. Partly experience and skill, partly because I _learned_ from that original version.

I actually trust the code now :p If anything is still wrong, I also know I can quickly fix and test it.

The rules were reduced by 2 pages. That's while _adding_ some extra expansions and variants (such as competitive mode), and images / whitespace.

I always test my games before publishing. But I'd really like to get more testing done. It's by far the hardest part: consistently finding (different) groups of players to test unfinished games.

The game is ...

* More interactive and cooperative. (You actually do something on every turn and need to coordinate.)
* Faster
* Easier to understand and explain
* Easier to win---I think the challenge is "just right" now, while it was too hard before
* More robust: fewer edge cases, possible mistakes in puzzle generation, etcetera.

All of that simply by ... removing everything that didn't need to be there. All the things I thought _had_ to be in the game---they could just go away.

I still like some of the old ideas. I might use them in other games. (Like a shared cauldron in which you constantly add and remove ingredients _in order_, changing what it does all the time.) But they weren't right for _this_ game.

Time well spent, I'd say. Learned a lot, improved an older game to a high standard, feel better about upcoming games.

Hopefully more people can now find and enjoy [Wondering Witches](https://pandaqi.com/wondering-witches) :)

P.S. I have a long diary about the original development online. Those code examples, and many of the ideas, are now not in the game anymore. Or just bad coding in general. Maybe those will be removed, although I also see value in showing the whole process and the mistakes along every journey.