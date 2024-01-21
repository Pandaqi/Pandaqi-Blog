---
title: "Pandaqi Games: 2024 Update"
date: 2024-04-03
emoji: "🎮"
---

Here we are again. Another big update to my [game studio website](https://pandaqi.com) that is almost entirely behind the scenes. This means all my work won't be immediately visible to others, which is why I write articles like these to explain what I did (and feel good about being productive).

## What's the (biggest) problem?

My website already hosts a _lot_ of board games, and many more will arrive in the future. The special thing about these is that you can _generate_ their board/material on my website. You click a button, wait a few seconds, and you get a professional, high-quality PDF to print and play with.

This, of course, requires an entire system to design layouts and draw graphics on demand. More than a year ago, I finally wrote that system, which I was quite happy with. It's one of the reasons development pace picked up tremendously.

But it was far from perfect. A first attempt at an entire layout system ... in JavaScript ... without knowing what I'd actually need in the future ... was bound to have issues.

* I had no support for grouping or node trees. (So you couldn't create a set of images that belong together, group them, then redraw them anywhere with just one line.)
* To make certain effects work, I needed certain conversions that required _time_. In other words, the entire drawing system had to work on _promises_ (`async` and `await` keywords everywhere!), just because a few effects might need them.
  * Because effects can be applied to different things, at different times, I had to keep looping through the list of effects in 5 different places, passing an object with "effect modifications thus far" around. Also not great.
* As I added features, it became slower ... and slower ... and slower ...

So I did some research on how other libraries (like Pixi.js) made drawing so _fast_. I learned a lot about Transformation Matrices and stuff. And then I cleaned up the whole thing to get a much better framework.

_But Pandaqi, why don't you just USE one of those existing libraries?_ 
* Because none supports all that I needed, not even close. (For example, I can now easily format text---even including images inline---whenever I want. A feature I could implement myself because I know how it all works and can reach into core functionality. No other frameworks do this.)
* Because I wanted one unified API across all games, whether they generate a random board, or material, or an interactive example for the rulebook, etcetera. 
* And lastly because those other libraries are HEAVY and the way they work isn't declarative enough for me; I want code that reads like clear, English instructions about what's happening.

## Grouping & Tree Layouts

### ResourceGroup

The first step was to add a `ResourceGroup` resource. It simply keeps a list of "combos": a `Resource` to draw and the parameters for how to draw it (a `LayoutOperation`)

I've split these because it makes it faster, simpler, and easier to use however I want. (For example, I can re-use the same _operation_ for multiple resources. Because it's just a separate "struct", not properties inherently attached to a class or object.)

When you ask it to draw itself, it ...
* Loops through its combos
* Then asks each one to draw itself

Simple enough. Hopefully you see how this would allow adding Groups inside Groups, recursively calling each other, and thus drawing the whole tree.

Again, I don't want to _actually_ make it a tree. Now I have total freedom to reuse groups (for free!), to draw at any point (not just the tree root), etcetera.

This is important for what comes next.

### No Save/Restore

My research showed that the `save()` and `restore()` functionality of Canvas is very expensive.
* A `save` will store the current state of the canvas (its position, rotation, etcetera)
* So you can do anything you want
* And then `restore` to go back to how it was

My old system used these _intensively_. Because, well, every resource could be drawn in any way, so my big draw function started with `save` and ended with `restore`. 

Crucially, this made sure that _children_ (groups within groups) were drawn correctly. Because when their draw function was called, the `restore` hadn't happened yet, so the canvas was still at the position/rotation/scale of the _parent_. (Which is what you _want_!)

But we had to get rid of it.

That means calculating the correct Transform ourselves, and just _setting_ that (overriding whatever came before) before drawing. (This is nothing more than setting six numbers, which is much faster than saving or restoring the entire canvas state.)

So I wrote my own `TransformMatrix` class that does exactly what I used to do to the canvas directly: `translate`, `rotate` and `scale`.

* By default, it starts at Identity: do nothing special, just draw it at the origin at default scale.
* But if a parent called us, it passes its own Transform into us, and we use _that_ instead.
* Then we apply our parameters from the LayoutOperation. 
  * Move, rotate, scale, then move _back_ to put the sprite at the pivot point we set. 
  * _Pivot?_ For example, many elements are CENTERED, which is pivot point `(0.5, 0.5)`. This means they must be rotated around their center point. But the default origin is top left. So, after all is said and done, I move the sprite back by 0.5 * width and 0.5 * height, to make it show up centered.

This is ~10 simple calculations at most for each sprite. But by setting the context to _this_ final transform, everything is drawn in the correct place, and we can throw away save and restore!

The same is true for other settings on the canvas, such as `globalAlpha` (the transparency of the whole thing). I simply overwrite it with the new value, which defaults to 1 (do nothing, 100% opaque) for all LayoutOperations.

There are _some_ permanent operations to canvas, like _clipping_, which still require it. But now it only saves/restores when those are present.

This sped up the draw calls immensely!

It also made the code much cleaner and easier to maintain. (I don't rely on a long recursive chain of previous modifications to canvas. The values used for a draw call are 100% calculated within that draw call itself.)

### The wrong way to do it (?)

Initially, for a month or two, I had implemented a different approach.

You see, when I first introduced grouping, I realized a very annoying fact: the canvas only draws what's visible. 

If I draw something off-screen, then _move_ it into the screen (by moving some parent of that group), it still won't show up! Because at the time I drew it, it was off canvas, so nothing was drawn.

Panicked and annoyed, I wrote this solution at the time.

* Calculate the outer bounds of what we want to draw. (For each child, get its bounds, then combine them to find the rectangle that fits the whole thing.)
* Resize the canvas to that.
* Then, while drawing for real, stamp that canvas onto the real one
* But offset by whatever amount was added (otherwise we draw it in the wrong place)

It worked! 99% of the time :p

It was slow. I knew this was extremely inefficient when I wrote it, because it creates lots of temporary canvases that are all much bigger than they need to be. I had the false impression that this would be useful later, maybe when I wanted to turn this system into something usable for _games_ (where you redraw each frame).

But that's stupid. All that matters is _drawing what's on screen_. Drawing something off-screen perfectly, just because it MIGHT be moved on-screen, is stupid.

Also, when I made more games, I stumbled upon edge cases that made this not work. And I couldn't even figure out why, because they weren't that strange and SHOULD have worked.

Alas, I ripped this all out and replaced it with the much smarter do-my-own-transform-matrices thing.

Also a huge speed boost. And the GPU doesn't get slammed as much as before.

## No Async/Await

The Async/Await system is great. It allows very readable code that can run concurrently or "however long it needs" without stalling, and---if you've read previous articles with updates---you know my material generator uses it to draw all cards _simultaneously_. Which is a huge speed boost compared to drawing 60+ playing cards _one after another_. (At least, if your computer can handle it.)

But I was a bit too enthusiastic when introducing it to my drawing system.

Over time, I realized the things for which I needed it ... could be done in a different way. A way that was faster and would execute in-place, not requiring a Promise.

I rewrote, and rewrote, until I only had 2 effects (one of which I only used _once_) that still needed it. I found a way to rewrite those too, and then ... it was just unnecessary!

Those keywords, at best, did nothing. At worst---and I suspect this happened on my laptop---they created SO MANY promises and branching structures that my poor browser was constantly turning black as it was overwhelmed by it.

I removed the `async` and `await` keywords from everywhere in the system.

It's faster and more robust now. It also means I don't get those stupid, confusing bugs anymore when I forget to add one of those before drawing the material for one of my games.

## The Configurator

The whole idea of the material generator is that you can easily _configure_ it in loads of ways. Fortunately, I was smart enough to use this structure from the beginning. Each game has a big CONFIG file that has all the parameters (position, rotation, scale, font size, colors, etcetera of all elements).

The issue is that this must all be READ and usually MODIFIED by each thing we draw.

For example, you can determine your own _card size_ in my generator. (The default is nice, but requires way more ink and paper, so I always print the tiny cards for my own prototypes.) This means that every dimension must be MULTIPLIED by the card size, to properly scale with it.

Looking at the old games, I realized
* This is the most "boilerplate" work and I usually hate it.
* It leads to loads of long code lines (`CONFIG.thing.that.thus.theNumberWeWant * cardSize`)
* And all this is _recalculated_ for _every individual card/token/whatever we draw_!

If I could just calculate all final values _beforehand_, 
* I only need to do it once
* And accessing the values would just be `CONFIG.get("value")`

So I introduced the `Configurator` and the `CVal` (Configurable Value).
* Let's say I set a fontSize in my CONFIG. Now I can just do `new CVal(0.1, "cardSize")`.
* When I create the Configurator, I hand it the CONFIG, and it loops through the entire thing.
* It calculates the _final value_ by combining my given value with the parameter it has calculated before. (In this case, cardSize.)
* And saves all of that under the original name/path

I actually didn't expect this to matter _that_ much, because calculation is still what computers are really good at. Doing a few thousand fewer calculations (vs those very expensive _draw calls_) seemed a small gain.

But the performance gains were much larger than expected. Perhaps because I also created loads of _local variables_ for those calculations each time (to keep lines shorter and readable). Now it also creates thousands fewer local variables per generation.


## Minor Cleanups

### EffectsOperation

I realized that Effects were clearly a separate thing from everything else. So instead of having `LayoutOperation` handle those too, I moved it to its own class: `EffectsOperation`.

Now we can just hand everything to _that_ thing, and only call it a few times (at different moments) during the draw call. 

What used to be many repetitive lines (and a wonky way to track which effects were already applied), are now just a few single-line commands that say exactly what they do. (Also, this allowed me to _reuse_ this thing in other places outside the system.)

Besides this, I still create new effects "as I need them". I currently have 10 effects, some extremely simple and some that took a long while to figure out. Crucially, each of them is its own small module that's a subclass of `LayoutEffect`. So adding one will never break anything or cause too much trouble, as it just means adding a new file and making sure that one is correct.

### Sanitizing Input

When you try to draw at non-integer coordinates, the canvas has to anti-alias it (because it can't actually draw at half a pixel, for example). This is expensive to calculate _and_ makes the end result look fuzzy, which I've noticed a few times before.

As such, all numeric inputs within the system are now rounded.

Such a small thing, but with pretty major consequences.

### Auto-Stroke

Especially when you have to cut material yourself, you want a thick black border around cards/tokens/whatever. This ensures you can be flawed when cutting (or printing), but never lose any crucial information. It also often looks better.

So now I was stuck with 30+ games that _all_ had the exact same code to draw an outline at the end :p

An obvious case for optimization. I added an "auto-stroke" feature to my material generator (you can customize it, but the default value scales with the card size and is what you usually want) and removed all that duplicate code.

### Thumbnails

When loading a resource, I can now state how many thumbnails I want to create. 
* Default is 0: just load the entire image and be done.
* When I say 1, for example, it will also save the image at _half_ the size. If the original is 1024x1024, then the first thumbnail is 512x512, the second 256x256, etcetera

When _selecting_ an image to be drawn, I also pass in the _dimensions_ at which it will be drawn.

Why? So it can select the smallest image it has to draw!

At the cost of some extra caching at the start, we can prevent _loads_ of overdraw. When it only needs a tiny 128px icon, it can just draw that immediately, instead of drawing that enormous 1024px one and scaling it down _every time_.

This is especially useful for my randomly generated boards for One Paper Games. To fit on the paper, those usually have images at both large and very tiny sizes. (And lots of images on one page, which is why generation for some of these might be slow for the time being.)

## Future Todos

This is a small list of things I hope to do this year or start of next year.

* Convert the older games to the newer approaches. (Use Configurator, remove async/await, etcetera)
* Even more Text Formatting stuff. (It already supports a lot, but no superscript or subscript for example.)
  * Also fix Text Overflow. When you try to draw something in a textbox that's too small, it now has very unpredictable consequences, usually leading to nothing being drawn.
* Currently, the draw call _always_ creates one temporary canvas. That is simply required for 50+% of things you might want to do. I'd still like to _not create it_ for when it's _not needed_.
* Oh, yes, also _foldable sections_ for the material settings. There can be quite a lot of settings on newer (and more complex) games, which is overwhelming. Allowing people to fold/unfold those as needed is much better.
* My biggest enemy: **auto dimensions**. I'm looking for a unified way to automatically calculate the dimensions of what we want to draw, while ...
  * Keeping image ratio (yes/no)
  * Allowing only ONE axis to be auto-filled, not the other.
  * Also working on a way more complicated and dynamic resource, such as Text
  * Not breaking all games that came before and supplied hard-coded dimensions themselves.
  * And, you know, being correct. (Remember my previous approach was only 99% correct.)

But I am very much a "move fast, break stuff" kind of person, so I'll probably only fix these when I really need it for something.

{{% remark %}}
A common performance boost comes from batching or smart re-ordering of everything to be drawn. But that isn't really a thing for HTML Canvas, only WebGL. (Updating a few numbers on the context for each draw call really isn't a big deal. Batching would only remove _that_.)

I have no intention to use that, for my broken old laptop _can't_ properly use WebGL, and I always want to keep things simple and minimal.
{{% /remark %}}

## Conclusion

So, yeah, a quick (and very incomplete) glance at updates and how the system works behind the scenes.

At least the code is MUCH cleaner, MUCH faster, and more correct. That game that broke before now works like a charm, for example. (Still don't know what was wrong with the previous bounding box calculation code.)

As we go, I keep learning more about transformations, html canvas, graphical effects, etcetera. And each time I do, I try to update the system and move older games to the new version. I have no doubt that in a year or two I will have done even more updates that seem crucial in hindsight. 

You only see what you need---and don't need---by trying to use the system for 10+ projects. That's how I realized the `async/await` was doing nothing. That's how I realized we needed a better way to configure values, instead of chasing after more graphical performance things.

For now, the code is quite clean, the material generator is a readable list of instructions, and it does what I want/need.

Hopefully, lots of people will keep enjoying my games for a long time,

Pandaqi