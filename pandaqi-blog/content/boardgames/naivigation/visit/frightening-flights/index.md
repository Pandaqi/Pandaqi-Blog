---
title: "Frightening Flights"
date: 2025-10-26
emoji: "✈️"
thumbnail_media: "frightening_flights_header.webp"
---

Welcome to the devlog for my Naivigation game [Frightening Flights](https://pandaqi.com/naivigation/visit/frightening-flights/). 

It will be short and only talk about _that specific game_. Read the overall, general devlog about the project here: [Naivigation](/blog/naivigation/project/).

Working on this version, I wrote down that this might work just as well as a "first introduction" to Naivigation. It's perhaps even simpler than the Spaceships version, but maybe with a less enticing theme. (In general, people think spaceships are cooler than a regular airplane :p)

I'll have to see what I think after finishing and testing the game, because I fear the "elevation mechanic" can make this one slightly harder to grasp than the spaceships game.

Anyway, let's dive in.

## The Base Game

What's the unique mechanic for this version? **Elevation**.

* As you play, you keep track of the airplane's current elevation.
* Each tile also has its own elevation. (Where mountains obviously get a higher number than simple flat lands.)
* You can only fly over tiles if your elevation is _higher_. (Otherwise, stay where you are, take 1 damage.)
* And you can only land on airports if your elevation is _identical_. (And in this game, airports are the collectible tile that wins you the game if you have all.)

This is extremely simple, but also very effective at solving every issue that a Naivigation game needs to solve.

* Each round is _different_, because we have a "permanent state" in our elevation.
* Because tiles have different elevations, there are many _different paths_ you can take from one airport to another. (Do we fly higher and go over the mountains? Or do we just go the long way around and stay at low altitude?)
* And you can't just stay "as high as possible" to prevent damage, because you need to come down at some point to land on airports.

As such, our vehicle cards are simply:
* Fly (move forward)
* Turn (left/right)
* Elevate (+1/-1)

This seemed a bit too simple (and similar to the other games) though, so I added some small wrinkles.

* What the elevation card does depends on its _position_ in the row. Odd-numbered slot means going up, even-numbered means going down.
* You can't turn right after an elevate card. (Chunky airplanes aren't that maneouverable.)
* Yes, you can fly too high or too low, and that incurs 1 damage.

I already have a list of such "wrinkles" that I want to spread across all the Naivigation games. Despite their core being the same, all other elements can all be slightly different and have interesting variations.

As you see, this is probably slightly _simpler_ than the Spaceships. We'll see which one ends up the first one recommended. I want to create a separate "standalone" game (that doesn't require shared + specific material and has even fewer rules/material) as an easy introduction anyway, so this is all up in the air right now.

## Expansions: Fuel

The major expansion here, as I just mentioned, is _fuel_. 

* Vehicle Cards can have 1 or 2 Fuel Icons. This indicates how much fuel they deplete when executed.
* You can only refuel when landed. (Which makes intuitive sense, but also adds a clear risk/reward thing.) => This is done with a special Refuel Vehicle Card.
* If you run out of fuel, you go into "free fall". You still have momentum forward, but otherwise can't control the airplane anymore.

The original idea for the "Fuel Deck" was to simply incur 1 damage (if you run out _or_ overfill fuel) and then reset the fuel tank.

For this specific game, though, that "free fall" felt way more intuitive and interesting. Because, well, that's what happens when an airplane runs out of fuel. It wouldn't just immediately implode or drop out of the sky. It keeps going as it slowly loses altitude.

So, to mimick that, free fall means ...

* At the end of each round, you automatically move 1 tile forward and lose 1 elevation.
* Only steering works, fly and elevate cards are ignored (because no fuel to make them happen!)

In practice, this means you need to land somewhere (and refuel) ... before you crash into the ground and lose the game.

{{% remark %}}
I considered creating a special tile/token to indicate "we're in free fall", but then realized I didn't need to. This mode triggers when your Fuel Deck is entirely empty. So, well, complete lack of fuel is enough reminder I guess.
{{% /remark %}}

## Expansions: Cargo

Some other expansions are objects in the sky (to dodge), passengers to move around, and more locations where you can land and possibly repair the airplane. (I expect damage to quickly ramp up in this game, especially with the fuel expansion. So this is a kind of balancing factor.)

At first, I was a bit hesitant about the passengers/cargo expansion. I wanted to keep the material minimalist! No extra tokens, or cubes on the board, or anything like that.

So how would it even work? Well, once I figured that out, the passengers/cargo expansion quickly turned into something I really liked and wanted to include with more games. 

Here's how it can work while keeping material/rules simple:

