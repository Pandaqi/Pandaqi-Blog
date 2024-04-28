---
title: "To modern rulebooks and beyond!"
date: 2023-02-22
emoji: "📖"
---

The past few months, I've made some huge updates to this website and my (board) games on it. (Check out the other articles, like [this one](../pandaqi-games-2023-update/)) 

While I did that, a question popped up in the back of my mind. It nagged and nagged until I gave in.

All my rulebooks (for board games) have been traditional. They are a separate PDF you can download and print. They were made with traditional editorial software. (First Adobe InDesign, then Affinity Publisher.)

At the same time, many of my games use the website for something. (I call them "hybrid" games. Often this online component is optional, though.) I even add a small rules overview to the page! And sometimes an animated GIF!

So why am I still making these PDFs? Why do I create a rules explanation 3+ times? Why as a PDF to print ... when people are already on my website?

It felt like an extra step. Yes, the PDF will always be a nice backup. (Especially for people who want the rules in print.) But maybe it's better to modernize my setup.

Maybe I should start supplying rules as a **web page**.

## What's the idea?

Currently, this is the process.

* You visit a game of mine
* It has a short introduction + decoration / visuals
* It also has a big Download button.
* Below that, it tries to explain the game and what you need to play. (Any interactive elements are also there.)
* If this interests you, you click Download.
* You find the Rules PDF
* You read that
* If you want to keep the rules with you while playing, you'll have to _print_ that PDF

That's just too many steps. I want to simplify it to ...

* You visit a game of mine
* It has a short marketing blurb + decoration / visuals
* If that interests you, click the link to view the rules immediately
* This is just a separate webpage where you can immediately _interact_ with the rules.

These rules will be (more) readable on devices. You can keep the rules with you while trying my game for the first time (by simply placing your phone/tablet on the table). Website language is so powerful that I can create rules that look good with more ease.

And a few months ago I learned how to setup website to easily convert them to PDF later. So we can keep that option around as well!

Weighing the pros and cons, weighing the effort needed, I decided to take the leap. I was already sketching the rules for my next game. I simply stopped writing my ideas in Word, and started writing them as a web page.

## But wait, I am stupid

My first try at this idea was _meh_. By routine, I designed the webpage like I'd design any of my older rulebooks. From start to finish, it was basically the same as the PDF. But it actually took _more_ effort, because I also had to make the rules "responsive" (to different screen sizes).

For example, the rules were still laid out top to bottom. It was a _long_ page, where a rulebook would've broken it into digestible pages.

This was worse! Was it a bad idea? Am I stupid?

I researched some more. I went to bed. The next day I woke up with the answer.

If I was going to design rulebooks as websites, I should _take advantage_ of the strengths of this medium. I should view them in an entirely different way.

## Adding interactivity to rulebooks

What's the advantage of the web?

* Interactivity: you can click, find, scroll, etcetera
* Generation: I can let the computer do the hard work. By providing some code, the computer can generate nice decorations or styling from that.

Let's imagine a user. Either a new player who wants to learn the game, or somebody who wants to reference the rules (for a reminder) while playing.

The first type will be overwhelmed by the full rules. They only need to know the basics. (Any expansions, exceptions, variants, are all irrelevant.)

The second type is searching for one specific thing. (Like: "how many points do you get for doing X again?") They want clear headings or a _clickable_ table of contents.

This gave me the following structure.

* A simple heading that states "These are the rules for game X"
* A table of contents
* Sections that can _fold_ and _unfold_. And communicate if they are essential to view or not.

I considered adding a search bar into that interface as well. But the built-in search of your browser is certainly faster, cleaner and familiar to most.

## Other elements

Besides this, most rules have some recurring elements. I decided to make one stylesheet (that every rule page automatically loads) for these.

