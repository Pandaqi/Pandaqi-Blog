---
title: "Pandaqi Games: Version 4.0?"
date: 2026-01-01
emoji: "🐼"
---

The past few years I've written several articles about updating the Pandaqi website. They alternated between updating the _code_ behind it all, and updating the _design/look_ of the website. 

Though, to be honest, 90% of the time was spent on the games themselves and their code. I made nearly 100 games that you can generate on the fly, right on the website. The framework to do so had a _lot_ of features and worked well---most of the time.

The work on this was a continuous stream of small updates and fixes. After all, Pandaqi was a free website, a "hobby project", and I simply couldn't dedicate more time and effort to it.

For nearly 9 months now I haven't made a single update to Pandaqi. The longest silence in ~5 years.

Why? Well, two reasons.

* I've been working really hard on creating an online store. After trying many things I've come to realize this is the best way to earn income for me. (Especially with _how_ I set up the online store, which I did in a specific way that no other store does.) As I run low on money and time left to figure it out, I decided the store had to launch start of next year, which meant I had to spend 99% of my time on _that_ instead of Pandaqi.
* The list of bugs, issues, annoyances and more from 5+ years of on-and-off work on Pandaqi had become too long. I started that website when I barely knew what I was doing. I never even planned to _generate_ board games on it! The first few months of its lifetime, Pandaqi.com only showed the three video games I'd made until then. And so things were messy and slow and _meh_ behind the scenes.

As I worked on that online store I realized how much I'd learned the past 10 years. I made a lot of mistakes and learned how to write cleaner code, how to create better website layouts, and so forth. And it shows: I designed that webshop (front-end and back-end) in about 5 days, and it works and looks much better than Pandaqi ever did.

Additionally, that online store will now be _selling_ games. I still very much support a world based on sharing and freedom, which is why I decided to keep Pandaqi games _free_. Whenever I make a game, I decide if it's going to be a _paid one_ ( = goes on the webshop) or a _free one_ ( = goes on Pandaqi). The Pandaqi website should absolutely stay around and keep doing what its doing, just ... better.

And so I decided that Pandaqi would get a _complete overhaul_.

* It should be **heavily simplified**. The idea of "every page is unique and get a unique design!" is nice in theory, but bad in practice. It makes a mess, it bloats the web page, and it was so much work to pick (for example) custom fonts each time ... that my chosen colors/fonts/layouts were far uglier than they should have been. I should go back to just a simple white page, black text, nothing fancy.
* It should be a kind of **advertising for my webshop**. Not in the annoying way. In the good way: the website looks so clean, professional, well-maintained that people trust that my paid games are good.
* It should be **cleaner, better, faster, easier to maintain**. In other words, I should update the game generation code so it can use the vastly improved systems I created for the webshop. (I basically created a "PQ-Games Version 2" framework too that I want to port back; more on that later.)

This article talks a bit about what I did and why. It's split into two parts: the **design** (the front-facing, visible layout of the website) and the **code** (the framework that generates board game PDFs on the fly).

{{% remark %}}
The first part gets way more attention as it likely appeals to more readers _and_ the code framework has been explained again and again in my older articles.
{{% /remark %}}

To give you an idea, here are some images of the **old design**.

![Old front page.](pq-old-1.webp)

![Old info/about pages.](pq-old-2.webp)

![Old special boardgames collection/landing page.](pq-old-3.webp)

![Old Square Ogre ( = paid video game) project page.](pq-old-4.webp)

![Old free board game project page (one of the first I ever made actually).](pq-old-5.webp)

![Old board game project with a digital component / hybrid setup.](pq-old-6.webp)

