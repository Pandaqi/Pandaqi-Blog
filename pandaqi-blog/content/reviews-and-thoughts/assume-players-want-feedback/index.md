---
title: "Assume Players Want Feedback"
tags: ["thoughts"]
date: 2026-05-05
emoji: "💬"
---

When you develop a game it's common to focus on the _programming_ first. Get the actual game working and functional _before_ adding any art, sound, UI, etcetera. 

This advice is given to all new game developers as well. To create your game using blue rectangles or gray boxes, and only spend time/money on everything else once you are _certain_ about what the game is and what it needs.

It's not terrible advice per se. There are absolutely horror stories about developers spending thousands on art ... that they never ended up using. Or developers spending their limited energy/motivation on creating a nice soundtrack ... only to realize the game idea itself is bad and having no motivation left to make the actual game.

Yes, it's probably smart, most of the time, to _start_ development with _the actual game_.

But I'm increasingly convinced that you really **don't want to do this**. Other developers are fortunately starting to agree with me. A few weeks ago, for example, I saw a first devlog from a professional indie dev team that started with a lengthy explanation of why they _do_ add art/sound/polish very early in projects.

Why?

* **YOU must be motivated to work on your game.** Some people don't care, great for them. But most people are not really eager to develop their game if they're looking at ugly gray screens, unreadable fonts, rectangles for everything, etcetera. If you make your game look decent early on, you can actually feel good about this professionl game you're making throughout development. 
* **Video games are an audiovisual medium.** It's in the name. Video games _are_ their graphics and their sounds. Video games _are_ the thing the player actually sees or interacts with, not the fancy number stuff that might be happening behind the scenes.
* **It helps develop all parts of the game in parallel.** Maybe you have a programming problem ... and then realize it could be solved with different art. Or maybe you had some great idea for the game ... but the art department can instantly show you why it would look ugly/messy on screen. By developing all these parts at the same time, you spot issues much earlier, and you can also draw solutions from _other_ departments. 
* The previous point also relates to **marketing**. If your game has some art early on, you can start showing it very early and get feedback early. If you already need a gameplay GIF after one week, then it forces you to already think about how to market/explain/best show off your game right from the start. Which prevents you from ending up with some completely unwanted mess of a game at the end.

You can stop reading right here if you want. The rest of the article is just some extra explanation, examples, and remarks from me.

_So many times_ I've worked on a game in isolation for a few weeks. I couldn't let anyone test it yet because it lacked the necessary feedback. (For example: if all entities in the game are the same rectangle, and there's a health system but you're not showing a health bar yet, nobody can feasibly test your game yet.) Then, after weeks of work, I finally had a testable game ... and all that work turned out to be useless. First contact with the wild clearly revealed massive holes in the idea that I would've spotted if I had shown the game, with _some_ placeholder art, to anyone after three days.

_So many times_ I've finished a game design with gray boxes and barely any feedback, only to see the game _does not work_ once we have actual art and sound effects! Maybe it shows that there's no space to (comfortably) display all these things on a screen. Maybe it reveals that a certain mechanic or effect is confusing once I try to "polish it". Or maybe it just shows that I could've saved myself a lot of time and effort through a smart art style choice.

_So many times_ I've made a prototype and thought "meh it's not fun, mediocre". But I decided to give it one more day, in which I would add some art + feedback + menus so that I could ask someone to test it for 5 minutes and tell me how bad it is. Guess what? Suddenly the game is a lot of fun! And people like it! Who'd have thought that having actual feedback for your actions and pretty moving images is _more important than the game logic itself_ for video games!?

That's why I started dividing my time equally between _all_ parts of game development. I spend just as much time already adding art, or animations, or sounds, or other polish, as I do actually programming the core of the game or adding its crucial content. 

Whenever possible, though, I prioritize **feedback**. I'm training myself to make it a habit to _always_ provide all the feedback in the world on any new thing I implement. Added a health system? Add the health bar and a simple animation on changes _before moving on to anything else_. I want _feedback_ on exactly what the health system is doing at all times, just like the player would want it, and I want it right now. Even if it feels silly, because the rest of the game does not exist yet.

