---
title: "Hard Lessons Learned from Bombgoggles"
tags: ["thoughts"]
date: 2024-09-21
emoji: "💬"
---

This summer, I participated in ~10 game jams. Most of the games I submitted ended up quite good and received high ratings. The worst one, by far, was _Bombgoggles_.

Despite working incredibly hard on it, and initially being very excited, I always felt it was the weakest game. I barely dared send it in by the end ;) 

And it showed. I was part of the _worst_ 20% of this jam, despite it being quite small and me devoting my entire weekend full-time to it.

In this article, I want to talk about the biggest lessons I learned and why I think the game ... _bombed_.

## Benefit of the doubt

Looking at the other games, I have a lingering feeling this placement wasn't entirely fair. Many of the games ranked higher than me were objectively worse in (almost) all areas. They looked terrible, while my game received comments about the great art style. They had crashing bugs, completely unreadable text, no sound effects, not even related to the jam's theme, you name it.

How could broken, ugly, unfinished, barely playable games have ended up with a better rating than mine? My game at least _worked_, looked _good_, and had a unique idea tightly related to the jam.

It might have something to do with an honest note I added to the game. Due to lack of time, I had started with the idea a few hours earlier (just to get a basic skeleton project up and running and pick out an art style), and used AI for background music. Judging from the disproportionate number of people just voting 1 star, some part of this might have ticked some people off.

I'm not saying this lightly. The few comments I got were very positive about the very things that others rated 1-star en masse. The number of people that tried/rated my game was far lower than I usually get, especially with my solid marketing images and polish that makes me stand out. It's just very strange, and contradictory, and it doesn't line up.

But I can't be sure! So let's give people the benefit of the doubt. Let's assume that all these terrible ratings were entirely fair and unbiased, and reflected their honest feeling about how good/fun/pretty the game was.

What can we learn from it?

## Mistake #1: Multiplayer First, Singleplayer Second

To see this, I tried to imagine the experience of a new player coming to the game.

Who would they likely be? What would they likely do?

* They will be playing alone, on keyboard.
* The fact the game is local multiplayer means nothing to them. The fact it has an input select screen (to log in players/devices) is an extra (perhaps annoying) step they need to take.
* Then they'll, of course, start the solo mode, and that will be all they see from the game.

I'd devoted 90% of my time developing this as a local multiplayer game. It's also the only mode that got tested (with other people, going in blind) and received good feedback. 

Why? Because the solo mode wasn't done until _just_ before the deadline :p

I'd written down three or four different ideas, but never actually got to implementing them. Because of the looming deadline, I was forced to pick the _simplest_ idea.

And I made it work. The game has an AI bot that is reasonable smart and challenging, but certainly beatable and fair, and now the game could be played alone.

It was certainly a rushed job, though. Which means the numbers weren't finetuned, I missed a few nasty corner cases, and I had to _change_ a few core rules of the game _just for singleplayer_ to get it to work.

The major ones were:

* Bombs kill _you_, not those in the radius around you.
* The AI doesn't lose lives when triggering bombs---I couldn't make them smart enough (in such little time) to prevent accidental suicide in half the games.

The first one is simply not how the rest of the game works, because it's not the most interesting or fun implementation of the idea. The second one is straight up "unfair" and would surely annoy certain types of players.

What have we learned?

* Especially for game jams, focus on singleplayer only. (Or singleplayer first, multiplayer _later_, optional.)
* Make sure there are no extra steps or clear signs early on that the single player mode is "inferior" to multiplayer, or complicated because of it.

## Mistake #2: Trying to do too much (without telling the player)

Because of the limited time (due to timezones, 2 days for me), I had no time to doubt or brainstorm longer. I simply put _all the ideas I had_ into the game, then toggled them on/off looking for the best combination.

But there's a sunk cost fallacy. _Because_ you added some feature or some toggle, you feel very much inclined to _keep it on_. Your brain starts to find all sorts of excuses for why all those rules should reaaaally stay in the game. You'll tweak numbers, weaken influence, add even more rules, just to keep everything going.

