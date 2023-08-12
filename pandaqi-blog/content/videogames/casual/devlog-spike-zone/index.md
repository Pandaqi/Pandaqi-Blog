---
draft: true
title: "Spike Zone"
tags: ["devlog", "technical devlog", "Phaser"]
thumbnail_media: todo.png
date: 2022-10-30 14:00:00
emoji: "🐦"
---

Welcome to the devlog for my game Spike Zone (@TODO: proper link and name)

I had several reasons for picking this project:

* I wanted to learn TypeScript
* I wanted to get back into Phaser game development, because it’s just so well-suited to web and mobile games
* I wanted to just make a small prototype casual thing, in between all my other huge projects

The game itself is quite simple. This devlog will mostly talk about some high-level game decisions and some low-level thoughts about how I cleanly implemented this in Phaser.

## What’s the idea?

I saw the game *Don’t Touch The Spikes* and thought: “huh, solid idea, let’s remake it with some twists”

In that game, you’re a bird flying from left to right. 

* The ceiling and floor are filled with spikes
* The spikes on the left and right walls constantly change.
* All you can do is tap the screen to jump up (the "flappy bird" movement)
* Your score is incremented (by 1) anytime you hit the wall and reverse direction
* Hitting a spike kills you and ends the game

I thought of these changes:

* **Ceiling/Floor**: these are just like walls, instead of always 100% filled with spikes.
* **Multiplayer**: you can easily have multiple birds flying around in this "cage".
* **Powerups**: things you might want to grab or avoid
* **Zones**: circular areas in the background, if you tap while inside this area it does something

## Basic structure

I really wanted to use this project for improving my project structure and code clarity.

I used Phaser extensively many years ago (most of it before version 3, some of it after). But back then, all the logic went into a single file. When you restarted the game, I manually destroyed the main scene, then built it from scratch.

That’s not great. It was a mess.

### Scenes

The major parts of the core game loop should be scenes:

* **Loader**: loads all assets and shows a loading bar
* **Game**: the actual arena and game logic
* **Menu**: logo, welcome message, tap to play
* **Game Over**: highscore, leaderboard, play again buttons
* **UI**: all user interface elements. (I’ll explain what that means in a bit.)

The important thing is that all these scenes are created at the start, but turned on/off and reset when needed.

The "game" scene is the main one: ``this.scene.start("game")`` 

The others are launched as overlays: ``this.scene.launch("scenekey")``

When I want to restart the game, I call a custom ``reset()`` function on everything that needs to be reset. I wasn't sure if this was a _good idea_. But I wanted to try it. This ``reset()`` does stuff like resetting the position, velocity and rotation of all players.

### Global

Most games need _some_ global state. It's recommended to keep this as small and simple as possible---to not rely on it or pollute it---so this part went through several versions.

First, I used the Phaser registry for accessing objects elsewhere. You can save and load anything by doing ``this.registry.set("key", value)`` and ``this.registry.get("key")``.

But this soon became hacky. I had to set and get what I needed manually. It took many lines of code and it was't great.

Then I created a simple global object. Just a set of key/value pairs that can be imported anywhere as a module. This was fine ... until I also wanted some global helper functions. (I'm used to working with Vector2 operations when making games. It's just way faster and cleaner. But Phaser lacks some functionality in that department.)

Finally, I created a dedicated GlobalObject class. It has configurable properties I want globally. It has helper functions.

For example, in a game _all about gravity and jumping up_, I knew I wanted all physics stuff to be relative to the gravity value for the physics world. So gravity is a global property I can change any time, and everything reads from it.

One of the _best_ things I figured out, was the **EventEmitter**. I added a key ``signals`` with the value ``new Phaser.Events.EventEmitter()``.

Now I can make _any_ object send and receive signals. Very clean. Very efficient. Almost solved all my problems with communication between objects.

{{% example %}}
Let's say a player died. I _could_ get a reference to other objects and tell them directly what happened. This means many lines of code that can easily break down if anything changes.

But now I write ``global.signals.emit("playerDied", this)`` on the player. And use ``global.signals.on("playerDied", someCallbackFunc)`` on any object that might be interested.
{{% /example %}}

### Managers

