---
draft: true
title: "Skyscraper Sun"
tags: ["devlog", "technical devlog", "Phaser"]
thumbnail_media: todo.png
date: 2022-10-30 14:00:00
emoji: "🏨"
---

Welcome to the devlog for "Skyscraper Sun". It is part of my series where I try to create many (many) hypercasual games, to practice finishing games and learn more about that part of game design.

You can read the whole series here: [How to design Hypercasual Games](/blog/tutorials/how-to-design-hypercasual-games/). It summarizes each game, what I've learned, general tips for hypercasual games, and so forth.

These are simple games, so let's jump right into the interesting stuff.

## What's the idea?

It's flappy bird. But you don't control the bird, you control the obstacles.

More specifically:

* The bird---let's call it our HERO from now on---floats around randomly (controlled by game)
* The obstacles are skyscrapers that grow from the bottom of the screen.

When you _tap_ the screen, the skyscraper stops growing. Obviously, you want to stop the skyscraper before it blocks our hero. If you hit a skyscraper from the side, you lose. Get as far as possible.

## Immediate problems

Ideas like this look nice on paper. Within an hour of creating the prototype, you will run into the _actual_ issues :p

### More strategic tapping 

**Issue:** these rules, it's clearly the best option to just _immediately tap the screen_ and stop the skyscraper. Keep them tiny! Easy game!

**Solution:** you are rewarded for stopping the skyscraper as _close as possible_ to the player. Normally, you get one point for passing a skyscraper. If you get closer, you get more points. Additionally, passing close by might give a beneficial powerup (and being far away a bad powerup).

### Building creation

**Issue:** placement. When do I add a new skyscraper? Do I want _two_ (or more) growing at the same time? That's probably too hard.

**Solution:** add a new skyscraper when the previously added one has stopped growing. This solves multiple issues actually. If you insta-tap the screen each time, you will constantly create new skyscrapers, so it's not a good strategy anymore.

### Randomness

**Issue:** our hero moves randomly. Even though it only switches direction once in a while, this makes the game unplayable. You never know where the hero will be in 1-3 seconds, so you can't stop skyscrapers at the right time.

**Solution**: give this information to players!

* Show an arrow with our current direction.
* Show a (more faded) arrow with our next planned direction.

The arrow slowls fills up (like a progress bar) to also indicate the timing of this change.

### Bounds

**Issue:** our hero shouldn't move out of bounds.

**Solution:** at first, I just checked if it was too far from the starting position. If so, move back to the starting position.

But this is unpredictable. It means that our "arrows" are sometimes incorrect, because the hero suddenly changes.

Instead, 

