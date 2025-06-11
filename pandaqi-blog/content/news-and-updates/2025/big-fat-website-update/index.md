---
title: "The Big Fat Website Update of 2025"
date: 2025-07-07
emoji: "🎮"
---

The past few years, I've created a handful of large websites (my game studio, my author website, my portfolio, etcetera). For the most part, after creating many websites while I was still in high school/university, I knew what I was doing. Most of these websites were well-designed from the start, which is great!

The only website that saw massive update after massive update, was [Pandaqi (My Game Studio)](https://pandaqi.com). I simply never predicted that I would end up making over a hundred board games, all of which can be generated (on the fly) on that website. I even made several _hybrid_ games, which is a board game with some digital component on my website that helps out. 

That's why Pandaqi saw massive updates and rewrites to its "backend". To the code and systems that make it all function under the hood.

What I never really updated, however, was the "frontend". The code that generates how it all looks---a language called CSS. The visual design. At the time, I created something that ranged from "good enough" to "quite pretty", and called it done. As always, I adopted the mind-set of "make something, learn as we go".

This, unsurprisingly, leads to a _mess_ of styling code in certain places. Lots of duplicate colors and sizes mentioned everywhere. I tried to split it into modules, but at some point you get weird modules like "paragraphs-lists-footnotes" doing three things at once for some reason. I had only _just_ discovered modern styling functions, while I was already halfway designing a website, and thus applied them ... only halfway. 

Across all my websites (5 of them, at time fo writing), I estimated I could cut my styling code by 90%, and it would only make the websites look _better_ and _more consistent_. Some of my earliest websites looked a bit too "busy", or maybe even "childish", to me now. Again, Pandaqi is the best example of this: I picked custom colors, images, styling, etcetera for _every unique game_ I made in that first year. Some of those "custom" pages look great. Most of them just look inconsistent and messy now, side to side with the modern releases.

I wanted to streamline all of that. My goal was to make the websites look more "clean" and "professional" at the front, while making it much faster and easier to maintain for me at the back.

This was a long time coming for Pandaqi. Once I dug into it, I decided to just extend this to _all_ websites. Because they could all benefit greatly from the lessons I learned. (And, again, having consistent code and systems for _all_ my websites makes it much easier to maintain and to fix issues across all of them.)

## Step 1: Composition over Inheritance

### The problems with inheritance

This is an old adage in computer programming. In _most_ cases, prefer "composition" over "inheritance". For some reason, all those years, I failed to see this was also true for CSS.

Let me give an example.

Almost all websites have a "header". That's the part at the top, present on every page, which contains navigation and settings and whatnot.

To style that, 

* I simply give it a `header` class
* Then, in CSS, I select that with the `.header { }` selector.
* Within those brackets, I write down the style rules for that header! 
* For example, if the text should be white, I write `text-color:white;`

This process repeated for all "parts" of the website. And if your website is _really small and minimalist_, like most of mine were at the start, then this is fine. You only _have_ a few "parts" anyway. So just select them immediately, give them their specific styles, and you're done.

But as it goes, websites grow, my experience grows, I grow older :p I just want to be _practical and efficient_ instead of _playing around with a new website_.

And so you start to get annoyed at the inefficiencies of this method.

**Problem 1:** Many parts of a website usually have the same or a similar look. For example, many parts might need the text to be white instead of black. With the approach outlined above, you really only have two choices.

* Either give the `.header` class ... to lots of things that aren't a header. Confusing! Weird!
* Or copy-paste the same styling rule (`text-color:white;`) to lots of places. Waste of time! If it ever changes, I have to change it _everywhere_!

**Problem 2:** CSS "inherits" styles from parents by default. So, for example, setting the text to white for just the header ... also makes it white for every thing _inside_ that header. This is usually what you want, and what you expect, so that's fine.  

However, if we want something _different_, we need to work against that inheritance. So, for example, if I want to select a button inside the header I could do two things:

* Either give the button a class like `header-button`. The deeper we go, the more unreadable and hyper-specific these class names get!
* Or, in CSS, select it with `header button { }`. (A list of classes tells CSS to look for them in that order: "parent = header, child = button") Again, the deeper we go, the longer and more unwieldy our CSS!

And if we combine this with problem 1, then the issues explode into something unmanageable. We get incredibly long names ... and we need _new ones for every element_, even if they look the same. Because styles are set up to be inherited from parents/classes, we need to fight that system half the time, and can't re-use anything outside of that parent-child structure.

For example, if we want a button somewhere else that looks identical to that `header-button`, we need to copy-paste the code and assign it to some other selector like `something something button { }`. Even worse, that `something` might add its own styles that we now inherit automatically, and thus need to _fight_ if we want it to actually look identical.

You can imagine how this approach leads to a dozen long, convoluted, repetitive CSS files for such a large and varied website as Pandaqi.

### The promise of composition

Instead, enter composition. This simply means that styles should be determined by a _composition_ ( = group/collection/mixture) of tiny independent styles, instead of inheritance or position in the webpage tree.

We want our header to have white text? Well, then we just create a tiny class that _does that_ (and only that).

We define `text-white` in CSS. We assign it to the header. Done.

Most importantly, we can also reuse this class anywhere else we want white text. Because that's the only change it makes, and the class isn't confusingly named after one specific part of the website.

What if we want the header to also have a black background? Same thing. 

We define `bg-black` in CSS and assign it too. Done. And we can _reuse_ this anywhere else too without problems, by just giving other elements class `bg-black` too.

In other words, 

> Styling "classes" should be defined by the _specific style change they make_. They should not be linked to a specific element, or position on the page, or vague intent.

This way of writing style code has so many advantages that I hate myself for not (really) using it for 5 websites straight.

* The style code explains itself. Every little module has a descriptive name and only a few lines of styling.
* We need way less styling code. Because nothing is ever repeated or duplicated---the same `text-white` class can now be used _everywhere_ we need that change.
* The website looks consistent, for free. Because, again, everything draws from the _same_ colors and values instead of adding more and more for every unique element on the page.
* This is much easier to maintain: easier to edit the entire website with one thing, more future-proof, fewer surprises.

And so I decided that I wanted to _switch_ to this approach on all my websites.

## Step 2: Actually applying this

A CSS framework on the forefront of this methodology is probably [Tailwind CSS](https://tailwindcss.com/). It looks good. It has very good "reviews"---or, I guess, user experience stories and data. I would use it ... if my circumstances were different.

My hardware consists of a very old broken laptop, in a home that barely has an internet connection, and---I'll stop now, lest I write down a huge list of everything not working.

This has forced me to stay as small and minimalist as possible. Way more minimalist than what most people imagine when I say the word.

My computer can't really handle node packages. Which means installing something like Tailwind is prone to errors, and simply too slow and annoying in general.

Another reason I wanted to completely restyle my websites is because this "CSS conversion step" _fails most of the time_ on my computer. I don't even have _that_ much CSS at the moment. But it's written in SASS---a variant that has some nice extra functionality that makes my life easier---which needs to be _converted_ to CSS before the website goes live. Half the time, this works fine, if slow. Half the time, it can't find the thing that's supposed to convert it, or it just crashes, or it ... doesn't convert it properly?

Believe me, if you have a laptop that's more than 12 years old, and was never intended for such use in the first place, you run into issues daily that absolutely NOBODY else on the internet has had before you.

Anyway, it's my biggest headache when working on the website right now. So adding _another_ conversion step just wasn't going to work.

Finally, I've always benefitted greatly from doing things myself (from scratch) when this was reasonable. It teaches you the most, it feels most rewarding, and I end up being able to _customize_ my own system when I realize I need that later down the line.

So, instead, I had to create my own (minimalist) version of what Tailwind is doing. The general principles, as my current experience tells me, are as follows.

* I create my own style code with these little modules. (`text-dark`, `rounded-corners`, `align-right`, ...)
  * I'll steal some of them, and their naming, from other CSS frameworks like Tailwind. But I want them to be a bit more readable, if I can help it.
* I create a "scale" for the most common elements. 
  * For example, I create a scale with 3 or 5 text sizes (`font-size-small`, `font-size-medium`, ...) and that's all I use anywhere.
  * This makes the design consistent, this makes me faster as I don't have to copy-paste or manually pick some perfect number, and the "constraints" this places on me are actually a good thing for productivity.
* For more difficult approaches (such as larger styling that is reusable), I still rely on the processing by SASS. For example, something like `product-item` that styles the entire product element in a webshop in one go.
  * In a way, it allows me to "compose" one large style module out of these smaller style modules. 
  * I will use it far less than before, though, lightening this load.
  * And if it's not absolutely _needed_, it goes away and my website returns to default CSS. The modern standards are far along enough that SASS isn't needed for most things anymore.

And then I "design" the website (mostly to look as it looked before) by adding a composition of these classes to every element. No more `.header` class that contains loads of style rules for the entire header! Instead, that element just gets 5 or 10 smaller classes, which achieve the same look.

{{% example %}}
What about pseudo-states or media queries or other fun stuff? These adapt to this approach just fine. Although you might have to see it in action once to understand how. 

For example, if I want a button to "pop up" ( = grow larger) when the user hovers their mouse over it, I'd just assign the class `hover_popup` or something. Same as always. 

Then, in CSS, I can say `hover_popup:hover { ... }` and add my rules that way. I would simply NOT add the class without `:hover` at the end, so it does nothing when your mouse isn't over it.
{{% /example %}}

## Step 3: Colors & Fonts

We have a new color space! And it fixes the main gripe of basically all designers!

The issue with colors is that they aren't uniformly perceived. The shade "blue" looks _darker_ than "red" at the same brightness level. This makes it much harder to create a color scheme with different colors that must be equally bright, for example, or to ensure enough contrast in a design where colors can vary _a lot_ (... such as my Pandaqi website).

Instead, we now have `oklch()`. It requires basically the same _input_: brightness, saturation, hue ( = color), alpha ( = how transparent). But it actually uses a color space and calculation that ensures colors are equally bright if their brightness is equal. Sounds pretty obvious when you say it like that, but it took a while for us to figure out how to do this easily.

As expected, I want to use those colors in the new designs. Even in the rare case it's not supported yet, the browser falls back on a "close enough" color, which is probably already better than before.

Similarly, for my first websites, I was a bit ... wishy-washy with my font and text design. I _hardcoded_ many font sizes. Which meant they are a bit inconsistent and don't respond well to different screen sizes. When I "fixed" this last summer, with a hasty update to make all these sizes _relative_, I just introduced more problems and inconsistency. Because I failed to understand the difference between `em` (scales to font size of parent) and `rem` (scales to font size of root container). Not great.

Most other font woes _have_ been fixed over the years. Such as loading them locally (instead of Google Fonts, which slowed down my website and made me depend on some outside source), loading them asynchronously (the page already loads, then the fonts "pop in" once they're downloaded too), picking fonts that are readable and less childish in general, etcetera.

Still, my hyperactive brain always wants _more more more_. More colors. More detail. More fonts with more distinct and playful characters.

I _know_, as my illustrations and other design work illustrate, how to make something look good. I have more than enough experience picking fonts, colors, layouts, grids, perspective, etcetera. But in the past, every darn time, I made something nice---and then ruined it by going _further_ and adding unnecessary detail, a third font, maybe another color.

I _think_ I've learned my lesson here and can stop before I go too far. My latest designs are able to keep more whitespace, keep things simpler, and look more professional for it. The website designs will hopefully reflect that now too.

## Step 4: Pandaqi + Webshops

This is the final reason for this massive design change: a webshop.

For years, I mentioned two things here and there. The need to actually make money (which I barely do, giving away everything for free) and the wish to attach a webshop (some way, somehow) to my biggest websites.

As it goes, I come back to the idea every few months, make a few small breakthroughs, then drop it when I can't find further answers.

Now I'd finally reached a point where I _really_ needed to follow through on this. I don't care about money, which is why I can't find any motivation to actually get it. It's not a matter of effort, of course---I work so hard that I create 10+ books a year, 50+ board games, maintain 5+ huge websites, etcetera---I just don't care to monetize it _at all_. But I do need to eat, you know? :p For full transparency, for example, my total book sales---all time---amount to only ~150 dollar profit.

And when I look at my websites through that lens ... I felt they needed to be cleaner. Pandaqi, right now, is very playful, fun, colorful, a nice cozy home made by someone who has been creating fun experiences for 10+ years. It is _not_ a professional shop, a store, a business. It doesn't look like one either.

I decided that a full redesign of Pandaqi would be needed. Standardize the layout of every game. Remove some colors and unnecessary details. Make it look as if this was a webshop selling these games, even if I don't actually do that.

And to most, this "professional" look is a very _simple but consistent one_. Just a few simple colors. A header that allows them to easily find the product they're looking for. A nice big "buy" button that looks trustworth, which leads to a simple shopping cart. No distractions, no fun colors, just a solid storefront.

I can't achieve that with the mess of CSS I currently have. I can't achieve that with "a tweak here or there" to what I already have. It basically means a redesign from the ground up.

I also imagine I'll need a separate domain name, maybe even two. Separation of concerns is always nice, but it also makes a shop feel less credible if it's "tacked onto" another site intead of its own thing.

And if _consistency_ is the key word, then this approach through "composition" (and consistent color spaces + font sizes) is by far the most promising.

You can read my other article for [more information about my long/weird journey towards a webshop](/blog/news-and-updates/2026/how-i-coded-my-own-webshop/). But below I just want to briefly talk about my experiences using these techniques I described as I built my webshop from scratch. And how that experience was so _positive_ that it solidified the need to spend a week updating my old websites accordingly.

## Positive Experiences in Practice

So, for my online store, I used CSS composition from the start. I also used those nicer colors, and focused on the general lesson of "keep the style simple and consistent, which looks more professional".

With this system, it only took _three days_ to get the entire look of the webshop 90% done. It's a big website. It has to support a lot of different products, images, color schemes. But it currently has a single, rather small, style sheet with all these little "modules". And that has proven to be enough.

Color variations were very easy to do with `oklch()`. You literally keep most values the same, but change one of them in the way you want. _With some exceptions_, this immediately gave me the color that was perfectly consistent and contrasted nicely with the others. (I only ran into issues with deep deep blue, probably because that's perceived as the darkest color of all, so tweaking that led to colors that ... didn't look blue anymore? Might also be my old computer with terrible screen.)

Because of that, this already massive website builds rather quickly on my machine, and I've never had issues with this CSS conversion step. And, most of all, I like how clean and consistent the online store looks, _while keeping some of my colorful magical charm_.

In any case, this approach allowed me to almost immediately start working on the _products_ for the shop, as I know that inputting them will be a breeze.

I did all this a few months before the summer, in which I usually do this "big fat website update". I was initially a bit demotivated to do this update, because modifying my 5 existing websites to this much better approach would be _a lot of work_. I was about to say "nah, let's do that _next year_ instead". But seeing the results in front of me, I managed to do the big fat website update this year too. 

In fact, I became a bit of a mercenary, a butcher cutting up my old terrible code (some of it written when I was still a kid) and replacing it with something fresh ;) As stated, I'm spending the most time on [Pandaqi](https://pandaqi.com). It's by far my biggest website with the best content (some hundred quality free board games) and most visitors. It's also by far the best "marketing" for my webshop, telling people that there are even _better_ games there. And so I wanted it to look clean, and fast, and professional, instead of the somehwat busy childlike design that I stuck with since I started the whole thing.

## Conclusion

Those were my thoughts on my massive (visual) design update. I don't know when this article publishes and how far along I will be. 

Knowing myself, I'll have the smallest/easiest websites _done_. Having learned my lessons from that, I tackle the biggest one---most notably Pandaqi---over time with a few updates. Because, well, once I have my small "modules" for one website ... I can obviously _reuse_ them on another website entirely! That's the whole idea! A class like `text-white` or `text-bold` is useful in all my website, and absolutely the same everywhere.

This is by far the biggest design update I've ever done (and will hopefully ever do). I didn't want to wait with publishing this article until it was 100% done, because that's too far ahead. And, really, is anything _ever_ 100% done?

I just wanted to share these thoughts. Maybe it helps someone else realize how much more powerful and maintainable "composition" is (and that we now have a really nice color space to use!) Maybe it was just interesting to read and reveals some of the work I've been doing and will do in the future. And, of course, this article sorted my thoughts and became a vague "to-do list" for myself.

Until the next update,

Tiamo