This is the part I doubted the most. I wanted to try something completely new. But I was already out of my depth with the whole _TypeScript_ and _Phaser 3_ stuff, so I went back to something I'm used to.

For any major part of the game, I create a manager. So we have a ``PlayerManager``, a ``PowerupManager``, etcetera.

This usually means the main game scene only has 5 lines of code creating these managers. Then the manager itself is responsible for handling _everything_ on its own. For example, the ``PlayerManager`` creates players, places them, responds to those "playerDied" signals. 

It's a nice structure. It works well. It makes your code very clean and ... boring. (That's why I won't give many examples about what these managers do, because it's extremely straightforward.)

But I'm not sure it's always the best one. And putting the words "Manager" behind everything feels bloated :/

Anyway, this is what I did. These managers are present:

* PlayerManager
* PowerupManager
* ZoneManager
* ScoreManager
* SaveLoad: saves and loads highscore (and some other properties) from localStorage
* WallManager: holds the 4 walls around the game. These walls own their _obstacles_, as they can only appear sticking out of a wall.

{{% remark %}}
Zones used to be called _terrains_. But that just didn't work, as the game is in side-view. The current project title was already "spike zone", so I renamed all that.
{{% /remark %}}

And with that in place, we can start making a game!

## Core game loop

This is about testing the game and finding answers to the important questions.

**What's your goal?** Get the highest score.

**What gives you points?** Anytime you bounce from a left/right wall. Some powerups and zones also alter your score.

**What makes this hard?** Avoiding obstacles. Trying to get powerups in the meantime.

**What keeps this fresh?** Obstacles and powerups are random

**What keeps it challenging over time?** A progression system. As time goes on, you will move faster and faster, more and more obstacles spawn, and the game just gets progressively tougher.

That feels solid. 

### Progression

At first, I created a ProgressonManager with a basic timer that tracks _time since start of level_.

But this was the wrong idea. It's not _time_ that progresses the level. It's _score_. (This is also more flexible. If I change the player speed later, for example, I would also have to change the timings for making the game harder. If it depends on _score_, I never need to change.)

I integrated the progression code with the ScoreManager. It simply has a property ``MAX_PROGRESSION`` which says: "if your score reaches this number, the game is as hard as it can possibly be".

It has a function ``getProgressionFactor()`` which returns a value between ``0.0`` and ``1.0``, which is simply your current score divided by ``MAX_PROGRESSION``. 

This function can be used by any other object to scale their own properties.

For example, players interpolate between ``START_SPEED`` and ``END_SPEED``, using this progression factor. The further you get into the game, the speedier players get. The same thing for jump speed, number of obstacles spawned, etcetera.

Doing it this way is way more controlled and stable. It's easy to calculate each value based on progression. I also know that the game will never become ridiculously hard or complex, as there's a clear cap on difficulty.

### Even more progression

It's always best to _slowly_ introduce new elements. When the game starts, there are only default spikes. But as time goes on, more powerups are unlocked, more obstacles, which you slowly get to know as you improve in the game.

To make this process easy, I wrote a class ``ProgressionList``. It reads data from a JSON file. For example, a dictionary of all obstacles, with a property ``progression`` that has a number.

Any time the score changes, it receives a signal and checks all locked elements. Is the current score higher than the ``progression`` property? Well then, this element should now be unlocked!

Whenever we randomly pick new things to place, it asks this list to give it something that is unlocked.

This simple class is reused across all managers and handles this beautifully.

I also wanted to have drastic visual changes when you hit certain thresholds. For example, when you pass 50 points, the level suddenly changes colors everywhere. But I wasn't sure how to do this yet, so I left it for now.

###  Multiplayer

Okay, I can just add multiple players into the level. No problem. No, wait, _problems_!

A touch screen obviously can't distinguish who is touching the screen. We need _unique buttons_ for each player in the game. The best position for these are in the 4 corners.

But showing these buttons at all times, is a lot of visual noise. Instead, a button for a player only shows when they are actually in the game. (Otherwise, one of the buttons shows a big PLUS, and hitting it will add the next player.)

**Can players touch each other?** Of course. That is intuitive. That is actually a very good mechanic for this game. When two players touch, they bounce off each other, changing their direction suddenly.

