---
title: "My Thoughts on Phaser 3"
tags: ["review"]
date: 2024-07-07
thumbnail_media: "phaser_banner.webp"
---

This isn't necessarily a review of the **Phaser 3 framework**, as I think that's not terribly useful. There are so many different workflows, types of games, use cases ... that you can't really "review" whether a game engine works for everyone.

Instead, this article simply contains my brief thoughts and experiences on using it. More specifically, on using Phaser 3 for web and mobile games. In doing so, it helps to know my personal biases.

* I heavily prefer small, minimalist, lightweight tools and codebases.
* I am very comfortable creating a game in code only. (No editor, no visuals, etcetera.)
* I was already familiar with Phaser, creating games back when it was Phaser 2, and using it as the backend for my earliest board games on Pandaqi. (Until I switched to my own custom framework for that.)

_This article was written in June of 2024, using Phaser 3.80._

## Why did I try it?

You can read the start of my [Defold engine](/blog/reviews-and-thoughts/my-thoughts-on-defold-engine) for the normal to silly reasons for trying lots of different web/mobile based game engines.

In short: to try something new, to keep very small builds, to revitalize my AdMob account with ad-supported mobile games.

{{% remark %}}
Godot, for example, can easily export a web game to be 15+ MB. Which is far too much for a small web game that only has one sprite in it or something.
{{% /remark %}}

This one, however, had a few extra reasons.

* I am very familiar with Phaser. I've used it for the early One Paper Games on my games studio website, and before that, I made ~10 casual games in it when I was still in school.
* It just keeps being the most popular and most up-to-date web framework in the world.
* I've grown to enjoy the balance that the TypeScript ecosystem brings. It has the freedom and support of JavaScript, while adding the safety and modular system of TypeScript. This just helps me write clean code fast.

And so, after not using Phaser 3 for a long time, I jumped back in with the most modern set of tools I could find.

* The latest version of Phaser.
* The latest version of VS Code.
* The latest versions of Node, ESBuild and TypeScript.

Phaser 3 provides its own easy template for this (@TODO:Link). I could clone that and start developing on a dev server (that automatically rebuilds on change) within 1 minute.

## How did I evaluate it?

I'm an improviser. Having past experience with JavaScript _and_ Phaser from the, I didn't check out any tutorials, guides, or other help. Partially because I _know_ the Phaser documentation---at least the new ones, not the old ones---are really good and easy to Google if you need it.

I simply collected a list of ~5 very simple mobile game ideas and started making them.

The details don't matter much, just know that they're a wide variety of casual games a la Flappy Bird or Doodle Jump. Simple to make, barebones, but still an actual game that can be enjoyed.

@TODO: Maybe just make repositories public and link to them?

Over the years, though, experience has made my workflow far less "loose" or "cowboy coding", but much cleaner and more principled.

* I take full advantage of TypeScript, making sure everything has defined types and I'm playing nice. 
  * That template has strict checking on by default, so even unused variables or potential nulls are forbidden.
  * This usually means that, once there are no more errors (unused functions, wrong type, etcetera), the game works exactly as intended.
* Everything is modular, preferably in its own small file. 
  * The full TypeScript + ES Modules support here is _great_, far better than anything specific game engines might do.
* Everything is as functional as possible. This means that most functions _only_ depend on their input, not some other global state or variable inside a class.
  * When I first started doing this, thanks to learning Rust, it was pretty hard. It requires some new ways of thinking and finding solutions.
  * But once you get used to it, the only downside I see is that some functions can take quite a lot of parameters---which JavaScript can handle with ease by collecting them into one object. The advantage is that bugs are caught before they ever happen and everything is explicit.

This is important to mention, I feel. Because without that, JavaScript _does_ easily become the wild wild west of bugs and messy coding. Which probably reflected negatively on the Phaser framework in the past, and unfairly so, when I stopped using it because of that.

## What did I like?

### Fast

I don't know how, but Phaser has only become faster over time. I remember some slow loading times, slow scene switching sometimes, low framerates. But whenever I made a change, it instantly reloaded (the browser tab), booted the game, and I could test.

It's also fast when it comes to iteration and development. There is basically no boilerplate needed to do anything. I can quickly throw up sprites left and right (which shows the default texture because I haven't added any assets yet) to debug things at any time. 

