---
title: "Good Games Allow Learning"
tags: ["thoughts"]
date: 2026-04-04
emoji: "💬"
---

I've heard this game development advice numerous times over the years: _"make systems, not games"_. I'm sure they mean well, but the explanation for this statement is usually some vague anecdote about how doing this helped them this one time. And nothing more.

That's great for them! But ... it doesn't really help me, so I mostly ignored the advice. I simply never really understood what those articles/videos/posts were promoting, or most importantly _why_ it was such a good idea.

Now, years later, I have a lot more experience and actually _agree_ with this, barring some caveats. That's why I wanted to write this article to give more specifics about what the advice means and where I think it goes wrong.

## What's the idea?

Video games are hard to make. 

* They require loads of different skills (programming, illustration, sound design, etcetera).
* Even if you're skilled / knowledgeable, it still requires lots of hours to actually execute on the idea.
* And all this time ... you _barely_ have any clue if your idea is going to be fun or going to work out.

It's hard to predict "fun" or "balanced gameplay". There's no formula, no set of rules, no test that will say: "Yup this game idea of yours will absolutely be fun when it's done!"

The best thing we can do is _make it_. Create quick prototypes, let others try it, see what works and what does not _in practice_. As they say: "fail faster". If your prototype does not have any sembleance of fun after a few days, ruthlessly cut and try something else.

So ... how do we become good at this? How do we become good "explorers" that quickly and efficiently find the fun? 

* We need to be **flexible**. We need to be able to quickly cut entire systems from our game (without it breaking or causing headaches), and slot in different ones to see if they're _more_ fun. All the time. Fifty times a day (when prototyping).
* We need to **keep moving**. Once doubt settles in, once the sunk cost fallacy sets in ("I've already spent two days trying this idea, let's give it two more!"), we slow down and the whole process breaks down. We fail very slowly and will take a hundred times longer to see, in practice, what our idea should be.

How do we achieve these two things? Well,

