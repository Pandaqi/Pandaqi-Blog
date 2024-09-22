---
title: "Pandaqi Games: 2024 Update IV"
date: 2024-11-03
emoji: "🎮"
---

This is my final update to the Pandaqi website and all its tools/systems/design for the year 2024. (At least, that's the plan. I always end up finding more things I want to fix, but I'll push those to my next big website update in 2025.)

This time we're going to talk about **HTML5 Canvas**! Yeah! Everyone's favorite topic, I know.

## My Material Generator

For a few years now, all my board games can be _generated_ on the fly on my website.

The first few times I did this, I wrote some janky code that "worked but nothing more" for each game I wanted to generate. Once I saw the patterns, and knew I wanted generate _all_ my board games in the future, I wrote an actual system for this.

{{% remark %}}
At the time of writing, some of those oldest games still run on their custom code. Once I find the time---probably at the next Pandaqi update in 2025---I want to have moved everything to the same, modern system.
{{% /remark %}}

The system is relatively simple.

* I define a "Generator": this is the function that generates all possible cards/tiles/material for the game.
  * Each piece of material is just an object; an instance of a JavaScript class.
  * And it must have a `draw` function which, as expected, draws the thing onto an off-screen `<canvas>`.
* I define a "Drawer": this sets the proper parameters for drawing, such as the size of the cards.
* I define the general "Config" (configuration) for the game, including which assets I need, font sizes, etcetera.

And then the system automatically combines all of this into one clean process.

* Load the assets (images + fonts) needed
* Load/Generate all those objects (that contain the data of every piece of material; for example, a `Card` that knows its `suit` and `number`).
* Loop through all the objects and ask them to `draw` themselves; save those canvases
* Loop through all canvases and place them (in a grid) inside a PDF.
* Download the final PDF.

All of this is _asynchronous_. The cards in a game are independent: they don't need to wait for another card to be done drawing itself before. So instead of drawing them one by one, I ask the browser to draw them _all at the same time_, and then collect the results once done.

This is the right idea. It's faster than doing it in sequence, where you can only do 1 thing at once (in the best case scenario).

Or is it?

## Crashes & Chrome

As my games became more complex to generate/draw, I ran into some issues.

* On Google Chrome, if you've reached some maximum limit on "graphics usage" or "off-screen canvases", it just bails out. It says "Can't decode image" and stops doing anything. This has been a known bug for a while, but nobody has taken the time to fix it.
* On Mozilla Firefox, it doesn't do this. It has the right implementation of this feature: if I want to do more simultaneous (graphics) stuff than my computer can handle, simply delay anything that is "too much" and do it once the others are done. Buuut ... Firefox is at least 5 to 10 times slower than Chrome for generating my material. And on the most complex games, the computer just "hangs/lags" for a few minutes.

{{% remark %}}
What about other browsers? Basically every browser uses the same base code (Chromium) as Chrome, so they all act basically the same. Those that are different are too rare to support.
{{% /remark %}}

This wasn't great.

My first solution was to do "retries". All the code for my generator was wrapped inside an extra function that simply said "It failed? Retry after a delay!"

It got rid of some of these errors, but not all. Because remember that this is a _bug_. Chrome simply stops doing anything if you try to do too many asynchronous (graphics) calls, instead of buffering the overflow. So if it fails even once, because of this reason, there's no coming back from that.

It _did_ overcomplicate the code and make it even slower on Firefox. (Because now everything was wrapped in this try-fail-repeat procedure.)

Okay, so I decided to just keep games a bit smaller and simpler for a while. And, well, "a while" has passed and I _really_ wanted to make some bigger games.

I had to actually solve the problem. It had been on my to-do list for more than a year now, and in hindsight it was absolutely _silly_ not to just fix this sooner :p

## Mistake #1: "Caching"

