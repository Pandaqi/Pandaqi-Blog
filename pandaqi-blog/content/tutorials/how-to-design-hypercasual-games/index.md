---
draft: true
title: 'How to design hypercasual games'
tags: ["tutorial"]
date: 2023-01-01 12:09:32
---

For several years now, mobile games have been the _most downloaded apps/games around the globe_. (Here's [one of many statistics articles](https://venturebeat.com/games/app-annie-consumers-downloaded-14-3b-games-in-q3-including-3-6b-hypercasual-games/) about it.)

Among them, the biggest segment were _hypercasual games_.

I like developing unique games and intricate experiences. I also like my games to be played. (And a roof over my head.)

After much resistance, I decided to throw away my reservations about hypercasual games and dive right in. How do you design one? How do you monetize them? How can I make the best of the current clear market demand?

The past year, I've gathered ideas for hypercasual games, and now I'm slowly prototyping them all.

In this article, I want to share what I've learned. I want to answer all those questions about hypercasual games. So I can create great games that many people want to download/play. And generate enough revenue from that to make a living.

## What is a hypercasual game?

To be honest, the line between "hyper"casual and casual isn't clear. This article is talking about both, really. Gamers certainly don't care.

These are the properties of a casual game:

* **Instant play**: no setup or tutorial needed 
* **Short sessions**: so you can play them when waiting on something for a few minutes, so you can quickly stop a session when something interrupts you
* **Small and performant**: they should be quick to install and run fine on basically any device
* **Universal and intuitive appeal**: this usually comes out through colorful art styles and a theme that appeals or explains the mechanics. (And the fact that there is _no text_ or only a handful of well-known English words.)

That's the casual part. You can start easily, stop easily, don't need to invest lots of time or storage space. It's like the game can be played "on the side" or "just when you feel like it".

A hypercasual game simply takes this to extremes. This usually comes out in these properties:

* **One button**: only _one_ button or interaction is taught or required
* **One mode**: you do one thing and one thing only. There's a simple action-objective loop that is very short and endlessly repeats.
* **Liberal monetization**: the game is free and you can play perfectly fine without paying. Often you only watch ads if you want something extra or want to unlock bonus content. (Of course, a paid game, or one where you're constantly clicking away ads, has as much higher barrier of entry.)
* **Progression**: the game loop always starts very easy and forgiving, but as you continue a round/level/campaign, it becomes harder and harder until you're certain to fail

This also explains their popularity. The barrier to entry is so low it isn't even visible. The rules are so simple and streamlined they aren't even consciously taught. At the same time, you can always keep playing, because of a scaling/progression that scales with the player.

To be honest, that sounds a lot like ... _just good game design_. That's why I also wanted to practice more with developing casual games. I actually think this is _the_ way to go for newer game developers. Create 10 truly hypercasual games, maybe even 20, before going to something bigger.

## The tools

What tool is most suited for quick _mobile_ or _web_ game development? What tool is most suited for Hypercasual games?

I have experience with most game engines. That turned out to be a huge advantage. 

* My favourite engine, **Godot Engine**, wasn't ideal. Its export to HTML5 has some glitches and leads to quite huge file sizes. Its export to Android is too slow on my old computer.
* Unity and Unreal are even worse. (Much bigger and slower than Godot. These usually add loads of boilerplate and extra files to each project, which you don't want. Prototyping casual game ideas might lead to hundreds of tiny projects.)
* Solar2D, Gideros and Löve2D are fine, but simply too basic and lacking good support for modern features. (It takes a while before they are updated. Exporting to android, for example, is more involved and manual than with other engines.)
* Defold is fine, but I don't like requiring to be online and using servers to _build_ something that's completely local. I also don't have that much experience with it.
* I considered even more, such as Bevy (a Rust game engine). But I think the ones above are most well-known. (Also, Bevy has no proper export pipeline setup yet for most platforms, so no good.)

The best choice turned out to be **Phaser**. 

* It's an HTML5 framework. So games made with it can be quickly tested and played in the browser, even on my crappy old hardware :p
* This also leads to quick prototyping and almost no setup or downtime.
* I know JavaScript/website code really well. 
* I feel that web games and web monetization are even more the future. (This is speculative. But I think, in ten years, the vast majority of games created and played are web games in some form or another.)
* There are several popular wrappers (Electron, Cordova, ...) in which I can just drop my final game to get an app/executable.

Really, my only complaint is that Phaser 4 isn't ready yet, even though I really want to use it. Phaser 3 + Typescript it is.

## Generating ideas

I learned these techniques for generating ideas:

* Look at existing popular mechanics. Try to combine or repurpose them.
* Find universal and appealing themes. Try to convert those into gameplay.
* Look at tasks most people will do every day. Try to put a twist in them so they become a fun game.
* Look at more complex game ideas (maybe your own old ideas) and try to "casualize" them. See if you _really_ need four buttons. See if you _really_ need an upfront tutorial or 10 puzzle rules.

### Popular Mechanics

**Timing**: Some (UI) element is automatically changing or moving between states. When you _tap_, its current state is locked in and used for your action.

**Flipping** (mostly known as "Turning"): You automatically move in some direction or do something one way. When you tap, this reverses to move in the opposite direction.

**Dexterity**: the rule of the game is extremely simple. But it's about how fast and precise your fingers are. Usually there are only two options: tap left or right (or swipe left/right). Under very tight time constraints, pick the right one.

**Endless** (also known as "Rising/Falling"): the arena is endless, either horizontally or vertically. You simply need to get as far as possible. (And usually, some part of this is automatic. Like, Flappy Bird automatically moved from left to right.)

**Gravity**: speaking of Flappy Bird, gravity mechanics are really common. Your character automatically falls. Tap to go up. Might also mean _other_ things are falling down and you need to catch or avoid them.

**Swerve** (or "Runner"): a variation on endless. There are multiple lanes. By swiping or tapping, you must constantly pick the right one (with the best powerups or without obstacle). Usually this means swerving left/right on a race track of some sort.

**Merging**: combine multiple things into one (new/stronger) thing. A similar mechanic uses patterns (like Candy Crush), though doesn't necessarily merge them.

**Growing**: a very intuitive mechanic that automatically *scales*. You start as a small character, but you can grow (usually by eating). Try to get as big as possible. Think of Snake or that game about eating fish as long as they are smaller than you.

**Stacking** (or simply "Physics"): a game about placing objects, usually without them falling over, or to get the highest tower. Because the physics engine handles this, they are easy to make, yet provide endless variety (because even a pixel difference might mean your stack topples over).

In general, these _genres_ are most popular:

* Puzzle (self-explanatory)
* Action (which is basically anything where you're playing in real-time with constant inputs)
* Simulation (mostly idle games, which only have numbers and you can click stuff to get even bigger numbers)
* Sports (things based on real-life sports or activities always do great)
* Match (the Candy Crush genre)

Some other genres are even more popular, but I don't count them under (hyper)casual games. 

* RPG (anything where you play as a character through a story, or a world, where you can level up and gain experience)
* Strategy (easily too complicated to be casual)
* Casino (self-explanatory)

### Universal themes or tasks

This aspect is often missed. It's crucial.

The biggest market for these games are middle-aged women (and up) and (young) kids. With a few fathers or young adults thrown in there.

Do you think they will play a game about zombies? Or a shooter? Or one about complex mathematical puzzles? No, they won't. (They might be amazing games. But we're looking for hypercasual and mass appeal, that's our focus.)

Look for something that all these people are familiar with.

* Food, specifically candy or other "favourite foods". Also the act of preparing or buying it.
* School or (office) work
* Animals, especially cute animals
* Travelling
* The challenges in daily chores (like doing the dishes or drying the laundry)
* Building or playing with "toys" of some kind. (These can be literal toys, like lego/wooden blocks. But any unique object with which you can play around could be called a toy.)

A game is nothing more than a challenge. If you can find a challenge that everyone is familiar with, which is inspired by real life, your life as a game developer suddenly became a lot easier.

(Of course, a game focuses only on the _fun_ part of a challenge. It shouldn't be too much of a challenge. It shouldn't copy _every_ aspect of real life. Only the most fun parts. And if that means changing the rules or ignoring logic, go for it.)

For example, the game Overcooked has extremely wide appeal and has seen huge succes. It's literally a stressful game about something most people will do every day: cooking. But because of that, it appeals to anyone, it feels intuitive and natural. And it only adds the _fun_ bits, not the annoying ones.

### How to simplify more complex ideas

Simplifying has only one step: _reduce the amount of information to communicate_.

This can come from any aspect of the design:

* Objective => check if the objective has too many caveats or words (which means it's not intuitive enough)
* Inputs => reducing the number of buttons (or what they do)
* Rules => reducing how many rules are in the game or how many words it takes to explain them

The benefit of video games, though, is that many rules _don't need explaining_. The game just does it for you. 

As such, I learned to mostly turn ideas into **one button games**. This automatically forces you to simplify the rest. A game idea starts with **input**, so simplify that, and the rest follows. (Input/interactivity is what defines a game. Without it, it becomes an image, or a video, or a book.)

And you can always hidden rules and ideas---never explained to the player but crucial nonetheless---to make the game more interesting or balanced.

So how do we "one-buttonize" a game? :p

* Identify the most important action. Make this **automatic**
* Identify the second most important action. Bind this to the **button**!

What if we want more actions? We realise that a single button can be utilized in multiple ways. (When I say button, I mean both keyboard keys and screen touches. It works everywhere equally.)

* A button can be **pressed/released**
* A button can be **held**

What if we want more actions? We realise that the *context* in which the button is pressed can change. For example ...

* Pressing a button when the character is **on the ground**
* Does something different than pressing that button when you're **in the air**

What if we want _even more_ actions? Design the context, the map, the environment to _automatically_ lead to these opportunities. For example ...

* In many games, one button only allows movement in one axis. (So, you can only control your character from left to right.)
* How to add the other axis? How to allow your character to go up and down?
* Well, add trampolines to the _world_. Walk over them, which you can easily do with your one button control, to go up.

See what I mean? With tips and tricks like these, you can turn _one_ action into a way to control the game in _many interesting ways_.

So write down any idea you have. No matter how complex or out there. Then see if you can use this process to _turn_ it into a hypercasual game. Most likely, you can, by being smart with your rules and your context.

### How to achieve progression

This is the last crucial aspect.

A game that allows instant playing and one button control, will inherently have a very basic and quick game loop. This quickly becomes repetitive. Especially as player skill improves.

So you need a progression system to keep it fresh and challenging.

This is easiest with **highscore** (endless) games: scale certain parameters based on score or time played. For example, the speed of the player is bumped up slightly for every 50 points. The probability of bad powerups increases slightly every minute.

I found _score_ to be a better progression metric. Because the timing of your game might change a lot during development. Players might simply take more time to do something. Score is clearer and more consistent.

In some games, you might want to _cap_ this at a maximum. For example, physics-based games will go insane if bodies are moving too fast. Prevent that mess.

With **level-based** games, progression comes from the campaign. Each level should obviously be slightly harder than the previous. 

Additionally, you can add bonus challenges to levels. Many games do this. After beating all levels, you can go back to the start and beat level 1 again, but now in a _different_ way to get a different award.

Most importantly, I feel this is something to keep in mind from the first line you write for the idea. Progression and scaling is crucial to make an---on the surface---stupidly simple idea work as a fun game everyone wants to play.

### Conclusion

Hopefully, this gave you tools to generate many strong ideas. This is what I learned and what I used to get ~50 unique game ideas.

Not all those ideas are equally strong. Or equally "finished". I often write stuff like "@TODO: Needs a strong theme" or "@TODO: Missing a way to simplify the control for X".

Which means I have three folders: "complete", "needs work", and "sketch".

## Monetization

For hypercasual games, I see these options:

* Sell your game to a popular web gaming website. (I was lucky enough to be approached by one, otherwise you have to convince them on the strength of your games.)
* Implement web monetization. (There's a dedicated Phaser plugin for that.)
* Distribute the game only as a mobile game and add _AdMob_. (Again, enough support/plugins for that.)

I've tried many different ad suppliers or monetization systems before, none of them really worked out for me. Only what I describe above has some real value, in my opinion.

The technical side is relatively easy.

The practical side takes more thought. With each idea, I added a heading "Monetization" and wrote down the ways in which it could work.

This is what I've learned:

* Adding permanent banners does more harm than good. It slows down your game. It makes it look ugly. It takes up space you probably need.
* Interstitials and rewarded videos have a pretty good payment rate. But you obviously need to entice players to use them.
* It depends on the game how you can give "bonus content" while not annoying the players who don't want to see ads.

For highscore games, these techniques are common and useful:

* A "keep playing": watch an ad, return to your existing run and highscore. (If you do so, make the game easier for the player the next 30 seconds, so they don't die again immediately.)
* A "head start": allow buying or using items to get some better setup for the next run.
* A "double your reward" ad: watch an ad to double your highscore, or something else that people will always want. (Very effective, seems underutilized.)

For level-based games, 

* Require watching an ad to unlock the next world, or set of levels, or mechanic. Some people complain about this, but most think it's fair. This is their "payment" to get more content.
* Watch an ad to get a hint, an undo, some immediate help in the level. (Mostly used for puzzles, as you'd expect.)
* A "skip level" ad: when a player is struggling, spending some time on a level, make a button appear that allows skipping it. (Also very effect yet underutilized, usually in favor of a "hint" button.)

For all types of games, I think a store can work. One where you sell things to make the game easier or more fun, but also one where you simply sell cosmetics. 

Here, "selling" can mean anything. Watch an ad. Spend money, which you might earn by watching ads. Spend credits you automatically earn by playing.

In the end, I built a unified system that I could drop into any game prototype to accomplish this. Because there are many similarities, as you saw above.

I **don't** want multiple currencies. I **don't** want real money involved. And I **don't** want an "energy system" or anything like it.

There are ways to make hypercasual games without venturing into shady practices that do more harm than good. Let's focus on good game design, where income comes from people who _choose_ to watch ads for some nice bonus content. 

Don't guilt trip people. Don't make them addicted. Don't make them spend real money. Don't try to put your game into their heads 24/7, by saying things like "your lives have regenerated, play now!"

## The special sauce

Before we start copying Flappy Bird and friends, we need to ask one more question.

_Why would players play our hypercasual game, when there are thousands of others doing the same thing?_

Find your unique selling point. 

For me, it's multiplayer. I've always made (and played) local multiplayer games. I've experimented a lot with it on phones as well, giving me the experience to pull this off.

A second unique point is that I often play on keyboard and controller. So those are also supported. But it's less important.

A third unique point is my outlook on game design. I seem to be scared of copying _any_ existing idea, and only get motivated by being extremely innovative and challenging myself (a bit too much). This isn't always a good thing. But it leads to ideas that are more "out there".

As such, almost every casual game idea I have, allows playing with 2-4 players as well. And it allows playing on desktop and with controller too. And it has something that's quite unique.

This is a niche idea. Many people won't notice or profit from this. But it is _my_ special sauce, it's what makes _my_ work and game studio unique.

Find your unique selling point and infuse all game ideas with it.

## Let's get started!

Each of these games has their own dedicated devlog. Those are way more in-depth, describing every mistake, change, version, often even with code. This article references that and summarizes what you need to know.

I will quickly go through each prototype. Why I chose it, what went well (and what went wrong), lessons learned, etcetera.

## Flappy-esque

I started with three ideas based on Flappy Bird. I know, I know, but it's a good place to start. It meant very simple games to make, which means we can quickly learn a lot about hypercasual games.

### Firefly Dungeon

What's the twist? The columns are _gates_. You are a firefly trying to get in (or out, doesn't matter) a dungeon.

Gates can have requirements. As you fly, you not only need to pass through the openings, you also need to grab (or avoid) the right things to match the requirements.

The main requirement is simple: the gate shows an icon at one side. The player has a similar icon on their body. These two need to match ( = point to each other).

That's all. Let's tick our boxes:

* One-button: yes, you fall automatically, tap to go up
* Endless: yes, I can just keep adding more columns to the right, highscore objective
* Progression: yes, you go slightly faster and get more difficult powerups over time
* Theme: fireflies are pretty and well-known, same with dungeons (though not an amazing theme, granted)
* Intuitive: at first, it wasn't really. But I improved that by theming the matching patterns as "key and lock".
* Monetization: a "keep playing" button, unlock new fireflies through an ad

@TODO: GIF/VIDEO/LINK TO DEVLOG

Or read the [full devlog](../../videogames/casual/devlog-firefly-dungeon/).

### Skyscraper Sun

What's the twist? You don't control the bird, you control the columns coming towards it.

The new column will grow skyscrapers. Tap to stop growing at their current height. This way, you control how big the gap is.

You are rewarded for growing skyscrapers _very close to the bird_. (Otherwise you'd instantly stop them from growing, obviously.)

Let's tick our boxes:

* One-button: yes, same
* Endless: yes, same
* Progression: the bird can move faster, but growing can also happen faster, and later on there might be stuff growing from both above and below.
* Theme: not amazing, but the skyscraper part is quite useful. (They grow tall and they end in the air, where our character is.)
* Intuitive: growth is intuitive, and our character is something expected to float randomly through the air, so yes
* Monetization: same

@TODO: GIF/VIDEO/LINK TO DEVLOG

Or read the [full devlog](../../videogames/casual/devlog-skyscraper-sun/).

### Spike Zone (@TODO)

What's the twist? This one already goes off track. You are locked in a cage, instead of moving endlessly to the right.

Spikes appear on all sides. Hitting a wall (safely) will cause it to regenerate to something new. This is how you move left <=> right until you die.

Let's tick our boxes:

* One-button: yes, same
* Endless: yes, as you're locked in a cage and always stay moving (horizontally), this can continue endlessly
* Progression: more spikes appear, you go faster or jump less controlled, more powerups might appear midway that throw you off
* Theme: not great, to be honest, but I had nothing better. This is a case of "mechanics" over "visuals/theme".
* Intuitive: yes, we all know how walls and cages work, and that spikes/triangles indicate danger
* Monetization: same

@TODO: GIF/VIDEO/LINK TO DEVLOG

Or read the [full devlog](../../videogames/casual/devlog-spike-zone/).

## Where are we now?

These ideas already ended up more complicated than I wanted. It is _so easy_ to overcomplicate things. You see a game is unbalanced, or not unique enough, or lacking something, so you _add_ an idea. Before you know it, your hypercasual game has many rules, mechanics or powerups.

So let's keep that in mind from now on. Keep it even simpler.

Besides that, I think these games are surprisingly fun. Even though they are simple and not that unique, they hit our key points: easy to play, a scaling challenge, an intuitive way to play endlessly, highscores always bring out the competitiveness in people.

It's simply impossible to judge a game idea before making it. Almost every hypercasual idea I had felt like it was "too easy" or "boring" or "cliché". But actually making them often changed this view.

At this time, I was also in contact with a HTML5 games website about whether they'd like to buy these concepts. They responded the games were fun, _but_ other genres / game types were much more popular. They recommended I create some prototypes for those.

I was inclined to at least try their advice. Because, in the end, I want my games to be played, and I need income to survive.

{{% remark %}}
At the same time, I wrote down all my other options. Self-hosting, putting the games on Itch, focusing on mobile, other HTML5 websites, and so forth. Because this proved to me that at least 50% of my ideas is just too risky or too different to sell.
{{% /remark %}}

## Tower Defense

A popular genre, indeed. However, I do not like games with a lot of clicking and menus. (I'm pretty sure none of my games the past 5 years can only be played through clicking.)

We are doing _simple_ games and _one button_ games. So the question became: how do we one-buttonize tower defense?

In the end, I found a few cool options.

### Throwaway Towers

There's a castle in the center of the screen. You need to protect it through your regular "tower defense" rules.

But ... you can't place towers the usual way. Not by clicking, not at fixed spots. Instead, new towers circle around the castle, and when you tap the screen, they are shot away. Wherever they land, that's where they'll be.

(When you're not placing a tower, you simply have an arrow rotating around the castle, which you shoot in the same way. This way, you can also be part of the action at all other times.)

Lala @TODO


### Everyone Go There

You control _one_ tower. (This is a great multiplayer idea, as more players means more towers.)

On the screen, a clock shows the general movement direction with arrows. For example: "right" or "diagonally up".

By default, your tower is fixed to the ground and does its duty shooting enemies. When you tap the screen, the tower breaks loose and will move according to the general direction! Tap again, and the tower is fixed again.

Lala @TODO



## Racing

Another popular genre. It's funny. Even when I was a kid, these genres were already most popular and universally played. Apparently, these genres have some natural, lasting appeal.

The advice mostly pointed me to Moto games. A genre I associate with the ancient _line rider_ games :p Or that Bike Race game on Android that was extremely popular for a time.

I happened to have a prototype in that vein, from 10 years ago, from which I could borrow some code. (Not much, though, it was in Phaser 2 and very clunky.)

The technical bit, therefore, wasn't hard. Phaser can draw lines and turn them into physics bodies. The friction between wheel and line automatically makes the game possible. (This isn't as easy as I make it sound, but it's also not like I'm reinventing the wheel here, pun intended.)

But the design bit? Much harder. Moto games usually have 4&ndash;5 keys. (Accelerate, decelerate, rotate left/right, boost or jump).

How on earth do we simplify that to one or two buttons?

* Move automatically in a given direction. (Forward by default. But the level might have blocks that reverse you.)
* Wheels on the ground? A tap will make you jump off. A hold will slow you down.
* Wheels in the air? A tap will jump again. A hold will rotate you.

The genre is quite narrow, so I couldn't invent different games. Just the one. (Variety comes from level design, bike types, etcetera.)

Lala @TODO













## Simulation => might move to LATER anyway?

Let's make some simulation/idle games. This felt like an easier step. Something you can setup quickly and keep small. (Because there aren't many moving parts. It's just numbers and buttons to change those numbers.)

Diving into this world revealed it is _much_ larger than I thought :p With way more fans, options, opinions. 

Playing some of those games also gave me a clear sense _why_ they are so popular. (I used to play some of them, like, 10 years ago. It's been a while.)

Here's what I learned:

* The start is preferably literally _clicking one thing_. Very simple, easy, can't go wrong.
* You should have clear moments where things can be _automated_. Instead of needing to click or setup things yourself, you can now hire a "manager" to do that, or buy a "machine" that does it.
* It has an ending. The opinions are slightly divided. But I agree with that: you can't just endlessly continue. The objective should be to finish the game, although that doesn't mean everyone finishes it in the same way.
* It should have "idle" time. If you close the game, and come back a day later, it should have done stuff in the meantime.
* At the same time, it should be fun while interacting. So, preferably, show _some_ graphics or map, have _some_ gameplay.

Based on that I generated a few ideas.

### Pick your Poison

You're the king of a kingdom. You play until you die ... most likely from too much poison.

You simply get a few options and a few seconds to pick one. Repeat and repeat.

Let's check:

* One button: yes, just click an option
* Endless: yes, I can just keep giving options, and numbers (like how much money you have) can keep growing
* Progression: yes, I can slowly give harder and harder options, or increase the likelihood of "disasters" or something
* Theme: yeah, running a kingdom through making good choices is not original, but it's just a theme that works so well
* Intuitive: yes, the option literally displays what it is, and nothing can go wrong when clicking a button
* Monetization: this was the hardest, until I realized nothing changed :p You can "keep playing" (keep your kingdom, king restores to 50% health or something). You can "get a headstart" (already start with a pretty good kingdom)

It's technically not an idle game, but more a simulation game.

@TODO: GIF/VIDEO/DEVLOG

### Idle Honey

You run a beehive. Bees automatically fly to random flowers and back, generating you points and more honey. Buy more beehives, get even more honey, etcetera etcetera.

Let's check:

* One button: yes, click the option you want to place/upgrade/buy
* Endless: yes, you start with only one thing, and will slowly fill the field more and more. (Although there _is_ a definite end, as you can completely fill the map.)
* Progression: yes, as you get further, you generate _more_ honey/points, so you can buy _even better_ stuff. It should scale nicely.
* Theme: yes! I knew this theme was great when it popped into my head. It feels so natural: growing a beehive, growing a field of flowers, etcetera.
* Intuitive: this also makes it intuitive. Of course you get more honey by having more bees. Of course they need to visit flowers.
* Monetization: I had to look at how other games did it. They mainly used "boosts" (so your production was boosted the next 2&ndash;5 hours), secondary currency (watching an ad gives you some secondary currency you can use), and simple cosmetic changes to unlock (like a new flower field in which to play or a new look for bees).

@TODO: GIF/VIDEO/DEVLOG




## Puzzle => @TODO??

Puzzle hypercasual games are never handcrafted. The puzzles are generated with an algorithm, in one of two ways:

* Design a puzzle system that can simply do random steps, and the user has to undo them.
* Write an offline algorithm (not in the game), to generate puzzles, and pick the best ones to place in your game.

The first one is very easy to code, but constrains what the game can do (a lot). The second one is harder, but has better results. Fortunately, I have experience with the second one. 

I started writing simulations in Java. Now I write them in Rust. It's blazingly fast. It can randomly generate thousands of puzzles and check if they can be solved in _seconds_. Nevertheless, it _does_ take quite some work to teach a computer how to generate _good_ and _interesting_ puzzles for your game idea.

That's why I didn't start with these, but left them for later. I wanted to at least make one game for each category.

I also left this for later, because I was researching doing the full game in Rust. The Bevy engine was looking promising. It'd allow me to merge the simulation and game code, into one tiny package that could both _simulate_ and _play_ the puzzles. But at the time, the Bevy engine just wasn't quite ready yet, and I wanted to focus on Phaser for now.


