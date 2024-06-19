---
title: "The Dangers of Desynchronized"
date: 2024-10-10
emoji: "🚧"
---

Not too long ago, I made a very simple party game called [Slippery Slopes](https://pandaqi.com/slippery-slopes/). I made it rather quickly in a single weekend, but it turned out okay. 

Good enough, in fact, that I made a _digital_ version too that very same weekend. Now you could also play the game by visiting the page on my website!

All was well, so I pushed the game to be launched a few months in the future and continued with my life.

Until the game "launched" and ... it was completely broken.

You see, the _entire_ idea of the game is that you get randomized sliders (a scale between two extremes, such as "hot <-> cold") and must _communicate a word_ by setting the sliders. Maybe you get the word "pizza", so you'd probably set that slider more towards "hot".

Those sliders are drawn dynamically. You press the button to start/reload the sliders, and it draws 4 of them right there using the HTML5 Canvas element.

{{% remark %}}
Why? Because it's much faster and less boring than drawing them by hand and loading those images. Also because the sliders are somewhat randomly generated, with different extremes, colors, optional actions on them, etcetera.
{{% /remark %}}

Well, when I checked out the game on my public website, those sliders _did not appear_. They were drawn behind the scenes, there were no errors, everything _should_ be working ... but it didn't. 

It all worked fine on my _development_ branch of the website. Which should have the same code behind the scenes as the _public_ one. So the first thing I did was check if there was any mistake there and I'd accidentally completely differentiated the two---but I hadn't.

Okay. So what could it be?

I check the code, step by step, using the old "explain your code to a rubber duck" method to catch any oversights. But nothing seems out of place.

In fact, the material generator of the board game version (the original _Slippery Slopes_) is fine! I can press the button, wait a few seconds, and it spits out a PDF with 50 perfectly drawn sliders.

Both these versions obviously use the exact same code/object for the sliders, with _no_ difference at all. The interactivity of the digital version is merely a layer on top, _adding_ listeners for clicks and changes to this slider image.

I am completely baffled. I try, and I debug, and I change, and I rewrite, but the sliders just _will not show up_ in the digital version. I only get back an empty canvas every time, even when I turn off ALL drawing commands and do a simple "make the entire canvas black" line of code.

At this point, I'm pulling my hair out and punching a few walls. This is stupid! I've wasted _hours_ on a bug that leaves absolutely no clues! A bug in code that, when run by different games, but still the _exact some code_, works fine in one instance and breaks 100% in the other case.

Until, after all this debugging, I've _finally_ found a possible way out.

My game studio website has a large set of tools (or libraries) that I've developed myself and reuse in almost all games. One of those is a simple function `createContext(params)` that initializes a canvas element, following some extra parameters or setup that I often need, then returns the _context_ that I can immediately use for drawing stuff to it.

Well ... when I remove that function and just create a barebones canvas and context myself (using `document.createElement("canvas")` and `canvas.getContext("2d")`) it _works_! It's the only way that I actually get back something visible!

But why? _Why!?_ I spend another 30 minutes checking my helper function, but there's nothing odd there. It's a really small function that works perfectly fine for the 50+ other games that use it, so why would it break now?

And then I spot something funny.

In that function, it sets parameters for the context. For example, you can set `willReadFrequently` to optimize the canvas for when you need to read it a lot. The list of possible parameters is a bit longer than I remember ... in fact, there's one in there that I don't recall adding or using at all ...

The `desynchronized` property of a CanvasRenderingContext2D.

I turn it off by default. _Everything works perfectly again._ AAAAH.

As it turns out, I copied this list of parameters and set defaults for them _when I just started with the Pandaqi webiste_. I probably copied it from some documentation or a StackOverflow answer. That property was there all along, but I never used it and it never gave issues until now.

Because what does it do? It _desynchronizes_ the drawing and the logic of a canvas element. 

In other words, 
* Normally, inputs (such as clicks on the canvas, adding the canvas to another container, etcetera) and drawing to the canvas happen in the same update. They must wait for each other to complete.
* But when they're desynchronized, they don't. You might tell the canvas to draw something, but it doesn't do it yet, and you click a few milliseconds later and it does that _first_. There is no guaranteed order.

I probably left this `true` by default---and so did the person from whom I copied the code---because it is obviously _faster_. If things don't need to wait on each other, you'll waste less time and your code will be faster.

But now, for the first time ever apparently, I'd made a game that dynamically drew canvases _and_ had dynamic input. (The players reloading the sliders, then using their mouse to set them to their desired value.)

And so this property messed up the order.
* The `Slider` is asked to draw itself.
* The specific function that asked this neatly waits for its Promise to resolve ... (Drawing is asynchronous in my system, even when not technically needed.)
* Buuuuut because the canvas is desynchronized, it already wants to add the canvas or listen for clicks _before_ it is done drawing.
* And so an _empty canvas_ is added to my interface. (But there are no errors, because the _real canvas_---with the correct Slider visuals---is done a few milliseconds later and exists behind the scenes.)

At least, that's my understanding of the bug/property, and the understanding that led me to fix it.

This was probably one of the hardest, most invisible, most technical and stupid bugs I ever had to track down. 

It was one of the events that really signalled to me that I need to slow down and make sure the Pandaqi website stays _lean_ and _small_. It's growing too large, with too many exceptions and corner cases, and it just leads to messy broken situations like these. I've already started on a big clean-up that standardizes more of the code and provides stricter type checks, for example.

That property is now `false` by default, until I figure out a better way to handle this. It feels like there should be some event or _something_ to say: "Hey, wait for long enough until the canvas is truly ready" But I can't find it yet. At least, not a _clean_ and _concise_ solution.

Anyway, this was my quick anecdote about how I wasted one evening. (And why _Slippery Slopes_ was broken and unplayable for a few days, sorry). 

It's also to warn you of the dangers. The dangers of the `desynchronized` property of CanvasRenderingContext2D, yes, but also the dangers of blindly copying code from docs or a StackOverflow response and forgetting to check it for years :p

Until next time,

Pandaqi