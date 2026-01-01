---
draft: true
title: "Firefly Dungeon"
tags: ["devlog", "technical devlog", "Phaser"]
thumbnail_media: todo.png
date: 2022-10-30 14:00:00
emoji: "🏨"
---

Welcome to the devlog for "Firefly Dungeon". It is part of my series where I try to create many (many) hypercasual games, to practice finishing games and learn more about that part of game design.

You can read the whole series here: [How to design Hypercasual Games](/blog/tutorials/how-to-design-hypercasual-games/). It summarizes each game, what I've learned, general tips for hypercasual games, and so forth.

These are simple games, so let's jump right into the interesting stuff!

## What's the idea?

This was the last of my "flappy bird clones". But, as always with me, it turned out wildly different and more complicated.

The idea was ... 

> The "pipes" are instead "gates". To fly through them, you need to unlock them in some way. This means gates are quite far apart, and you need to grab/avoid the right powerups in the period between them.

Then I made a quick mockup of what this would look like. I wrote one page working out the details. And I realized some issues:

* You can't grab the right powerups ... if you don't know what gates are coming up! I'd need to somehow make the player able to look ahead
* I don't want the game to become "icon hell": each gate has a different icon you need to understand. Instead, let's keep it more simple and intuitive.

After thinking for a bit, I found my preferred solutions.

* The bottom of the screen shows a "minimap". It shows where you are and what gates/sections are coming up.
* Players have "keys" on their sides in simple shapes: a triangle key, a rectangle key, ...
* The main type of gate is simply a "lock" that needs a specific key. As such, if you see a rectangle gate coming up, you merely need to rotate yourself so the rectangle key points forward.

I thought this was quite unique, yet simple to build and explain. Here's an image of the mockup I made for that:

@TODO: IMAGE OF MOCKUP

## General Tools

I've learned, after years of programming, how extremely useful it is to _not repeat yourself_. From the start of this series (of hypercasual games), I tried to always generalize my code. Any time I wrote something that seemed useful in other games, I pulled it outside of the custom code and into a general "tools" library.

_I will talk about this for a minute now. You can skip this if you want, it's not specific to this game._

After two games, this evolved into quite a template. For every new game, I can start from this template, which already gives me:

* The core game loop (loading, menu, game, game over, UI)
* Objects for specific functionality nearly every game needs (like a "player spawner", which does nothing more than add/remove players, and keep track of how many there are)
* Helper functions for common practices (like calculating the distance to the edge of the screen, or _tweening_ something to bounce)
* A monetization plugin (which handles all ad loading, displaying, currency management, etcetera automatically)

In other words, this is my **hypercasual game template**. 99% of my casual game ideas will fit this exact structure. 

But I also learned that I shouldn't try to "look ahead" and improve the template without a clear goal. Before starting this game, I tried to do so ... but all my "improvements" were eventually removed again.

Only when you actually _make_ a game, do you discover what you really _need often_ (and what you only need once).

This game added two big parts to that template.

### Spawner

The biggest addition to my template was the (general) "Spawner". 

This game (*Firefly Dungeon*) will constantly spawn _gates_ and _powerups_. They need to scroll from right to left. They need to check overlap with the player, not be too close to one another, be displayed on that minimap.

In other words, spawning something according to certain rules or restrictions is something I need in almost all my games. So I do my best to separate all that code and put it into its own module(s). 

From now on, in the next games, I can just call `new Spawner(<parameters>)` and I'm done!

### Buttons

I recognized a recurring issue in all three games: the _buttons_ and how they _behave_.

Some buttons were always needed. For example, I always try to make my games local multiplayer (optional). So I found myself rewriting the same code again and again to create buttons like:

