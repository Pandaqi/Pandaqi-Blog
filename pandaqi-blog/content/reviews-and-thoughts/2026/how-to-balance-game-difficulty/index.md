---
title: "How To Balance Game Difficulty"
tags: ["thoughts"]
date: 2026-06-15
emoji: "💬"
---

I recently released my very first game on Steam. It's a silly little football game that simplifies everything to just clicking and scoring goals (with upgrades and twists of course).

It was a tough road that suddenly forced me to be more professional, do more testing, and make tougher decisions (than I ever did with my free hobbyist games).

The recurring theme was **difficulty (balance)**. 

I've been making games for a while, so bugs are easily fixed (and rare anyway), I know my way around all the different parts of the process, and I even have a lot of experience with tax and company stuff for publishing things. (Because I also have my own online store, have published a lot of books, etcetera.)

Actually _making the game_ and _getting it on Steam_ was the easypeasy part.

The hardest part was letting other people test it and getting the same response each time. 

> It's too hard. I've tried five times and still can't win my first match.

I make it easier.

> It's too easy. I can just do THIS THING and win first try.

I make it harder (perhaps only THAT THING).

You guess what happens: now it's too hard again.

At some point, it feels like a pendulum endlessly swinging back and forth, and every change you make is just an estimated guess. Of course, you _try_ to gather data and to be precise with your feedback questions. But even then, _you_ as the game developer have to figure out _why_ it's too hard, not the player. They'll just say something like "I tried 5 times and I can't win---TOO HARD". 

If you're lucky, they'll say something like: "I tried 5 times, but each time the opponent blocked my final shots" Then you at least have something to go on. But if you remove the opponent, or make them way more "dumb", then ... it's too easy again. Players are bored and don't really like the game.

I must have done five completely different versions of the game, with different people, before we finally found a difficulty curve that worked. This was only a week before the game came out, and it's what the game shipped with.

This is not _really_ a game design problem. All the _elements_ of the game had been finished a long time ago. All the systems, the images, the upgrades, the logic. Their underlying connections---aka how these elements interacted precisely---_also_ never changed again. You still had to score the ball in the goal, you still tackled opponents by hitting their body, that never changed.

No, it was purely about **difficulty**. The order in which things were introduced. How they were explained. The exact numbers on upgrades and of targets to hit.

I spent the final weeks of development just shuffling things around, tweaking numbers, removing stuff that was too easy or too hard. Nothing else was really added, no interactions were changed, because those parts were all fine.

And then I ask myself the question: WHY? Why does difficulty feel better now? What did we do that _worked_? How can we reproduce it?

I couldn't really find the answer. It wasn't just "make it easier" or "lower all numbers". As stated, that made players bored and the game uninteresting.

