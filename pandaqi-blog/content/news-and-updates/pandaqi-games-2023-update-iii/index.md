---
title: "Pandaqi Games: 2023 Update (III)"
date: 2023-05-08
emoji: "🎮"
---

Over the year, I've published a few updates on this blog about the inner workings of [Pandaqi Games](https://pandaqi.com).

First, I explained how the code was a HUGE mess (from almost 10 years of projects, going back to when I was a kid and had no clue what good programming was). I solved that by moving everything into simple libraries that were reused across the whole website.

Then I explained how I figured out this was still far from ideal. Many games were loading 0.5 MB of stuff they didn't need. I had to manually toggle lots of things on/off. I discovered the built-in JSBuild system from Hugo and how powerful/useful it was. So I rewrote those major libraries using the build system and migrated the newer games to it.

Fast forward a few weeks. I'm already hitting the limitations of _that_ update :p Well, rather, I still think it could be automated further and be setup to prevent issues in the future.

Why? When migrating older games to the new system, suddenly all sorts of (tiny) bugs cropped up. The bugs were apparently always there---it's just that the new system is smart enough to report those. Similarly, I discovered a game that needed to load the Phaser library, but it didn't, so now the whole game page was basically broken.

Problems, problems, and I don't want those. The final straw was the publication of Phaser 3.60. A _huge_ update that added a new way to use it: as modules. (Which prepares us for Phaser 4, which should be entirely modular and using the modern prototypal way of writing JS.)

Instead of manually telling my website ...

> "Hey, I promise this game will need the Phaser library, so load it _first_ for me, alright?" 

... I can simply include the modules I want right into the JS code for that specific game. If it compiles, I know for sure that the necessary Phaser components were loaded. And with that change, I will _finally_ be free of manual tweaking and potential bombs waiting to go off.

The website would just have my "PQ_GAMES" library, consisting of many tiny modules (one for creating a PDF, one for starting Phaser, etcetera) that each game can use as they want.

Clean, fast, consistent, and hopefully the last major behind-the-scenes update I have to do in a loooong time. If it all builds/compiles, I can sleep safe, knowing I haven't let another game stay broken for a long time without knowing it. 

{{% remark %}}
As always, I wished I'd done this years ago, and hadn't started creating (big, public) projects when I wasn't quite ... fully formed as a programmer yet. You live and you learn.
{{% /remark %}}

{{% remark %}}
Another side-effect is code that's shorter and easier to read. The old way of creating Phaser scenes, and making sure Phaser was loaded before executing them, was ... messy. Lots of boilerplate, copied code, and indentation :p Now, the code for generating a board can just be a clean class and that's it.
{{% /remark %}}

## How it works

Last article proudly proclaimed how my "PQ_CANVAS" library would be loaded automatically for each game. Well, that idea turned around 180 degrees.

The library is now called PQ_GAMES (much better name, of course, as it's not just about drawing to a canvas). It does **not** load automatically, only for games that specifically say `pqGames: true` in their frontmatter.

Because anything a game needs from it will be _build into its JavaScript bundle_. To play that game, I just need to load the resulting bundle (with all the custom game code), and we're good. I only keep custom support around for my oldest games, which I haven't found the time or energy to convert. (Because I might remove them entirely, or because the code just doesn't fit at all with the new system and would need serious rewrites.)

Now, there are some downsides to this.

* Every single bundle on the website, for every game, is inflated in size. Because what used to be loaded as a general library across the whole website (e.g. Phaser), is now (partially) _build into_ each bundle.
* Even more rewriting and restructuring work for me, potentially breaking many small things for games that I will not discover for months :p I can test if a game works in general. I have confidence in my code, especially the latest projects. But I can't test _everything_ again, before publishing new updates to the website.

Other than that, this update leads to more certainty and less manual labor for me. It also prepares for a future in which I ...

* Either use Phaser 4, which should be completely modular and slide into this system perfectly
* Or step away from Phaser entirely, replacing the things I use it for with custom modules grabbed from my own PQ_GAMES library.

{{% remark %}}
As you see, Phaser is one of the big issues here. That library is HUGE and basically my only external dependency, even though I only use a _tiny subset_ of what it can do. But it's intertwined with the whole website, tens of fully-fledged games, so I can't just get rid of it.
{{% /remark %}}

## Going forward

Some tiny, hidden things here and there will surely be broken. Maybe one obscure setting for a game stopped working, or a very old project of mine suddenly changed its look (because we bumped from a rather old version of Phaser to the newest one).

Other than that, everything now integrates nicely and has way better checks for safety and correctness. I _expect_ this to be the last big change to the website for a while. Once Phaser 4 rolls around, I will move to its modular system, which should considerably reduce file size on all JavaScript bundles. (And yes, the creator has said that it will launch without 100% of its features. But I only need some very basic things that I'm certain it will have from the start.)

Most new games, especially this year, already use my `PQ_GAMES` for everything and nothing else. Over time, I expect the (very) oldest games to just ... go away, and before you know it, we're only left with projects using the same, modern system.

Similarly, over time my own library will grow and contain more functionality. For example, I recently added a function to _tint an image_ (which I used to randomly recolor parts of material for a board game), and another helper function that checks _if a line intersects another line_ (because I was surprised by how often I needed that exact thing).

The library will be tailored completely to the needs of _my_ website, my work, my games. So I'm not sure if I'll ever publish it publicly or do more with it. But the plan is to have a future in which the site relies solely on that one set of tools I've built and maintained---and kept small, minimal, and fast---and nothing else.

This year has seen the biggest updates to Pandaqi (Boardgames) ever. Many, many games released. The website is basically a completely new website at this point. Let's hope this prepares us for an even brighter future :)