![Old board game project that was one of the last I added, for which I didn't do custom colors/designs anymore.](pq-old-7.webp)

![Old tool page (dictionary, randomness, game picker, etc).](pq-old-8.webp)

And here are some images of the **new design** (at least, at time of writing).

![New front page.](pq-new-1.webp)

![New project page (top).](pq-new-2.webp)

![New project page (middle/content).](pq-new-3.webp)

![New interactive rulebook (some random things folded/unfolded).](pq-new-4.webp)

![New video game project page (with trailer/gallery/buy buttons)](pq-new-5.webp)

![New project page dark mode / second example](pq-new-6.webp)

![New bottom design (footer, standard support text, etc)](pq-new-7.webp)

## The Design

I **threw out the old design**. Of course, I backed it up and ended up reusing bits of it. But I started completely _fresh_.

Why? Because it was simply easier and less overwhelming. And because I guessed I would throw out 80% of the old design anyway---and I was right.

Instead, I wrote down the following principle:

> **Pandaqi.com should become my personal "Steam" of Board Games (visually, that is)**

If you play video games at all, you'll know about Steam. By far the biggest and most trusted marketplace for video games. Their shop design is pretty simple and unassuming, but very effective. Of course, there are some differences between video games and board games. I certainly had to change some things. But for the most part, I could do a version of what they did.

Also, the website _does_ contain a lot of video games too. And I hope, hope, hope that I ever get the funds and hardware to make big video games again. For those projects, the new design would actually be pretty perfect.

### The General Idea

What does this mean in practice?

* In overviews (home page, searching a category, etcetera) the games are just displayed in a simple **grid**. Their main image is 90% of that; any important details make up the other 10%.
* On individual game pages, we have a **big banner** at the top. This banner shows the game's image in the background, fading into the actual content: a **main section** and a **sidebar**. On small screens (e.g. mobile) the sidebar simply folds into the main section.

The **main section** contains ...

* Gallery of screenshots/images/trailers, if any available. (This required me to go back to old games and take tons of screenshots for marketing purposes.)
* The main text => this is the actual content of the Markdown file of the project, and should just be a few headings + paragraphs explaining the project and giving more info.
* A standard credits/feedback/about the creator message at the bottom. (I made all the games, so it's identical for each page. But it somehow makes people trust it more if they see a face/know who made it, and it's the only way to make them realize they can donate/give feedback.)

The **sidebar** contains ...

* A smaller version of the game's image
* A tagline / one-sentence description of the game
* **The buttons to actually get the game** (So, a list of buttons saying "Download", "Generate", "Rules", etcetera.)
* All the game's metadata (number of players, duration, categories, etc)

My biggest doubt was about where the buttons should go. It feels like _main_ content, and Steam of course has its buy button right below the trailers/screenshots.

But in my case, it's not a buy button. It's not even a _single_ button in (almost) all cases! And the buttons lead to very different things. On small screens, the sidebar folds into the main content anyway. So I decided to put it in the sidebar.

That's it. It's very simple, very minimalist, very straightforward.

It took me _years_ of experimenting, bouncing around like a hyperactive idiot, to actually realize this is much better than having this extremely colorful and diverse website with fancy stuff. It also took me those years to know how to create the systems so that aaaall complexity is behind the scenes and nothing visible to the user.

### What Needs To Change?

Now, the very first system generated your material _right inside the page_. This seemed nice for a bit, but it wasn't. 

* It meant that every page had to load its entire source code upon visiting the page (because it needed that in case you wanted to generate). Unnecessarily large pages. Bloat. Messy.
* It wasn't even great for usability, because now you had this arrangement of settings and levers ... right in the middle of the web page. I even had a scroll bug for a while (for a stupid reason, don't ask, it was infuriating) that meant you _scrolled to a different part of the page_ after each generation.

And so, a year ago, I rewrote it to move to a _new page_. The settings were still on the game page, but it saved your settings and brought them to a new page, where it actually executed code.

* This is already much cleaner, of course. Only that separate page needs to load the code; and there are no other distracting elements there.
* But it still wasn't perfect, because the _settings_ were baked into that other page. Depending on your browser/strict security settings, it wouldn't be allowed to save your settings and transfer them (or some browsers even thought it tried to show a pop-up).

As such, the first major change to my systems was to move the _settings_ onto that separate page too. I rewrote that part of the system to create the settings nodes (HTML) dynamically upon loading. This finally allowed me to simplify the whole thing to 

