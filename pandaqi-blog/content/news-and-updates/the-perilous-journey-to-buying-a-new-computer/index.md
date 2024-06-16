---
draft: true
title: "The Perilous Journey to Buying a new Computer"
date: 2024-07-03
emoji: "🎮"
---

If you've followed me or my work the past few years, you'll have read numerous comments about how my laptop was crappy and failing, and how that (severely) limited what I could do. All of that is true, an understatement even, because working at all has been almost impossible with such terrible hardware.

But now, after all that time, I had finally saved enough money to buy a new one ... but I didn't do it yet, because I just couldn't figure out the _right_ computer to buy with my precious money. 

There are so many options! So many different things to look out for, so many different places to perhaps find a better deal!

It took many more months before I eventually bought my new computer. Not because I was 100% sure, no, but because my current hardware had failed for good. I simply _had_ to switch to a functioning system now or risk being unable to do any of my work for a while.

This article is about the journey of my hardware issues, figuring out what to buy, and the final results of all that effort.

## What was the situation?

### My first computer: an iMac

When I was 12, I bought (using a 50-50 split agreement with my parents) the cheapest available iMac. I abused the hell out of that thing during high school, as I learned to program and made tons of projects. (Six years later, it took me _weeks_ to clean up and transfer everything I'd done on that thing to my new laptop.)

By the time I left high school, I had long ago installed Windows instead---the Apple side did not function anymore, whatever I tried---and even that version was failing. (A year or two later, the computer finally gave up when the backlight of its screen was destroyed, and all other parts followed soon after.)

### My second computer: university laptop

When I went to university, they offered another 50-50 split to buy their "strongly recommended" laptop that was "practically essential" to be able to complete the bachelor of Mathematics. This was nice, because for _less money_ than I paid for that iMac, I got a _pretty powerful laptop_ in return.

I have worked on this laptop every day for 10 years. All my games (board and video), music, websites, writing, picture books, and failed projects in-between were done on that thing. It had 8GB RAM, an Intel i7 chip, no dedicated graphics card, and ~400 GB of Hard Drive space. 

{{% remark %}}
I've never understood that number for this particular laptop. I know they usually advertise 512 GB space and then the OS takes away a bit, but Windows 8 surely isn't 112 GB :p
{{% /remark %}}

But, of course, it increasingly showed its age.

* When it was about 5 years old, the battery gave out. It stopped being a laptop and had to be plugged in all the time.
* About a year later, I removed all Adobe apps (and any other software that might be resource intensive in any way). Workflows that were CPU+filesystem heavy, such as node modules, or when I tried to install Rust and all dependencies for the Bevy game engine, were practically impossible. (They took extremely long to complete, sometimes freezing the entire computer, which also sometimes caused mistakes to creep in because parts of memory weren't handled correctly.)
* A few years ago, I timed the average boot duration ... and it takes at least ~15 minutes before my laptop is logged in and responsive, and I can start working.
* A few years ago, any 3D workflow (game development, modeling, illustration) became impossible. Soon after, even 2D game development was slow, stuttery, and sometimes just _wrong_. (As in, textures were mysteriously missing, things had the wrong resolution for no reason, etcetera. I have a long list of bugs in a myriad of game engines that I'm 99,9% sure are just bugs for me because of the old laptop.)

As you can see, this thing was spent. Many tasks simply became impossible over time, while any others were unbearably slow or rudimentary only. I had to take a break from any video game development for _years_, biding my time until I could get a working system. 

### My third computer: a drawing tablet

I also had a cheaper, smaller _tablet_. I bought that a few years into my bachelor, as the laptop was degrading and I wanted something for _drawing_ (by hand) and slightly more _portable_. (This laptop, intended for heavy simulation workloads, is extremely large, bulky and heavy. To the point that almost all the girls in my bachelor class refused to actually carry it and often relied on others to bring the laptop.)

This one ...

* Never had a great battery. But after a few years, it could barely go for an hour without needing a charge.
* The charger, however, stopped working half the time. I don't know, must have been the time of the month or something, but _sometimes_ the charger just didn't want to charge on a partciular day.
* The screen was never great, as it tries to have "adaptive brightness" but completely fails---making dark screens _more dark_ and light screens _more light_. But perhaps this was a hardware fault from the start, because after a while the screen just started glitching when the tablet was anything close to "hot" or "working hard". It was a mix of ghost images, flickering, and those dreaded dead pixels/black lines on the screen.
* (The first one I received of this model stopped working completely after a week. Fortunately, it was very easy to send it back and receive a free replacement in return. But perhaps I should've taken it as a sign that this hardware just wasn't as robust as I'd like ...)

Of course, these defects happened long past the warranty expiration date. I tried some workarounds, such as placing ice packs on the tablet, which actually _worked_ ... until it didn't anymore. At some point, the tablet was also long gone and I had to face the fact that I _could not work_ if I couldn't _see what I was doing_.

I had used the hardware I had to its fullest. I had debugged, tried, updated, learned a lot about computers ... but two 10-year-old, barely functioning devices just made me annoyed and proved too big an obstacle to overcome by now. Especially if all your work is digital and you try to be productive with the device, 8 hours a day, every day.

## But do we _really_ need to spend money?

I come from a very poor background, so whenever I am about to purchase something, doubts and hesitation settle in. Do we _really_ need to buy something? Do we _really_ need a high-end computer or will a cheap second-hand thingy work? Can we _really_ not work with this laptop a few more years?

At this point, this cycle had already repeated many times, as any work besides typing and light internet browsing had become impossible already.

So let's see why I eventually answered that question with a "yes".

### A blessing in disguise

First of all, bad hardware can be a blessing in disguise. It means that if your project runs on your computer, it will probably run on _anyone else's_. You're forced to stay lean, keep your tools to a minimum, stop getting distracted and only have one program open at a time, etcetera.

This has taught me a lot about keeping things simple and thinking out of the box to make something work.

So yes, in many ways, you can do digital work (even game dev) on very bad hardware _if you really want to_. There are always other game engines to use, perhaps older versions that are "lighter". There are always changes to make to your workflow. And, most importantly, to the actual project---if you know your pc can't handle 3D graphics, then pick your best non-3D idea to work on instead (for now).

Many people who say they need a better computer before they can "really" start making games/recording music/writing/whatever, are lying to themselves. They just aren't motivated or disciplined, and it's easy to place the blame outside of yourself.

I was afraid of falling into this trap myself, which is why I kept asking myself this question and kept changing my workflows and chugging onward with my old laptop.

### But there are clear, physical limits

There are obviously limits here. 

You physically _can't_ develop a certain game if your pc is too old to install the drivers / code / engine that's needed for it, and there is no alternative. You physically _can't_ develop a game if your memory is corrupt and unreliable. You physically _can't_ develop a game without having a screen to, you know, actually see what the game looks like when you need to.

There's a line between "slow" or "barebones", and "broken" or "impossible". Maybe "practically impossible" is the better word here, because my laptop _can_ technically still do certain things, but it takes 30 minutes and a handful of intermittent crashes/freezes to do so, which is _not practically viable_ in any sense.

I tried so hard, for so many years, to keep working with what I had. But at some point you have to realize that you're wasting hours every day waiting for your hardware to do something, that you're never making the projects you want because you're always working around the limitations, and you mostly grow frustrated and tired all the time because of this.

For example, I mentioned earlier that many game engines produced mysterious one-off bugs for me. If all sprites/images simply aren't showing on my laptop, it becomes _really_ hard to make a game. (They weren't even a black box. They were just ... not there?)

Or the screen tearing/ghosting. If I can't _see_ anything---it's just loads of hazy overlapping images of the windows I had open the past 30 seconds, including flickering and constant brightness changes---then it becomes impossible to do anything.

Or the slow and unreliable hard drive. If anything that requires a lot of files, possibly compiling or linking them, takes _hours_ and might _fail several times_ (in recoverable ways or not) ... I can't work around that.

### But do we need the best of the best?

Of course not. I've made it a sort of general rule that I _never_ buy the best of the best. Because those are usually the most marketed, most overpriced, most "diminishing returns" of a product line. Most importantly, it's a clear sign you're spending money with your eyes and not your wits.

As such, when researching my new hardware, I automatically disregarded the best/highest tier CPU, GPU, etcetera of that moment. Looking at prices, this initially set a hard maximum on the budget of around 1500 euros.

And then Covid happened, and NVidia is an asshole, and there was a chip shortage, bla bla---all the prices were raised and suddenly the same quality computer cost a few hundred bucks more. And so my max budget for _everything_ (computer, monitor, keyboard, etcetera) became 2000 euros.

I looked for ways to greatly reduce that. Pick my own parts, and maybe I can do a much lower tier graphics card, or maybe I can get away with less storage/RAM, maybe I can find a great sale somewhere.

But no. I ended up setting a sort of "minimum" on the budget of around 800 euros. 

* The prices have been stupid for years, so it's only becoming more and more expensive to get a decent pc :(
* Anything below that price range sells you outdated parts or a mismatched build. (For example, you get an amazing CPU, for example, but the rest is garbage which means everything is garbage in practice.) And some even try to sneakily sell you refurbished parts without telling you clearly upfront.
* There's a balance here, as always. _If_ you're going to spend good money on a new pc, that should be your main device for the next 10+ years, it's more cost efficient to spend a little extra to ensure a solid build and parts that can "grow" a little. 
  * I can't predict the future; I don't need amazing RAM now, but I need good RAM for all I do now and _maybe_ amazing RAM in a few years time.
  * Getting that extra RAM at this stage is just 20 euros added to the total cost (or somewhere in that ballpark). Getting it later is more money and more work.

And so my decision was made. My current devices too broken (literally or practically) to work with, I'd tried to get by with terrible specs for long enough (I thought), and it was basically _exactly_ 10 years since I got that laptop now. A nice time to replace it, I thought. 

For a budget between 800-2000 euros for _everything_ needed, which should be all the hardware I buy for the next 10 years.

## So, what did I need?

### A general wishlist

By now, I had realized a few things I wish I'd seen before.

* If possible, **don't buy "all-in-one"** devices (such as the Microsoft Surface or laptops). It means that if one part fails, the entire thing becomes unusable. That's a waste in all possible ways. (My tablet still has a _great_ CPU+SSD combo, really fast, but its screen and graphics are shot to the point of no return, unfortunately. External screens don't help here, because the original screen rendering is still handled by the device.)
* If possible, ensure you can **replace the components** of the device over time. It is bonkers to buy a completely new computer (or phone/tablet) when the previous one becomes less useful due to one or two degraded components. If one thing fails, I just want to be able to buy a replacement and continue with what I have.
* If possible, don't go with Apple products. We were a big "Apple family" for years---with 5 iMacs in the house at some point, but that's also because I come from a family of 10 people---and now we are not anymore. Their products are overpriced, deteriorate far too quickly, and lock you into their ecosystem of no-freedom-pay-for-everything. 
* **SSDs, always.** They are orders of magnitude faster than HDDs now, without being much more expensive. Having worked with both, I will always say that you are a thousand times more productive and less annoyed when working on a device that has an SSD.
* Working on a computer each day, it's bound to become a mess, and you really _don't_ want it to be a mess. So, if possible, buy a device with _loads of storage_ and _two separate storage drives_. One for the OS, one for all personal files.
* In my experience, CPU + RAM will last you a long time without issue. Even on my crappy laptop I've made a few simulations that run 100,000 test games within a few seconds. No, if you work as a digital artist (illustration, game dev, etcetera) you are mostly looking at upgrades to the _graphics card_ over time. (And the second thing you want is loads of storage space, as mentioned before!)

### What if I need to be portable/flexible?

Yes, these tips are even true if you travel a lot or need a portable device!

Buy a _very cheap_ laptop or tablet for that, then _remote login_ to a stronger desktop. Use that cheap laptop as nothing more than a portable interface to where the real computational power lies. This could be another desktop pc you own, or simply a subscription to one of the many cloud computation services.

Why?

* As stated, any expensive all-in-one device is bound to fail on you far too early. If one part fails, it all stops. That's far more risky and prone to an early demise than "if one part fails, replace it and just continue".
* Laptops do not deliver the performance you _could_ get for that price point. Because it all has to be crammed into a smaller form factor, and many components have to be custom built, it's far more expensive than a desktop of similar power.
* (It's also terrible for the environment, of course. All this e-waste generated. But that's not too relevant to this specific article.)

You can compare this yourself, if you want. I was certainly surprised by this revelation. I am a firm believer of owning everything yourself and having the physical hardware yourself. But in reality, if you calculate how long you expect to use a product, and how much it would cost to use a subscription to cloud computing for that time period instead ... the latter might be less expensive (while you have none of the risk).

As such, even after buying a powerful new desktop pc, I still keep my crappy old laptop and tablet around for this exact reason. Whenever I need to move around or be portable, I simply connect them to the more powerful thing and use that. (And if I'm just doing very light work, then this is obviously not needed and I still have my standalone portability.)

If you're a game developer, I might even recommend buying a very cheap _Apple_ laptop if you can find one (probably second-hand), and a workhorse _Windows_ pc to actually give the horsepower. Why? Because you can only build games for Mac OS/iOS if you actually have an Apple device yourself---another reason to hate them with a passion---and this is the cheapest way in which you can make all of that work.

### What does every component do?

For those with less computer experience, below is a short summary of the main parts of a machine and why you'd need a lot of it (or not).

* CPU = Needed for all logic and calculation in the computer. (The heart of every computer.)
* GPU = Needed for rendering the screen and all graphics. (Most CPUs have very rudimentary "built-in" graphics in case you have no GPU.)
* RAM = Dynamic memory, which means the memory used as programs are running and doing things.
* Storage = Static memory, which means your files and anything else _stored_ on the device.

**CPU?** The CPU needs to be _good_, but not necessarily _great_. Computers were, surprisingly, made for _computing_. They are really good at that. Even a mediocre CPU these days can handle most workloads absolutely fine, because of how optimized they are for that exact purpose.

You don't even need a great CPU for gaming/game development in most cases. Upgrades here are only needed if you're doing computationally intensive work, such as _simulation_, software that requires intense _calculations_ to achieve its functionality, perhaps something that has to traverse loads of files/folders all the time.

For example, I have written simulations of my board games before. Let the computer play 1,000 games, collect statistics, use that to balance the game and check if there aren't issues (such as games that never end). These would be a lot faster, allowing me to play 1,000,000 games and get more accurate results, with a better CPU.

**GPU?** You can get away with no GPU at all if you work on a low resolution and/or never do any graphically intense work. In that case, the built-in ("shared") GPU will be fine to render your simple images and text editing.

But if you're making games, playing games, designing and illustrating, perhaps with a big monitor that needs to be clear---you need a good GPU. (Which explains how much I struggled to do most of my work with my laptop.)

If you want to do any AI work (images, text, sound, machine learning for research, etcetera), you'll need a strong GPU _and_ a good amount of VRAM. Perhaps the second part is even more important. I'd recommend a "worse" GPU with more VRAM over a "better" one with less.

Otherwise, unless you intend to do _really_ heavy graphical work, a top of the line GPU surely isn't needed.

How does this compare to the CPU? For example, if you use Photoshop,

* It still needs to _calculate_ where to position your layers, which effects to apply, how to export the file to storage. Certain effects might be implemented in the CPU too, if they need to do a lot of specific calculations rather than manipulating pixels.
* But _rendering_ it all is done by the GPU, and if they're smart, many of the effects applied to the entire image (or a large area of pixels) is also implemented in that.

Or, another example, when making a game,

* If you want a character to move from A to B, it has to _calculate_ the updated positions and such based on its velocity (and any related numbers). If it's a complex map, you might have to include some heavy _pathfinding_ algorithms that find the shortest path around obstacles and such. This is all calculation and requires a good CPU.
* But actually _rendering_ the character at the final position/path that you calculated, is done by the GPU. If you want the character to _glow_ or _animate_ upon reaching its destination, for example, you might implement a shader to be executed by the GPU. Any visual effects, or manipulations of pixels on the screen, is GPU territory.

With games being an almost purely visual medium, you can see why the GPU can be important for being able to create the visuals you want. But it's not the end all be all, especially if your genre of games is mostly calculation.

**RAM?** This is the more limiting factor in most day-to-day work. Everything the computer is _doing_ needs dynamic memory to manipulate and move around. As such, more RAM makes everything faster, makes more _possible_, and allows doing more things _simultaneously_. (Which also means processes don't need to wait for another to complete before they start.)

Even 8 GB has been quite fine for me, but with how cheap it is to upgrade and how much it unlocks, I'd like to go further.

**Storage?** This is the well-known file storage, no special comments. SSD is much faster than HDD. 

But it has an interesting relationship with RAM. If you don't have enough RAM, what does the computer do? It has to offload part of it to storage. Instead of keeping things in dynamic memory---which is much faster and easier---it has to constantly save stuff and retrieve it.

As such, most software will work with low RAM _or_ low storage, simply picking whatever you _do_ have. But they won't work with _both_ being low. 

For example, the Hugo static website generator---which generates all my websites---used to default to building the websites from _memory_. But recently, it has switched the default to _storage_ instead, because of how much faster that is nowadays and how much more people have (with 1 TB SSDs and all). 

{{% remark %}}
But on my old laptop, I have to manually set the other option still, because I lack the storage needed. Generating the website locally is more than 100x slower than when my Cloudflare Pages automatically generates it when I push a GitHub update.
{{% /remark %}}

A few years ago, I would have said "250 GB? Fine! More than I will ever need!"

Nowadays, however, 

* I have too many old projects and/or projects in flux to store at any time.
* My projects have grown larger, mostly requiring bigger (higher resolution) assets or sound files, which has inherently ballooned the storage space needed as well.
* I've become far more professional when it comes to versioning/version control, backups, etcetera, which necessitates more spaces.
* And I've experienced how nice it is---when I temporarily worked on some different, modern computers from someone else---to have more than enough storage all the time. 
  * I am constantly fighting the storage space on my device, removing anything that I don't _really really need_, which has often ended up being a mistake because it turns out that I _did need it_.

If possible, go for plenty Storage and RAM. If not, pick one of them to be great, but don't let _both_ be low.

### A more specific wishlist

All of this combined lead to the following wishlist of parts.

* At least an **Intel i5 CPU, preferably i7** (or the AMD Ryzen equivalents of that). Doesn't need to be the latest, as I said, but also not something from many years ago.
* A **dedicated GPU** with at least **12 GB of VRAM**. Again, doesn't need to be the latest of the best, but should comfortably support modern requirements for games, game engines, and possibly AI.
* At least **32 GB of RAM**. This is very cheap, while almost everything I do (for work) would benefit from having much more RAM.
* At least **1 TB of SSD storage**. SSD is just much faster (as stated). Despite being very minimalist and cleaning up regularly, my current 420 GB storage for aaaaall my projects and work and backups is just too little.
* A good number of ports (for USB, DisplayPort, etcetera). My tablet has only a _single_ port and I've hated that obstacle every single day that I used it.
* **No OS** already installed. This adds considerably to the cost, while I'm perfectly fine handling this stuff myself.
* Anything else goes. I don't care about bells and whistles, or RGB lights, or water cooling, or super high refresh rate on the monitor, or whatever they come up with. _After all these years, I need a machine that just FUNCTIONS._

I think this is very reasonable. And yes, looking at prices in America---for example, this would be doable for about 1000 dollars. In Europe, unfortunately, this isn't the case. Even when I use the well-known trick of buying stuff in Germany instead, as everything is slightly cheaper there but still ships to their friendly Dutch neighbors.

The "minimal" build with this, using AMD for CPU and GPU (as they're always slightly cheaper than their Intel/NVidia equivalent), already comes out at 1200 euros here.

A slightly better build, which feels more future-proof and more value for money, comes out at 1600 euros. That is pushing it, of course, because we still need the accessoires.

An actual great build would be above 2000 euros already. It's insane how much prices have jumped the past few years and I had to instantly dismiss anything in this range, even if I felt it should be within reach considering my budget.

As stated, I _really_ want the RAM, CPU and Storage to be great and last me a while. The Graphics Card, despite being very important in general for my work, can be very suboptimal. Because anything with a dedicated graphics card (which, again, my laptop lacks) will be miles better than my current situation. So anything from modern times will be fine for the coming years, until I _perhaps_ upgrade it.

As such, through all this, my extra requirement was the ability to _open up_ the case and easily _replace parts_ in the future. This is barely mentioned anywhere---in fact, I am amazed by the display of incompetence when it comes to communicating your product to potential buyers---so I had to email a few times and get clarifications.

{{% remark %}}
When it comes to GPU, there has traditionally been one major player (NVidia), and now there are two (Nvidia / AMD). For years now, a third one (Intel) has tried to join as well. Having had two devices with Intel graphics, however, just left a very sour taste in my mouth. So many issues, so far behind the others, random crashes or unsupported things, so slow. Having experienced other devices with NVidia/AMD, at roughly the same price range, I can't recommend choosing an Intel GPU at this time _at all_.
{{% /remark %}}

### My final doubt

I _considered_ buying a much cheaper computer for now and replacing components more frequently as I went. This seemed a good idea: spend "only" ~600 euros now for at least a functioning computer, buy the rest as needed. But everywhere I looked, this just amounted to that initial purchase going down the drain. 

The computers in that price range don't fulfill my requirements nearly enough, which means everything inside would have to be replaced as soon as possible, which meant you mostly bought a computer casing for way too much money.

For example, checking some of the bast deals on common stores here, that money would give me ...

* i5 (two generations old), 16 GB RAM, 512 GB SSD, no GPU (and a German keyboard :p), a few USB ports
* i3 (two generations old), no RAM (install yourself), 128 GB SSD, no GPU, mini form factor with two USB ports
* Ryzen 5 (two generations old), 8 GB RAM, 256 GB SSD, no GPU, loads of USB ports though
* i7 (three generations old), 32 GB RAM, 1TB SSD, no GPU, no WiFi either => never mind, can't be opened up or replaced, and manufacturer doesn't exactly inspire confidence ...
* Ryzen 7 (two generations old), 16 GB RAM, 1 TB SSD, no GPU => this is pushing it though, at 650 euros already.

I really hoped this plan would succeed---spending a thousand euros less is always good!---but it just doesn't work. You spend a lot of money for mediocre parts that _will_ need to be replaced rather sooner than later, usually missing at least one crucial component (such as GPU, WiFi or RAM) on a shoddy build that might not make it easy to replace at all.

All my work happens on the computer. Every day, no weekends or vacations, usually 8+ hours a day. This isn't a workable solution, I'm afraid.

## Pre-built or Build it myself?

I would love to learn how to build computers myself. Being a programmer, working so much with computers, it seems a very useful skill to really understand what's going on and to be able to repair anything that comes it.

Additionally, it's cheaper. You can pick exactly the parts you want, perhaps from different places where they're cheapest, and you don't pay anyone else the cost of assembling it.

But ... can I take the risk? I have seen some YouTube videos, sure, but that's not enough experience assembling a computer. If I make any mistake (outside of warranty), I simply do not have the money to replace that part. I'd have a bunch of useless parts because of a missing piece, and still no working computer at all :p

That's a bit too risky for me. That's why I go the other route: buy a pre-built computer with the _option_ to upgrade later. When I have a bit more money and time to spend on this, and I can upgrade parts one by one myself.

Additionally, again, prices are weird here. There are loads of "assemble your own PC"-providers, but all of them use prices for the parts that seem ludicrous, and they have weird "restrictions" that forbid me from creating the exact "cheap but really good PC" combo that I'd want. (They also charge a similar ludicrous fee for assembling the PC for you.)

This made this route _not cheaper at all_. 

Instead, it proved more practical to search (and wait) for a really good deal on an already built PC that had most of my wishlist, then go for that.

That moment finally arrived halfway 2024. I found a matching PC (mostly), which had a discount of nearly a 1000 dollars (yes, I checked, all those parts combined would indeed cost way more if I assembled it myself), and fit within my budget (just barely though).

I bought it, plus accessoires that were cheap but not _too_ cheap, and I hoped to jump into a more productive future now.

## Accessoires

For the most part, this is very straightforward. 

* Any functional keyboard will do.
* A _vertical_ mouse. Seriously, I bought a vertical mouse for 15 euros some time ago, and it _dramatically_ improved my posture while working and how long I can work before my arm tires. Laptop touchpads are just not great for posture. Wish I'd bought one ten years ago.
* Nowadays, things are either wireless or they come with their own (standardized) cable, so no worries there.
* I already have some USB thumb drives, gamepads/controllers (a wide variety I collected over the years, some more functional than others), etcetera.

I mostly wanted to talk about the **monitor**. My laptop screen is terrible: colors are flat out _wrong_, it's pixelated and tiny, you get it. As stated, my tablet screen just _died_.

As such, I've wanted a proper monitor for years, and I bought one some time before actually getting the rest of the computer.

In doing so, I learned a few things.

* Most budget/beginner monitors are 24" or 27". Many people---including me---would like the size precisely in-between, because one feels slightly too small and the other slightly too large. But they usually don't offer that, unfortunately.
  * For productivity, a larger screen is better, because you're going to be multitasking or doing things side by side.
  * For gaming, a smaller screen is actually better, otherwise you can't see the entire menu/map/game at a glance.
* _Resolution_ is more important here. A low-resolution 27" display will still look bad, because it is _too big_ to fill the space it has. (Similarly, a high-resolution 24" display is somewhat of a waste.) So,
  * For 24", you want at least 1080p (1920x1080) resolution
  * For 27", you want at least 1440p (2540x1440) resolution
* Refresh rate should be at least 60 Hz or 75 Hz. 
  * Higher is preferred when you want to use it for _gaming_.
  * But anything higher is very much optional when it comes to _productivity_.
* Many monitors come with "features" such as Low-Blue Mode (a blue light filter to help you fall asleep more naturally after working on your computer at night) or a PowerSensor (it senses if you're away from the monitor, and if so, dims the brightness). Ignore that :p
  * When I don't use my computer, it is off and unplugged. Otherwise, I am using it, so sensors and stuff are just a waste and something that encourages bad habits.
  * When you're doing any kind of graphical/visual work, you DON'T want it to mess with colors. I'd rather install a simple program like _f.lux_ and turn it on/off at will, than have it be a permanent feature inside a monitor.
* It's nice if the monitor has a lot of connections, perhaps USB ports, etcetera ... but not too important.
* Perhaps surprisingly, I wanted a monitor with built-in speakers. I _have_ good audio systems myself, from my work as a musician. But I don't want to plug all of that in---it doesn't even fit on my usual desk---just to watch a YouTube video. I want the easy fallback and default audio inside the monitor.
* I prefer sturdy, strong, unbreakable products. I'm going to be moving the monitor around (adjusting its height, rotation, etcetera) to match what I currently need, as I stand up, sit down, move around behind my desk. I'm going to be moving it around to different rooms. I want that thing to be solid and never break.
  * So I looked for monitors that could be adjusted in all directions ...
  * And which had a very heavy, sturdy stand of solid material.

All in all, this brought me to a 27" monitor, 1440p, 75 Hz, very solid, very accurate color representation, built-in speakers (bad quality, but eh), for around 200 euros.

Well ... I wish I'd done this ten years ago too :p

The first day, it's a bit disorienting. You're used to looking _down_ at your tiny pixelated screen, but now you can look _forward_ to a much bigger display that actually has good colors.

But after a day or two, you get used to it and really enjoy the extra space. At least, I did.

* Better posture while working, no matter if I stand, or sit, or am cycling on my deskbike.
* I don't need to constantly switch between loads of windows and tabs whenever I do something that requires all of that to remain open. I can just put it side by side or see it all in a single view.
  * This is mostly useful while developing games. I can code on one side, and display the final result/actual game on the other, allowing far quicker iterations. Or simply have multiple coding files side by side, quickly referencing other functions I need to know about.
  * Otherwise this helps, as stated, when working between many different programs. Such as copying, renaming, replacing, cleaning up files all over the place. Now I can keep all those Explorer windows side by side instead of switching all the time.
* Better representation of colors, resolution, sharpness, allowing me to judge my illustrations or graphic design far better.
* (I can watch movies/series while actually seeing what happens :p)

I did bump the display zoom (in Windows settings) to 125%. From the distance where I sit/stand, the default resolution was _juuust_ too tiny to be comfortable to read and work with. But that's all fine, because this is literally a setting you can change in 5 seconds.

## Moving over all my work

### My files

As expected, 10 years of non-stop work spread across two devices ... needed some careful handling. 

I had to make sure ...

* Everything was backed up, all in one nice place.
* I didn't miss a single file while moving it to the new computer.
* And then I could clean/reset the other two devices as much as possible. (To ensure they are as fast and usable as they can be at this point, or maybe to give them to someone else and leave no traces behind.)

I long ago stopped using the default windows folders/locations (such as Music, Images, Videos, etcetera). This was a blessing.

It meant that all my work was already in 6 major folders in Documents, backed up (almost) daily to my external SSD.

* Design
* Programming
* Writing
* Music
* Personal (all non-work-releated stuff I still want to keep, such as specific images, or maybe files from movies I really like and rewatch sometimes)
* Administration (running my own company, contracts, tax returns, etcetera)
* (A _Portables_ folder contains all the software I use. At least, if it has a portable version, which I'd argue every piece of software should have!)

I probably used my laptop 80% of the time during those years, so it became the "main device" that would hold _everything_. (I also still trust it more than that shoddy tablet, to be honest. The laptop is a bulky slow thing, but at least it's a _reliable_ old beast.)

I had recreated the same structure on my tablet. Which meant there was only one conversion cycle to repeat many times:

* Go to the folder on tablet. (For example, a board game would be at "Documents > Design > BoardGameName" on both devices.)
* Copy files to folder on laptop, adding anything that was missing.
* (If the entire folder misses on the laptop, add the whole thing of course.)
* Delete folder from tablet

In the future, if I were to work between two devices again, I'd just pick one main device at all times and work directly from that SSD on the other. But my situation has simply been crappy for many years and I had no choice but to be kicked around to different working environments, and that's how messes like this start. (Also, I didn't have my backup SSD until a few years ago :p Younger me didn't realize how crucial it was to have multiple backups.)

Once all that was done, I made one final huge backup from the laptop to the external SSD. And then I could just plug that thing into the new computer, put those major folders back in place, and it was done.

### My programs

As mentioned, I have a folder of Portables that contains _most_ of the software I use. So I don't have to uninstall/reinstall that much, just copy-paste a few more files.

_But_, again, I didn't start being smart until a few years ago. So my laptop did have loads of garbage everywhere. (Like, how on earth did I end up with _over 40_ different C++ redistributables? And three completely separately installed versions of Python? And a massive folder of daily logging statements from software I haven't used since 5 years ago?)

In any case, I knew exactly what my devices could still do and what they could _never_ do again, which made it easy to create a selection. My laptop/tablet would only basic text and code editors, and some tools to support operations with that (as in, a command line tool like Pandoc for transforming text files, support for a programming language, etcetera). Everything else went away, which cleaned up about 100 GB of space.

Once I was pretty sure that I had all my files secure and knew how little needed to stay (and what exactly those things were), I ended up just factory resetting to a clean OS installation.

As expected, this made both devices a _little_ bit faster and more stable, but nothing more. Clearing storage and removing bloat can't fix faulty/old/worn-down hardware.


## Was it the right call?

So, I received the computer, installed it all, and got to work again. (I have so many deadlines and projects that I couldn't even lose a day on this. I just jumped straight back into it.)

I tried to objectively observe the results of this change for the next days and then weeks, but that's obviously hard to do. New and shiny things are always more fun to our brains. And maybe I would've been equally productive those weeks on my old hardware, who knows. But I tried.

Was I right about the components? Was it worth the money? Did this really remove all the irritation and waiting, leading to a much more productive and happier workflow? Any other interesting results?


@TODO

