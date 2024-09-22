---
title: "The Principle of Least Maintenance"
date: 2025-04-03
emoji: "🎮"
---

If you've followed this blog for some time, or have simply encountered a few of my update articles, you know that I lost of a lot of time _maintaining_ Pandaqi. Not adding new content. Not redesigning to make it look more flashy. Simply _maintaining_: fixing old bugs, making things a little faster, moving old games to a better system I developed for the newer ones.

All in all, I think I lost a few weeks of full-time work on that the past year. Is that bad? Is it good?

I wasn't sure. The website _was_ improving rapidly. The state of Pandaqi.com nowadays is 100x better than it was a year ago, or two years ago. It's cleaner, faster, more bugfree, and more cleanly coded behind the scenes.

At the same time ... I would've liked to actually use those weeks to make _more games_ or _better games_. Was it worth it to bring a 6 year old little board game, which isn't nearly as good as the work I do now, to a more modern code architecture? Shouldn't I just have let it die? Was it worth it to support a completely new renderer in the backend just so that my handful of (mostly old) One Paper Games generate 10x faster?

As I finished my final round of maintenance updates, I thought about this again and again, until I decided to write this article.

I'm quite sure I _won't_ have to spend so much time maintaining the website anymore in the future. Not because it's "finished" or "does everything I'll ever need". No, because I learned the **Principle of Least Maintenance** and use it now to make my life easier.

## Where I went wrong

I'll give an example from one of the games I had to painstakingly "maintain" or "update" on the final round of updates: Cookie Smasher.

I'll focus on two of the biggest issues.

**Issue 1:** About 90% of every card is drawn in the usual way, using my own simple custom drawing system that all games use. But 10% was done using a _different_ system with which I experimented at the time: creating the card as an HTML website first, then simply taking a screenshot of that website.

This was a mess to untangle and rewrite so that 100% used my own system. Because of the two separate systems, I'd had to create this weird distinction between different elements of the card, and then have a weird communication layer to make sure they connect and end up on the same card (at the right time/place).

Because that other system supported 1 or 2 things that my own system didn't support back then, I couldn't easily 1-to-1 translate the code either. I had to constantly look up what I called that property in my own system or even _create_ the feature in the first place.

In short, it took me more than 2 hours to "maintain" 10% of the code (only a hundred lines or so) and update it to work again. That's way too much time spent on something so tiny.

**Issue 2:** Most cards contain icons for _types_ ("drink", "vegetable", "fruit", ...). These icons can either be displayed on the card itself (to signal its type), or within its special action (such as "I am poisoned if there's 1 `<drink>`").

These icons are **tinted** dynamically. What does that mean?

* The images themselves are just white.
* But when I draw them, I _recolor_ them to be red/green/blue/whatever.
* I do so by adding a `TintEffect` to all of them.

The issue here is that my own system is a bit more limited and can't tint icons that are inline in text. And it probably never will, because it's expensive to draw. 

{{% remark %}} 
Canvas tinting is not "basically free" as it is in WebGL. It's rather expansive actually, because you need to create two helper canvases to get the correct result.
{{% /remark %}}

What to do? I had to 

* Look up the original source file (for _Affinity Designer_, my graphics software)
* Open it again on another device (my laptop is too old by now to open it anymore)
* And apply the tint manually to _bake it into the image_.
* Then replace the old image with the new one.

I think this is the best example of the issue here. Why was this so much work? Why did it take _hours_ to update a small game in a small way? 

I could have just baked the tint color into the image right from the start. I _should_ have done that, back then, when I made that game. Much simpler, much cheaper, less error prone. Why didn't I do it?

Because **I was thinking the wrong way**.

## The realization

For the first 20--30 games I made, my thoughts were as follows.

> **I want the material to look like X. So I'll do whatever is necessary to make my system able to achieve that look.**

I constantly added features in a rush. I used trick and shortcuts around the limitations of website code/drawing to achieve a very specific look for a very specific game. I thought I had to make every game "unique" by doing something new and unique for it.

This is what leads to every game being hard to maintain, because they all have 10% or 20% of their code doing _something I never did before, and never did again in another game_. It made updating the website hard, because every update had unintended side effects. Oh, I changed this one function on the `ResourceImage` that I thought nothing used? Guess what, that game from 2 years ago abused it to achieve a specific effect, and now that game is _broken_!

