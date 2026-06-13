---
title: "Not All Problems Are Equal"
tags: ["thoughts"]
date: 2026-06-05
emoji: "💬"
---

When designing games we often think in terms of "challenge" or "problems". What's the conflict? What _problem_ are players trying to solve? What's the _challenge_ that should keep them hooked and having fun?

Most games are summarized that way too. "You want to get to the flag, but OH NO PROBLEM there are MONSTERS IN THE WAY." "You want to get to the top of the mountain, but OH NO PROBLEM gravity exists."

We talk about problems and challenges, about overcoming obstacles and growing your skill as a player.

Recently I finally made my first Steam game, which forced me to become more professional and stick with a project for longer, and it revealed to me that **not all problems are created equal**.

At the start of that game's development, I had thrown all my ideas at the wall to see what stuck. It's a silly little football game, so I had invented all possible problems in football, all possible ways to make it harder to score or make opponents tougher to beat, and I basically added them all. 

* Bigger opponents! 
* Smaller goals! 
* Special balls that are much slower or curve! 
* Lights turn off! 
* You start the game without boundaries ( = no corners or throw-ins), so bad shots just mean the ball is lost! 
* Players have stamina and will stop doing anything when exhausted!
* PROBLEMS!

As I give this list of examples you might already realize what I mean. These are all problems. They're pretty simple, intuitive problems too. These are not hard to understand or explain to a new player, they're not hard to code (for the most part), and they're very thematic.

But they're not all equal. Some of these problems actually make the game fun, make it _better_. Some of these are just _annoying problems players don't want to solve_.

The smaller goals were a **"good problem"**. That's why they were in the game from start to finish (and the first upgrade of many players is to grow the goal again).

The stamina idea was a **"bad problem"**. I kept tweaking it, kept workshopping it so to speak, but people kept ignoring the mechanic entirely or hated it.

Why? What's the difference?

Making the goal smaller ...

* Does not **completely block** players. They can obviously still score at any time.
* Is a problem that you can overcome by **being more skilled**. Aim a little better.
* Is a **small change** that players can adapt and adjust to.

Whereas the stamina idea ...

* Can **completely block** players. If all your players are on the ground exhausted, then there's literally nothing you can do to get them playing again.
* Is a problem you can only overcome by **buying upgrades** (to get more stamina) or **not really playing** (place players on the field much more slowly to conserve stamina).
* Is a **big change** that introduces a complete new subsystem all at once.

Obviously, when designing games you want only the _good problems_ and none of the _bad problems_. And I don't have much else to say about that :p

I thought this was an extremely simple and clear example of what they mean and why it matters. That's why I wanted to write a short article about it, to help myself and maybe others understand and remember.

In future games I will try and use this as a test. Because almost every idea for a video game is "a problem to add". A rules twist, a wrinkle in the design, a little variety in the challenge. Almost all of those ideas come down to adding problems. 

With every such idea I have, I try to ask myself whether it's actually a GOOD problem.

* Is it a _small_ extra challenge that doesn't overwhelm players?
* Can it be _overcome_ by practice, experience, getting more skilled? 
* (If not, then it must be an _optional_ problem that players can walk away from.)
* Can players _still play_ even if they're not solving the problem / haven't overcome it yet?

I think any other part of game design is a natural _result_ of these questions. Notice that I didn't say anything about it being "fun" or "interesting", because those are vague things and because they are the _end result_ we're trying to achieve. But I believe that "good problems" will _naturally_ lead to those things. 

Humans are simply problem solving creatures. We love a good problem, we love a good challenge, we're literally _inventing_ problems to solve if we're bored all day.

As such, any game (or puzzle, or activity, or whatever) that _solves a problem_ will have people motivated to try and satisfied to complete it.

The game will be _more fun_ (because it's less frustrating and truly rewards your skill) if the problems you present are "good problems".

I briefly mentioned problems being "optional" in the list above. Any game will have some problems that are _not_ optional, because, well, you need _some_ objective and some consistent rules for your game world. But whenever possible, I think you should make problems optional, in the sense that players have **different viable strategies / play styles**. Instead of a single required problem to solve, split it into _three optional problems_ and solving any one of them will be enough to make you advance.

In other words, good problems in games are actually **opportunities that are simply hard to grab**.

That's when I think the word _problem_ turns into _challenge_. A good game _challenges_ players by showing them opportunities and asking if they're up for the task. 

* "Hey, why not try and make this very hard jump, and see what's up here?" 
* "Hey player, why not try beating this harder monster for double the reward?" 
* "Hello there player, you want to enter this mysterious forbidden zone? Prove your worth first by discovering a way to break the fence."

I ended up doing something similar with my Stamina system.

* Stamina stopped being some compulsory early-game element. It's only added in the final few matches of a few modes where it makes sense; you can also play the whole game without seeing the system at all.
  * Because it's added near the end, when nothing else is introduced/changed anymore and you're familiar with the game, the change isn't as big as it used to be.
* Instead of just being a problem, it became an _opportunity_: you can enable the upgrade that says a team instantly loses if all their players are "incapacitated" (sent off, injured, exhausted).
  * This means you can actually win a match not by scoring the most goals but by using the system to wear down the opponent.
  * Or you can play "tactically" and conserve some players to prevent them from dying. That's the original problem I added, but now it's a _choice_ to play this way.
  * At this point, you also have access to loads of upgrades and play styles that influence stamina and its effects. For example, change the _duration_ of a match, add _more players_ to your team, or get a special button that "heals" your players instantly

I might end up cutting the system entirely anyway, because I still can't satisfyingly answer the last question---the stamina system still completely _blocks_ a player once their players are exhausted. But the new approach turned it from a bad problem into a better one and finally helped me find a place for this idea. 

I intend to make more games in this "Super Sub" series (of silly little simplified sports games), and I already wrote down a much better approach for stamina that fully makes it a _good problem_. I'll give the current version of that as the final example.

* Stamina is a core element of the game from the start. All players constantly show their draining stamina and you lose when it runs out. This isn't some big change halfway through, it's not tacked on, it's explained and shown right at the start of the game. (I might even start with stamina being the only way to lose a game; scoring goals is secondary and comes later :p)
  * But you can pick a mode as well where stamina is _completely turned off_.
* Their stamina _influences their other properties_: more tired players kick more slowly, move more slowly, are injured faster, etcetera.
* And you can _influence their stamina_. You have full control over subbing them on/off. You have special players that will "heal" anyone in a certain radius. You can force _opponents_ to run more or do more and drain their stamina. You gain experience for playing matches, and you can put those skill points into stamina as needed.

This makes it a small problem that's easily understood (especially as you practice it now with each match). It provides plenty of ways to get more skilled and overcome its obstacles---it provides _opportunities_ in equal measure with _problems_. And because the match simply always ends when one team is exhausted, you're never blocked from playing or making decisions.

We'll see if this idea survives contact with the wild when I do make that follow-up game. But at least the plan is much better than my original stamina system ever was. (And I think "stamina" is quite notorious for having this exact same issue in _all games_. It's one of those intuitive real-life problems that anyone adds to games, only to realize it's a bad annoying problem that players don't want to solve ... unless you consciously turn it into a _good problem_.)

Those were my thoughts for today,

Pandaqi