{{% remark %}}
Pandaqi Studio now runs almost fully on my _own_ library for drawing and graphics---only the oldest projects remain on Phaser. But I have never been able to make mine as fast as Phaser is at drawing loads of things at once. Thought that's mostly thanks to Pixi.js, the graphics engine behind it, of course.
{{% /remark %}}

### Tiny builds

As expected, a JavaScript framework will output a very small HTML5 game. It's still larger than some actual engines, because Phaser is _huge_ now (and another issue I'll mention later). Even then, a few MB for an entire game is absolutely fine.

Similarly, it's surprisingly easy to turn it into a mobile app (using Cordova, in my case) that is small and fast. You create a Cordova project, set the right settings (title, package name, etcetera), then drop in the files Phaser created, and you're done.

### Lots and lots of helpers

This is probably the reason the Phaser framework is still quite large (when built), but also a reason development is easy.

It contains loads of functionality that you can reuse in your game. And because of the TypeScript system, it helps me easily find the right path to the right thing I want.

For example, _vectors_: one set of 2 numbers, X and Y. 

Making a 2D game means working with vectors 99% of the time. (I see _too many Phaser examples_ that create two variables each time for X and Y of everything! Don't do that!) Phaser obviously has a built-in object for that with useful functions.

But it also has geometry, intersection tests, testing if something is in camera view, etcetera. There are even built-in `EventEmitters` that no tutorial ever talks about, but which are _great_ for decoupling game objects: instead of referencing each other directly, one just sends a signal and others can pick up on it if they want.

This means that I can say: "If you need something for your game, it's probably a simple built-in function you can just call directly."

## What did I not like?

### Extremely object-oriented

This is by far my biggest gripe with Phaser 3. And it's supposed to be solved by Phaser 4, but at this rate, that will release in 2030 or something.

Phaser 3 was originally made when TypeScript wasn't _really_ a thing, and its modular system wasn't _really_ a thing. As such, everything inside the engine are these huge classes with lots of container methods and variables.

That's why the build is still quite large: even if you use only 5% of Phaser functionality, it has to include _everything_. We haven't found reliable ways to "tree shake" inside classes and get rid of any containing methods/variables that your entire codebase doesn't use.

It also means that the module system only works with some of the _high level_ Phaser objects, of which there are only a handful. For example, if I only want some Geometry functions here, I can include `Phaser.Geom` only and nothing else. 

But ... almost EVERYTHING in Phaser happens through the `Phaser.Scene`, so you'll include that everywhere, and it will just include everything else too, so in the end you still have _all_ of Phaser bundled with your game.

Firstly, as stated, this makes builds unnecessarily large and things unnecessarily coupled.

Secondly, I just don't really like the code this makes me write. If I want to add a sprite, I write: `scene.add.sprite(x,y,key)`

This is _simple_, yes. Easy to remember, easy to learn, easy to type.

But it means I have to pass around _the entire scene_ just for this single, more specific functionality. It means I have to write long chains of dots and variables to get somewhere. (This is a simple example, but you can imagine other operations on the scene to be way longer and testing your code editor's line wrapping functionality.)

Ideally, it'd just be a _function_ like `addSprite(params)`. 

* You include that function only when needed.
* The function only includes what _it_ needs, so no more garbage is added to your game. (You don't need to support ALL the `Phaser.Scene` does just because you want a few sprites in your game.)
* And to create a sprite, well, you type what I just typed. Short, says what it does, no long chains.

{{% remark %}}
Obviously, naming and details would be different and need to be researched and tested. This is just a quick example of the general idea.
{{% /remark %}}

Phaser 4 was headed that way, but has been put on hold for years to _keep developing Phaser 3_. I really, really hope it comes around one day and I can code projects in that much cleaner structure. (And probably get builds below 1 MB.)

### Some properties have weird update cycles

This might sound very specific or nit-picky, but it's more important than you think.

Let me explain with an example. I am making an endless jumper, so, I generate the path ahead over time.

* Each frame, I check which platforms are in view.
* If they are out of bounds at the _bottom_, delete the platforms.
* As long as the highest platform is still inside bounds (at the _top_), keep adding more platforms, higher and higher.

Pretty simple code, because the camera has a nice built-in function to check if something is in view. 

It crashes.

Why? Because, as it turns out, the "view" of the camera is only updated during _rendering_, which comes after _update_. In other words, the view of the camera (during an update) is always WRONG, as it's actually the bounds from the _last_ frame.

On the very first frame of the game/app, therefore, the camera bounds are invalid. (As they just have never been set yet.) Which means this code crashes, because it deems ALL platforms out of view.

There is no reason, as far as I can see, to do this. The camera bounds are known and fixed at any time and do not depend on the render step. (It's simply position + rotation + scale/zoom of camera object.)

This happens from time to time. You debug something for 30 minutes to figure out that a specific property or function is only updated with a delay, or when you specifically tell Phaser to "dirty" the object, or something is a shared reference so updating A somehow updates B too, etcetera.

I suspect this is another consequence of the "everything inside huge classes" system that would often go away if you rewrite that more functionally. But alas, this is where we are now. There are gotchas left and right with the specific of how something updates or calculates stuff. And this is a frustrating experience that delays you and happens too often.

### Resource/Asset Loading

To load a resource, as expected, you type `scene.load.TYPE(params)`. For each one.

Most games, though, need a lot of different assets. Typing loads of almost identical lines of code this way, somewhere, isn't the greatest. 

Similarly, the assets _must_ be there for the game to work. If you make any tiny mistake, suddenly your player is just missing and there's nothing that could have prevented that.

Sure, I can write my own code _around_ this to reduce the work, provide extra checks, etcetera. In fact, that's what I did during the _transition_ from Phaser-backed One Paper Games to my own system on Pandaqi. (For a while, to keep things organized, I had middle layer communicating between my system and Phaser. And that system had to convert my _own_ system for loading assets to _Phaser's system_, on the fly.)

But I feel this should be built-in or handled in a cleaner way. 

The creator agrees with me, as one of their earliest examples for Phaser 4 was actually a rewrite of the resource loading. (To something more functional and more clean.) 

## Conclusion

I really enjoyed my time here. 

* Builds work well (in size and structure) for all platforms, especially web games of course.
* _Most_ issues I had with earlier Phaser versions (or workflows) have been taken away by this setup (TypeScript, ESBuild, VSCode). It (re)builds quickly, all types are properly checked, it all just works in a clean way.
  * As stated, my biggest issue is the core structure of Phaser that puts everything into huge classes. It bloats the file size and makes you write bad code.
  * My secondary issue of weird timings and gotchas could probably be said about any game engine, though I feel it's slightly worse here.
* Phaser has only grown over the years, becoming better and faster, including more features. Getting a simple game going happens really quickly, no matter which one I tried. But I also feel somewhat confident you could make much _bigger_ games in it.
* There _is_ an actual Phaser Editor, though I never used it and don't miss it. Most things can be accomplished with one or two lines of code anyway.
* I (perhaps falsely) hope that building experience with Phaser 3 will also provide security for the future, when Phaser 4 rolls around and I expect this framework to still be at the top.
  * This is another reason why I code the way I do: modular and functionally. If a new version of Phaser were to come, I could switch games to it _very easily_ because of how loosely coupled my code is to the inner workings of Phaser. My oldest Phaser games were too entrenched in the specific details of Phaser syntax.

I do recommend adding those safeguards (such as TypeScript and strict checking) when working with Phaser 3. I regularly read code by others made in Phaser and it's a downright _chaos_. Unreadable, impossible to understand, uses 100 lines for what could've been 20.

This isn't a slight to those developers, of course not, it's just a byproduct of working with Javascript + Phaser 3. Both of which are loosey-goosey and somewhat encourage doing whatever you like. 

I remember hours debugging stupid bugs on my old games (even Phaser 2 back then), which were completely caused by this loose style of coding and game management. It's one of the reasons I dismissed Phaser for years, remembering how awful that experience was---like building on quicksand. But nowadays, the foundation feels far more sturdy.

{{% remark %}}
A hidden advantage of this system is that you can create your own library of utilities and re-use them in all Phaser games easily. Because it'd just be a bunch of TypeScript files that you can include wherever needed. For example, I often have random generation in my games, so I have some utility functions for balanced generation of numbers/options/locations inside my `Pandaqi Phaser` library.
{{% /remark %}}

For me and my smallest game ideas, Phaser feels like the best engine out of all that I tried. And I tried a lot: [Defold](/blog/reviews-and-thoughts/my-thoughts-on-defold-engine/), [Solar2D](/blog/reviews-and-thoughts/my-review-of-solar2d-game-engine/), Love2D, Gideros, Unity, [Godot](/blog/reviews-and-thoughts/my-thoughts-on-godot-engine/).

Those were my thoughts for now.