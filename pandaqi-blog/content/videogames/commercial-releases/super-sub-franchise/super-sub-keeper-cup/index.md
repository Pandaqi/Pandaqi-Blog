---
title: "Super Sub: Keeper Cup (Devlog)"
tags: ["devlog"]
date: 2026-05-27
emoji: "⚽"
---

If you're reading this devlog, then you probably know that I've been making several "Super Sub" games lately. It started with the idea to create a mixture of an incremental game and a sports game. My first attempt felt mediocre ("meh"), which turned into lots of prototypes to "find the fun", which meant I suddenly had many different folders on my computer named "Super Sub: SOMETHING".

And so I was working on a prototype about playing a typical penalty shootout (in soccer). It was in 3D. I had some good ideas and a good foundation implemented. You'd take a few penalties, then save penalties (as goalkeeper) that the computer shot. You get money for each save, you can buy upgrades (such as being able to jump further as goalkeeper), it worked fine.

But then I looked at what I'd achieved at the end of the day ... and I asked myself: **why am I overcomplicating it again?**

I suddenly realized there was a much simpler version of this idea. And if I wanted to release a game around the time of the World Cup (2026), I'd much rather pick that simpler idea than one that can barely be done in the limited timeframe I had.

Why am I simulating the entire penalty shootout? Why am I programming like ten different ways to shoot and save penalties? 

If I constrain it to just _goalkeeping_,