In reality, I should've thought the other way around.

> **My system can currently do X (very well, battle-tested, cleanly). So I'll do whatever is necessary to make my project fit within those boundaries.**

Instead of thinking "I want the card to look like this, and for that I need a new effect!", I'll simply design the card in the first place to only use _effects I already support_.

Instead of thinking every game has to be unique behind the scenes, with unique code and experimental approaches, I must do the opposite. The game should be unique on the _outside_ (rules, core idea, execution), but the _inside_ should be very clean and code that's simple to maintain.

That is the Principle of Least Maintenance.

I've barely had to update any games made after this realization. (Really, all I did for those projects was fix a tiny bug somewhere or just _add_ some quality of life feature after doing more playtesting.) All those major updates from before were always for _older games_.

And, as stated, it took me many weeks of full-time work (spread over a year or two) to update all of them to my modern "least maintenance" system. That's how messy it becomes when you create the _quantity_ of projects that I do, without following the Principle of Least Maintenance.

In a sense, for every hour I won back then by taking a shortcut or not thinking ahead, I lost two hours later.

## But what about innovation? And creativity?

That's a valid question. _If you only ever stay within the boundaries of what's already possible, how will you ever innovate?_

All the things my current website supports only exist BECAUSE I pushed those boundaries and added the features along the way. I realize that. The only reason I have a built-in `TintEffect` is _because_ some games were being experimental and used that trick to dynamically recolor images.

This principle is moreso about _quantity_. It's especially applicable to me because of how many different things I do; but I think the general thought process below will help any creative person.

* When I create a big flagship project, which I'll only do once in a while, I will push boundaries and try something unique. 
* But for all those other games? The 10 tiny cute card games I make in-between? No, stay within the boundaries, make them as low maintenance as possible.

If you try to make _every_ project your masterpiece, then none of them will be. If you try to do something unique and experimental with _every_ project, then you're giving yourself a pile of work and headaches, only to get an unmaintainable mess in return.

Pick one big project per, say, 6 or 12 months. Go all out on it, move the limits, add new features and ideas.

Everything else should be tiny and "low maintenance", which means sticking to the current boundaries and possibilities of whatever systemy you're working within.

To give a specific example,

* I have an upcoming game called **Naivigation** that I think is an absolutely amazing idea that can spawn 10--15 really great games. (It's an improved version of an older project under the same name, which you can find on the website but I don't recommend you try and play :p) I coded many new features, sped up the system, and introduced an entire system for managing "collections of games" (instead of treating everything as a standalone game, like before). I did all that just because that one project, which I think will be the highlight and deserves the attention.
* Around that release, however, the schedule is peppered with **10--15 smaller games**. All of them required _no_ special treatment by the system. They all just plug themselves into the general material generator, draw a pretty straightforward card, and that's it. If I hadn't purposely kept them _low maintenance_, I would never have been able to create and finish that many.

## The excuses

Now it's easy to tell yourself one of the following excuses.

* "Oh but _this_ game will _also_ be masterpiece! Just like the five before it!"
* "Oh but what's the point in making a project if there's nothing new, unique or exciting to explore?"
* "Oh but this _one tiny extra idea_ isn't that bad, is it? It's just a few lines of custom code!"

### Excuse 1

The first one is probably painfully recognizable to most creatives. _New ideas always feel shiny and the best ever._ You really shouldn't start working on an idea the moment you had it, because even the most problematic shit idea will feel like gold when you _just_ had that spark of creativity. No, you only have one or two bigger projects in you per year, maybe even per 5 years. I think it's a very valuable skill to be able to tell which one it is; and to tell all the other projects to stay in their lane.

### Excuse 2

The second one is all about the realization that there's still value in _doing something you 100% know you can do_. I think it was Brandon Sanderson who once spoke about it in a lecture: when just starting out as a writer, he purposely chose to write a book he _knew_ he could write. There was nothing challenging in it for him, nothing new, it was based on a first draft idea he'd written earlier, but there was still tremendous value in actually writing the book and finishing it.

It doesn't matter to the end user, if that's what you're worried about. A good game is a good game, even if it was a walk in the park for the creator and just a lazy or bland copy of an older idea.

