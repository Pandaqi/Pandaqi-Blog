---
title: "Game Dev: What are you telling players?"
tags: ["thoughts"]
date: 2024-08-21
emoji: "💬"
---

Recently, I decided to take a short break during the summer and participate in a few game jams again. I ended up joining nearly 10 of them, and submitting for most, which was quite stressful and I probably should've actually taken a _break_. Nevertheless, this obviously taught me a lot about game design and gave me some new insights.

For years, I've known the importance of "nudging players in the right direction". I mostly develop board games, where this is especially necessary, because there is no computer to take things out of player's hands or "force" things. The idea is that you want to make players take actions that are the most _fun_. You want to nudge players to be proactive, to try stuff, to be _interesting_ with their actions, because that's how they will (subconsciously or not) have the most fun.

Any game can be played in many different ways. Most of them are boring; e.g. never attacking and only being defensive when playing Risk. It's your job as the game developer to subtly nudge players to the _interesting_ way to play your game.

I knew this. But I had, somehow, wrongly assumed that this was about small nudges and extra details. Maybe your game has a few extra mechanics or powerups, and you tweak them to make sure players interact with those more. Maybe your game has battles and you simply want to nudge players to engage in a battle a bit more often.

But no, this is actually true for _the entire game_. 

With every single decision, every single rule and element of the game, you're **telling the player something**. You're basically **training** them to behave in a certain way.

* If you fall into a hole, you die.
* If you grab this heart, you get an extra life.
* If you attack while your shield is down, you'll lose 99% of the time.
* If you press jump a second time, within a certain time frame, you do a dodge in the air.
* If you walk into a building, the game will freeze for a second, and then you'll be inside the building.

Big and small, crucial or irrelevant, every single interaction in a game teaches the player what to do and what not to do. If that interaction made them progress towards their goal (or just made them feel good), they'll do it more often. If not, they'll stop doing that thing.

Every time a player dies, every time it's game over, it's a _lesson_. What they did was wrong. Try again, try something else.

A large chunk of these interactions have almost become the "unwritten language of games" at this point. Hearts are good; you always want them. Double jumps bring you higher; most games have them. That's the first lesson: use those conventions to make this _teaching_ far simpler, and certainly don't (accidentally) go against them.

But that still leaves many, many tiny rules in your game that still teach the player something.

And, as you probably expected by now, a good game should **not have rules that teach the player to be less fun or interesting**. I'll give a practical example in a minute.

This doesn't mean that all parts of your game must tell the player the exact same thing. No, of course not! There should be variety and diversity. _Strategy_ can only exist if you have multiple choices and they pull you in different directions. You should have a few rules in the game that "teach" players to be speedy and go go go, but also a few rules that "teach" them to take it slow and be more cautious. The challenge (and fun) in a game comes from the player slowly realizing when to use these different strategies for the best result.

Thus I want to make an amendment to the rule: **let your game teach the player different strategies in different situations**. Attacking shouldn't _always_ be the best, nor should defending. Jumping shouldn't _always_ solve all your issues.

From now on, I'll try to keep this in mind with every game idea I have. When I write down my (long) list of possible ideas, powerups, mechanics, tweaks, _anything_ ... I'll ask the following question for each item: What is this teaching the player? And is it teaching them to behave in a varied and fun way?

## Why I wrote this article

One of my jam games, Inside Sprout, is a "flower defense" game. Yes, I'm very happy with that pun on "tower defense".

