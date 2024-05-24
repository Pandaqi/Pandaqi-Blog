---
title: "My Thoughts on the Godot game engine"
tags: ["review"]
thumbnail_media: "godot_banner.webp"
date: 2024-07-07
---

This isn't necessarily a review of the **Godot game engine**, as I think that's not terribly useful. There are so many different workflows, types of games, use cases ... that you can't really "review" whether a game engine works for everyone.

Instead, this article simply contains my brief thoughts and experiences on using it. At the end, I give some of my biggest tips/advice that I learned along the way.

I've used Godot for ~10 years now. 

It started with a classmate at university who wanted to make a game with me. I picked Unity almost by default, but he insisted this upcoming Godot game engine was worth a shot. And we were not throwing away our shot!

As usual, one of us was more willing to do the work (it was me, I swear!), the game / collaboration went nowhere, and after a second failed attempt we never actually made a game together. But I liked the Godot engine and stuck with it.

I have made mobile games, web games, game jam games, puzzle games, local multiplayer games, paid games (that people actually bought, unbelievable!) I was a co-writer for one of the first books about Godot 3, which was new and hip then. Some of my games have landed on some of the big HTML5 gaming websites.

I have seen, from the sidelines, how Godot grew from a tiny niche engine into one of the big three (Unity, Unreal, Godot). And in the future perhaps the biggest. 

Frankly, I wish I'd actually been more involved, as I feel I really missed a big opportunity there. But I was still at school and jumping around between hobbies, so the fact I finished games at all is a small miracle. Additionally, I come from a poor background and had to live with a computer so crappy (for years) that it simply couldn't make games. 

{{% remark %}}
If you check my portfolio, you will notice no video games at all were made or published during those years. I had to resort to designing simple board games and writing during that time, and even that was barely possible for my laptop.
{{% /remark %}}

But I have never actually given my thoughts or anything close to it on the engine and the process itself. This article tries to remedy that.

_This article was written in June of 2024, using Godot 4.3._

## I think Godot represents a dream

The entire _philosophy_ that willed Godot into existence is a dream. 

* The dream that making games could be done for free.
* The dream that it could be done on your crappy laptop with barely any disk space.
* The dream that anyone could build something fun in their spare time.
* The dream that an editor and solid project structure could be combined, making it easy to use but also powerful.
* The dream that those free and open source engines would be as good as or even exceed the big ones that are used for the "professional games".

Somehow, in Godot 2, I saw that dream. Looking back at it, that version was obviously extremely weak and limited compared to what the engine can do now.

And I think most developers do. Godot is just the right balance between something small, quick to install and boot, easy to use ... and something that can be as powerful and support as big of a project as a major game release.

The way Godot works, under the hood, is simply exactly how my _brain_ thinks about games and code structure. How I believe it should be!

* Everything is a scriptable node with a single, specific purpose.
* Create any behavior by building a tree of the right nodes.
* (And instantiate, duplicate, modify this any way you like, as everything is just represented by these nodes.)

That's it. That's the consistent rule that you use for everything. It almost automatically leads to the functionality you need.

* The nodes become "components" for their parent, creating an Entity-Component relationship if you want. (And you can reuse those components however you want, which is clean and prevents repetition.)
* You can instantiate any node/tree from another file easily.
* Godot provides all the default functionality you'd want with its own nodes.
* But any script on a node _extends_ it, so you can add any stuff on top.

This is more important than anything else, I feel. The quality of the editor, its features, its bugs, it's all _secondary_ compared to this core "structure" or "workflow" that is behind everything.

Because in the end, the majority of the work---the hardest part of the work---is figuring out a clean approach to turn ideas into code and gameplay. Figuring out the structure. Which node goes where, which function call goes where and how would I call it, how do I reference the state of that other object cleanly, etcetera.

To me, Godot manages to do all of that right. It has the easy, predictable, hierarchical structure that helps good coding practices ... without being too strict or daunting.

And that's the dream, isn't it?

## The good and bad of open source

### Good pace and strict decisions