* Add new player
* Remove last player
* Unique buttons for each player to press. (On touch screen, you obviously need this, as just tapping the screen can't recognize whose finger it was.)
* Restart game

At the same time, I knew I wanted buttons for the Monetization plugin. Buttons like:

* Watch a rewarded ad, to get some bonus
* Buy something from the store, using your coins

I tried several methods:

* Buttons completely create through code => these take many lines, and then look boring and static, especially if used in all games
* Buttons which need multiple frames from a spritesheet => one for when you _hover_ over it, one for when it's _selected/focused_, etcetera
* Buttons with a single base frame, which can optionally hold an icon or text inside => changes come from tweens to the scale, tinting, position, etcetera

I'm going for _speed_ and _efficiency_ here---so the last option.

It means, for each game, 

* I merely have to decide one "button style" and draw it. 
* Then I simply create a `new Button(<params>)` for everything I need. 
* And, as you guessed it, my helper tools can automatically create the buttons I need the most.
* (And any icons or text in the buttons are custom per game. Those are read from a `.json` file by the Monetization part, as most buttons will be things you can buy in a store and such.)

This refactoring is quite boring and complicated at the same time. So I'm happy we're finally through this and can start developing the game!

### General advice

For some reason, humans just tend to think about stuff as _objects_ rather than _functionality_. Our heads classify something by what it _is_, not what it _does_.

As you might have heard, when programming it's recommended to do the reverse. Write modules that _do_ one thing, instead of big classes/objects that pull functionality from all over the place. (Because code is meant to _do_ the tasks you want, not _be_ something.)

It's perhaps the most useful skill to practice. If you want to become really good at programming.

As such, I refactored this "Hypercasual Template" at least three times. In the first iteration, there was a "Players" singleton, for example, and a "Map" singleton.

Until I realized that I only need, like, 5% of the same functionality between games. (For players, it's spawning and removing them. For the map, it's keeping track of boundaries, loading background, etcetera.) 

Those singletons were _objects_ ... which could _do_ millions of different things, depending on the game.

It took me several passes to completely decouple code from big classes and objects. The result is that the template consists of many _tiny_ files. But it's much cleaner and reusable.

It's just a different way of thinking. Instead of thinking "hmm, every game needs Players, lets create a big Players module", think "every game needs objects that _move_ or that can be _collected_, let's create modules for that"

{{% remark %}}
Update! At the end, I'll mention this again. The structure changed even more times while making this game, improving (and learning new JavaScript skills) along the way. 
{{% /remark %}}

## Player

At this point, entities in my game structure are made from _modules_. So, the player has these modules:

* Status: dead/alive (or "number of lives), resetting when new game starts
* Scale: for growing/shrinking the player and their body properly (almost all my games have powerups that do this :p)
* Rotate: rotating the player, and a lot of helper functionality (needed in this game to quickly check if a player is rotated correctly when passing a gate)
* Sprites: a list of sprites that build the player, so I can still animate/position them independently
* Movement: a module called "FlappyMovement" :p You fall down, tap to go up.

The important thing here, is that this is extremely _simple_ to code and maintain, yet endlessly _flexible_.

* Want different movement? Just swap that module for another.
* I want to create another flappy-bird-like-game later? Just add this module to whatever entity I want.
* Want more or fewer sprites? Just use the sprites module, instead of adding more variables to a big Player class

This wasn't the hard part. Oh no, the hard part comes now.

## Gates

I had several unique requirements:

* Gates must be spawned, moved and destroyed automatically
* They must be spawned with quite some distance between them, far into the future
* So it can tell the _powerups_ module (more on that later) to spawn the things the player needs ...
* ... at the right place before the gate

Not only that, gates _themselves_ were more complicated than just a rectangle with a hitbox.

* A gate must always have one "hole" so the player can pass through
* Otherwise, it can fill its vertical space anyway it likes
* But each different section must have its own hitbox, and properties, so I can check what the player hits and interact with it.

### General spawning

How did I solve these issues?

* Every frame, it checks the most "extreme" gate. (The one furthest to the right.)
* It subtracts an offset from it. (The larger this offset, the further it creates the map into the future. I can change this myself, of course, at any time.)
* Check the coordinates you end up with.
  * On the screen (or to the left of it)? This means we must spawn even more gates further ahead!
  * Otherwise, we're good for now

When I spawn a new gate, I again find the most "extreme" one and add some other offset to it. There are many details and edge cases here, but this is the simple summary.

### Filling a gate

The gates themselves? I decided to create another class called `GateBlock`.

The gate decides how _many_ blocks it wants. (This number grows as you progress, to make the game harder and more detailed as time goes on.)

Then it creates a list of block types. It does so _before_ it starts spawning anything. Why? So I can always add one `empty` block to the list.

I add blocks I want to appear _for sure_ to the list. Any remaining spots are randomly chosen.

And then I loop through the list and place them all. (Divide the gate height by the number of blocks, and you get the height of each block. Then it's just a rectangle with Phaser physics enabled on it.)

This sounds very simple. And it is. But it took me some tries to get here. At first, I chose random heights for the blocks, which led to all sorts of issues, and I'd forgotten that gates need at least one hole :p (Leading to a game that created literally impossible situations all the time.)

### What do gates actually do?

This was a question I'd put off way too long. I just thought "sounds like a good idea, let's build it", without creating a list of the actual gates/powerups that _could_ be part of this game.

I forced myself to think about this now. The whole idea of the game is that the _gates_ and _powerups_ are tightly linked. You need to look ahead and plan ahead, so you grab the exact powerups you need for an upcoming gate.

So I developed them in pairs. Here's what I came up with:

* Grow/Shrink powerup => which can just create holes of different sizes, no special stuff needed.
* Rotate powerup => some gates require you to be rotated a certain way
* Key powerup => stick the right key in a gate to unlock it
* Shield powerup => needed to pass a dangerous gate (like a laser that would kill you otherwise)
* Strong powerup => when you overlap a solid block, you destroy it and don't die
* Light powerup => toggles your light on/off => light off allows you to pass any gate without meeting requirements, but, well, you don't see much :p

As you can see, the more I thought about it, the more general the powerups became. A "strong" powerup would also help in any other situation, to brute force your way through an obstacle.

And I liked that. Because it meant there were other strategies. Other ways to get a high score, even if you make some mistakes or don't know the powerups that well.

Other powerup ideas were:

* Extra lives => because it's dungeon-themed, it felt logical to have hard-to-reach treasures, but I'm not sure how I'll implement that.
* Remove lives => careful with this, could be too annoying/powerful.
* Stuff that modifies your movement. But you always have to be careful with this, because when these _stack_ (like, you accidetally grab 3x extra speed), you get completely impossible unplayable situations. Examples ...
  * Scroll speed of the map
  * Increase, decrease or disable gravity
  * Increase or decrease jump speed

## Powerups

These were more straightforward. I store and load elements of a game in simple `.json` files, so I can attach useful data to everything.

As such, every gate has two properties, `powerupsRequired` and `powerupsOptional`.

When gates are placed, they collect all those powerups in a big list. They place the required ones. And only if there's enough space left, we start placing optional ones.

{{% example %}}
The gate that is just an empty hole can only be passed if your player is small enough. As such, the "shrink" powerup is _required_. The "grow" powerup is merely related, an extra obstacle for the player to avoid, so it's optional.
{{% /example %}}

_How do we place them?_ At first, I calculated the full area from this gate until the last one seen on screen. This meant a powerup for a gate could be placed three, four, or more gates in the past! Which is really hard to play. 

Instead, I now calculate the area between this gate, and the one before it, or the one before that. That's the area in which powerups (both required and optional) are allowed. It's way simpler to play, but not too predictable. (Like: the exact powerup you need will always spawn 300px before you get to that gate.)

When the player overlaps, you grab the powerup, it does its thing, then removes itself.

### Fast custom option selection

I tried a new approach here. (Well, new in the sense that I hadn't tried it in JavaScript before.)

Usually, I create one huge `switch` statement (or chain of `if-else` statements) that checks the powerup type, and executes what is needed. I don't like this. It requires lots of syntax, and indentation, and that statement always grows much more unwieldy than you'd like.

Instead, every powerup is simply a function I defined for it. And when a powerup is grabbed, it calls that function (which has the exact same name). This function contains all the custom code to execute that specific powerup. 

Very clean. It's even faster during run-time. (Instead of all this extra syntax and stepping through a long chain of options, the code is literally one exact function call.)

Not that I need to worry about performance at all with these hypercasual simple games xD But it's still nice. (Who knows, maybe the game grows to have 1000 powerups!)

### An important note

It's a bit more complicated than this. For example, let's say a gate requires you to face _up_.

Well, how many steps are needed? How many rotations? This depends completely on _how your player is rotated now_ and _what's between them and this gate_. (Maybe there's an earlier gate that requires a different orientation, screwing with the whole system.)

I decided not to calculate this precisely. It's possible for this gate, but clunky. It's simply impossible for more complicated powerups.

Instead, I leave some margin of error, some safety. I spawn a few more rotational powerups than I _think_ are needed. I make it slightly more likely that one gate has multiple ways to pass through. I enable one of those more "general" powerups early on.

This way, the game has a _tiny chance_ of creating a situation in which you---as a player---just could not win and it's not your fault. But it won't feel unfair, because the game always does its best to provide you with ample opportunities to win.

## Minimap

This isn't that special. It polls the gate, powerup and player spawners for the locations and types of what's inside.

Then it loops through and ...

* Displays the gates as large dots/circles
* Displays lines in between that show what powerups are there
* Displays where the player currently is

Some boring code. But necessary for the game, of course! As you _need_ to be able to look ahead and plan what powerups you want.

I also added many configuration parameters, mostly to turn things on/off. For example, showing all the powerups is a bit messy, as there just isn't enough space. Maybe some powerups or situations would _hide_ the minimap. (Yeah, that's actually a cool idea. When you turn your lights off---as, you know, you're a firefly---the minimap also turns off.)

@TODO: IMAGE OF MINIMAP?

## Let's play the game!

Oh wait. This is the point where I discover a few obvious things I've forgotten to implement or consider.

What happens if the player falls off the screen? In a game this tough, do I really want to instakill you? 

My original mockup showed a few spikes on the floor and ceiling. In the end, I decided to test two ideas:

* The floor/ceiling are just solid bodies that *stop* you from going off the screen. (The spikes might come later, or other elements there, I'm not sure.)
* You wrap around the screen.

### Multiplayer?

How are we going to implement _(local) multiplayer_? If I just instantiate all players on the same location, they will overlap, it's a mess, and what's the point of playing with multiple people?!

Instead, I added space between players. This means that the one in front has way less reaction time, and must mostly be a "guide" to the ones coming after them. How? This was a tough one. After a good night's sleep, this was my idea:

* There are special powerups ("crates" or "treasures") that only appear in multiplayer.
* Only the player(s) in _front_ can open these, by flying into them. 
* This will uncover a powerup that's most likely useful to the player(s) in the _back_.

Additionally, the minimap shows less (it's up to your coplayers to inform you about what's coming), and players in front can pass through any gate without issue. They only die if they hit a solid block.

As a matter of fact, lives are _shared_. It's an obvious solution to a problem that's been nagging me all this time: "how do you play a local multiplayer game where players die to lose, without players often dying early and being out of the game for 5 minutes?"

Well, that's the solution. Sharing lives. It increases the cooperation (nice!) and it means most players will keep playing until you lose _together_.

(It does mean perhaps a single moment of confusion. The first time players realise that they don't each have "1 life" or something, but a shared pool. For example, playing with 4 players, you might start with 6 lives or something. That doesn't mean everyone has 1.5 life on their own :p)

### Lack of space

Once all elements were inside the scene and moving around, it didn't take long to realize many things were too big and I needed more space. The UI/minimap should be smaller. The player should start smaller. And I'm not sure if I want to support 3-4 players anymore, due to the lack of space.

I was a bit annoyed by having to type specific sizes everywhere. So I learned a great way to improve this workflow:

* I added a `defaultSize` value to my global configuration
* And _everything_ uses that value, but perhaps multiplied by something (usually easy numbers like `0.5` or `2.0`)

This saves code and energy. It also leads to more visual consistency, actually, because everything has simple proportions related to each other. Don't know why I didn't see this when I made my first game.

I made most things smaller, and the game became cleaner and playable.

Additionally, at first the map scrolled _slowly_. Because a fast scrolling map was just too overwhelming. But that was boring. It felt like playing a game on (heavy) slow-motion, like you're being held back all the time.

Instead, I made scrolling quite fast, but increased the _distance_ between two subsequent gates considerably.

### Lights & Troubles

Phaser has built-in light support. But it's ... glitchy and barebones.

It didn't work on solid (colored) rectangles. Which I used a lot in this game: the background and the gates.

It only worked on things that had a *texture*. But I couldn't turn the rectangles into sprites! The reason they are rectangles, is so I can dynamically resize them to any width or height.

Then I discovered the `TileSprite` object. It does what you expect: it tiles a sprite to fix the available space.

So I switched all rectangles to some simple tiled sprites. It improved the look of the game considerably. So, a blessing in disguise.

Additionally, Phaser has a max number of lights, which is quite low (10). I didn't know this. I spend 30 minutes wondering why on earth my lights were suddenly turning off, turning on, turning off. Until I realized it only happened when a new light was added or another one removed, when above 10 lights. Fortunately, you can set any number in the Phaser configuration.

I'm still not sure what the role of lights will be. Is the game completely dark except around the player? (So you literally _cannot_ see the rest and need to use the minimap?) Do powerups have a small light to illuminate them? Attaching the light to players makes them a bit ... too bright, what to do about that?

But, at least the system was now implemented and functional. In a game called "Firefly Dungeon", it feels like lighting should just play a huge role.

## Can we play now?

Finally. We've restructured and generalized the code into nice modules and spawners and stuff. We fixed all the nasty bugs and issues with this system.

We can play.

(Usually, you want to play much earlier. It's just that it took very long until the prototype was "playable" for this specific game. Because of all the other stuff going on around it, and me repairing stupid decisions because of my lack of JavaScript knowledge :p)

Is it fun? Yes! It's just flappy bird, but with more safety from falling, yet more strategy when flying

These were my observations:

* The rotation gate is quite hard. It would be easier if _two_ rotations were valid. And then it's easiest if those are opposite rotations: so either you need to be _horizontal_ (0 or 180 degrees) or _vertical_ (90 or -90 degrees).
  * I ended up creating two rotation gates: a double (easier, appears at the start) and a single (you must have _that specific rotation_, which is way harder)
* Similarly, having many different key types is overwhelming. (Both for the player and my code.) Instead, the variety of key shapes progresses over time. (At first, you can have only one type of key. When you've been playing for a while, the options increase.)
* There's no space for 3 or 4 players. So keep it at 2 max.
* The multiplayer idea works somewhat. It's not _great_, but also not _bad_.

Mostly, I feel like you still don't look at the minimap a lot. But maybe that just has to do with finetuning and adding more difficult gates. Because the game currently has quite random values for everything and only implements the first gates I could think of.

### Just use the same icon

As usual, when I try something for the first time, I was being stupid. I drew

* An icon for gates
* A completely different icon for the powerup that belongs to it

For example, the "breakable" gate can be passed if you're strong. I drew a shield for being strong ... and a bunch of loose bricks for being breakable. Sensible, yes. But just showing a shield on the gate immediately clarifies you can break through it _with a shield_.

This should just be the same icon. It helps understand the game immediately, there's no reason to make this confusing.

### Building the skeleton

Most of my time was still spent building general components, libraries, etcetera I could re-use in every game after this. I honestly didn't put much effort into making _this_ game great and unique.

{{% example %}}
I added some components I felt were missing in Phaser. Like, collision exceptions. Once I wrote a simple component I could attach to any entity that could track temporary collision exceptions, my life just became a lot easier. Most of my time is spent figuring out general stuff like that that I _know_ will be extremely useful in the next games.
{{% /example %}}

So, the game works. It looks better than it actually is :p But this is where I stop.

## Conclusion

Another game done! Now we can move on to things that are _not_ flappy bird clones.

As promised, I will talk a bit more about how I improved my general template for future games. It took a lot of work (and research into modern practices for JS), but it really saves a lot of time and headaches in the long run. But this is very technical talk. About things any JS developer probably already does in thier sleep :p Skip it if you want.

## Technical: how to improve code structure

When I started this game, there were some annoyances I kept encountering with Javascript and Phaser. With the current structure of my "hypercasual template", I think I fixed most of those.

### Configuration & Parameters

**Issue 1:** I don't like passing separate parameters to a function/constructor. It means I have to remember the order, it means a long line of code. I much prefer passing _one_ variable into a function, which is an object with some key-value pairs.

The issue? You often want each of those parameters to be _optional_. And to have some default value if they aren't present.

My solution? Any time I use this, I create one object with all possible keys and their default values. (This is also really useful in terms of documentation and knowing what you _can_ pass into the function.)

Then, when I run the function, I _merge_ the default and the given input. (I found a deepMerge function online. `Object.assign` doesn't work for nested properties.) The input overrides the keys it has, otherwise the parameters stay the defaults. And then we use that for the rest of the function.

This is how I handle the global configuration for each game. It can have many parameters (enabling debugging on specific systems, changing physics parameters, changing input settings or tutorial images, etcetera). I don't want to copy-paste them all. Or write code to "check if key exists, and only if so, read it".

So I created a "GlobalDefaults" object. It has all keys and their default values. Each new game project can simply _merge_ this with a new object, which overrides whatever it wants to override.

{{% remark %}}
I only do this where needed. Many functions need no parameters or only one or two, never more, in which case this is overkill. But that "general spawner" I explained at the start uses this. Because spawning can be done in many ways (scroll? place at intervals? place automatically? keep a minimum distance?), so it has one `params` object of which I can easily override the defaults.
{{% /remark %}}

### Modularity

**Issue 2:** modularity. JavaScript, and Phaser (3), used to be rooted in the idea of big Classes and Objects. As I already explained, defining entities through modules or components that _do_ one simple thing, is a way way better approach.

But because I'm working against the language here, I need some easy glue. I need some "component manager" (that handles adding, removing, checking, updating components). But I don't want to write a few lines of code _for every entity_ to add this manager as a child object in some variable.

That's when I discovered **mixins**. With one simple line of code, you can transfer all properties and functions from one object _directly_ onto another class

So, my component manager is just a regular object with some functions like `addComponent(name,comp)`.

My entities can be ... anything!

All I have to do, to build them with components, is 

{{% highlight JavaScript %}}
Object.assign(SomeClass.prototype, ComponentsObject);
{{% /highlight %}}

TypeScript doesn't like this, though. As it doesn't _know_ that all this functionality was glued onto the object.

To solve this, I defined an `interface` for the Components object. One that tells TypeScript which properties and functions it has, and of what type.

Then I also create an `interface` for the class I'm extending. In TypeScript, you can just supply multiple classes or interfaces that another interface extends. So I write 

{{% highlight javascript %}} 
interface Entity extends blabla, blabla, Components {};
{{% /highlight %}}

And now TypeScript is perfectly happy. It knows the functionality from Components will be part of that Entity, so we can use all that without it being annoyed.

One last note: I had some doubts about how to check if a Component existed or was valid on some object.

At first, I implemented it on the Components manager itself. Anytime you accessed a component, you'd use something like `callOnComponent(name, functionName)`. The manager would just do nothing if the component didn't exist.

But I didn't like that.

* It fails silently, which isn't great.
* It means all those calls and reads go via _strings_. Which destroys any help TypeScript could give you. And leads to less readable / easy to debug code.

Instead, I flipped it on its head. Any piece of code that relies on a module being present, will guard against it. At the top of that function (or call chain), it checks: does the module exist on this entity? If not, log this and stop immediately. (Otherwise, continue without issues.)

* This is _explicit_. The code explicitely shows that it relies on that module being present.
* It cannot fail. If we pass the guard, we are _sure_ the module is valid, so no crashes or undefineds.
* The code itself becomes more readable, because we can directly access modules and call functions on them. (No strings attached!)

In practice, this meant I only needed to guard a small set of code blocks. Which means the advantages outweighed the disadvantages easily.

### Global functionality

Let me remind you that all this _modern_ JavaScript stuff is quite new to me.

So yes, only while working on this game (and the end of the previous), did I discover how powerful the module system is.

For the first game, I did everything ... the only way I knew how. I created big objects. I registered them all on some global variables. Then I used those global variables to access things across the whole project.

Bad idea, of course. Instead, the modern module system allows you to make everything into tiny files, each doing one tiny thing. And when you need it, you just type its name, let your IDE import it for you, and you have full access to it.

So, previously, I'd have calls like this everywhere:

{{% highlight javascript %}}
global.systems.powerups.doSomething();
{{% /highlight %}}

And any class I needed was defined _in the same file_ as where I needed it.

But now I know the better ways. 

* Put every class inside its own file
* Place `export default` in front
* Now you can just use the class (to create new objects) anywhere else! (If your IDE is good enough to recognize the name and `import` it automatically.)

And what about those big classes? Like a "powerups manager" responsible for doing _everything_ related to powerups? Then we only need one, which is called a _singleton_. (I already knew this, I didn't know how to do it in modern JavaScript.)

The only change is that you instantiate one object of your class first, and then you export _that_. This single instance can then be shared, used and modified across the project. Again, simply by typing the name anywhere (and letting it import).

This made all the code way shorter, more readable, and more flexible. The games are now small files that are easy to read and use.

But, of course, beware. Globals are dangerous! Allowing multiple things to access and modify something is dangerous!

So this was, again, good practice for programming well.

* When possible, _don't_ make something global. For this game, there are only _two_ global singletons, and even then I think I could've gotten away with only one.
* Encapsulate functionality. Don't let other parts modify or read data directly, only through functions with a clear single definition (input->output). And those functions can then ensure that no weird stuff happens.
* By using mixins and modules / components, you can remove almost all the need for big classes or shared global states. (I renamed them to _components_ at some point, to avoid confusion with modules in JavaScript.)
  * As in, you don't need one big "Players" class that is responsible for updating all players. Now you just give each player a Movement component that updates itself, and voila.
* If I want to make calls across the project, I use _signals_. (In this case, I use Phaser's Event Emitter.) This is a loose coupling: anyone can send a signal, and anyone can listen. It doesn't matter if something is removed, or nobody listens, the system will never crash or do something unexpected.

I cannot _wait_ for Phaser 4 to remove the need for my "glue" and "hacks" to make things more modular! But until then, these games are actually very good reminders / practice about programming principles (and project structure).