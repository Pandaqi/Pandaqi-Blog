---
title: "My Thoughts on Defold Engine"
tags: ["review"]
thumbnail_media: "defold_banner.webp"
date: 2024-07-07
---

This isn't necessarily a review of the game engine, as I think that's not terribly useful. There are so many different workflows, types of games, use cases ... that you can't really "review" whether a game engine works for everyone.

Instead, this article simply contains my brief thoughts and experiences on the Defold game engine. This was written from the moment I opened it and tried it for the very first time, with no prior research or knowledge. I _did_ already have much experience working with the Lua coding language.

_This article was written in June of 2024, using Defold 1.80._

## Why did I try it?

There were three reasons, with increasing levels of stupidity.

* NORMAL: I regularly try to learn a new engine or language to challenge myself. Despite being quite content with Godot, I still don't think it's wise to stick with one piece of software (and one language/ecosystem) 100% of the time. 
* SILLY: After being unble to make video games for _years_ because of a _crappy computer_ (and no money for a better one), I can finally do so again. I decided to use the opportunity to re-evaluate my workflow and try loads of new options. (Being away for so long, making board games in the meantime, taught me a lot of things about why my previous workflow sucked.)
* STUPID: I was at risk of losing my AdMob account because I hadn't shown any ads in a while. Why? Because I couldn't update my mobile games to their latest requirements, thanks to the crappy computer again, they called the games ineligible and removed them from the Play Store entirely!

And so I thought: Defold is a pretty big engine that is tailored to mobile and web games, with AdMob supported right out of the box, let's give it a shot!

{{% remark %}}
I tried the engine ~4 years ago for a single day. But it was exactly the day when their build servers were out because they forgot to update their security certificate in time, so I wasn't able to do anything and basically wasted an entire day debugging a problem that wasn't my fault. So no, I wouldn't say I have actual prior experience with Defold.
{{% /remark %}}

## How did I evaluate it?

I'm an improviser. I didn't follow any tutorials, I had no "plan", nor did I spend hours pouring over the interface learning every button before I did anything. (Also because I think those steps aren't terribly useful for actually learning.)

I simply grabbed a very simple game idea and made it. I grabbed one that was almost entirely GUI-based, as I thought "click a button -> do something" would be an easy first step.

Was I right? Yes and no.

{{% remark %}}
It doesn't really matter for this article, but the general game idea was to have a sort of idle game without even the idleness. You just get a set of options each round, click one, get its reward/action, and we go again.
{{% /remark %}}

## What I like

### Focused components

Defold clearly grew out of _necessity_. The way it structures things, the things it supports, it's all pretty tailored to specific use cases that regularly pop up in game development. ("Hey, we need X all the time. Let's make it a default feature of the engine.")

I had a hard time working with this, as I am more used to _abstraction_. Game engines that provide loads of abstract "building blocks" and it's up to you to build something from them. To reach any specific outcome, such as a GUI, you need to combine multiple abstract pieces in your preferred way.

In Defold, there is a dedicated `GUI` collection type which can only have a `.gui_script`. The collection can only contain the expected `GUI` nodes (text, box, etcetera) and the script can only call functions available to the global `gui` object. It's a very _specific_ implementation that was meant to implement one thing and can't be reused or recombined very freely.

The fact I struggled with it doesn't mean I think it's bad. I actually think it's quite good: _most_ small games will need those specific elements (and nothing more), so for _most_ situations this is actually faster and more intuitive. Remember that Defold is clearly focused on smaller mobile/web games, though it slowly tries to expand its horizons judging from the past year of updates.

Because of this, I was able to get my row of clickable buttons (nicely centered and generated dynamically) within an hour or so. Without following any tutorial, without knowing Defold at all.

### Nice editor

To me, software with a pleasing aesthetic isn't just a "nice to have". It's essential. If you're going to be looking at that software 6 hours a day, for many days, you want to look at something nice, and clear, and legible, and which motivates you to work instead of draining you.

The Defold editor looks quite nice and works quite well. 

It's an example of keeping things small, simple and minimalist, while also looking quite serious for business. When I open Defold, I look at it and think "let's make a game!"

### Quick builds, small size

Of all engines I've tried, Defold by far has the fastest builds (both HTML5 and Android) and the smallest final size.

Yes, even Phaser 3, an actual JavaScript framework with nothing else attached, is _bigger_ than what Defold outputs. (I'll also have a thoughts/review article on that some time soon.)

### Its design rewards good coding

Defold made a few core decisions that I struggled with as well (at first), but which I understand and appreciate.

**1) Messages.** Almost all communication between elements happens by posting a message to them. This is a simple line you can write anywhere:

{{% highlight lua %}}
msg.post("address receiver", "message id", "message content")
{{% /highlight %}}

This forces you to have a loose coupling, instead of referencing or reaching into _other_ objects all the time. (This is also far more efficient than _checking_ if things changed or happened each frame.)

Most problems can be solved with this, perhaps after thinking a little longer about how you approach them. For example,
* My GUI script checks if a button is clicked.
* If so, it posts a message to the ButtonHandler script.
* Which determines what should happen, and potentailly posts a message to another script/object to do that specific thing. (Such as the Inventory that is asked to update a resource.)

This is neat, this is nice. Most of all, Defold provides basically _no_ other ways to do it, which encourages the good practice.

**2) Components.** Everything in the game is one of three types (with some rare exceptions):

