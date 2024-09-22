---
title: "Pandaqi Games: 2025 Update II"
date: 2025-03-03
emoji: "🎮"
---

This article explains the second major update I implemented for my Pandaqi Games website. (I usually end up having multiple such articles per year, as I slowly fix bugs, make the website more user friendly, etcetera.)

What has changed? 

* I removed all code for an experimental drawing system that I ended up not liking (and thus not using that much) in the end.
* I moved most of my older games to my new code and design structure.
* @TODO: More??

Below I'll explain each step in a bit more detail.

## HTML Drawing

When I just started generating board games on my website, I considered using _website code_ for it. What does that mean?

Websites have a very simple but powerful structure to _style webpages_ (HTML + CSS). HTML is used to mark the _content_ (such as "this is a paragraph with this text"), CSS is used to mark _how it should render_ (such as "this text should be black and centered"). This is supported everywhere, and I am very experienced creating designs with those systems.

So I thought: why don't I just design every game of mine as a _website_, and then simply convert that to an image/PDF at the end?

For example, a "card" for a card game would just be its own tiny webpage. A One Paper Game would be one large webpage.

So I implemented this system. It used the exact same code as my other drawing system (using HTML Canvas), but in the end I simply call a different function on it: `toHTML` instead of `toCanvas`. 

Every element of my website (an image, a text block, a rectangle, ...) could easily be drawn in one of those systems. I could leverage the power of CSS to automatically align stuff, resize stuff, recolor stuff, etcetera for "free".

{{% remark %}}
To actually convert that webpage to a single image/canvas, I used one of the many libraries for that (`modern-screenshot`). They use a common trick supported by all browsers, which is interesting but too long to explain here. Look it up if you want.
{{% /remark %}}

It was rather neat and I was proud of making it.

So why is it gone? (Of course, I've backed up all that work, but it's essentially 100% unused and unsupported, and will likely not return.)

* I noticed that, in practice, it was **not faster or easier** to use this system as opposed to just setting the properties of elements directly. After a few games, I stopped using it because it had no clear benefit for _most_ projects.
* I had to make a few **concessions** when I made this "HTML renderer". Most were fine, but one of them led to having tons of extra files, classes and helper objects ... which I just didn't want to maintain.
* The largest benefits of this system were **containers** and **rich text rendering**. When I made it, I couldn't do that using my own system. 
  * When I made this system, I didn't have my `ResourceGroup` class yet, which can _contain other stuff_.
  * Similarly, back then I had no `TextDrawer` yet that could draw text in many advanced ways (**bold**, _italic_, colored, images inline, etcetera).
  * But now I can! In fact, the website supports two renderers (Pandaqi and Pixi.js) that can both do this easily.

In short, it bloated the system and made the games that used it hard to maintain, without any tangible benefit anymore.

Which games used it?

* _Creature Quellector_ => HEAVILY used it, as this was my "test project" for the system.
* _Cookie Smasher_ => used it moderately, mostly for the rich text features.
* _Nine Lives: Math Meows_ => only used it for the single text block on cards
* _Pumpkin Patrol_ => used it for rendering a centered list of elements of varying width (some were icons, some text); took me a few more minutes to replace, but not too terrible.

After an hour or two, I was able to replace that code and clean it up. And then the entire HTMLRenderer system could be removed.

Because this renderer was coded badly and loaded that entire library (`modern-screenshot`), this change actually made _all scripts_ on the entire website significantly smaller. My final reason to remove this.

_Will it ever return?_ There might come a day when I truly need this, because a webpage=>image process will be so much easier for a project than canvas=>image. If that happens, I will bring back the code using my new renderer system, which allows renderers to be _completely standalone_ or _decoupled_. That would be a significant rewrite, but nothing too major. Because as I said: the original code is quite good and worked.

I doubt it, however. In over 100 games, I only used the system 4 times, and only _heavily used it_ once.

