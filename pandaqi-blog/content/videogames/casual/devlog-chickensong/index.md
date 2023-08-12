---
draft: true
title: "Chickensong"
tags: ["devlog", "technical devlog", "Phaser"]
thumbnail_media: todo.png
date: 2022-10-30 14:00:00
emoji: "🏨"
---

Welcome to the devlog for "Chickensong". It is part of my series where I try to create many (many) hypercasual games, to practice finishing games and learn more about that part of game design.

You can read the whole series here: [How to design Hypercasual Games](/blog/tutorials/how-to-design-hypercasual-games/). It summarizes each game, what I've learned, general tips for hypercasual games, and so forth.

This game was originally titled **Chickensong**. I was never sure about that title. Let's see if I found something better by the end.

These are simple games, so let's jump right into the interesting stuff!

## What's the idea?

It is, again, terribly simple.

* Chickens drop eggs from the top of the screen
* You control a basket (left <=> right) at the bottom
* Catch the good eggs, don't catch the bad ones.
* Get the highscore!

As usual, I started with a few sketches. 

* To see where all the buttons or input/active elements will be
* To already get a sense of scale and art style
* Because it immediately (visually) pinpoints issues. Ones you'd otherwise miss by writing or coding.

@TODO: SKETCH 1 and SKETCH 2

### Q1: Portrait or landscape?

In landscape, you'd have more space to move your basket. When playing multiplayer (2 players on the same device), each could take one half of the screen.

But it had issues:

* Looked clunky. 
* Almost no time to react to eggs. (The distance between top and bottom is too small.)
* A finger can swipe fast. But if you played the game with keyboard, it'd take a long time to traverse the whole length.

Instead, I place the second player upside down at the other side. I did this before with another game and it works well: when playing multiplayer, you simply sit across each other. Because your "view" of the game is flipped, you can really concentrate on what belongs to you, and filter out the eggs/chickens that belong to your fellow player.

The game will be in portrait mode.

### Q2: Where do buttons go?

I've learned to put the "add player" button on the screen, and to allow adding players _while playing_.

Otherwise, people don't even realize this is possible, or will feel like it's "too much effort".

In the first sketch, I made this button the shape of an egg. Cute. But easily confused for real eggs, which isn't great while playing. (I initially placed the button in the top left, but that wasn't an option anymore in multiplayer.)

Instead, 

* I rotated the egg-button-shape
* Placed the buttons in the center. So you won't accidentally press them. 
* Made their icons much more light and faded, so they don't attract attention.

### Q3: How to keep it interesting?

Years ago, I learned a great general rule for keeping gameplay interesting:

> Give players a reason to press a button, but also a reason to **not** press that button

For this game,

* There are eggs you surely DO want to catch => so move your basket
* There are eggs you really DON'T want to catch => so don't move your basket

That's step one. The game starts with a regular egg (bonus points) and a bad egg (minus points). We can expand this to more varied rewards: faster basket speed (good!) vs slower basked speed (bad!)

But I felt that wasn't enough. It's not terribly hard to see an egg at the top of your screen and place your basket directly below it.

We needed something that could *modify* that egg's path or properties.

