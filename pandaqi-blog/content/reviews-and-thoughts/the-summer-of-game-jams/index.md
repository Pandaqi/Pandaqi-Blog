---
title: "The Summer of Game Jams (2024)"
tags: ["thoughts"]
date: 2024-08-21
emoji: "💬"
---

In the summer of 2024, I quite spontaneously participated in 10 game jams over a period of a few weeks. I just picked the ones that seemed reasonable well-hosted and started/ended within my self-assigned summer break. And when I say spontaneous, I really mean it. I'd actually planned something entirely different, but, well, things happened, and before I knew it September had started and I'd made a dozen video games.

This sudden burst of game dev was also fueled by the fact I could _not_ develop any game for the past few years. My hardware was simple too slow and broken. Yes, even for very tiny 2D games. Typing in a text editor even put my laptop at risk of crashing and burning. It just wasn't possible, so I basically left the game dev scene for a few years.

Now I'd found a workaround. With a bit of money, and a lot of hacks and extra effort, I could connect several devices together and have something that makes it _possible enough_ to develop games.

So I used that to participate in all these jams and just, hopefully, have a good time and learn a few things.

This article is about the biggest lessons or most interesting stories.

## Mistake #1: thinking it was wise to stick to the same genre

At certain times, I was doing multiple game jams that overlapped. This obviously left little time to put into each game.

What did I decide? Let's pick ideas that are _roughly in the same direction_. So I can share some ideas and algorithms, maybe copy-paste some code or sound effects between the projects. Should help a ton, right?

Well, no.

_Because_ several ideas were all in the same ballpark, I was actually _less motivated_ to work on them. I wasn't learning anything new! I wasn't exploring new ideas! I was just writing the _same code_, with slight variations, over and over.

In the end, even the same original idea can be executed in wildly different ways. So no, I had no benefit at all from picking games that shared a lot of DNA; I only became frustrated and annoyed at the semi-repetitive work.

I dropped this idea near the end of the summer.

## Mistake #2: going multiplayer first

I am more of a board gamer. I play games because of the social experience, with other people in the same room as me, which means I almost exclusively play local multiplayer video games.

Obviously, those are at the front of my mind when coming up with ideas for a jam game. Which means about half of the games I ended up making, were clearly multiplayer-first, singleplayer-second.

And it showed. Some turned out alright, others had terrible ratings because the singleplayer mode was rushed at the very end. As far as I can tell, none of the judges/testers/developers actually played the game with 2 or more players.

This just doesn't play well with game jams and the largest majority of gamers.

Moreover, it makes development much harder. Because now you have extra problems to solve, and everything needs to scale for different player counts, and you need to test and finetune more ... and you just don't have the time.

I dropped this idea too near the end of the summer. Every idea would be single player. Any multiplayer aspirations would come _after_ the jam, if the idea proved potent enough.

## Mistake #3: My personal challenges didn't always make sense

Despite the theme restriction (and another requirements) of a jam, I always set some personal challenges. To force myself to try something new, to explore, because restrictions breed creativity, you name it.

For several games, for example, I forced myself to really use the Custom Resources in Godot (or some other functionality that should be really useful but I simply never tried before now). This was great! I learned a lot, found much cleaner ways to solve many problems, and feel like any future game I make will be faster and better coded because of it.

But many of these challenges were also a bit ... meh. Too technical, too vague, too really matter. If my personal challenge is about some technicality of coding or learning new buttons from my game engine, well, that's not really influencing the game idea, is it? Which means I subconsciously played it safe and picked very similar game ideas for the different jams.

No, near the end I learned that my personal challenges should be focused more on some MAJOR shift in the CORE of my development.