This does mean, however, that those 4 games might have some bugs now. I obviously tested if they still work, but I can't test _all_ random generations and settings permutations, so some stuff might be missing or in the wrong place. Let me know if it is!

{{% remark %}}
This is also why I'm happy I started creating "premade" PDFs for all games, always. Even if the generation code breaks down, people can always just click Download and get a valid PDF from the Google Drive.
{{% /remark %}}

## A special case: the Pirate Games

I made two games during a period when I really wasn't feeling it, and the website wasn't really maintained in any other way, which I dubbed the Pirate Games (_Pirate Riddlebeard_ and _Pirate Drawingbeard_).

Unsurprisingly, these are _completely_ detached from all other systems, and their code is a mess.

* They were the only games still using the Phaser framework.
* They had lots of inefficient code creating images again and again, and simply stupid ways to connect the different systems that it needed.
* They didn't _fully_ use my rendering system---drawing a few things in a custom/raw way to a canvas---which is always just a source for future problems.

Or, they _were_ detached, until I finally fixed them with this update!

It was a bit painful, but I ripped out Phaser and replaced it with just a plain canvas. Then I rewrote the code to be much cleaner, asynchronous, and use my standardized system for declaring everything to be drawn.

The result is that the _script_ file for both games was reduced in size by ~75%. The other result is that the game itself loads + draws way faster. And your browser doesn't "hang" when it can't find a solution for a few seconds.

{{% remark %}}
These games randomly generate a "puzzle" to find a hidden treasure. Because of the random generation, it might fail to find a valid puzzle the first 100 tries, which is why it _can_ take a while. In practice, though, the game now boots in only a second or so.
{{% /remark %}}

At the time, I wrote down some more ideas for Pirate Games (or "randomly generated puzzle One Paper Games", I guess). Those are still quite strong, so there's actually a chance now that I will continue this series and give it more entries.

Moving the existing games to the modern setup---the final ones to do so---was simply the first step on that journey.

## The Generation -> Visualizer Combo

A while ago, I landed on this system for my material generation.

* Every game simply calls the `MaterialGenerator` and gives its configuration.
* That generator does all the necessary setup automatically
* Then it creates a `MaterialVisualizer` object => this is the _only thing_ passed into objects so they can draw themselves as needed.
* And when done, it does all the necessary finishing and wrapping up (such as creating the PDF) automatically

It's a really clean system that has simplified all the code for the last 50 games. It's fast, it's clean, I barely run into issues where I'm confused why it does something (or not).

So I decided to use it for _all_ the games, including those One Paper Games that only generate a single paper.

After some fiddling around, I managed to make it work in exactly the same way, but with some crucial differences for the One Paper Games. 

{{% example %}} 
It has a setting to "split the board": it cuts 1 A4 into 2x2 or 3x3, which is very useful for more complex games to get a playing board that's actually the size of a regular playing board.
{{% /example %}}

I rewrote all the old stuff to accept a `MaterialVisualizer` as input and need only that to draw themselves. This was quite a lot of work. Thanks to the typechecking system and my experience with this, however, there was never really any change of bugs or conversions failing. Once the typechecker tells me there are no more errors, I am pretty certain the older game will work exactly as it did before.

In doing so, I did encounter a few bugs in those older games _and_ a few missing features in my visualizer. 

{{% example %}}
The visualizer _expected_ you to have a `debug` property in your config. Simply because that's what all my new games have, so I never even considered that it might receive a configuration without debug options. So it crashed when that happened :p Stuff like that is easy to fix---simply provide a default `{}` object if no debug is set---but you still have to find the error at some point.
{{% /example %}}

{{% example %}}
My Wondering Witches game has the setting to generate a double-sided board: 2 papers, instead of the usual 1 paper (for a One Paper Game :p) After converting the game, I tested it ... and the second paper was mostly blank. Huh? It worked before, right? Or DID it work before?

