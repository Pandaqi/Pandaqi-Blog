---
title: "Pandaqi Games: 2025 Update I"
date: 2025-01-03
emoji: "🎮"
---

This article explains the first major update I implemented for my Pandaqi Games website. (I usually end up having multiple such articles per year, as I slowly fix bugs, make the website more user friendly, etcetera.)

The past two updates I mentioned I was "moving towards" the following system.

* Drop the dependency on the Phaser game engine entirely. (It's way too large and I don't actually need it anymore. As of right now, ~6 One Paper Games use it for drawing their ... one paper.)
* Convert all the old games to the new systems so this is possible. (This mostly means replacing specific Phaser calls like `game.add.sprite` with my own system like `new ResourceImage()`. Very tedious and boring task, but not particularly challenging.)
* Then implement a backend based on `PIXI.js`, because it's _much faster_ in most of my use cases then my own system I've been using until now. 
  * I tested this entire conversion on the upcoming game Magnetmen. 
  * With my own system, it took ~20s on average to generate, during which the browser might hang and ask you if you want to kill the unresponsive page. (This was actually profiled over many runs, not just eye-balling it.) 
  * With PIXI as backend, it took ~1s. Yeah, it's silly how fast PIXI is.
  * (If I change the Magnetman map to size "huge", PIXI is still equally fast, but my laptop crashes using my own system.)

Well, wouldn't you know, the website has finally converted to this system!

## How does it work?

The reason I wanted to implement my own custom system was to make it future-proof and backend-agnostic. In other words, 

* All my games use the exact same (clear) terminology to achieve the exact same things. (Example: Whatever the situation, be it a One Paper Game using Phaser or a set of 100 cards for a card game, I create a new image with `new ResourceImage()`.)
* But I can set a single property (`renderer`) to completely change who or what executes this thing. (Example: It uses my own implementation by default, but now I can switch it to "pixi" and it will completely use _that_ framework instead).

This is what allows all the code on the website to be clean and standardized. It's also what made this transition to a completely different renderer pretty .. smooth sailing?

I feared this would be weeks of work, hitting snags. Having to add workarounds for things PIXI didn't support (such as my more rich text generation with **bold** and _italic_ and icons inline with text), finding weird things buried in the Pixi API, etcetera.

Instead, I had a "feasibility test" done in one evening, and ironed out the whole system in the next few days.

This article talks about the (very simplified, high-level) way I did this, and the issues I did run into.

## The general approach

My system works as follows. I have _Resources_ and the _LayoutOperation_.

* Resource: can be `ResourceImage`, `ResourceText`, `ResourceShape` (geometry, graphics) or `ResourceGroup` (simply contains other resources as children)
  * These are loaded (asynchronously) before doing anything with my `ResourceLoader` class
* LayoutOperation: this accepts a resource + loads of properties (such as translate or rotate), then _applies that operation_ to draw the thing the way you wanted.
  * This is split up into some more functions, such as all "effects" (like drop shadow) being their own little class that's only used if you actually want that effect, of course.

For example, let's say I want to draw an image to my card.

* I grab the image with `resourceLoader.getResource(name)` (I give the name + filepath myself in the config of each game.)
* I create the operation I want to do with it.
* Then I say `res.toCanvas(canv, op)` and it prints the image onto the canvas I gave it, in the way the operation describes.

This allows resources to be small and completely independent. (They have _no_ data about how to draw them or the overall system; they only know their own raw content.) It allows shortcuts like cloning the layout operation to quickly setup similar (but slightly different) ways to draw stuff. I'm happy with this system and it works much better than I could've hoped for when I started.

So, how do we change this to use PIXI?

* At the start of the entire generation, we must create a `PIXI.Application` (instead of a raw canvas)
* Then, every resource must have a `res.toPixi(app, op)` function.
* Which creates the PIXI equivalent of the resource and adds it to the app.
* (When done, the final canvas is in `app.canvas`.)

This is the high-level ... now let's get into the nitty-gritty.

## ResourceLoader