Then I watched a video from Jonas Tyroller about the concept of "fun". A great video that (thankfully) agreed with my own observation that LEARNING = FUN. (It's even the basic idea behind my entire online store selling educational games and such!) 

Fun comes from creating a good _learning environment_, which is similar to a good _problem solving environment_. And a good learning environment should be _challenging_ (so not too easy), but not _overwhelming/impossible_ (too hard). If you're not forced to try something new, you're not learning. But if you have to learn ten difficult tasks at once, then the game is too hard and you won't learn anything either.

And in that video he briefly spoke about a solution for finding this balance, which is (paraphrasing)

> Players all have different skill levels and different ideas of what is too easy/too hard. If you really need a single difficulty curve for them all, then **make the start way easier than you think** and **exponentially increase difficulty over time**. Skilled players can just breeze through the first few levels until they finally hit a wall and can start being challenged. Everyone can quickly "find" their own level this way.

He's talking about a _single_ difficulty curve here for all players. If possible, the best solution is of course to _adapt_ difficulty based on the player. (Example: let them CHOOSE Easy/Medium/Hard, or do some smarter algorithm behind the scenes.) But this is often not possible or viable, and most games have a single finetuned difficulty curve for all players.

And when I heard Jonas say this, I was like "Yes, THAT is what I stumbled upon too in my game!"

In early versions of my game, the campaign looked as follows.

* There were 8 matches: group stage until world cup final.
* You'd earn money for every goal scored, but only advance to the next match if you won the current one (as usual).
* This means you'd try 5--10 times, finally win, then continue to a new _harder_ match.  
* This also means every match had a big increase in difficulty. Otherwise you'd be able to beat the whole game in under an hour.

My first iterations kept simplifying the matches: fewer goals to score, more time, more powerful upgrades. And yes, they were improvements but they never actually "fixed" the balance issue.

Why? Because every match was such a big leap in difficulty,

* Less skilled players would get stuck on the first match.
* Skilled players would get stuck on the second match.
* That's it.

You couldn't reach the right difficulty yourself, at least not quickly, because each match demanded a bunch of upgrades and time investment. The third match already asked for 20 goals and lasted 40+ seconds. A skilled player will still have to "waste" a lot of time in these stages, playing without being challenged ("braindead", or so they feel), before they hit the match with the right challenge. On the other hand, a new/less skilled player will already struggle with the jump from first to second match, which is why many testers gave up there.

The reason my game's difficulty works much better in the final version is because ...

* I spread the matches much more thin (8 -> 28), and made the first match so easy you're basically guaranteed to win it.
* This means every match is only a _tiny_ increase in difficulty.
* A skilled player will win the first few matches on their first try, and _quickly_ arrive at the match that has the right challenge.
* A less skilled player can use the first match to learn the game and experiment ( + feel good about winning), then the second match is already the "right amount of challenge" for them.

There were some "repeat playtesters" for this game. People who played (almost) every version. These people, like myself (the developer), will be way more skilled than your regular player by that point. That's why they were saying the first matches were "boring" now, after I'd simplified the whole thing again. That's why it's so hard for developers to balance their own games as well: we are VERY GOOD at our own games after playing them for weeks. I genuinely believed my first five matches were superduper way too easy---and then testers told me it was still too hard.

Only this new approach made it possible to have a single campaign, a single difficulty curve, that worked for everyone.

* New testers had fun right from the start and could jump into the game easily.
* Repeat testers did not mind blasting through the first few matches until they hit a new wall, and continue testing a few matches from there.

I hope these lessons will be useful to you and your own games too :)

When balancing your game,

* Make it much easier than you think.
* But make it quick and easy to progress---for players to increase difficulty themselves.
* So that everyone will naturally hit their own "wall" and can start having "optimal fun" from there.

Some other things that helped here were, for example,

* I added a money reward for _winning a match_ (on top of goals scored). This allowed skilled players to win a match quickly and then also immediately have the _money_ needed to buy the upgrades (that another player would buy more slowly, one at a time, over time).
* Tweaking my numbers to be **exponential instead of linear**. At first, the matches _added_ the same increase each time ("+5 goals compared to last game", "+1 opponent compared to last game"). But this made first matches too hard and later matches too easy. Skill compounds, upgrades compound, repeat attempts at a level compound. As such, a more fitting progression will almost always be one that scales exponentially.
  * What does that mean? A simple way is to keep _adding_, but the amount you add changes. Match 1 = score 5 goals. Match 2 = score 6 goals (+1). Match 3 = score 8 goals (+2). Match 4 = Score 12 goals (+4).
  * You can also _multiply_ by low values (like `1.1`), but I usually don't like the imprecise numbers and complexity that comes from this.
* Add **one new rule/system at a time**, but use upgrades and such to allow **weakening its effect**. If you let the player pick upgrades or rules themselves, they'll often _not pick anything_ (because they don't understand why they'd make it harder for themselves/how that new system works yet) or add _several new rules at once_ (which will overwhelm them and is hard to tutorialize too).
  * Basically, I had to **invert** my original thinking. Don't use upgrades (or "player interactions") to introduce new game systems---force introduce new systems automatically and use upgrades to work around/with them. (This basically lets you "control" the difficulty curve and spacing of difficulty spikes more precisely.)
  * Early on, systems like "tackling" or "yellow cards" where all _upgrades_ that players had to enable themselves. But players were like "Why would I add a 50% chance my player or the opponent gets a yellow card? That feels like buying your own punishment!" Whereas other testers were overconfident, enabled many things at once, and then hated the game.
  * Instead, every _match_ now simply introduces one new system. It's required now. You have to deal with it. But I am now _certain_ it's only ONE rule, and I can add a text box explaining the one new thing at the start. This is the tiniest possible increase in difficulty.
  * And now upgrades can be inverted and be used to _weaken_ this system instead. Yellow Cards are forced on you and it's making you lose? Buy the upgrade so your players can get 3 cards before being sent off!

Hopefully my next game doesn't need to be overhauled five times before I find this difficulty balance. Let me tell you: it doesn't matter how clean your code is, so many massive changes in a game's direction and campaign will leave it a garbled mess by the time you release :p

Until next time,

Pandaqi



