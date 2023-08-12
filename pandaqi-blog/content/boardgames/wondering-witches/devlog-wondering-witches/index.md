---
title: 'Wondering Witches'
thumbnail_media: ../wondering-witches-header.webp
tags: ["devlog"]
date: 2020-04-12 12:00:00
---

Welcome to the devlog of my (board)game **Wondering Witches**. In this devlog, I write down my process of designing the game, with fun stories, obstacles I encountered, and how I (tried to) solve them.

If you haven't played the game, make sure to visit the official page: **[Wondering Witches \[Boardgame\]](https://pandaqi.com/wondering-witches)**

I've been writing devlogs for my own (board)games for ages, because it helps me think and iterate, but also because I know developers can learn a lot from other people's mistakes. I would love to see more developers share their process in detail, and I hope this devlog is useful to you. (Or at least fun to read.)

Let's start!

(The devlogs for my older games, however, are in Dutch. At that time, I didn't even think about which language to use in my projects and just defaulted to my mother tongue. Sorry about that. Fortunately, all my older projects also aren't that good or interesting.)

## The Start

I had an idea: **a cooperative game where you play witches, and everyone is adding ingredients to the same cauldron**.

This was a good start, but I did not really know what to do with it. How could I turn this into a game? How could I allow all players to add ingredients to the same cauldron, without being confusing/chaotic, and while being able to scale the game to any player count?

So I waited a few weeks, generated some ideas, and the idea shifted: **a cooperative game, playing witches, where you need to guess/discover a** _ **secret recipe** _ **.**

That's something I could work with. Now I just needed to find out _how_ it worked.

I saw two possibilities:

- The game generates a random puzzle (e.g. with cards, dice, chips, whatever)
- One player knows the solution, but can only communicate vaguely (e.g. through clues, gestures, etc.)

I liked both ideas, so I decided to develop them simultaneously.

Now comes the most important bit: this game is part of my " **One Paper Games**" collection. I always intended this to be a "OPG".

What does that mean? Well, as the name implies, they are games for which you only need _a single sheet of paper_. They are played by printing (or otherwise manipulating) a piece of paper, grabbing a pen, and then simply reading the rulebook.

That restricted my options. I could not add cards, or dice, or multiple cauldrons, or actual ingredients.

But as we all know: "restrictions breed creativity"! After pondering the problem for a few days, I made several breakthroughs on the same day.

## Breakthroughs

**Breakthrough #1:** I could add a computer component! I've been making websites for ages, and always wanted to experiment by creating a hybrid between a board game and a website (which anyone could load on their phone/tablet/computer).

**Breakthrough #2:** I didn't even need to print anything!

When I had the idea, I always knew it was going to be a game about collecting/growing the right ingredients, and then placing them in cauldrons ( = using them in potions) in a smart way. For both these things, I needed a grid: cells to grow ingredients and cells to create potions.

Well … if I fold a blank sheet of paper several times, I get a grid for free!

In the end, I decided to fold the paper **five times**. Using the front and the back, this gives 64 cells, which seemed the right number. (Early playtests confirmed this.)

By now, the idea in my head became clearer.

To start the game, you …

- Only need to grab a piece of paper and fold it several times.
- And go to the website (given in the rulebook) on any device

During the game, you …

- Start growing ingredients and placing them in potions.
- On your turn, you can also choose one of those potions and "use" it.
- Somehow … in some way … using potions should give you information about the secret recipe.

The next questions were obviously:

- How do I determine a secret recipe?
- How does using a potion give the players information (from which they can slowly deduce the solution to the puzzle)?

## Creating secret recipes

By this point, the "hybrid" variant of the game (using a website as companion) won out over the "offline" variant. It was simply more flexible, easier to test and develop, simpler to explain.

(I kept working on the offline variant, but the online version became the dominant version and got more attention.)

Well, if I have a computer at my disposal, creating a random puzzle is suddenly very easy!

So I wrote a program that allows you to "input" a potion ( = which ingredients and in what order), and then gives you the result. For a computer, this takes _almost no time at all_ to compute, even for the most complex of potions. Using such a companion website, you'd have a different puzzle each time you play, while also having an easy way to "check" what happens.

I decided the following:

- The game has 10 unique ingredients. (I thought this might be a bit much, but it was a nice number to start from.)
- These ingredients are _randomly_ assigned numbers from 1-10 (no duplicates).
- It's the job of the players, to figure out these secret numbers, and place _at least five ingredients_ in sequence.

