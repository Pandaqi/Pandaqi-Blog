---
title: "Magnetmen"
date: 2025-01-26
emoji: "🧲"
thumbnail_media: "magnetmen_header.webp"
---

Welcome to the devlog ("developer diary") for my game [Magnetmen](https://pandaqi.com/magnetmen).

This article will explain the process behind the creation, the problems I faced, interesting lessons, and more. It will be a rather _short_ devlog (relatively speaking, at least), because this was a very small project that I basically made "on the side".

## What's the idea?
I'm always looking for ways to make games even simpler and more accessible. 

That's how the following idea popped into my head.
* What if the paper was just a grid of icons ...
* And on each turn you do the same simple thing: cross off one icon to get it.
* And at the end you sum all icons you collected for your score?

That'd be a _really_ simple game. In fact, I just explained the whole game to you.

Of course, it also wouldn't be that interesting or tactical.

I knew I needed _some_ limitation on which icons you could grab. That's how the following rule came to life:

> The more you have (of a particular icon), the more it **repels** you.

In other words,
* If you have 1 icon, you can't pick horizontally next to that type anymore.
* If you have 2 icons, you can't pick vertically next to that type anymore.
* If you have 3 icons (or more), you can't pick any square next to that type in any way.

In my mind---before testing the game yet---this seemed like a good rule.

As the game progresses, more and more parts of the board get closed off for _you_. This is easy to check and to execute. (I can add a graphic to the board that instantly _shows_ you when each direction is forbidden, kind of like a compass.) 

Yet it requires you to plan in advance. To make sure you can still grab valuable squares _later_ and don't get stuck too early.

When I considered a _name_ and _title_ for this game, that idea of _repelling_ kept coming back. That's the most intuitive way to explain the core mechanic. So I wrote down: "**Magnetmen?**" and went to bed.

## No time to think, let's make it
### Graphics
Initially, I wasn't stoked about that name and theme. But it fits. And it's something _different_ from what I'd usually do. (My gut usually jumps to cute animals or food for themes :p)

So I decided not to waste any more time and just make it.

I immediately jumped to creating all icons using the latest image generation AI. Why?
* I knew I only needed a few icons for the whole game, which is doable with my low amount of free credits ;)
* Those AIs are _awesome_ at creating images based on real-life materials and objects. (Which also does not infringe on any copyright.)

I can ask for a "boy playing the guitar, made of metal parts and magnets", and it _usually_ gives me that without so much as a pause. I created a list of common occupations and ran through them all to get ~30 different icons. 

{{% remark %}}
I always create more illustrations than I need. Because some of them are always better than others---higher quality, more consistent style, funnier---and I want to be able to pick the best of the best. I already knew the final game only needed about ~20.
{{% /remark %}}

As this was supposed to be a quick, tiny project, I accepted the styles I received and did minimal editing. (Just removing some ugly parts, adding a bit more color to dull ones, removing the background of course, etcetera.)

### Board
This game is so simple that I want _all_ the rules _on the page_. I already did this a few times before and learned from those attempts.

* The page is split in two parts: the actual playing board (the largest) and a "sidebar" (a vertical strip on the side)
* The board is filled with a grid of random icons.
* Around this board are strips of empty squares: the player "inventories". This is where you draw each icon you collect.
* The sidebar contains ...
	* A general tutorial. (What to do on your turn, when the game ends, etcetera.)
	* The explanations of every _specific_ icon used on _this specific board_. (Their illustration + a sentence about how they score points.)

Below is a quick sketch of this idea.

