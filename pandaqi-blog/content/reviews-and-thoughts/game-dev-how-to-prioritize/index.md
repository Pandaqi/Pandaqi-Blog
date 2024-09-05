---
title: "Game Dev: How to prioritize?"
tags: ["thoughts"]
date: 2024-08-21
emoji: "💬"
---

This article is another one that came out of my recent "summer of game jams". I participated in 10 game jams, which was indeed stressful and a lot of work, but also taught me a lot.

One major aspect of a game jam, of course, is the time restriction. You only have 2 or 3 days to invent some idea (related to a theme) and completely build and ship it. In fact, the rare game jam that lasts 5 or 7 days felt like an undeserved _luxury_ sometimes ;)

I've made enough games the past 10+ years to know how long every step will take, roughly speaking. This means that I had no trouble almost perfectly lining up my to-do list with the time I had left. All my games were done a few hours before the deadline, as planned, and none had any bugs or missing parts or whatever. (All of this while leaving enough time for exercise, sleep, going to the beach, etcetera.) 

That's nice, I recognize that.

But doing something in the time you planned for it ... does not mean you actually spent the right _amount of time_ on the _right things_.

After doing all these game jams, I realized I was horrible at prioritizing the right things. I'd lose several hours on a few bugs that were, in hindsight, only tiny hindrances. Then I'd only spent ten minutes on coding the core gameplay loop, which meant the shoddy original code gave me some headaches later. 

I might've created some very nice marketing images and graphics for the game in one evening ... while only spending an hour in the afternoon on the actual gameplay, making the game "look good but not really be that fun".

In the end, this made games very lopsided in certain aspects. I was scrambling to find solutions to pretty core questions that plagued the game, while less relevant details such as a particle effect for 1 out of 10 powerups was already done.

I experimented with planning, trying some new approaches for every game. I looked up what others were doing, perhaps digging into their source code (if they decided to share that on GitHub).

And I learned the following one-liner.

> **Spend most of your time on the things the player will be repeating the most.**

That's it. That's the article. Go forth and make better games! ;)

Just kidding, let's look at some practical examples of this.

## Some practical examples

### A puzzle game

Say you make a puzzle game. There's a player character that moves on a grid, and you need to collect X or reach the finish in Y moves.

What is the player going to repeat most often? **Trying a move.** (And perhaps undoing it, if you support that, which I highly recommend by the way.)

As such, you should probably spend more time (than you think) on making this single movement as rewarding and flawless as possible. Give it a juicy animation, great (and varied) sound effects, make it exactly as long as the player would want, make the code for it really solid and easy to work with.

The same for the _undo_. You often want this to be much faster than the _do_. You want it to give clear feedback about _how much_ it has undone, otherwise the player might go back too far or make other annoying mistakes.

Spend most of your time here. Because it's the thing the player will actually be doing the most.

Anything else can receive lower priority. 

* Special grid cells with special actions? Less important. (The player will only use each special cell a fraction of the time.)
* Different backgrounds for the different worlds? Less important. (If there are multiple worlds, the player will by necessity not repeat the same background 100% of the time.)
* The game over (win/lose) screen? Less important. (For every game over screen the player sees, they'll have done 5--20 moves first. So it's less repetitive than movement.)

### A tower defense game

Two of my game jam games were similar to tower defense/survival games. Again, I made the mistake or prioritizing the wrong thing.

I'd finished images of all enemies before I'd even tweaked and finetuned their exact stats. As a result, with both games I was tweaking numbers and running around asking _someone_ to playtest it quickly ... only hours before the deadline. Because the game looked great and was bug-free, but it was actually way too easy to play because I hadn't perfected the numbers.

I sometimes had animations or images for quite rare situations. (Such as an enemy that only appeared in the final waves and moved by jumping instead of walking.) At the same time, the thing the player repeated all game---placing defenses and killing enemies---had barely been tested and finetuned.

Not great.

I've already given away the answer here, but let's ask it anyway: what will the player repeat most often in such games?