For the most part, I think Godot develops at a good pace _and_ the decisions made have a strong foundation.

Over the years, I've seen both massive updates and fixes for the things that bugged me most. For example, I have a lot of physics-based game ideas (usually resembling real sports, as I'm a physical person), but for the longest time Godot had no support for one-way collisions. 

Despite pushback and some people vehemently disagreeing with the change, they ended up going with the best arguments and the majority vote, and they implemented one-way collisions at some point. Suddenly, many more game ideas of mine opened up---or, at least, became much simpler to implement.

Similarly, the jump from Godot 3 to Godot 4 was absolutely massive, with complete overhauls for almost everything. To do so in a few years time, on an open source project, is impressive. One thing that helped there, however, was rejecting anything that was not absolutely necessary, even if "all other game engines do support this feature".

The development team is strict in which features it considers and adds to the core engine, but I can _usually_ get behind that. Keep it small, keep it minimalist, focus on the most important matters.

### Bugs for Eternity

Buuuut it's not all sunshine and roses.

There are plenty, plenty game-breaking bugs that will simply be left unresolved year after year. Developers mention that single bug making their dream game impossible, and it's not picked up at all, not even a little.

And, well, we can't _expect_ others to do the work for us, of course. It's open source. People contribute their own time to it and fix the things that _they_ need to fix. Anybody who doesn't have the time or knowledge, simply has to hope others help them at some point.

These mistakes or oversights in the engine, however, were so egregious sometimes that they caused me stop making games in Godot for a while. You simply ... lose trust in the engine? You think that any idea you have will become impossible at some point because you discover yet another area that is wildly unstable. You think the physics engine will NEVER work the way it was intended.

This still isn't fixed. It remains open source. And the core developers remain opinionated on what belongs in the engine and what doesn't---what gets attention and what doesn't. I can make a long list of things that really need to be fixed or added, just from the top of my head, and I don't know if they will in the next 3 years. (And all of them have already had a GitHub issue for a long time.)

With the latest releases _and_ the large influx of funds/money, this has improved considerably. Godot 4.3 is very stable and well-featured so far, and many good things are on the horizon, because people are paid to actively work on that aspect of the engine.

Beyond that, it's mostly speculation, but I still wanted to mention it. Several huge contributors have left Godot over the years, hinting at disagreements or it simply being impossible to do their work. We have no proof or details, but it seems to me that the core team behind Godot can be a bit too firm in what they see as "the right way" and "how it should be done". Huge contributions with a lot of support are swept aside because one of the core Godot developers just doesn't want it in the engine. Someone hired to fully oversee area X gets no freedom to actually do so.

### Example 1: Physics

This was felt the most, by me and many others, in the physics department. The state of physics in Godot was always mediocre. Then they put someone on it full-time, and they made a few big changes, and then left on what seems to be bad terms. Since then, physics in Godot have been abysmal for years, only now improving because people ported _other physics engines_ to it.

Before that time, I had simply given up on all my physics-based game ideas. The bugs were endless, the inconsistencies endless, and the lack of support equally endless. When I used another engine and physics collisions just _worked_, it almost seemed like magic.

### Example 2: Batching/Culling

Similarly, for the longest time Godot had no batching or culling. 

Batching means that similar objects can "batched" into a single one as the game runs, which massively improves performance as it only needs one draw call. This is the difference between 500 FPS and 5 FPS on the exact same scene.

Culling means anything not on camera doesn't need to be rendered. Again, the difference between 500 FPS and 5 FPS on a scene that looks exactly the same.

These are core features any game engine should have. They are proven, there are numerous reasons to have and use them. 

But for the longest time, the core developers flat out refused. Stating it wasn't _that_ necessary. And most games did not _really_ need it. And it would add a slight overhead, despite, now that it has been implemented, the gains proving to be massive. 

Those things have happened and will continue to happen, I feel.

## What I like the most

### Open (Source)

Anyone who knows anything about me, will know I am all about openness, sharing, freedom. 

