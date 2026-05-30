---
title: "Organizing Rust Code"
tags: ["tutorial"]
date: 2023-01-01
---

Recently, I learned **Rust** and used it for several complex simulations in my puzzle games. Needless to say, I'm a fan.

But what I'm *not* a fan of, is the complete lack of good information on how to *organize* Rust projects once they get bigger. How to split files into smaller ones and reference/reuse them easily across the project.

Yes, there are many guides about the topic, but most of them just conclude with the simple statement "use the powerful *modules* in Rust" or give one or two examples so basic that it doesn't say much.

As such, in this short article, I want to explain how I think of the "module system", and how I ended up using it in my projects.

## Principle #1: How do we even create a module?

It's a quick two-step process:

-   Create a folder
-   Put inside a file called **`mod.rs`**

This is enough for Rust to recognize this directory as a module, with the same name that you've given the folder.

## Principle #2: Stitching

You could put all the code for the module inside that `mod.rs` file. But that defeats our purposes: you'd just get several giant files, instead of one giant file.

Instead, you'd like to be able to add *multiple files* to a single module, then *stitch them together*.

That's what `mod.rs` should be used for. It (typically) shouldn't contain any actual code or logic, it only tells the module about all the other files it contains.

For example, in my puzzle game, I have a grid (or a map) comprised of *points* and *edges*.

This is what the project structure looks like for that:

-   main.rs
-   map /
    -   mod.rs
    -   point.rs => everything related to points
    -   edge.rs => everything related to edges

Inside `point.rs` and `edge.rs` are my actual structs, logic, etcetera.

Inside `mod.rs` is only this:

```
pub mod point;
pub mod edge;
```

Now the module knows that it contains these files and will allow you to access them. (The "pub" keyword means *public*, which means other files may access us. More on that in a minute.)

## Principle #3: Bubbling

But, if you try to use a structure like this (even without any logic yet), you'll notice it still fails.

Why? Because Rust is consistent and handles everything the same way, *even the root folder*. So yes, the root folder of your project is also a module and needs to stitch together its parts.

So within **main.rs** we also need, somewhere at the top,

**mod map**

Now, finally everything is correctly set up. The root module knows about all its children modules. (In this case only map). The map module knows about all its children. (*Point* and *edge*.) There are no more modules to stitch together.

I called this principle "bubbling", because I view it as "information bubbling up". If you've used any other programming language, you've probably already come across this term, especially in *input management*.

In a sense, modules bubble up the chain until they somehow reach your main file.

-   You start with the smallest parts you have => stitch them together into bigger parts
-   Then you stitch together those bigger parts
-   Then you stitch those together into even bigger parts
-   ...
-   This continues until you stitch the top-most modules together in main.rs

## Principle #4: Think in *folders*

Rust tries to simplify things by mimicking your *folder* structure. It's best to go along with this, instead of fighting it. To actually *reference/use* the modules you have in some other place, you only need to consider the path towards that module.

Consider the same setup we had in the previous examples. Most likely, the content of each file is simply a *struct* of the same name, with some extra functionality.

### Point.rs

```
pub struct Point 
{ 
    x: usize, 
    y: usize, 
    active: bool 
}
```

### Edge.rs

```
pub struct Edge 
{ 
    start: Point, 
    end: Point, 
    active: bool 
}
```

How would I access, say, the Point struct? How would I use it in some other file?

By typing the *path* towards it! But instead of slashes (`/`), Rust uses double dots (`::`). I'd place this at the top of each file that uses the Point struct.

`use crate::map::point::Point`

Here, "use" is the Rust keyword for referencing something else. The "crate" keyword refers to the project *root*.

(We could use relative paths, without "crate" in them, but that's asking for trouble in my opinion. And yes, this is quite some typing to get somewhere, but in the end I think it's worth it, just for the clarity and structure it gives.)

From the project root, we simply follow the folders, until we reach our file. And then we grab whatever struct we want from inside that file.

This is the mindset for organizing a Rust project. Put everything into neat folders, then use the specific path towards them to include them where needed.

## Principle #5: The `pub` keyword

If you want to use a struct (or trait, or anything) across a project, it *has* to be public. You put the keyword `pub` in front of all those structs ...

... and you're done, right? Not yet.

The struct may be public, but that doesn't mean that its *properties* (or its *methods*, in case of an implementation) are public.

Everything is *private* by default. This means that other files can *not* access anything from another file. It will just crash the compiler and warn you if you try to access something you're not allowed to.

And Rust very much wants to make every programming decision *specific and concrete*, so there's no easy way to "globally" make things public, or make a "group of things" public with one line.

Things have to be made public on a one-by-one basis.

(I like this decision, and I like that they stick to it at all costs, but it *is* something that I had to learn about the hard way. It has the added benefit that you can easily see if something is private or not, because the "pub" keyword is *always* close to the definition of the property/method.)

So no, I don't agree with people saying: "just start the project in one file, see where it goes, only if it becomes too long and unwieldy, *then* start thinking about splitting it up"

Once you have that gigantic file, splitting things into a proper structure is a shitload of work that could have been prevented, and most likely will add some bugs along the way.

(I had to do this. Turn 3000 lines of code in `main.rs` into a proper structure. Took me a *long time*, and a big chunk of it was adding `pub` in front of things across the whole project.)

Start with good structure from the beginning. Just assume the project will become big, it really doesn't hurt in any way.

And this means that, whenever you write a new method or add a new property to a struct, consider whether it should be public or not. Don't just blindly place it in front of everything, but also don't forget to do so and get stuck later on when trying to organize your project.

## The final code

Below is the final code and setup from this article.

Project structure:

-   main.rs
-   map /
    -   mod.rs
    -   point.rs
    -   edge.rs

## == main.rs ==

```
use crate::map::point::Point;
use crate::map::edge::Edge;

mod map

fn main() {
// do something with Point or Edge
}
```

## == map/mod.rs ==

```
pub mod point;
pub mod edge;
```

## == map/point.rs ==

```
pub struct Point 
{
    x: usize, 
    y: usize, 
    active: bool 
}
```

## == map/edge.rs ==

```
pub struct Edge 
{ 
    start: Point, 
    end: Point, 
    active: bool
}
```

But most importantly, I hope this gives a clear intuition for how to structure things with Rust. Because a basic example like this is, well, *basic*. When your project scales, you'll encounter many more situations in which the above example will not help you.

Then you'll need to remember the principles:

-   Creating a module in the first place
-   Stitching the different files together
-   Bubbling modules upwards until *everything* is nicely stitched and referenced -- from the root to the smallest corner of your project
-   Then type the literal paths to the files to use them wherever you want
-   And make sure the right things are *public* while working on the project

Hopefully this helped! It surely made my Rust development much less frustrating and cleaner. Expect many more puzzle games in the future with randomly generated puzzles using Rust :)

Until the next one,

Pandaqi
