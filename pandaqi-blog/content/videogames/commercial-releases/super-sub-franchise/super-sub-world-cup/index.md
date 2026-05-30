---
title: "Super Sub: World Cup (Devlog)"
tags: ["devlog"]
date: 2026-05-29
emoji: "⚽"
thumbnail_media: "main-capsule.png"
---

Welcome to my devlog (or "developer's diary") for the game [Super Sub: World Cup](https://store.steampowered.com/app/4744020/Super_Sub_World_Cup/). 

It's a unique mix of an incremental/management game and a more action/arcade-y game. Almost every part of the game was something I never did before, or not in this specific way, which made this project full of interesting problems and lessons learned ;)

I'll try to talk about all of that in this article, in a way that's hopefully equally interesting or at least simple and clear.

## What's the idea?

With the (soccer) world cup coming up, I thought it was the perfect chance to make my first Steam release a simple game with that theme. I had already written down some strong soccer-related ideas a few months earlier and decided to dust them off and start with one of those.

So I started. The next day, I tried a different one. I ended up doing three completely different prototypes (in three days), because I just ... wasn't feeling it. Really was not feeling it. Each prototype was "fine" or "okay", I guess, but it ...

* Either wasn't _fun enough_ that I thought people would pay money for it (or the idea had too little room for content/to grow),
* Or it needed too much machinery to become fun, which means I didn't have the _time_ to make that idea.

I told myself to _simplify, simplify, simplify_. Try to get rid of all the extra details that will take time. Find a way to make the game in 2D without looking too simplistic. Find the simplest gameplay loop.

At the end of the third day, I found the answers. Or, well, _some_ answers, enough to do a fourth prototype that eventually became the game.

* I realized most of my problems (with previous prototypes) came from the fact that we only have _one ball_. If I just spawn _a bunch of balls_, randomly scattered across the field, the idea finds new life and opportunities appear. Also, using a 2D top-down view was the simplest place to start.
* I set a hard rule that the entire game should be playable by **mouse only**. The only action is clicking.
* How do you play soccer through clicking? That's where the name **Super Sub** came from: all you can do is _add a new player_ (a "substitute") wherever you click. You get X substitutions per attempt. (A number which you can obviously _increment_ with upgrades later!)
* How does this lead to fun gameplay? When you place that sub, it will immediately **kick away any balls nearby** (within its "radius", also upgradeable). So, if you place them well, you should be able to shoot soccer balls into the opponent's goal this way.

That's it. That's the core loop that felt the simplest to play, while having a short and satisfying feedback loop. Each time you place a new "sub" on the field, balls start flying, and you'll score some goals for points!

I knew this was the one when I made it. It took only an hour to get this core loop functional, whereas the other prototypes were a full day of work only to get a half-broken version of an idea. The _upgrades_ basically invented themselves: more subs to place, bigger radius, bigger goals, stronger kick (for scoring from further away), etcetera.

## The "World Cup" part

As fun as that core loop is, we need some structure around it to make it sing (and to make the game worth the price of admission, in my eyes). You need to play a "world cup", which means ...

* Each match is against a specific team. That team has its own properties that stay the same (number of players, how good they are, etcetera).
* If you **win** your match, you advance to the next round and play the next team. Which should be _more difficult_ to beat.
* If you **lose** your match, you gain money for playing and scoring goals, but don't advance.

This increases the scope of the game, while also having a clear and thematic end goal you work towards.

Now, this is where I "went wrong" again, at least for a day. I started "thinking ahead", which is just a bad idea :p I started inventing rules and mechanics for how the computer could play. For example, one of the first pieces of code in the game is to make the computer place its own players (once every 5 seconds), in such a way that they fire soccer balls at your goal. A somewhat "intelligent" player to play against.

The issue with this is that I was putting the cart before the horse. I was working on things that _maybe_ were needed in the late game, while the core game loop---the very first match a new player would play---was far from done or fully explored. (In my experience, such work _always_ has to be refactored or tweaked in the end because the game has changed and you missed some things. It's just the wrong priority at this point and a waste of time.)

So, at the end of that day I took a step back and told myself to focus on that first match first. A new player opens the game. They start a new run. What happens?

## The Simplest Possible Start

The simplest possible start, in my eyes, is ...

* One where **the opponent is not doing anything**. They can have some static dudes on the field as obstacles, sure. But they're not making substitutions, or moving around, or doing anything that would overwhelm the new player (... and which isn't needed at this easy difficulty).
* One where it's **easy to get money without much effort**, but it **takes effort and understanding the rules to BEAT the team and advance**. If you want, you could just place some dudes, score some easy goals, earn money, be happy. Don't overcomplicate it. Play however you like! Chill! But to actually _beat_ this team, you'll need to upgrade and be smarter. 

How do we start off chill, without making it "boring"? I've found this to be mostly about removing _annoyances_.

* When you start, **balls do not interact with another**. Nothing is more annoying than your perfect shot gently touching one of the other 50 balls on the field along the way, then spinning in the wrong direction and going wide. It's too overwhelming at that point to consider all these balls on the field, so just don't make them collide.
* You get clear feedback on your **area** and **which balls you'd kick if you placed it here** (with a clear arrow). I do not want to surprise players by _nothing happening_ because they placed their guy three pixels too far from the ball they tried to shoot. That's just annoying. (In other words: I _could_ have put such "helpers" behind upgrades, but decided that was a bad idea.)
* I decided to **remove the map border**. Again, balls bouncing off of the edge is both not how soccer works and something that will surprise and confuse first-time players. I _thought_ borders would be safe and helpful, but in practice this just wasn't the case. When you shoot a ball off the pitch, I found something _better_ to do (which I'll explain below).

Now we have a simple game loop where you click to place a new player, shoot some balls in a straight line (hopefully into goal, if you aimed well), and you feel good and earn money.

Is this _too_ simple? Hmm. As I played around with my basic prototype, I noticed a few things. Things that I just never considered when this was still a vague idea in my brain.

* The game gets a tactical aspect for free if I just **make the ball hit the players**. If you don't think ahead, you'll _block your later shots_ with your own dudes! Because, well, once placed, your super subs aren't going anywhere. 
  * This was surprisingly interesting. You _want_ to take shots near the goal first, as they're easiest, but you also kinda _don't_ because then your guys end up defending the opponent's goal for them.