As it turns out, I completely forgot to "reset" the cells of the map before doing the second drawing. As such, when trying to generate the backside, the system was like "all these cells already belong to a garden and are done! Don't draw them anymore!" An easy fix---three lines of code to loop through the paper and reset it all---but only found because of this.
{{% /example %}}

This combination has a secondary advantage too. It means all the drawing is now _stateless_. What does that mean?

* Before, many of my older games would set and read all sorts of properties on the card/paper they were drawing. They would draw commands _instantly_ to the canvas too.
* This means that I can never draw these things repeatedly or asynchronously, however, because _drawing_ has _side-effects_. The second time I draw a card, it might have different properties!
* This is just a breeding ground for all sorts of nasty issues and limitations.
* Instead, now everything visualizes/draws itself without any side effects, because the `MaterialVisualizer` determines exactly how stuff is drawn, and anything else is a local variable within the function that isn't saved.

{{% remark %}}
This does mean that some older games get a LOT of parameters put into functions, like `drawSidebar(visualizer, group, a, b, c, d, something else)`. As opposed to just saving all those values with `this.a = val` and then reading them later. But that's fine. The maximum parameters is a mere 5, and that's in one of my oldest One Paper Games that does some VERY complicated drawing stuff.
{{% /remark %}}

Taking a step back, I can see that the entire journey towards this system learned me a few really good coding practices. When I made a tiny video game a few weeks ago, I noticed how the quality of my code had _massively improved_. Simply because I've been burned by having side-effects, by having things too tightly coupled, by having to do maintenance on old code that was written with a very loosey-goosey mindset.

Now I know that, in most cases, you want **dependency injection**, where the dependency is a class that **does a specific thing**.

* Every `.draw` function has the dependency "MaterialVisualizer" injected into it.
* As the name states, that object _does_ the actual visualization. The material itself just prepares the right properties, resources, commands, etcetera and then _hands it to the visualizer_.
* Because the visualizer is responsible for all drawing, I need no other inputs or dependencies, just this one.
* And because the material itself knows _nothing_ about rendering or drawing, the most expensive part of the code (such as the entire PIXI Renderer) is only loaded _if the MaterialVisualizer needs it_. If I use a different renderer, only _that_ code is included in the JavaScript bundle.

In a video game, for example, this would be something like.

* You have a `Map` class that generates a random world map (with countries, rivers, terrain, whatever).
* But "generating countries" is a _different action_ than "generating rivers".
* In other words, all these different elements of the map should be their own class that's injected into this main function: `MapCountries`, `MapRivers`, etcetera.
* Moreover, these classes are only responsible for _generating_ the data and the numbers. If we actually want to draw the map, we'd introduce a different `MapDrawer` for example.
* This means that everything is clean and decoupled, that everything only has one purpose and does one thing well, but you can combine them (or not) any way you want by simply including the dependency.

Anyway, this conversion was _relatively_ quick because I'd already standardized my own drawing language way back. Every game, with only two exceptions, already uses the same names for everything, the same resources, the same `LayoutOperation` to draw stuff.

It's just that, before, they were doing it _directly_. That's the power of my system. You can group and batch stuff and draw the whole thing at once later ... or you can just draw _one thing_ immediately to a canvas, if you want. It's all the same thing, just a different function called at the end of it.

Or ... well ... it _should_ be the same thing, but there was one little stupid decision I'd made about how to name certain things.

## Stupid naming conventions

Okay, so, remember that HTML Layout system I talked about at the start? It was completely flexible. You could use that system for a few elements of your game, but my regular (canvas) renderer for others. They were interchangeable, they could weave together however you wanted, and they all used the exact same constructor object to set those parameters

Which was nice ... but provided a naming collision.

* I had to differentiate between the _position of an HTML node_ and the _final translation of its (potential) canvas element_
* I had to differentiate between the _size of an HTML node_ and the _drawing size of its (potential) canvas element_.