**Do you lose when one player dies? Or all of them?** If we take the first option---lose when _one_ of you dies---the game is annoying to play with newer or inexperienced players. Not great for a simple casual web game.

So it's the second option. But it's also boring to ... do nothing and wait until the last player is dead.

Instead, dead players become _ghosts_. They don't hit anything or anyone: their physics body is disabled. They move and jump more slowly. But if they touch a living player, they are revived!

_Why slow down their movement?_ To simplify the visuals for the living players, so they don't get distracted. But also to make it easier to touch each other. If you keep moving at the same speed, you are chasing each other all the time, without touching.

**Is that enough?** I'm not sure. I feel like there should be some bonus/penalty for hitting each other. Maybe some powerups/obstacles that do nothing to you, but something to a team mate. But for now it's enough.

### Obstacles & Walls

It's not great if obstacles change randomly. (Unpredictable, might change just before you hit the wall, ...)

Instead, the obstacles change whenever you bounce from a wall. But that's also not perfect, as you might be hit by the new obstacle as you leave the wall!

So, there needed to be a delay.

* When you hit a wall, it sets a property ``redrawQueued`` to ``true``
* Every frame, if a redraw is queued, it checks the distance of the closest player to the wall.
* Still too close? Do nothing.
* Far away enough? Do the redraw! Remove the old obstacles and place new ones.

This process is tweened, because it looks way nicer and gives players even more time to strategize.

Obstacles are also placed following a **grid**. Or, rather, a **slot system**.

At first, I placed them randomly. But this is _messy_. There is no visual cohesion between the obstacle placement. Obstacles might be _almost touching_. You might get a really unfair placement of obstacles.

Instead, walls divide their surface into slots. When placing an obstacle, it just picks an empty slot. This looks more cohesive. This also allows me to implement nice features:

* Dangerous obstacles should be placed next to other dangerous ones. (This creates a "group" to avoid, which is easier to do and understand.)
* Positive obstacles should NOT be placed next to dangerous ones. (Again, easier to use them.)

But of course: as we _progress_, the probability of these nice rules being applied shrinks and shrinks.

### Powerups & Zones

When implementing powerups and zones, I noticed a lot of duplicate code/ideas. I don't like that. Either merge them into one system, or specialize them into completely different ideas.

After some thinking, this is what I came up with:

* Powerups are placed randomly across the whole level. (Although never very close to a player.)
* Powerups _create_ zones. When you grab a powerup, it might explode into a zone at that position. Conversely, some powerups "time out" and explode into a zone.
* Zones never do something automatically. They only modify what happens when you _tap_ ( = do an action) when inside their radius

This makes them distinct, yet related to each other.

As a final touch, I also used a grid for powerups. It, again, looks better than totally free placement.

In fact, I thought the game probably looked nicest if _all_ sprites were proportional to each other. (Either the same size, or multiples of each other.)

So I set one size in the ``GlobalObject`` and use that to scale these sprites + determine grid rounding. (For example, powerups use a half grid, so they can be placed _halfway_ between obstacles. Adds some more variety and options, while staying controlled and cohesive.)

## Creating content

Alright. Where are we now?

* Game loop finished: main menu, start, game over, play again
* Multiplayer finished: add/remove players at will, they interact, lose when all players dead
* Progression finished: everything scales and unlocks over time
* Obstacle management: redrawing, placement, colliding with player
* Powerups & Zones skeleton: can be placed, overlap players, and have a callback to react

{{< video src="state_of_game.webm" >}}
    Yeah, I hadn't drawn particles yet, so I reused other sprites. Also, physics debugging is on.
{{< /video >}}

So the big question is: _how_ do obstacles, powerups and zones react to the player?

That's the meat of the game. The content. What should make it stand out and keep you coming back.

And that's what I had to figure out at this point.

There's no "logic" or "reasoning" here. It's a "process": 

* I ask myself: "what are _all_ the elements I can change?"
* Then I create a list of all possible _ways_ in which they might change
* Then I sort them on factors like "easy to understand", "easy to implement" and "fun"
* And shrink the list to the best options

So, what can I change or influence?