* Press the "Generate" button and you go to a different page.
* Nothing else is on the page, just a settings box.
* When satisfied, press the button, and you remain on that page as it generates your stuff. 
* (It even keeps your settings and allows regenerations, as long as you don't close that page!)

I guess the biggest lesson learned here is that sometimes things _seem_ nice from a usability/speed-of-use perspective, but a few months of experience with that system shows how it _really isn't_. Keep separate things separate. Keep different parts of a system on different pages. Much easier, much cleaner.

Honestly, it felt a bit like I was in a loop the past few years. I'd find myself completely updating my older games and generator code once every year, because every previous attempt was just _one_ step in the right direction. Sometimes you'd start to wonder if this was ever going to end or I'd be doomed to keep "updating" Pandaqi forever :p

With this rewrite, I could just add those buttons to the page (and _not_ the settings, code, or anything else). And when you click the button, you move to the separate page that actually does the thing.

As I obviously should've done from the start five years ago :/

We also need a change in the Markdown files that define every project, but it's a minor one.

* The actual content of the Markdown file is the _main content_ of the page.
* Anything else is now a _parameter_ (or "metadata") I can set in the frontmatter.

For example, a screenshot gallery would use `{{/*< screenshot-gallery images="list,of,images,here" >*/}}` right inside the main content before. The system would then replace this with the code needed for the gallery upon building the page, and the gallery would be placed right alongside the rest of the text

Now, instead, I define `screenshots: [list,of,images,here]` in the frontmatter. And when building the page, it just reads that specific property. It doesn't exist? Do nothing, continue! It does exist? Create the standardized gallery and put the images inside.

The main content is free from all those shenanigans, and only used for the main headings + paragraphs + anything else to explain this specific project.

### The Styling

I switched to using **modular CSS**. That is, 

* I **don't** give elements a class like `.footer` and then style that specifically. Because that leads to lots of extra styling rules, lots of mistakes as we have slight mismatches between numbers used, etcetera.
* I **do** create simple classes like `.text-align-center` and `.font-size-big` and simply reuse those tiny modules across the website to style stuff consistently. Nothing has a unique name that requires even more custom code---everything just uses a combination of the same few module classes.

Anything reused/dynamic is a **CSS Variable** applied at the root. For example,

* You can create a CSS variable called `--text-color` and then use that for all text (with `var(--text-color)`).
* Now, say I want a dark mode and a light mode for this website. All I need to do to switch, is change the value of that `--text-color` variable to something else. 
* Everything that reads it automatically follows suit, and we're already done.

Pages have **no individual styles anymore**. No custom fonts, no custom stylesheet it automatically tries to find, nothing of the sort. (I _can_ still do that if I want, but it's not the default and I probably will never use that.)

This allows me to bring a laaaaarge array of CSS stylesheets back to just **one**, which is even quite small.

Some notable things I kept from before were ...

* The "wacky boxes" for buttons. They look more cute and organic and soft than hard-edged rectangles, and the way to create them is very cheap and simple anyway.
* The established Pandaqi fonts.
* The unique icon set I created (showing Android icon, Apple icon, Go To HomePage Icon, etcetera)

Some notable things I removed were ...

* The wavy underline below _all_ headers. What the fuck was I thinking?
* The huge banner blocks (one per game, layed out verically) with wavy edges. The way to create _those_ is iffy and inconsistent, and even started to lag on my old broken computer.
* The large array of different colorschemes that were randomly chosen. Yes, it gives the website a lot of variety and color, and it actually looked pretty good for the most part. But it does _not_ look good anymore in combination with the style of everything else and it often clashed with the designs of individual games. (If the website decides to make the footer/header a nice green, but my game's material/marketing image uses a color that looks really ugly with that ... there's no way for me to know in advance and prevent the situation. While it probably ruins the experience for anyone visiting.)

### The Info Pages

Like most websites, Pandaqi had a lot of "metadata pages": about, contact, my social media accounts, frequently asked questions, etcetera.

These are all **gone**! Which also saved me the headache of having to redesign them, as, you guessed it, the old way of displaying these special pages (instead of game projects) was riddled with exceptions and needlessly convoluted code.

Instead, I link to the general "explain myself" page on my _personal website_. All my other websites now link to _that one page_.

Any information about how to use the website is provided in snippets _on the pages themselves_. For example,

* I used to have a piece of writing (on a special `boardgames` page) explaining how the website's folder structure worked, what print-n-play games actually were, etcetera.
* It's much more effective to just have a slight remark/tooltip/label below the "Download" button that says: _Leads to Google Drive. Material in Files folder, Rulebook in Rules folder._

With good naming and simple remarks here and there, the website explains itself. And it does so in a better and more immediate way. Any further explanation can be in that standard "credits" section at the end of every main section.

Yes, we lose some things here. I had a few jokes in there. I could link to some pages/accounts I really only use for (video) games, which is why they're not linked anywhere else.

But these are minor things. I've been closing old social media accounts anyway, simplifying all that too and bringing it all in one place.

I guess ... I guess I've had my 5(+) year period of experimenting, building stuff, learning, and now I'm applying the lessons learned to make stuff more professional.

When you're young it feels like _every_ project you do is the best and most important thing ever. And so you want to give it a _unique page_ with _unique styling_. You want the project to do one unique and experimental thing, because, well, you've been working on it for _weeks_ and it's going to be _great_ because of that!

As you get older, you see that it's not about all the flashy superficial stuff. It's about the content, the thing itself. And that you'll make lots of big things, but also lots of small things. That you'll make really good games and really mediocre games. It's much better to focus on just making the thing instead of adding all that fluff around it trying to make more out of it.

{{% remark %}}
I am reminded of a remark from my mother some ~4 years ago. I had designed a small extra thing based on those lessons learned, and she immediately remarked "Yes! Clean, professional, simple." And I was like: "so ... my other stuff wasn't?" And she said: "You tend to have very busy designs, lots of colors, which is unique and you clearly like it. But this looks more professional."

Before this moment, I thought that little design was too empty. In fact, I showed her an "in-progress" version, fully intending to add some extra experimental stuff. But upon showing it to my mother, she almost sighed in relief that it wasn't yet another convoluted design by me :p
{{% /remark %}}

### Rulebooks

For the most part, this just slots into the rest of the system. Rules were _already_ a separate page. Now you simply get a dedicated button to go there. Rules were written in Markdown files too, and a simple framework I wrote then _converted_ those rules into interactive rules. (You can enlarge images, request an example turn, fold/unfold sections, etcetera.)

However, I wanted to improve the code and look of these too.

The design of all these rules just ... isn't great. It's fine. It's okay. But I never updated it again after the first experimental attempt at "interactive rules" years ago, and I should have.

The same was true for the code. It requires my website to already convert my Markdown to the right formats/names, and then simply grabs that and transforms it further. It was messy and hyperspecific for this use case.

Instead, like the game generation, I wanted it to be standalone. I wanted it to create rules from _whatever content you put in_, dynamically on the page itself, in a much simpler and better layout. 

One that also translates better to printing that page as a PDF rulebook! Now you can get pretty wonky PDFs out of it, with empty pages for no reason for example, because the styling is wonky too. 

And so I did.

* The rulebook styling just uses the same basic modules as the rest of the website. Simple colors, simple boxes, simple fonts.
  * Like before, there's **main content** (the rules) and **sidebar content** (remarks, example images, etc).
  * Because the rulebooks aren't as "controlled" (you can write _any_ combination of headings, paragraphs, remarks, etcetera) the basic styling can lead to ugly situations in some cases, especially when trying to print it on a fixed size paper. I decided to accept this.
* I completely rewrote the code for making it interactive and printable, using much cleaner practices and just reading whatever is on the page already.
* The biggest change was that it now simply looks for _headers_. I don't need to put stuff into complicated `settings-section` blocks anymore, because it just assumes every heading starts a new section. Which is, you know, the whole point of headings. Ugh, why was old me so stupid?
  * I realized my old system is even _more_ stupid as I made this change. Because everything was inside `settings-section` ... there were no different headings. Everything was just "a heading for a rules block", and I let the system figure out the ordering.
  * This meant I couldn't do a standard find-and-replace but had to MANUALLY put in the right heading levels (`h2`, `h3`, ...) for each existing rulebook. Yeah, not great.
* As for standalone usage (not on the website), I had to include someone else's library for converting Markdown text into HTML. I don't like dependencies and writing translation layers between my stuff and someone else's stuff I understand even less, but this was both necessary and not a big deal. In the end, it's literally two lines of code to include the library and call it with the right string.
  * Also, I enhanced that Markdown syntax with a few things I often need, such as remarks.
  * This is a very basic system that just checks for some custom identifier I invented (like `{{ remark }}` `{{/ remark }}`) and replaces that with some HTML nodes and CSS classes to style this the right way.

It didn't need to be anything complicated. We have great design software for rulebooks that need more complicated layouts. For my online store, for example, I created over 50% of the game's rulebooks like that, because it was simply faster and looked better than using my own framework. (And because those games are _not_ on the website, so they don't need to be able to represent the rules in web code.)

Oh, and, I **tried to add page numbers**! The only way to add page numbers reliably (without users having to find a setting for it or do it themselves) is through _Paged.js_. It's an amazing "polyfill" that gives you all the features for Page and Print that CSS can support, even if browser lag behind in actually supporting them. With that library enabled, adding correct and well-placed page numbers is just a few lines of CSS code.

The problem, though, was that it completely broke on my current setup. Because of the hierarchy of rulebooks (top-level section > h2 section > h3 section > etc), it reaaally struggled to figure it out 90% of the time. Why do we need that hierarchy? To get proper indexing (you can say "see section 3.2.1"), to allow fold/unfold, to allow automatically pushing subsections more inward to indicate _they are a subsection_, etcetera. So there are good reasons and I wanted to keep that.

But ... if the rules are to be printed, we don't care about interactivity or responsiveness.

So I could rewrite my entire sectioning code to also allow outputting the rules "flat". That is, all the elements are just children of `document.body`, with no subchildren. After doing that, Paged.js understood! It created more sensible and correct outputs than the default print functionality, and of course it added page numbers.

The only downside is that this requires bundling that Paged library too. As such, if it can't find the library, it will just fall back on the default printing, which is _fine_. It just lacks _page numbers_ :/

Honestly, the hardest part here was finding a way to keep it simple. To have rulebooks look good and read well, while allowing good flexibility in the input, image sizes, etcetera. All the time I hesitated when ripping out/simplifying old functionality because I could find one game that _needed_ it. But in the end, I _did_ rip out most of it and only supported one clean basic syntax. I just accepted that several rulebooks now look a bit "odd" because the images for them are weird sizes :p

Finally, my **interactive examples** were a big issue. They require loading assets, which you're not allowed to do willy-nilly if the file is loaded locally. (As in, just opened in the browser with double-click, not hosted/visited on a server.) The only way around that is to _ask_ people to upload the files first, because then the browser knows it can trust it. But that's weird. Now I needed an extra section in every rulebook for "upload assets here if you want examples to work!" 

I found a somewhat clean way, which only shows this box _if you're actually local_, and it places the box in the toolbar at the top. Which, you know, is already showing other tools anyway. But still ... not great.

### Something About Devils And Details

I noticed that it was hard to find my website under certain search terms. For example, I don't use the word "printable games" _at all_ on the entire website. As such, when designing the phrasing/wording on the new website, I made sure to get that right.

I gave the home page a custom design. As the main entrypoint for new people I always want it to jump out a bit more, and I already had some images for that anyway.

Some older games ignored my naming convention, or had missing files, or weren't even included in the last few updates, so I made sure to update them _now_. Although I had to leave out the _generator_ on certain games because it had simply broken. I can fix it later if I want, but for now you can only download the _final PDF files_. (So nothing is actually lost or unplayable.)

I discovered some "tools" I made several years ago. They were actually quite useful, and in one case pretty much _necessary_ for a hybrid game, so I wanted to keep them around. But it was hard to find a good place and design for them now. I ended up making an exception for them---a "tools" page template---and simply changing some parts so they could take over the styling of the entire website.

There's much more, but I can't remember it now. I think I got most of it.

### Where Does This Leave Us?

To give an idea of the magnitude of the changes, let's compare before and after.

* **SHORTCODES:** These are snippets I can use inside a file to do something beyond what Markdown supports, such as an `embed-video` shortcode I wrote myself to embed youtube videos. The total number of them went from **40** to **10**, and the new ones are coded much more cleanly and categorized into folders.
* **PARTIALS:** These are similar to shortcodes, but not for the per-project Markdown. They, instead, represent the template for the _whole website_. For example, there's a `pagination.html` included below every overview page by default that gives buttons to go to the next/prev page. The total number of them went from **35** to **25**. And, again, the new ones are much more modular, with clean code and reusability. (That is, I could've reduced it to about 10, but that would have been inefficient and lead to duplicate code across several files.)
* **STYLESHEETS**: We went from **26** to **1**. Granted, the previous system had very tiny `.scss` files which were then _combined_ into a single final file. Still, the stylesheet for the new website is 20x smaller than it was before, while the website looks _more_ consistent and polished because of it.
  * Also, _every_ project on the website had its own custom stylesheet. Most of them "merely" used it to set their custom fonts, but many also used it for some custom background color and other custom decoration. This meant a whopping **105** of them.
  * Now, only **9** projects remain that actually need that custom styling because they do something special. (Most of them simply _are_ a game, instead of merely a generator/overview/rulebook, so we need that custom stylesheet for the actual game interface.)
* **(JAVASCRIPT) CODE**: I don't have statistics for this one, because it was too much to track. Basically every game reached deep into my `pq-games` library for at least 20 import statements. All of that could now be reduced to _one_ import statement per game, that simply grabbed what it needed from the "top level" of my library. If I had to guess, the reduction of complexity/import statements/spaghetti code here was **at least 1000x** :p
  * The rulebook wasn't even integrated like that yet. The code for it was so old that it was still included as a separate file, and my rulebook code had to wait for it to load. Now, any custom rulebooks can just import some things from _that_ library and we get a single nice bundle at the end.
  * The number of _files_ wasn't reduced, as I already established some good conventions for that years ago. Each JS file was already self-contained and doing one thing, with a sensible name and purpose.

Unfortunately, I forgot to time how quickly it built (both on my device and on the server) before and now. Eyeballing it I'd say it became slightly _slower_, actually. But that's probably because the bundler with Hugo still has a weird bug where it often bundles _everything_ instead of only the code it needed for a game. That's fine, though. A massive website that still builds in less than 30 seconds.

Most of all, the website now actually looks clean and professional. Consistent. Showing off the content instead of how many colors and fonts I can fit on one page ;)

And behind the scenes it's consistent too. Everything has the same simple naming conventions, same small bit of frontmatter, using the exact same frameworks (`pq-games` and `pq-rulebook`).

When this article launches, I'll still have loads of games "turned off" because I didn't find the time to check if they're 100% correct again. I merely rewrote the code to be identical in function, but fit in new structure/system and not make the website crash when trying to build. Over time, as all games and all parts are tested and done, those things will all open up again. 

{{% remark %}}
My subgoal at "launch" was: entire website redesigned visually, and the download files + rulebook working again for all games.
{{% /remark %}}

As such, I'll probably be running into small bugs for a year because of this massive rewrite. I'll probably realize only six months from now that one of the games completely broke in some unexpected way. But that's okay---every game has pre-generated files to download while the generator isn't working. In fact, most people don't care at all about the generator/interactive rulebook and have probably never seen/used it. So I'm not in a hurry to make this 100% perfect, especially not for old games.

Anyway, I hope this was worth reading and worth doing. Pandaqi is certainly much better off now, and I hope it will be for a while. It's a great marketing tool for the online store, yes, but it's also simply better on its own. Easier to navigate, easier to find stuff, more reliable, easier to _update_ in case something is broken or I get feedback. In a way, I felt 5 years of experimentation and doing stuff culminate in this update that could be summarized as "keep it simple stupid".

Until the next devlog/update,

Pandaqi