* Collection: A group of things
* GameObject: A thing
* Component: A part of the thing

This is exactly the structure I often tried to "impose" on other game engines, because it's the best in my experience.

* Every bit of functionality can be its own component. So it only does one thing and it does it well, and it can be reused.
* You can then easily combine these components into entities that actually represent the game.
* And you can group those entities in case you want to apply bigger operations, duplicate them, keep a clean hierarchy, etcetera.

This also explains how to send messages: the first argument is the _url_ to the other object.

* To go one level deeper, you use `/`
* To get the _component_ of something, you use `#`

So, for example, if I want to post a message to the "mover" component of my object "player1", I'd post the message to `/player1#mover` 

If this player were inside a collection "players", you'd do `/players/player1#mover`.

And if you send something to an object on the same level as you, in the tree, you can leave out the slash and use a relative link.

It doesn't really explain this well, though. I don't know what the documentation was doing, but it took a long, winding, inexplicable route to conveying something so simple and basic. I basically figured this out by just horsing around and trying lots of things.

Anyway, this rewards good structure again. There aren't really other ways to do things, so you _have_ to seperate your logic into components/modules, and you _have_ to get a nice hierarchy to make the URLs/addressing easy.

**3) Other.** It underpins good structure in many other tiny ways. 

Such as images only being usable from an _atlas_ by default. 

(An atlas is a large image that contains many smaller images. This means it only needs to be loaded once and can then be reused everywhere, which is faaaar more efficient than loading each image separately. It also means you have just ONE file to reference everywhere, and can change it as you go, instead of having to update links if you ever update some asset filenames.)

Or, the implemented helper functions are all pure and functional. 

For example, to get a node in your GUI, you type `gui.get_node(url-to-node)` (from inside that `.gui_script`). That is the _only_ way to do so. 

If you want the child of another node, you have to know its full url and go through that function. In most other engines you'd be able to type `node.get_node(url)` instead, accessing default functions on that node object. But in Defold, everything goes through functions with a clear input and output, having no permanent state or hidden changes.

This is a bit of a purist argument, I know. The other approach is absolutely fine, as evidenced by the majority of systems working with classes/objects and hidden state. But I've learned from experience that it just prevents so many ugly bugs and unintended logical errors if everything is _functional_ and each function only depends on the input.

## What I dislike

### It doesn't know if it wants trees

So, the structure of a scene is a _tree_ of collections, gameobjects and components. To send messages to others---which you'll do all the time---you need their exact url based on that tree.

But ... that's kind of where it ends? It has no (or almost no) support for traversing the tree or doing any further manipulation with it. I felt _blind_ all the time, not understanding what was happening with the tree and the hierarchy, not understanding why it couldn't find this node or that.

For example, there is no concept of "instantiation" (from a template/blueprint/stored tree).

When I made those GUI buttons, I had to ...