Even so, there are always ... surprises. Even the tiniest game, that did absolutely nothing to test my skills or understanding of game design, has _always_ taught me something new. Always presented one or two obstacles I hadn't foreseen, which actually made the game unique in the end.

{{% example %}}
One of my upcoming series, _The Luck Legends_, is all about dice rolling, gambling, bluffing, lucky mechanics, and so forth. The first few games in the series are my absolute simplest, with barely any rules or cards. Yes, development on the easiest game was so quick that it was basically done in a single day ... until I got to the final polishing.

I wrote an interactive example for the rulebook. An example that says "these cards on the table, these are in your hand, so you're allowed to do moves A and B". A very helpful and fun way to explain board game rules. A nice bonus is that I can re-use that example to _simulate_ 1000s of random games and get some statistics about how it plays. Also something I've done many times before.

But by writing that ... I realized the probabilities were _completely out of whack_. The understanding in my mind of how likely things were and how the game would play out on average was just _wrong_. And no, you can't find such issues by playtesting the game 10 times against yourself or "thinking it through". By doing that simulation, I realized certain patterns you wanted to complete were as good as impossible (they happened _once_ in 10000 games), while others had pretty much a 100% success rate. I had to completely rewrite the numbers, special effects, with how many cards you start, etcetera.

This taught me a lot about how my numbers were wrong and how the game should've been balanced, which I could directly use in _another_ game that worked by completing patterns. That other game was done more quickly, and without these glaring errors, because of it.
{{% /example %}}

### Excuse 3

Which brings me to the third excuse. That third one really is the silent killer.

Yes, you're right, adding that _one tiny extra thing_ isn't terrible. It's, indeed, just a few lines of code or a few minutes of work. What's the matter? Surely, it's so small, it won't create big problems later and would be easy to "maintain" if needed.

Let me give you an example of something that happened just now. (At time of writing, which is always far earlier than when I publish these articles.)

* Hey, what's this? A few of my games suddenly lost several images or graphics on the web page?
* After some researching, I found the common thread: they all had the `z-index` property set. (A CSS property that changes the _depth_ of an element, where higher numbers are drawn "on top of" or "in front of" ones with lower numbers.)
* More specifically, they all had a NEGATIVE `z-index`. Something I tend to use for background elements to make sure they are behind _everything_.
* This worked exactly as intended before, on all browsers.
* But in the mean time ... Chrome updated and changed its behavior. Now a negative `z-index` is considered to be behind the `background-color` of elements too, which is why all my images were "hidden" behind the solid-colored background on most pages.
* Simply changing it to `z-index: 0` fixed the design on a handful of pages.

These things happen. Browsers update. The world changes. Things are deprecated over time. _Maintenance isn't just about your own stuff. It's also about the world around you and the stuff you rely on._

This will never change. I will always have parts of my website that suddenly work differently because, over time, browsers have changed. The world will always keep changing and progressing, be it for the best or for the worst.

As such, it's silly to add _more maintenance_ on top the _surprise never-ending maintenance_ you'll always have. Even the tiniest thing you add in the moment, can turn out to be a breeding ground for bugs 10 years down the line, because something _else_ changed. And you relied on that other thing to work in a certain way.

In fact, this is so common, that I can give _another_ example within the same space from just a few days ago.

* My website uses a common setup for styling: my style code is written in SASS (a variant on CSS with more options and flexibility), which is then _converted_ into regular CSS when the website is built.
* A big feature of SASS---perhaps one of the main reasons most people use it---is it's support for nesting. You can put style rules inside other style rules instead of having to repeat them.
* But since some time ago ... CSS also supports this! They added native support for it. Which is nice, but it forced SASS to make a decision on how to work with that.
* First, they decided to just keep doing what they already did. But then the CSS committee ("working group") _changed their minds_ on the specifics of their nesting.
* Which forced SASS to change their minds too.
* Which is why I now get warnings that the _output_ of some of my stylesheets will _completely change_ at some point in the future, when that new rule goes into effect.

