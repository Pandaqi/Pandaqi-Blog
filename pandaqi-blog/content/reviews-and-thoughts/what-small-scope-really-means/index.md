---
title: "What Small Scope Really Means"
tags: ["thoughts"]
date: 2026-06-06
emoji: "💬"
---

Wherever you go, people give the same advice to (new) game developers: "make smaller games". Or, the other way around, they give a warning to "not overscope your game", or it will never be finished and you'll burn out.

And yes, this is all true and good advice, but they never go into more detail about what "small scope" means. That's why I assumed it just meant a short game with little content, or a simple game with really only one or two core rules and that's it. But I was never satisfied with these vague definitions. Especially because my small games ended up being either too small or overscoped anyway, with nothing in between.

Until I made and published my very first Steam game a few weeks ago. 

{{% remark %}}
That game is [Super Sub: World Cup](https://store.steampowered.com/app/4744020/Super_Sub_World_Cup/). You might think this is an attempt at marketing, but once you've read this article you almost certainly don't want to play this mess of a game anymore :p
{{% /remark %}}

I was forced to become much more professional all of a sudden, forced to stick with a project all the way until the end, and it revealed to me what this advice actually means.

I'll take you on a short journey/example to help you understand it as well, but you can also check the summary at the end if you want.

## The Baggage Trap

The game is a very simple, casual football game. The World Cup was coming up and I wanted to see if I could reduce football to just _clicking to place a player on the field_. You earn money for scoring, the matches get harder as you go, until you win the World Cup.

In the _first week_ of development, I added several "modes" to play. Instead of just playing a linear world cup, maybe you want to pick the match yourself? Or you're looking for an easier time and want to play with no opponents? Or maybe the game gets too busy for you and you want to play on tiny maps where you can't lose the ball ("Futsal mode")?

I was still figuring out what the game should be and therefore implemented all these variations. I thought: let's add support for modes right at the start, as I'll surely want a few in the final game, and it helps debugging as well. (I can just click a specific mode to play to instantly test a specific thing I just developed.)

Most of these modes are literally just a few switches behind the scenes. I set properties like `remove_opponents = true` on the mode, the code listens to it when starting a match, and that's that. It's not rocket science, it didn't take very long, and most of the modes were good enough to keep.

Now comes the trap.

I made those modes with the _current rules of the game in mind_. After that first week, I thought the game was going to work like X and not Y, and the modes were an extension of that. Because of course they were---that's simply what the game looked like at that time and I assumed it would stay that way.

But then I tested the game and found issues at the core of the idea. By the end of the next week, the game had changed so much that half the modes did not make sense (in their current state) anymore. I had to quickly make some more changes left and right and tweak some more numbers.

Well, guess what, two weeks later I tested the game again (and had an underwhelming response on the first demo :p) and saw that it needed a massive overhaul once more. By the end of that rewrite and restructure, I was again saddled with a handful of modes that had stopped working now. I, again, needed to spend time updating them to the new systems and ideas.

This cycle repeated several times until the final release of the game.

What started as a tiny feature became this **baggage that I had to keep dragging along**.

What started as five lines of code here and there to support different ways to play, became hundreds of lines of code to keep supporting this wide variety of modes after the game changed considerably.

I give one example now, but this same thing was true for almost every other aspect of the game.

* Controller support? Sure, easy, you only have one button anyway ("press button to place player")! ---> Three weeks later, I added things to the game that required new buttons, and menus, and now the promised controller support has become baggage.
* Let's keep it simple and just do a frame-by-frame animation for kicking a ball and for jumping. I only need one player character anyway, this game will never change that! ---> Three weeks later, I have 6 different player types to buy/place, and they _all_ need this spritesheet that takes much longer to make than if I had just created a single animation in-engine.
* Let's make the upgrade tree circle-shaped ("ball-shaped") to fit the football theme, should be fun! ---> Three weeks later, I discover how hard and painful it is to support smooth navigation on any screen size/for any device over a path that's made of circles only.

Previous projects of mine were tiny and/or non-commercial. I made them in a week or two, didn't have to care about following Steam's rules or supporting features that paying customers expect, and so I never experienced this cycle of baggage as clearly as this time.

Now I _really_ understand why they tell you to make your game ideas smaller and smaller. Because I basically made the entire game in the first week, and then spent a month finetuning, fixing hundreds of tiny things, getting through Steam review, and dragging baggage from early prototypes or promised features along even as the game changed completely.

## How To Prevent This?

I think two different approaches are valid. In fact, it's best to combine them.

### Solution 1: Think About Support Cost

Just because something was **easy to add/implement the first time** doesn't mean it will **stay that way**. 

Unlikely, actually. I'd say at least 50% of the features in this game ended up being at least twice as involved/complicated to support by the _end_ than they were at the _start_.

So,

> When considering whether to add a feature to your game, done just think about what it costs _now_, but also what it might cost to _keep supporting it over time_.

This is obviously just an educated guess at that point. But once you've made a few games, you have some experience with how features change or how something might evolve into a bigger feature later. 

For example, what starts at "hey wouldn't it be fun if those computer people walked around to make it more lively?" can quickly end up with "hey why not give them all pathfinding and actual things to do, that should make the game world feel REALLY lively!"

What starts at "let's quickly add a setting to change font size" can quickly end up with hours and hours of extra work on every single UI update/addition because it has to fit any of those font sizes. Such an idea might take 5 minutes when your game has only a single text box anyway. Then, months later, your game might have several screens and text everywhere and you'd go insane.

Anyone with some coding experience can implement most features in 5--30 minutes. You can get it working, albeit barebones and without graphics/sound/feedback, and test if it's actually fun or interesting. That's why I call it a trap: it feels so easy to just have these small wins, to just add these tiny features that take almost nothing. 

But I realize now that thinking ahead is sometimes useful :p If something takes 5 minutes to update _every time the game loop changes_, then you're still looking at hours of extra work by the end of the development cycle.

As such, 

* Only add features if their support cost in the long run is unlikely to be high. (Preferably zero, of course.)
* Or if you _know_ it might a high-cost feature, to really plan around that, taking more time for it than it feels like you need right now.

### Solution 2: Be Prepared To Cut

Did my game _need_ to have ten different modes? Of course not! 

A few modes are nice, good for variety and marketing and supporting different types of players. But ten of them? Fully supported as if each could be the main mode?

Did my game _need_ nine different ball types? Of course not! Some of them ended up doing roughly the same thing or just being a fun gimmick that's not useful enough to warrant all this extra work.

I made two mistakes here.

* I was very specific about the features that the final game would have, and showed them off in marketing material too. Though it's not "illegal" to walk back on those early promises, it's just **something your mind doesn't even want to consider**. It feels bad, you've already put in the work, some people might have wishlisted the game _because_ of those modes.
* I kept thinking---after playtests that revealed issues---that I should **improve problematic parts instead of cut them**. My first instinct was to try five more ways in which this part of the game _could_ work. But if playtest after playtest shows that it's not working ... then you should just cut it entirely.

For example, in the _second week_ of development I added upgrades about fouls and injuries. You could enable tackling to move opponents around/get them off the field, but there's a 50/50 chance you'd end up with a red card or injured. I added this to the game, and quite early too, because it felt right. It's a big part of the game of football. And now you get this nice benefit of shoving opponents out of the way, but it's not overpowered because you can be punished for the foul. Makes sense, right?

In the first four playtests I did, **nobody bought those upgrades**. They bought all the others (bigger goal size, more players, faster players, etcetera). Everyone played a different style and used different parts of the upgrade tree. But _none_ of those "physical upgrades". One player even kept complaining about the opponent standing in the way of the goal, and they kept reading the "Tackle Upgrade" and _still deciding not to buy it/take it seriously_.

Those upgrades were a big part of the upgrade tree in the first ~70% of the development process. I kept dragging them along, changing them slightly, making them more favorable, hoping for different results. But I should have just cut them when I saw these results come in.

{{% remark %}}
And, well, that's kind of what I did in the end. I removed them from the upgrade tree and instead put them on specific matches. ("In this match only, you can get a red card for tackling.") If I'd done this from the start, it would have saved me a lot of work and made the game better.
{{% /remark %}}

In future games I will try to keep an open mind about all features. I should be able to completely cut anything, or reduce it to the smallest scope possible, no matter how much time I already spent on it. (The typical "sunk cost fallacy".) Thinking about my past games a bit more, I guess you can say that _most_ problematic parts of a game **don't want to be improved/changed, they want to be cut**.

Games are so malleable. Players can play in so many different ways. If something is "good but can be improved", then there will already be some players in the playtest that enjoy that feature or have no (big) issue with it. But if all playtesters completely ignore a part of the game or hate it, then it's so problematic that you should just **cut it**.

## Conclusion

Small scope doesn't necessarily mean a game with only a handful of features or levels, though that is often the end result.

It means a game that has the **least possible baggage to keep dragging along as you develop**.

Because games change. They're large, difficult, complicated projects. You _can't_ know how things will turn out, what will be fun and what will not, how the game will evolve with each iteration.

If you only think about _now_, many features are quick to implement. But if you think about _supporting_ that feature through changes and a growing game, most of them will reveal they're way overscoped.

If you only think about _now_, then a game idea might seem small scope and reasonable. But just imagine any part of your idea _changing_, and if you realize this would have massive repurcussions, then it's a bigger scope than you thought.

I feel like, when we make games, we tend to make assumptions about what the game will always be. Some core thing that will never change. And that's fine, it helps keep a clear vision and focus. You just need to at least _consider_ if each part could change and what that would mean for the project. Set up your code and project to be _flexible_---and **don't keep supporting features that are inflexible**.

As a final example, in my little football game,

* I assumed it would always be the same set of matches. It was modeled after the world cup, which is 8 matches from group stage until final. I never considered anything else ... which made it unnecessarily painful to update old parts of the game once I actually changed the number of matches for a smoother difficulty curve.
* I assumed that matches would have a clock and have two halves (you know, like real football). This, again, made it hard for me to see that the game could be better without that, and made it hard to change later.

These assumptions made the game inflexible. And that lack of flexibility added hours and hours of extra development to what should have been a tiny, small-scoped game. It certainly added more work than if I had just considered that these core rules _could be changed/cut_ when I first implemented them.

So, what is small scope? It is **flexible scope**. 

**No parts** of the game require **constant maintenance** as the game changes, and **any part can be cut** at a moment's notice because the code is flexible enough to support that.

Make the game so tiny that you have the time and space for a handful of **polish -> test -> change** cycles on all its features. (Even if only because Steam review flags issues and you need to do another cycle of fixing and submitting!)

In the end, it took ~2 weeks to create the whole game---as I said, it's a heavily simplified soccer game without too much content---but then it took ~4 weeks to keep supporting all the tiny features I'd added through massive game overhauls.

{{% remark %}}
And yes, this is a stupid time frame for making a game and launching it on Steam. Take at least a few months. But they weren't going to move the World Cup for me :p And this short period was needed to get me to keep scope small, remove hesitation, and treat this as a learning experience instead of a game I want/need to do well.
{{% /remark %}}

Those were my thoughts for today, hope this helps someone,

Pandaqi