Godot has always been completely open. Especially at the start, people were very willing to share their own games or projects to help out others. My first few games with Godot certainly had some scripts and shader code written by someone smarter than me.

With the engine being used for bigger and more commerical projects, of course, this has slightly decreased. But the ecosystem around Godot has not commercialized nearly as much as I feared, perhaps _because_ people come to the engine to get away from that.

### Clean and Minimal

Especially nowadays, the editor looks very clean and sleak to me. I open Godot, I want to make games.

As opposed to something like Unity that just looks like homework from 1995 when I open it. (Though I must admit I have not worked in Unity for several years now.) Or, of course, the many engines that have no editor or only a _very_ rudimentary one.

I find the interface easy to read and easy to use. Even though I am almost 100% a code guy---for example, I almost always connect signals between nodes through code---I still end up using the editor a lot because of how easy it makes many things.

And despite all the updates and features, it never felt bloated to me. I have always been perfectly able to find the property or button I was looking for and use that. That is, of course, partially a consequence of the core contributors being very picky about what should be added.

### The underlying philosophy

As stated, the underlying philosophy of "everything is a node with a specific purpose" and "combine the nodes into reusable templates to define behavior" feels like the best way to create (large) games. After all those years, after trying so many engines/languages/structures, it has always come back to this.

Add to that the reliance on signaling and powerful tools for manipulating/searching that tree, and it's why I stuck with Godot for so long and made the most games in it.

