---
title: "Pandaqi Games: 2024 Update II"
date: 2024-07-03
emoji: "🎮"
---

This article explains the reason behind another big update to my [game studio website](https://pandaqi.com). One that is still in progress and probably will be for a while.

What's the issue?

## The Problem that broke me

Ever since I started (randomly) generating material for (board)games on my website, I've used my own system. I completely wrote my own tools, functions, library for drawing and generating stuff.

(My oldest games used Phaser. But that was a HUGE dependency with lots of stuff I didn't need, and had an API that didn't really mesh with how I think and what I want to make. So I already transitioned later games away from that, and will completely remove the Phaser dependency entirely at some point.)

For the most part, this has been fine. It's not rocket science to work with the HTML5 Canvas API, and provide tools/wrappers around it to help me create what I want to create.

As my website grew, however, and my projects became increasingly complicated and varied ... I ran into the limitations of what Canvas could do. I've always known that WebGL was more powerful and useful, but I like being minimalist _and_ work with a broken old laptop that literally can't handle WebGL. That's why I stayed with Canvas for my graphics and dedicated time to my own, minimal, efficient, consistent API.

Until it just didn't work anymore.

Here's the issue.

All Canvas commands are _immediate_. To draw an image, I literally call `drawImage` and it will stamp that texture onto the canvas I give it. 

It will do so using the _current state_ of the Canvas. If I want a Drop Shadow effect on it, for example, I need to set that on the canvas beforehand.

Now let's think one step bigger: containers or groups. It's incredibly useful to be able to _group_ different graphics so I can move, rotate, tint, etcetera them all in one go. (And I can create a tree structure with parents and children.)

How does this work?
* We create a temporary canvas on which we draw all children.
* We set the right properties for the _group_
* And then we stamp that entire temporary canvas on the main one.

This also works fine.

But what if ... we have interaction between the groups? Most notably, what if we have a group where some parts have a different **blend mode**? (Or "compositeOperation", as Canvas calls it).

* Say we have a group containing a texture (just some sprite/image) and a block of text. 
* We want the texture to "blend" with the background. In other words, we need to set the `compositeOperation` for only that element and draw it on the current state of the canvas.
* But ... we just saw that we can only draw groups _all at once_ if we want to apply effects. If we draw each image seperately, applying a Drop Shadow would do so _to each child separately_, which looks completely different (and is not the right behavior).
* In other words, we must draw things individually (to the main canvas), as well as draw things collectively (from a temporary canvas). Which IS NOT POSSIBLE AT THE SAME TIME.

I researched, and tried, and experimented, but it's just impossible by nature of how Canvas works. 

All I can do is provide hacks and workarounds for specific situations. For example, I can introduce a few more temporary canvases, draw everything both individually AND collectively, then "knockout" duplicate parts we don't need. This, however, is extremely slow, hard to do, and only works for very specific types of effects or blend modes.

I had to give in. We had to make the switch to WebGL.

And this switch had to _wait_ until I got a proper computer, which means the website has been running on those small workarounds and hacks for a while now. (For the most part, I just make sure I never use a lot of blending modes or effects.)

## Switching to Pixi.js as a backend

Fortunately, I was right about the initial setup of my system. I wanted a unified API, in plain English, that required no extra setups or baggage. I made that and it probably never has to change.

This allows me to keep all the generation code the same, but only swap out the _backend_. The actual implementation of what's happening behind the scenes.

And there is no need to do all that work myself. The `pixi.js` library is robust, fast, battle-tested, and as small as possible. (Phaser actually uses a modified version of it behind the scenes. In a way, I've now bypassed Phaser and just gone straight to the one thing I actually need from it.)

At a high level, this is what needed to be done.

* Add a toggle that allows picking between my own renderer or Pixi
* If Pixi is chosen, we ...
  * Create a raw PIXI renderer (from the canvas we already have)
  * Convert the raw resources into their PIXI equivalent
  * Then ask the renderer to draw those and return the result

{{% remark %}}
It only creates a renderer if it has no parent. Because if it has one, then it's surely not the root of this tree, which is the one holding the main canvas and managing the whole thing.
{{% /remark %}}

The biggest issue, of course, is that conversion step.

Again, at a high level, this just means creating the right class:
* A ResourceGroup becomes a PIXI Container
* A ResourceShape becomes a PIXI Graphics object, and I need to convert between my own representation and whatever they want. (Though they mostly follow native Canvas commands, which my own library obviously also does, so that's fine.)
* A ResourceImage becomes a PIXI Sprite / Texture
* A ResourceText is done entirely by me. (My own TextDrawer class is way more powerful as it allows rich text / formatting.) The resulting canvas is simply given back to PIXI to draw as is.
  * The same for any other resources that PIXI doesn't support (enough). I just call my own system and hand back the final canvas

At a lower level, I convert between my own names for properties/filters/settings and what PIXI wants. Then I _set_ those properties on the object we just created.

As I said, this is a work in progress. The need for a PIXI backend isn't urgent, especially not for one that supports 100+% of what my current system does, so I only work on it when I have the motivation. (Surprisingly, writing wrappers to communicate between two systems---one of which you barely understand---isn't exactly fun.)

This also means I don't reap all the performance benefits of Pixi. When generating material, for example, we might generate 60 unique cards. That means each card has its _own_ canvas, its own content, its own draw calls, which means "batching" or "smart ordering" (of draw calls) isn't really a thing. But that's fine.

I _do_ reap the other benefits, such as WebGL supporting way more possible filters, effects and manipulations. 

## Anything else?

Most of the board games this year (as in, the entirety of 2024) were already done by the end of 2023. This means I didn't work much on what's being released, besides obviously checking if it all still worked after the updates in the meantime.

I've also planned a much better home page and structure for a while, but I just don't find time for it. (For example, the main page is just the list of latest games, without any special graphics or explanation about what site you landed on. Similarly, the banners for board games don't include pretty useful info like "min/max number of players".)

I'm too busy making actual games _and_ plugging holes in the codebase running it :p So far, there's always been a list saying "but I _need_ this functionality for project A", which obviously takes precedence over "might be nice to have a prettier homepage"

But this list is shrinking, especially once my system can do anything that PIXI.js can do. At some point, as I chip away at the mountain of tasks, thing will get done.

Until the next update,

Pandaqi