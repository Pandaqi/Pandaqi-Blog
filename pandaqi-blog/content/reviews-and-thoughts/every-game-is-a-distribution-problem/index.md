---
title: "Every Game is a Distribution Problem"
tags: ["thoughts"]
date: 2024-09-05
emoji: "💬"
---

I'll try to keep this article brief, because the title has already given the big insight that I want to share. **Every game is a distribution problem.** 

Or, well, _most_ games. Most games that have wide appeal, and are easy to pick up and have lasting fun with. For all intents and purposes, and to keep the language simple, let's just say _all_ (good) games are distribution problems.

What does that mean?

It means that the easiest way to create a fun and challenging game, is to **give the player more things to do than they have the resources to do**. 

In other words, they have to constantly _distribute_ what they have over their tasks or challenges. Strategy _emerges_ from the fact that you can't do it all---you must make choices about what to do and what to skip. 

Let me give an example: a shooter (or "bullet hell"). _You have to shoot the monsters, but the monsters keep respawning while your ammo is limited._ 

You have _fewer resources_ (bullets) than _tasks_ (monsters to kill). Boom, already a game. Now you can fill in the rest in a million different ways, such as how to get more ammo, or how to make the bullets you do have stronger, or anything else you might fancy. But because you phrased a distribution problem, you now have a game.

Another example: a puzzle game. _You have to reach the finish, but it's a square grid and you only have a limited number of moves._

Any move you make will inherently destroy other options. You get strategy and challenge for free, because you must _pick_ how to spend the few resources you have. If you had unlimited moves, or as many moves as there are squares, then this wouldn't be a game---because it wouldn't be a distribution problem.

The examples keep coming: a platformer. _You must dodge the flying enemy and grab the coin high on that ledge, but movement is limited: once you've jumped you can't jump again until you landed._

If you could freely change your direction at will, most platformers would fall apart. You wouldn't need to make any choices; you could just do it all, moving freely to any place you want. On the other hand, if your only challenge was reaching that high ledge, then it also wouldn't be a game anymore. You'd just spam the jump button until you get there. It only becomes a _distribution problem_ because there are multiple goals/threats in different positions, while you have limited movement.

Note that "resources" also mean physical resources that a human possesses: _time, attention, energy, reaction speed, etcetera._ A basic distribution problem is when the game presents multiple threats all across the screen/world. In some perfect world, a player could handle them all at the same time, and the game wouldn't be challenging. It would just be multitasking, or, _work_. 

But the world isn't perfect! And humans aren't perfect! And that's exactly where games and fun are born. Because humans can really only pay attention to _one thing at a time_, this simple game setup has now created a distribution problem. The player must decide where to put their _attention resource_ every second, and how long to keep it there, to optimize their score. They only have limited attention; the number of challenges is greater than that.

That's ... that's the article. If you want, stop reading now! Go forth and create distribution problems---erm, games!

The rest of the article will just explain how I ended up with this insight, and reinforce just how powerful it is.

## The summer of game jams

Recently I (rather spontaneously) decided to join loads of game jams during the summer. For ~3 weeks, I basically non-stop invented crazy ideas and tried to make them into functioning games within 2 or 3 days.

The biggest issue I encountered was that ideas that seemed "interesting" or "simple" on paper, usually turned out to be ... "not fun" in practice.

Because _interesting_ and _fun_ are not the same. Because _clever_ and _fun to play_ are not the same.

Every single time, however, I could solve that by expressly making the game a distribution problem. I would notice the same flaws in the designs: the game was boring or aimless, because no resources were divided or split. With a simple tweak or two, I could achieve this and boom---the game suddenly clicked.

The one game I made that scored the best (5th place)---and which I feel _was_ the best, by a wide margin---illustrates this perfectly. Because this "distribution problem" is the literal _core_ of that game's idea. It made the development almost effortless, as if the game designed itself from start to finish.

* In that game, you are a character in the center of the screen, with a flashlight. 
* The screen is dark. You can only see the _left_ or the _right_ at a given time---but not both.
* Ghosts come in from both the left and right.
* Tada! Distribution problem. You can only see/look at _one side_, while challenges come from _both sides_ simultaneously.

The game designed itself, it was fun to play right from the first second, and I feel this was the most "effortless" game dev process I've ever had. And it showed. People had loads of fun and the game scored exceptionally well, despite only being made in a day. (The jam was 3 days, but I was busy with another jam for 2 of those, and basically joined last-minute in another bout of spontaneity.)

## More powerful than you think

Since that moment, I changed the way I look at any game idea.

Instead of asking myself "what does the player do?" or "how to make it not too easy/too difficult?", I ask myself the same thing: "Is this a distribution problem? And if not, how do we make it one?"

A game about finding hidden treasures was ... fine, but not great. Because it was not a distribution problem. Your attention was always at your compass and at finding the next nearest treasure. Then I changed it so you need to regularly _return_ to your home beacon to recharge your compass, and now it was suddenly a game! You two challenges---find treasure, stay charged---but could only be in one place/activity at once.

A game about protecting your base from enemies (by placing flowers to distract the animals) was ... fine, but not great. Because it was not a distribution problem. You saw an animal, you placed a seed of the flower they wanted, done. Then I made a simple tweak: all seeds are the same, but they can only become one thing. Once planted and turned into a flower, you're stuck with that choice and the seed is exhausted.