* The game can stay 2D. (A good depth perspective is only necessary if you actually have to aim shots, that's why the other prototype was 3D.)
* I can reduce it to just a single input method: click to make your keeper jump that way.
* And a single simple objective: save shots, earn money, upgrade your keepers/goal/ball value/etcetera
* While the shots themselves can just fly in from the edge of the screen, with simple logic.

While making these prototypes, I also wanted to build out my "idle/incremental game" framework. That framework has lots of features already, but some were missing, and I saw this project as a chance to finally build those.

That game eventually became [Super Sub: Keeper Cup](https://pandaqi.itch.io/super-sub-keeper-cup).

## Turning It Into A Paid Game

The danger with very simple ideas, of course, is that it's hard to expand them into something you can sell for money. The original nugget of the idea, as explained above, feels like a tiny free game you'd play online, but not more.

And so, before I started trying this prototype, I brainstormed ways it could be expanded. I found enough to warrant putting time into this idea.

* I had the idea to **link goal size and score multiplier**. This gives you a reason to make your goal bigger ("make it harder for yourself"), because each ball you _do_ save earns more money.
* Similarly, I realized I could **link ball speed/curve to ball value**. Again, the balls come in faster and harder to save, but if you _do_ save them you earn more money.
* A game like this easily supports **auto-keepers**. They're expensive, but they'll do the goalkeeping for you once you get to the late stage.
* I wanted to learn how to program **prestige mechanics**. And so I added a simple level system.
  * As you earn money, it contributes to a progress bar at the top.
  * Once filled, a button appears: "Reset All Progress for X% Boost"
  * If you press it, you lose all your keepers and upgrades, but have a permanent boost that should get you back to where you were much faster.
* All together I could provide **~5 upgrade paths** with infinite growth (more keepers, more auto-keepers, better keepers, more/better balls, bigger goal), depending on how I combined things. That's enough to give the game some weight and make it long enough. 

The main goal was for this game to be "single screen". 

My other incremental games have two screens: _play the game_ and _the upgrade tree_. Because the upgrade tree is so vast and important, it really warrants its own scene/step in the process, which is why that's the first thing I programmed in my framework.

In this one, I wanted a sidebar where you could immediately upgrade stuff _as you play_. You never leave that one screen the game has, as your goal gets bigger, balls keep flying at you, etcetera.

So that's what I started making!

## The Shots Are Fake

This is the main reason why this idea was "simpler" than the penalty idea I was making before. In that idea, you'd alternate between shooting and saving. Both are upgradeable, which means I need to control how accurate they are + how well you can see _where the ball will end up_. This requires knowing the exact trajectory of a ball in certain conditions (angle, curve, speed, etc) and controlling aiming (to make sure opponents actually test you and get the ball on target :p)

Because the computer is taking shots (rapidly, all the time, randomly) in _Keeper Cup_ ... I _don't_ need to enable physics and do clever calculations! It's not too bad, and I know how to do it from previous work, but it's still a lot of work to create and finetune.

Instead, this is how shots work.

* They pick a target inside the goal.
* They pick a random starting position away from the goal.
* They pick a random "control point" and create a _Bezier Curve_ with the three points I have now: this is their **fixed path**.
* Now they simply travel along this path (a `Path2D` and `PathFollower2D` node combination).
* I apply some visual tricks to make this look better: a shadow on the ground (helps a _lot_ with predicting where balls go), slow down over time, get slightly smaller over time.

If the ball is able to finish its whole path, then it's a goal. If it was saved before that moment, well, it is saved!

Because this game needs to support an infinite number of balls as you upgrade, I used "object pooling". Balls are never destroyed or removed. When they're scored or saved, I just "hide" them, then reuse them a few seconds later when a new ball is shot. In practice this means only at most a few hundred balls are ever actually in the game, and none are _created/destroyed_ ever, which should be fine for any PC.

## The Keepers Are Simple

How do I know if I keeper saved a ball?

* Each keeper has an `Area2D` that defines its body. (Just a box that's the same size as the sprite you see.)
* This constantly checks if ball areas are inside of it.
* If so, it checks **how far along the ball is on its path**. The keepers are standing on the goal line, so to speak. So they can only "touch" balls that are, say, 90% done on their path and close to goal.
* If all checks pass, then it saves the ball --> score points, kill it.

How do I allow the player to control the keeper? This one actually gave me a bit of trouble. I had to try a few control schemes before I found one I liked.

* FIRST TRY: Click anywhere, all keepers jump to that spot. 
  * _Bad idea because you usually don't want all keepers jumping, and it gets messy once you have 4+ keepers._
* SECOND TRY: Keepers are automatically selected if you _hover_ over them. (So not _all_ of them jump.) 
  * _An improvement, but retains the same downsides as the first try._
* THIRD TRY: Your cursor is on a timer. Only when the timer resets (every second or so), does it "apply" its target and make the selected keeper jump. 
  * _This is just annoying because the random timing of the balls often makes one appear precisely when your cursor is resetting. So you are literally powerless to do anything about it._
* FOURTH TRY: Your selected keeper jumps to your cursor when you click. This is a "realistic" jump, with gravity applied and all, to allow players to _upgrade_ the speed and jump strength of keepers. (So if your keeper is too weak it won't actually _reach_ your cursor, it'll only go towards it a little bit.)
  * _It's not really useful if you target some spot, but the keeper just won't reach it, and you have no real indication as to how far the keeper CAN go. It feels meh._
* FIFTH TRY: Ignore realistic physics, just make the keeper _move to target_ in a straight line. Keepers have a single property (`max_move_dist`) that says how far they will move in one try.
  * _This feels much, much better. Keepers will always reach your cursor IF THEY CAN. It's snappier, easier to control_
* SIXTH TRY: Only enable gravity again once the keeper has reached its target (it's done with its "dive"). Only _reset_ jumping---so you can jump again---once it's back on the floor OR after X time has passed.
  * _This is the one. It feels like realistic physics are applied, but it's actually snappier, more fun to control, while having a clear upgrade path by shortening that reset timer._

Yup. Even something as simple as "make keeper jump to cursor" requires iteration and multiple attempts to get the exact "rules" for this system that feel right. This is why even simple games are incredibly hard to make, folks.

Last question: how do we make **auto-keepers**? This is where our fake shots/balls come in handy again.

* Auto-Keepers have another `Area2D` that's much bigger: a circle around themselves that detects balls.
* It doesn't look at where a ball _is_, but it looks at where it _will be_: the final point of its path.
* They pick the closest one and set it as their target. (A "fake click" at that position, as it just uses the exact same code as player input.)
* (I gave them an `intelligence` variable too. They _sort_ balls based on distance, and the more intelligent they are, the more they pick the ball _closest to them_. This is, again, to have upgradeability and not make them too powerful from the start.)

This is very easy to code, but the result feels very intelligent and cool. Your auto-keepers will "magically" make the right jump to get some fast, curving ball. At the same time, their limited sight and intelligence are easy to understand and clearly play a role too.

## The Math Is Mathing

I created a single `UpgradesImmediate` object that allows setting and reading all the upgrade values. I wanted to challenge myself and _not_ make this a Global/Autoload. Because this is a single-screen game, this was quite straightforward. Only four nodes in the game (as of right now) need a reference to this and nothing else does.

Moreover, it emits a signal (`changed`) whenever something changes. All other parts of the game (keepers, balls, etcetera) _listen_ to this signal. They recalculate their values (ball speed, goal size, etc) based on the new values.

This means the upgrade buttons have no internal complex logic. They are just "dumb buttons" with a list of upgrades to change. (Example: "do `ball-speed` times `2.0`") When you click one, the value is changed, the signal is emitted, everything recalculates as needed, and voila the upgrade is in effect.

I applied the general rule I've come to know about idle-like games: **upgrades are additive, costs are multiplicative**.

* Each keeper upgrade gives you **one more keeper** (+1)
* But the _cost_ of keeper upgrades is **doubled** (x2).

This general rule of thumb creates this balance that makes such a game function: each upgrade is useful, but not so useful that you can immediately upgrade again. Having one more keeper will generate more saves ( = more money), but it will take some time before this benefit has _doubled_ your previous output and you can buy the next upgrade.

Of course, these are just the simplest values, you can finetune both further (`x1.5`, `+2`, etc). But this simple system already felt quite good the first time I implemented it and tried.

I decided to simply make your `money` and `progress` an upgrade too. (So if you earn money, it changes the `money` upgrade value by that amount. The text label that shows how much money you have reacts to that change as usual.)

When you pay for an upgrade, that money is obviously deducted. But `progress` is constant. And once it reaches a threshold value, that button appears to "prestige".

Because everything is already set to react to upgrade changes, "prestiging" was relatively simple to implement.

* When I _read_ a value, I pass in the default too. (Because all values have to start _somewhere_. You can't add `0` to `null` without errors.)
* This default is saved inside `UpgradesImmediate`.
* When I reset, it simply loops through all values and _sets them to the default_.
* I can mark some values as `permanent` though (just an exported variable that's a list of String keys), and those are _never reset_. 
* This allows a value like `prestige_multiplier` that improves every time you prestige and _never accidentally resets_.

With this cycle implemented, I could set a final objective for the game. A maximum level to reach. (Each time you prestige, you permanently go up a level.)

And that's it! That's the code, systems, and general math behind the whole system. 

I should be able to take this experiment and put it into my general framework (in a more general/reusable form). In hindsight, immediate upgrades and prestiging were simple, but, well, you don't know that until you try.

Now, of course, comes _everything else_.

## Stealing From Myself

As I explained at the start, I was trying out multiple ideas in the "Super Sub" franchise. One of my other ideas was _much_ further along and basically chosen as "the one", which meant almost all its art and sounds were already done. I could borrow most of it for this game, although some parts had to be tweaked. (For example, goals are seen from the _side_ in that other game, while in this game they're seen from the _front_.)

I ended up creating only a handful of new assets.

* Logo/Header/Marketing banners for the game. After all these years I'm in the habit of making these (at different sizes, resolutions, etcetera) anyway, no matter if the game will be a paid release or not. It just makes it feel finished and professional, and makes it easy to take the game one step further (should you suddenly wake up tomorrow and want to do that).
* A few new silly player character designs. I wanted every "level" to have a different keeper design. (Because it's fun and it helps reinforce that you leveled up/remember where you are.)
* That other game has no "loading bars", so I had to add a few new UI assets for the level progress loading bar.

Similarly, I could drop my shared framework into this thing and get menus, settings, etcetera "for free". The aim of that framework of mine is to reduce the workload around the core game to just "hooking some things up, linking some things to the right place". If I tell that framework the details of this new game, such as how to save your progress in this one, it _should_ handle everything else around it.

Normally the "everything else" part is _at least_ 50% of development time. But due to these unique circumstances, this entire phase took just a few hours on a Friday evening.

## What now?

I considered some ways to expand the game. Different types of keepers? Different types of balls? Some alternative modes where you, say, _take_ penalties?

All of these ideas, however, did not really fit the game. They overcomplicated a very simple design that was working fine. It felt like desperately trying to turn a little free toy into a "paid game with lots of content". Just meh.

So I decided not to do any of that! I only included _two_ other modes (that only apply very minor changes): 

* Roguelike. You lose as soon as a single ball goes in your net. It's a mode that made sense and felt like something the game needed.
* Endless. You can just keep playing on and on, all the limits are gone and you don't "beat" the game after a while.  
  
I also added some simple settings to customize the experience to your liking / improve accessibility. I make these settings anyway to help debug/develop quickly, so I've made it a habit to expose them to end users.

This game is far too small to be sold or be treated as some big project. That's why I decided to put it on Itch.io for free and use it as a "marketing opportunity" for the actual big game I _do_ intend to sell.

This little side project taught me a lot of new tricks and improved my idle/incremental framework again. It's also just a fun little time-waster that I think some people will enjoy. All in all, it took about 3 days to make. 

(It must be noted that I felt ... weird during those days. A little sick, a little tired. I basically worked on it in this weird distracted state where you work for 10 minutes, zone out completely for 10 minutes, work again for 10 minutes, and so on.)

I also hope to take these lessons learned into that bigger "penalty shootout" game I mentioned in the introduction. Because that _does_ feel promising and big enough to become a full release.

As for the _reception_ of the game ... that was a deafening silence. Lots of visits, lots of plays, no feedback or comment. This is completely normal (unfortunately). Even my most beloved games have thousands of visits and plays ... and only 0.1% actually leave a review/feedback/engage in any other way.

It usually means the game is _fine_ (no bugs or terrible stuff people tell you about) but _not great_ (they don't love it so much to tell you about it). Which is just completely fair for a tiny practice game. A single person left a 2/5-star rating, which, erm, I don't know what to take away from that. I don't think the game helped with marketing _Super Sub: World Cup_ at all or that anyone was impressed by it :p Oh well, onto the next one.

Until the next devlog,

Pandaqi