* Horizontal player speed and direction
* Vertical player speed and direction
* Level state (e.g. a powerup that destroys all current spikes)
* Score
* Player state (extra life, die immediately, input locked, can't grab powerups, passthrough)
* Player state of _others_ (only if multiplayer)

And how does each element do this? Well, it's kind of a ladder from single-use to continuous-use.

* Obstacles? Should be one-time things. They activate when you bounce against the wall.
* Zones? One-time to multiple times. (If you press multiple times while inside the zone.)
* Powerups? Permanent effects (or close to that). Note that, for example, +5 score is also permanent of course. (It's not like these 5 points are taken away again after a few secods.)

### What I came up with

As I made the long list of ideas, some things quickly became apparent:

* Obstacles will be few in number. Most things are better off in another category. 
* The relation between Powerups and Zones invites even more cohesion between them. 

**About obstacles:** the spikes will remain one of the core elements of the game. They are simple and effective, they are what make the game. Other obstacles are big one-time effects, like destroying all obstacles, or getting a huge speed impulse.

But an effect like "higher speed" or "reduced jump" just works better if you get it for a longer time, or can activate it multple times. Additionally, obstacles are _always_ available in high numbers, so any effect will quickly become overpowered.

**About powerups+zones:** I quickly realized that _every_ powerup could explode into a zone that does the same thing as the powerup! But now as a zone. (So it only happens when you're inside and tap.)

For example: ReverseVertical. When you grab this powerup, your gravity becomes reversed. When you tap inside the zone, you jump in the opposite direction.

For example: ScoreBonus. When you grab this powerup, you get 1 point. When you tap inside the zone, you get 1 point.

The more I did this, the more it kept working. So now _every_ powerup has a related zone. 

**When do things go away?** Powerups can appear. Zones appear from powerups. But when do any of these things go away? Again, I chose for cohesion, but uniqueness.

* Whenever you _bounce_ a wall (including floor/ceiling), all powerups shrink. until they're completely gone.
* Whenever you _tap_ inside a zone, it shrinks. They also automatically shrink over time, until they're completely gone.

(I thought about _fading_ them away. But the difference between 20% opacity and 50% opacity is hard to see for players, let alone something that's 5% opacity but still active. It's just not nice.)

I think this will be a great system, but I can't know until I build it. Let's do that now.

### Visual style

Because these elements get _no_ explanation, they needed to communicate themselves with some consistent language.

* Green = good, Any other color = neutral, Red = bad
* Plus = good, Slash = neutral, Minus = bad
* Circles = good, Polygons (the inbetweeners) = neutral, Triangles = bad

With "good" I also mean something that _increases_ or is a _bonus_. And thus "bad" also means something that _decreases_ or is _reduced_.

Because the game is fast and icons need to be clear, I kept them _very_ simple. I also tried to keep out text or numbers.

### Big level changes

While picking a color scheme, I realized that fixed icons wouldn't work if the whole aesthetic of the level changes as you progress. So I drew all icons in _grayscale_ so I could tint/modulate them in the game. Then I created 20 "color schemes" for the level changes, with four elements: background, good, neutral, bad.

Players will be the only exceeption. They have more detail. They also have a thick border around them for separation anyway. They are already tinted with _player color_ (to show who they are).

_How did you pick color schemes?_ I tried to use an online generator, but they don't give enough colors, and especially not ones that will follow my rules. So I just hand-picked all of them in the end. I did learn a few things:

* Yellow remains a weird color. It's often just ... ugly. There are no yellow stages in this game.
* Similarly, I don't like many of the "standard" colors. Maybe it's just my style. But using slightly off-kilter colors and making them a bit more "muted" just works better than going FULL PINK, FULL RED, FULL PURPLE.
* It's _impossible_ to find three contrasting colors on a background that's, like, 33%-66% dark. In that midrange, you can never get enough contrast. So all the stages either have very light or very dark backgrounds.

I ordered these based on _lightness_. The first stage is a very light gray, they progressively get darker, until you end with the black stage.

I was in doubt about making red/green arenas, as those colors are so linked to "danger" and "not danger". But I needed the variety and it gave me an extra idea! 

* In green arenas, only good things spawn!
* And of course, in red arenas, only bad things spawn!

This automatically creates a structure of "safe zones" and "boss battles".

{{% remark %}}
I implemented this by writing a ``Recolor`` class. Each game object (that should be recolored) subscribes to it when created, and unsubscribes when removed. These objects are saved in separate groups (``bg``, ``wall``, ``bad``, ``neutral`` and ``good``). 

This way, if the level is supposed to change, I only have to grab the right values for this stage and apply ``setTint(color)`` to each _group_. 

Very efficient and minimal. Although I did have to "fake" a ``setTint()`` function on objects that don't have it, like Rectangles, by just ... adding it myself and setting the ``fillColor`` instead.
{{% /remark %}}

@TODO: IMAGE of some icons for this

@TODO: IMAGE of different background stages

## Are these ideas any good?

Yes! Mostly.

As always, you only encounter certain (big) problems once you start implementing stuff.

### The rectangle problem
The level is now a big rectangle, which looks just a bit boring and static. Additionally, all physics bodies are rectangles. This means that it's hard to move _past_ something diagonally, as then the corners of those physics bodies will overlap at some point.

* Solution 1: shrink the bodies. (This is a common technique. Most games have shrunk hitboxes _in favor of the player_. So, the hitbox for spikes is actually smaller than the sprite for it.)
* Solution 2: Previously, it would ramp up the number of obstacles on a wall until it was at maximum. Now the maximum is lowered, so even in the end game there are always at least two open spots on a wall.

Since starting development, one question kept coming back: these touchscreen buttons are too big and occlude a part of the level. Shrinking or repositioning isn't the solution. (They need to be large to be easily touchable. And the level is literally _the whole screen_.)

So the solution was the other way around: take the corners out of the level. This was "solution 3", as it also broke up the boring rectangular look of the levels. 

Now it has a bump in each corner. One in which the touch button fits precisely. One that bounces the player just like the other walls.

But with one difference: these do _not_ give points, and they do _not_ spawn obstacles. Why? To make them a sort of "safe zone". If you can't see another way out, move so that you bounce off the corner block. You won't get a point---so you can't endlessly do it, as you'll never progress---but you'll live just a little longer.

I thought this actually added a lot of strategy and balance, while being a very simple addition.

@TODO: Image of this

### The one-button problem
Walls bounce you 100%. This means you never lose speed. But, because of gravity, you constantly _gain_ speed in the downward direction.

The result? If you hit the floor with a lot of speed (which can happen easily), you bounce up just as hard.

Which is literally _uncontrollable_, because you only have _one button_ and it's for _going up as well_!

In a world where you can only go up, what do you do when you're already moving up---way too quickly?

* Solution 1: an element that dampens or completely kills your speed. (Could be an obstacle on the floor.)
* Solution 2: the floor does not bounce 100%.

The second solution is super simple, but ended up being a tough idea to implement. You can't set unique bounce properties between two sets of bodies. So I had to use a workaround. 

* On collision between PLAYER and WALL
* Check if it's the FLOOR (normal direction is the opposite of player gravity direction)
* Check if the player is moving at HIGH SPEED (so we never dampen so much that we lose _all_ momentum)
* If so, multiply its Y-velocity by some value between 0-1, to slow it down

It took some tweaking to get this right. Too much damping, and it feels stiff and unnatural. Too little damping and you don't solve the problem.

But in the end I got something that feels controllable when playing.

And with that, the game had its core loop and its content. All that's left is _a lot of testing_ and _polishing_.

### Visual clarity

All color schemes were implemented and worked. All sprites were white with light gray icons, so they could be modulated.

The problem? Modulation/tinting only makes things _darker_. I couldn't guarantee the iconography was easy to read on all colorschemes. It also doesn't help to add black/white outlines, as they'd just be modulated as well!

I saw no other option than splitting the elements into multiple layers:

* Background: the general shape (just a white triangle, rectangle, etcetera)
* Outline: only the outline of that shape, modulated for maximum contrast (so completely black or white)
* Icon: the unique icon that makes this element recognizable. Modulated in a _lighter_ version of the tint color, so it shows clearly against the background.

For this, I found the Phaser `container` class. Instead of extending `sprite`, I made obstacles/powerups extend `container`. 

In the constructor, it creates a sprite for each layer, and adds it to itself. This is pretty much a drop-in replacement: everything still works. All these children are repositioned with the container. Even the old physics body!

I _did_ have to rewrite parts of the recoloring systems. For example, the `container` class has no `setTint()` function. So I had to write one that automatically passes the right tint color through to all its children.

In doing so, I had another breakthrough. I wrote a little function to calculate the _contrast_ between two colors. This way, I can test different variations (brightened, darkened, desaturated) of a color against the _game background_. It picks the one that ends up having the _highest contrast_.

It's really fast and simple, yet it has made the game 1000% easier to look at and play. Every icon is readable, nothing falls away, yet we stay true to the main color scheme.

@TODO: IMAGE OF THE CLEAR ICONS

{{% remark %}}
I played around a bit using shaders to automatically create the outlines. Using [Rex Plugins](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/shader-outline/) worked absolutely fine ... but it was too performance intensive. _Every_ element would need an outline. With only 5-10, my old crappy laptop was already lagging. So I went back to the old-school method of "baking" outlines into spritesheets and just using that.
{{% /remark %}}

### The bad apples

Some powerup ideas just didn't work. They were too complicated, or too subtle, or impossible to explain with a simple icon.

For example, I had two powerups that were the "rotated version" of each other:

* Cushion: when hit, heavily dampens your movement in the direction the cushion is pointing
* Opposite Cushion: whenhit, heavily dampens your movement in the direction along which you're moving ( = rotated 90 degrees from cushion direction)

The distinction is very technical. The code for it was messy. You know what's way cleaner and simpler? _One powerup_ that simply _stops all your movement_. 

Immediate visual feedback. Not subtle at all. Works great with a game that's all about managing your movement in X and Y direction.

That's how the long list of elements eventually shrank down to something much shorter.

Other examples:

* The "cancels Y-speed" does nothing if you're going quite slowly on the Y-axis, of course. (It's very nice if you _are_ going faster.) I modified it to do something obvious in all cases: _completely disable gravity_. (Until it wears off, as all powerups do.)
* The game is very volatile. I tried to resist it, but _some_ idea of a shield or extra life seemed like it would improve replayability, or at least reduce frustration.
* The _most important part_ of the game is your player and its hitbox overlapping with a sprite. I provided many ways to alter movement and destroy obstacles ... but forgot the obvious other part: _resize the player_.

### Simplifying zones

Similarly, when I implemented zones I allowed two types: 

* Ones that are created when you _grab_ a powerup
* Ones that are created when a powerup _times out_ (so you don't grab it within a certain number of bounces)

I knew this would be confusing---and that I'd eventually go back to only a _single_ rule---but I didn't know which type was most fun.

After some testing, I discovered

* Automatic zones are a bit overwhelming. Because you're focused on something else, and then BOOM suddenly there's a zone. It feels better if YOU created that zone by grabbing a powerup.
* At the same time, this is always overpowered. Grabbing a _good_ powerup also gives you its zone, so double good! A _bad_ powerup will also give you its zone, so double bad! It's more balanced if zones are only created if you _don't_ grab the powerup. That actually gives you choice, strategy, a "second chance" to get something.
* The step-wise shrinking looks jarring. Especially because it happens on a timer and it's a circle, so it looks way more fluid if it shrinks slowly every frame.
* It's visually confusing if new zones/powerups spawn on top of existing zones. So I added an overlap check that forbids all this.

I decided that balance was more important. As such: **when a powerup is _not_ grabbed and removed after a while, it creates its zone**

For example: you see a score powerup. But you're confident that you can let it time out, so it becomes a score _zone_ with which you can score 2 or 3 points.

For example: you see an "input disabled" powerup. You grab it anyway, because you know that if it becomes a zone, it will be much _harder_ to avoid.

To combat the overwhelming nature of many zones, I ...

* Made them slightly smaller and remove them more quickly
* Do NOT add this zone system to the first few powerups you get
* Add a _smaller_ zone to the powerups after that

Just to gradually get the player into the mechanic of zones.

**After implementing that,** I noticed that the first change was actually enough. Because powerups only create zones on timeout, way fewer zones are created. (Because the player grabs a lot of the powerups.) This cleans up the game already and the other modifications were unnecessary or applied with a lot of subtlety.

### Introduction order

The last question was: we have all these nice ideas, in what order do we introduce them? At which score do they unlock? And in what order?

At first, I ordered them based on simplicity. What would a player expect the most? Probably a powerup to +1/-1 your score. Powerups to change your move speed. Change your jump speed So introduce that first.

But that approach was flawed. Many of these powerups did something "behind the scenes", but weren't very visual or direct.

That felt like a way better approach: start with powerups that are immediate and have huge obvious effects.

* The direction changer: when you grab it, your horizontal/vertical speed immediately flips. Very impactful, very easy to understand after one use.
* Player resizer: your character shrinks/growers. Also very immediate and visible.
* Gravity disabler: as soon as your character stops falling down all the time, you know precisely what does one does :p
* Input disabler: not visible, but easy and impactful.

## Playtesting

I took a few days off, allowed the game to be tested, and (as always) found many things to change.

### Minor updates

First some minor things with big consequences:

* I moved the body of obstacles more against the wall. This means you can more easily dodge spikes and it "feels" more fair.
* Powerup placement doesn't use your current position, but your _predicted position_ (within 0.5-1.0 second). Otherwise, powerups would spawn _right in front of you_, near impossible to dodge.
* The corner blocks (which old buttons for multiplayer) took away too much of the playable area. I halved their size.
* Some powerups with hard-to-explain zones ... simply don't have a zone anymore.
* Added an outline around players, with correct tinting. (There was a bug there I somehow missed for a week.)
* On multiplayer, everyone's speed is slightly _reduced_. (As well as some other effects.) Otherwise, it's too hard to play, with 2-4 players zooming around the arena. It's not really noticeable, yet makes a huge difference.

### Incentive to play active

I've learned that a key to engaging games is giving players an _incentive_ to play _active_.

* If your game forces activity (through artificial means, like timers) it feels overwhelming and draining
* If your game doesn't require anything, players _will_ be lazy and do the bare minimum. Even if it mean they have _less fun_ with the game.

Instead, you kinda want to dangle things in front of them, and let them slowly discover those things are nice to go after.

I had this issue of "passivity" with many powerups. I mean, yeah, "+ speed" is nice, but do I really want that? Do I go out of my way to grab it? Not really.

I tested a few different changes. The one I liked most was: **grabbing a powerup (or using a zone) always gives +1 point**

Even "annoying" powerups might now be nice to grab, purely for the points.

All these tweaks do constantly change the progression balance. So I reworked the system so everything is _calibrated against a maximum of 100 score_, but I can _scale everything_ however I want.

For example, the first powerup is introduced when you have 2 points. If I scale everything by 2.0, it is now introduced when you have 4 points. (And maximum score is 200.)

This allows me to keep tweaking game rules, without having to rebalance the whole progression. I merely need to balance that one scaling number.

### Improving the horizontal walls

This was the biggest issue. These were almost always "safe". (You can just let yourself drop down, bounce on the floor, and probably reach the other side.) If you hit the floor with low speed, you could just slide left to right endlessly there.

At the same time, there was no _incentive_ to use the horizontal walls at all. There's this small "gap" in the gameplay when you're halfway the arena, halfway your journey to the other wall.

I, again, tested several changes. (I have a global configuration object where each change I test is a variable I can turn on/off. This way, I never need to remove code, or comment stuff out. I can easily toggle any experimental features from there.)

I liked two ideas the best:

* The whole floor and ceiling are spikes. (So you cannot safely drop down.)
* Roughly halfway, the floor and ceiling will spawn really good obstacles. (So the player has an incentive to go there while in open space.)

There were some issues:

* As the arena gets fuller, it would mean _everywhere_ are spikes and it's unplayable.
* I don't currently have "really good" obstacles :p

These were my solutions:

* The floor/ceiling progress in reverse. They start filled with spikes, but get more _empty_ as the game continues.
* I copied a few basic things from powerups: a "+ score" obstacle, a "+ life" obstacle
* Some obstacles are "forbidden" or "preferred" on specific walls. For example, the "cushion" obstacle is annoying on the floor, as it stops all your momentum _while you're already on the floor_. So it won't appear there anymoer.

It took some effort to write a clean system that says "fill me with all spikes, but leave a gap for good obstacles somewhere near the center". This is the system:

* When a redraw is queued, select a range of slots. (Pick one to the left of the center, then pick the next 2-5 slots from thre.)
* Place spikes everywhere ...
* ... but randomly select something else (or nothing) for that range

### A remark about smart coding

I learned something interesting because of this.

Obstacles used to be placed this way:

* Determine how many we want
* While we haven't placed enough yet ...
  * Grab all available positions
  * Shuffle them
  * Loop through these options until we find a spot we like
  * Place the obstacle there

Which is how I've done similar things for years now. And it's fine ... but you can be smarter about this!

The problem is the _uncertainty_ and _misses_ with this algorithm. It might keep trying a random slot over and over, even if it's never going to work. I need to end the loop sometime, so it might end _before_ I've actually placed the number of obstacles that I wanted.

With the new rules, I needed to be _certain_ that the floor and ceiling would be filled with obstacles/spikes. I needed to be _certain_ that good obstacles would be placed.

The new algorithm became:

* Determine how many we want ( = as many slots as we have, at the start)
* Grab the slots and shuffle them (only once!)
* Loop through them
  * Is this slot within the good range? Place something good
  * Otherwise place a spike

More efficient _and_ certain, without retrying or reshuffling all the time.


## Polishing

First step of polishing: tweens and animations. I added a few helper functions to that GlobalObject, for simple tweens I need a lot: appear, disappear, bounce, etcetera. (Again, might be cleaner to use a TweenUtility class or something. But this is a simple game and I'm still figuring out Phaser, TypeScript, and basically _everything_ here.)

Second step of polishing: particles. I used a particle spritesheet with multiple variations of each particle. This way, I can vary their emission and loop through the frames, which just looks a lot nicer than static particles. Besides that, particles mostly _fade out_ or _rotate a little_ or _explode in random directions_. Nothing fancy.

Third step of polishing: general small changes to the visuals, quality of life features, things like that.

### Leaderboards

Way back, when I just started programming, I always made highscore charts for my games. These used a cheap MySQL table on some free web hosting. They were slow, clunky, and always stopped working after a few months. But they were _always_ the best part of the game. It got people excited to play again, to smack talk each other, a target to beat.

So after a few years without highscore tables, I decided I wanted to bring them back.

I used Google's free Firebase plan for that. After some fighting with the API and outdated tutorials/documentation, I got it to work:

* It creates a new entry for you if it doesn't exist yet
* It updates your entry if your score if _higher_ than your previous one
* It can read from the database and display the top 100

Then I realized: "hmm, just showing a bunch of numbers isn't great"

I needed to add a _username_ (the one that set the highscore) and a _timestamp_ (so you know when it was set). Currently, it just used a UUID (Unique User ID) it generates when you play the game for the first time.

But ... I don't like games that start with asking me for a username. And I didn't like the overhead of checking if the name already exists, showing a prompt if so, bla bla bla.

So I simply added a list of random words. It combines them, with your UUID as the _seed_, into a random name. The chances of duplicate names are low. The name is consistent. It might be a funny mechanic. (Though I might add a button to generate a new name.)

### Gamepads

Gamepad support is _somewhat_ reliable in web games these days. But the Phaser Docs for it were very unclear. And I couldn't get HTTPS to work locally, which means I couldn't test it. (Browsers and their strict security rules ... )

So I wrote support for gamepads ... but couldn't test it until the game was otherwise done :p

Because the game is one-button, and at most 4 players, I simply use "one controller" support. Each button of the controller is a different player. The START and BACK buttons add/remove players. That's all you need. It felt completely overkill to expect _a different controller_ for each player.

### Lala @TODO

Lala @TODO

## Deploying

Of course, deploying the game as a _web game_ is as simple as dragging its folder to a server.

But this game was obviously meant to be a mobile game. And most players with gamepads will want a desktop executable.

So I had to dive into the dark magic of _Cordova_ to turn the game into an app/exe.

Lala @TODO

## Conclusion

The game turned out way better (and more unique) than I expected. I learned _a lot_ about Phaser, TypeScript, clean code and folder structure using JS Modules.

I'm excited to make more of these (hyper)casual games using this system