Why ten? Why five? I don't know, they were guesses at this point.

I knew that requiring players to identify _all ten ingredients_ correctly, would be way too hard. I also thought that using a "fixed recipe" (for example: add this ingredient twice, that ingredient once, etc.) would be too hard. Any small error, and you would not win at all.

So I gave the players multiple ways to win: just create _any_ correct sequence of five ingredients. (Later on, I'll explain why this wasn't a good idea.)

## Ingredient effects

Of course, numbers are not enough. There needed to be more of a "game" there, more variation and randomness, more unique events. As such, I also decided to randomly add **effects** to the ingredients.

When the computer evaluates a potion, it steps through them one by one, in order. Every time, it checks the ingredient numbers (are they in the correct sequence?) and then executes any effects this ingredient might have.

_What kind of effects should I be thinking of?_ I must admit that I was stumped for a moment. What effects would possibly be interesting? It took a while to find the right way of thinking.

The most interesting effects are those that _alter_ the contents and results of the potion, or that give you _clues_ as to the solution.

For example, the **spicy** ingredient increases the value of the ingredient AFTER it by one. This can seriously mess with your head (it introduces uncertainty to the results), but you can also use that to win more easily (use two spicy elements in a row, and they will automatically be in sequence – think about it).

Another example, the **detective** ingredient simply shouts back the number of a _random_ ingredient in the cauldron. It could even be its own number. The thing is: it's extremely useful information to have, but only if you apply it correctly.