* See enemies
* Place defenses

As such, make both these things as perfect, and rewarding, and finetuned as possible. Don't start on graphics, or later stages, or a main menu, until it feels _great_ to plonk down a defense and see an enemy die by its hands. Because that's what you will do, thousands of times, as you play the game for a few minutes.

(Seriously, one of my games tracked stats on how many ghosts you killed, displaying them once you died. To the surprise of both me and my playtester, ~7 minutes of gameplay already meant hundreds of ghosts had died :p That's how often this action repeats in a wave/tower defense survival game. So prioritize that repetitive action over all else.)

### A platformer

Hopefully you immediately said the answer to this one. What will the player repeat the most? **Move, jump, land.**

When I was younger, I could honestly get quite frustrated when I saw a devlog of someone making a platformer game. They'd sometimes spend _multiple videos_ just perfecting the jump, adding particles for it, tweaking the movement code _again_. I was like: "Make the actual game! Not a jumping/walking simulator!"

I realize now that they were on the right track. They knew the soul of a platformer was that simple action: move, jump, land. That's all the player would be doing for thousands of repetitive cycles. 

And so the very best way to spend your development time, if you had to prioritize (and most of us do, lacking infinite time and money of course), is to put it into _that_ mechanic.

Perfect the jump height, hang time, gravity, friction, everything. Add nice frames/animations, some dust particles upon landing. Add some tiny rules for corner cases, such as the famous "coyote time". (Allow the player to still jump for a few frames after their feet have left the ground. Even if not realistic, this feels better than missing your jump by a single pixel and just falling to your death.)

If I were to make a platformer for a game jam, I'd probably spend the entire first day on this alone. It feels wacky. It probably means I won't have time for lots of other content or polishing.

But that's fine, because that missing sound effect isn't going to annoy the player _every single second of the game_. Only at that single time it might have played, if the player even notices at all. No, the thing that will annoy them is that the jumps they'll be doing every second feel floaty, bad, imprecise, or whatever.

## Conclusion

It's quite a simple and intuitive principle. Still, I wanted to write this article about it to help others and burn it into my own brain. It's such a simple thing---spend most dev time on the thing the player will also spend the most time with---yet we forget all the time. Or, at least, I do.

I think this partially has to do with our tendency to focus on "content". I feel like, in modern times, things have to have _more and more content_. Just making a simple 5 minute enjoyable experience isn't enough---no, it needs 50 enemies, and 25 maps, and 20 spells, all in an effort to pretend the game is great and the player will get 500 hours of playtime from it. In reality, the focus on content means the actual game is shit, and the player won't even see 1% of it before they quit.

It reminds me of this thing that the guy from GMTK said in one of his "Developing" videos. He noticed that he kept adding content to the game, and it just forced him to extend deadlines all the time, and it never made him actually feel good about the game. Then he said: **"I wasn't making the game better, just longer."**

That's a great way to look at it. Prioritize making the game _better_, not _longer_. Focus your dev time on making the actions the player will _certainly_ repeat all the time---the core of the game loop---as great as possible. Instead of adding more and more extra content, which amounts to rare actions that the player will only see or experience a fraction of the time.

I also think asking this question is just a very good exercise. Whenever you have a new idea, ask yourself this first: "In my idea, which action will the player repeat most often? What thing will the player see/hear most often?"

If you _can't_ pinpoint that, it's a good clue that you don't really have a game idea at all. The specific second-to-second gameplay is too vague, the objective too vague, to answer this simple question of what the player will _actually be doing_.

If you _can_ answer it, now you have a clear vision and guideline for the development process of the game. Focus 50% of your time on that repetitive core action. Use the other 50% for eeeeverything else, accepting they're of lesser importance and can be rushed/missing/badly executed.

A player will enjoy your game and keep coming back for that satisfying core, doing it over and over. The rest is of much lesser importance, and your development schedule should probably reflect that.

Those were my thoughts, keep playing,

Pandaqi