That's just never going to work.

I should've found _the best core rules_, then turned everything else off. It's simpler, the player has less to learn, and it would've allowed me to really test and refine _the core_ in the final few hours of the jam. (Preventing one bug that is quite subtle but also enough to ruin the game for many players; more on that later.)

Let's imagine a new player again, coming to the game fresh. These rules were turned on:

* Your "goggles" tell you how close you are to hidden objects. (The closer you are, the more they fill up.)
* Your battery automatically depletes => visit your beacon to recharge.
  * When that happens, your beacon moves around, and all other player's goggles go "haywire" (very briefly, they flicker randomly)
  * If you're not in time, you lose a life, and move slightly slower.
* When you lose lives, your goggles become less and less precise.
* When bombs go off, they remove the terrain below you. (Revealing the next layer, and then the next, and so forth.)
  * The terrain you're currently on _locks_ that goggle => so if you're on blue terrain, your blue goggle will not report anything.

This combination of rules was most fun to play. The problem is ... that I _knew_ all these rules and I'd obviously tested the game numerous times by now.

I had no space to explain it all to the player, so the tutorial only explained half of it, hoping that _feedback_ would lead players to discover the rest.

This was folly.

* How can you ever find out that your goggles are less precise? You'll only think "oh there's no bomb here---BOOM---hey, why did that happen?"
* Furthermore, how will you ever connect that to the number of lives you have?
* How will you learn about the terrain color locking your goggle? => You'll probably assume it's a bug, or, again, rely on its measurements and then be surprised (in a bad way)
* Furthermore, if this is your first game, this is completely overwhelming and unplayable as you still have to figure out everything else.

So the issue here is really twofold.

* I tried to do too much, yes. I should've just turned off all the other rules. Keep the battery + goggles, nothing else. (The other rules were added for _multiplayer_ and to _adhere more to the theme_, not because they were actually needed for the game.)
* But I also didn't _communicate_ this. Just because somebody is in terrain A and then event X happens, doesn't mean they make the connection and learn the rule. No, they might have been looking in a gazillion other places, and maybe thought something _else_ was the cause of it. Or they're just confused, annoyed, and shut down the game and give it a bad rating.

And I now see that there's nothing worse than that. Dying/losing lives (in a game where that's really important) but having no clue why. Thinking you can rely on game mechanic X (such as your goggles revealing where bombs are), but then you _can't_, and you don't know _why_.

It's so stupid, in hindsight. I was probably just too stressed and working too hard to even notice this. I don't think I ever made this mistake in _any_ game I made before, game jam or not.

I can see why people would be frustrated and just bail on the game. Especially if you're unlucky, and you just die within a few steps, and your goggles did nothing to warn you (because they were locked or went haywire just then). You try again, die again, no clue why it happens, maybe the game is just buggy---meh, I give up.

As stated, I should've just removed all the other rules and focus on the actual core idea that had me excited for the game in the first place. And I should've made + tested that version, against the AI bot, as the very first thing.

## Mistake #3: The game tries to be both fast and information-based

This final one is perhaps the most important/deep lesson, but I found it hard to put into words.

This game is _fast_. You have to constantly move around, otherwise your battery depletes before you reach your beacon. You also have to constantly move to not miss out on the good powerups on the ground, or not get caught in the radius of another player's blast.

