---
title: "How To Actually Make Games"
tags: ["tutorial"]
date: 2023-01-01
---

Okay, so you want to learn how to make games? Or how to make them *better*?

Maybe you've just started, maybe you've been trying for a while but got stuck, it doesn't matter -- this guide is for anyone.

You see, there's a lot of advice out there. Some of it is good, some of it is downright bad, other advice is completely subjective or circumstantial. I've been trying to get better at making games for 15 years now, so believe me, I've seen it all.

And if you want the summarized version of this article, that's the main takeaway: don't listen to any advice. Not because you're "special". Not because you're already that good or "above" the advice. Simply because most advice is wrong and the only way you'll even remember the "lessons" is by *learning them yourself*.

In this short article I want to lay out how I would structure a "game development course", if I was ever tasked with creating one. (At the end I'll explain why I haven't actually created one.)

If I had a student come up to me and ask "how do I become successful as a game developer?", what would I tell them to do? What advice would I give? And why?

Hopefully this saves you a lot of headaches and wasted time. Because I *did* waste that time.

## Who are you?

My name is **Pandaqi**. I'm no big developer by any means. But I've had some minor successes here and there, and published quite some cool games ... the past few years.

All the time before that, I made all mistakes imaginable, and there's basically no finished game from that period (nor something I would *want* to show the world). For the amount of time and work I put into it, almost **15 years of it**, the results until a year ago had been abysmal.

Usually, you only get advice from the big successful developers, which is of course riddled with *survivorship bias*. (They survived because they *didn't* do the things that made others fail. Which means they don't know about those mistakes and won't give you advice on them. Hence, it's often wiser to listen to the failures instead.)

## Step 0: Pick your tools, stick your tools

You can build games any way you like.

But for a beginner? This is what I'd recommend:

-   Pick a **Game Engine** that's as small as possible. Don't get swayed by the number of *features* something has. => I recommend **Godot**
-   Pick a **Text Editor** that helps project structure, debugging, code highlighting, and is generally just pleasant to look at => I recommend **Visual Studio Code**
-   Create your graphics using free **Vector Software**. (Even if you're very good at drawing stuff by hand, this will be needed and useful to learn.) => I recommend **Inkscape**
-   Create your music using free online sound effects and "beat makers" => I recommend **Audacity** for anything more advanced or custom.
-   Download **Fonts** from Google Fonts. (They are free and guaranteed to be readable, well-designed, etcetera.)

There's no need to spend money here. There's also no need to download hundreds of huge applications.

In fact, if possible, always try to stay as lean as possible. Software that boots *slowly* is one of the prime excuses people use to justify *not* working on their game development skills when they have the time. Similarly, software that's sluggish in general just slows down your productivity and motivation at all times.

And now the most important part: **stick to it.** Any tool that's (relatively) popular and has a long history of work is guaranteed to be *solid*. If you run into issues or roadblocks, it's most likely just something you need to learn your way around, and *not* an issue with the tool. It's *not* a reason to switch and try something else.

If I was giving a game development course, I would pick the tools (as well as I can), and I would forbid students from using anything else.

Additionally, I would tell students to not bother buying books on the software/programming language, or watching video tutorials, or whatever. You learn by *doing*, not by passively reading or watching.

So let's continue ...

## Step 1: Steal a simple idea

Go to the App Store (or Play Store) and find a popular "hypercasual" game.

Think of games like *Flappy Bird*, variations on *Pong*, games where you only have *one button* and are only supposed to do *one thing*. There are millions of them. (Precisely because they are easy to make *and* many people often make one as their "learning exercise".)

Steal the idea, build it yourself.

## Step 2: Don't start programming, start problem solving

Programming is merely how you communicate with the computer. Once you've written code (in a specific language) several times, you'll get the gist of it and that part is done.

No, designing a functioning game is all about *problem solving*. To become good at making games, you need to become a master at problem solving.

And to solve problems, you first need to *clearly* and *concretely* define them. When you do so, you'll see that the *code* needed magically reveals itself as just a few obvious lines of code.

### An Example (Pong)

Let's take *Pong*. What do we need?

-   A ball that moves across the screen and bounces off paddles
-   Paddles that move up/down
-   Something to keep track of points

(For simplicity, I've left out the fact that the ball also bounces off walls, and any other rules Pong might have.)

Okay. But that's very vague, isn't it? "A ball that moves across the screen"? Let's specify the ball logic further.

Every frame ...

-   An image of a circle
-   Moves D pixels in its last known direction
-   If it hits a paddle (how do we check this?), reverse the direction (how?)
-   If it's off the screen (how do we check this?), give the correct player a point (how?)

Now let's answer those questions to specify it even further. You might go to Google and type "how to check if something hits something else in \<my game engine>?"

You'll quickly find some page answering with the code or steps needed for *collision checking*.

You might also type "how to move something in \<my game engine>?" Soon enough, it tells you to just *add the speed to its coordinates*.

In the same way, you'll learn how to reverse directions: just put a minus sign in front of them.

When is something off the screen? If its coordinates are larger or smaller than the size of the screen. So look up how to get the *size of the screen* (in your game engine). Then check if the ball's coordinates are inside that.

How do we know which player scored? If the ball goes off screen at the *right* side, player 1 scored. If the ball goes off screen at the *left* side, player 2 scored.

How do we know if we're at the left or right side? A quick search will reveal that 2D coordinate systems always start from top-left, and have an x-axis (horizontal) and a y-axis (vertical). So the left side is **(x\<0)** and it counts upwards toward the right, making the right side **(x \> screen width).**

Just by specifying more and more, by asking questions and answering them, our algorithm has become:

-   Take an image of a circle
-   Add the value "D" (its direction) to its position
-   If \<check for collision>
    -   D = -D
-   If \<x-position smaller than 0>
    -   Player 2 scored!
-   If \<x-position bigger than *screen width*\>
    -   Player 1 scored!

Guess what? You've basically already written the code. Just look up the specific keywords/syntax to use for your language, convert the plan above, and you're done.

### Conclusion

Whenever you're faced with a problem, break it down into smaller pieces. Even smaller. Even smaller. Ask questions and answer them, either by *thinking for a while*, *trying different options*, or just plain *Googling for it*.

Only once you have a solid algorithm, convert it to code and add it to your game. But, once you're at this point, you'll notice this conversion takes only 2 minutes (even if you're very new to programming).

What most people don't realize, is that game development should be *away from the screen* at least 50% of the time. There's absolutely no need to sit behind a screen when you're trying to specify your problem and come up with an algorithm for it.

In fact, I have a notebook next to my laptop where I can quickly *sketch* ideas or problems, which is more powerful than anything.

Also, when you learn to work this way, it *doesn't matter which language you use*. You could learn 20 programming languages easily if you know *how to problem solve*.

## Step 3: Finish everything you start

I mean it. Finishing stuff is hard. But it's also the only important thing, as an unfinished game (that will never see the light of day) is basically worth nothing, as nobody will play it and you can't add it to your portfolio.

Additionally, finishing each project makes sure you get equal experience with *all parts of game development*. Not just programming, or design, or coming up with clever levels. But *all* the parts: graphics, audio, effects, animations, marketing, writing, etcetera.

Even if you picked the tiniest possible project, you'll probably have a point at which you think: "meh, this just isn't working, let's ditch it and start something new" You might even convince yourself to do so, as why would you spend days or weeks doing something you hate to finish a project you're not motivated for anymore?

But that's just the "shiny new idea"-syndrome. No, I don't advice *forcing* yourself to do all this work you don't want. If you decide that your first game project should be this huge, ambitious thing ... then I won't tell you that you *have* to finish that. Because you just won't.

Instead, if something is taking longer than your motivation can muster, **make it smaller.** Maybe you want to make a puzzle game with 100 levels. But after 20 of them, you feel your energy starting to wane. Then this is the golden advice: **finish the game, but simply with 20 levels.**

Don't leave it unfinished. Don't publish it "as-is" without *actually* polishing and finishing it. Don't tell yourself "I'll come back to it later".

You won't. And if you do, you will have *grown* too much during that period. The code will look bad and foreign. The ideas will look stale. You'll have to spend days just getting *back* into the project.

Finish everything you start. And if that's too hard, start *smaller* things. And if you feel motivation slipping, immediately switch to "finish and publish" mode with whatever you have at that time.

### An important prerequisite

Of course, this only works if you build your projects in an "always-playable" way.

Many developers like to build projects one *system* at a time. Things like sound effects, or animations, or the actual levels to play, come at *the very end*. They won't continue with the next system once the previous one is *completely* done and polished.

Don't do this. It means that, if you happen to lose faith in your project, it's completely *unplayable* and will take ages to make playable.

Instead, give all parts of the game equal love, right from the start. If possible, make sure the game is playable every time you save it and go to bed.

## Step 4: Give it your own twist

So far, you have ...

-   Stolen a very simple idea
-   Figured out the specific steps for tackling its issues
-   And built the game in such a way that it's playable and could be published right now

This is already **great!** Many people don't get this far.

But you're missing one step of the learning process. Completely copying something that's already invented, means you don't get to be very creative, and don't see many new challenges coming your way.

So invent *one twist* and add it to the game. Maybe ...

-   Each player controls *two* paddles
-   There are multiple balls
-   Balls move *curved* instead of in straight lines
-   The ball moves faster and faster, the longer a game goes on
-   The field shrinks, the longer a game goes on

It can be anything. Scale it according to what you think you can handle. Then put that twist into the game.

With that done, you've just made a project. Show it to the world. Back it up, close the project folder, and get ready to start your next project.

**Repeat steps 1-4 as quickly and as many times as possible.**

It's as simple as that, although actually *executing* it takes discipline. And I want to give some more advice on making the most of this cycle.

## The 80/20 rule

I have a tendency to be too ... let's say *innovative*. I constantly come up with ideas that are *nothing like what's been done before*, and I make it worse by trying to make it even *more* unique and special.

Why is this a problem? Shouldn't this be an amazing characteristic?

Well, for several reasons:

-   It's *hard* if 90% of your game consists of parts you have absolutely *no clue* and *no guidance* on how to figure out and implement.
-   There's a greatly increased *learning curve* (or "first threshold") for new players to try your game. Because it has loads of elements nobody has seen before, they'll most likely pass on it, or take longer to understand.
-   While you're not that experienced with developing games, you will *not* be able to make such ideas reach their full potential.

I've made many games that I worked on tirelessly, which I thought had the coolest concept ever ... but which flopped completely. I wasn't able to execute on the idea at that time, delivering a half-assed attempt. And the players that tried it, didn't really understand how to approach the game.

That's why I want to mention the **80/20 rule: in each project, try to make 80% something *familiar*, and (at most) 20% something *new*.**

When I say "familiar", I mean two things:

-   Either something you've already done before. (For example: you've already added powerups to that Pong clone of yours, making it much easier to add powerups to your next game.)
-   Or some established mechanic, or rule, or concept from the genre in which you work. (For example: in a platformer, holding the jump button longer means you jump higher.)

This makes it way more likely that you can actually *make* this idea of yours, and that it will *work* and be *understandable*. There's a reason "tropes" or "cliches" exist: they are proven to work really well, so you'd be stupid not to use them in your game.

Don't be scared to be cliché. Don't be scared to steal ideas and mechanics you see in the popular games left and right. In fact, I encourage it. I know what it's like to *not* do this, to waste years trying to be too unique and not getting anywhere. Don't be like me.

At the same time, making the other 20% something new will ensure you **keep learning and growing, challenging yourself.** At the same time, you'll notice this is *more than enough* to make a game stand out and be unique.

Most shooting games are 90% identical. Yet it's that 10% of unique gameplay, unique ideas, unique weapons, and so on that make them hugely popular and successful. (Instead of everyone just saying: "they're clearly just blatantly copying each other")

## People are stupid

I mean it. Everyone is stupid. Including me.

We think we're these *logical, intelligent, free-thinking creatures* ... but really, we're just animals with a slight upgrade. We're governed by emotions, psychological oddities, advertisements, etcetera.

Design your games for *people*, not some *idealized super-intelligent version of humans*.

If you think something is easy to understand, it's probably too hard for other players. Make it simpler. Make it more explicit. Give hints, and reminders, and fail-safes everywhere. Make your game foolproof.

Here's the thing: it's better to make a **boring game that everyone can enjoy for 5 minutes**, than a **super smart and big game that nobody understands.**

Err on the safe side. It's easier to *up* the difficult later on, than to *simplify* an idea at a later stage. It's easier to add more content later, if your base game proves successful, than scale back.

(Pong is a very simple game. Move a paddle up and down. Hit a ball that's moving very predictably. Boring, right? Yet most people will gladly play for a few minutes. And with simple twists -- such as adding multiple balls, changing field size, etcetera -- you can *increase* difficulty immensely.)

Another important side-effect of this is that **people are visual and social creatures.** It took me too long to learn this.

I'd spend hours crafting pretty images for my game ... but forgot to put, you know, screenshots on the game page.

I'd create *local multiplayer* games ... but without scores or player roles, meaning there was no real way to compare yourself to the rest.

When in doubt, learn how to make things prettier and more socially appealing. It's more important than becoming better at programming (or any other part of game design).

Don't spend a day adding more content to the game, spend a day adding a leaderboard and making sure it works great.

Don't spend a day fixing some obscure bug, spend a day making the first level of the game look way prettier.

If you're serious about this -- you want to make successful games, you want to earn income from it, you want to finish many impressive games -- this is the mindset you need.

Learn to understand people. How they play, *why* they play, what increases the fun. Most often, this comes down to "tricks" and "fooling players" and spending more time on the cover than the mechanics underneath. That might feel wrong.

**But the players don't know and don't care: all they know is if they're having fun or not.**

## Math is important, when it is

The whole idea behind this plan, is that you learn by *doing*. You build experience, intuition, good habits by simply building *many projects*. Which are invaluable skills that you wouldn't learn from reading a study book or watching video courses on game development.

However, you're still in the business of solving problems in a logical and precise way, which is exactly why we have *math*. Depending on the game you're making, and the complexity of it, math might be no factor at all or a huge factor.

I, therefore, do not recommend that you try to learn all sorts of mathematics in advance, or separate from your projects. Instead, **whenever something mathematical comes up, try to really research and understand it.**

The first time you hear about "vectors", do the extra work to really know what they are and what they can do. The first time a specific formula, or algorithm, or trick, or geometric thing comes along -- do the same thing.

Over time, this will build your *practical knowledge and intuition* for the mathematics needed to build games.

If you look me up, you'll see I have a degree in *Applied Mathematics* and am officially an engineer. But no, I'm not biased. I *hated* that bachelor with all my heart and I only did it because I was forced to, so I won't even call myself a mathematician.

Truth is: 95% of the maths I need for my games was *not* taught at university (or high school, for that matter). If it was taught, I already knew it in advance because of my own game projects.

So yes, game development involves mathematics. But not the boring, theoretic, useless kind you often learn at schools. Not the things that scare people away and make them say "I'm just not good with numbers". It has loads of *practical* applications of simple ideas, which you *will* successfully learn by just trying them out and making sure you really understand them before continuing.

## When should I make my "dream project"?

I see these posts or videos all the time: "Starting my DREAM PROJECT", "Finally working on my dream project for 10 YEARS", and so on.

You know what also happens to most of these? They quit. It never goes beyond devlog 2, or 5, or 10. Or the game turns into something way smaller and different.

The answer to the question "when am I ready for my big breakthrough game?" is **never.**

You are ready when you make a game and, by sheer quality and experience, it *becomes* your big breakthrough game.

This might seem harsh, but again, I speak from experience and hard-learned truths. When I started work on *Package Party*, this was the mindset I had. "Yes, this is going to be my big game! It will be amazing, it will be professional, I'll make tons of money, I can make anything I want after this!"

After 3 months of working incredibly hard, I had to stop development. It was too big. There were too many issues I didn't know how to tackle. And I lost all motivation. Looking back, it's obvious that I wasn't ready and this was too soon.

And now I want you to remember that I already had 10 years of experience making games at that moment.

Granted, I was still going to school (not much time, both for learning new stuff and making it), and when I started making games the internet (with all its amazing tools and information) was in its infancy. And I made basically all mistakes you can imagine during my journey.

But still, an outsider might think "hell yeah, he's more than ready for his dream project" And they'd have been wrong, oh so very wrong.

## That's it?

Yep. Just use the cycle and repeat it, over and over, slowly growing and gaining experience.

-   Steal a simple idea
-   Figure out how to solve its unique problems. Make sure the project stays **small.**
-   Spend most of your time working on everything *around* the game logic: marketing, visuals, sound, design decisions. Make sure you keep it playable and always finish it.
-   Now use the 80/20 rule to add your unique twists, to make it your own, to make it a game that can stand on its own.

And if you're someone motivated by money (there's nothing wrong with that, in fact, it speaks of a healthy survival instinct), really lean into that hypercasual game scene. Put ads in your games. Or allow buying the "full version" from within the game. Once you have 5-10 projects, at least a *tiny* bit of income will start to come in every day.

Really, this is all just a battle for **motivation**. Don't work in isolation. Share your progress as you make games. Constantly release tiny projects to stay in the flow, to get something in return (comments, downloads, feedback, money).

Making games is *hard*. It's *many hours behind a screen solving extremely hard problems*, every day. The only way to combat that, is by staying social, by keeping in touch with the rest of the world, by finishing stuff and finishing it quickly, by going away from the screen often and just working with pen-and-paper.

As I said: I made *all* the mistakes, and more.

I've spent a year or two practically isolated from the outer world, telling myself "I just need to work hard now and finish all this, *then* I'll be successful and can start doing stuff again". Don't do that. You'll lose motivation, which slows you down, which just means you become both unhappy *and* unproductive.

There are 5 or so projects on which I've spent 3+ months, thinking they'd be my big breakthrough. They were never finished (or close). The ideas aren't even that strong. And when you sum those experiences, you can only conclude than 1.5 year of my life was wasted on stuff that will never see the light of day and didn't teach me shit.

Don't do that. Make tiny games, make many games, finish them all, make them for *people* (even if that means including many psychological tricks and simplifying the hell out of your idea), and you'll be fine.

Now it's up to you to stick to the plan :)