* I draw the bounds on screen. But they only become visible when the hero gets close. (Otherwise they are just visual noise that doesn't need to be there.)
* I check ahead to see if the hero will hit the boundary soon. If so, I already calculate and show the direction after that.

## No, let's simplify

At first, the player was positioned all the way to the left of the screen. It took a while for buildings to get there. To compensate, I made our hero float _very slowly_. Both choices were wrong.

It's more interesting and predictable if the hero is in the center of the screen and moves quite fast. This actually makes it _easier_ to see where it is heading. (And easier to match building height, as they reach the player much earlier.)

Additionally, now that the hero moves fast, the whole "change direction on a timer" system can go away. It simply changes direction when it reaches its bounds, period.

This game is already _hard_. The current version feels like it is the _end game_, when you are nearing maximum score. So let's build to that and simplify the start. Let's build **progression** over time (based on score).

The map progresses:

* At the start, you only get skyscrapers from below
* After some time, they can also come from below
* After some time, they can be doubled ( = both directions at the same time)

The buildings progress:

* They are wider. (This was perhaps the biggest issue that made it hard: due to buildings being very wide, they had the possibility to hit the player _for a long time_.)
* They grow faster
* They move (from right to left) faster

These two are linked. Because, if buildings just move faster, without growing faster ... you never even need to tap. By the time the building has a large size, it's already off screen. 

As such, these are relative to each other, so that **a building will always reach (2/3) of its height when near the center of the screen**.

The hero progresses:

* At first, they only move vertically (up and down)
* Over time, their bounding box grows and they start to move horizontally
* At first, they bounce in a "realistic" way. (Instead of picking a random new direction, they just bounce following the laws of physics.)
* They move faster over time
* (They might shrink/grow, or have other status changes, but that's uncertain right now.)

Their "random speed" code was simply removed. It made the game too hard, without clear benefits. Now, the player speed is related to the building growth speed (as that's what you're trying to match!), and has no randomness to it.

## Does this work?

Yes, it's simplified. But now it's too easy. At the start, you can just tap immediately and you should be fine. That remains an issue: if you do the exact same ("dumb") strategy, you will be fine.

Possible solutions:

* Give 0 points if the skyscraper is just too far away
* Add skyscrapers that cause you to lose if you tap them. (You need to let them go instead. That automatically marks a nice "pause" in the gameplay.) => Best idea is to _start_ those skyscrapers high/long, and shrink over time, so you need to "let them shrink"
* Add other skyscrapers that might make you hesitate on taps. But I don't like that, it's note a solution to the core of the problem.
* Actually, it's easier if the hero only moves HORIZONTALLY, and vertical movement comes later.

When playing, I feel like I want _some_ control over the hero anyway. So maybe that's the best solution: if you allow skyscrapers to get close, you get powerups that help control the hero and simplify your life.

I added all these ideas. And yes, they make a difference. But no, it still feels like an improvement to the _core_ gameplay is needed.

## Killing my darlings

In the end, the "random movement inside a box" just didn't mesh with the rest of the games. I actually like the system/feedback I wrote for it and will try it in another game.

But this game needs a very predictable way for our hero to move.

And that's when I read the project title again: _skyscraper sun_. What if our hero is _the sun_? And it moves in a predictable arc through the sky? (From sunrise to sunset.)

We could explain the game like "the sun doesn't like being hidden behind tall skyscrapers!"

I rewrote the movement code to be modular. (So I could plug in any "module" for the player movement. This way, I could keep the old system completely, and just swap it with a new one.)

And yes, this new system is far superior.

* It's much easier to predict where the hero will be, and play accordingly.
* Because they move in an arc, the difficulty automatically varies. Near the end of the arc, the player is also near the edge of the screen, giving you very little reaction time. Halfway the arc, they are near the top of the screen, making skyscrapers coming from above more relevant (temporarily).

I also added an extra rule I thought was nice: while _holding down_ your touch/mouse, the player freezes and building growth speeds up. The game remains one-button, but now you can have strategy and control. (This also solved an issue with buildings being _impossible_ to dodge)

This also led to a clear theme/art style. You are a sun. But when your arc ends,

* You turn into a moon
* The whole arena turns to night
* And you move back (do the same arc in reverse). 

This is a loop that can endlessly continue.

## Side systems

### Physics

I don't need physics :p Now that I know the requirements and end goal for the game, I know that I only need _one_ simple check: "does the player overlap a building?"

Enabling physics is overkill. Also, Phaser's Arcade physics only allow rectangle-to-rectangle overlaps.

Instead, I wrote some simple code to make the player a **circle** (as, you know, the sun is a circle) and check overlap myself. (Keeping the player a rectangle felt off, as you'd often die while you _thought_ you barely missed a building.)

_What is that code?_ Check the closest distance from the player to each edge of the rectangle. If lower than the player radius, overlap. Otherwise not. Repeat for all buildings.

@TODO: ACTUAL CODE HERE?

### Making it all possible

Currently, there might be impossible situations in the game. Even with "perfect play", you have literally 0 chance to make it out alive. 

I want to prevent that.

I wrote some code that estimates how a building can spawn without being _impossible_. Buildings can grow and change in many different ways and speeds. Same for the player. So I wrote a general, somewhat brute-force algorithm for this.

* Calculate the next X positions for the player. (Say, 60-120 frames ahead.)
* Try several different starting heights for our new building. For each of those, also plot the next X positions.
* Every height that leads to a collision with player, even with perfect play ( = the player holds the screen to shrink the building at max speed), is discarded.
* Pick one of the remaining heights.

This also reveals why I wanted my own physics function. I can simply call that to check overlap between these "imaginary predicted points". I don't need trickery to pause the game, move physics bodies, then move them back, or whatever.

Any time I create a system like this, I doubt myself. "If I need this much thought and effort to make a game idea work, isn't it simply a bad idea?" I was on the brink of just stopping this whole project.

But I figured the game is so simple and small, I might as well finish it anyway. And, in the end, this system ended up being a very minor thing. (Just ~50 lines of code in total.)

### Windows in skyscrapers

This is a crucial part to make the game look and feel right. So I wanted to implement it early on.

Windows are a **fixed size**. To make it look consistent _and_ make implementation easier.

Whenever a building resizes, it checks the width and height. (Currently buildings only change in height, but I have some ideas for buildings that grow in width. So I wanted to generalize this already.)

It divides that by the fixed window size to see how many would fit. Round it down. Add offset to the edges to _center_ these windows. Then draw a little sprite for each of them, filling the building with a grid.

I knew this would mean _constantly_ recalculating and shuffling windows. So I made a _window pool_ with 50 windows at the start and it simply draws from that. (Much cheaper than instantiating + destroying hundreds of windows all the time.)

@TODO: IMAGE/VIDEO?

Also, because buildings constantly grow, the windows would constantly reposition. Which looked very distracting.

Instead, I anchored them to the bottom of the building, so they don't reposition anymore. It only adds more windows (or removes some) to match the new size. I also created a few variations and made sure they don't overlap the building _type_ icon. Which was also anchored at the bottom, as that was visually the cleanest for this game.

{{% remark %}}
I also learned _a lot_ about Phaser and its Rectangles :p I was using the basic `.width` and `.height` properties for scaling the buildings. Turns out that was completely wrong and not what you're supposed to do. I had to switch _everything_ to `.displayWidth` and `.displayHeight`. 

It was a lot of annoying work. But it did fix many annoying issues I was having ... because I used Phaser wrong.
{{% /remark %}}

### Multiplayer

This idea didn't have the strongest "multiplayer" setup. That's why I call it more of a side system :p (In fact, when I started development, I thought it was impossible and branded it a single player game.)

A few hours into development I got the idea:

* You can play with 2 players
* Taps are differentiated by screen half. Player 1 taps the left half, player 2 the right half. (There are buttons on screen, but those are just so people have something to target, they don't have any code.)
* Buildings can now have one of two colors/patterns.
* Obviously, a player only hits _their own_ buildings. But sometimes a building appears that belongs to _both_.
* When the players meet each other, on their arc, they have some interaction. Don't know what yet.

## Special buildings

Alright. I still don't feel _great_ about the core, but at least the game works and has a proper balance of fun and challenging.

I made a list of special _buildings_ and special _status effects_ the hero could have.

As usual, these just play with all the parameters we have. For example, a building that grows more quickly. A status that makes the player move faster, or multiplies your score.

My experience tells me that it's no good trying to give players _multiple effects at the same time_. I tried. It's just overwhelming and players will most likely ignore it altogether. 

So, our little sun can only have 1 effect/powerup (at most). It wears off after some time. If a new one is grabbed, it overrides the previous one

These effects can be good or bad. This is where I _hoped_ the core loop would shine:

* If you fly (very) close to a building, you get a good effect
* If you fly too far away, you get a bad effect

All information in this game, so far, is communicated precisely to the player. In this case: the effects you'd get are displayed on the building. Not sure if I want to keep it that way, so I put it behind a simple boolean (true/false) toggle.

## The result

And, did this finally make the game click?

Yes! Sort of.

I still had to add (many) tiny tricks to make the game better

* If you're near the edge of the screen, it only spawns things on the OPPOSITE side. (As it's literally impossible to react in time to things on your side.)
* Buildings only start growing ( = become active) when they are further into the screen. I also play a little popup tween. All of this to ensure it grabs the player's attention, and they have time to see it.
* I added some extra margin to the collision calculations: just to make it a little easier.
* The text feedback in the game tries to be smart and hint about what you should do / what buildings do. (For example, the "ghost" building only gives points if you fly _through_ it. So if you fly past it, like normal, it gives feedback like "Try flying through ghosts!")
  * This meant there were sometimes 2 feedback texts at the same time. I had to write some lines of code to check where all the feedback is, so I can _offset_ them to not overlap.
* Careful finetuning of the spawn speeds and progression. (How fast do buildings move? How fast does the player move? How does this change over time? When is the player ready for a new special building to unlock?) 

In the end, I think the game idea just isn't great. It works now. It's kinda fun and challenging:

* There's a real skill involved with knowing when to quickly _tap_ and when to _hold_
* There's also some real tension when you think you're too late or you've gone too far on a building
* The game remains one-button and simple enough to explain with one image at the loading screen.

It's fine. It's not great :p

But that's alright. The point of making these tiny games was to just _make more tiny games_ and experiment with ideas. This idea taught me some things _not_ to do in the next few games.

## Conclusion

This game was made in 3&ndash;4 days. (I didn't work on it for full days, only in the evening after regular work, so I'm not sure.) The end result is like 90% different from what the original idea prescribed.

So I guess we learned that you should just _build stuff and see if it actually works_, because you can't predict it. I thought this idea was 100% going to work and stay simple. I was completely wrong.

With this one done, I have one more "flappy bird like clone" to make. Again, I am 100% behind the idea, but now I'm kinda expecting it to completely fail within 1 hour of development. But I'm finishing that anyway.

Then we continue to slightly different hypercasual games.