{{% remark %}}
If you want specifics: [Here's a good article from SASS about this.](https://sass-lang.com/documentation/breaking-changes/mixed-decls/)
{{% /remark %}}

See what I mean? Something I never thought would need to be maintained, something that has always worked fine and has no reason to change, _will have to be maintained_ by me at some point in the future.

This is a minor thing---just a few pages that will look _slightly_ different, perhaps---but hopefully you see my point.

The world is messy. You always depend on some things in your environment. And those will change, sometimes surprisingly. 

All you can do is make sure your _own_ projects have the least maintenance possible. So you can spend the hours maintaining older work on those _surprise changes_ as opposed to your own stuff too.

Which brings me to the final question.

## Does it matter if old games survive? Shouldn't they just die?

I guess this is the one I struggle with the most.

I, like most people, are bad at letting old work die. Because you know how much effort it took, you know how much blood and sweat you poured into this thing, so it would be a stupid waste to let it die/deprecate/become unusable, right?

And I think this is true, for the most part. We're all too eager to put our focus on the shiny new thing, which has even led me to sometimes call a project I just released "old". We always want to work on new stuff, make new things, and anything we made before kind of dies already in our eyes the moment it is finished. (And sometimes, more problematically, _before_ it's even finished :p)

I've been tempted, so many times, to just completely _remove_ those older One Paper Games. It's easier than updating them, right? It's easier than spending another hour or two going into their code, fixing some bugs, and updating it to the new build system.

But then I realize I only made those games ~4 years ago. I look at them and see a unique game. I know how much fun we had playtesting it, and that _doesn't go away_, no matter how old the game is or how much "better" my current work is. Old projects might have lost their shine, but that doesn't mean they lose their worth.

And if you frame it like that, it's easier to maintain. If you think "do I really not want to spend _1 hour_ to maintain a project that cost me _100+ hours_ to make in the first place"? For a relatively low price, the game can be fast and completely functional again, so everyone can fully enjoy the work _that you've already put in_.

At the same time, I know everything has a limited lifespan. Nothing lasts forever, and especially digital products are hard to fully maintain. There are stories that were masterpieces and classics way back when, which we've completely forgotten now. There are games that defined my childhood which aren't even known to the new generation and aren't even available anywhere. That's just the way of life.

{{% remark %}}
Which is why it's kind of a blessing that I mostly make generators for _board games_, which people can obviously print / save more permanently. Even if Pandaqi ever goes down, there are still thousands of perfectly functional PDFs of the games out there.
{{% /remark %}}

Or let me say it another way: _You can't plant a new tree if the garden is completely stuffed and overgrown with dead plants._

There will come a time, probably pretty soon, when games will start to be _removed_ from Pandaqi again. When the amount of projects is so huge that I'd rather focus on the best and the newest, instead of taking resources away from them to display and maintain old and worse projects. Because those hours spent updating an old One Paper Game that probably nobody played, are hours I can't put into the next game that's already much better. Hours of creative potential that are forever lost to dragging dead weight back to the surface.

Surprisingly, I too am not immortal.

And so I come back to the Principle of Least Maintenance.

* By designing my projects this way, I don't actually have to make this decision or look at them _at all_ for the longest time.
* But when they DO need maintenance, that's a clear sign they are now too old and outdated, and they should probably just be removed.

To complete the metaphor: dead plants, if you wait long enough, will sink into the dirt and are actually _great_ fertilizer/nutrients for a new tree to grow.

I think it's wise to see your oldest projects as learning experiences and stepping stones. Even if removed, dead or unplayable or unbuyable (?), they still have value. They still taught you something. They were still a crucial point on the journey towards what you're making _now_. If it's some physical good you made, it might even still have value long after it "dies", because of people all around the world who have bought it and maintain it themselves.

## Conclusion

Nothing lasts forever. So don't waste too much time desperately clinging on and _trying_ to make them last forever. It just means you will lose the opportunity to make the best of the here and now, and actually produce your best new work.

If that means making slightly less "unique" projects, if that means discarding ideas that could've been cool just because they are _hard to maintain_, then that's fine. If that means 99% of the games that come out of Pandaqi from now are more safe and uniform, that's also fine.

That's what the Principle of Least Maintenance is about.

Pick your flagship projects wisely. Make them big, push boundaries, go out of your way to make them special.

But let all your other projects be small, safe within your current limits, and make them as low maintenance as possible.

As Brandon said: there is tremendous value in still doing something you 100% know you can do. As I will say: there is tremendous value in knowing when to let something stay simple or die.

Those were my thoughts tonight,

Pandaqi