* Create one base button (just a box + text for now), which I then _hide_.
* Then, on initialization, _clone_ this base button to get all the other buttons.
* Then, after cloning, reset their new id to something more readable. (And then those id's are stored for later use.)
* Then, after frustrating trial and error, realize it has _not_ kept the tree structure! Instead of a box with a text _child_, it duplicated the box and the text node and placed them both on the same level. Which is exactly what a developer would NOT want 99% of the time. 
* Until we finally have a mess of Lua code just to instantiate a very, very basic identical button a few times.

It's as if Defold desperately wants to hide the tree and wants you to use this one other thing to accomplish a task. As if it created a tree system on accident and now tries to backpedal :p And sometimes, that "other preferred solution" doesn't exen exist.

Something that started simple and productive---"Hey! I made a clickable button already, Defold is great!"---turned into a nightmare just because it _has_ a tree structure that underpins everything but doesn't provide _useful functionality to see or manipulate it_.

### The editor is a bit barebones

Yes. The editor _is_ barebones, despite harcore fans claiming it isn't on the forums, with questions like "I don't understand. What else would you need!?!?"

The built-in code editor, for example, feels like going back to prehistoric times when you're used to something like VS Code. Sure, it has the essentials that you really need---such as syntax highlighting and error checking as you go---but nothing else. 

I couldn't find any way to wrap the lines (which I desperately needed, working on a small tablet). Autocomplete sometimes completed things with variables that didn't even exist in my entire codebase. One time, within my first hour with it, the entire editor crashed while simply typing code.

There were more tiny bugs with the editor that were ... annoying, but nothing too bad.

As a last example: sometimes it refused to show any of the textures. So I'd build/test the game, and it would only show the GUI boxes and text, while all images/sprites were just invisible. (When I exported a web build, or built it on a different computer, they all showed up fine. So it wasn't just an accidental toggle by me or something.) That was the most annoying one, as that makes it literally impossible to test your game.

### Lua is ... shrinking on me?

I don't know what the opposite of "growing on me" is. Maybe "falling out of favor" or "losing preference".

When I first met Lua (long ago), I thought: "Nice, a minimalist language that only provides the necessities, which makes it fast and free."

After trying to make several games with it, I thought: "Okay, Lua _could_ have supported a few more things or provided a bit more safety for the developer. But it's still a nice little language."

Now, using it once more (in combination with the other oddities of Defold), I can only think: "Lua is only good for very small, very loose prototypes. Anything else needs a lot more safety and functionality."

When I first met Lua, I'd barely ever made a professional/finished game, and only used a few languages. Now I've used tons of languages, made tons of games, tried tons of engines. And it kind of saddens me that almost all the game engines use Lua exclusively. 

Yes, it's easy, it's fast, it's so minimal anyone can pick it up in an hour.

But the disadvantages are _everything else_, and they outweigh the advantages in any serious production environment, I feel. Even for beginners! All those other languages have _syntactic sugar_ and _helper functions_, so you can just type something like `array.pick_random()` and it does it for you. In Lua, beginners have to do everything themselves, which actually makes it _much harder_?

If Defold---or any of those other game engines---just supported another language that is statically typed and has more support for you, it would be a world of difference. As it stands, Lua is a toy language to me: it's only fun if you go in with the intention to play around, not to work.

## Conclusion

It's not fair to base an entire review on just _one_ attempt (at a very simple GUI-based game), so I started a few more tiny projects in Defold.

The fact I didn't properly finish any of them says enough. The game idea is promising for many of those attempts, actually, and for that reason I persevered and made as much headway as possible. But the disadvantages, for me, outweigh the advantages.

* It's small and lightweight, both the software and the building/output.
* The editer looks nice and works quite nice, but it could use some more love to fix tiny bugs and add more common features.
* Lua is meh. Fine for very small and simple games, not fine for more.
* Defold has nice structures it imposes on you to enforce good practices (such as messaging/signals and entity-component relations). It, unfortunately, barely _supports_ those or outright has _no_ alternative. I often feel blind and in a cage for absolutely no reason.

What would I personally like to see?

* Adding simple "template" support, such as making a button once and instantiating it as often as needed, would go a long way. Having "include one base node, hide it, then duplicate that all the time" as the _standard procedure_ for including multiple objects of the same type is bonkers.
* The GUI could _really_ use more node types, such as a container that automatically puts the buttons in a row/column/table, automatically resizing/centering/adding margins, etcetera. This is functionality needed 99% of the time, and something very basic that shouldn't be hard to implement. (While GUI is needed for any game BUT always annoying for developers. So yes, I've reached the point where I've started reviewing game engines based on their GUI support only :p)
* More debugging tools, more easy control/insight into that tree that is so important, would surely help.
* At least the _potential_ for other programming languages. (Or their support for Lua and any "helpers" or "tools" must be so amazing that I can look past its flaws.)

I think Defold could be a _great_ engine _for me_ if it fixes those issues I mentioned. At this moment, no matter how much I tailor my ideas to Defold (tiny mobile games using the specific things the engine was made for), it doesn't tailor to me.

Those were my thoughts on Defold game engine.