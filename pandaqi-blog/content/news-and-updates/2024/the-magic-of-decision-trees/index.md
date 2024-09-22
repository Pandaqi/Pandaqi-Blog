---
title: 'The Magic of Decision Trees'
date: 2025-06-06 10:26:32
tags: ["update"]
emoji: "🌲"
---

A few years ago, I had a sudden insight. Whenever I taught people a new game, I'd notice that they did _understand_ the rules, but that they struggled to actually _apply_ them.

On a surface level, they understood that you can "play a card" on your turn, or that you can "place your worker there to get 2 wood". But knowing the actual things you can do, often didn't make it any easier to actually play the game. Players often know what they _want_, but they're not familiar enough with the rules to know how to _get it_.

And so I said: "Well, I know _one_ tool that helps to make decisions: a **decision tree**!"

The next time we played a somewhat heavy game (this was Wingspan), I decided to quickly sketch a decision tree for the main actions of the game. I created an image for it back then, but it's in Dutch, so I'll just present it as text for now:

* What do you want?
* Get birds => take this action
* Play birds => 
  * Do you have enough food?
  * No => take this action
  * Yes =>
    * Do you have enough eggs?
    * Yes => take this action
    * No => take this other action.

Very simple, very basic.

But you can already guess the results: people loved it. There it was, a single paper with a decision tree scribbled on it. And new players could ...

* Look at it, whenever they wanted.
* See the path needed to accomplish the thing they wanted
* And know how to quickly do a somewhat strategic turn in this brand-new game.
* Without feeling belittled or overwhelmed.