* The entire idea of an incremental game is that you **start weak and upgrade your squad**. I realized that I could simply start the game with a tiny goal, inaccurate shots, low power. This adds a bit of randomness (not so much that it's annoying) for variation and diverse challenges. 
  * For example, there might be a ball very close to the goal, but it's at a difficult angle. Knowing the weakness of your players, you might decide to shoot a "safer" ball that's further away, one that can be inaccurate and still end in the goal.

If we can achieve all this with the single rule of "place player, kick ball away", it felt like the game had potential.

I decided to build this entire first match, as much as I could, before I'd continue adding anything else. From playtesting earlier incremental prototypes (_which will hopefully launch on Steam too_) I noticed just how much of an impact it has when the game can just immediately throw you in and let you play. No tutorial needed, no extra steps, nothing to overwhelm you.

## All The Soccer Oddities

Reading the description above, you might think: "Wait, where are all the _other parts_ of soccer?" That's exactly what I asked myself.

For the most part, those other parts just won't be in the game. It doesn't need to be realistic, it needs to get the important things right and just be fun to play.

But I identified a few things that I _did_ want the game to have. They're both very important in this sport and very important for making this game tick.

### Fouling

Abundant fouling and tackling was one of the silly things that I thought the game needed. Isn't that what everyone wants? To be able to kick their opponent out of the way instead of doing actual defending and positioning and stuff? :p

I also thought it was a neat way to solve the issue of players being static. If they're in the way of your perfect shot ... then they'll stay in the way and never move. Not anymore!

* A player will _kick away_ other Players within their kicking range.
* If the player actually _overlaps_ with ("touches") another Player, it's an actual tackle. 

A **kick** is less **risky but also less controlled**; the opponent player might shuffle to the side but still block stuff. A **tackle** will lead to fouls with some probability, but it will always **remove both players**.

What does a foul mean? As always, I tried to find the simplest implementation of it.

* The probability of a foul going against you depends on _where_ it is (opponent's half = opponent is favored) and your _upgrades_. (You can upgrade to make fouls go in your favor more often, or to move that line of where a team is favored.)
* A foul creates the appropriate "set piece". These don't pause the game, you don't go to a different screen, it's more of a "one-time effect".

Talking of set pieces ...

### Set Pieces

When your ball goes out of bounds, for example, I wanted to give you some version of a "corner". How? How do you keep this in line with the rest of the game? I realized I could just make the ball **stop** at the edge (instead of disappearing entirely). Over time, a corner might have collected, say, 5 balls. Now you can shoot _all of them_ with a single player placement. This felt like a fun and useful mechanic to discover.

In my code, I can just mark these shots as "taking a corner" and apply curve that allows you to get them into the goal in one go. Even if you don't, that's fine, you can provide the finishing blow with your next player placement of course.

The same thing can be done for a throw in. The balls just stop at the edge; they gather there doing nothing. At some point you can place a player behind it to throw all of them. The unique twist for this set piece is that throws are _weaker_ (can't go as far as a kick, of course), but _more precise_.

Fouls lead to free kicks (or should I say ... _Free Clicks_) and penalties. Both of them simply mean that ...

* Any players within range are removed from the field (back to the sub bench). 
* Any balls very nearby are removed too (if they're so close they might get in the way).
* The opponent does not do anything until you made your next click. (So, well, it actually _is_ a Free Click.)
* (Set Pieces end, however, when the timer runs out. So you do have to hurry a little bit and can't just "pause" the game forever on a set piece like this.)

It simulates clearing the path to take a free shot, without having to stop the gameplay for it or add some (quicktime) minigame that needs to be explained.

_Remark:_ In later stages, fouls might actually give yellow cards and stuff, sending players off the pitch so you can't use them at all anymore in this run, etcetera. But I had not decided anything about that at this stage.

### The General Match Structure

There is no _need_ to make our matches have a first half and second half. We can just make it a single timer and it would be simpler. But I feel like this structure is so embedded into the brains of football fans, so crucial to the theme, that it has to be there.

It's mostly decorational, of course. After the first half you just immediately go to the second one. But this part of a football match felt too important to abstract it or brush it off. And it allows some silly specific upgrades like "In the second half only, you get THIS bonus".

I guess this is also why I wanted to add set pieces and fouls and stuff into the game, even if they're just a silly abstracted version or you might choose to never even use them. It's an important part of what makes the sport and sets the right mood in such a game.

### Passing & Team Play

A common theme in incremental games is that you can upgrade to get bigger chains and bigger reactions out of a single click/action. What does that look like in soccer? Well, it looks like passing plays!

I really wanted this to be an option. I wanted the game to be "controllable" enough (through your actions and/or upgrades) that you could place a few people strategically and have them pass the ball into the goal. I wanted the game to become---if the player wanted---more than just placing an individual person each time to take a single kick.

I also simply realized, while testing the early stages, that this was one of the most "fun" parts of the idea. The fact that you could kick the ball into another player of yours to get it into the goal. The fact that you can make the opponent own goal on purpose :p

And so the game received the simple core rule that "if someone can kick, they will kick".

* You can kick the ball towards team mates or opponents. If close enough, they immediately kick it again.
* Upgrades allow you to tell team mates to pick a "smart" new direction: passing to the closest team mate or shooting at the goal.
* Similarly, your Auto-Kickers can become smarter like that.

To really encourage this, the ball tracks everything it hits along the way, and more passes (more "stations" for the attack) lead to a higher score once the ball is finally in the net.

This has the added benefit of "failing forward". Even if you aim badly and miss a few times ... the ball will be _worth more_ once you finally get it in the goal on your third attempt. Accidentally hitting stuff is not annoying because it can actually lead to goals that earn you more money in the end.



## First Prototype Problems

The game worked quite well now, but some issues remained.

* Once all players have been put in play ... there's no sense continuing. However, you might have kicked a ball, and we need to wait if it goes in or not. We can't just instantly end the match after the last player was placed, that would be annoying :p So I decided to "allow an early end" if all players have been placed, which means we stop after the current half is done.
* This still doesn't fully fix the issue of having to "wait it out" sometimes in the first matches. Sure, I have a "cancel attempt" button, but players generally don't want to use that. Then I realized I could just **auto sub off your players**. After waiting X seconds, the sub goes back to the bench. You can place it again now. (And that interval of "X seconds" can be reduced through upgrades.) I wasn't sure if this should be on by default, but I liked it enough to keep it for now.
* Picking which player to place is currently quite useless. (And might remain that way if I never implement something to differentiate your players.) I decided to just **automatically give you the next one** to play, to make the introduction even easier and save you a click each time.
* I really want to prevent lucky first games that beat the first team. (If you beat later teams very easily, that's often a result of good upgrading and less annoying.) That's when I realized I can just **give the opponent a head start**. Make the match start at `0-5` and that's a difference you have to make up, which is very hard to do without any upgrades yet. (Though, as stated, this relies on starting with _very_ weak players and shots.) If we really lean into this as a silly playful game, these kinds of ideas should be fine.

Once those were fixed, I asked someone to playtest the game. Explained nothing, gave them an ugly-looking but functional football game, and watched.

... at least, that was the plan! But things happened, people were busy, and we had to skip this first "test". Maybe for the best, because I had basically _no_ visuals at this point.

As such, I spent a day adding the essential visuals first. A player, a ball, a pitch, a goal. I identified SHOOTING and SCORING as the most important actions in the game, which is why I already spent time here making them _feel good_. At this point, the game already had particles and animations and what not for those two actions ... and basically no polish anywhere else. And I believe that was a good decision.

Then, the next day, I went back to coding only to add some crucial functionality.

### Curved Shots

These were much harder to get right than I thought, for pretty silly or specific reasons.

At its core, curve is created by simply adding the so-called **"magnus force"** to the ball's velocity each frame. I pick a strength that looks good/realistic and I'm done.

But ...

* At the start of the game, you have NO curve power. Because you have no way to control it.
* Once you unlock controlled shots, however, you can _drag_ as you place your athlete to control shot curve (and power).
* _At the same time_, some set pieces are ALWAYS curved shots (such as corner kicks), while some CAN'T be curved (like throw-ins).
* And so my code had to cleanly make a distinction between these three cases and pick the right values each time.
* _But how do you control "curve"?_ I ended up with a clever trick that worked well enough and feels intuitive.
  * When you drag, the first few pixels are not counted. (This means that if you just click, or accidentally do a _tiny_ drag, it's not registered and nothing weird or surprising happens.)
  * But the direction you choose in those first few moments is saved as the "reference vector" for the curve.
  * The further your drag deviates later (from this initial direction), the stronger the curve.

I'm not sure how useful or practical this will be later in the game. It's much easier to just _foul_ opponents than to curve your shot around them :p But having curved corner kicks, for example, makes the game feel much more alive and interesting, so I had to fully support curving shots anyway.

I also have to show the predicted curve to the player. I realized a very simple shader was enough to _bend_ my arrow sprite left or right as needed. (This is for an arrow sprite that points UP by default. Don't ask my why. Things should be pointing RIGHT by default, that's how I've done it for years, but this one slipped through the cracks.)

```
shader_type canvas_item;

// this is just a constant to prevent extreme bending
uniform float constant = 0.2;
// this is set by the script as it calculates the curve strength each frame
uniform float strength = 0.0;

void fragment() {
	vec2 uv = UV;
	uv.x += constant * strength * sin(uv.y * PI);
	COLOR = texture(TEXTURE, uv);
}
```

### Ball Types

I implemented the framework for different balls: a `Resource` for each ball that knows the frame to display and how to tweak physics properties. One ball is much faster, another earns more money, etcetera. This is quite straightforward code, but it still has to be done!

I actually kind of disregarded the value of this at first, which was a mistake on my end. Adding more ball types is such an easy way to make the game more interesting! When you see a ball that will score double, but it's further away from goal ... will you risk it? Extra choices, extra strategy, but without having to add any more mechanics.

Once I realized that, I made all the types in one go, including their illustrations. I also played around a bit with the ball _sizes_. I just set some random value when I wrote the first lines of code for this project. It was far too large. Making the balls smaller made the game play much more smoothly; I just hadn't thought about doing it yet.

### The Accuracy Problem

This was the very last item on my list of "absolutely must fix this before testing".

One of the important values you can upgrade is your **accuracy**. You start at 0, of course, which means bad shots.

But what does that _mean_? How do we make that _fun_ instead of annoying?

* My first implementation just added a random offset to your target position, and treated _that_ as your target. This was bad because it depended on the scale of the map and the speed of your shots. If you were very close to your target ... the random offset could even end up _behind you_ and you'd shoot backwards for no reason.
* My second implementation rotated the _angle_. It calculates the angle of your shot, then rotates it slightly one way or another. The less accurate you are, the more it _can_ be rotated. This worked well enough, but has a complete **lack of feedback**. You shoot, the ball clearly doesn't go where you aimed, now what? This is _output_ randomness. You see some random error in your shot after already taking it, with no control left. I wanted _input_ randomness instead.
* My third implementation made the player _wiggle_. So, the more inaccurate your player is, the more it rotates in circles beneath your cursor. This wiggle will automatically make it hard to place them exactly where you wanted. This, however, was just confusing and unplayable. Even when I made the random jitter/wiggle very small.
* My fourth implementation added an **accuracy bar**. A marker moves left/right. Click to stop it---the closer you match the center, the more accurate your shot. If you are more accurate, then the extremes of the bar are less bad (even if you completely mistime, it's "only" a small angle deviation), and the marker moves more slowly.

That final attempt ended up having my preference. (All of them are still in the code; you can switch any of them on by changing the `AccuracyType`.)

_You_ are still in control of the accuracy. It's just harder to time it right, to get a favorable value, when your athletes are completely inaccurate. But after you've clicked, the ball goes where you expect it to go, instead of adding some output randomness to it after the fact.

Well then. This took longer than I wanted, but the core of the game is done and completely playable.

_Remark:_ I did start some code to allow faking _height_ in the game. Which would allow kicking balls _over_ other players, for example. But I left it only 80% finished at this moment, because the remaining 20% had no clear answer for how to do it. And I didn't think this was something the game _needed_.

## Upgrades & UI

Now this was the big chunk of work that remained before the game could actually progress. I'd been putting it off for days and days because it never felt more important than getting that core gameplay right. And also because everyone hates UI work.

That's why I basically always design my games to need as little UI as possible. Any status effects can be shown on the players themselves. Any details about the balls, or the pitch, or set pieces, are displayed _on those things_ (in the real game world). Even the score is shown on the field.

But that still leaves stuff like the TIME. And score graphic is so important to the vibe and look of a sports game that it just _has_ to be there (as I talked about before with things like "first half" and "second half" also being added though they serve no purpose). So I added a simple thing at the top that listens to aaaall the signals that things have changed, and updates the value (while doing some simple pop up tween for polish).

The Upgrades view took much more work. 

* I had to code some scenes to visualize each upgrade. (Show clickable image, show info on hover, connect to related upgrades with lines.)
* Then make sure it checked if you _could_ pay for something, if it _should_ be unlocked, and react to any changes.
* And then I had to make aaaaall the `Resource`s holding the upgrades and put them in some sensible list/order.

And of course my brain decided to be funky and make the upgrade tree _ball-shaped_. I split the upgrades into many different paths ("Map", "Balls", "Athletes", etc), each of which is a circle. You can go both ways---each upgrade unlocks the _next_ one---which I thought was unique and interesting.

This was a case of powering through and getting that initial template on the screen. Tests will have to show what a good upgrade order and cost is.

## First Prototype Test, Now For Real

### The Results

One "tweak" that kept happening here was that I made the map smaller ... and smaller ... and smaller :p Again, I'd set some random values for map size when the project started. But every time I tested some feature, I just wanted to be closer to the goal, I wanted distances to shrink, it felt too empty. And so, at the end, the map was much smaller and it felt much more fun and immediate to play.

The downside of this was that the camera had to be _zoomed in_ much more on early levels, which caused a few sprites to become pixelated/blurry. I had to basically "recalibrate" all the sizes of sprites, physics bodies, and more to make more sense. (I wanted to do this anyway because the physics engine likes those sizes more and it should prevent common physics issues like tunneling.)

The good news? **The game works!** Someone tested the game for about an hour. It did not crash, there were no game-breaking bugs, and they played that long because they _wanted_ to.

The bad news is that I wasn't able to 100% finish some systems in time, which meant a large chunk of the game just could not really be tested yet. Additionally, there were some bugs.

* When fouling an opponent, either the opponent or your player sometimes just ... disappeared. It did not return to the bench as it should. But it still _functioned_ fine, so you could still play with an invisible player.
  * _"What was the problem, Tiamo?"_ It's often too technical and not interesting to explain. So I'll only give an example for this one: I had forgotten to check if _injuries were actually enabled_ in all the right places. As such, any foul would immediately injure both parties ... but I hadn't implemented injuries yet ... so stuff went wrong.
* You didn't earn money if the opponent was the last one to touch the ball.
* The upgrades were way too expensive at first; luckily, I could fix this by just changing a number, re-exporting, and continuing the playtest within 3 minutes.
* The "auto-kicker" upgrade is useless until your squad is large enough. (Making 25% of your squad an auto-kicker means you get NO AUTO-KICKERS when you have fewer than 4 athletes, because I rounded down for some reason.)
* If there are NO balls on the field, the auto-targeter freaks out (understandably) because it can't find a target but keeps retrying every frame.
* The scale bounds of the arrow sprite are too generous. (When shooting at max power, the arrow becomes HUGE. When shooting at min power, the arrow is so tiny you can't see it.)
* I should check if the background color is bright or dark, and make text white/black based on that (for maximum constrast / legibility).
* I'd forgotten to _shuffle_ the teams, so your world cup bracket opponents were always just in alphabetical order (Argentina, Austria, ...) :p
* On the smallest ring (of the upgrade screen), balls overlapped, which made it hard to hover / click the right one.
  * Related: I'd accidentally duplicated one upgrade, so when my demo player unlocked it ... it also unlocked the second copy of it further down the tree, ruining progression a little bit.
* The third match was far too easy. Once you have a good chunk of upgrades, I really need to up the difficulty there.
* It's a bit weird when "auto sub" is turned on, and all opponent players just SUB OUT at the same time after X seconds. The quick solution (that's a good idea in any case) is to add some randomness to that timer. Another solution is just to start some on the bench, which I want to do more of in later matches anyway.

And many more tiny things that I'm probably forgetting now. Things that take 30 seconds to fix/change so it would take more time to list them all than it's worth!

### What now?

The main systems the game was missing were ...

* Different ball types (they were supported in code, but no graphics yet / not tested)
* "Status" (Injury, Stamina, Bookings). And, by extension, the Referee.
* More control over the opponents so I can create harder matches for later in the bracket.
  * Example: So far opponents only subbed in to shoot balls. But "smarter" opponents can also sub in on top of a player to tackle them.

I also had two big questions to answer now. I kind of knew that already, but it became more urgent/clear thanks to testing.

* **Auto-Kickers:** it feels weird to make them follow exactly the same rules as the other players. The idea is that you can "place and forget"---they'll clean up balls in the area automatically. So I decided to give them a special status where they don't automatically sub off and are immune to a few things. (I had to completely redo my code for them because my initial auto-kicker script from a week ago was NOT set up for that :p)
* **Substitution Control**: One of the big upgrades later in the game is that you get full control over substitution. You are then 100% free to sub on/off or even reposition people. But how _exactly_ does that work? 

My initial implementation was very restricted. You had to click the player, then click the bench again, and THEN you could sub it on. 

I split it into three separate (smaller/simpler) upgrades and a setting.

* UPGRADE 1: Allows selecting athletes to sub them off manually.
* UPGRADE 2: Allows _repositioning_ athletes. So you can pick one up and move it elsewhere (skipping the bench thing), and it will kick again from that spot.
* UPGRADE 3: Allows _kicking while repositioning_. This is extremely powerful because you can just wave your mouse back and forth and kick all the balls, which is why it's one of the last/most expensive upgrades.
* SETTING: Whether athletes sub off with a single click, or you have to actively click the bench. I made this a setting because there's something to say for either approach. A single click is so easy to do ... that you'll do it accidentally. Moving to bench is a deliberate action that also fits the theme better. So I let the _player_ choose what they want here.

If I had more time, I would have caught such things earlier and wrote the code this way from the start. But this is a special project with a special strict deadline, which is why I had to do some serious brain crunching to rewrite the code for these new mechanics at the core of the game.

### How did that go?

There isn't much interesting to say about this. It was just a batch of work that needed to be done. There's nothing hard about having a `stamina` variable and a `subtract_stamina` function that depletes it while on the field.

The hardest part was _visualizing_ all this to make sure it's clear and fun instead of hard to follow. That's why I quickly set the rule that these status effects are irreversible. Once a player is "incapacitated", that's it, they're not doing anything anymore. No way to come back. The other properties don't matter anymore (e.g. getting injured ON TOP OF being tired means nothing and doesn't need to be shown to the user).

This narrowed it down to giving some animation/particle feedback, and reserving a single space for a clear icon once incapacitated.

Similarly, at this point I just had to power through some 100 icons (upgrades, modes, interface, other stuff). Just like I had to power through adding all those 60 flags and countries in the game. There's just not much interesting or new to discuss there!

And so ...

## A Public Demo

### Itch.io

I wanted to launch a demo as early as possible. At the same time, I launched one much later than I _wanted_ because stuff wasn't done yet. I could "only" give you the first few matches and upgrades, that's fine for a demo, but even among those first upgrades were things that weren't wholly implemented at first.

Additionally, the demo needed to convey that this _would_ be a full game once it launched next month. As such, some more polish (sound effects, more feedback, nice shaders for the important things, etc) was in order.

All said and told, the game basically launched in a state of "95% done, just very much unbalanced and untested". All the content was there; but the next few weeks were needed for finetuning the difficulty, upgrade order, and more. I _hoped_ the demo would give some feedback from strangers in that regard to help out.

**It did not!**

The demo on Itch.io was viewed some hundred times, downloaded a handful of times, and otherwise no response. I tried messing with the description and screenshots a bit---for example, lead with a different statement or hook---but it didn't change much. In the end, a game without a Web build or trailer (yet) just won't attract many people.

{{% remark %}}
The reason for the missing trailer/web build is simply my bad computer. I need to borrow some other computer to do any proper video recording or editing, and I just hadn't been able to get one in time. Yes, my laptop is nearly 15 years old at this point, used 24/7 for all my projects, and was never intended for creative work in the first place. Let's hope it stays alive a little longer until I can buy a new computer.
{{% /remark %}}

It honestly did not really make me doubt or demotivate me. I'd let four different people test the game now, and despite some bugs and missing stuff, they all had a _lot_ of fun. I did not need to explain anything or cut in anywhere. They just played for an hour until they cheered as the beat the second match in the game ( = the final match of the demo).

I knew the game was at least "good enough" to get over the finish line and use as a first Steam release. I also knew an hour was too short and I had to add a little more content and room to grow.

### Intermezzo

I continued to work on it, with the goal of getting the "full demo" (including trailer and stuff) on Steam by the end of the week. That deadline was tough, but doable, and I reached it. Perhaps because I felt the pressure of doing so, because delaying it any more could get me in trouble with my launch date.

Along the way I discovered some new ideas and started to get a feeling for what worked best.

* I tried a little "offside" rule and immediately liked it a lot. Very simple ("can't place anything behind last player of opponent"), but immediately changes how you play in interesting ways.
* Similarly, I added a "Foul Line". Instead of fouls being decided randomly by some probability you can't see, it's much more tangible/immediate to see a _line_ on the screen. Any tackle before it is okay, any tackle after it is a foul by you.
* I moved curving shots to a much earlier spot. It's just such a fun and immediate way to get more varied shots and possibilities. At the same time, I had to add some more "reward" for doing it, because it's harder than straight line shots. That's why I added things like the "curve hit reward" in another branch: scoring a curved shot will add +1 goals.
* Similarly, I moved Stamina back further and further. It's hard to control that if you don't have many of the other upgrades, and at that point it's just annoying and not fun. There are way more interesting upgrades to give to the player earlier. (Besides, booking and injury are already ways to incapacitate the opponent at this early stage.) I considered taking it out completely.

I realized many of my more extravagant ideas would become much simpler (and more effective) if I made them a _button_. So the upgrade tree received an entire branch of "buttons" to unlock, which just stack in the bottom corner of the screen. For example, a pause button, a VAR button that removes yellow cards, etcetera. 

In a game that's entirely about clicking, adding _buttons to click_ turned out to be the obvious addition. Now the player has some special powers basically, but they still need to think about them and act on them in time. Which takes them away from adding players on the field for a second or two. At the same time, the PAUSE became the very first upgrade because I noticed (in playtests) that some players stopped enjoying the game when it became too fast and they could not line up their perfect shot in peace and quiet :p

Anyway, with all that added and changed, the upgrade "tree" (it's 6 circles now) had 150 upgrades, the vast majority unique. That was quite enough if you ask me. Any other ideas were moved to a list of "discarded ideas" and I called the upgrade tree done.

### Steam

When the demo arrived on Steam, I had worked on the project for (nearly) 2 weeks. It was now in a state of **pretty much 100% of content done, still very much unpolished (unbalanced and untested)**.

* All the bracket matches and their properties were defined. (Size of map, how strong opponents are, how they'll act, etcetera)
* All the upgrades were in the game. (Functionality, icon, cost, description, etcetera)
* The general structure was finished. (Start/continue a game, the proper menus, settings, saving/loading, etcetera.)
* The modes were "supported", but not fully functional. (They had an icon, description, and framework for making them work. But I knew the demo would just be the regular mode only, so I left implementing + testing modes for next week.)
* Everything looked "good enough", with the important parts (kicking/scoring) receiving much more love. (But all players still looked the same, for example, because I'd only drawn a single character so far!)
  * In general, I tried to get "diverse looks" into the game early on. This makes for much nicer screenshots and trailers, basically pretending the game has way more variety/depth than it has. That's why I implemented a match played at night with lighting quite early, because it allowed a screenshot that showed "Look! There are so many different things in this game!" It's a cheap trick, but it works.

## So, what now?

I took the weekend off. I strongly felt that I had to switch gears for a bit, and also that I had "done enough" now to ensure the game would be finished in time. I prototyped some more (incremental) game ideas, but didn't do much else.

The next week I,

* Implemented all those different play modes. (I made this a standard feature of my reusable "incremental game"-framework. I _could_ have implemented them more quickly in a hacky-loosey-goosey way, but I decided instead to add a nice API/support for modes that I can reuse in later games.)
* One of the modes enables "special powers" unique to each team. This was a _lot_ of work to get done, but I managed to power through it. (There are 60 countries in the game, and now each has a unique and fitting description, and a small benefit when they play.)
* Spent a LOT of time adding tiny bits of polish and extra visuals, alternated by tweaking numbers and the order of the upgrades all the time.
* Added Steam features (achievements and such).
* Tried to get some marketing going for the game. I uploaded some extra things to YouTube, posted wherever it felt they wouldn't hate me for promotion, scoured the Steam backend for more things to learn / use for marketing / which I might be forgetting.

## A Massive Design Decision

### Not Satisfied

The more I tested this game, though, the more something nagged at me. I have many years of experience making games (and playing them, of course), it's just that I never _fully_ focused on it and made them professionally (unlike now!), which means I am in this weird middle zone of "something doesn't FEEL right, but I don't know WHAT".

I have the senses to identify game design problems and, but not the experience yet to actually identify solutions all the time. And so I'm stuck with this nagging feeling whenever I look at the game or watch someone else playtest it. This gut feeling that something should be improved at the game's core ... but what?

I continued working on that list above, putting all the content in the game and doing what has to be done anyway, while that feeling lingered in the back of my mind.

Until, near the end of the week, the feeling made sense to me. I was finally able to test and finetune the later levels of the game. The final matches where your opponent should be really strong and hard to beat.

And, well, _that_ was certainly true. It felt _impossible_ to beat! When the opponent has 6 Auto-Kickers, and so do I, the game just becomes _messy_. Overwhelming. So much stuff is happening and you don't even know if what you're doing makes sense or not. I could simplify it by making the opponent weaker, giving them fewer Auto-Kickers, and so forth. I did that, and it made the game more "balanced/finetuned", but it didn't actually _solve the problem_.

The problem is that I made a "casual (idle/incremental) game" that requires hardcore strategy and skill (if you want to actually beat the final few matches).

I asked people to test the game, and they _struggled_ (at first) with getting the accuracy of their shots right. They _struggled_ (at first) with the fact they only have 2 players, and once placed they can't do anything anymore. 

I did not identify this as a problem back then because people still enjoyed the game. Because you can go _past_ that challenge, get better at the game, and that's very rewarding. So I definitely don't think the game is broken or that things like "accuracy" must be deleted from the game. It just should not be the default---should not be the first thing you see.

Now, at this point, I had also made the "Chill" mode. No physicality. Everything happens more slowly. You automatically cycle through your players. (If you only have 2 players, after placing them all ... you just get them back immediately and continue placing.)

And guess what? I liked it more than the regular mode! (Well, I like regular mode more in the early matches, and chill mode more on the final matches.)

* You were never "waiting for the match to end", because your players just keep cycling. (There is still a benefit to having more players, though, because it means people stay on the field longer for redirects/defending/etcetera.)
* There was far less time pressure, so you could actually aim your shots and pick your perfect spot. 
* It's less overwhelming or stressful because the opponent is mostly standing still and not returning to the field as quickly.

### Chill = Default

That's when I realized my hyperactive brain had, again, made my life more difficult. By going for the more complicated/convoluted thing first, and walking right past the **much simpler execution of the idea**. Namely,

* Place players on the field until time runs out. You automatically cycle through them.
* The opponent is standing on the field, sure, but otherwise does nothing. They have no auto-kickers and players that sub back on don't do so with a vengeance ( = kicking a ball)
* Physicality is still enabled through later upgrades, but ...
  * In a way only _you_ can use. (So _you_ can shove opponents out of the way, but you're not shoved around _by them_.)
  * And with emphasis on set pieces (Free Kick/Penalty Kick) to help you. (A free kick clears the area around it so you have a "free shot".)

I just ... I don't know man. My brain always does this. WHY does it initially believe that opponents need to be able to sub back in, score goals, be "intelligent", etcetera? WHY can't it just create the game without opponents (or with dumb/static ones) first!? I would've seen that it works just fine and saved myself a lot of work. I _know_ this, yet my brain keeps doing it wrong :p

I made these changes. It, unfortunately, took an entire day to allow turning on/off certain core systems through mode/upgrades, and implementing the new toggles to make opponents "passive". It took so long because I kept finding new issues and new problems to solve.

* My targeting system assumed a BALL or PLAYER. I had to rewrite it to allow subbing a player back in at any position. (A "fake" target essentially, because it's just an empty spot on the map.)
* I had to debug something for an HOUR before I found the incredibly tiny silly thing that made opponents SOMETIMES behave erratically. (Long story short: opponents that started on the bench, instead of the map, did not have the right "starting position" set ... so trying to sub back into your non-existent starting position will cause issues.)
* Because of this new clarity/simplicity, I suddenly saw that Auto-Kickers had been slightly bugged all along. Because their body was still turned on, they'd sometimes kick a ball away by running into it (instead of always auto-kicking towards goal). I simply turned off their bodies entirely, which I should've done at the start anyway.
* Because I'm testing bigger maps now, I saw that the UI was occluding some parts of the map and had to adjust camera/edge safety margins.
* Because Auto-Kickers are nerfed now, having 100% of your team be an Auto-Kicker is actually not great. You'd be unable to do certain things in the final match. So I made sure you always have at least one normal player.
* Now that we've removed some upgrades, money is lagging behind a bit. Then I realized the obvious solution I'd been forgetting: **reward the player for beating the opponent!** When you advanced in the bracket, winning against that specific opponent for the first time, you get a one-time high currency reward as an extra bonus. This should help buy a few more upgrades immediately before continuing.

Because you're now _cycling_ through your team, though, it's easy to find a dominant strategy.

* Just kick away all opponents when the match starts. Tada, empty field, you're free to kick balls straight at goal!
* Even if that fails, you get your players back instantly anyway, so who cares about aiming?

I had to write a new system (`Walker`) to ...

* Make opponents walk back onto the field if you kicked them off. This makes sense anyway. You get the benefit of them being gone for a bit, but they slowly return to where they stood in the field.
* Make your players walk slowly to the bench, instead of resetting instantly. This way you're still rewarded for being efficient, because you have to wait a few seconds before players are available again. It also makes more sense to players, as opposed to instantly teleporting away and a player wondering "where did my players go!?" As I said: should've done this at the start.

### Killing My Darlings

Finally, many upgrades just did not make sense anymore in the new system. Most of all, I could see now how the upgrades were pretty useless because you simply don't have much time/space/opportunities to use it in this game. For example,

* **Full Sub Control**: this upgrade stopped autoselecting players, so you could decide yourself which one to place. In practice, however, this made the code convoluted + made you much slower, while it really doesn't matter who you place 90% of the time. So it went away!
  * Something that **was** fun, though, was my final upgrade that enables kicking while you're still positioning the player. So, in a sense, you just move your mouse and balls magically fly towards the goal :p That was a really fun final upgrade that I wanted to keep, even if it required completely rewriting the code because the old implementation was messy.
  * In general, I realized any more advanced control just makes supporting keyboard/controller near impossible and ruins the core simplicity of the game. So I cut it all out and reduced it to just clicking.
* **Curve**: while fun, it also makes it much harder to predict where shots will go. That's why I moved it to a later (more "optional") stage, and removed it entirely from the harder modes.
* **Power/curve control**: there is rarely a reason to NOT shoot at full power, just as there's rarely a reason to be very precise with your curve. This control would've been nice in my other soccer game ideas, but not in this one anymore.
* **Auto-Kicker Kicks Athletes**: now that the opponents are passive, this is overpowered. (Like before, your auto-kickers just kick the opponents off the field and now the game is easy and boring.) So I moved it from very early to very late.
* **Max Balls Per Kick**: The maximum balls that you can kick at once (when placing a player) starts at 2. Upgrades allow you to raise this number. It seemed useful when I started the project, but now it's just confusing new players (why is it not seeing that third ball!?), while it feels like probably the weakest upgrade in the entire tree. So I just removed it entirely. (Your maximum is some high number by default that should cover everything.)

### Athlete Types

Finally finally, I added a few different **types of athletes**. I'd been working towards this anyway when I designed the opponent behavior. I wanted some opponents in harder matches to just be a "defender/brick wall"---to stand in the way, unmovable. This felt like the strongest way to keep the game simple to read while making it harder to win. Well, once I'd built the system to support unique athletes/players, I had a few more ideas that seemed to make sense. Such as a player ("Striker") that always aims at goal.

I liked these additions so much that I moved them forward quite a bit in the tree, including half of them in the free demo. The hardest part was writing a nice system for controlling _how often_ they spawn. 

* These unique types do not work together with Auto-Kickers. (Example: the brick wall can't move -> the entire idea of the Auto-Kicker is to move -> error can't combine!) Those should always be a regular type.
* And so we _can't_ make an upgrade that says "adds 1 athlete of that type", because maybe you don't even have space for it with all your auto-kickers.
* Instead, the upgrade should actually mean something like "we try to add at least 1, more if possible".



### Once All Is Said And Done

To be honest, it's _hard_. To build something, and then to have to destroy and rebuild it again because it's just not working/not fun/not what you'd hoped. It takes a lot of discipline and positive thinking to keep trying and iterating. To keep "finding the fun", when the coding and debugging has stopped being fun for you hours ago :p

But at the end of this loooong day, I could look at a game that was MUCH simpler and more streamlined. One that wasn't completely messy in the latest matches, but also still interesting on your first play.

At the same time, I was _tired_. You just don't know. You never know if something is the right difficulty and if it's fun for new players, no matter how much you test it yourself or how many things you try.

So I finished the demo content and then granted myself some leave from this project, letting others test it and decide if it's an improvement.

## Am I So Unoriginal!?

At the start of this week, though, something stupid happened. 

**I discovered someone else was making a similar game.** 

An idle game about scoring goals to earn money and upgrade your ball/goal/player. 

They beat me to it by only a few weeks, which is also why I did not find them yet when I did market research a few weeks ago. If I had found them then, I would not have made this idea probably, but picked something else!

Fortunately, their game took the same core idea in a different direction. Completely different core loop, art style, execution, etcetera. I sent them a friendly message about maybe bundling or collaborating later and continued to develop my game, making it "as different as possible" from the other one.

{{% remark %}}
A moment like this is always a gut punch at first. For like 20 minutes you hate your life and you wonder why this always happens to you and you want to give up on making games because it's all been done before. But then, once you calm down, maybe sleep on it one night, you're like "eh, so what?" Why would it matter? Even if my game was eerily similar and did not succeed because of that, I would still have made and finished a game. My first Steam game. Still a massive accomplishment, still worth something.

Additionally, I, erm, accidentally turned it into a marketing moment? By sending that message I suddenly saw a huge influx of players checking out my game. I had only linked it as an afterthought, to show how similar but also how different our games were. The Steam demo wasn't even out yet, so it was just a basic page on Itch. But it suddenly had way more views and downloads.
{{% /remark %}}

In hindsight, I think I actually spent **most time on the UI/UX front** this week. Adding feedback to loads of different things. Adding extra icons to remove any ambiguity. Adding full mouse, keyboard, touchscreen, and controller support.

The more I played, and the more I watched others play, the more I realized how blind you are to such things. I'll give an example that I think is easy to understand and might teach you a lot.

* In games like these, you want a "Finish Attempt (Early)" button. It's no fun waiting until a match is done when you can't place any players anymore, for example.
* So, I made a big red "X" button (in the top right), because that's the universal sign for cancel/stop/finish.
* Buuuuuut people assumed it meant **exit the game** or **destroy your progress** or whatever! So they never clicked it. They waited 3--5 seconds each time for the match to end.
* So I added some feedback saying "click this to end early" that appears if the tutorial is enabled.
* And I made the button flash/animate a bit when the game detects you're out of players. (When it queues an "early end".)
* And I put some permanent text below it reinforcing what the button does when you click it.

These are two small changes (takes 2 minutes) I **should have done at the start**. This feedback isn't just great for players, it also would have been great for me as I _developed_ the feature for the first time. 

(I'm planning on writing an in-depth article about this. More and more, I actually lean towards "early polish" of your games in the sense of creating visual feedback immediately when you create a feature. Because you're going to need that anyway, and it makes developing much easier. The time you "lose" on creating nice feedback for a feature you end up cutting out of the game is _not_ a strong argument against this.)

But now, when I let people test the game, they don't misunderstand the button and they don't waste 3 seconds waiting for the match to end. Which means the game has a much nicer start, a lower hurdle, and more fun. Just by being less ambiguous with one part of the UI/UX.

I made hundreds of tiny changes like that over the course of the week. They add up to a much much nicer experience as a whole. On future projects, as stated, I'll do this kind of UI/feedback work immediately after coding something.

At the same time, my mind was still thinking about that similar game to mine all the time. I wondered if I could _pivot_ my idea slightly still. I wondered if I could make one more turn to really set my game apart.

I looked back at my initial idea of making an incremental game about _taking penalties_. And I thought: I have all the art and code already. I've established the "Super Sub"-look and idea. _Maybe I can make that other idea too? I can PROTOTYPE it at least._

As such, the other 50% of work I did this week was on "Super Sub: Penalty Club". I had to move the game to 3D (2.5D really) and write a different kind of upgrade tree, but a lot of the other work I'd done carried over just fine. 

Normally I wouldn't advise switching to new ideas/prototypes like that. But in this case my game was 95% content complete, and I thought taking a break (from working on the same game 8 hours a day, every day) was worth more than neatly sticking to one project.

By the end of this week, 

* _Super Sub: World Cup_ had a Steam + Itch page, a pretty generous demo, and some initial traction (mostly by accident :p). It lacked some visual polish, but mostly lacked balancing/finetuning of the late game/later matches.
* _Super Sub: Penalty Club_ had a completely functional core game that was just as fun to play. It lacked a LOT of polish and content, of course, but was otherwise playable and testable.

## The Final Stretch

All developers know this is the hardest part. So many tiny things left to do. So many small bugs that pop up. So many tweaks in the hopes of getting that difficulty or that initial experience (by a new player) _just right_.

At the same time, you can't power through anymore, there is no "big next system to implement tomorrow". You have to take a lot of breaks, let your mind wander, find creative solutions to that one tiny problem, and make those tiny tweaks once in a while.

That's why I decided to pursue this second Penalty Club idea for just a few days. To at least take some steps to turn it into a publishable game as well; to let it fill the gaps in which I couldn't figure out what to do with _World Cup_. It gave me ~5 days off from the main project and gave me some new insights too.

After 5 days away from this project,

* **The page + demo were accepted by Steam!** This meant I could finally set it all live, link to it, start some marketing. (No issues were encountered, no revisions needed, but it did take _a long time_. Long enough to make me readjust my planning and deadlines. I always have this same "problem". I take great care to deliver a finished product and follow a platform's rules, so I've never _not_ been accepted on the first try, but it does mean I lose a lot of time in those stages.)
* I could look at the game with fresh eyes and **immediately see which parts had to be cut** and which parts were more important. (It's always interesting how much "clarity" some time away from a project gives. At the time, you write down all these ideas and doubts ... but a week later you read them back and you're like "nah this idea would definitely overcomplicate the game, scrap it")
* I was able to get **playtests outside of my close circles**. (I upgraded from "family" to "friends" :p) This revealed some pretty big things to change.

The final part of this devlog will be entirely about that playtest and the massive changes it led to. At this point the game was 100% content complete, even including UI stuff like controller/gamepad button hints, it was just unbalanced and in the wrong order.

## A Super Important Playtest

My family is, of course, used to testing my games. Used to _me_ and a bit _like me_. And so, early playtests with family members did not reveal glaring issues that became apparant when someone else tested one of my games for the first time ever.

A friend of mine played the game for ~30 minutes before she was like "this is the moment I'd give up because the game is too hard". And I fully understood, having watched her play.

Below are my (mostly unedited) notes about this playtest.

### The First Match

Make it winnable on first or second try. Give players a nice feeling immediately and let them progress. What does this mean specifically?

* **Reframe as "friendly/practice match"**. In the description and general setup, make this a tutorial level _without actually saying it is_.
* **Disable accuracy.** Makes it too hard now. It's a great mechanic, but it should only appear at like the 3rd match. (Add an `accuracy_enabled` toggle on matches, move any accuracy upgrades further down the tree.)
* **Remove the opponent.** Again, it's hard enough without them.
* **A more generous timer.** The very short timer is a leftover from how the game used to work weeks ago. It can be much longer now. Also,
  * Already show match duration in pre-game. (Showing `00:00` before the game starts confuses players; they think they're already out of time)
  * Have a **countdown** (3..2..1..) before ending. Otherwise it's very sudden.
  * _I ended up giving the first match a very long clock, just to introduce the aspect but remove any time pressure. The clock SHORTENS for the second match again, at which point I also introduce upgrades to combat this._

This also means that the **difficulty of all later matches should be compressed**. Example: game 1 had 1 opponent, game 2 had 2 opponents, etcetera. Just shift that down by one: game 1 has 0 opponents, game 2 has 1, etcetera. 

When I started this game, it was just a vague idea for an "incremental football game". After weeks of development, as usual, I can finally see what I've actually made: a very casual football + tactics/puzzle game. That kind of game, for that audience, simply needs to be much simpler. You need to win that first match waaay more easily.

That's why the difficulty across all matches was lowered tremendously. Fields became smaller. Even fewer players on the field. And this is actually a very good thing, because I mentioned before how I _struggled_ to find ways to "make it harder" near the finals (that weren't just "make the field so big it's overwhelming"). With the new difficulty balancing, we get a much nicer curve to the final match for free.

Earning money was also a bit too slow at first. I considered lowering prices, but after these changes to make the match _much easier_, you're obviously scoring more goals and your income became pretty balanced again.

### UI & Navigation

Always some tiny things that can suddenly make or break an experience.

* **Save Slots:** only show them if full and you have to pick. Otherwise this is a needless step when starting a new game. (Specifically in code: _if not all save slots full, immediately select an empty one and continue on this screen_)
* **Modes:** similarly, I can hide the mode selection at the start. Another step that slows you down, while the differences don't mean anything to you yet. (Specifically in code: _if no save slot used, assume it's a new player and don't show mode selection_)
* **Game Over:** change `Buy Upgrades (xx)` to `Buy Upgrades (xx available)`. Otherwise the number can be misconstrued as other things (e.g. the money you have).
  * Additionally, if you CAN buy upgrades, select THIS button by default instead of start next match.
* **Upgrades:** allow navigation left/right/up/down by simply moving your mouse near the edge. (I don't know how I didn't think about this. I played _Age of Empires_ a lot as a kid and am very familiar with that kind of map navigation :p)
  * Some upgrades were a bit "wordy". For example: _"Raises the minimum and maximum number of balls on the field by +3."_ Could just be _"Adds +3 balls."_ Not exactly the same, but close enough and worth the conciseness.
  * Similarly, the explanation for Auto-Kickers was so wordy that players assume it's something complicated/bad and don't use it. While Auto-Kickers are actually _great_ and necessary to beat later matches!
* **Scoreboard:** this entire scoreboard can just be BIGGER. It would also make it easier for players to notice the time or first half/second half.

### Miscellaneous

There were two things I couldn't quite place at first.

**Auto-Kickers need more explanation?** I mean, they literally just kick the closest ball automatically. There's nothing else going on. All their upgrades and iconography shows the same clear _gear icon_. But apparently it wasn't as clear as I thought! 

* First instinct is always to "explain it". Add more text. Add a tutorial pop-up with "Look! An Auto-Kicker! It works like bla bla"
* But what's _actually_ the problem and solution here? The problem was that the player was already overwhelmed by the difficulty of the first match and the many options, and now "another type of player" was added as well! The concept is simple and clear, it just needs to be introduced at a _better moment_ ("in a better way").
* I _moved_ this upgrade path back so you'd unlock it roughly at the same time that you encounter a computer opponent that auto-kicks. So you've seen it before, you've already been playing for a bit, and then the idea should feel more natural.

**It's not "realistic" for players to just stand still.** Some players see this as a bad thing, a weird/annoying thing. At the same time, everyone that's tested the game realizes after a few attempts that this is part of the puzzle. They discover they shouldn't block their own shots with their own teammates, and that gives some satisfaction. This is a _core part_ of the game. It's why it's called "Super Sub": players don't move, all you do is sub them on or off.

* I _could_ change players to slowly walk around. Have them do "intelligent/realistic" things for you. But the more I thought about it, the more I realized this is what Auto-Kickers already do! I just need to make players _understand that's what they do_.
* As such, I decided _not_ to change this core aspect of the game. With the easier / less overwhelming first matches, this "realization" that players are static and to work around it comes much more quickly.
* Instead, Auto-Kickers were rebranded to "Moving Players" (and regular players are "Static"). I hoped this makes players immediately realize their value (and not sound too technical/complicated, which Auto-Kicker kinda does).

Also, final thoughts: **add customization through hats** :p I'd literally written it down that morning ("Maybe it would be fun if the players wore HATS, and it would help differentiate them even more?") So to hear players suggest it on their own convinced me that it was worth pursuing.

## Almost Ready To Launch

Okay, so this is the thing about being an experienced programmer and about playtests. Making _all_ the changes I listed above ... only took an hour or two. It's just turning things on or off, tweaking a single number that I know where to find, reordering a list of upgrades through Godot's inspector. After all these years, I make an effort to write clean and most of all _flexible_ code, because you clearly never know what's gonna happen to the game's core systems!

But without some playtests, without friends/strangers telling you "this is too hard", I would not know _what_ tweaks to do. I would not do it.

Tweaking the game "blindly" is what actually takes up time. That's why, in my eyes, it's basically always worth the effort to organize a playtest. The hours you "lose" on making the build playable, preparing it, perhaps inviting people or moving to their place, are definitely _won_ by not wasting days on tweaking numbers without really knowing if you're making the game better.

When playtests give you a clear direction, it should really only take a few hours to make massive changes that _will_ make the game better.

That's why these final days until launch I didn't actually "work" on the game a lot anymore. Sure, there were always some small things to fix or improve. But I was mostly just waiting until I could let someone test it again. Then, after the test, I could make clear improvements for a few hours and achieve a lot in little time.

At this point, of course, I'm also a bit tired and done with the game. This always happens. It's basically the signal to wrap it up and release the game. (If you're _not_ sick of it, _then_ you haven't worked on it long enough :p I'm kidding, I'm kidding, please take care of yourself.)

Working more will not make the game any better at this point. Cramming in more features or outlandish ideas that sound cool at the moment ... also won't make the game any better (or more stable) at this point.

In the end I was able to do ~5 playtests in this period. All of them showed ways to simplify, to finetune difficulty, to overcome some snags in the UI. I'm sure I could've continued doing playtests for months and keep finding things.

But the deadline had arrived! And Steam takes a while to review builds. So I had to already upload the build more than a week in advance.

## But How Do You Balance A Game?

In this devlog I've spoken about balancing/finetuning the game and its difficulty several times. But what _exactly_ does that mean? How do we do that?

I didn't really explain this before ... because I don't know. With every game made I learn some more tricks, and working on this single game for many weeks also gave me new insight, but there's no one formula. Balancing your game for optimal flow/challenge/fun is basically the million dollar question every dev hopes to answer ... someday.

For this game, and in general, I think balancing comes in two parts.

* Is it **possible** to do this/beat this mission/reach this objective?
* Is it **doable** for the average player to actually go on this journey?

**That first question** is a bit easier to answer, so that's where I started. I wrote a simple debug tool to read all the values within a match. (Player kick power, movement speed, body size, ball regrowth rate, player stamina, etcetera etcetera.) 

This allowed me to check, for example, **if players have enough stamina to survive the match**. It wouldn't be any fun if you can just wait 10 seconds for the opponents to all drop dead, and then score easy goals for the rest of the match. Or, conversely, for _you_ to only get 5 seconds before your players are exhausted. Their values had to actually make it _possible_ to play the different matches.

{{% remark %}}
More specifically, the opponent's stamina value is always about 2/3 of the total match length. This means that players that STARTED on the field will be gone near the end of the match, so they're not a permanent obstacle and you have an advantage from stamina drain. But it also means that the opponent will stay active long enough to deliver a challenging match.

This actually solved a long-standing problem I had with "Brick Walls". If they really never leave the field, then stuff like incapacitating the opponent or offside become meaningless. There has to be SOME way for them to move or die, and this turned out to be a perfect, organic reason.
{{% /remark %}}

Another fun metric I implemented was **field coverage**. I calculate the kick/sight area around all players (yours and opponents) and compare it to the total map area. I found that a value between `0.5` and `1.0` worked best. So I balanced it to be around `0.75` for most matches. It means that, when _all_ players are on the field, about 75% of the space is covered. It means it's not overcrowded (there's literally no more space to place people without tackling!); it also means the field doesn't feel empty with massive gaps where nothing happens.

**The second question** is much harder to answer. What is "doable"? What is "just challenging enough"? What is "practically feasible"?

Numbers don't mean much here. It's about the game "in practice". The game "as played by someone". So ... for this I implemented the **AutoPlayer(Bot)**! A little script I can turn on, which

* On a random timer ...
* Places the next player ...
* Near a random ball ...

Just like a real player! It interfaces with the game exactly how a real player would, no trickery or cheats.

That's it. Only ~10 lines of code were needed to create a bot that automatically plays the game. Now of course, their play is not very smart. It's pretty random. It scores some own goals. It shoots balls that have no chance of getting near the goal. It's a "very casual player", if you want. So, what do its match results mean? 

* First I enable a "low number of upgrades". For example, for the 3rd match, I only unlock the first 10% of upgrades. If AutoBot can win the match like this, it's **too easy**!
* Then I enable the "right number of upgrades". The number of upgrades that should definitely allow beating this match. If AutoBot can not win, it's **too hard**!

I basically start the match, go work on something else, then check the AutoBot results and adjust. For each match, I searched for a configuration where AutoBot barely loses normally, but can easily win (about double the opponent's score) once it has enough upgrades. 

Because this means a _smart/active player_ can still win the match with few upgrades (by playing less dumb than the AutoBut), and it also means a _casual/unlucky player_ will definitely beat the match once they've upgraded a bit further.

In most cases, I could immediately identify a big gap between player and opponent. For example, the player's kick speed was only 150%, while the opponent was set to 250%. By smoothing over these discrepancies, the match automatically became more "balanced".

With that said, this is just one way to balance a game. It's my first time trying this. I really like getting objective results from an automatic player. It's easy to work with, much easier than ... playing the game yourself over and over and blindly tweaking values. 

At the same time, it's always uncertain whether this transfers to a _real player_. A smarter player. One with more strategy than just "place player in random position every second" :p By making AutoBot this _dumb_, you'd hope that real players have an easier time beating a match with a simple/different strategy. My first playtests after these changes were promising, but I'll need waaaay more experience with this to make any definitive statements.


### Lesson Learned: Achievements

I left integration of Steam Achievements for pretty much the last second. This is ... _fine_. I guess it's better than implementing them when you barely have a game yet and they'll probably change.

But I also discovered that it was a missed opportunity. Condensing the game into ~30 achievements, as diverse/broad as possible (appealing to a wide range of players, play styles, milestones in the game), really made me rethink the entire game and what I actually thought of it.

If I'd considered this earlier, it would have helped shape the direction and finetuning of the game much earlier. In a good way. I would've had specific milestones to actually _put into the game_ (at a specific point/difficulty level).

Additionally, I came to the realization that the Achievements are actually great analytics tools. That's also how I ended up using them for the most part. (I did make sure to add in some goofball achievements to shake things up.)

* I added achievements for completing _modes_.
* I added achievements for _reaching specific matches ("parts of the bracket")._
* I added achievements for _completing upgrade branches_.

Hopefully, once the game releases, there are enough players to create some nice statistics on this. I'd be able to see which modes are played the most, or which match is too hard and makes players stop playing, etcetera. It was a nice realization and extra motivation to put serious effort into these achievements.

## A Finished Game

And then it was time to submit the final build and call it done.

I obviously would have liked to test it much more and finetune the balance and all the upgrades further. I would have liked to implement things like crowds/stands, or a local multiplayer mode, or fancier graphics. I wanted to add more nice features to my "idle/incremental framework", such as great flexible support for controllers (which would also help Steamdeck support).

But time had run out---as well as my energy/motivation---and I had to call it quits here. I couldn't stand to look at the game anymore or work on it any further. Any improvements to the framework would have to be made on the _next_ game made that uses it.

{{% remark %}}
In case you haven't read any of my other articles, the problem is basically that it's very very hard for me to feel motivation or joy at all. I can only muster the discipline to work on projects for a week or two, through hard work and good habits, before that's completely drained and I'm just completely disinterested in the project. 

I would like things to be different, but they're simply not. I simply have a pretty clear expiration date on all my projects (and my health) and I _try_ to adjust a game's scope to match that. But we all know how hard scoping a game is ...
{{% /remark %}}

Maybe one day this changes. Maybe I'll return to this specific game for big updates. The code is certainly clean and simple enough that I can easily tweak anything or add new stuff---that's not the problem. 

But this is my tiny, spontaneous, _first Steam game_! I don't expect it to sell very well or have amazing sales/reviews. I gave it my all for a few weeks, and that's all I can do.

This devlog has been about the game's _development_. And that development is now basically complete, so the article ends here! Sure, there are more playtests, more feedback, some tiny fixes I did after this point---but nothing major anymore.

The _results_ of the release, and any lessons learned about Steam, are part of a different article: [Journey To A First Steam Game](https://pandaqi.com/blog/news-and-updates/2026/journey-to-a-first-steam-game/)

I hope this shows all the troubles and phases when making a game. And that it was, at least, instructive or funny to read.

Until the next devlog,

Pandaqi