I try to **assume players want feedback on EVERYTHING**.

This has two advantages.

* It helps me a lot when **debugging**. That health system? Because I spent an hour or two giving myself great feedback about it, I can also instantly spot if there's some error in my logic or in the system. Something that's much harder (or even impossible) to spot without the clear, multidimensional feedback.
* It means the game is already in a **playable, testable, publishable** state at basically all times. Whenever I implement a single thing, I can already show it to people or let them play it. Because they have the _feedback_ that's absolutely crucial to understanding the game and interacting with it.

What does feedback mean? What is "important" feedback, and what is just polish? In general, I think,

* **Changes** must have a notifier. That is, an _animation_ and a _sound effect_ to draw the players attention.
* **Values/Data** must be visible in at least _one place_. (Otherwise the player literally cannot know the thing.)
* **Text** must be readable and on-theme. Pick a nice font, big font size, drop shadow/outline if needed. (Because when you think about it, illegible text is just as useful to a player as no text at all.)
* **Continuous/Subtle** effects should also have a _continuous_ effect. Someone is damaged/low health? Don't just play a _single_ flash animation or burst of particles. Have a _continuous_ animation that makes the enemy flash red, emit some particles, maybe a very soft sound effect.

I think those are the key parts that any feedback must hit: data must be visible somewhere, differentiate between changes and continuous, and the feedback must be actually legible/visible/clear.

Anything besides this is probably "polish" and not needed until the end.

I haven't been applying this idea for very long yet, but I can already report great results. (That's also why I write this article about it!)

* The number of time wasted debugging silly bugs has gone down to near zero. Because every "bug" is completely _obvious_ thanks to the clear visual feedback.
* The speed at which I can get a prototype tested, and thus the speed at which I can iterate and improve and publish, improved a lot.
* It forced me into the habit of picking an art style, theme, fonts, everything right at the start of the projects. Which creates a more coherent vision, early start to marketing, and making it look better (and feel more serious/professional) right from the start.

It's so easy to disregard prototypes or game ideas as mediocre, or not worth pursuing further, when it's just gray boxes against a gray background. When you've only been writing lots of code for five days and nothing else. The game doesn't even have a working title yet.

It's much harder to drop projects willy-nilly or leave them unfinished when you already have something to show. When you already did some art. When it has a title, and it's displayed in a font that you really like. When you thought further than the initial "only coding"-stage.

I know I'm not saying anything revolutionary here. We all know that huge AAA games have a pre-production phase where they figure out art, and marketing, and user experience, and everything _way before_ the programming and the content is done. For some reason indie developers don't take note of this. And we can get away with this, in part, because our games are much smaller and we have smaller teams. We _can_ drop in all the art at some later point, because it's not a lot of art, and we only have a single artist on the team.

I'm just saying that it's probably _better_ to work on all pillars of a video game in tandem. Even when creating a prototype! Because being forced to create _some_ art, to assign _some_ sounds to actions, you're actually spotting problems in your design much earlier and also finding more out of the box solutions.

Games are an audiovisual medium. The game _is_ the visuals and the sounds. The game _is_ the feedback to the player. It doesn't matter how clever your code is, what amazing systems and content lie beneath the surface, it literally _does not matter_ if the player doesn't know they exist.

And so, nowadays, whenever I make _anything_, even for a small prototype, I assume the player wants all the feedback in the world---and I add it before continuing. 

I'm still learning, I'm still missing lots of feedback opportunities, but it's getting better with each game! I can market a new game many weeks earlier. I can let people test a new prototype within a few days, and they can actually play it (almost) like it's a final finished game they just bought on Steam. I can iterate on game design within an hour instead of building stuff and waiting for a month before it's actually functional enough ("has enough feeback") to test.

Hopefully this is useful to someone,

Pandaqi