A few weeks later, I published a [Dutch review of Wingspan](https://tiamopastoor.com/blog/2021/2021-04-06-spelrecensie-wingspan-999-games/) on my personal blog. It has since moved to a new domain and is English now, but I'm afraid the old reviews are still entirely Dutch.

What's important is that I included an image of this decision tree.

That old blog was hosted by WordPress, which automatically collects some statistics for me. When I moved that old blog to a new system, I caught a glimpse of those stats ... and saw that this image of a decision tree was clicked/downloaded the _most times out of all images on my blog_.

People apparently saw how useful it was and at least wanted to investigate it.

A simple decision tree will remove 10 minutes of explanation, while subtly holding the hand of new players for the entire first game.

If you ask me, all games should come with a decision tree. And if they don't, it's worthwhile (if you're the explainer/read the rules) to quickly _create_ one yourself. Draw it on a piece of paper, put it in the box.

## Why this article?

For years I merely used this myself whenever I thought it was needed. (Especially when teaching big games, or playing with less experienced gamers.) 

Now that I've developed many games myself, however, and have many more planned for release, I wanted to consistently add these to my games. Give the right example! Show the world the power of decision trees!

As such, this article is an announcement that I **developed a simple library to quickly create decision trees!**

I didn't want to start from scratch each time. I didn't want to end up with lots of hardcoded _images_, which means any mistake/update/whatever would require lots of work.

I have the knowledge to _code_ these things and automatically draw the latest version on my website.

As such, I wrote a system that ...

* Reads a plain text file with the different decisions and how they're connected.
* And then _visualizes_ it by drawing it (as neatly as it can) onto an image.
* Which you can view in the rules / on my website, or download / print for offline use.

The syntax is also very simple. You start a new node and name it, then list all the options below it, and optionally define styles. I decided to use "=>" arrows to clearly signal when a connection to a new node is defined.

{{< highlight >}}
Node = some_label
Text = What do you want?
Paths =
* Get birds => label_of_new_node
* Play birds => label_of_other_new_node
Style =
* Color = #FFAAAA
{{< /highlight >}}

My code reads this, then parses it into JavaScript objects (with all the properties and stuff you wanted) that create---not surprisingly---a tree. Once done, I give the whole tree to a Visualizer function that draws it. For every layer, it calculates how much space it needs, then offsets everything to make sure it's centered and nothing overlaps.

It's barebones. It can't do an awful lot. But that's alright, because my games are generally simple, and if a decision tree needs too many bells and whistles it actually works against its own purpose.

The result are images like these:

@TODO: IMAGE

From now on, you can expect many games of mine to include this in an easy-to-see location. Because this is geared towards people new to the game and people wanting to learn it, not towards those who've already read the rules or already have enough experience to just jump into a new game.

I don't write many game reviews these days, but when I do, I'll try to include such a decision tree as well. 

{{% remark %}}
I'm more a _producer_ than a _consumer_, so I spend 95% of my time designing games and 5% playing them. So even if I play some new game and have something interesting to say, I've probably only played it _once_, and that's not enough data to go on.
{{% /remark %}}

## Another advantage of decision trees

Besides being a great help when teaching / learning, they're also a great help when _developing_.

If I can't put the core of my game into some decision tree, then the core is probably too complicated or too muddy.

If I find that I have gaps, I know I need to work on that part of the rules before continuing with polish or art.

If the text doesn't fit in the tree, I know I need to find a more succinct phrasing for the rules.

Merely thinking about "what would a decision tree look like for this new game idea?", refines the idea. It shows potential problems and potential solutions.

## But you're dumbing down games!

This is the main argument "against" practices like these. Handing new players an easy chart for what they can do would ...

* Remove the challenge!
* Make it less fun, because they're just following the tree like a robot!
* Be unfair! Everybody should suffer to learn complicated games like I did! Muh!
* Be treating your players as if they were toddlers! They're adults, they can understand more complicated rules!

As expected, these are no valid arguments.

* A good game is challenging because its rules are well-designed, not because its _rules are challenging to even understand_. A good game is still fun and engaging on your 50th play, when it barely has any secrets left. Yes, a decision tree removes a challenge, namely the boring frustrating part of understanding a new game.
* It's called a decision tree. Whatever path you take, you literally have to be the one making 3 or 4 tough decisions. Every single time you use it. It's really not that different from what actually goes on inside your head when playing a game.
* As stated, faster and easier introductions to games are always better. Rules don't _have_ to be hard. Games don't _have_ to be overwhelming the first time you play.
* As if toddlers can read a decision tree :p A little more seriously, a decision tree hands _all agency and freedom_ to the one using it. You're not restricting anything, or commanding, or telling people they CAN'T do something. It's just a tool. And if the goal of a game was to build a house, I'd rather give players the best possible tools, than expect them to imagine a hammer in their head and figure it out.

Nobody has ever complained about these decision trees. Don't want to use it? Just ... don't use it.

We're not changing the actual game. All the rules, complexity, challenge, everything is still there. Nothing is actually simplified or dumbed down.

Decision trees are merely an add-on to the rulebook that have proven to be _so valuable_ that I ended up creating an entire system to automatically generate them.

## What makes a good decision tree?

All games have a "game engine". The simple loop at its core, the beating heart, the _fun decisions_ you must take over and over.

A decision tree should merely show the path through this game engine.

* It should only focus on your _major goals_ and _major (recurring) actions_.
* It should only have a few layers, and a few decisions _per layer_.
  * I have a general rule that 4 or more possible actions to take on your turn is _too much_. 
  * Similarly, a game where a round has 4 or more phases is probably _too much_.
  * As such, a decision tree should probably have at most 3 steps, with 3 options to choose from each time.
* It's fine if all this means removing some details, or exceptions, or tiny extra mechanisms in your game. A small drawing of a decision tree will never contain _all_ the rules for a game, obviously.

As soon as _understanding_ the decision tree becomes hard, it's too big. As soon as _traversing through it_ takes too long, it's too big.

If you find that you've designed a game that you simply _cannot_ reduce to this simple core ... then I would honestly recommend streamlining the game first (99% of the time). 

Even if you have 6 really cool actions, it's almost always better to find a way to merge the actions and leave only 3 options.

Even if you have 6 very logical and balanced phases to a round, it's almost always better to think out of the box and find ways to get the same gameplay into only 2 or 3 phases.

Because no human can learn 5(+) new options (which might have many more rules attached), remember them, and immediately know which one to pick just off the top of their head. Even a decision tree won't help much, because the number of options is still too large. There's a reason you never see flow charts where every node has 5 different arrows leaving it :p

{{% remark %}}
I don't know where I got this from, but I've followed this principle for years: "Every good game is just a series of interesting questions asking you if you want A or B, over and over."
{{% /remark %}}

Unfortunately, as I write this article, I don't have many finished decision trees to show yet! But you can check out my latest games (and most of my future games) to see all these ideas in action.

## Conclusion

Well, that was the update / explanation. Decision trees really help introduce people more easily to new games, regardless of whether they're heavy or lightweight games.

I encourage designers to use it as a tool while designing, and include it in the rulebook.

I encourage "rules explainers" to sketch a decision tree on a paper to help new players for their whole first game.

And I will try to show their usefulness by including them with as many of my games (and game reviews) as I can. 

(And I'll probably rewrite my system many times in the coming months, as I discover the many mistakes I made in my code. Because I had no clue how to approach drawing a flow chart from code.)

That's it, keep playing,

Pandaqi