* This is a physics-based game (eggs have gravity, check overlap with basket to collect). So let's lean into that. Let's place random blocks and obstacles that bounce eggs around. (But keep it simple, so it doesn't become impossible to predict an egg. Or eggs get stuck and never fall.)
* In sketch 1, you see me drawing a wind-like effect. I liked the style, but it wasn't obvious enough. Additionally, such animated effects would only work for a small number of ideas. So, in sketch 2, I used "effect zones" instead. Big colored rectangles that affect all eggs inside it equally and clearly.

This will be a chaotic, frantic, egg-catching game. So let's make sure the rules and map is as _simple_ and _clear_ as possible, at all times.

## Let's make that

As explained in earlier devlogs, I've built a general "skeleton" for these games. Simply copy-pasting that already gives me a game loop (start->play->gameover->repeat), score keeping, input management, etcetera.

All I need to do, is add more _modules_ for general purposes (which I didn't need in earlier games), and some custom code for specific parts of _this_ game.

### Modules

These modules (or "components") were added:

* DragMovement => for moving something by finger dragging _or_ keyboard left/right keys
* PointSpawner => for spawning something at a specific point (with potentially gravity and animations). This "point" is obviously where the chicken is
* FlyInSpawner => for spawning the chickens. They start off-screen, then fly to their position on-screen.

I wasn't sure which one I would like more: point spawning or fly in spawning. So I code both and see what works.

### Custom 

These elements are custom to this game. They become a custom class for which I write new code.

* Zones => this is just a rectangle that checks for overlap. All the "manager" does, is make sure these zones don't overlap and there aren't too many of them.
* Blocks => again, this manager merely ensures blocks don't overlap or create impossible situations. The blocks themselves are rotated to "nice" angles (30 degrees, 45 degrees, ...). They are just static bodies.

Because the bodies in this game are _egg-shaped_, and the blocks can be angled, I had to switch to Phaser's other physics system: MatterJS.

This was mostly painless. (Coming from Arcade.) Just switch the name, call a different function for creating an object, supply the body/properties yourself, and done.

### Objective

I decided to go for "shared lives". Otherwise, when playing multiplayer, one player might be dead while the other still plays on, which is boring.

Now, your lives are shared. You both play until the end. If the lives reach zero, it's game over.

But when do you **lose a life?** 

Well, when you drop an egg. Aka when you fail to catch an egg in your basket.

* Losing a life for _every_ dropped egg is possible. But it seems too harsh, I need to test that.
* The alternative is to divide eggs into good, neutral and bad. Dropping a _good_ egg loses a life. Neutral eggs can be missed.
* And then, of course, there are some bad eggs that you DON'T want to catch. So "not dropping" them loses a life.

### Basket

The primitive ("naïve") implementation is just to use one sprite and overlap. Egg overlaps basket sprite? You got it.

But that's not great.

* It needs to look like the egg goes _inside_ the basket. **Solution?** We need two sprites: one at the front and one at the back. The egg goes between those.
* Eggs should only fall in the basket from above. With just overlapping, you could move the basket _from the side_ and swallow the egg that way. **Solution?** Add two solid bodies to the sides of the basket. Eggs from the side can't be caught. Eggs from the top can "hit the edge" and bounce back up, giving you a second chance to catch them!

### Bringing it all together

At this point, we have three separate systems:

* Chickens that lay eggs
* Blocks for physical fun
* Zones that modify how the eggs fall

This is quite overwhelming for new players. Simpler is always better. So how do we _connect_ these systems? How do we simplify this?

Somehow, the creation or deletion of each element needs to happen in _one clear way_ that a player _immediately sees_.

This was my best idea:

* Chickens fly into the screen => visible, hard to miss, seems fitting
* For every egg you don't catch, they become annoyed.
* After a few eggs, they always fly away again.
  * If they're annoyed, they might leave a zone
  * If not, they might leave a block

Why? Zones are generally bad. They have a huge influence and quickly change all eggs going through it.

But blocks? They slow an egg _down_. It actually makes it a bit easier, so it's a nicer thing to have.

I don't know if this works. But it's the first thing to try.

## A note about workflow

As you see, I often _don't know_ the best solution to something. I might implement two, three, or even more different rules or systems. I test them all and pick the best one.

I never throw away code. Or "comment it out". Instead, I have a global Configuration object where I can toggle rules on or off. (The code obviously reads these properties and reacts accordingly.)

Simply by changing true <=> false, I can enable or disable any ideas I have. This allows me to quickly experiment, and also try _combinations_ of systems.

And if my new ideas turn out to be shit? I just turn them _off_ and turn the old ideas _on_ again.

Since I invented this system, designing and finetuning games has become a breeze. (Even though it used to be the hardest and most annoying part before.)

Because you simply cannot **know** if something is a good idea, without implementing it and **seeing it in action.**

## Is this fun?

Because I already had most of the elements, making this game functional happened very quickly. The original idea is also simple and solid.

I was, therefore, pleasantly surprised by how fun and nice the game already is.

@TODO: GIF of gameplay

What do we need now?

* More egg types, zones, etcetera
* Finetuning the progression (how quickly new elements are added, how quickly you gain points, ...)
* Finetuning the parameters (move speed, spawn speed, gravity)
* Polishing (some animation, feedback, particles)