The ResourceLoader takes in a configuration and loads that into a `Resource` object.

For example, `bg: { path: "/path/to/bg.webp" }` is asynchronously turned into `bg: new ResourceImage(the-right-params)`.

Again, I settled on this system after many tries and it's the best I ever found. I didn't want to change this, but I had to change _something_ about the process to support Pixi properly.

* I could, when drawing something, load its asset "on demand". Simply do `Assets.load(filePath)` just before drawing in the layoutOperation.
* This is silly, of course. It means the same Asset is constantly re-loaded. It means the drawing function _must_ now be asynchronous, which you want to avoid if possible.
* This becomes even worse when you have `Spritesheets`, which _almost all my games use_. It would mean it constantly has to re-cut the same image into the same smaller images.

No, we need the ResourceLoader to actually load everything beforehand, then **save that on the Resource**.

Let's take the ResourceImage as an example.

* It has the function `createPixiObject`.
* It creates a `Sprite.from(filePath)` and saves it inside the resource.
* The layoutOperation can now call `getPixiObject` to get this thing.
  * When the ResourceLoader has `renderer: pixi`, it automatically creates the pixi object for all resources while loading.
  * If I ever have any other custom, weird setup for a game, I'll have to call it myself beforehand to ensure all assets are loaded _before drawing starts_. (It's awful practice to keep loading new stuff _while already drawing_.)

When it needs a spritesheet (the number of frames > 1), it simply saves a `Spritesheet` object instead. When I want a specific frame for it, it grabs `Sprite.from(spritesheet.textures[frame])` instead.

This means every resource is truly only loaded + parsed once, before any drawing starts. And it means it does so using the exact same syntax/structure as my other system, which allows me to keep all ResourceLoading code completely intact.

## Container Chaos

In the latest version of Pixi (v8), they changed it so that _only_ Containers can have children. You can't add children to a Sprite, or Graphics, or any other DisplayObject anymore.

I actually love this, because it matches perfectly with my own system and it creates much cleaner code. Their `Container` ... is just my `ResourceGroup`. It's the only thing that can have children in my system; all other resources are a leaf node by default. (Maybe it's a good thing I waited a year or so with this PIXI update :p)

This made it very easy to translate all resources to their PIXI equivalents _and_ automatically get that nice tree structure it wants. (Of container at top > smaller containers > smaller containers > leaf nodes.)

I did run into one tiny issue: **it can't add children to a Container that's not added to the stage yet**.

After 15 minutes of confusing errors, I realized this was the issue because I re-ordered the addChild calls. (They should state this somewhere or have a more obvious error message, but oh well.)

My first approach simply _returned_ the final object from children, so it could be added to the parent at the very end. But now that didn't work, so I had to shuffle things around:

* The ResourceGroup creates its Container + adds it to their parent ...
* .. and only _then_ loops through its children, who add themselves to their parent too.

This meant I had to update the `toPixi` function to also put in the _parent_: `toPixi(app, parent)`. I'm fine with that, because my other system also needs it, and it's a very useful and intuitive dependency to have. And it's only two parameters.

## We don't need no Application

The `PIXI.Application` object is a very nice wrapper that automatically creates a few things for you. That's why all tutorials start with it, and it's probably the only thing you'll need for most people.

For my use case, however, this isn't great.

* It also creates an update loop: 60 times per second, the canvas is redrawn (and it triggers that update function, which I can hook into if I were making a game)
* It's limited to WebGL mode with Canvas fallback, while some of the drawing features I regularly use require their WebGPU renderer.

As such, after writing the original code, I simply switched the application for nothing more than the `WebGPURenderer`.

* It takes the same parameters as Application (canvas size, background clear color, etcetera) + produces that canvas for me.
* I just have to create my own "root container" for the scene with `new Container()`
* And now I pass those into the drawing function => `toPixi(renderer, parentContainer)`.

This is much faster. And my laptop fan doesn't go crazy anymore after a while on the page because it keeps updating the canvas 60 times per second :p

## The different resources

