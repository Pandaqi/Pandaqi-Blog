---
title: "Pandaqi Games: 2023 Update (II)"
date: 2023-04-08
emoji: "🎮"
---

A few months ago, I already [wrote an article](/blog/news-and-updates/pandaqi-games-2023-update) about a huge update to Pandaqi games. Behind the scenes, lots of code was removed and improved, leading to the creation of a few "tools" that handle everything for all pages.

A great, great improvement. It allowed me to create 5+ polished, finished games in the mean time. 

But still not enough. Because I didn't entirely know what I was doing, I introduced some unnecessary complexity (or annoyances). 

For example, I presumed the tools would be so small, that they'd just stay inside their own file. Simply load that file when needed, and you're done. As you'd expect, my list of tools grew and grew, until putting everything in one file (or under one name) was just stupid.

I learned that Hugo (a static website generator, the system I use for all my websites) can actually bundle, build _and_ minify your assets! This means that I can ...

* Write each tool as an actual library: with small modules doing one thing, importing/exporting where needed.
* Don't need more work (manually or through code) for this bundling and minifying. (In fact, this new of doing things made my whole set of libraries around 50% smaller in terms of file size.)
* Publish these tools on GitHub, because now they'd be (more) usable for others.
* (Don't have to pollute the global scope.)

## The old system

These were the tools available on my website

* Phaser (not mine) => the great Phaser library for creating web games/images
* jsPDF (not mine) => used to create downloadable PDFs
* seedrandom (not mine) => for seeded random numbers, to recreate random board states
* PQ_PDF
* PQ_CANVAS
* PQ_PHASER
* PQ_SETTINGS
* PQ_TOOLS

Yes, all these were global scope (so I'd say `window.PQ_CANVAS = <the object>`). I'm ashamed of myself as well. But it's alright, I didn't know where this was going and already planned to revise it a few months later. (I just needed it done quickly for the launching/testing of a new game.)


Each game page can indicate which of these files they want (with an array in the frontmatter). Hugo bundles that into one (minified) JS file, and that powers the game.

It's a somewhat smart system. It means games won't load JS they don't need, yet it takes me almost no effort to clearly indicate what a game needs.

But then I took a more critical look at my current and future needs.

## The new system

The biggest issue had to do with duplicate files. You see, Hugo only knows about resources in the `assets` folder if you reference/use them in templates. Otherwise, they're not copied to the final website.

Many of my game pages are _not_ processed by Hugo. They're plain, custom HTML, on a separate page. So ... they don't know about these libraries. I had to keep duplicates of all libraries, one in `assets` and one in `static`. (The static folder is just copied entirely, without modification, to the final website. As the name implies, it's for static assets that things will need all over the place.) 

This is obviously a stupid system. But I saw no (clean) workaround a few months ago.

Other important observations were ...

* All my games _can_ export PDF, and most do so by default. As such, there was no instance where I needed my tools, but did not need the jsPDF library. No instance where I need PQ_CANVAS, but don't need PQ_PDF. In other words, we can simply **build** everything that belongs together (99% of the time) into one library to load everywhere.
* Only two things clearly stand on their own, and are often not needed: Phaser and PQ_TOOLS. 
  * Not all games generate a random board (or use Phaser any other way). This is significant, because the Phaser library has a huge file size. That's also why I'm moving away from it more and more, because I only need a tiny _fraction_ of what it does.
  * Similarly, PQ_TOOLS has helper functions for specific types of games or situations. 
* The seedrandom library is tiny :p Like, not even 2 kB. There's nothing to gain from forcing myself to _manually specify when I need it_. Just include it with the tools, always.
* Creating new bundles (with one javascript file more or less) for all games is just nonsense now. Let's include these tools everywhere, by default.

As a result, I was left with four tools.

* Phaser => a _toggle_ to turn on or off (in my frontmatter)
* PQ_TOOLS => a _toggle_ to turn on or off
* PQ_WORDS => a _toggle_ to turn on or off (this is my dictionary library, pretty large, so let's not include that when not needed)
* PQ_CANVAS => included everywhere, handles all related matters

Why did I turn them into toggles?

* So I don't need to retype the same path to the same JavaScript file every time :p
* So I can use Hugo to build, minify and cache these tools ...
* ... and make them available to everyone, which you can apparently do by simply typing `.Publish` behind the created resource. (It "publishes" the resource to the static folder, available to all.)

{{% remark %}}
Sometimes, you wonder why the simple solutions to your problems where nowhere to be found when you Googled a few months ago.
{{% /remark %}}

In other words, I merely have to work on my library in the assets folder, and Hugo automatically builds it and makes it available to whatever needs it. It saves me tons of work. It allows better coding practices, with small modules and import/export. (And Hugo actually does strong "tree shaking" and such, which is why my libraries became that much smaller.)

## The new system, taken further

The same was true for custom JS files. Almost every project has 1--3 custom javascript files that handle the actual _specifics_ of the game. I, again, had to 

* Specify these by hand in the frontmatter
* (Specify them again when used elsewhere, like a separate "game page" for the game.)
* And saw no easy way to bundle/minify them

Now I know better. Each game already has these files neatly organized into a `js` subfolder.

Now the website automatically does this:

* Check if that folder exists.
* If so, bundle, build and minify all files in there.
* Publish that under a consistent, nice name.
* So I can simply reference that file anywhere else I need it.

This (again) reduced the overall file size by roughly 50%, and the number of custom files to load to ... 1.

In other words, I tracked the page of the newest game I'm working on right now and it

* Started with 8 separate JavaScript files to load, which came out at roughly 150 kB
* Ended with 2 JavaScript files (the general tools + the custom scripts) at roughly 65 kB

Yeah, I'm glad I didn't let this get out of hand and continue the old system. (Although I always aim to stay small and lean, so it's not like my pages were that big or slow before.)

{{% remark %}}
This did have some nasty side effects, though. Sometimes, I explicitly left out one script somewhere else because it wasn't needed. When these get included---automatically---in these bundles, some games started crashing because it couldn't find some global object or required extra library. I spent a messy few hours checking all the games and implementing fixes here and there.
{{% /remark %}}

Each game---out of all the 50+ projects I've made---has one of the following structures:

* It needs no JS
* It needs JS for a random board
* It needs JS for a game interface
* It needs JS for _both_ a board and game interface

As such, I added two toggles: one for the board (files saved in the folder called `js`), and one for the game (files saved in the folder called `js_game`). Turning these on or off automatically does all the bundling, minifying, etcetera. 

This pattern fits the website so well, that I could make the switch within 30 minutes, and update all old projects to work again. But now they all reference 1 or 2 bundled files, very efficiently, instead of 8 separate files all located in the same `js` folder :p

You might say: _well what if you need something else in the future? A system that has two different game interfaces, for example?_ 

To me, this is a case of "restrictions are good". I decided to limit the system this way _on purpose_. Think about it: you visit a game page, and there are 3 (or more) completely different systems there. Isn't that overwhelming? How large would such a page be? I can't even fathom a project that _needs_ that.

As such, if that ever happens, I know I've gone too far and need to simplify my ideas. Or split the project into two separate ones. Instead of overcomplicating my code to support more and more systems.

## Other surprising benefits

I've always hated how the _order_ of JavaScript files was crucial on some projects. That just shouldn't be the case. 

* If one of them doesn't load, or I misplace the order by accident, nothing works. 
* But most importantly: it meant I could not load the assets _asynchronously_, or _defer loading_.

This means people had to wait until that blob of JavaScript files had loaded before the page became really responsive/usable/final. It also meant they were loaded one at a time.

With these changes, all JavaScript is combined into a single bundle. This means I _can_ enable these extras! So I simply changed all these JavaScript links to add `async` and `defer` to them. This means they now all load in parallel, as fast as possible, while you can already see and use the page.

{{% remark %}}
This did mean I had to add an extra line of code to all my board generation code. Instead of initializing immediately---because I knew the Phaser library was already loaded before, manually---I had to wait until the `onload` event. But that's a very small price---5 minutes of edits across the website---to pay for such speedups.
{{% /remark %}}

An extra benefit of _building_ my JavaScript, is the fact that the build system can catch obvious errors. Quite regularly, after porting a game and firing up Hugo ... it reported ~5 errors with the code. Errors I never caught, either because they're rare, or they're soft fails (yes, it's a bug, but the program continues with mostly the right behavior). 

{{% remark %}}
The most common error, though, was a stupid one. I created a variable as a constant, with `const`. But then I changed it later in the code, which means it can't be a constant :p An easy thing for the computer to catch, but apparently harder for me.
{{% /remark %}}

## Miscellaneous

I took this opportunity to properly port some of the latest game interfaces to this new system. (By which I mean: tiny modules that get build, instead of a large script that exposes global variables.)

Most notably, I've wondered for about a year why on _earth_ I made the game interface for [Timely Transports](https://pandaqi.com/timely-transports) completely in Phaser. It has only caused me trouble. Such an interface would be 100% easier to make in plain HTML and CSS---and doing so would allow me to integrate it with my existing tools, because it's currently _the only thing left_ running on its own scripts.

Which means ... sigh, I have to take a day off regular work to completely rewrite this game interface. But it's all for a good cause. (I still remember how glad I was when [Wondering Witches](https://pandaqi.com/wondering-witches) finally had a solid, clean, modern codebase behind it.)

I also took a long look at my "pirate games". I made two, with a plan to make _five_. As such, my website has a custom tool ("PQ PIRATE") for _these games specifically_.

The others never quite appeared, however. Because, as you'd expected, I was quite done with making very similar games back-to-back. Should I remove custom support for this custom tool?

After some consideration, I decided to keep it. The other ideas are still quite solid and I hope to make them soon. And with the new system, it didn't take many changes to integrate "PQ PIRATE" with the automatic builds as well.

In the same vein, [Starry Skylines](https://pandaqi.com/starry-skylines) was basically completely rewritten. Much faster, much cleaner, much easier to use (both for me and my players). I also plan to make a _physical_ version of that game, now that I know how to generate material (to print) on the fly :) But that's for the future.


I think that covers everything I did?

## Conclusion

Looking back, you always wonder how your younger self could be so stupid. Even if that younger self is from less than half a year ago :p

I just didn't know Hugo could do all this. I didn't know how much I needed certain things, and _not_ needed other things. 

Now I've seen the patterns in my work, in the JavaScript build systems, and have a better picture of what's needed. This update makes my life _so_ much easier. (And Hugo generates my website nearly 10x as fast as before. Also a bonus.)

No duplicate code. No manually minifying or bundling. No sub-optimal coding practices because my system can't handle anything else. Everything in one place, everything updated immediately, and the website only became _smaller_ and _faster_.

{{% remark %}}
So yes, I also planned to do the same thing for my other Hugo websites that rely on some huge JS tools. Especially [Pandaqi Tutorials](https://pandaqi.com/tutorials) has some major interactive tools---for some of the bigger courses---that would like this new system.
{{% /remark %}}