More specifically, 

* The area where you drop your seed determines the flower you get. (The map is cut into different areas.)
* There's an inside area (around your base) too, which turns dropped seeds into _bullets_. These work in a different way and are crucial to defend against certain really powerful enemies, but otherwise less useful than flowers.
* Enemies come in from all sides, but have a limited range. Placing a flower on the left of your base, for example, will now not distract an animal all the way to the right.

It had become a distribution problem! And now it was actually fun to play. A challenge, and one players _wanted_ to take up. You only had limited resources (a seed that could only become one thing in one location), but multiple challenges (different enemies coming from different sides, with different weaknesses to specific flowers).

The danger here, of course, is to overwhelm the player. You shouldn't just give the player one button or one very limited resource, then throw twenty different threats or challenges at them.

As always, balance is key. In a weird philosophical way, though, the balance we seek is "balance in asking too much". We seek a "balanced overtaxing of the player" :p

The player should have too much to do and too limited resources. But they should _feel_ like they _can do it_. They should be ever so close to fixing the game, winning it all, overcoming this deficiency, every second they play the game. 

It's your job to make sure they get a _new_ challenge any time they actually get there. 

* The player became so good they can now divide their attention between two different bases? Level up, add a third base.
* The player now has a machine that automatically converts wood to any other resource they need? Level up, add a new more rare/exotic resource.
* The player has successfully killed all monsters? Spawn a new wave with a new type that will limit a different resource of theirs.

I'm tempted to call it the "pigeonhole problem on purpose". If your player wins the game by filling 5 slots, then you should only give the player 4 of them. If the player wins the game by building 10 cities, then you should really only give them the means to comfortably build 9. 

They should always be just _one off_. Always be missing that one final step to overcoming the gap, so they can perfectly distribute their resources with no deficiency.

## Isn't that just the type of game you like?

I wondered about this, yes. Maybe that's just my favorite "genre" or "type of game". Maybe I'm just a hyperactive being that likes games that overwhelm me with more tasks than I can handle.

But no. 

The many games I made over the years have a lot of variance. Different genres, art styles, player counts, approaches, play time, objectives, you name it. With every project, I purposely challenge myself to do something new and prevent getting stuck in the exact same routines.

But all of the "good ones" (the games I and others liked the most and I'm most proud of) are _all distribution problems_. Some distribute your time, some your attention, some your controllable characters, some your movement, but they are _all distribution problems_.

I actually came to this realization from _playtests_. It was the other players, also with vastly different personalities and preferences, that all clearly showed favor for "distribution problem" games and were far less enthusiastic for other kinds of game loops. To the point that I wrote this article and think that _any_ good game, any functional and fun game loop, is a distribution problem.

Take management / simulation / tycoon games, for example. Something like Rollercoaster Tycoon, Simcity, perhaps running a business. These are slow games, not based on realtime raction speed or attention, right? They're a completely different genre and game loop, right? 

Yes, sure, but they're still _distribution problems_.

You have a limited bank account. You have more stuff you can/need to buy---on what do you spend your money?

You have limited space in your city/office/park. You can build far more stuff than you can ever fit---so what do you choose?

The number of people in your park keeps growing, so now you have more people (with needs) than you currently have the resources to support. How do you overcome this gap?

It's _all distribution problems_!

## Conclusion

And so I conclude my great insight. I only say that half-jokingly, because I think this is _really valuable to understand_, while also realizing this is basically just an obvious definition for what half of a game loop is.

I think it's mostly useful at the ideation phase. When you have some faint glimmer of a new idea, but you need to test if it actually has meat on the bones. You need to specify it and point it in the right direction (towards "fun") as quickly as possible.

How? By asking yourself: "Does the player have more challenges than resources, so they must distribute what they have all the time? If not, how do we get there?"

To balance this, make sure it's always "just one off". Always "nearly perfectly distributed", and the player feels like they can get there. And when they do get there (or close), you introduce the next twist to create a discrepancy again.

For example, I asked my random game generator to give me some keywords: "A game using Pawns, Trading, Bidding and a Tech Tree"

How to turn that into a game? We need a distribution problem. 

For example: "Each technology can only be unlocked once, but you need the entire tree completed to win." (Technology is limited; Challenge requires you to have it all.)

This, in itself, is incomplete. Obviously you can never win the game now! 

That's the whole idea: it's a distribution PROBLEM. To make it a game idea, it needs to marry with the solution to the problem. Because we have this start, though, this is easy to come up with.

* New technologies are revealed every round (from a deck, for example) => players bid and then choose in order of bid (highest -> lowest)
* But you can get the missing technologies by _trading_! If both players agree, they can "trade" technologies, which just means they both get the one they miss.
* And you have a pawn that can walk _over your tech tree_; the technology where it stands on your turn matters. (For your bid, for what you can trade, for a special action you have, something like that. Maybe if your pawn is in some branch, you can _force_ other players to trade from that branch, to acquire the really hard-to-get technologies you miss.)

Tada! Actually sounds like a cool idea for a simple board game that could work. Came up with it in 30 seconds, because I started with a distribution problem, then sought the answer to that problem.

Go forth and create distribution problems! Include the solutions too, and you get good games.

Until next time,

Pandaqi