Because, in some specific cases, you'd be able to set _both_ from the exact same constructor/params object. And, me being hopeful and interested by this new system, thought I was going to use the HTML system for everything from now on. So I gave the most "sensible" name to that, and a more complicated one to my custom renderer.

* HTML used `pos` or `position` / Canvas used `translate`
* HTML used `size` / Canvas used `dims` (for _dimensions_)
* To make matters worse, I somehow used a **verb** for some things (_translate_) ... and a **noun** for others (_rotation_). I only caught this a while later, and it was too late to "easily change it" then. It's obvious in hindsight, but when deep into the code, this is a very subtle error.

Well, the HTML system is gone, and if it returns it will surely not be stupid enough to do this.

As such, I had to do a massive rename across the entire website to use `pos` (for position), and `size` (for size), and to use **nouns** for all. 

{{% remark %}}
Nouns are generally longer than verbs, but also more correct. The property is the _final value_, not the _change_, so it should be a noun and not a verb.
{{% /remark %}}

In general, the process was as follows.

* I backed up the entire thing beforehand. (I use Git version control too, but I also just like copy-pasting the entire JS folder to my desktop, as it's easier to "revert" one or two bad files by just copy-pasting the old version back and doing that one manually.)
* I searched the entire website for `translate:` and `.translate`, which catches 99% of the references to this property. Then I replaced them all with `pos:` and `.pos`
* I did the same thing for `dims:` / `.dims` => `size:` / `.size`
* And I obviously updated the LayoutOperation itself to use these.
* Then I did a final check on the words "translate" and "dims" (without anything else attached) just to manually see if I missed anything. There are always a handful of weird cases where I decided to write/manipulate a layoutOperation in a weird way, and this found them.

Yes, yes, I am now much more conscious of how I name stuff and how consistent it is. This was just a mistake of old that I had to correct at some point, and this point---when the Layout system had a massive update anyway---seemed the best one.

Honestly, the most annoying part of this was that my oldest games used a `size` property on the global configuration to read the final card size. But now it had a naming clash with what used to be called `dims` and contained the _grid dimensions_ (such as: 3x3 cards on this page) for the PDF. For 8 games, I had to go in and rename that property to `sizeElement` in both the configuration and anywher else it was used.

Otherwise, if you do a 1-on-1 rename of something, it doesn't tend to give issues outside of unique naming clashes. Because the code doesn't care if all the variables are called `rotation` or `rot`. (Or variants on that, like variables called `rotationLeft` that are now just `rotLeft`.)

Still, I hope I never have to do this again :p

## Performance?

After all these changes, the code is clean and it works cleanly ... but I didn't really focus on performance. Now, for the most part, this is not an issue. It's fine to wait a few seconds until your material is generated, and even the most complicated One Paper Games (thanks to PIXI) only take a few seconds.

But ... there are a few "hybrid games" on my website that use my drawing system to _repeatedly draw stuff_. (Such as updating every frame while playing a game.)

One of those games is just unplayable now. As soon as it has to load images/text ( = expansion enabled), it lags so hard you can't do anything. Even when it only has to draw ~5 images and text boxes! I was pretty sure I'd accidentally introduced some major stupid regression, like re-calculating loads of stuff every frame, so I went on the hunt for performance issues.

### What was NOT the issue

I tested the _creation_ of new classes (such as new Resources or LayoutOperations). I tested all the empty classes that are in the system, and all of them are extremely cheap---as they should be, but I wasn't sure anymore.

Creating 100 empty resources or operations (without actually _drawing_ them) takes 0 ms (rounded.)

This confirmed that all the delay was in the actual drawing/application, not the creation of the objects/tree in the first place.

### Improvement #1: Cache single frames again for re-use

First of all, I remembered I'd disabled automatic caching of spritesheets. (When the image is loaded, it used to be automatically cut into its individual frames. But in practice, this turned out to be heavier and slower than needed in most games.)

Now, when it wants a frame, it cuts it out of the bigger spritesheet on the spot. That's obviously _also_ a waste! It should cache the cut-out frame after getting it once. So that, when the system wants a frame multiple times, it can just re-grab that one instead of cutting it out again.

I profiled placing a ResourceImage on a canvas 100 times. First, it took **300 ms** (milliseconds). Now it took **~200 ms**.

### Improvement #2: Don't stroke and fill ... if we have none

This is just a stupid one. When drawing anything, it calls an `applyStrokeAndFill` function to, well, apply the stroke color and fill color to the object at the right time. (When to do so depends on the stroke alignment; if the stroke is on the outside, for example, it should come BEFORE the object.)

Well, as it happens, it also called that function and did `stroke()` and `fill()` on the canvas WHEN THERE WAS NO STROKE OR FILL.

So, yeah, for probably a year _every_ single element has tried to add a stroke and fill color to itself, even when it wasn't set at all. And I didn't notice this, because, well, if there is no color it defaults to "transparent" so this effect is just invisible.

Bailing out early when there is no stroke/fill reduced the profiling from **~200 ms** to **~100 ms**.

### Improvement #3: No temporary canvases when not needed

I'd written this down as an optimization over a year ago. It was, again, silly that I only actually implemented it now.

At the start of every LayoutOperation, it creates a temporary canvas. Why? Because it's needed for certain common effects. 

For example, take a `ResourceGroup`. It first needs to collect all its children in one place before I can draw it. Otherwise, if I add a drop shadow to it (for example), it would apply one _to all the individual children_ instead of the group as a whole. As such, it needs a temporary canvas first where it collects the output of all children, and then it draws _that_ onto the real one.

But ... for, I guess, 80+% of operations this just isn't needed. So I wrote a simple check to see if a temporary canvas was even needed. If not, don't create one duh!

This brought the timing (for drawing 100 ResourceImages with common settings) down from **~100ms** to just **~10 ms**.

My first check, however, was a bit ... naive. After some more testing and profiling, I realized I needed to be a bit more conservative about when to add that temporary context. (That is, some things drew _completely wrong_ now because I didn't create a temporary canvas when I _should have_.)

I wrote a better, more conservative check that basically does this.

* Loop through all _effects_ and see if any of them need a temporary canvas. (This is just one variable I manually set on all effects, and so far only two actually need one.)
* If it's a _group_, it _always_ needs a temporary canvas. (For the reason I just mentioned: it has to collect all results into another canvas before drawing _everything at once_.)

With that change, the performance (for drawing 100 images) is now **~90 ms**. Still not amazing, but far better than before and definitely usable in simple real-time projects.

Yeah. Should've done that sooner. As expected, this makes _all_ Material Generators (not the One Paper Games) more than 5x as fast. Because the gains per resource drawn obviously compound into bigger and bigger gains when you draw lots of things, multiple times, on multiple cards, for an entire game.

At this point, we're losing most time on the conversion images => PDF (which is simply slow and can't be sped up further), instead of generating + drawing. I am fine with that. Getting an entire high-quality PDF with 60 playing cards, for free, with one press of the button, within 10 seconds, is more than fine.

## Conclusion

With every update, the website becomes faster, cleaner, easier to use, easier to update/work with for me. This is another major one, and perhaps me brevity in summarizing it doesn't really do it justice.

In a way, I'm glad my website didn't "blow up" before now. As far as I can tell, there are some visitors here and there trying my games, but nothing more. In the past few years, the website has been in a somewhat broken state _many times_, sometimes for several weeks or even months.

Only now, after so many iterations and growing so much as a developer/designer, do I feel like the website is very robust and trustworthy. It will do as you ask without crashing, without delay, without weird issues. It's fast, it will work everywhere.

Hopefully, this means I don't need to do more massive updates in the future, and I can fully focus on _making more games_ again.

Until the next time,

Pandaqi