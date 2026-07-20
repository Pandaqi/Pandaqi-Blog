---
title: "Recognize What Your Game Wants To Be"
tags: ["thoughts"]
date: 2026-06-04
emoji: "💬"
---

I just finished the release of my first Steam game. Making a game "professionally" for the first time, selling it for money, having to follow all of Steam's policies, it taught me a _lot_. I've written other articles already about specific lessons learned and examples from that game, but this article will be the biggest lesson of them all. Or, rather, the most important thing I'll try to take to heart for future games.

Now, that first Steam game itself is nothing special. It was made in about a month as a learning experience. And learn I did :p 

The game is fully functional of course---Steam demands it, and I wouldn't ask money for it otherwise---but it also didn't live up to its potential. Though all the individual parts are fine, the game design as a whole ended up a bit of a mess.

Why?

Well, let's go back a month. I notice the World Cup is coming soon. I had been prototyping possible "first Steam games" for a few days, so I was already toying around with the idea of finally going for it. None of the prototypes had anything to do with football though. I thought it was a great marketing opportunity, and it gave me a strict deadline, so I made up a _new_ idea for a tiny football game and started work on it.

For several years, I saw idle games and incremental games getting more and more popular. And so I decided to make this a "football incremental game". You'd play matches, earn money for scoring goals, then use that money to buy upgrades. As usual with these games, over time the upgrades automate more and more of the game for you (automatic kickers, you score 5 goals for every goal, etcetera), until you can beat this bonkers final match by scoring a thousand goals easily.

At least, that was the idea.

Within a few days, I had the gameplay covered: place a guy, it shoots nearby balls, earn money. This was fun. I even did some early polish already because I knew this would be the core of the game---the action you repeat over and over and over. This worked!

Then I made the other systems: the upgrades, harder and harder matches, opponents in the way. And ... it didn't feel as fun. The game started to feel messy. The original fun factor was removed, because it became hard to "place a guy and score a goal", removing that satisfaction.

So what did I do? In hindsight, I can recognize this mistake, which is why I write this article. But at the time I did what feels completely sensible and I think most people will do: you **try some new ideas to make the game fit your vision**.

I made opponents much dumber and less effective. I moved the "accuracy" system further back, to the point you've probably already upgraded it so much that it doesn't matter anymore. I changed all my systems to keep the game as "idle" as possible. To keep it within the mold of an incremental game.

Yes, the game became simpler, and easier, and you could play more passively/idle ...

... but it still didn't feel right. I could make the game easier all I want, and I could add automatic kickers, but you still had to actively play that football match. You still had to think about "oh there's someone in the way, I need 2 shots to get around them". 

I forcefully tried to turn an inherently _active game_ into an _idle game_!

I wasn't listening to my gut. I wasn't seeing what the game was telling me---what it wanted to be.

I stuck to this idea of making an idle game for weeks before I could let go of it. And I could only let go because I'd done _so many_ playtests that I had the _evidence_ that the current approach wasn't working. _And_ I discovered two other "idle football games" that were, you know, actually idle and fulfilling that vision. And they worked _completely differently_ from my game :p

Seeing those other games finally made me realize I wasn't actually making an idle game. They did everything right for that genre, while my own game was constantly telling me about how it wanted to do the opposite things. 

My own game was at its most fun when you were tactically placing your players and scoring goals around your opponents standing in the way. My own game was at its most fun when you have complete control and are actively kicking balls left and right. It's an _active_ game. It's a sport! And all the ideas I had, everything that worked first try (instead of after five iterations), were _active_ aspects that allowed you to think fast and move fast.

I had been working on the game for ~4 weeks. I was honestly pretty down about it all, because every change I tried did not improve things and the game felt mediocre. Once I finally _listened_ to what the game was telling me, I was able to overhaul the game in only a few days and suddenly it started to sing.

All the elements were already there. I'd built them all into the game in the first few weeks, from corner kicks, to offside, to tackling, everything. But I was forcing circle shapes into square holes by ignoring my gut and sticking to the "original vision" for the genre and mechanics of the game. And, unsurprisingly, that does not lead to good games.

And so I write this article with a simple advice.

> **When you play your game, and you feel something isn't working or you want to do something else, listen to it. This is worth _more_, if you ask me, than "sticking to a vision" or "being confident in your original idea".**

In the end, it doesn't matter how good a game looks on paper, or how well you researched that it ticks all the boxes that the market likes. It matters if people have fun and the game makes them feel stuff. So, surprise surprise, listen to your _feeling_ on the gameplay instead of overruling it with your _thoughts/plan/vision_ for it.

Don't endlessly try to change or improve what isn't working. Cut it entirely and feel the new direction in which your game should go. This doesn't mean that you should never iterate or that ideas should be amazing on the first try. It just means that you should _feel_ that it has potential and it's the right direction on the first try. _Then_ it is worth iterating that mechanic further.

{{% remark %}}
Ever since realizing this, I've noticed it _everywhere_. In all the posts and devlogs I see from other game developers. 

They say "I wanted the game to be X", and then they'll do version, after version, after version of deseperately trying to make that specific vision or idea work. At best they find some twisted version of their original idea that's ... okay. At worst they never find it and, after three devlogs, give up on the entire game because they're burnt out.