You have to defend your "Treeheart" in the center of the map. But you can only do so by planting flowers, which will distract / damage the enemies incoming in waves. (You can't directly touch/hit enemies; everything has to go indirectly through the flowers.)

But then I stumbled upon the common issue with "defend the center"-games: the player just stays in the center :p

All enemies will move to the center anyways. Just dropping all your stuff there, all the time, is the easiest strategy with the most chance of success.

I checked my list of ideas and was about to just implement them all and see what worked. Then I stopped myself. _Every single idea on that list taught the player to stay in the center and be more passive._

For example, the area around the Treeheart is "inside" (a building, originally). If you enter "inside", the rules change. That part was fine, but all the rule changes I had were just teaching the player to _stay inside_: you were faster, flowers converted faster, maybe if you're near the heart takes less damage from attacks, etcetera.

Think about it. When you implement a rule that says "in this location, you move faster" ... you're teaching the player to be in that location _more often_, because there's a benefit to it. So if I make the player "better" when inside, well sure, they will stay inside and barely move---which is not fun and not the intention of the game.

All these ideas would've been rubbish for the game. (I only implemented the first one or two before I realized this. And indeed, those did not help the game at all.)

Instead, I then actively flipped it around. How many little rules or tweaks could I invent that would teach the player to _stay away_ from the center/inside?

For example, you move _slower_ when inside. Flowers convert _slower_ on the inside. Literally the same rule but inverted, and suddenly you have a game. Now the player is constantly taught to move away from the thing they're trying to protect, to spread out more and take more risks instead of staying close to their Treeheart.

All these tweaks worked, but I really want to keep games as simple and minimalist as possible. So I ended up replacing it all with a _single_ rule that most clearly teaches the player to stay away: when "inside" ( = that chamber in the center around your Treeheart), you don't create flowers. Instead, every seed your drop becomes the same non-flower thing.

(In the version I ended up submitting, this thing was a "bullet" that could be fired from the Treeheart. Still useful, but in an entirely different way, and reloading was slow enough to not make it _too_ useful. But the idea is that this could've easily swapped out with a number of other ideas, all of them teaching the player to stay away from the center. Because dropping seeds in the center is "wasteful".)

When I asked my little sister to test the game, I saw this exact process happen in real time.

* First, she tried to always stick close to the heart.
* She failed once or twice, realizing that if she stayed inside, she would only ever drop bullets. And those only killed a single enemy at once, and needed a long time to reload.
* So she _learned_---not because I told her, not because it's in the written tutorial, but because of what the game inherently teaches---to move around much more and start planting flowers all over the place.
* At her third or fourth attempt, she got farther and farther. The game had _taught_ her how to play it well and in the most interesting way, through this one simple rule: "if you stay close to the center, you'll barely get any benefit from your actions"

## Another example

Years ago, I made a party game called _Carving Pumpkins & Dwarfing Dumplings_. It was basically meant as a quick Halloween game + technical experiment, which got way out of hand.

In that game, you are pumpkins, and players throw knives at each other. Slicing is completely _realistic_. So if you hit someone near the top, for example, they only lose their top chunk. I was quite proud of this achievement---realistic slicing of any 2D shape, on demand---which is probably why I was unreasonably sure the entire _game_ would work too.

It didn't. Sure, I eventually released it, full of content and polish and being as "good as possible". But the game never really become _good_---and it also never really sold---because the core game loop was flawed.

Can you spot the issue?

* It's a game where _precision_ is crucial, more so than in any other shooter/battle game.
* As such, every rule and interaction in the game taught players to _get close to each other_. The closer you are, the more you're able to slice perfectly through someone's center, cutting their shape in _half_.
* But that's not interesting. It's more _fun_ if players are spaced out, try different strategies, and hit each other with long-range throws and more spectacular attacks.
* So I came up with rule, after rule, after rule to nudge players in that direction. And it was all for nothing, because the game _at its core_ taught players to get in each other's faces and just mash the throwing button.
  * Example: when players get close, they're subtly pushed away from each other. (Like magnets repelling each other.)
  * Example: you do more damage if your knive has travelled X distance, rewarding long range shots.
  * Example: a map where players are initially put into their own isolated chunks, completely making it impossible to get in each other's face.
  * Example: introduce lots of locations on the map/powerups that make you move faster/slower, to differentiate speed. (Otherwise, players can chase each other endlessly, and never actually get closer, because they're all the same speed.)

A core game loop that is flawed in this way just cannot be rescued, that's what I learned. Now I have a clearer sense _why_ that game just didn't really work.

{{% remark %}}
Of course, this is besides the fact that it was my first bigger game. I simply lacked a lot of experience and knowledge in terms of polishing and pretty necessary features if you want to _sell_ a game. The game looks and plays _fine_, but it certainly doesn't cross some professional threshold to ask money for it.
{{% /remark %}}

What would've solved this? Looking back on the project now, with this newly gained wisdom, it's quite easy to see.

The two core ideas---slicing is realistic and thus very precise, but being spread out and throwing from distance is more fun and interesting gameplay---are at odds with each other?
How to make them _not_ at odds?

Of course, you always have the option to simply **not teach something**. To simply remove the entire mechanic or not push the rule.

For example,

* I could've discarded the idea of slicing being realistic. Any hit would just cut someone in half, or do X damage. Combine that with players moving slower and being bigger, and it means players are more likely to throw from distance or try something more spectacular---because they're actually likely to succeed.
* I could've discarded the idea of wanting long-range gameplay. Instead, make "get in each other's faces" the main thing, and tweak all rules to make _that_ as fun and interesting as possible.

This would've made the game more solid and instantly fun. But it wouldn't have made it _great_, becaues it runs into my amendment: the game now has too little going on and players will always have the same strategy. We're not teaching the players _different_ strategies or different ways to interact with the game.

Instead, the best solution would've been to tweak both rules until they taught the player _different things_, but both of them _interesting_ (and more or less along the same "vision").

* Make players huge, lumbering giants.
* Don't make close-range combat "useless" (for example, by forbidding players from even throwing if another is nearby), but just "different". 
  * If a knive gets within your close range, you freeze. This differentiates speed + nudges players to throw their knive further, otherwise it will always be close to them and freeze them.
  * From close range, the throw is not precise---if you do hit someone, it just deals a tiny bit of damage, regardless of how you hit them. It's still _a_ way to play, but it wil only work in certain situations. (Such as one where your opponent only has 1 HP and this certain blow from close range is enough to win.)
* Keep throwing precise: it's the thing that made the game unique and every throw different. Because players are far larger and slower, they're much easier to hit. What do we teach the player? 
  * "Try that crazy shot, try it from distance, you will often be rewarded."
  * "If you put in the effort for a more spectacular shot, you can be rewarded by dealing MUCH more damage." (And being able to move around faster.)

All the other rules and nudges could've gone away. Simply because I didn't need to "fix" the wrong things my core game loop taught players. Instead, the core game loop would teach different things---all interesting---from the get go.

But as they say, hindsight is 20/20. It's too long ago to completely rework or update the game now. We make stuff, we learn from it, we take it with us to our next stuff.

## Conclusion

I want to keep my articles shorter than I used to in the past, so I'll end here instead of giving 4 more examples of the same thing :p

Hopefully, the idea is clear and actionable.

> For every idea you have, consider what it teaches the player. Make sure no rule in your game teaches players to be passive, or not play, or do something "unfun". Also make sure there's a variety in the rules, pulling the player towards diverse playstyles and strategies.

I gave the jam game example because it's short and simple. Obviously, something small made in 2--3 days will not fully use these ideas. There are many areas of that game that could've been much better. 

Instead, I will take these lessons with me for when I _do_ make a much bigger game in the future. In the past, I used to write down lists of _all_ my ideas, then try them _all_. Now I feel I have a better compass for eliminating the bad ones beforehand, because I know the rule will _teach the player the wrong thing_.

Keep playing,

Pandaqi




