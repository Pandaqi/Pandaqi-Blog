---
title: "Programming Tip: No Hidden Dependencies"
tags: ["thoughts"]
date: 2026-03-03
emoji: "💬"
---

A common programming tip is to make your code as "modular" as possible. Every piece of functionality should be its own self-contained module, not depending on anything else, so you can freely reuse and combine those modules into a game. 

Need guns in your game? Create a general, self-contained script that can shoot stuff so you can reuse that same bit of code for many parts in the game.

Creating a game with lots of physics and collision? Create a simple self-contained script to register collisions and send the right signals, so you can reuse that for all entities.

This is still a good tip ... but I suddenly realized it's not the whole story.

Because of this programming principle, many people---including myself---get the general feeling that _any_ dependency is _bad_. As if you've failed as a programmer if anything depends on anything else in your game. As if you will inevitably ruin your project if you don't work really hard to decouple everything.

And that is simply not true.

Firstly because games (and software) require dependencies. The practical definition of them is that they contain lots of connected functionality. If no part of your code depends on any other part, well, then it's not actually a single project but just separate bits of code ;) The modules stay modules; it's impossible to actually mix and combine them into a _game_.

You will always have code that depends on other code. You will always create a complex web of parts that rely on other parts, even if you are some genius programmer who writes the cleanest code imaginable.

No, after programming for 15+ years, I've twisted the principle slightly.

> **Reduce the number of "hidden dependencies" as much as possible.**

Let's say we have a module---a function, a script---that shoots things. Then we probably need some variables like,

* _What_ to shoot ( = the bullet)
* _How_ to shoot it ( = direction + speed)
* _When_ to shoot it ( = what button press)

By definition, we depend on these bits of information. We depend on reading the player input so we know what button is pressed. We depend on some class (or scene/sprite/node) we created of the bullet we want to shoot. The module simply _can't_ be completely self-contained, it makes no sense that way. We have dependencies.

The moment it goes wrong is when you have no easy way to _know_ or _find_ these dependencies. When you need to read the code several times before you realize where it's actually grabbing the bullet from. 

For example, it might be tempting to create some global list of bullets one might spawn. In the code, you then access this list (which you can do from anywhere, because it's global and you assume it exists) and grab the right bullet when needed. This will work fine in a pinch, but it's a **hidden dependency**. 

* You _can't_ remind yourself that this script depends on that global list just by glancing at it for 1 second
* You _can't_ be sure the code will work just by making sure this specific script is correct. Because that global list might change, or it might not be instantiated correctly, or the indices of the bullets might change and cause you to grab the wrong one.

What should you do instead? You probably want to prioritize **dependency injection**. Being _explicit_ about _everything_ a script depends on, by naming and inserting it directly yourself.

Preferably, most of your code contains simple functions, which means you can add the dependency as a parameter you must pass in every time. No reading some global variable, or saving a reference anywhere, so you can be lazy and not inject the dependency!

For our bullet example, we'd change the function to `shoot(bullet_scene)`. When we call it, we _pass in_ the exact scene it should use. This is explicit, this is clear, this ensures we have the right scene ready to go. This means the code will work correctly if we call it correctly. If we don't, that's a bug in _the other script that calls it and should have inserted the dependency_. Easy to trace and fix.

In some cases you'll have a class ( = "a collection of functions and variables") of tightly-related functionality. This usually means that the same dependency is used everywhere, which is when it makes more sense to inject the dependency as a variable.

This is one of the reasons why I love the Godot (Game) Engine and feel that it supports proper game architecture. (Most of the time. There are certainly some missing features and oddities everyone would love to see ironed out.) In Godot, I would type

* Type `@export var bullet_template : PackedScene` at the top of a class.
* Now this variable ("exported property") is visible and usable within the editor. _The dependency is as public and visible as can be---not hidden!_
* I can simply drag-and-drop the bullet scene into it. _Now I am certain the script has all the dependencies it needs and will work!_

By doing this consistently, every script will present a clear list of all its dependencies in the editor. If any of them are missing, you see it immediately (and can usually do a quick drag-drop or load to fill that gap). If none are missing, you can be _almost_ 100% sure this module will not cause trouble.

Dependency injection like this makes it hard to screw up. If you forget anything, the game will immediately throw a clear error that you can immediately fix---`bullet_template` is missing in script `module_shooter.gd`---instead of having to track some hidden dependency back to its nebulous source.

Any (somewhat recent) Godot game of mine has _loads_ of these exported variables. The number of bugs and the amount of time spent debugging has gone down drastically ever since I switched to consistently applying this methodology. 

Yes, it means a bit more typing, and a bit more manual injection (or "connecting") of the different parts. But this is _good_! In programming, you'll save yourself many headaches by being _explicit_ and _verbose_. Manually, explicitly inject all dependencies, and you'll never miss one. Even better if you give them names that leave no uncertainty. Something like `bullet_template` is better than `bullet`, because `bullet` might mean many things, such as _the actual bullet you just shot_ (instead of the blueprint/template scene to instantiate).

Finally, I'll give a second example to make sure the point is clear. I mentioned another dependency of this shooter function: it needs to fire when you press a specific button. Input handling is not the same functionality as shooting, so it should be _its own module_.

* Don't add an input check for that specific button inside the shooter module. Instead, create another module (say `module_input`) that simply _checks for input_, and then fires events/signals when specific things happen.
* In `module_shooter`, you can now merely _listen_ to this event. When it happens, that's when we shoot.
* Crucially, you can only connect to the event _if you know where it is_. The `module_shooter` _depends_ on `module_input` and needs a reference to it.
  * You could make input a global class, so you can access its signals anywhere. But this is a hidden injection! This _will_ cause unforeseen and nasty issues down the line, believe me!
  * Instead, you can _pass it in_ when creating `module_shooter`. So you might do `ModuleShooter.new(reference_to_module_input)`, injecting the dependency when the module is created, which allows it to link to the signal.
  * Or you can use `@export var module_input : ModuleInput`, then drag-and-drop the ModuleInput to the empty field in the editor. Both methods force you to be explicit with your dependencies, instead of hiding them.

As stated, yes, this is slightly "more work". You need to explicitly name dependencies and then manually pass them in, instead of just using globals, or saving references left and right, or re-getting the hidden dependency in all sorts of places. 

{{% remark %}}
Many Godot newbies traverse the entire game tree every time to grab a very specific other node. Something like `$../../Players/OtherPlayer/Lives`. This is both very costly and very prone to bugs. If _anything_ changes to where you can find the lives of the other player, then this will completely break. Instead, if you want such a tight coupling, directly _inject_ the lives module of the other player into your script so you have it for sure. 

In this case, though, it's better to never reach inside another player at all. Just tell the other player you shot them, and let their script handle the consequences themselves, acting only on their own properties.
{{% /remark %}}

That's my tip for today. You _will_ have many dependencies in any game or software project. The trick is to make _none_ of them hidden (or costly). You want to be able to glance at your script/object for a second and immediately see _what it depends on_ and _whether those dependencies are all set_.

* If you only need something in one or two functions, just pass it in directly as an argument. Programming in Rust for a while taught me that it's absolutely fine to have some functions that take 6+ arguments if it means code is incredibly clean and bug-free.
* If a class needs something all over the place, publicly export a variable and ensure it contains a reference to the dependency needed.

But never, ever, hide your dependencies in some other way that's hard to track or check at a glance ;)

Learning this some time ago has made coding a lot more fun and effective again. I don't know why it took so long to realize I was doing this, realize the problem was "hidden" dependencies, and write this little article about it.

Keep making games,

Pandaqi