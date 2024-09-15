---
title: "The Luck Legends"
date: 2025-11-26
emoji: "🎲"
thumbnail_media: "the_luck_legends_header.webp"
---

Welcome to the devlog for my project called [The Luck Legends](https://pandaqi.com/the-luck-legends/). 

As usual, this project contains multiple games that all revolve around the same core mechanic or idea that I came up with. This general devlog talks about the general approach, with a summary about how each game came to be. For more details, it links to the actual full devlog of each particular game.

## What's the idea?

So, I've been making free print-n-play boardgames for a while now. This taught me a thing or two about what people want or how to improve the experience.

I find it really important that my games are as cheap and practical as possible. I come from quite a poor background, so I don't want to assume that everybody has ink to spare, or copious table space, or lots of extra dice or other material just hanging around.

I want my games to be fully _printable_ with no other requirements. This meant I ran into the same issue time and time again: _dice are a really useful component for board games, but I can't assume people own the dice they need for my game idea!_

At first, I basically discarded any game idea that required dice. Then, a few weeks ago, I was going over some new ideas of mine and watched a how-to-play of another board game ... and it suddenly clicked.

**We can _simulate_ dice with a _deck of cards_.**

Instead of rolling the dice, I can just ...

* Give players a deck of cards, numbered 1--6
* Shuffle
* Reveal the top one

It's functionally identical, but now people only need to print+cut a few simple cards.

Not only did this open up some game ideas I'd dismissed, this led to the realization that this is **even more powerful than dice**.

* We can grow/shrink the deck to create dice with a different amount of "sides".
* The cards could contain other properties, creating completely custom dice.
* And all of this can _change during the game_.

Any game idea that'd typically use dice for something, could now use this new approach I'd come up with, _and_ improve on it by creating custom and ever-changing "dice" as you play.

This felt so simple yet powerful, that I had 8 ideas for games written down that very same day. (I even had some ideas for standalone games and another series, so it was quite a productive day in terms of board game brainstorming. Surprisingly, I was very _tired_ the next day :p)

Everyone knows the game (Settlers of) Catan. What if we could create a simplified version of it, replacing the dice by my new "shuffle-and-reveal" mechanism?

There's the game of Risk. There's a legion of roll-and-write games or push-your-luck games that I could create now. And so forth.

## How do we start?

Now, having 8 separate game ideas is quite overwhelming. I knew I shouldn't make or explore them all at once.

Instead, I tried to _sort_ them by complexity, and start with the easiest one first. Especially because some of the more complicated ideas are basically "combinations" of the simpler ideas. This way, I can "work up" to the more challenging projects by exploring the individual mechanics first in simpler games.

{{% example %}}
I had an idea about _customizing_ your dice as the game goes on, and a separate one about rolling a _shared_ die for all players. Those are very basic ideas. But we can _combine_ them into a game where everyone _modifies_ the same _shared dice_ all the time. Obviously, I'd make that latter game---which is more complicated---last.
{{% /example %}}

At the start, I saw the following truly unique paths to explore.

* **PvP** (_Player versus Player_): all players have their own die. You pick another player(s) to battle with: both roll, highest/best result wins.
* **Contracts**: you have random goals to achieve, and try to customize your dice or pick results to do so. (For example: a card that says "roll 3 times with no duplicate numbers".)
* **One Paper Game**: everyone has their own paper on which they can cross off dice results, trying to complete sequences or whatever to get the most points. (Similar to games like Clever.)
  * This might also be called **Dice Selection**, where dice are rolled for all and you merely want to select the best die result for you that round.
* **Randomization**: the dice are merely a secondary randomization tool to an otherwise non-dice game. (Such as Risk only using the dice to resolve combat, but everything else doesn't use that randomness factor.)
* **Deck Breaking**: you have a larger deck of cards, but must _break_ them into individual dice strategically. (So, smaller decks that are rolled independently.)
* **Dungeons & Dragons**: the player dice represent certain stats (strength, cunning, etcetera), which is mostly used in a cooperative way to overcome certain challenges.
* **Resource & Customization**: you simply get the results of your dice roll, which are resources that somehow feed back into customizing that die.

I'm certain that some paths will turn out more viable than others. And while working on games, you always discover new ideas and what something truly needs to shine. But this was the initial list I wrote down that first day, which spawned those initial 8 game ideas.

I've also learned that almost every game idea can have a "kids version". A version that has no text and such simple rules that even young kids can instantly play.

That's where I wanted to start. What's the absolute simplest way to use this "dice simulation" mechanic? Without relying on text or math?

## Champions of Chance

Because it's such a simple game, it has no real theme or flavor to it, which is why I decided to use one of the more generic names for this one: _Champions of Chance_. (If there _is_ a clear theme or more specific vibe, then I can also do a more specific and creative title.)

Your dice are literally numbers 1--6. 
* Each round, you simply pick "highest" or "lowest", then battle another player. (By shuffling your deck and revealing a random card.)
* Whoever won that challenge gets to discard a card. First to run out of cards wins. (So winning a battle gets you closer to winning the game. But you also lose your "winning card", so you can't just keep getting lucky by rolling that good card lall the time.)
* If tied, swap 1 card with a new one from deck. (This is always good to do with ties or stalemates, because if you don't change your hand, then the tie becomes an endless loop that never resolves!)

When testing this proved slightly too simplistic. You still had a big advantage if you started with loads of 1s and 6s. The opponent of your battle was a bit helpless.

So I added two more tiny rules.
* The opponent picks the _number_ of sides of your die. (So if they say "3", then you must select only 3 of your cards and roll with that.) This asks very interesting questions of both players, but mostly puts pressure on the active player initiating the battle. Because the number is stated _before_ the decision of "highest" or "lowest".
* Cards also show a number of icons that is their "score" at game's end. Midrange numbers, which are less likely to win battles, have a bigger score if won. (This problem is also softened by tied battles allowing you to swap those cards away.)

I also added some light expansions/variants to make it a bit more strategic and varied. But this was supposed to be the absolute simplest game---your introduction to The Luck Legends---so I forbade myself from overthinking it.

These rules are literally half a page and quite intuitive. The material needed is just 3 or 4 pages of simple numbered cards. I saw this as the clear first one to make.

Click the link to read the full devlog: [Champions of Chance (Devlog)](/blog/the-luck-legends/champions-of-chance/).

## Lucky Lions

This was my second "kids version" idea. Instead of using numbers, let's use only _(animal) icons_ and provide some sort of rock-paper-scissors relationship.

Like the other game, this one was initially "too simple".

* There are Zoo Cards that show: Animal A > Animal B > Animal C > Animal A.
* Select 1 Zoo Card for your turn/battle.
* Pick an opponent, roll your die, the better animal (according to the Zoo Card) wins.

With these rules, your deck never changes and the randomness is too much. You literally have to get lucky with the available Zoo Cards _and_ your starting hand _and_ whatever you roll.

But it wasn't all bad. The cyclical relationship means that no card is inherently "better" than others. And you really have to memorize what other players (are likely to) have, to pick the perfect opponent for this particular battle.

We just needed some _tiny_ extra thing. With no text, numbers, or complicated icons needed.

The answer, again, came from how to handle _ties_.

> In case of a **tie**, one battler must discard a card and the other wins the Zoo Card. The active player decides who gets what.

Having fewer cards is an advantage, as it reduces randomness from your roll. But is it a big enough advantage to give the other player the points? Not sure. Interesting decision! (I just need to make sure that, statistically, ties don't happen too often.)

Click the link to read the full devlog: [Lucky Lions (Devlog)](/blog/the-luck-legends/lucky-lions/)

## A Little White Die / Deceptidice

This was my third simplest idea, based on the general idea of **Liar's Dice**. As I researched this, I stumbled upon a two-player variant inspired by _poker hands_ or _common hands_, which is how this idea turned into _two_ simple ideas.

As usual, I don't intend to just simulate or copy existing games 100%. What's the point? Instead, I wanted to use the special advantages we have now that dice are cards.

Below are the general rules of Liar's Dice.

* Everyone has their own set of dice and a cup. We roll simultaneously.
* The first player starts with a bid about how many dice there are of a certain type _across the entire table_. ("There are five 3's.")
* In clockwise order, players must either make a higher, riskier bid ("There are six 3's") or call the previous player's bluff.
  * The most straightforward rule that I've learned is to say that every bid simply has two numbers (_how many_ and _which dice face_), and a bid is higher if at least one of those numbers is higher.
* If you're right, the bluffing player loses a die and starts next round. If you're wrong, this happens to you.

Simple, effective, I like this game. So I thought: how could we use our cards to add just a little twist or two?

* A wildcard number.
* The starting player can tell everyone else how many dice to use (must be at least 2). If they say "3 dice", then players must break their deck into 3 parts (however they want) and roll those separately.
  * _Why_? This gives losing players more control and strategy to get back, as they can pick numbers favorable to them.
* Special action cards, such as one that "adds the number 7" (to all dice decks). When it's your turn to bid, you may _choose_ to trigger that action if you have it.
  * _Why_? By revealing it, you give other players more certainty about their bids and what's on the table (which is bad for you). But you might really want that action!
  * _Why add higher numbers?_ Simply to allow bids to get a little more wild/go on for a little longer as the game progresses, moving towards a nice climax. Otherwise, if you keep playing Liar's dice until only one player remains, those final rounds can become very boring/stale/predictable.
* If you "lost", you lose all cards of the smallest dice you threw.
  * _Why_? This, again, makes that decision of "into how many dice do I want to break my deck?" have meaning. You can make it more unpredictable for other players by using _large dice_ ... at the cost of potentially losing _a lot of cards_.

That worked! The material was just simple numbered cards, with a few actions thrown in. I capped it off with a simple rule about bidding on the number of special cards too. ("You can always raise a bid by bidding on how many special cards there are, as long as your number is equal to or higher than the previous bid.")

A very simple game that nevertheless turns Liar's Dice into a different interesting direction.

Click the link to read the full devlog: [A Little White Die (Devlog)](/blog/the-luck-legends/a-little-white-die/)

The other idea was basically a variant of this that was _slightly too different_ to merge with the other game.

* Cards have numbers and colors ("suits" if you will).
* After rolling (individually, hidden, simultaneously), you claim a certain combo (inspired by poker hands, such as "a pair" or "a straight").
* You keep claiming higher combos until someone calls your bluff.

The only issue here is that people always forget poker hands and how they're ranked. Is a straight higher than a flush?! And which of the two was in numeric order again!? Additionally, if playing with more players, any combination is far more likely to appear, which makes the game hard to balance for different player counts.

As such, I decided to simplify that. (In fact, I modified it to a laughable extent, yes, but simpler is always better).

When bidding, you can bid on NUMBER or SUIT. 

* You say _how many_ cards are in the combo.
* You say whether they're the _same_ or in _numeric order_ (in case of numbers).
* Optionally, you say a _specific_ suit or number.

For example, you can state "5 dice of the same suit" or "4 dice in numeric order". More cards is a higher bid. If you make it _specific_ it's always higher than vague: "5 dice of Hearts" is higher than "5 dice of the same suit".

This covers _most_ poker combinations in a much more freeflowing way where you can always go higher in your bids.

Just to get the full experience, I added an expansion that adds "special cards" showing very specific bids. You may only bid that if you roll that exact card. That's ideal, because you rolled it ... you can just read the bid instead of having to memorize it. Special bids have their own numbers and they must simply be higher than the number of a previous special bid (if it exists).

This, too, requires just a deck of cards with numbers and suits (really just _colors_). I think the most time-consuming aspect of these projects was finding the right numbers to get nice probabilities, because only including numbers 1--6 (and every suit loads of times) isn't great here: it makes most combos perhaps a bit too likely, and others too unlikely.

As usual, this is a mix between paper prototyping and writing a quick simulation to play thousands of random rounds and tell me how likely combinations are.

Click the link to read the full devlog: [Deceptidice (Devlog)](/blog/the-luck-legends/deceptidice/)

## Folly & Fortune

The idea behind this game was basically "what if we go in reverse? You start with a large die, but it only shrinks over time."

This quickly turned into a more specific implementation: "What if the card you rolled became _permanent_ every time?" 

In other words, you roll something, that card is now _removed_ from your die and becomes a permanent part of the board or your personal area or whatever. This automatically creates a nice and clear trajectory for a game.

* Start with all your cards.
* Lose one every turn.
* Until everyone has lost all their cards.

Of course, this is useless if the _order_ of losing cards doesn't matter. It should, somehow, be important _when_ a specific card becomes permanent and leaves your dice. The second rule of this idea immediately became that you **placed cards in a row**, and the order/direction (left to right) was crucial.

After some more brainstorming and testing, I arrived at a specific ruleset that I thought was simple yet effective.

* So, cards are placed in a row before you.
* You may (re-)roll as often as you have cards before you, while keeping track of how often you've rolled now ("counter")
* Why? After every roll, the card at position _counter_ determines some special effect or rule that applies to your roll.
* (Which is why the rule quickly changed to allow placing your new card either at the _start_ or _end_ of your row, to give you more influence over that fixed order.)

For example, the first time you roll, the special power of your _first_ card applies. The second time you roll (that turn), the special power of your _second_ card applies. And so forth.

The special powers of the cards might be simple things like "deduct 3 from your roll" or "if you roll higher than 4, your turn ends (no more rerolls)".

I thought this would balance itself: if you get a bad result, you _can_ roll more often. But ... this might mean rolling with some really bad special power at the end of it, adding a risk/reward system. Are you satisfied with that 3? Or do you want to try for higher, at the risk of getting 0 instead?

But what would be the objective? How would you actually _use_ this? Well, the simplest thing seemed to mimic a simple "attack/health" pattern.

* Whatever your final value, that's the damage you do to another player. (For example, you rolled a 4, the special power subtracted 2, so you now attack with strength 2.)
* Cards have health. If your damage exceeds a card's health, it's removed. (For example, that other player has a card with Health 1. Your attack is stronger, so remove that card.)

It seemed a very simple, streamlined way to close the game loop. You want _more cards_ so you get more rerolls; others _remove cards_ by attacking. All in all, the game just needs a tiny deck of cards and that's it.

Of course, if players keep adding and losing health, we can't end the game based on that. (If we say "the game ends when somebody has 0 health", then this can happen in the very first turn of the game. If we say "the game ends as soon as somebody has 10 health", we might never reach it, because players keep losing health before they get there!)

Instead, the simplest solution was just to make the game end once somebody has no die left. (They've made all their cards permanent at some point.)

The beauty of the system is that this _doesn't_ mean the very first player, and it _doesn't_ mean all their cards are before them now. Because you lose cards from attacks, and you might lose/gain cards from those special powers.

I don't really have a word for it. But the more I've designed games, the more I instinctively invent mechanics that follow very simple consistent rules which _also_ allow variation in every aspect of the game. In this case: your turn always executes with the same simple rules (roll, check special power, until you decide to stop and attack), but everything else can change for a myriad of reasons and give you a new challenge each time.

Anyway, one of the simplest games, which is also very well suited for playing with kids/large groups/casual gatherings, so it was one of the first I made.

Click the link to read the full devlog: [Folly & Fortune (Devlog)](/blog/the-luck-legends/folly-and-fortune/)

## Tossing Tiger, Rolling Dragon

The title of this game is a play on the movie _Crouching Tiger, Hidden Dragon_. As usual, my ideas start with bad pun titles and I work my way forward from there.

Luckily, this one came together quite easily. The theme of martial arts made me think about auto-battlers (and rock paper scissors, again).

* Two players prepare a row of instructions or attacks.
* Then you simply execute the "battle" by stepping through those attacks in pairs, checking who wins each time.
* Until whoever won the most attacks wins the entire battle.

Instead of _numbers_ (or colors/suits) on your dice cards, I decided to switch it up and try **completely custom cards**. In other words, the cards in this game don't have numbers or some intrinsic order (of "high" and "low").

Instead, the deck consists of multiple different **attacking / defensive manoeuvers**. Or just "offensive / defensive moves", I guess.

Everything is strong against one thing, and weak against another. A kick might do a lot of damage against some non-defensive move, but if the opponent rolled a hook, they grab your feet and you damage yourself with your kick :p

At least, that was the idea.

* Players build their decks with moves.
* On their turn, they split that deck into smaller dice and roll them all. (You may look at what you put inside each die!)
* Then you and your opponent reveal, and you compare each set of dice (one from you, one from the opponent, next to each other) to see who wins.

At first, I wanted to only reward you for winning the _entire battle_. In practice, however, this made it very unsatisfying if the battle was close, and it made you feel as if you were powerless or parts of a battle were "worthless". (Maybe you already know you had lost after 4 checks, so why even do the remaining 3?)

I changed it to be more granular.

* For every battle you win, you grab 1 card from the dice the opponent used. (If it's very close, both players will walk away with _some_ reward or change from that event.)
* But for winning the _entire battle_ (majority of pairs go in your favor), you get an extra bonus: you grab/win _one entire die_ from the opponent. (You get to decide how many "dice" to break your deck into. So you have full control over risk/reward here.)

I knew this was a strong setup for a game, but I also wrote down a note (before going to bed) that I needed a few things to spice it up: "WE NEED simple ways to customize your deck + restrict what the opponent can do + provide limited choices _while_ auto-battling."

The next morning, I researched simple ways to include this.

* CHOICES = some cards simply have a special way of resolving their battle that still gives you a choice. 
  * (For example, a card that says "If you think you will lose the next battle, retreat and skip over it." or "You may purposely lose this battle to pretend you won an earlier one.")
  * At this point, I started using the distinction between "battle" (comparing two dice rolls) and "war" (the entire collection of fights this turn).
* RESTRICT = you already restrict the opponent somewhat by picking the number of dice. But let's kill two birds with one stone and use special moves for this too: "The attacker may decide to play a faceup card for the very first battle (instead of rolling a die). The rule of this card will be true for this entire war."
  * There are only a few cards that even have an action to restrict the entire war, so this can't be overused.
  * At the same time, giving away this information basically assures your opponent will win that first battle, giving them a pretty big edge. Balanced, I hope.
* CUSTOMIZE = when "grabbing" a card, it doesn't just automatically (always!) go into your hand. Instead, for every card won during a war, you may decide to discard it instead.
  * This is a very simple way to keep your deck the size you want and be somewhat in control of _what_ cards are in there.

I liked this, which is why this was also one of the earliest games I made, despite requiring a bit more illustrations/work by me.

The entire material consists of the same "martial art moves" (which are just animals in funny positions on cards). Yet with that simple core, we get a lot of interesting and tactical battles, with the randomness of dice rolls thrown in. Because most animals use that rock-paper-scissors cycle (they're strong against A, but weak against B), your starting hand is never "better" or "worse" than that of another player.

Finally, I added a slight variant that allows simultaneous fighting: one team against another, everyone is always active. I know that some people, especially young children, benefit a lot from a game that's not turn-based but that _always_ keeps their attention and allows them to do something. I also know that this isn't the best version for this particular game, and requires some extra rules, which is why it's _not_ the base game version.

Click the link to read the full devlog: [Tossing Tiger, Rolling Dragon (Devlog)](/blog/the-luck-legends/tossing-tiger-rolling-dragon/)

{{% remark %}}
One thing I'm glossing over at this point is the fact that the issue of "too much randomness / too little strategy" is automatically mitigated in all these Luck Legends games. Because the more turns someone takes---the more they roll their die---the more information you have about what they have exactly. As such, over time, as the number of cards grows larger ... you also have a much clearer idea about what every opponent COULD roll, and how LIKELY that is. As such, these games don't really need extra rules or mechanisms to fight "too much randomness".
{{% /remark %}}

## Chaos Contract

This is the final game I made for the "first set". 

I try to pace myself and not go head-first into creating 15 games for a series all back to back :p So I chunk them into 3--5 games, then I leave the project for a year and come back later with fresh eyes. That doesn't mean those other ideas aren't there yet---most of them have a solid set of rules or ideas already---but I'm just not actually fully developing them now.

Anyway, I originally planned to do this one as the third of the series. It's one of the absolute simplest ideas.

* There are "contracts" on the table stating some challenge. (Example: "Roll higher than a 5.")
* On your turn, you pick one, roll your die, and if you pass the challenge you win the card!
* First to X cards wins.

That's it! Extremely simple, I could generate the exact challenges on the fly (from a large array of options/possible values), what's wrong?

Well, I already made 2 "contracts"-based game ideas recently. (One a few months earlier, one literally two weeks earlier.) I didn't want to do it all again, so I wanted a bit of extra time to get fresh inspiration on how to do it _differently_ this time.

Eventually, I found that in two things.

* The other contract games had a far more rigid structure. (One generated them dynamically, but from a tight template. The other had all contracts already locked in.) For this one, I wanted to **generate them as cleverly and freely as possible**: using templates for challenges that I could _chain_ or _combine_ or _invert_ in any way I wanted. 
* To make this _possible_ though ... we need to allow **tackling a challenge with multiple players**. (If the challenges are this random and unpredictable, it's highly unlikely players will regularly pass them on their lonesome.)

That's where the game title eventually landed: most of this game is about "entering a chaos contract" with one or two other players.

* You're eyeing a contract with juicy rewards, but it has ridiculous requirements. 
* So you ask another player to roll their die too, and another, adding your values together.
* If you succeed, you share the spoils.
* If you fail, you share the burden.

This automatically made the game semi-cooperative. Everyone is always engaged, because everyone might be asked to assist (and be rewarded) at any time. There's a nice risk/reward tug-of-war again, with players only being able to go for the highest scoring contracts if they take on risky outsiders. The exact contents of your die really matter, because other players _know_ what you can or can't do for you, and will ask or ignore you based on that.

Very interesting; still not easy to execute. What would the reward/penalty be? How to scale it properly with player count? Eventually, it came down to one very simple core rule.

> The reward/penalty of any card is always multiplied by how many players participated.

For example, say a bid card has the reward "+1 hand card, +1 scored card". If you pass it on your own, you get that and you're done. If you asked another player to help, you know have +2 hand cards and +2 scored cards to distribute. You decide how to do that---maybe you want the 2 scored cards, or none at all, or you share it evenly, whatever!

This way, all these values kind of balance themselves. Because players _themselves_ are in control of how much they get or give away, and they'll modulate that based on the current standings of the game.

(Same with penalties, of course. If the penalty is "-2 hand cards", and you tried with 3 players but failed ... you now have 6 hand cards to throw away. Your choice who loses how much. And if you make that choice too selfishly, that will probably come back to bite you later in the game ...)

The specifics of the contracts are explained in more detail in the individual devlog. Because that's where all the magic and gameplay lies, in the end. Just raw numbers or really simple contracts ("roll higher than 4") weren't interesting enough.

Click the link to read the full devlog: [Chaos Contract (Devlog)](/blog/the-luck-legends/chaos-contract/)

## Intermezzo

Going away for a while, doing other projects, tralala, nothing special to mention here.

I'm very much a person who focuses on one thing and one thing only, so it's not like I regularly returned for some notes on this project in the meantime. I _do_ expect my brain to keep thinking about stuff in the background, though, so that I have some surprising, new, fresh ideas when I come back. (For seemingly no effort.)

Let's see if I was right ...

## Desertdice

@TODO

(I already uploaded this devlog so you could read about the earlier games. I'll simply update this section once the next games are underway/done.)

