---
title: "Pandaqi Games: The Big Typescript Update"
date: 2023-10-25
emoji: "🎮"
---

If you thought we were done with huge updates to [Pandaqi Games](https://pandaqi.com) for this year---as did I---then you were wrong. 

This past year, the number of interactive/randomly generated board games has skyrocketed. I've planned 10+ for next year, of which several are already completely finished.

In other words, Pandaqi needed another big upgrade behind the scenes.

* I ran into serious issues (or possible improvements) making all these projects.
* This isn't just some hobby anymore---these games take months of my time and are professional quality by now.

If you haven't visited my website, it might be nice to do so before reading this article. Check out some of the latest board games to better understand what I mean.

* They might allow you to randomly generate a playing board (on the main page)
* Or you can press a button to generate material (a PDF with cards/tiles to print)
* And the digital rulebook might have "playful examples": interactive parts that help you understand the rules in a fun and quick way.

All of that---before this update---ran on JavaScript and the Hugo static website generator.

With that knowledge, let's start the article!

## TypeScript

First of all, everything was converted to TypeScript. In some cases this simply meant changing the extensions (from `.js` to `.ts`), in other cases TypeScript immediately pointed at 30 errors or sections of unclear code that I had to fix.

Which is exactly the reason why I wanted to make the change.

As I've programmed more and more, I've decided that (statically) typed languages are definitely the way to go. Yes, the freedom and speed of "do whatever you want" might feel great at first, and the verbose syntax of typed languages might seem daunting. But in the end, merely _converting_ my existing projects to TypeScript revealed another large group of (potential) errors. 

By forcing yourself to give everything well-defined types and sticking to those, you force yourself to think more about how to solve a problem _better_, and you can have way more faith in the correctness of your code.

That's the second reason: faith in your own systems.

Over the years, Pandaqi has grown huge, with many moving parts. The oldest games and pages use terrible code and architecture. Once you've started with that, however, you're somewhat stuck with it. This meant that there were interconnected dependencies and single points of failure _all over the place_.

Any time I updated Pandaqi, I was simply afraid that all games had stopped working. Which isn't great.

So yes, all the game (generation) code + all the tooling behind the scenes was converted to TypeScript. I couldn't really use "automatic" features (such as inferring types from usage) on half the projects---the oldest ones---because of how badly they were coded. Newer projects were a breeze to convert.

I was afraid this would make the compile/build/reload process much slower (on my already terrible laptop). Instead it got ... faster?

## Layout System

For my first handful of games, I simply coded what I needed _right then and there_. 

Need to place some text on a card? Directly interface with the canvas (using `context.fillText(...)`).

Need to place an image? Again, directly grab the URL, then place it (using `context.drawImage(...)`)

Obviously, after several games I saw the patterns here and pulled these into reusable functions across games. I had never written a layout system or resource manager before, however, so I made some terrible choices.

For example, the `ResourceLoader` could asynchronously load and save resources ... but only in their raw state. I had to pass three parameters to _every drawing function_, no matter how big or small:

* Context to draw to
* Resource loader
* ID of resource to draw

Similarly, there were three different functions for adding text with only _minor_ differences.

No more! If we're going to create these amazing games (fully generated by website code), we need a better system.

### Resources

As such, I did a rewrite of all the tools that is so large that it's not even a rewrite anymore: I just created a layout system from scratch.

* All resources are now their own class/object. This means I can just do "resourceLoader.getResource(id)" once, save that inside some variable, and draw that one image as often as I want. It also means much easier manipulation and other benefits discussed below.
* Text is just another resource. So, to draw text, I create a `ResourceText` and do whatever I want with it. One unified way to display text!
* A `Color` object with proper converters (to other formats) and tools. (I already had a Color object, but it was so limited that only one game actually used it.)
* I created a whole library of `Geometry` helpers. (Shapes, pathfinding, testing intersection, etcetera.) Any of these can easily be turned into a resource to draw.

Every resource has a simple `toCanvas` function which takes a canvas to draw to and a `LayoutOperation`. That object contains the actual specifics for _how_ to draw the resource (position, scale, clip it, effects, ...).

This feels, after years of experience, like the best approach. This separates WHAT you want to display with HOW you want to display it. 

* Resources are extremely light and (almost) never copied or duplicated. (They have NO logic that doesn't belong there, such as drawing them on a canvas.)
* LayoutOperation is also very light and focused. (It only has logic for _executing_ a drawing operation.)
* But I can display the same image in different places merely by giving a different _operation_ to the exact same resource. (And this operation can be calculated/generated beforehand easily. Again, separation of steps: data and execution.)
* And this works equally for all resources, which means syntax will always be the same.

This allowed me to rewrite tens of lines of custom code---for _every image/text/whatever_---to only two very clear and robust lines. (Create a LayoutOperation with specifics, draw the resource using that operation.)

### Consistency

When creating games and layouts, it is _very common_ to work with sets of coordinates---vectors `(x,y)` or `(x,y,z)`.

Not only for _actual coordinates_ (such as an element's position), but also dimensions, size, offset, etcetera.

Until a few months ago, I simply created a raw object each time I needed this :p (So just `{ x: number, y: number }` everywhere.)

It gets even worse if you go back further. I thought it was faster and easier to write coordinates as an array: `[x,y]`

Well, now that I have all my tooling and useful functions/classes, this all had to change. While updating all the games to TypeScript, I converted all these coordinates to my `Point` class. (By far the most used class.)

I converted colors to a `Color` class, manually defined shapes to their proper `Shape` class, etcetera.

The general goal is simply to not create manual/custom objects _ever_. It leads to errors, TypeScript doesn't like it (as a variable can have anything inside), and it's hard to change or update later.

This conversion isn't 100% done. Some very old games would need an entire rewrite to be consistent, and I just don't think it's worth the effort. But most of the codebase has been converted and is now completely consistent.

### Design through Webpages

Even with this better system, I still wasn't satisfied with placing everything by hand. Many layouts work more like a _grid_ or a set of _containers_. Like ... a web page!

I found myself often wishing I could just randomly generate some material for a game like a _web page_.

Continuing that thought, I decided to create my own little layout system on top of what I already had.

How does it work?

Just like resources have a `toCanvas`, they also have a `toHTML`. It converts the resource into an HTML representation, including the correct CSS properties for whatever layout operation I ask it to do.

Additionally, I created a `LayoutNode`. This can hold some more common properties (such as CSS flexbox stuff) and can have _children_.

Using LayoutNodes (which can optionally hold a resource), I can build a layout like a tree. Maybe I want some icon to be aligned to the _right_ inside a container. Maybe I want some _padding_ around this set of elements. It's easy to do with CSS!

Once I have that tree, I ...

* Call `toHTML` to convert the whole tree of layout nodes
* Then feed that into a third-party "html to canvas" library. (The latest and fastest I could find.)
* Which eventually spits out the whole thing as a canvas. (Which can just go back into the rest of my system for building a PDF and such.)

At first, I tried to write a "renderer" myself. My own little render engine that would parse the tree and put it on the canvas. This worked fine for easy things, but something like the CSS flexbox is just a _pain_ to implement. That's why I went with the conversion approach in the end.

Similarly, the structure used to be way more difficult and less consistent. I basically went through three versions of this Layout + Resource system (in only a few weeks) before finding the simplest and fastest solutions to the problems.

The most important thing here is that this is just a flexible component. I can create the _whole_ design like this ... or just a part. I can use the Phaser library (which is awesome, by the way) for some things, but then stamp my own Layout on top for something else.

It's just a set of nodes that can be changed and converted to HTML/Canvas at any time.

This system will surely be improved, changed, etcetera as time goes on.

## Smarter asset building

When I just started using Hugo (and converted this website to it), I preferred keeping everything together. Each game had just _one_ folder with the page, the images, the assets, the JS, everything collected there.

I found it weird to put the page itself in `content`, but then all the JS completely elsewhere in `assets`. If I ever needed to change systems or migrate, I thought it was easier if _everything_ related to one project was in a single place.

Oh, how wrong I was. (Well, it's still valid criticism, it just doesn't outweigh the disadvantages of keeping everything in the same folder.)

Over time, I had to do some website/Go trickery to even make this work. 

### The rules issue

For example, the online rules for games are inside their own `rules` subfolder (within the project). Sensible, right? They often have JS code, however, for the interactive examples. This is _also_ inside that subfolder. 

But Hugo (my static site generator) doesn't really like this, so it took many lines of code and trial and error to find a system in which Hugo consistently found and build this custom JS (if it existed).

Even worse, it doesn't work on reload. Whenever I made a change, I had to stop/restart the entire server (`CTRL+C`, type `hugo serve` again) to see the changes!

Hugo only automatically reloads/rebuilds what is in _assets_.

Similarly, Visual Studio Code doesn't understand this and can't find the tools I import. As such, after switching these rules scripts to TypeScript, it complained about _everything_ and couldn't actually typecheck for me.

VS Code _also_ wants assets to be together in one place.

### Which is a bigger issue

How did I do that for other scripts? Such as the board or material generators?

Well, I'm ashamed to admit, but ...

* I created a subfolder inside the game project.
* Which was simply a _page_ that I made _invisible_ (through two lines of frontmatter)
* Because it was now a page, Hugo could find the JS file inside.
* Which was just an entry point that pointed to the _actual_ JS in the `assets` folder

A loooot of files and folders to do something incredibly simple. 

### The solution

So I moved _all_ code to the `assets` folder. It has a subfolder `games` containing any game that needs code. Within such a game, it can have the folders ...

* `js_board` for random board generation
* `js_game` for an actual game or material generation for a game
* `js_rules` for the interactive rules example
* `js_shared` for anything shared across multiple projects. (For example, if I make spin-off games that re-use a lot of the same code.)

The entry point for _all_ games is always called `main.ts`

After all this moving around and renaming, building the assets is suddenly very simple. Hugo can easily find the `main.ts` file, and, if it exists, build it automatically and add it to the game page.

Because this is all in `assets` ...

* It works with (hot) reloading
* I can easily find-and-replace across the whole codebase
* VS Code understands the whole codebase and can correctly type check / infer / (auto) import 
* I can remove all those nasty subfolders needed for the old structure
* It seems to be waaaay faster now
* The structure and naming is consistent and predictable

I'll probably do the same with the CSS in the next update. (These files are currently also within the project folder itself, transpiling SASS to CSS, which also works only 10% of the time when hot reloading.) 

I simply ran out of time to do it now, as Pandaqi remains something I do on the side, not profitable as it stands now.

### Relieving some dead weight of old

I made a few games---most notably the "Pirate Games" (Pirate Riddlebeard and Pirate Drawingbeard)---in a weird transitional period. Both for the website and myself.

As such, those games used one "big minified JS library" that was stored somewhere on the website. For example, this library contained the Phaser framework, a PDF library, a (Perlin) Noise library, etcetera. All smashed together, minified, then imported to all those games.

Yeah, not great.

In fact, I'd forgotten exactly what this library contained, which is another reason I didn't touch this hairball of code for a while.

But with this update, I saw a chance to finally untangle that mess.

I updated those games to modern coding standards. 

{{% example %}}
I'd used `var` everywhere instead of `let` or `const`. Which, you guessed it, led to tens of "silent errors" with variables being inaccessible or in the wrong scope. 

Because OF COURSE I used one incredibly long switch statement to handle the 30+ different types of hints that those Pirate Games could generate. And you know which variables aren't scoped the way you'd expect? Yes, those inside blocks of a switch statement.
{{% /example %}}

In doing so, I rediscovered exactly what this "big library" contained. Fortunately, the mess wasn't as big as I thought. It relied on things that I had already incorporated in my general tools and used in other systems. (Such as the Phaser framework and a system for exporting things to PDF.)

As such, I simply imported the needed modules _separately_, until I could remove that big dependency (without generating more TypeScript errors).

This might seem a minor thing, but it's a big deal for me. It made the games much easier to maintain going forwards and removed, again, a bunch of unnecessary (large) files and folders from corners of the system. I want to continue those Pirate Games (with better and more beautiful improvements and ideas), but that was a mountain to climb as long as I didn't even know _what_ these games depended on.

When I tested it, I was honestly surprised that the transition went flawlessly in one try---all games reliant on that old library still worked 100%. And they were much faster now.

Speaking of that ...

## Faster generation

I didn't plan to work on this at first. I've always adhered to minimal and efficient code, so there's really no part of the website that is slow by any means.

But I accidentally improved things, which asked me to further research and implement this.

What did I do?

### Async for the win

As I mentioned, older games would just repeat some custom code all the time. One culprit was "convert canvas to image": 5-10 lines of code to convert the canvas I generated into an actual image.

In the new system, everything just imports a function from my tools: `convertCanvasToImage`.

Thanks to JavaScript promises and the `decode` function on images, this piece of code can now easily run _asynchronously_ (for as many canvases as I want). As it's decoding the first images, it can already start on later ones.

This obviously makes the whole thing _much faster_. Some games might have 50+ cards. Converting them all in parallel is much faster than converting one at a time (before starting on the next).

You know what this also means? That the return value from this function _might be in the wrong order_ :p

Some of the games relied on the images being returned in the same order as they were put in. It took me a while to figure out that _this_ was why those games had broken!

But it got me thinking. This speedup could be accomplished for many more games by simply switching more parts of the process to be async.

My example above is merely about the _final conversion_: I've already generated the canvases and need to put them into some PDF.

The _actual generation_ can also often be asynchronous! One playing card does not rely on the others. I can _generate_ those 50 cards in parallel as well.

Applying this across the codebase resulted in a huge performance boost. My most intensive material generators (the most cards and most visual effects) that took 10 seconds before, now run in less than a second.

{{% remark %}}
Obviously, it wasn't as easy as just putting `async` in front of a bunch of functions. Much logic inside those generators relied on things being done in sequence. Now that they weren't, I had to make sure to clone/copy the right objects at the right times. Still, not a terribly difficult conversion for such boosts.
{{% /remark %}}

### Better coding practices

The import and build system for JavaScript is incredibly powerful. I'm learning that more and more, as I come from a background of languages that _don't_ have this or do it in a much less _useful_ way.

As such, my original approach was to create **classes** for everything. I want a general PathFind tool? Well, create a `PathFind` class that you can import and create, then give it a `getPath` function!

In reality, however, such a class is complete overkill. What else is the class going to do? Nothing! All it has to do is find a path based on parameters that you must always input (such as start and end point).

This is just a **function**.

All across the codebase, I tried to make the right decisions about what something should be. In the end, this means there are a few major useful classes, but everything else are just exported functions.

Why does this matter?

* Less verbose. (I don't need to create a new class and _then_ call some function on it.)
* Smaller/faster programs. (If you don't require all members and methods of a class, then including the whole thing is a waste of time and space. As it stands, compilers can't figure out yet whether you actually _use_ everything inside a class. Maybe they never will.)
* Less error-prone. (A function only relies on its input parameters. If there's a bug, I only need to check the body of the function and what my tool gives it, as nothing else matters or might interfere.)

## Conclusion

Another huge update. Many days spent rewriting, renaming, improving, learning better ways to do something, and making sure old projects hadn't broken.

In the end, though, it was worth it---as always.

The website structure is much cleaner.

* No mess of subfolders or extra files needed to make things work.
* Related things in the same place, exactly where you'd expect them.
* Simpler Hugo code to find, combine and build it all.

While I can actually trust my code, both old and new.

* Everything is fully type-checked
* Everything uses the same set of tools, with minimal side effects (due to exporting pure functions, not classes or whatever)
* Where possible, everything is updated to modern standards and better coding practices.

Sometimes I wonder what I'm doing, when I work on my oldest projects. They are simply much worse (both in front and behind the scenes) than anything I made more recently. Is it even worth it? 

Yes, some of them will probably be completely removed at some point. But it's always a great learning moment to update those old projects, and after such updates, it just became _much_ easier to maintain the project going forward. Something you haven't touched in 10 years will most likely be "too broken to work". Something that's relatively up-to-date is much more likely to get the "let's improve this old game and make it shine"-treatment.

All of this makes the website much faster to build. I know, one day I'll have the money to buy an actually functioning computer with an SSD drive and I don't have to worry about every ounce of performance. For now, though, my 10-year-old broken laptop is happy and about 66% faster building the new website.

Until the next update, hopefully far away into the future,

Pandaqi