It rarely happens that a developer says "I wanted it to be X, but it didn't feel fun, so I cut that and moved towards what I wanted more: Y" Yet those developers are by and large the ones publishing successful games in reasonable timeframes :p
{{% /remark %}}

I completely overhauled my game pretty close to release---which is obviously _never recommended_---but it felt like the right thing to do. And it was. 

To help bring the point home, I'll give some more specific examples.

Originally, players would automatically sub on and off the field. (Again, because I envisioned an IDLE GAME!) 

* They simply used a clear timer (shown to the player of course) for this. 
* While playing, I _felt_ that I just wanted to _keep placing people all the time_. 
* That's why the final game simply cycles through your squad---when you run out of players, they walk back to the bench and you keep going.
* (Funnily enough, the code for this system is completely set up for the first thing ... and now I use a hacked together system for achieving the second one that the entire final game relies on :p)

Originally, I had designed the balance (and some upgrades/systems) to basically be out of your control. 

* You were guaranteed to lose the first match a few times, because you physically needed a few upgrades to be able to win. 
* This is the core of idle/incremental games---if you didn't _need_ any of the upgrades then the whole thing falls apart. Your investment is basically _time_ instead of _skill_. You invest some time and money to upgrade, so you can actually beat some threshold.
* But this did not _feel fun_! In a sports game you want to be _playing the sport_. The game already rewarded you so much for actively playing and making good shots, that players _never_ idled and were understandably frustrated that they could not win on skill alone.
* So in the final game I changed the balance to make matches winnable first try if you just play really well and to make it possible to overcome obstacles without just maxing out those upgrades. Basically, it changed into a regular arcade/action game with an upgrade tree.

Originally, I had designed all the upgrades to move the game towards a state where you barely have to do anything. The squad plays some big match, on a big field, on its own, scoring 20 goals for every goal.

* When I finished this, and wanted to start balancing the final matches, I took one look at the screen and felt completely overwhelmed. It was messy. And I felt like I _wanted_ control and influence, instead of sitting by and watching. I _felt_ like large fields were _too large_ to be any fun because your attention can't be everywhere at once and it just becomes random noise.
* So I made the maps smaller, and smaller, and smaller. I made the squads smaller, and smaller, and smaller. But I still clung onto the idea of moving towards a somewhat passive/idle end state.
* Until I tested it again and saw the exact moment that I _felt_ the game went wrong. The early matches were really fun because every move mattered and aiming well was rewarded; then suddenly matches felt mediocre because nothing really mattered and you were just clicking randomly.
* I _felt_ the game telling me that it wanted to be a quick tactical/puzzle game, where every match (even the final ones) made every click and every shot count. 
* How do we achieve this? I broke the campaign into way more matches, where each match only made a _tiny_ step forward (introduce one more rule, make goals one step smaller, make field one step bigger), which allowed the final match to still be be relatively small and controlled. Even the final match, fully upgraded, keeps the active and tactical element of the game.
  * This also broke another assumption of mine that I subconsciously clung to: that the game should have 8 matches because it simulates the football World Cup. Another assumption in my _head_ that constantly battled my _heart_ telling me that 8 matches is too strict and too little time.

To summarize: I clung so much to the original vision/genre decided for the game that I ignored the gut feeling telling me that it was something else. Thanks to playtesters pushing me to keep working on it, I eventually saw this and released a much better game than I would otherwise have. 

I was shocked how much better the game became with just a few days of minor tweaks and toggles. Because, well, _all_ those little tweaks were finally pushing the game into the correct new direction. When you listen to your feeling of fun and excitement, when you listen to your feeling of at what moments the game works best, every change you make is suddenly a massive improvement.

Of course, listening to your gut has the danger of hesitating, of doubting, of changing course too many times and never finishing a game. I know---I've been there---which is probably why I was "trained" to overrule it with my mind. To pick an idea, make a plan, then stick to it no matter what, otherwise games would never be finished!

But since then I've learned there are much healthier and more effective ways to do this. Namely,

* Paying the price for getting your game on Steam is already a good motivator to finish it.
* Setting a tight but doable deadline as well (on Steam, yes, but also telling others if you can).
* Making a game that you _feel_ in your heart is fun ... is obviously the best motivator to continue work on it.
* Preventing overscoping! The real reason a game never finishes is because you want to do 3 years of team work in 3 months as a solo developer, not because you changed your mind a few times and tried something new.

I wrote another article about how large scope really just means adding too many features that are rigid ("not flexible") and need a lot of work to keep supporting ("baggage dragged with you during the project's development"). You can stay flexible if you accept, from the start of your game's development, that your original vision might change entirely because you feel the game should be something else. If you write code and create art that supports changing course drastically, preferably during the prototyping stage when you're still feeling out the game.

I've already updated my process for the next potential Steam games I'm prototyping. Even though my original notes might have said "incremental game", only a few hours of testing and sketching was needed to update it to "feels better as a roguelike" or "feels better as a smaller desktop idle game".

And now I know, from experience, that you should listen to that feeling :)

Pandaqi






@TODO