### ResourceImage

I already talked about this one, but here's the detailed overview.

* We can get the base texture with `Assets.load(filePath)`
* If single frame, use `Sprite.new(baseTex)`
* If spritesheet, 
  * I have a handy converter function that creates an object with all the frames. (As if I'd exported that JSON from texture packing software.)
  * This basically returns a dictionary with the exact position and boundaries (`frame0: { x:, y:, w:, h:, }`) for all frames.
  * Then I can do `const sh = new Spritesheet(baseTex, sheetData)`
  * This has to _parse_ the spritesheet into individual images, so we do `await sh.parse()`
  * Now, whenever I want a specific frame, I can do `Sprite.from(sh.textures["frame" + frameNum])`

Again, I'm not sure what PIXI is doing, but even their parsing of a spritesheet (into smaller images) is slightly faster than my own system.

### ResourceShape

This uses the `Graphics` object. Every single shape implements its own `createPixiObject` function again, which uses the correct function for its shape.

* Rectangle => Graphics.rect(x,y,w,h)
* Circle => Graphics.circle(x,y,rad)
* Path => Graphics.poly(arrayOfPoints)
* And so forth

PIXI supports slightly _more_ shapes than my system. So in the future, I'll probably add a few more shapes just because it's so easy to let PIXI do them.

Once made, this is passed back to the layoutOperation. That value actually knows _how_ to draw the shape, such as the fill and stroke. These are now applied to the returned object. 

{{% remark %}}
Which is a `GraphicsContext` by the way, not `Graphics`. This confused me for a bit as I couldn't find the right API page for the drawing functions and the Type Checker complained stuff didn't exist when I was quite sure they did.
{{% /remark %}}

I could optimize this by creating a _single_ GraphicsContext and keeping it around for all the shapes. This would require creating that context and passing in another object everywhere OR saving a reference to it everywhere.

I thought this was too messy for the tiny benefit it would give me. Geometric shapes are very cheap to draw and a shared context only really works if things are drawing _identical_ stuff. (Example: the same red square of the same size has to be placed at 100 locations.) In my games, all shapes are completely different and this would not help.

### ResourceText

I have my own `TextDrawer` class that, as expected, 

* Takes in a canvas + text configuration.
* Draws the text (using all the formatting specified)
* Returns the new canvas as a `ResourceImage`

This is the standard way of drawing (complex) text: you create an _image_ of the final text and just display that.

But because it's an image now, we can just treat it as a `Sprite` and display it! I was positively surprised when I had my entire text drawing system working in PIXI in only a few minutes.

{{% remark %}}
There were some tiny bugs and more issues to figure out, such as when the text has a weird alignment and parts of letters at the edge could be cut off. But that's always the case and not too bad.
{{% /remark %}}

This doesn't cache anything. Because even changing a single thing about the text, would mean drawing a completely new image. And so far, in all the work I've done, I have never had _many identical texts_ being drawn to the same canvas. So there's no benefit saving all this data and keeping it around, and checking if the text has changed in the mean time or not, just so we can serve a "cached" version 0.0001% of the time.

### Global Operations

Once the resource has been converted into a PIXI object, it simply applies all the different properties that every DisplayObject has. (Remember, the `LayoutOperation` knows all these and is responsible for setting them.)

Think of `position`, `rotation`, `scale`, `alpha`, and so forth.

Their blend modes are named identically to the `compositeOperation` of canvas, so that was also an easy 1-to-1 match. (Though it's important to mention that they support NO blend modes on canvas, and only 4 blend modes on WebGL. Some of the composite operations I use heavily aren't even supported in WebGL. See why I wanted WebGPU?)

The only confusing thing here is that what I call _pivot_ they call _anchor_, but everything else is one line of code and works immediately. (In the future, I might adopt their system to split those into two variables meaning slightly different things: `anchor` and `pivot`. Not needed for now.)

This is also where I create my array of `filters` to give to the object, which was the final step of the conversion. So let's talk about that now.

## Fancy Filters

As usual with online documentation, this was **not explained at all** ... until I actually figured out where to look. Then it was easy :p

Filters don't come built-in with the base PIXI.js library. Instead, they're an _extra_ library/file you can include (if you want to use filters).

If, like me, you don't use Node, it will error at first and you'll be frustrated. 

* That's because the `pixi-filters.mjs` file ASSUMES you have `pixi.js` as a Node module installed.
* But the `pixi-filters.js` file (the non-module file) ASSUMES you have the global PIXI object available.

Then I realized I can just ... edit that? I opened `pixi-filters.mjs`, changed the import statement at the top to `./pixi.mjs` (the location where I put that file), and it worked flawlessly.

Now I could import only the filters I needed with `import { FilterName } from "./pixi-filters.mjs"`.

Fortunately, my own system matches PIXI in this department too.

* All effects I've made so far are their own little Class in the `layoutEffects` folder.
* Which means I only need to import each filter _in that specific file_, reducing bloat and dependencies.
* Which also means I can add a function `toPixi` to _those_ as well, and it simply creates that filter using the settings already saved on the class (and returns it)
* (The LayoutOperation already has a helper class for collecting all effects, so we only need to set them _at the end_---one line of code---when we know exactly everything we need.)

It took 30 minutes to look up the equivalents of my own effects in PIXI, and add this function to them all.

It's not a perfect 1-to-1 match---again, PIXI has was more settings and control than Canvas---but it's close enough.

Because PIXI allows so much more, it's tempting to add all their filters and play around with it. But for as long as possible, I'll keep feature parity between PIXI and my own system, and only implement things I _actually need for my next project_.

## Wrapping it all up

So far, I've just used a quick dev/test environment for all this. I created the PIXI renderer manually + appended the final canvas to the document body.

On my website, however, this should happen automatically. I have two different "visualizing" systems.

* `MaterialVisualizer` => for generating full material (cards, tiles, pawns, etc) for a game.
* `BoardVisualizer` => for generating a single page for a One Paper Game. (This has just enough different requirements to warrant a different class. Might merge in the future if I find a clean way.)

These automatically set up the ResourceLoader and canvas, wait until done drawing, then put everything back into a downloadable PDF.

To make it work with PIXI, we just need to do the same steps but with the specific classes/functions for PIXI.

* At the start of the process, it creates that renderer + a ResourceLoader with its renderer set to `PIXI`. (So that it automatically creates a cached spritesheet/sprite for ResourceImages, remember?)
* Then it collects everything to be drawn
* Then it simply asks `renderer.render(group)` (which happens instantly, not async, no need to wait until done)
* And then I turn the `renderer.canvas` into an image as usual and we're good.

In practice, this means my overall generation class (that powers basically all games at this point) has a small if-statement in two locations (start and finish). This isn't great. In fact, in a few sections, I'll talk about how I improved that (at "Optimization: Don't bundle everything").

## The Results

The "big test" for this system was my other upcoming One Paper Game game _The Mist_. It has by far the most detailed/complicated/full boards of all One Paper games, using everything the system has at once.

With my own system, it took **~5.5 minute** to generate. This could be optimized with some tricks to **1 minute** (such as splitting the spritesheet myself while loading or removing some of the less necessary stuff), but it's still not great. Especially not because I can't use my computer while it generates (it's _that_ resource intensive).

With the PIXI backend, it took **2 seconds**. No freezing/hanging. 

Eeeerm yeah, I should've just done this earlier. I'm glad it all works and all features are supported, I'm glad that PIXI is _so fast_.

Results are the same, except for slight antialiasing in some spots, or _very_ slight changes in the size/position of stuff. 

{{% example %}}
The PIXI shadow filter is not identical to the Canvas implementation, so the exact size of them is slightly different for the same numbers between the two systems.
{{% /example %}}

I also tested it for my other material generator, but ended up turning it off again. Creating a new renderer instance for every material item (card, tile, etcetera) is way too much overhead and makes it slower (and more prone to crashing because you lose the WebGL context). And I can't re-use the same one, as each renderer has _one_ canvas to which it draws, which means the material (which draws asynchronously) will keep messing up the same canvas.

## Optimization: don't bundle everything

### Decoupling code

Now, the issue with my current approach is that every way of rendering a resource ... is coded on the resource itself. Similarly, every possible way to execute a LayoutOperation ... is saved on the same LayoutOperation class.

Even if I just want to use my own simple system, it will still _bundle_ the entire PIXI library with it. Because the bundler isn't smart enough to know you're not actually using those functions/classes in this program.

I knew this would be an issue. I just wanted to get it actually _working_ before I tackled this step, which is why I did the inefficient thing first.

To fix this, I split the different methods of drawing into actually different "rendering backends".

* Every backend (Pandaqi, Phaser, Pixi) has its own class.
* When you want to draw something, you must supply the renderer you want to use.
* Then, in `LayoutOperation` (and `Resource`s) it simply invokes _its current renderer_ and asks it to do everything for it.

For example, instead of an image importing `PIXI.Sprite` itself and creating it, we now have a renderer that can _convert_ any image into a `PIXI.Sprite`. The image itself is still a tiny class that only knows its content and some properties. The _renderer_ has the weight of adding all the extra imports from PIXI and making it happen.

It was quite a large task to rewrite all of this into separate renderers. But in the end the code became far cleaner and more "decoupled", which is always nice for the future. Instead of having 3 large functions in LayoutOperation (`toCanvas`, `toHTML`, `toPIXI`), we now just have one function that says `this.renderer.applyOperation()`.

* To make things easier, the renderer defaults to whatever renderer their _parent_ used. This way, I only need to set the renderer once at the start of drawing, and everything else follows suit. (I also don't really see any time I'd want _different_ renderers for different components, but hey, at least the system can do that.)
* The Phaser renderer is very tiny and basically just tells Phaser to start. I just wanted to keep this around for security, but all those old Phaser games _should_ be 100% transferred to Pixi by now and never go back.

It also reduced the size of most scripts from something >500 kB to just ... 10 or 20 kB. The actual size it needed. 

{{% remark %}}
This was also very noticeable in my Hugo website generator. After implementing PIXI at first, inefficiently, it struggled to refresh and would sometimes take 10+ seconds. After this change, refreshing the entire website---which means re-bundling and minifying all code---was <1 second again.
{{% /remark %}}

### How to decouple effects? + A major issue

But there were still a few huge scripts that bundled PIXI stuff when they didn't need to! After some debugging, I realized I had forgotten that I'd coded the _effects_ all in the same class as well. In other words, if I wanted to use the DropShadowEffect (without PIXI, just my own renderer) ... it would still import the PIXI filter and everything that comes with it. Because, again, that code is inside the same class and it can't know that it won't be used.

This proved a bit harder to "solve". I really like having _one_ class for every effect which can just be used by any renderer. (As opposed to duplicating the effect per renderer, or having a large if-statement again.) But how do we make the class apply a _specific_ effect, without importing it themselves? Or having a large if-statement?

Tracking down this issue, trying different solutions, I discovered **there was a major bug in the build system for Hugo**. 

Even though I was only importing what I needed, the build system constantly included _everything_. That's why PIXI + PIXI Filters was added to _all darn scripts_ throughout the entire website. Because as long as I needed one tiny thing from it, it would just bundle it all.

I researched the issue and found that this is simply a bug in ESBuild (the bundler used by the Hugo system). My specific setup, with these specific extensions and ways of using import statements, is simply what causes it all to go wrong and _everything_ to be included. I can't do anything about that, except wait until it's fixed. It's not my fault---so I decided to let it be.

If it's going to include everything, well, then I can also just import _all_ the filters and dynamically pick the one I want. 

* The `RendererPIXI` has a statement like: `import * as PIXIFilters from "/path/to/filters.mjs"`
* When drawing a specific effect, I _insert_ this `PIXIFilters` object as a dependency into the function. 
* So the effect itself has no reference/import for any filters; but it can still create/use a new one as follows: `new pixiFilters.NameOfTheEffect(params)`

All my older games, which just use my own renderer, were finally brought down to just 300 kB instead of the idiotic 1+ MB from before. That's about right. 

* This includes the actual code for the game, which can be up to 50 kB of logic, drawing, data, config, etcetera.
* It includes my layout system to execute it, which is another 50 kB.
* And it includes the `jsPDF` library for converting everything to PDF. This is 250 kB and can't be removed/minified further :p

I finally made everything as decoupled as it can be, and brought it all down to the most minimal and simplest scripts possible.

{{% remark %}}
Though, side note, I was stupid and forgot to remove the PIXI imports from the `ResourceText` too. That's another hour or two wasted chasing down why certain scripts are still way too large, while I was "certain" I'd removed all dependencies from the Resources now. Well, I hadn't. Removing those few lines finally fixed everything: if a system does not use RendererPIXI, it does not load _any_ of its code.
{{% /remark %}}

At some point in the future, that bug will be fixed, and all the scripts will become way smaller again. But they're small enough for now, and the PIXI renderer works exactly like my own---just _way faster_ on bigger projects like One Paper Games.

## Conclusion

That was (most of) the long journey towards implementing a much cleaner rendering backend for Pandaqi, so that it can seamlessly support PIXI whenever I want. (And _not_ include it when I don't want it!)

As the results show, for large single canvases---such as One Paper Games, or things that take up the entire screen---PIXI is just in a different universe. It's **1 seconds vs 5 minutes** of generation time. It's also less error-prone, which means it performs the same across browsers and doesn't make it freeze/hang/lag.

For a large number of individual (smaller) canvases though---such as my material generator for more standard games---PIXI is marginally slower. For example, one of the simplest upcoming card games I have takes **11.5 seconds** with PIXI renderer and **10 seconds** with my own. (This is a game with 36 relatively simple cards the size of regular playing cards.) 

Because there are many small canvases, this process never hangs/freezes (because it can take a breather in-between every X canvases to draw) with my own system. And my own system does not have the overhead of creating+destroying PIXI renderers. But, as the results show, the difference is really tiny here. So perhaps at some point in the future, maybe when I find an even better approach or PIXI updates to be even faster, these switch to PIXI as well.

Additionally, I haven't found a clean way to re-use or destroy PIXI renderers, so even if I force it to only draw 1 card at a time ... it still regularly loses its context because the system is overwhelmed. A problem for future me.

I don't have precise numbers for this, but looking at the average file sizes of One Paper Games, it seems to have been reduced by 75%. 

The entire Phaser library adds about 1.6 MB, while Pixi stuff adds "only" 400 to 500 kB.

{{% remark %}}
Though my website, like most, gzips all assets which means the effective bandwidth used by both is also reduced by considerably. On the online version of Pandaqi, not my localhost, that same Phaser game reports a size transfered of 500 kB for the code.
{{% /remark %}}

I learned even more about graphics and drawing code. I learned a lot about the JavaScript import/export/bundling system. I learned even more about clean coding practices, getting a lot of practice in 100% decoupling and preventing duplicate code with this update :p

Even though the website is never done, and this layout system can always be improved, it's in a really good state now. Much better than it's ever been, much faster and
more user friendly. 

It's silly to realize how barebones the website was before. How I barely gave any feedback to the user as the website was just generating your material for a good 30 seconds. How I originally decided I was "fine" with launching those new One Paper Games that took 5 minutes to generate. How many pretty serious bugs/oversights I discovered merely by refactoring that old code.

But hey, that's why we just move fast, make stuff and then iterate on it. Nobody else is doing what I'm doing, so I have to learn it all on the fly. But I think it's important to keep improving and maintaining the code a few times a year, because the longer you let things get outdated and gather dust, the harder it will become to keep your work/website alive _later_. And it would be a waste to let projects from a few years ago just die because I didn't feel like taking a day out of the schedule to clean up some code.

Until the next update,

Pandaqi