* Numbered / decorated headings. (Most headings have some decoration around them. Makes it look more professional _and_ clearly indicates where you are in the rules.)
* References to other parts within the same rules. (Other sections, example images, etcetera.)
* Showing text and image alongside each other. (On small screens, they'll just go below each other.)
* Default _icons_ or _markup_ for sections that will be in every rulebook. (This will mostly help if you read multiple rulebooks by _me_. You'll immediately understand 80% of the rules by seeing that icon.)

## Stretch goals

Of course, we can take interactivity even further. We can ...

* Animate parts of the rulebook.
* Add small "applets" to randomly generate an example or game situation for you.

The first one will often be possible, but is hard to make. I would either need to animate a short video myself, or I'd need to do some CSS/JavaScript magic to animate something procedurally. Either way, it takes a lot of time and effort, which I can't reasonable spend on free board games.

The second will often not be possible, but is rather easy to code. I can simply give a button or some inputs, and _show_ players what would happen in that situation. 

{{% example %}}
Let's say I have a game where you throw dice. I can create a button "Do a turn!", then write code to get a random dice roll and explain the consequences of that.
{{% /example %}}

## How does this work in practice?

I use the Hugo static website generator. (Highly recommend it, by the way.)

This means I can create a "layout" named `rules.html`, and it will automatically be used by all pages with a path that ends with `rules/_index.md`

This layout loads some things by default

* The stylesheet for those common styling elements
* The unique stylesheet for these particular rules
* The script for "Paged.js" => the system I use for converting the page to a PDF
* The script for my interactive system => the fold/unfold, support for interactive applets, etcetera

Hugo has "shortcodes". This allows reusing pieces of code in a markdown (`.md`) file.

As such, I created shortcodes for al the common styling elements and wrapped them around the rules. Most notable, I created `rules-folded`. I wrap this around every unique section. Then, Hugo simply feeds that into my shortcode, which generates the HTML markup needed for the folded sections.

The same thing happens for all other common elements.

This sounds easy. In practice, it was quite a journey to find this system and make it work. I had two issues

* Rules shouldn't all look identical. I needed a common skeleton, but also enough _freedom_ to change rules to fit the game. (In other words, elements such as fonts, colors, size of headings, and all that needed to be easily customizable.)
* I can't magically convert an interactive web page to a PDF :p

Without extra work, Paged.js would create a PDF that merely showed my folded sections. Pretty useless, right?

I needed to _separate_ it into two style sets.

* **Screen**: applies the styles and script necessary for the interactive version
* **Print**: applies some different styles to get the page ready for a proper printed version

This distinction is literally drawn using these keywords in CSS: `@media screen` and `@media print`. But I still needed to figure this out and find the right setup for it.

Therefore, there was a pretty dark period between "hey let's modernize my rulebooks" and "yes, this works great" within which I constantly doubted how achievable the idea was. But I know that this happens on _every_ new or innovative idea, so I pushed through.

## Improving the concept

### Remarks

One thing that always bugs me about designing websites / for screens, is the wasted horizontal space. 

To keep text nicely readable and centered, it needs to be quite narrow. This means that, on a typical laptop/desktop, you have _tons_ of empty space on the sides. While the page grows taller and taller!

The solution came to me when I added a few "remarks" to the first rulebook created this way. There are always tiny reminders for readers, or clarifications, which just aren't "important" enough to put in the main text.

Then I realized: we can put them to the side. In the side margin! On small screens (phones) they go inside the regular text again.

I loved this so much, that I started using remarks a bit more. It just works so well:

* The main text for the rulebook is short and sweet. No wasted sentence, to-the-point, etcetera
* But you can still add some flair and some certainty, which will also look _good_ when printed. (Because putting stuff inside the left/right margin is really meant for printed books.)

### Clickable icons

Many games have a list of "things". For example, if you have a card game with 10 different types of cards, there needs to be a _table_ or _overview_ somewhere with all those types.

So, as expected, I created a dedicated system for that. It lays out the "things" with an icon, header, and description.

At first, though, only the icons show (in a tight grid). Click on one to expand it and show what it means.

{{% remark %}}
Also, all images can be clicked to become fullscreen. But that's a "given" in my eyes.
{{% /remark %}}

These rulebooks _really_ try to hide any information you don't want. So it's not overwhelming. And you can focus on the stuff you _do_ want.

### Interactive Examples

Yes, as I expected, the "interactive examples" are easy to code. I created a system for that, so I can plug in _any_ piece of JavaScript code easily.

For the first game with an interactive rulebook---[Keebble](https://pandaqi.com/keebble-games/spell/keebble/)---this meant a generator that simulates one whole turn. It took 30 minutes to write, takes into account any rules or exceptions that might occur, and prints ~3 easily readable paragraphs.

Honestly, you can just click that button a few times to learn the game, and ignore the rest of the rules :p

I'm researching creating videos/animations using the [MotionCanvas](https://motioncanvas.io/) system. It's free, open source, and focuses on animation through _code_ and _vectors_. My laptop is so old it literally cannot run any video editor. I can code better than I can animate. So it seems the best fit. For now, though, it remains a stretch goal.

## Where to go from here?

Want to see it in action? Check the [rules for Keebble](https://pandaqi.com/keebble-games/spell/keebble/rules/), the first game to use this system. Any feedback, as always, is appreciated.

I've only created a few rulebooks this way. The future is uncertain---as always.

But I'm loving it so far. Once I was able to turn my perspective on rulebooks upside down, I realized how powerful the web is, and how powerful interactive rulebooks are.

More and more, I refine my system. And I find ways to slip those stretch goals (animation or interactive buttons) into rules.

I don't see myself making a purely PDF rulebook anytime soon. Maybe for _really_ complex games ... but I don't see myself making those, ever.

My dream would be to make videos as well. Record the game as it's played by a group. But due to health issues, I can't do long videos in which I talk (and explain the rules), nor long sessions with others. 

{{% remark %}}
And most people don't want to be filmed or talk English just for the video :p I'm Dutch, by the way. So everybody here _can_ talk English, but only do so if absolutely necessary.
{{% /remark %}}

Let's keep that as a stretch goal for the future. For now, I think my free games have become more professional and accessible year after year.