* Challenge myself to try a completely different genre, something I never made before. (Never made a horror game, never made a rhythm game, etcetera.)
* Challenge myself to try a wacky control scheme or method for all input. (Hey, could you have a game where all you can do is press a corner of the screen with your mouse?)
* Challenge myself to leave out one part of my usual routine/process, or completely turn it upside-down. (What if I don't use my vector software for illustration, but draw by hand and scan it?)

These challenges would've allowed me to learn even more and make more varied games. At the same time, I'm not sure I would've managed the difficulty of this while making so many games in so little time. (While it's 40 degrees celsius here and I can't even stand still in my room without sweating profusely :p)

## Mistake #4: interlocking systems

This was the biggest revelation, but it's perhaps a bit harder to explain.

You see, when my hyperactive brain comes up with anything, it tries to _connect everything with everything_. I can never just have a simple game idea, with _optionally_ system X or Y bolted on top. No, if there are 3 systems in my game, they are going to be _tightly connected_ and influence each other _in every possible way_.

You know what that means?

That I can't test the core game loop until _all those systems are somewhat functioning_. In practice, this means I sometimes programmed for an entire day to get all systems up and running, and could only test if it _worked_ and was _fun at all_ the next morning. (The dreadful moment of "okay, let's boot the game, and hope any of what I did yesterday makes sense")

That's just not a very useful way to develop games. Especially not if 2--3 days is all you have. Honestly, I'm still surprised how often things _did_ work first try and how all those games were finished and playable.

You want to prototype extremely quickly, testing if the core idea is fun and doable within an hour or so. Then you want to test all the time as you _add_ things to that simple core.

I can't do that when all my systems are interconnected, tightly wound around each other until none can function without the other operational. Even if those systems are all very simple at their core, even if it's only 2 or 3 systems, they all need to exist (in a mostly completed capacity) before I can even test the game.

And so, in practice, I can spend two days coding and coding and creating all these separate systems and entities that eventually connect. And then, when I'm almost out of time and finally boot a working prototype ... I discover it's just not that fun and I should've spent the time elsewhere. And because my idea required several separate systems, and none could really be tested on its own without the others, there was no other option than to first build it all.

At first, this might seem like the dreaded old problem of overscoping. I thought so too, at first. But it really isn't. Those jam games I made are mostly quite small and minimal, very quick to play and explain. They were _all finished_, sometimes in less than a day, so surely they weren't too "big" in scope?

No, it's a different problem. No matter how simple the game, if none of your systems can be tested _standalone_, you're going to have to wait a long time before testing if the core game loop is fun at all. 

Preferably, systems not only run fine on their own (disconnected from anything else in the game), they are even _fun_ on their own. So adding anything else is just _optional_: if you run out of time, that's fine, just submit what you have and it's already fun.

It's not that I'm wrong in saying that many of my ideas simply require multiple systems to connect/coexist. That is true! Especially because I make local multiplayer games, which means everything automatically is doubled or tripled in requirements. If you want to make a game with a lot of content and replayability, which sells for 20+ euros, then you certainly need multiple interlocking systems or mechanisms.

But the fact that these are my natural ideas and necessary for bigger games _does not make it the right thing to do, especially not for game jams_. 

Instead, I should learn to purposely think the other way around. Whenever I have an idea, simplify it until I only need _one or two systems at most_ before I could play it. In other words, one or two hours of coding and setup _at most_ before I can start actually playing the core game loop and testing if it's fun.

Near the end of the summer, again, I realized this and changed my tactics. With my final few jams, I purposely made sure _every_ system or mechanic was standalone and could've been the game just by itself.

### A practical example: Inside Sprout

I'll give an example of a game I initially did "the wrong way", and how I should have done it (if I could go back in time).

Let's pick _Inside Sprout_. In the submitted game, I needed all the following systems before I could test anything.

* A random map generator, cutting it into areas, assigning flower types to them. (And a way to check where each entity is currently standing, of course.)
* A spawner for seeds, making sure they were spaced out and could be picked up.
* A player character to move around. One that can pick up the seeds, then drop flowers (based on the area you're standing)
* The "Treeheart" (in the center of the screen) that you must protect.
* An enemy spawner, with enemies attracted to nearest flower they like, and otherwise to that Treeheart.
* A sense of Health and Attacking/Damage
* Triggers for when all enemies died or your Treeheart died (for game over, win/lose)

It took 1.5 days to hammer out all these systems (and a bit more, but those are minor). All that time, I was just coding stuff, connecting the right signals, working through that to-do list, _praying_ this all came together. I couldn't test the enemies before I had flowers and the Treeheart. I couldn't test the flowers before I had seeds and the map divided in areas. I couldn't test the actual game loop until enemies could die in varied ways. And so forth, and so forth.

I could've made some systems more "rudimentary". Such as, for the time being, not doing the map generation yet but just giving you a "random flower". But because enemies are only attracted to _specific flowers_ (different per enemy), this would've made testing that quite annoying. 

And even if I locked the enemies down too (or allowed them to be distracted by any flower), we are now so far removed from the actual game that testing this version doesn't accomplish anything. 

(A large part of the challenge comes from timing your movements and dropping the seeds precisely when you're above the right area. If we remove that---letting it just be random or automatic, lacking the required systems---we're just testing if the code does what it does, not if the game is actually fun or interesting. And that's not the important part now, especially because I'm confident in my code after all these years.)

Okay, so, what should I have done instead? Make every system standalone: testable on its own, at least a bit of fun on its own.

* PLAYER CHARACTER: This is the only one that already stands on its own. Obviously, having something move on the X and Y axis in response to arrow keys, can be coded and tested just by itself. By necessity, this is the one thing that MUST interact with other systems and MUST be made first. (Otherwise, the game has no interaction and is thus not a game in any way.)
* MAP AREAS: The areas randomly change color, and you lose the game if the entire map is the same type (or something). You can repaint them yourself in some way, perhaps when moving from area A to area B, you paint B the same type as where you came from. => This could be the game just by itself.
* FLOWERS/SEEDS: Ignore the seeds and map areas. The flowers could've just spawned randomly. It would be about picking them up from some corner of the map and placing them in defense of the Treeheart. => This could be the game just by itself.
* TREEHEART: There are multiple Treehearts. They automatically die (they're sick or something). You can replenish some health by touching it, but only if you do it in the right order (that always changes), or the pathing is important somehow. When dead, trigger game over. => Though not the greatest, this could be a game by itself.
* ENEMIES: The enemies attack _you_, the player. But each enemy also has a few types of other enemies that they dislike and will attack. As such, it's about luring the right type close to another type, and have them kill each other => One last time: this could be the game by itself.

If I'd built it like that, I could've made each system on its own, then tested and finetuned it on its own. I'd have had a constant feedback loop about which parts of the game worked and which didn't, allowing me to adjust as I went. In fact, just writing down this list already gives me a few better ideas for how I could've executed the game.

And if I ran out of time? Or just didn't have the energy anymore to draw all the enemies? Fine! Leave out that system entirely, don't make it. The others are _already fun on their own_, so any extra work is optional.

Looking back on it, I could've saved myself so much time and effort, and had a better game as a result. A more focused game, doing 1 or 2 systems _well_, instead of 3 or 4 systems that can't be balanced well enough in such a short time frame.

## Observation #1: Pretty visuals don't matter as much anymore

I remember, years ago, receiving much higher rankings in a jam than I deserved (if you ask me), because at least I made things look good. That's why I've always made sure, in every jam, to reserve enough time for pretty graphics, marketing images, screenshots.

From the data I gathered now, however, this just isn't as important anymore. (Or maybe I've regressed in skill :p But no, I can quite confidently say the stuff I make now is faaaar prettier and more polished than that of years ago.)

People seem to pick games more on the tools that itch provides. Such as displaying the games with the fewest ratings, or only rating games from people who also rated yours/left feedback at yours. 

Despite feeling like I wasted time/effort now, I am still happy to see this! Good. We're moving away from a society attracted only by shiny superficial things, and focusing more on the deeper gameplay or the actual content of a game (and/or helping each other during a jam).

## Observation #2: People like source code

I provided the source code (on GitHub) for all these games. I honestly don't expect anyone to even _read_ the stuff I write in the description, let alone reach the end and find that link. But hey, at least it's there for those who want it.

Then I noticed many of these repositories were starred/followed once or twice during the jam. Woah! People actually read it, clicked the link, and even liked it enough to act on it!

Also, this is usually the point where I say "I am sorry to anyone who tried to decipher the project/code and learn from it". But ... I don't feel that way anymore? All those jam games are _really cleanly coded and structured_. Clear locations and names for all, no clutter, easy and robust code, almost no last-minute hacks or shortcuts that could be described as somewhat messy. It even includes my future to-do list, my Affinity Designer assets file, my personal notes on things.

I think these repositories could be a _great_ help for anyone looking through them, for whatever reason. 

And I'm honestly most surprised that _I_ feel that way. Despite being away from video games for years, I did continue programming and I mostly developed (looooads) of board games. It seems I've grown a lot in all aspects anyway and feel far more confident in my project structure and programming skills.

## Observation #3: It's crucial to play and leave feedback for others

Because I was doing all these game jams back-to-back, I had almost no time to play the other jam games and leave some feedback. I was barely able to leave a quick comment here and there. Yes, I am very disappointed in myself too.

I felt guilty about this, but didn't think it'd actually mean anything. I was wrong. 

The general trend of these game jams seems to be that if you leave feedback on loads of other games, all those people will play/rate your game too. This creates more views on your game, more ratings, more feedback, and a more positive impression of you entry in general. The effect of this can't be overstated.

I missed out on all of that by not really participating with the game jam besides submitting my own creation.

And it showed. Even when my game nearly won the jam ( = was ranked top 10, 20, 50), it had waaay fewer ratings than all the other games there. I probably could've won one of them and gathered waaay more views if I'd left more feedback at other games. Not that I really care about winning, but moreso that I care about being a good jam participant _and_ getting more feedback on my own work.

As stated, I knew this was the case but thought its effect negligible. In reality, I now see it's nearly useless to join a jam if you're not going to very actively vote and engage during the period afterwards. Sure, the biggest benefit is actually having made a game. But the second biggest benefit is assured eyeballs on said game and useful feedback about your shortcomings and strengths.

## Obsrvation #4: I need to get better at prototyping

Even after all these years, I naturally gravitate toward picking one "golden idea" and trying to make it work, no matter what it takes. It's nice to have that spirit and discipline, of course, and sometimes you really _do_ need to stick through the harder parts of figuring out a game idea.

But ... this also means that I often only prototype _one or two ideas_ for a game, then already start developing them fully. And that's just not enough.

With the very last jam, my initial ideas were not really working, so I decided to use this moment as a challenge. I decided to prototype way more ideas: I gave each 1-2 hours, prototyping an entire day, then picking the best one at the end.

And this is actually possible. The very core of a game idea---the action you'll often repeat, the unique twist---_can_ be made in one or two hours, especially if you're experienced. In doing so, I learned a lot and was able to eventually pick a better path forward for the rest of the jam. (Despite feeling like all hope was list and on the verge of not submitting anything at the start of that day.)

Still, I was bad at it. I kept going for 3, 4, 5 hours on every prototype. Already polishing it, thinking "oh but if I already add a few images I can see what I'm doing a bit better", thinking "oh but sound effects will be really important for this idea, so let's already add some". 

No!

One or two hours, tops. Get the simple core your game idea working, then _see_ and _feel_ if it's actually fun and has potential. I've tried it, and I can see now that it's possible, but only if you're really strict with yourself. Don't spend too much time on every prototype. If you build the main game loop, and it's not fun with grey boxes and placeholder text, then it will only be _marginally_ more fun if you build that into something more polished.

That last jam was, for most intents and purposes, a failure. I'm sure, however, that if I'd stuck to my original plan and tried 4 or 5 tiny prototypes of my best ideas that first day ... I would've actually picked the best idea and had a much better end result.

In a sense, I was lucky that I had an idea that mostly functioned (right from the start) for all the other jams. Or maybe I just _think_ that, but I would've made something far better if I'd prototyped for those jams too.

There's this idea within every artist that every idea is worth its weight in gold. Every game idea in your head _must be made into a (commercial?) release_.

In reality, though, half the ideas are shit, the other half are juts not enough for a big release or have practical downsides you'll only see once you make the prototype. And somewhere in between, there is this one idea that is actually _really good_ and will be a _successful game_.

Prototyping (rapidly, without mercy, cutting what doesn't work) means "losing" a few days or weeks to actually find the best idea. Which will prevent losing months working on some idea that grinds to a halt, and will give extra motivation and confidence to the idea you end up picking.

I have this big folder of game ideas, nearly a hundred of them. I always said that I'll make the better ones (which are "most of them", otherwise I wouldn't have written down the idea ...) at some point, despite knowing in the back of my head this isn't even possible.

Now I know that I should just _prototype_ every idea. Pick one that seems interesting now, try it on a weekend. Then evaluate on Sunday evening: is it actually fun already or not?

What isn't fun is thrown away. No sense wasting more time on that; we didn't lose our weekend, we spent 2 days learning new valuable information about which game loops work and which don't.

The only ones that are left should be my next big games.

I will probably be doing this from now. Once in a while, prototype, whittle down that list. Once I know the "golden idea", _that's_ when I'll actually pull the trigger and start working towards my first big commercial game release.

## Observation #5: I'd forgotten the joy

Honestly, after all these years away, my memories of game dev were a bit ... sour. The long nights spending head-scratching bugs. The stuff that would randomly break when tested in a different browser or on a different platform. Spending hours coding something, only for it to fall apart in player's hands within 1 minute, because your idea was the wrong kind of difficult.

But making these tiny games, having grown so much and being forced to focus on _playability over everything_, it rekindled some of that joy.

Seeing others try your game, slowly explore/learn the different rules or strategies, then laugh or get tense/frustrated ... that's why we make games, right? That's why we keep coming back to something that is _so_ difficult, and draining, and time-consuming, and risky. 

In the hopes of leaving at least a few games behind that will bring people joy.

Game jams are ideal for that. You get so much more feedback than if you'd released the game any other way. You get instant confirmation that some people _have_ tried your creation, and some _have_ had a fun time or are really intrigued by it. Perhaps that's why I spontanously decided to just "do all of them" for the summer. It's almost a game loop on its own: work your ass off for a few days, get rewarded with feedback and seeing others have fun for a few days, repeat.

I have a few games that are 90+% finished. Big games, games I intended to sell back then, games that have been battle tested and I believe will sell at least reasonably. But I never finished them, because of those sour memories and experiences. After working on that same game for months, all you really remember is the mountains of work and the piles of doubt.

After this summer, despite several of my games just not being fun or "bombing" in the jam with terrible ratings, I've found some of that spark again. The idea that, yes, I could make a good game (if given actual time and focus), and it would do reasonably well and bring some people joy. That, yes, I should probably 100% those older games the next year and give them a proper release.

With all the lessons I learned this time, I am certain it will go much more smoothly than if I'd released them 4 years ago :p

## Conclusion

Those were my thoughts after a hectic (last half of the) summer, making loads of games and submitting to most of the jams I joined. Many lessons learned, many new skills gained, and slowly getting back into game dev again.

At the same time, I have other deadlines now. Because my hardware just would not work---and my situation as a whole just made things like game dev or music recording almost impossible---I pivoted to writing and board games long ago. I have many of those still planned. I don't know if people are actually _waiting_ on them, but I have deadlines and pre-orders of future novels.

I'll mostly be doing the things as I planned and meeting any deadlines or finishing those in-progress novels and board games. Don't expect me to join any game jams the next months, nor release those "big games".

I am quite confident, though, that in 6--12 months, I'll have the room in my schedule to do so. Perhaps my first game on Steam! My first game to earn me more than 100 dollars! (And yes, I am still surprised that some people bought some of my older smaller games, or donated on some of the puzzle games!) And I'll probably write an article about the lessons learned from that too.

It's hilarious, though, to look at my notebook now. I constantly have these tiny ideas, these "oh mustn't forget!" thoughts, and I always write them down quickly with the pen and paper on the edge of my desk. Usually, I transfer them to an actual file (or their actual place in my creative workflow) that same evening. Worst case scenario, I assemble this pile of scribbles and can only "finalize" or "archive" them on the weekend.

This time? I'd suddenly, spontaneously, decided to do game jams for ~3 weeks on that other tablet. (My laptop is still the "main" device that has a backup/archive of everything; that tablet only has the few things I need for game dev.) So my notebook is a loooooong list of scribbles, arrows, stars, question marks, IDEAS (with an underline, or two, if it's a really good idea). I can hardly read half of it and am lucky that I still remember the gist of what I originally wrote.

My first and only task for tomorrow? Transfer all of that to the laptop, file all the notes, write down the game/story ideas properly. And yes, I am pretty sure that will take the entire day.

Then I will take a short break, and as the children go to school again here in the Netherlands, I'll be withdrawing from game dev again and going back to my novels and board games.

Keep playing, and developing,

Pandaqi