!(Very rough sketch, of course. Doesn't even have the grid itself.)[board_sketch_v1.webp]

In the final generation I always make the dimensions of things _dynamic_, so the size of the board/tutorial/inventories can change on the fly as we go.

The biggest challenge is always to get enough _space_ for the tutorial, even when we include many icons.

### Wait a minute, I had more rules!
I started making this so quickly, that I completely forgot about two other rules I wrote down. (I was only reminded of these when I went to close my notes before going to bed.)

**Rule 1: Encircling.** If you manage to completely _enclose_ a group of icons on all sides (with your move), then you get _the whole group_. (Similar to something like Go.)

**Rule 2: Must pick adjacent.** On your turn, you must pick a square adjacent to a square that's already been used.

And I can see why my brain decided to subconsciously ignore these.

First of all, they don't fit on the page. If one or both of these had to be added to the explanation, it would become too long.

But secondly, they have all sorts of nasty side-effects that would overcomplicate the game (and lead to more needed rules). For example,

* What if you enclose a particularly large group? The player inventories are quite small, so it probably won't fit.
* What if a player decides to be annoying and start in a corner? This limits the options for other players so severely, for the entire game, that it basically ruins the game => we'd need extra rules about where you're allowed to start (to make that "must pick adjacent"-rule work)
* The Repel rule is already interesting and limits placement. The Adjacency requirement would be so limiting that you're likely out of the game before it has even started.

They are still _good rules_, just not for this game. So I moved them to a future One Paper Game which would focus entirely on encircling.

## The final boards
So, I wrote the code to randomly generate all these parts and draw them on the page.

The icon picker uses my own system for "balanced randomness" behind the scenes.
* It picks a _subset_ of all possible icons. (If you use more than 6 or 7 unique icons, it'd just be overwhelming.)
* Then randomly fills all the squares.
* While keeping requirements into account. (For example, some type can't appear more than X times, another type can't appear next to type Y, etcetera.)

I also added an "Evaluator" at the end of that chain (as always), which checks if the final board is valid and has no nastiness. As of right now, though, it does nothing because I don't see any potential issues.

For now, there is no other decoration. Just solid rectangles and images, which looks as follows:

!(I usually make things prettier or add random decorations over time, often even after a game is "finished".)[magnetmen_generated_board.webp]

Notice the little drawings in the corner of the tutorial icons. Those are for _drawing_ them yourself, in your inventory. (You can't expect people to draw those complicated icons every time :p) They might still be too complex right now---we'll see about that.

Honestly, I don't see too many issues here.
* The board might receive more variation. Slightly different background colors behind the icons, for example.
* The tutorial is similarly barebones. Perhaps decorate the headings and add some magnets here and there.
* (And of course the "ink friendly" variant that uses less ink.)
* But otherwise, _this is the game_.

So I quickly printed a few of these and tested the game.

## Playtesting & Finishing
### Initial Playtests (2 players)
Due to some last-minute issues (with scheduling), I initially tested the game with 2 players only.

Below is an image of two of those papers. (With some quick notes by me as I try to improve the rules, which I'll explain below.)

!(As usual, sorry for bad lighting and terrible smartphone camera. Though I did recently---finally---get a brighter light in my workspace.)[magnetmen_2_player_games.webp]

The results?

**The game works!** 
* The rules are indeed explained within 30 seconds.
* The magnet rule clearly locks down the board over time, but not so much that you can have games where you are done after 2 moves.
* The different ways that squares score is easy to explain, read and use.

At the very first playtest, we realized some practical consequence of this rule: **once you have one of each type in the game, you can literally not pick any more squares**. I never even realized this before now, but when playing this jumped out immediately. Because me and my opponent had both collected the 5 unique types, almost out of "gamer's habit", and realized we'd been stupid.

The next game we played, we scored double the points and got way further.

The game clearly pushes you to go for _one or two types_. The challenge of this game, therefore, is about quickly identifying which are the best ones to go for (for you specifically). And, of course, hoping that others don't see how many points that will score you and interfere with that plan.

{{% example %}}
One game, I noticed that my opponent could only grab 1 explorer, while I could grab 4 (based on the current inventory situations). The explorer scores +4 points _if you have the most_, otherwise -4.

As such, I waited as long as I could to see if my opponent would go for that 1 explorer. They didn't---the smart move by them. So then I grabbed the 4 explorers, scored 16 points, and narrowly won the game.

All of this was made possible by the simplicity of the game, how far you can look ahead, and how your early choices change the last half of te game.
{{% /example %}}

Another consequence of this, of course, is that games with _more different types_ go on a little longer and are slightly easier to play. If your board only has 5 types, then you will collect 2 or 3 of a type much earlier, and thus be done earlier. If you have 7 or 8 possible types, they appear far less, and it takes longer before you even have "one of each type".

All of these little ideas about strategy are automatically _learned_ while playing it, which is great. It means the game, whilst far from being "deep" or "complex", certainly does have depth and replayability.

### My issues
My only **critique**, really, was the low amount of interaction and how quickly your choices dwindle.
* The Repel rule only applies to _you_. So you can't make it harder to grab something for opponents---you can only obstruct them by picking the exact square they want for yourself.
* Squares that have been "picked" are still on the board, so even that doesn't change much. 

I played with the idea of squares, once picked, being completely _removed_ from play. As in, they also don't count when checking the Repel rule.

This, however, didn't feel great initially.
* It required adding a sentence or two to the rules explanation.
* It probably added too _much_ freedom as the game goes on.

I considered splitting the core rule of the game into _two_ options. 

On your turn, pick an unpicked icon.
* Either cross it out and add it to your collection.
* OR fully destroy it. (You don't get it; it's just gone from the board.)

This would provide a balance between actually removing squares from the board (or stealing them from opponents), and collecting them so you can score them.

It would also complicate the rules explanation.

The more I considered this, the more it felt like a _variation_ on the rules for those who wanted a little more out of this game. (And a little more cutthroat player interaction. Which, if you know me, is _always_ my goal.) 

If I were to make these rules the core, I'd lose the one thing Magnetmen was made to do: be the most accessible game ever, take it with you anywhere and play with anyone within 30 seconds.

So this was my solution:
* The rules remain the same for the base set. However, I change the rules for one type to be the "destroyer", and always include this one.
	* "Worth 0 points. When picked, **destroy** 2 squares. (Make it unrecognizable to signal it's removed from the board.)"
* But when you pick a more advanced set, the new rules image is displayed.
	* In other words, destroying becomes a core part of the game.
	* At this point, I can be sure people have already tried the game at least once and are, you know, ready for 1 more rule.

### Playtesting the slightly tweaked system
Some time later, I was finally able to test with more players, and with the new rules / advanced sets.

I wasn't able to test all types and configurations, but that's almost always the case with these randomly generated OPGs.

As I expected, the game just became _(slightly) better_. You play for slightly longer, with more options, and there's more interaction as the board changes all the time. There is slightly more strategy and challenge. The powers connected to the icons are now a bit smarter (based on my experience playtesting), which means it's harder to pick the best strategy on a new board, even after playing several games already.

{{% example %}}
I specifically modified powers/rules so that it's not the best strategy "almost 100% of the time" to go for as many as possible of the same type, before considering another type. Some powers place a cap on how much you will reasonably want. Sometimes very explicitly, such as the judge that wants to be picked exactly once, otherwise it means negative points.

The fact that you _must_ keep taking turns as long as you can
{{% /example %}}

That's enough for me. 

## Conclusion

As usual with One Paper Games, the game doesn't have huge depth or crazy mechanics that will blow your mind. Instead, the depth matches the simplicity. For such simple rules and instant play, the depth and "replayability" of the game match, in my eyes at least.

The idea is that you can print 10 Magnetmen papers and play some quick fun games anywhere, with anyone, with no hurdles or obstacles or unnecessary complexity. I think we've achieved that!

Also, my laptop is _really_ at the end of its life. Even the simplest changes (in terms of code or graphics) can take minutes, or cause a crash, which means I basically rushed to finish this project before it all imploded.

So, to finish it off, a screenshot of the generated "Magnetmen" that did **not** make it into the game. (Adding another set seemed overkill anyway, but it would literally have killed my computer I think. Also, I decided that a game about Magnet people should probably not include animals. Still, I wanted to show these _somewhere_, because they were quite nice.)

!(A screenshot of some unused Magnetmen. This is just a selection; there are always hundreds of images that look great but just didn't work in this particular game.)[unused_magnetmen.webp]

Until the next devlog,

Pandaqi