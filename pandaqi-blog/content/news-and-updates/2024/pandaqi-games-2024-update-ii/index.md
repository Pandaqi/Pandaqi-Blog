---
title: "Pandaqi Games: 2024 Update II"
date: 2024-06-03
emoji: "🎮"
---

This update to the Pandaqi Games website is much smaller than usual, but still very important. That's why I wanted to write a short article about the problem, the changes and why I made them.

## What's the problem?

I've been making games for a while now, at a pretty rapid pace. They all live on the [Pandaqi Studio](https://pandaqi.com) website, and most boardgames generate their own material or have interactive components that _also_ live there of course.

This is _a lot_. Over time, the content folder for the website has grown unwieldy.

Every project has its own folder with its name (spaces replaced by dashes). So if you want to check out the game called Sixpack, for example, you just go to `https://pandaqi.com/sixpack/`.

Now I have nearly 100 games, which means 100 folders at the root level of the website.

Even worse, more and more of these games are starting to be connected. I have a good idea and find 3 different ways to execute it: that's one project with 3 tightly intertwined games. 

The first few times this happened, I simply gave them a long name: `<project name>` + `<game name>`. This didn't solve the folders issue, however, and just made the names incredibly long. 

{{% example %}}
One upcoming set of games has folders like `nine-lives-tricksy-kittens` and `nine-lives-math-meows`. One game already released has the folder `slipper-slopes-trippy-touches`. It's just a lot of text.
{{% /example %}}

Or, maybe I invent a new genre of games and consistently get new ideas for that. This means I don't know the size of this project yet and I usually plan to update it with 1 or 2 new games each year.

I put all of these issues on the backburner for a while, until I just couldn't ignore them anymore.

## How do we solve it?

A few months ago, when I started a new "project" of multiple games, I was quite sure how many there would be and that they'd all be finished. (I was right, by the way.) So ... I decided to try something else.

* At the root level, just one folder for the entire project. It has its own page and styling as usual, which is like a "master page" for the project that links to the individual games.
* Below that is a folder containing the individual games.

So, instead of `nine-lives-tricksy-kittens`, it would just be `nine-lives/play/tricksy-kittens/`.

At first, I tried `nine-lives/tricksy-kittens/`, but this meant all the individual games were at the root level of this subfolder. If a project would end up having 5+ games, this would just move the mess instead of solve it. So yes, all the individual games are in a subfolder with a sensible short name like `play`.

After rewriting some template code in the website, I could do this and it would automatically find + build all related code/assets for games again.

This turned out to be a _great_ idea!

It cleaned up the website's structure immensely. Everything was tucked away neatly, I could find things easily (even with multiple related games), I could share code and assets more easily (which is the benefit of related games).

The positives outweighed the negatives for me.

* Yes, the url isn't just "the game name" anymore (in all cases). But pretty much nobody types URLs to my games directly. And if they become this unwieldy, this isn't a feature anyway.
* Yes, this requires a few more "boilerplate" folders and files. But that's a tiny cost compared to the fact we need much _fewer_ files once the project gets multiple games, because they share a lot of structure.

{{% remark %}}
This change also made building the website in Hugo quite a bit faster, though I'm not sure why that would be exactly.
{{% /remark %}}

I briefly researched giving pages _multiple_ URLs, so I could also keep the original consistent scheme. But this quickly turned out to be practically impossible and also _unwanted_. It messes up machines, it messes up humans.

## Taking this further

With this knowledge, I looked at all official and unofficial series of games I had.

What do I mean by that?
* Official = I knew this would be multiple related games beforehand, and I gave it a fitting name
* Unofficial = the games just kind of grew into a series and now I feel the need to name it

This showed me that many of my games could be neatly categorized into a few bigger projects. Sure, a large chunk of them are completely unique and standalone, and they will stay that way.

But let's take a look at those "Nine Lives" games (which will release publicly soon). They are the second game idea I made that revolves around _one specific number_, after Sixpack. In my ideas folder, there are about 6 more ideas, all using a different number.

That's a series of related games! I can group them under a common name, create a master page with explanation, and it's all nicely structured.

Similarly, when I made "Kingseat" and "Finger Food", I started the idea of a "queuing game". Games you could play while waiting for something, while standing up, etcetera. So far, however, I just mentioned this on the game page and that was it.

But this is a series of related games! I can put them all under the banner "Waitless Game", with a master page that explains what they are and links to them. 

{{% remark %}}
After a few months of using the awkward term "queueing game", I found that much better name in "waitless game".
{{% /remark %}}

After creating the necessary folders and moving stuff around, the content folder of Pandaqi is now much better organized. And if you liked one game, you can more easily find the related games sharing theme/mechanic/ideas.

So that's what I did before the last update.

## The unexpected way in which this helps

As mentioned, each of these projects might have 10+ ideas inside them. Only 1 or 2 have been made so far, but the others are simple and strong, and I _want_ to make them.

So far, however, working with such large projects (5 or 10 _entire games_!) was overwhelming. I had to stop myself after a few games, pace myself, to prevent burnout on this singular game mechanic.

Now, having grouped these games, this ideal pacing automatically presented itself!

* Each major sequence of games simply receives one **update** each year. (On a fixed day, so for example: "Waitless Games always on 26th of Feb") One or two more games inside, some fixes to the old ones if needed.
* And this is planned in advance, spread throughout the year.

I now have clear deadlines for advancing each project, without risk of burnout _or_ forgetting/dropping it altogether.

I still have enough open slots for unique, standalone board games. For just making whatever I feel like in that moment. But planning the major ongoing projects in this way helps _so much_ with making decisions and clarity.

{{% remark %}}
At some point, each project will obviously finish. Once the final idea is made, once I've fixed every issue that popped up over a long period. I have complete confidence that by then my brain will have invented some other set of games to take its place :p
{{% /remark %}}

## Any other updates?

As usual, slight fixes and additions to all the code and frameworks that run the entire website. Mostly quality of life improvements, either for the user or for me.

Also as usual, lots of games added since the last update.

I've finally finished my PQ Words library. (It doesn't have _all words_, but it has pretty much any word most people would know, neatly categorized by type and difficulty. Several of my games already use it.)

I've also finally created a definitive categorization for the website. Each game is tagged in a meaningful way and you can click these tags to search for related games. As I use this more, and create more games, this will only become _more_ useful for searching and finding the right game for you.

Otherwise, any major updates I've planned have been pushed to next year. I am busy writing my Wildebyte books (and other stories) and feel I've already polished the Pandaqi website enough for this year.

When I say major updates, you should think about ...
* A better homepage (that actually looks different from other games overview pages on Pandaqi)
* Trying a few completely different visual styles
* Completely revamping my oldest games (which now often feel _very_ mediocre) or removing them if that turns out to be impossible. 
  * Revamping might mean changing the contents of the game, or simply updating its code/page to my modern standards and systems. The second one is a lot of work but easy to do, the first one is harder and more risky.

For now, my own system for generating material on the fly is "fast enough". But I'm clearly losing performance here and there, and the largest games might make the browser give a warning like "this page is not responding, kill it?" 

My oldest One Paper Games still use the Phaser framework, simply because it draws the boards 10x faster than my own. But I want to stop using Phaser, because it doesn't support a lot of things that _my_ framework does support (and I need) and I want to get rid of this last remaining external dependency. 

We'll see what I do with that.

Anyway, this was a short update about structural (and URL) changes to how projects are sorted and labeled on Pandaqi Studio.

Until the next time, keep playing,

Pandaqi