(For example, I love Phaser too, but it's far messier in its approach and design. It's more loose, allowing for quicker prototypes of tiny ideas, but I'd never consider it for any large project because of how blind you are about the structure and tree underpinning it.)

It's what matches my brain and my ideas about how code should work best. It's what allows quick iteration that doesn't become a big mess after a few days.

It also means that I understand and appreciate the _future_ direction of the engine. I feel like it's worth investing time and making my games in it, because it will be supported for a while and/or the code/scenes will transfer nicely to later versions.

{{% remark %}}
Not exactly, of course. I wouldn't love converting a large Godot 3 project to Godot 4 because of how many stuff I'd need to rename update. But if it was really needed, I know I _could_ do it in a few days, because I had to do so on a smaller project. The core structures and code of Godot stay the same; only what's around it changes.
{{% /remark %}}

### Exporting & Platform Support

For the most part, Godot makes exporting for _any_ platform easier than any other game engine I tried. From my crappy Windows machine, I've always been able to create builds for all the platforms (be it desktop, mobile or web) that worked immediately 99% of the time.

(That one percentage is just a byproduct of tiny bugs in Godot, tiny mistakes in current OS versions, or tiny bugs in my own code that only came to light because of this exporting process. _Windows filenames are case-sensitive, everyone, heed my words!_)

I know that I can build anything I want and then, at the end, deploy it everywhere with the click of a few buttons. That is a nice feeling that lets you focus on the actual game developing.

## What I like the least

### The GUI support, partially

It is _great_ that Godot has these built-in GUI nodes for common things such as buttons, lists, containers, adding margins, sliders, etcetera. (This might have been added to the previous section of what I like the most, if it weren't for the downside I'm about to mention.)

This makes it easy to setup an interface that looks good, resizes properly, and reacts as needed. (Especially something like a bulky settings interface is a dream in Godot compared to any other engine.)

There are, however, two major downsides.

**Downside #1:** _Styling_ those components happens through themes. A feature that has undergone loads of changes over the years, often accompanied by bugs, and there hasn't been a single iteration that I understood well or liked working with. 

Properties are sometimes named weirdly or located in an odd location, or maybe they only accept one specific value that feels inefficient to you. Adding a unique style for an element uses a weird process of adding that element in some place, then editing it in another. And the GUI often doesn't update until you close and reopen the scene, or maybe Godot entirely.

Things like that.

**Downside #2:** Due to the node structure of Godot, the GUI can quickly grow into _massive_ tree of nodes with super long and/or similar names. Anyone who's made a GUI with Godot knows what I'm talking about. (_MarginContainer > VScrollContainer > CenterContainer > MarginContainer > it never ends._)

This makes it hard to update or parse at a glance. Any direct references to these nodes, which you need a lot to grab values or link signals, will constantly break as the hierarchy changes.

They've made some efforts to mitigate all this, such as being able to grab a Node with a unique name (without having to specify the entire path towards it), but it's still a long way off from being enjoyable to me.

### Physics, man

As stated, the built-in physics engine/support in Godot has been completely broken for a long time now. 

Yes, there are now a few other libraries/extensions that you can install and use instead. That's great and all, but I'm reviewing the core engine here. And in that piece of software, you want to reconsider _any_ idea for _any_ physics-based game you have.

I have tried so many times. Each time seemed promising, each time I learned a few more tricks to work around the limitations and make it a bit more stable, but it was never enough. It's one of the big reasons why I gave up on Godot for a while, because the types of games I wanted to make---silly, physics-based party games---were unnecessarily hard if not impossible.

### Performance (though less and less so)

As stated (again), the performance of Godot used to be pretty terrible. Sure, a simple 2D project would be absolutely fine. Anything big, anything 3D (of any size), wasn't great.

I really tried, again, by learning all the tricks for optimizing models, materials, draw calls, etcetera. That was instructive and helped a ton, but it was too much work for too little gain, and the entire idea of a game engine is to _take away that kind of work_.

Nowadays, performance is much better. Both of the engine itself (its graphics engine in 2D and 3D), of its built-in GDScript (if you use static typing, the same piece of code can be 100x faster), and its extra "features" such as batching, culling, optimizing draw calls, etcetera.

So perhaps it's unfair to place this as a downside, as this is mostly based on _previous_ years of experience, and the fact I have a crappy laptop that can't run anything. But Godot seemed especially slow on it all that time, with even unoptimized web games sometimes having better performance.

### Move fast, break stuff, make unfortunate choices

I am very much a "move fast, break stuff" guy myself. I would even strongly argue that any software project should be run this way if you actually want to achieve meaningful, fast progress in the real world.

Godot also moves like this, with many breaking changes (or sudden deprecations of systems) happening all the time. And for the most part, that is good. It has allowed it to grow massively in a short amount of time and gather a lot of data about what users want/need/struggle with.

Godot development, however, has a history of applying this methodology in exactly the wrong ways.

**Issue #1:** Sometimes the core contributors _do_ decide to take time on a feature. So they break it, promise something will take its place soon ... and nothing comes for _years_. 

For example, web export for C# has literally been impossible for years now. Or the issues with physics and the performance issues.

It's almost like tiny bugs are given priority, solved with the next release in a few weeks, while the actual major issues are given the lowest priority possible.

**Issue #2:** Many unfortunate choices were made by betting on the wrong horse. I'm not knowledgeable enough in all these matters to know whether it was "unfortunate" or just "a bad decision", but the result is that the Godot engine has swung in wildly different directions over time trying to predict where to go, only to realize it took entirely the wrong path. 

Such as the previous example: the reason C# can't export to Web is because the bet on the horse that was the new .NET version that would support mobile, but it didn't come when it was promised.)

Or the fact that they spent a lot of effort making GLES 3 the main driver of the software, only for it to never take off or reach any amount of user base, and to be replaced almost immediately by Vulkan.

This methodology only works if you have a strong list of priorities (the biggest breakages are certainly the ones to be investigated and fixed first) and you use this "move fast, break stuff" to actually move fast and bet on many different horses. This ensures one or two of your choices will end up being a good one.

It's far easier to rip out large pieces of code that ended up being suboptimal or not the best solution, than to try one thing, having the engine in a broken state for a while, only for it to be replaced because it was the wrong decision in the end.

### Big builds for web

Finally, a major issue _if_ you're inclined to distribute your games to web game portals. File size is crucial here, as the game has to be delivered over Wi-Fi, and people who play these games do it _because_ they have a tiny window of time and want something quickly.

Godot's exported web games are just too big, period. Some people will (again) defend it with all sorts of excuses and tips for making it smaller. I know them all, I did them all, because I have a few Godot-built web games in some of the big portals.

But _no_, you should _not_ have to rebuild the entire game engine from scratch and have intricate knowledge of how browsers and server compression works just to get a web game that doesn't take a minute to load.

I'm not sure this can ever be fixed, due to how Godot handles web support at its core, but I really hope so. When I was in discussion with my first web game portal (about transfering one of my games to them), I learned this for the first time and tried to get some data on this.

The exact same simple (web/mobile) game in Godot was 20+ MB, while in Phaser 3 it was 2 MB. That's a non-negligible difference.

## Tips for Workflow

Finally, some hard-earned tips for workflow and project structure, after doing it wrong countless times (my specialty!).

### Overall Structure

The biggest tip is ...

> **Group your files based on usage/intention, not type.**

So, so many tutorials will create a folder called `scripts` and put all scripts inside it. Then they'll create a folder `scenes` and put all scenes inside it. This is grouping by _type_ and it is _awful_ :p

Now, a simple player object in your game will have many different assets _spread across your entire hierarchy_.

* Its sprite is in `images`
* Its script is in `scripts`
* Its nodes are in `nodes`
* Blabla

Instead, put things that belong together ... together. Create one folder called `player` and everything connected to the player is inside: its assets, scripts, nodes, whatever else.

Going further, use this on the high-level as well. If your game has levels, put everything connected to a single level in its own folder (`level1`, `level2`). If your game has expansions (as in, optional DLC), put those into their _own folder_ too.

This makes it incredibly easy to turn entire sections of your game on/off while exporting. For example, to export a demo and a full version. Or a base game and the DLCs. Or simply for developing and debugging.

This also reduces lots of wasted time looking for assets in the wrong places, updating broken links, forgetting what was where. You need to edit the player? You _know_ everything related to it will be inside the `player` folder.

I really wish I'd understood this far earlier. Now all my oldest games have a terrible structure and make it impossible to be updated/edited now.

### Scenes, scenes, scenes

The power of Godot is in its nodes and scenes. How you can save any set of nodes as their own scene, then instantiate them elsewhere. **Use this** as often as possible, even if it feels ridiculous in the moment.

> Whenever you have a set of nodes that fulfills a singular function, save it as a scene.

Yes, even if it's only 2 or 3 levels deep, or only a handful of nodes. Save it as its own scene, use that instead.

Why?

* If you need to re-use this anywhere, now you can! For free!
* It's simply cleaner. You are forced to _name_ what these nodes do and isolate different functionalities from each other.
* Most functionality only grows larger and more complex over time (as you develop a game). Now you are prepared! (Because it's in its own neat file, instead of part of a bigger tree somewhere, it can grow a bit larger without becoming overwhelming.)

For example, maybe my player has a few subnodes that handle its animations. Perhaps a `Sprite2D` or two, an `AnimationPlayer` or `AnimationTree`, a script. This isn't the end of the world, but it's also a set of nodes that is self-contained and does only one thing.

Save it as a scene. Something like: `player_animator.tscn`. The Player tree will now look much cleaner. And if this grows more complicated over time, you have the space to grow in that small scene.

### Use static typing

GDScript is absolutely fine. But if you're going to use it, use _static typing_, and any other nice tools that it supports (such as _classes_ and _enums_).

There is a reason the major languages all support those things. They are incredibly useful. They give a _lot_ of safety and structure to your codebase. I think, however, most Godoteers (?) don't even know these things exist. 

That's why I mention it.

* You can create scripts that aren't attached to any node! Type `class_name SOMENAME` at the top. Now you can use this class anywhere else in your entire project.
* You can automatically infer type by doing `var a := something` instead of just `=`. If that doesn't work, you add the type yourself behind the colon (`:`).
* You can do the same for return types for functions with `func blabla() : RETURNTYPE`. Lock it down as much as possible, and you'll be surprised how much that helps.

In doing so, you force yourself to think about what everything is (preventing bugs in the first place). Godot will also complain whenever you access functions that don't exist, or try to use something that's the wrong type, and more (preventing even _more_ bugs in the first place!)

All programming is data transformations. And the most common issue with them, is _using the wrong data_ (input, output, or along the way). With static typing, you can completely eliminate the biggest cause of bugs _before even running your program_. Do it. You still get all the freedom and easy going of GDScript, don't worry.

{{% remark %}}
Many people dislike GDScript precisely because they feel any project turns to mush after a while. And I have felt exactly the same, the first few times I used GDScript _before_ static typing was a thing. It's so loose and dynamic that any reasonably large codebase feels like an untamed chaos and a chore to work on. So use static typing and prevent that situation.
{{% /remark %}}

Final tip: scripts that _are_ on nodes (and thus extend them) can still be classes! Just put that `class_name NAME` thing before the extends declaration at the top. Now this node has a unique defined type you can also use in other scripts.

### Other tips

Use **version control**, such as `Git` (and an online repository on e.g. `GitHub`). Godot is especially useful here, as the way it saves all its scenes and data is using _plain text files_, which is ideal for version control.

Use **signals**. Whenever you are about to reference another object directly in your code, consider using a signal instead. One object emits it at the right time, the other listens for it. It's another powerful core feature of Godot that promotes good structure.

You can create them manually in the editor, or from code. 

In the ideal situation, _most_ parts of your project shouldn't even know the others exist. Or, at least, they shouldn't _rely_ on the others existing. You will never completely get rid of strong coupling, of course, as the entire (practical) definition of a game is a combination of systems and mechanics that need to somehow share some data or work together.

Use **dependency injection**. Traversing the tree as the game runs is _expensive_ and _error-prone_. As much as possible, you want nodes to ... 

* Be _fixed_. So you have them cached in a variable at the start of the game, using `@onready`.
* OR to be _injected_. Instead of grabbing the node as you need it, you already _have_ it (for sure), and insert it as an argument into another function.

For example, say we have many entities in our game that need to move around. We could, of course, rewrite the same (or similar) movement code in many different places. But we're better than that!

We can create a single `mover` script (or "module"). It has a `move(node)` function, where the `node` argument is of course the node you put in. That function then moves the node around to a new position, and doesn't depend on anything else.

This allows it to work for any node you put, be it a player, a bot, an NPC. It also means that the function can rely on the fact that the node exists (for sure). If it doesn't, the caller made a mistake, not this script.

(An alternative is to use an `@export` variable that accepts a node. You can just drag-and-drop the node it should move into that, from the editor, and it will be fine.)

## Conclusion

Some people who don't like Godot give the argument that it dictates how you should structure games too much. You're free to dislike Godot, of course, but this is the worst argument to support it. 

Because Godot actually dictates _too little_ sometimes. You're free to structure your project however you like, create folders and files at your discretion, use signals all the time or not at all, use classes all the time or not at all. This is what led me to have terrible structures or code practices for many years. Hopefully my tips can help people there.

The open source aspect will continue to be slightly unreliable, and sometimes frustrating, even if it's mostly handled well. You simply can't "expect" bugs to be fixed within a certain time frame, or that the area of the engine _you_ rely on the most will be developed further in the coming year. This was a dealbreaker for me in the past, but it's far less of a dealbreaker nowadays. The engine is more solid, more well-rounded, and actually has funding.

Besides that, I really like the philosophy behind the engine _and_ the way it's executed. Once you get to grips with it, you can very quickly create any sort of game, with a clean structure and project hierarchy.

For tiny games, it feels like overkill. It'd probably go with something like Phaser. 

But for any larger, serious game, I would always pick Godot. It's more lightweight than Unity or Unreal, it has lots of functionality and principles that I think are the best solution to the problem it tries to solve (and which Unity/Unreal might not even have), while its output is (nearly, almost, soon) on par with those engines.

Those were my thoughts at this time. Hopefully, going forward, I can start making more video games again and perhaps release my first big game using Godot.

Until next time,

Pandaqi