* Passengers (or cargo, not sure) are just _tiles_ (same size as map).
* They aren't placed on airports, or kept in a deck, or whatever. You _start_ the game with X passengers already in your vehicle, and that's all the passengers you'll see/use. (These are just placed in a row, anywhere.)
* Each one gives a penalty while still in the vehicle (such as requiring +1 fuel each round, because they're really heavy I guess :p), but also a bonus (-1 damage!) when delivered at their preferred airport.

It's thematic. It adds slight twists to the specific game you're playing. It messes with your planning, asking if you want to visit the closest airport ... or the one that gets rid of your most annoying passenger first?

## Let's make that!

Unfortunately, the development for this game was broken in two and not documented well :( I made one half of the code/graphics/rules immediately after Swerving Spaceships ... then I made the other half when I came back nearly a year later.

I, therefore, have no specific notes or interesting bits to show for writing the code and drawing the graphics.

I guess the biggest realization here was **changing my approach to the collectibles (graphically)**.

With Swerving Spaceships, I could ask the AI to generate nice planets in 5 different colors. If I ask AI to generate an airport, however, I get same-y unusable nonsense. Both in side view and top-down view. The same happened when I tried to get good collectibles images for the other games. It was near impossible to get something that even looked like it should, and then when I did, all these images looked _very much the same_. Which made it hard to tell the different collectibles apart.

As such, I decided to just draw these myself. They'd be _top-down_, with a clear _shape and color_ as the general silhouette. This was the only way I could actually make it look like an airport from above (with runways and all), while clearly making every collectible look distinct.

Additionally, most games require some extra data on the collectibles. For example, this game gives each airport a _number_ (a "time zone"). The only way I could ensure I had a nice white space to write this data was by drawing the whole thing myself.

After doing so for this game, I just continued manually drawing the collectibles for _all_ games. I wrote another article about this, but my general approach shifted from "Naivigation will be my masterpiece!" to "let's just make it, and we can always _update_ the mismatched graphics later"

## Better Shared Material
Creating the Airplane game showed me that we need a more standardized approach to the map tiles too.

Across all these games, I want ...
* The same possible biomes/terrains. (So, for example, a tile could be grass, or a forest, or water. And the texture for that is clear and the same for all games.)
* A clear marker of **elevation** on the tiles. (So that you can combine the airplane game with all the others too. And maybe I can reuse elevation in games where it makes sense, such as a Bike vehicle and cycling UPHILL is obviously much tougher.)

These were tougher issues than I first imagined. 

It's hard to find a texture that clearly shows "this is a forest from above", without being too noisy/detailed and getting in the way of any other possible element on the tile. After asking the AI to generate many things in many styles, I mostly let myself be _inspired_ by that and drew the terrain myself. 

(Somehow, AIs really really struggle with top-down shots and keeping things simple. If I ask for a forest terrain, I either get it from the side or with perspective, or I get a forest with loads of details such as rivers, animals, roads, cliffs. No! I just want a few simple trees from above!)

Similarly, elevation should be easily readable ... but also not be too obvious. A big number on all corners is too much. A small number in just one corner is too little. In the Airplane game, elevation is relevant _at all times_ ... but in other games, it might barely be relevant.

What is an intuitive, thematic, built-in way to signal the elevation of a map tile?

* Instead of a number, just use a "number of icons". (Numbers are more difficult to read, especially on lower sizes or when other things are going on.)
* Place these icons in the _corners_.
* Which automatically means elevation goes from 0 to 4 (at most). Which is fine. Prototyping showed this was enough difference to be meaningful, and any higher numbers would just make the game _complicated to calculate_.
* And make this icon a simple triangle tucked into the corner. (This is a pretty universal sign for "higher", also resembles a mountain, and takes away the least possible space.)

This will now be used on _all tiles_ (except spaceship, as there's no elevation in space, and it's an outlier anyway that can't be combined with the other games).

@TODO: IMAGES of terrain + elevation

With those changes, and my final tweaks to graphics, the final material (for now ...) looks like this:

@TODO: IMAGES final material

## Conclusion

When I started with this idea, I was worried. Was I making it too complicated too quickly? Or was this actually not exciting enough? In practice, this game is nothing more than "move up and down at the right moments, then land on airports---the only thing you CAN land on".

In hindsight, having finished the other (major) games too by now, this was actually the perfect step. This idea of the "Elevation Deck" introduced me to simple rules to track a vehicle's _permanent state_. This is so _simple_ yet so _effective_! I used it for loads of things (Fuel, Car Gear, etcetera) in other games. 

Because everyone can modify it, you truly have to work together. Because it's permanent, your actions in previous rounds actually carry over into subsequent rounds. And because it's just a deck of ~5 chunky tiles, it's very lightweight and easy to work with.

The elevation, in general, is just the perfect way to make the map "non-uniform". With Swerving Spaceships, there's no reason (in the base game) to _not_ take the most direct line towards your nearest planet. In this game, because of elevation differences, there are dozens of viable paths to a new destination. It's now your _choice_---depending on your cards and what you imagine others are doing---whether you go OVER a mountain or AROUND it.

I wish I could've used elevation in the other major games too, but it just didn't fit. And that's fine. The idea of the major games is to show the wide _diversity_ of possible mechanics and ideas in the Naivigation games. The _minor games_ can actually zoom in on some of them and do cool stuff with it.

As always, this game was playtested far too little (with my limited resources) and I hope to get more games in soon. Naivigation has been such a long-running project, though, that it became my "birthday game" and I basically have to wait until my birthday to test them all again :p

Until the next devlog,

Pandaqi