But I also made it _information-based_. You have to constantly read your goggles to get lots of information about the hidden map, which is _all you have to go on_. There are gravestones in the world explaining the current randomized rules (such as holes in terrain being bad; that's not in the tutorial, only a tiny block of text within the level), which is information that's crucial to know if you want to play strategically in any way.

These two, however ... do not combine :p

If you have to act fast, you have no time or energy to read/process information.

If you're actually studying your goggles and the gravestone tutorials, you have no time to move fast and automatically start losing lives.

These two are _so_ at odds with each other that it, again, feels like an incredibly silly mistake in hindsight. But hey, that's why we live and we learn.

It's not a matter of execution or my idea being flawed. _These two things can't logically be combined!_

Instead, 

* A game is either fast and based on intuition/split-second decisions ...
* Or a game is slow (maybe even turn-based, or with enemies coming in waves, anything to delay) and based on information and deeper thought.

This being a quick party game about explosions, the most likely vision would be to make it _fast_. As such, all other rules of the game should be changed to accomodate this.

* Any information you need is explained _before the round starts_. (So, instead of gravestones in the level, you get 1--3 boxes with the random rules/hidden elements for this round. Then you click SPACE/BUTTON, it fades away, and you play.)
* During the round itself, there is _no new information_ and nothing that requires deep thought. (Instead, it's all about running around juggling your goggle readings. To aid this, the map would be filled with elements that ask you to make more split-second decisions. Like a door that only opens once in a while, or spikes that appear on a timer, or a conveyor belt to speed you up.)

This would've even been _easier_ to make than what I did now. Showing information before the round starts is much easier than randomly placing it on special objects _within the level_, spaced out nicely so it's always readable, etcetera etcetera. Creating a solid door that opens/closes on a timer is also 2 minutes of work.

I guess a sublesson here is that if you think your approach is a lot of work or taking too long, _it probably is_. You're overcomplicating something that could be accomplished more simply or with more minimalist/standard means, and that _usually_ is what you actually want.

## Mistake #4: The core element of the game was stupidly bugged

It's really a stupid bug.

* The goggles are a `TextureProgressBar` in Godot. You can provide it two textures (original, overlap) and then set a value (0% to 100%) of how much it should be filled. 
* When I get my reading from the goggle, I plug it in, and the progress fills accordingly. All simple and working.
* The _problem_ is that my texture for this _included the border of the goggle_.
* So, the first 10% and the final 10% were not actually visible, because it was just filling "the border" (and not the inner glass of the goggle/compass).
* Which is why, if things were really far or really close, the goggle was always _slightly inaccurate_.

And sure, one or two people reported this. Feeling they were in the right place, but nothing happened, and then the AI bot suddenly snatched it away.

Again, I can see how a new player would think the game is bugged or unfair, and give up on it. Because, in this case, they were right :p

I didn't catch the bug in time because it was so subtle. Only on the extremes, only when you really tried to be precise. But it is still a bug and the discrepancy between what you _think_ is a 100% goggle and what is actually a 90% goggle ... is terrible for a game like this. (Also, Goggles could be _bigger_ to make these readings easier on the eyes.)

Takes two seconds to fix. Would've probably saved me writing this article in the first place :p

But again, this is why we do the game jams. There are always mistakes you haven't made yet, and you better make them in a weekend on a game that doesn't matter, than on your huge project that must sell.

## Conclusion

I wrote down all these changes, plus many more smaller tweaks or expansions of the idea, in my "future to-do" document. Once or twice a year, I come back to these game jam games and try to give them that final "big update" to take them from jam game to proper release. (And if good enough, a slightly bigger release that might also be paid.)

This game is an odd one. Currently, it "bombed" in its own jam and I'm sure few people would enjoy playing the current version, at least in single player.

But I hope you agree with me that just making rather superficial changes would twist it around. It's like the idea was accidentally covered in mud and slime, but if I just remove that dusty layer on top, the actual great core idea comes through.

And the commenters agree with me. They were enthusiastic about the unique core idea---a hidden map, you must navigate/use powerups through compasses---but obviously not too happy with the execution. With changes that would only take a day or two, this could be a _really_ fun party game to play with a few people.

And so I surely intend to come back and give it that overhaul. (I'll probably remove it as a submission to the jam, though, as that would give everyone completely the wrong impression by that point. I don't like doing that. I like letting everything stand, especially bad reviews or old versions, but I'm at a point where I'm a bit _too_ principled about this and shooting myself in the foot time and time again.)

Those were my thoughts about the game and the lessons I learned.

Keep playing,

Pandaqi