(After some playtests, I also decided to lean more towards a third type of effect: **player effects**. The player that _used_ a potion can receive good or bad special powers, which forces them to change the way they play the game. Very interesting – I'll talk about it soon. This is me from the future retroactively writing this :p)

## Learning the secrets

Remember when I said this game was about "growing ingredients and then putting them in a cauldron"?

Well, we covered the last part, but the _first_ part remains to be used. That changes now!

When designing something, it's always better to stay simple and keep it elegant/lean. The best way (I know) to do this, is whenever you have multiple problems, to _combine_ them into a single solution.

That's what I did for the ingredients. This was the breakthrough:

**The secret number of an ingredient = how much it has to grow**

For example, say you have the ingredient "Parsley". Its secret number is 4.

- If you grow it less than that (1-3), the potion will report that "one ingredient was _undergrown_".
- If you grow it more than that (5-10), the potion will report that "one ingredient was _overgrown_".

This is (partly) how you deduce the secret numbers in the game. The potion does not tell you _which_ was undergrown/overgrown, and special effects may even tamper with the results, but this information is enough to find the solution.

For example, say our secret numbers are as follows: "Parsley = 1, Sage = 2, Thyme = 3"

Our cauldron looks as follows: Parsley (grown 2), Sage (grown 1), Thyme (grown 3).

Then the computer will report: "Potion had 1 undergrown and 1 overgrown ingredient"

As a player, you do not know which is which. You'll need to test it again, perhaps make use of some special effects, to get more information. But, if you smartly combine the results of several cauldrons, you _should_ be able to make some solid deductions.

For example, if you later find out (for sure) that Thyme was indeed value 3, then you _know_ that Parsley and Sage must be overgrown/undergrown or vice versa. Do some more test, and before you know it, you cracked the code!

## Some remarks

It might seem like this game was improvised on the fly and everything fit together nicely.

It didn't. It never does. It took _weeks_ of thinking about stuff, testing it, scrapping it, and doing it again to even get to this point.

Creating the website companion also wasn't as easy. I had to make sure you had enough space for the ingredients, the cauldron, and the special effects explanations. On any device, even tiny smartphones. And it all had to work: the evaluation, the special effects, etc.

(In one of our games, we had an ingredient that was the "Fertilizer". It turns one wrong ingredient into a right one. However, after finishing that game, it turned out there was a nasty bug in my code. It counted _all_ wrong ingredients correctly, which, as you can expect, messed with our heads severely :p)

In these devlogs, I simply try to explain how the game works, how I went about developing it, what I learned, and all of that in a short and fun to read package.

So, let's continue with the last part (for version number 1 of the game): **what do you actually do?**

## Player actions

Creating the player actions was pretty straightforward, although I kept doubting myself that it might be becoming a bit _too_ complex for such a simple game. (In the end, turns out I was right. But hey, those are spoilers!)

Each player gets one action per turn. The possible actions are:

- **Create something new**
- **Work on ingredients**
- **Use a potion**

The actions seem pretty self-explanatory, but I made the mistake of lumping _multiple possibilities_ into one action. This confused players somewhat.

**Create something new:** you can create a _garden_ or a _cauldron_. You do this by closing off an area of cells on the board (by simply drawing lines around it). Gardens can be any shape, cauldrons must be rectangular.

(Why? It made thematic sense, and otherwise it's hard to tell _order_ of ingredients.)

**Work on ingredients** : you can _plant_, _grow_ or _pluck_ ingredients. They do what you expect:

- Plant: Draw the ingredient in an empty cell _in a garden_.
- Grow: Grow _all ingredients in the same garden_ by drawing an extra dot next to them.
- Pluck: Cross out an ingredient. Now add it to an existing cauldron.

The addition of _gardens_ was more crucial than you might think. The game ends ( = you lose) when the board is full. However, to grow an ingredient, you don't need an extra cell. So you could just keep growing stuff indefinitely.

The first way I mitigated that issue, is by adding the idea of "overgrown" ingredients. (At first, they could only be undergrown.)

The second solution was adding _gardens_ that could only grow _all at the same time_. Now, you need to be clever about what you place in the garden, because you don't want to accidentally overgrow something else that's in the same garden. (I would call this another breakthrough, although I think I've mentioned that word quite enough alredy.)

**Use potion:** this is the big one. You choose a cauldron (which should have some ingredients in it that you want to test), input it on the website, then press "use potion", and ta da! You get a nice result from the computer … which will probably confuse you at first but start to make sense once you try more potions.

## Version 1

The good news: it works! It's even a bit of fun! The moment that you _finally_ have a Eureka-moment, or that you guess one ingredient and you happen to win the game at the last moment, that's really nice. I think that's the core of the game, the heart that should drive the fun. That cathartic moment of breakthroughs and the tension of guessing the final potion.

Also, the game's relatively simple. It's really not a difficult game to explain and I think the rules are very streamlined. There's a strong thematic connection that ties everything together.

The bad news: strangely enough, the problems were _not_ with the rules or the general game concept. (Really, this doesn't happen often on a first version of a game.)

The big problems were:

- **The win condition was contrived**.
- **Starting the game is hard and confusing.**
- **Players don't have enough to do.**
- **Rules can be simplified much further.**

Below I'll talk about each of the problems and ways I'll try to solve them. (Yes, you're along for the ride. I write these devlogs during development, so as I write this, I don't have all the answers yet.)

## A better win condition

Look, I'm a mathematician. I've been doing number puzzles my whole life, so a game like this makes perfect sense to me.

However, if I tell a random person "hey, this is a game about guessing a secret recipe", what do they expect? An actual, fixed recipe.

They don't expect "hey, there's these 10 ingredients, but you only need to place at least 5 in the correct order, get it?"

(Additionally, growing an ingredient ten times isn't fun. So using secret numbers 1-10 is just too much.)

So I'm changing the win condition:

- The computer generates a fixed recipe – there's only _one_ solution.
- Five of the ingredients get the numbers 1-5. Put them in the correct order and you win.
- The other ingredients are "decoys"

My sister actually came up with the idea of decoys. She (rightly) noticed that ten numbers was just _too much_ to keep in your head all the time. If you could somehow _eliminate_ numbers permanently (using deduction of course), that would be nice.

You only need five ingredients now. No more, no less. The rest can be eliminated, if you play well.

How exactly? I'm not sure right now. These are my ideas:

- Decoys are numbered either 0 or 6. In other words, a decoy is _always_ undergrown or overgrown.
- Decoys are random numbers, determined beforehand. So, you could have three 2's in the game, two of which are decoys.
- Decoys are random numbers – _totally random_. Each time you evaluate the ingredient, they just return another number.
- Decoys have _no_ number. Instead, I must add another method of deducing which ingredients are wrong.

**On top of this** , I might reduce the ingredient count. Maybe I can add difficulty settings, or "levels", and as you get better at the game more ingredients are introduced. Ten is a bit much on a first playthrough.

## A better start

Currently, the game just starts with a blank paper. I _did_ include a notice in the rules about a default setup, but I didn't think it was that important and just randomly sketched something.

I was wrong.

People don't know what to do. It's just a blank paper staring at them, no clues, no game board, nothing. I've learned time and time again that you're more likely to constrict players by giving them _too many options_ than by limiting their options. Games are, essentially, nothing more than limiting options _in an interesting way_.

I decided to use a default set-up. Even better, I decided to randomly generate set-ups! (I've always wanted to try this, and this seemed like a good time.)

How does it work?

- When you visit the website, it _also_ generates a random picture for you.
- This picture contains a set of cauldrons and gardens, and some starting ingredients.
- You simply _copy_ this to your own paper, and _that's_ what you start with.

Why do I think this works? Because it allows me to completely _remove_ the "create something" action (at least in the "base game"), whilst adding a strategical layer.

For example, let's say the computer decides to give you only five cauldrons of specific sizes. Then you _must_ work with what you have. Maybe the ideal action would be to use a cauldron of size 2x2 … but you don't have it, so you need to be creative.

Adding this option, removes almost a _complete page_ from the rulebook, while making the game much better and more streamlined. I hope that future playtests confirm this.

(As I hinted just now, I might add the "start with a blank paper" variation as an expansion/variant at the back of the rulebook. I've done this for numerous games now – moving stuff from the base game to variants – and it really is an amazing solution. It makes the base game better, whilst giving the game a more long-term future.)

## Giving players more to do

In my playtests, it only took some ten minutes before people started doing other stuff. When it was not their turn, they just did something else (grabbing food, talking with their neighbor about something completely unrelated, etc.)

Although part of me thinks this is not the game's fault – it's a cooperative game, you should be _working together_, not just when it's your turn – I also see their point.

The other people are doing the puzzling. They can do an action, you can't, so why keep paying attention?

Especially if the website is loaded on a tiny smartphone, only so many people can be actively puzzling at the same time. (I highly recommend loading it on a tablet or computer, just makes it nicer and keeps it visible at all times.)

**What's the solution?** Somehow … keeping people busy all the time.

I thought about making the game competitive. In fact, that's been an option all the way through development, and I still want to include that as a "variant". But it didn't seem the right way to do it.

My mother mentioned splitting the paper into two, so you'd have two teams puzzling simultaneously. Although a good idea, this just shifts the problem: if both teams are somewhat large, you'll still have people drifting off and doing nothing.

Eventually, I remembered something I investigated a while ago: the idea of "simultaneous games". In almost all games, taking your turns simultaneously is a good idea to consider. (Not all of them, obviously, as part of the fun is waiting for your opponent's move and reacting with your own well thought-out battle plans.)

## Paper for everyone!

This brings me to the following idea: **each player gets their own piece of paper**.

After folding the paper and doing the setup, you simply cut it into pieces (perhaps this is also shown on the setup) and give each player their own piece.

Why? During playtests, I noticed people becoming very protective of their gardens/cauldrons :p They were like "did you just put that Parsley in MY garden? How dare you!" I see this all the time: people just want their own pawn, their own little part of the board, they want to customize their game and make it a bit more personal.

So, well, now everyone gets their own piece!

The disadvantage? You need a _scissor_ and it adds some setup time (carefully cutting it into the correct number of pieces).

Now, players all take their turns simultaneously. Sure, they can (and must) still communicate and share their strategies, but they do it simultaneously.

Why does this matter? Because it gives everyone something to do, it gives them agency (they can choose to go against the advice of the group, if they so desired), _and_ it adds a strategical layer. Maybe you don't want to do something. Maybe you wanted to wait until someone else did their thing. But you can't – you **must** all take **one action** simultaneously.

This adds many new questions, however, such as: can you _share_ ingredients between people? How does it actually impact gameplay? Won't this restrict options too much?

This is what I will test in the next playtests:

- Yes, you can **share ingredients**. In fact, it's absolutely necessary. You can add someone else's ingredient to your own cauldron, but it consumes both player's actions, and they must both agree to it.
- At the start of the game, each player gets their **"specialties"** : a unique set of ingredients. Only _they_ can plant and grow these types of ingredients!
- If at least one player's piece of paper is completely full, the **clock starts ticking**. Every turn, all players must cross out one empty cell on their paper, rendering it useless.

That last part is very important. Since writing down the rules for the first time, I was looking for a way to "drive" players towards a solution. Some way to force them to speed up and take some chances. (Now they can dilly-dally for a bit while growing ingredients like they're on a careless vacation.)

That ticking clock is the solution. It's another one of those "combine problems into one solution", because it also ensures that nobody is bored. When your paper is full – and you can't do any more actions – the game will end soon anyway.

## Simpler rules are better rules

Lastly – wow, this part of the devlog is becoming long – the rules could be simplified.

Using better setups (as explained earlier), I can eliminate one action completely.

I can eliminate another action as well. (Or, at least, shove it somewhere it makes more sense.)

During my playtests, players kept expecting a few things:

- You could only use a cauldron ( = test its potion on the computer) when it was full
- Conversely, when a cauldron was full, you _automatically_ tested it
- Every time you add an ingredient, you get the option of testing it.

One of the rules (of designing games) is: "don't fight against human nature" If everyone expects certain things, why can't I just make rules match their expectations?

So, instead of making "use potion" a separate action, I remove it. Instead, I _split_ the "work on ingredients action" into three very simple actions.

- **Plant:** same as before, though you may only plant your "specialties".
- **Grow:** also same as before
- **Pluck:** same as before … but when the ingredient you added fills a cauldron completely, you _immediately_ test it. (And you can pluck from other people's gardens, with permission.)

(Then, the next section of the rules is a detailed explanation about how potions are tested and what to do with the results.)

(_Remark_: the plant action has actually changed slightly. Now you get one free dot when you plant something. It just seemed more logical than starting with zero seeds, because that's useless to you.)

## Version 2!

It has arrived! Version 2!

It took a while to implement all the changes I just described, update the rules, and update the website.

But man, it was worth it.

The game plays _so much better now_. Almost all flaws from the previous version have been washed away. It's shorter, more concise, more to the point, everyone stays focused and alert, but the core is still the same.

I divided the game into several difficulty levels, and I played the first, aptly titled "First Game". (I played it several times, but with different groups.)

It means only six ingredients were in the game, no effects or other special things, and the secret recipe was four ingredients long.

**The rules were explained within a few minutes.** Using a randomly generated board setup fixed loads of issues (quicker to start, each game is different, etc.), although it _did_ take slightly longer than I liked to copy it to the paper.

However, I don't think this is an issue that needs to be solved. It only takes one or two minutes for one person to copy the board to your paper. During that time, the other players can easily do other stuff (chat, grab food, read up on the effects, prepare other things).

**The game itself also went smoothly, especially for a first try.** There were some slight issues with the fact that "people take simultaneous turns", but if present, they resolved themselves near the end of a game.

I think most of it has to do with people not being used to those kinds of games. Everyone I played with had only played games before where you took your turn _after_ each other.

(In fact, many people rarely play cooperative games, so the idea that they're not _competing_ against their fellow players usually takes time to sink in.)

**Lastly, the game only took 30-40 minutes** , including setup and first explanation. That's an ideal time.

The only questions left are: do the higher difficulties also work? (And does the "offline witch" variant work?)

## Difficulty Levels

This is the current setup for the difficulty system:

- **First Game:** 6 ingredients, nothing else
- **Beginner:** adds special effects
- **Amateur Witch:** bumps it 8 ingredients and adds two things I call "drama decoys" and "variable recipe" (I'll explain those below.)
- **Potion Master:** adds a "restricted board": some cells are unavailable, other cells do cool and unique stuff if you decide to use them.
- **High Witch:** bumps it up to 10 ingredients, uses some more "complicated" special effects

As said before, I've only thoroughly playtested the first level so far. Hopefully, that changes soon.

I expect the higher difficulties to work just fine. (In fact, the _very first_ version of the game already had special effects, and they were great!)

I only see a problem of "solvability". With 10 ingredients and all that special stuff … is 64 cells even enough to solve the puzzle? Can it even be done? I've done some research/experiments in this area before, and I think I can use that here.

When generating a puzzle on the computer, I want to "check" if it's solvable. To do so, I will go through all possible combinations that you _should_ be able to find on a 64-piece board, and check if any of them leads to a win.

Note that this is _not_ the same as checking all possibilities. Maybe the puzzle has a very interesting solution, but if it requires you to put 8 ingredients in a potion … _completely correctly_ … yeah, that's not happening.

Earlier, I said that the _heart_ of this game was the puzzling and the _tension_ of trying your final potion. Therefore, I want the game to be hard (on higher difficulties). I want to require you to guess, to try things without 100% of the information, to try one last ditch effort to win the game.

So, yeah, the puzzles will be hard and you will not always be able to solve them entirely with deduction. To compensate for this, in a way that I think is nice, I add a special mechanic to higher difficulties. You guessed it: the **Last Ditch Effort**.

When you've lost the game (all cauldrons have been used/the board is full), you get **one last try**. For free. Input whatever you think has the greatest chance of being the correct recipe.

Without this mechanic, the game can easily end with a great anti-climax. You worked really hard, you only need 1 or 2 pieces of the puzzle … and then the game just ends. Not fun. You get one last try, which is way more exciting.

_Remark:_ Pandaqi from the future here, I eventually decided to add another difficulty level, to smoothen the transition to more difficult games. Now, there's the Spice Sorcerer, which only introduces drama decoys, and then the Potion Master only introduces variable recipes. Seemed more fair.

## Drama Decoys

**So, what are "Drama Decoys"?** In the base game, a "decoy ingredient" (one that isn't part of the recipe), is simply ignored. It does not return anything, it only executes a special effect if it has one.

However, I found two other interesting ways of representing decoys. Each of them had advantages and disadvantages, so I decided to include them all. At the start of the game, each decoy just picks one random type:

- **Ignore:** the default one, described above
- **Overachiever:** has a secret number of 0 or (maximum number+1). In other words, it _always_ reports as undergrown or overgrown.
- **Imposter:** pretends to be a real ingredient and has an actual number. However, it also has the "Imposter" effect. When you use it, the computer gives you the feedback "An imposter was found!"

I think this is a nice mix of mechanics. It makes the puzzle really hard, without being unfair. (Decoys are still consistent and you're always able to eliminate them.)

## Variable Recipe

I can be short about this one: it simply means that the recipe is either 4 or 6 ingredients, instead of a fixed length of 4.

Why? Because having a fixed length makes the game way easier, and not in a fun way. It simply means that you can easily eliminate many ingredients early in the game.

If you're uncertain about the length, you need to be more careful.

(I'm also _uncertain_ about the effect of this mechanic, as it may be too hard now, but we'll see.)

## Last Remarks

As I playtested more, I noticed two more things:

Sometimes, people had nothing to do. Or, well, they could do something, but they were being left out of the conversation.

Three people were discussing strategies and sharing ingredients … and the fourth person would just be like "oh well, guess I'll grow my own garden and do my own puzzling". I think this mostly relates to the personality of those players and how well they understand the game. The people to whom this happened simply "tuned out" because they didn't follow.

As such, I don't know if there's anything in the game that should fix this. On higher difficulties, especially when we get _special cells_, this might already be mitigated. If you have a few very special locations, you are certain to be included in the discussions and pay attention.

Which brings me to the second remark: special cells. (I decided that "restricted board" was very bad terminology, as it sounds negative, whilst it actually adds possibilities.) As I coded the algorithm for placing special cells on the board, I realized the game was becoming damn near impossible at the high levels.

I, therefore, decided that these special cells should mostly be _helpful_ to the players. For example, the first effect I invented was the "Efficient" cell: you may now grow _two_ ingredients there instead of one. If you have five of these, you can suddenly grow a lot more stuff on the same board. I'll try to include more (and stronger) positive ones than negative ones, as it feels like that is the balanced way to add them to the game.

_Remark:_ again, Pandaqi from the future. As usual, as you work on a game, it expands. It's always hard to keep things simple and streamlined. This "special cells" stuff was about the point where I started to doubt myself—shouldn't this be an expansion? Can I really fit this into the game? Isn't it too much.

Eventually, I _did_ include them in the base game. Whenever they are present, their explanation is written underneath the board (on the website), so I don't need any extra rules pages that players should read. Additionally, using them in an expansion introduced many issues: how do we design the website if we have multiple versions of the game? How do I make it clear that you can turn the expansion on/off without confusing first-time players? It just didn't seem right.

## Version 3!

So, I've updated the website (it had some bugs, some areas that didn't look that nice, and only had like ten special effects) and it all looks and works great now!

I've also been able to test all variants of the game and see how they play.

(Also, if you're still reading this, I'm obviously not telling everything. I make slight changes, tweaks, updates, fixes for mistakes/errors, and playtest them all the time. They just aren't interesting to share. I don't really learn from those things either, it's more like "man, I should've learned to be less stupid by now")

I've also been thinking about expansions or the competitive variant. There have been certain elements to the game that were always in the back of my mind but did not fit in the main (cooperative, simple) game.

## The most important result

So, **the game works great now!**

The "First Game" difficulty is quite easy, but that's alright – it's precisely the reason I created it.

The difficulty levels above it can be quite hard! There have been several games where even I – the creator of the game – was stumped by the puzzle and needed a lot of time to figure out what was happening. Sometimes I did, sometimes I didn't.

The highest difficulty level is absolutely brutal (with so many ingredients, special effects, even special cells and variable recipes), but hey, that's why it's the highest difficulty level :p

## Offline Witch

I must say that I haven't tested the Offline Witch (at the moment of this writing). The online version is the superior game, in my opinion, and everyone I asked wanted to play that version.

**Why is the online version superior?** Well, it's much faster, easier, and more varied. The computer can generate the board and puzzle in mere seconds. To test a potion, you only need to input it and press a button. And behind the scenes, I've programmed a _lot_ more effects than in the offline version. Simply because many effects are easy for a computer to calculate, while they would be extremely hard for a human High Witch.)

**What does this mean for the game?** Well, it means that development is probably finished. I'll try to test it as much as I can, tweaking and improving things that annoy me along the way, but don't expect any major differences or additions to the base game.

(What kind of things "annoy" me? Well, things could always _look nicer/more polished_, and rules can always be written more _clearly/concisely_. And there are always elements of the game that are "undertested": perhaps a certain mechanic just doesn't show up very often, so you only have a rough indication whether it works.)

Anyway, I don't expect this version to give much trouble, as it's not much different from the other version. You simply get an extra action (you can ask the High Witch for a vague clue) and the High Witch must come up with a code themselves. That's all the changes required.

## Feedback

Of course, if you test the game, **please give some feedback!** Really, it helps improve this game and all my future games. Any suggestions, feedback, criticism, pointing out errors is welcome.

To be honest, it's mindboggling how little feedback I receive. I can see loads of people visiting my webpages. I can see loads of people downloading my games. My games might not be perfect, but they are surely not SO BAD that it's not even worth giving feedback. Feedback is what a creator/artist lives and dies by, so never hesitate to share it.

## Final Thoughts: Expansions

So, before closing this devlog, let's look back at the development of this game.

I had an idea for a cooperative game about brewing potions and throwing ingredients in the same cauldron.

This idea evolved into "hey, you don't even need to print anything!" (just grab a blank piece of paper) and "we could do awesome things if I included an online component"

From that point onwards, it was like building a boardgame _and_ a computergame in parallel.

In fact, there are so many interesting technical things to discuss, that I made a "technical devlog". It talks about how I implemented the online component, what I learned, and some specific algorithms used: [**\[Technical Devlog\] Wondering Witches**](https://pandaqi.com/blog/boardgames/wondering-witches/tech-devlog-wondering-witches/)

After a few rounds of playtesting, the game clicked and all puzzle pieces fell into place. I'm happy about that. There were games that took _a lot more testing_ before they even … worked adequately. (For example, my previous One Paper Game called [**Epic Medics**](https://pandaqi.com/epic-medics) went through at least 8 versions, before all mechanics finally came together.)

I must say – but I always say this – that I think this game has more potential. The original vision I had was a bit more creative and wistful than the game we eventually got, which is mostly about (cooperatively) solving a complicated logical puzzle.

For example, I wanted to allow players to _invent_ their own ingredients or _potions/recipes_ and do things with that. However interesting such things might be, though, they just didn't fit in a One Paper Game. You'd need at least multiple papers :p You'd need to print some stuff and cut out cards/chips/tiles. Which is all fine, I've made those games before, but it wasn't what I wanted to create here.

So, I look at a possible **expansion** to re-introduce some elements I envisioned for the original game. These were my thoughts:

- **Walking Around:** players love a sense of "character" and ownership. Currently, the game board is just one piece of land available to everyone. If I give all players an individual character they can move around, it will probably feel better. You'd feel like an actual witch, strolling around a forest to gather the correct ingredients, as efficiently as possible.
- **Competitive Variant:** _find the secret recipe before anyone else!_ In this version of the game, you would need to be smart about which information you share (or receive) from other players, so only _you_ can solve the puzzle in time. It would be about stealing ingredients from others, blocking their path, sneakily making their potion blow up in their faces, and things like that.

However, the more I think about these expansions … the more it sounds like a completely different game altogether. And maybe it should be.

With that philosophical thought, I leave you all.

Until the next devlog,

Pandaqi