When I set up this system back then, I thought I was being smart by "caching" individual frames of a spritesheet. When I loaded a new asset (that maybe contained 20 icons), I would automatically split those 20 icons into their separate smaller images. So that, when it came time to draw one of them, I just needed to pick that tiny image instead of cutting it out of the bigger one again.

This is smart, in theory, but in practice I've learned that this doesn't mesh well with the implementation of `<canvas>`.

In practice,

* That loaded asset is simply kept in memory, and cutting out a portion of it is _incredibly cheap to do anyways_. (Especially because that portion is a simple rectangle; I don't even need to do any more calculations for it.)
* While cutting every image into smaller images overloads the (graphics) memory and increases the chance of the crash I just mentioned.

So, I added an option `disableCaching` that simply ... doesn't do this. I used it for a few games and it was the trick to make them actually generate without crashes.

Until I had enough data to confidently say that my "frame caching" was actually _terrible_ for performance and I should just disable it _on everything_. So I did. The property switched to `enableCaching`, but currently not a single asset has that set to `true`.

In hindsight, this seems obvious. _Of course_ it's less taxing for a computer to keep 3 big images in memory, than 3 big images + 60 smaller ones cut out of them.

## Mistake #2: Everything All At Once

My second mistake was to throw the entire pile of work at the computer _all at once_. Now, any modern computer can probably handle this fine. It won't be _happy_ with it, but it won't crash and be really fast.

But I, like many people, don't have a modern computer. My games were getting too big to just ask the computer "Hey draw these 100 complicated cards all at the same time, will you?"

So, about 2 years ago already, I wrote down "@TODO: introduce BATCHING to the MaterialGenerator". I kept putting it off because I needed to restructure core code for it, and that always spells trouble. (I need to really pay attention and have a clear head, or I introduce major bugs down the line.)

I was wrong about that. Or maybe I wasn't. One morning, I had a clear head and nothing else on the to-do list, and batching was implemented 15 minutes later :p

This is how it works.

* A while ago, I made the smart decision to have one object (`MaterialVisualizer`) be the only dependency for every `draw` function. That object knows all the needed properties (such as the size of material or whether they should be "inkFriendly").
* In other words, everything we want to draw is 100% defined by only two variables: the _thing we want to draw_ and the _MaterialVisualizer_. There's nothing else to save, there's nothing else to input or reference.
* As such,
  * After generating all item objects, I save this _pair_ (`{ item, vis }`) for every item in a list. (I call these `DrawCalls`, which is also how they're statically typed.) 
  * Once done, I know exactly how many things I need to draw, so I can just cut it into pieces. (For example, the default batch size is 10. So if we have 15 cards, we do 2 batches.)
  * Every batch is done _in sequence_ (never two at the same time).
  * Which allows it to throw all its DrawCalls at the computer at once.

Instead of asking the computer to draw these 100 things at once, we ask it "draw these 10 things" => when done, "draw these other 10 things" => and so forth.

Technically, theoretically, you might say this loses speed. What if a computer is strong enough to do 50 cards at once? Doing them in sequence, waiting on the previous batch to complete before starting the next one, will waste time!

In practice, however, this difference is absolutely negligible. While the performance on lower-end hardware, like my broken laptop, is night and day.

* Instead of freezing for a few minutes and then spitting out the end result, it generates the same game smoothly in a minute.
* No more crashes or errors.
* I can change the properties of this (such as batch size) easily from the code that creates the `MaterialGenerator`.
* The code change for this is so minimal that the older version can still be toggled ON if I like (just set `batching: false` or a batch size of 0).

As I said at the start: I should've done this a year ago, when I wrote down that to-do item.

I recently finished a game that didn't generate on Chrome (at Regular size; Small size for cards was fine), so I had to use Firefox, which took _15 minutes_ to create it. During which time my computer was mostly unresponsive and I worried it had crashed.

With the new system, even that game---the most graphically complex I ever did---generates quickly and without error on both browsers.

But the new approach has even _more_ benefits ...

## Mistake #3: No Feedback

I made the original MaterialGenerator at a time when I knew giving feedback was probably wise ... but it wasn't exactly an automatic habit of mine :p I also, probably, skimped on giving proper feedback to the user _because_ the original system was coded in a flawed way.

The original generator only gave three feedback moments: "Loading Assets", "Creating PDF", and "Done".

I _couldn't_ give you feedback about the progress in-between, because _everything was done asynchronously_. Everything was created at the same time! Or, well, the browser _tried_ to do that. Which meant I only knew whether it was yet to start (0%) or completely done (100%).

With the new system, giving feedback became much easier.

* We can just update the progress bar for each _batch_.
* We can just update the progress bar for each _PDF Page_ too. (Using the same approach, I batched the creation of the PDF _pages_ too. So, it draws 1, then pauses to give feedback, then draws 2, etcetera.)
* We can even update the Loading Assets stage too, by displaying the most recent asset loaded.

With these simple changes, the experience of using the material generator is _much_ nicer than before. (Both for me and my website users.)

* Instead of waiting (for maybe even multiple minutes!) without feedback, until it's suddenly done ...
* ... you now get constant updates (usually every few seconds) about the exact stage of the process. 

Which means that if something went wrong, such as a bug in my drawing code, I now also instantly see the stage at which it failed.

I had to add _one_ more "inefficiency", however, to make this work. 

You see, when I overload the browser with all these tasks, it has no time to also update the website. If it's drawing the next batch, it's too busy to update that feedback text to say "Batch 2" instead. That's why I thought, at first, that my code was somehow not working at all.

How to fix this? By forcing a delay between batches. 

* Instead of instantly starting the next one, I wait for a timeout of 50 milliseconds. (`await new Promise((r) => setTimeout(50))`)
* Because of the timeout, the browser is doing "nothing" for 50 ms, so it can update the web page to its latest state.
* Which means it actually updates the progress and feedback text.

{{% remark %}}
I have a `giveFeedback` property on the `MaterialGenerator` that I can turn off. When off, it doesn't do any of this and just goes "as fast as possible", but without the ability to give feedback of course. Useful if I just want to quickly get some things tested or focus on one part of the system.
{{% /remark %}}

## Conclusion

### Other Minor Changes

I also made other minor updates (that I should've done earlier) to Pandaqi, of course.

* Listing games in a collection/series of games now uses a nice grid with images, instead of just a text list.
* Fixed a bug where images from interactive examples were waaaay too large (to be practical) on large/high-resolution screens.
* Realized that my `clipping` feature (which restricts drawing something to be within a shape) was implemented in a naive way: it was _relative_ to the position and scale of the thing you want to draw, when you really want it to be _absolute_. (If I say something should be clipped to a circle at position 0, I want _that_ to happen; I don't want it to clip to a circle at position _wherever I happened to be drawing before_.)
* Slightly changed the order/content of the Boardgames page. (It's the one most easily found by people when using Google, but the old version was terribly outdated and introduced the wrong games first.)
* Used CSS variables in a much smarter way to automatically apply the chosen colorscheme to all the relevant elements. (Every game page has a colorscheme like "red" or "purple"; other pages pick randomly.) This made the system more robust, the website prettier, and removed 100 lines of styling for free.
* Many other tiny things I'm forgetting here.

### A bigger change: less styling code, more automatic stuff

I also wrote a simple script to autoload page fonts from the material generation (JavaScript) code. Okay, this one probably needs some extra explanation.

* This entire article talked about `MaterialGenerator`. Every game that generates material, has a JavaScript file (in its assets) that creates this object and passes the right configuration.
* This configuration is saved in a separate file (`config.ts`) and contains aaaall the values I need to set or want to tweak about a game. (Such as how to draw cards, but also how much material to generate and wich fonts to use. Yes, completely changing how a game of mine looks or plays can be done by simply tweaking a value or two in its config file!)
* This means that, for a year now, I basically had to set the fonts for every project in _two places_! Both in this configuration (for drawing the material) and in the `.css` file for the actual game page displayed to visitors. Obviously, these are always the same, and it felt increasingly silly to waste time on this.
* So now it checks if that `config.ts` file exists and then just auto-loads the fonts defined inside that for every page.
* Not only does this save me a lot of time and styling code duplication, it also makes the website less error-prone again on my laptop. The biggest reason why builds/refreshes would randomly _fail_ for me, was because of the massive amount of styling code on the website. By auto-loading fonts, I could simply remove the `.css` file for half the projects, because that's all it did. Faster website, cleaner website.

{{% remark %}}
There are only two downsides to this. First, it means that people who have disabled JavaScript (however rare) will simply not get any custom fonts at all. Second, the structure of those configuration files (i.e. where it states the fonts it uses) can't easily change. I was fine with that.
{{% /remark %}}

### A bigger change: One Paper Games get their own page

Oh, and I decided to move the board generation (for One Paper Games) to a separate page too.

* Everything else on the website is neatly placed in its own standalone page. (At a very easy and intuitive URL. For example, the rulebook is at `gamename/rules/`.)
* These randomly generated boards, however, were the very first thing I made for the Pandaqi website. They still happen _on the page itself_: click a button, wait a few seconds, and you get your random board right there on the page. 
* This seems nice from a user experience perspective, and in some ways it is. But after all this time, I decided there were too many downsides for both the user and me to keep it this way.
  * It's slow and cumbersome to keep scrolling around, and to (re)generate a board while the computer is also drawing the rest of the entire web page.
  * When I update the website to a more standardized look for all pages (in the near future), there is no place for this highly interactive element on _some_ pages.
  * And it made the code _ridiculously_ inefficient.

Why was it so inefficient?

* Most of these games still use the Phaser framework as the backend for drawing. (As soon as my own system has feature parity _and_ speed parity, all of them will finally switch to my custom setup. The features are fine, actually, it's the _speed_ that's the issue. Phaser is sometimes 100x faster at making the same One Paper Game than my own system, which I can't ignore.)
* Because _some_ games still use it, it has to stay an _option_ for all of them. The code has to be bundled with the entry point for board generation because any board _might_ need that Phaser stuff. This means it's actually included on **all pages**.
* But that is a _huge_ framework meant for all-purpose game development. Even when minified with the best possible minifier, it's still 2 megabytes.
* So ... I was adding 2 megabytes of worthless data to basically all pages :p

By moving all board generation to its own page (`gamename/board`), that extra weight is now isolated to those pages. Nothing else needs to load anything related to Phaser; only the games that actually use it, load it when you visit that generation page.

This is also, as stated, one of the final steps I needed to take before I could fully remove the dependency on Phaser in its entirety. 

Unfortunately, I won't get rid of all dependencies. Phaser's drawing backend (Pixi.js) is what makes it so fast, and I need it. I've had to concede that the Pixi framework (which has been open source and in active development for a looong time as basically the industry standard) will always be way faster than what I can conjure up. It's not a difference of a few seconds; it's a difference between getting your One Paper Game in a second or having to wait 2 minutes.

Sure, I did my best (and will continue to do my best) to optimize my own code. But we're comparing apples to oranges here. My drawing system uses the raw Canvas because my computer can't even support more modern drawing technologies (such as WebGL/WebGPU). It's extremely simple on purpose. But Pixi.js was written from the start to leverage those more modern, much faster drawing techniques, and to do it in very clever ways (such as batching similar draw calls). 

There's no point blindly trying to recreate that myself. In the near future, I hope to have finished my "translation layer" between my own website and Pixi.js. I'll remove Phaser---and Pixi.js (which is about half the size) returns as an option for One Paper Games that _really_ need to generate faster.

Nevertheless,

* I learned a lot from trying to do it myself.
* Text is the big advantage for now. My own text drawing system is much more flexible and useful for board games (which often have a lot of text + icons + different styles) than anything I found in other libraries. This also makes it hard, though, to _connect_ it to Pixi.js so the two can communicate.
* It's still faster/easier for my general material generator. (The material for entire board games can be seen as _loads_ of individual, tiny canvases. One canvas for each card, for each tile, etcetera. My own system has no overhead per canvas, which Pixi does, and their efficient batching plays no role when there aren't many (similar) objects _per canvas_.)
  * In other words, using Pixi.js is just an _option_ that certain games of mine can use. Otherwise, it can fall back on a different renderer, such as my own system.
* This simple change---moving board generation to a separate page---already reduced the size of all web pages immensely, so getting rid of the Phaser framework is less of a priority anyway.

Honestly, all of this is _really hard_. It's hard to write solid code that can accept any renderer (without bugs, without subtle drawing differences, without accidentally loading 2 MB of useless garbage on every page, etcetera). It's hard to keep a consistent syntax for _all_ games on the entire website, that I feel is future-proof and easy to develop with. 

And it's hard to know how much of the performance issues (such as One Paper Games taking 2 minutes to generate) is down to my broken laptop and terrible internet, and how much is an _actual issue_ that most people will also have when they visit my website.

In the end, I'm a game developer, not a website/system developer. Most of the time I work on fixing all these bugs and improving the website, it feels like _wasting time_ because I could be _actually making a game_. So I let bugs and inefficencies swim around on the website while I jump onto the next project. And then, a few months later, I hit myself over the head because my impatience has caused messy code and all sorts of maintenance issues for the website :p 

It's hard to balance that. I just hope every "iteration" of the website is slightly more solid and clean.

### Conclusion, for real

But the `MaterialGenerator` is really the big one. Much faster, much more reliable (in all browsers), much nicer user experience with clear feedback on what's happening.

It was such a simple change, in the end. This is really a lesson that it's silly to move certain improvements---which you KNOW are necessary or good---to next year just because you don't feel like it now.

Also, if I ever get the time and learn how to code in C++, I'll see if I can fix that bug in Chromium. It should just buffer/delay asynchronous calls when you have too many and it can't start them now, instead of just ... crashing silently.

The rest of my drawing system still has some rough spots. It could be much faster in certain areas and it misses some features, but the fact I haven't made those features means I haven't actually needed them yet. So I'm fine with moving _that_ to a later update.

The website itself is much better now than it was at the end of 2023. Faster, more consistent, easier to navigate, easier to update (for me). 

But it still isn't where I want it to be. I think the website should be more "standardized", and that it should actually service wider screens in its design.

* Because my screen used to be tiny and terrible, and perhaps I was "thinking of the mobile users", the website design basically centers everything. Every page has a column in the center with all text/images/content.
* This doesn't look the best, and I can't make good use of the beautiful artwork I make for each game now.
* And I have _two_ different stylesheets to separate board games and video games, while in reality those are 95% the same and I should just merge that.

As such, next year will probably see the big "consistency redesign" of Pandaqi.

* Board Games and Video Games follow the same general styles and template.
* The default elements (link to rules, link to material, explanation how to print-n-play) should get their default place and look prominently on the page.
* The big artwork should probably be a faded banner behind everything.
* On wide screens ("landscape"), it creates multiple blocks next to each other. On mobile screens ("portrait"), it simplifies to the current design.

As these updates show, though, creating stuff is an iterative process. Every time I make a few more games, I update a few bits of code, I make the design a bit nicer. And all of that because I learned one or two more things about computers or games or websites. (Such as that bug in Chrome and the bug in my `clip` code.)

In all of this, the _games_---the actual content---will always be more important. Because in the end, a pretty website to service the games is useless if you don't actually have finished, playable, quality games to put on them. That's why I probably make 10 games for every 1 update/bugfix to Pandaqi.com

For as long as Pandaqi is online, there'll probably be update articles like this saying how dumb past Tiamo was and how things are better now.

Keep playing,

Pandaqi