> By focusing on building **self-contained, independent systems** instead of **specific games** during the **prototyping/brainstorming phase**. (If needed, I'll explain what a "system" is soon.)

That last part is important. If you only make systems _at all times_, well, how will you ever get a finished game? With every project I've done (not just games), there is a clear point where you have to flip the switch and say: "This seems to work. This is what I'm going to execute on and finish now." 

The prototyping phase ends. You need to start actually **connecting** all the systems you made into a final game. If you keep building loose systems, keep switching track every 30 minutes, then you'll never get a specific game off the ground. Because, for all intents and purposes, a game is defined by a very specific, finalized combination and mixture of loads of systems.

Sure, you can go back to the prototyping phase whenever you have a big question to answer. In fact, in hindsight, this is a mistake I've made for years: once I'd decided to make a game, I never did any prototyping or experimentation again! That's just as bad. I'd hit a problem, perhaps a big new feature to implement, and instead of experimenting and playing around I'd just blindly implement it ... and be surprised it wasn't actually fun or practical when done.

But that's it. Game development is basically a repeating cycle with these two alternating states.

* Prototype (brainstorm, play, experiment) by building lots of **systems**. Be flexible. Find which systems work best in practice.
* Finish and connect the separate systems into a finished playable product.

If you focus on building systems, that first phase simply becomes much easier and more effective. 

* You're flexible because you can just write a new unrelated system or throw one away---you're not beholden to a specific game idea you're trying to make work.
* You keep moving because there are always new systems to build, new things to try, even silly things that pop into your head are fine.
* Whenever in doubt (should this thing work like A or like B?) ... you just make BOTH systems and see.

## What IS a system?

This is of course a much bigger question with no defined answer. Everything is a system! Systems are everywhere! 

For most practical purposes, though, a system is just a

* Closed system of data. (No mysterious or unknown external factors left, no magical numbers needed from elsewhere.)
* That interacts with each other following specific rules.
* Transforming that data in a way that you need.

Gravity is a system. You put in where someone is right now and if they're on the floor, the system calculates and applies the force, and out comes a character falling.

Shooting is a system. You put in where someone aims and whether they pressed the shoot button, the system fires a new projectile in the right direction if needed.

You know these are separate systems because they have nothing to do with each other. Gravity can calculate itself, it doesn't care if a shooting system is also present or not. They are independent, separated, standalone, closed.

## Why use them?

One reason to write systems is that they **lead to very clean and flexible code**. If you make systems small, and don't make them rely on anything else, they're easy to understand and will rarely lead to mysterious bugs. I (and many others) often call such systems "modules". 

Some of my games have no script longer than 50 or 100 lines of code. No matter how complicated or big the game, it can usually be broken down into small modules that just do their own thing. Once I learned how to do this, and do it well, I suddenly became 100x faster and 100x less frustrated while programming.

{{% remark %}}
As such, if you're reading this and _do_ combine your gravity code in the same script as your shooting code, then take my advice and immediately split them into different smaller scripts :p
{{% /remark %}}

The other reason, as stated, is that it **allows turning them on/off on a dime**. The game isn't much fun with gravity enabled? Turn it off, play it again, see if it works better. The game seems complicated with all these different guns to fire? Turn off the GunSwitcher module and play your game forced to stick to a single gun, see if it works better.

_This allows super fast prototyping and experimentation._ Much faster than if you just have a single "game". One monolithic idea you're trying to make work, and every change requires lots of time and effort to try. Because if it's hard to experiment and play around, then it's human nature to simply _not do it_. You'll tell yourself that your game idea is great---you don't need to experiment, you just need to work a little longer on the idea. And you'll be wrong 99% of the time!

A third reason is that you'll be able to **reuse your systems in many different projects**. Maybe you have 3 different ideas. You don't know which one to make, which one to bet your money on. But ... maybe all those ideas are in the same genre. Which means there are many systems that _all of them_ will probably need! 

You can step over that doubt and hesitation by making the _systems_ you're sure you will need, no matter what final idea you end up picking. And usually, as expected, making those systems reveals all sorts of practical advantages and disadvantages---which reveals what the most feasible and fun idea is.

So, before I give a specific example, let's summarize.

* Game development alternates between "prototyping to find the best version of a new big idea/feature" and "actually making and finishing the specific game"
* While prototyping, focus completely on making tiny systems, playing around with all possible combinations and ideas to _find the fun_.
* While making the game, focus only on creating that final connection/combination of existing systems that defines your game.

## My Educational Games

A while ago I launched an educational online store. I wanted to show how education could be much more effective _and_ fun by using puzzles, games, stories, and more.

That line of thinking spawned two types of video games that I find very promising.

* **Puzzle Games:** puzzles are great for practicing and strengthening very specific skills. Digital puzzles can do things that physical puzzles can't (though I make a lot of those too), and are a bit more accessible to youngest kids (because the _game_ handles the puzzle rules/logic). First and foremost, they can randomly generate an endless supply of puzzles, something with which I have a lot of experience.
* **One Button Games:** games you can play with many people (kids/family/classroom) behind the same screen, because every player gets only a _single button_. Again, very accessible, very social, very practical, very unique. This combats most of the downsides of digital tools for kids/in education, which is why I decided to almost exclusively focus on these kinds of games.

My issue was that I had _too many ideas_ for these! 

During Christmas, I built a little skeleton framework for my _One Button Games_, to test how viable the idea was. And it worked so well that my mind immediately exploded with ideas. Before long I had 25+ different files with ideas for video games focused on colors, shapes, counting, matching, etcetera.

I read the ideas, I tweaked them here and there, made some notes about how to make them, but just _could not decide_. I knew making them all was unnecessary and overkill. But which ones were the best? The most fun? The most likely to work? You just can't answer that by _thinking_! Even _prototyping_ them all was unwieldy at such high numbers.

And so this "principle" popped into my brain again. _Make systems, not games._ I wasn't in that "finishing" phase right now. I wasn't in the midst of a project and bringing it across the finish line. I was in that "prototyping" phase, which meant I should allow myself to _do that_. Stop thinking about picking "the one and very best idea to rule them all", and instead focus on helpful or playful systems I might need.

I recognized these games obviously shared a lot of systems, by virtue of all being educational games focused on the same topics.

* Many of my shape games talked about the _boundary_ of the map looking like a shape. (So you're all stuck inside a circular map, or a triangle map, etc. This is a great solution for local multiplayer games, as it keeps all players close together and within camera view on the same screen!)
* Many of them also talked about _players being stuck on a shape path_. (So you're on this big edge of a triangle and can only move forward/backward over it. This is a great solution for One Button Games: put players on a fixed trajectory, so they don't need four arrow keys to move around :p)
* The color games talked about _mixing colors_. (No matter what the actual game ends up being ... mixing colors always follows the same rules!)
* And all these games had a note saying that _this idea would work for many things (colors, shapes, letters, etc)_. (There was no reason to make a separate matching game for colors and a separate one for shapes. We can just make a single system to switch out the thing you're matching.)

This finally allowed me to step past the indecision, start building stuff, and start playing around. I did not actually pick a specific game to make. But I identified the few systems I'd surely need and made them. Then I identified the systems that I needed to get data on---needed to know if they were actually fun---and made those. 

* **System 1: ShapeDisplay.** Pick/define a random basic shape and be able to draw its edges/vertices on the screen (at any size/color/etc).
* **System 2: ShapeFollow.** A module I can attach to anything and makes it snap to the shape (and be able to travel along it clockwise/counter).
* **System 3: ItemNarrate.** A module that simply plays audio saying the name of the items you're matching. (Was called `ShapeNarrate` before I generalized it.)
* **System 4: ShapePhysics.** Helper functions to check if something is inside or outside a shape. Or react to hitting/crossing the edges. Also the ability to turn the shape into an actual physics body if I want to go that route instead.
* And so forth. (The entire list of tiny systems I tried out is a bit long and more technical; I hope you get the idea.)

In doing so, half the ideas were combined into the same one, and the other half could be clearly discarded because I now _knew_ they weren't that good.

By simply building these systems, testing them, combining them in random ways, I got some _better_ ideas too. Even the bugs that popped up while making each standalone system were mostly "fun", because they were easy to fix (because the system is such a small bit of code) and also showed a more unique and surprising mechanic we could get out of the system.

## Conclusion

I feel like I've been writing articles about "systems" for years and years now. Both on this blog about my game development as well as my personal blog (where it's about systems in society, systems in the real world, systems in education, etcetera).

The fact remains that everything comes down to systems in the end. Learn to make them, learn to understand them, learn to connect smaller systems into bigger ones. It will not only help you with game development, it will help you in life!

I guess I also keep talking about it because systems are very hard to understand for people. Our brains want to just think linearly ("when A, always B") or hyperfocus on one thing we understand/find important right now. But reality is never like that. Everything is a system and pulling one lever will cause a cascade of changes in all sorts of places. Most of the time, tweaking _one thing_ in your game is not going to _tell you anything_. You have to take a step back and view the system as a whole. You have to make sure the _system_ is functional and fun to play before actually building the rest of the game on top.

As such,

* When prototyping or finding the best ideas, absolutely make systems instead of actual games. Small self-contained bits of logic that handle one thing. I don't think you should ever have to spend more than a day making a system (including iterating on it and reaching a final decision about its usefulness at the end of the day).
* Identify the systems you will likely need whatever you do. This helps go past indecision and doubt, past any hurdles that make you unable to commit to a specific idea or project. By making all the individual systems, you can still create any game from them later simply by combining them in different ways.
* Once you _have_ found a fun and functional combination of systems, _that_ is when you switch from prototyping to finishing. From playing around and making systems, to locking down the systems and actually making the one final game from that.

Coming back to my Shape Games example, I was able to have a very productive week building systems, even though I had no clue (and still felt a bit paralyzed) about which specific game I wanted to make. By the end of the week, I had all the general systems that educational Shape Games would need. A few days later, I finally reached a decision and was able to make the entire core of that idea within a day ... because I just needed to glue together the systems I already had! And there's no better feeling than being afraid it will take weeks to make an idea and then being able to get it done in just a few days ;)

At least, those are my thoughts and experience on the topic right now.

Until next time,

Pandaqi