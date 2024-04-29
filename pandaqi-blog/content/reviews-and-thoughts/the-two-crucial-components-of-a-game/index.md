---
title: "The Two Crucial Components of Any Game"
date: 2024-12-12
emoji: "💬"
---

Recently, I returned to one of my older games: one of the first that was _generated_ on my website. Both to improve it and to create a few "spin-offs" based on the same idea.

Because I remembered, when I made it, that it felt "almost there, but not really". The game was simple and "worked", but it also didn't. At the time, I had no clue how to fix this or where to even look.

Having gained a lot more experience developing games, I came back and immediately saw the major pain points and possible solutions. 

That realization turned into a longer thought process ... which turned into this article!

## The two components
I realized each game needs two crucial components. Without them, I don't believe any game will actually feel fun and interesting. (They might be _playable_ or _balanced_, but that's not the most important factor. Fun is the most important factor.)

Each game needs a way to **GET INFORMATION** and then a way to **ACT ON THAT INFORMATION**.

It sounds quite obvious, but is very hard to apply in practice. Or, rather, it's easy to _forget_ this and get bogged down in other ideas / rules / mechanics that forget to include these components.

### Information
**Without information,** you have no idea what's happening. You can't react, can't strategize, can't plan (ahead), nothing! Others might be winning, they might be losing, they might have a great hand of cards or a bad one---you literally don't know.

And when I say "without information", really imagine a game that doesn't give you any of this. 

For example, a game where players are dealt cards, which they place facedown before them, and after 5 rounds everyone scores their thing. At no point do you know what others have in their hand or what they have done. You have _no information_. That's not a fun game.

Hopefully, you have never seen or played such a game. I tend to forget how many systems (popular) games have to automatically hand out information all the time. Even the simplest card games force you to play cards _faceup_. Or they add rules about _which cards_ you may play (implicitly telling your opponents which cards you do or don't have).

### Act on information
**Without a way to act,** the information is useless. You might know exactly what your opponents are doing, and the exact way to stop it, but you just _can't do that_! This is not only unfun, it's incredibly frustrating. Games should provide direct ways to _use_ the information to your advantage, to _control_ it.

Notice the distinction between "a way to act" and "a way to act on the information". Even the simplest game has rules about what you do on your turn, so surely you can _act_ in some way. But it's meaningless if those actions don't align with the information you get or need.

For example, imagine a game where you're allowed to see one card in the opponent's hand every round. But there is _no action_ to influence their hand or what they play. Then ... what's the point of getting that information? This is unintuitive and makes you feel like the game just plays itself.

Okay, this is all a bit abstract. Let's dive into concrete examples.


## Example: Swerving Shots
The game [Swerving Shots](https://pandaqi.com/swerving-shots/) is one of my oldest game ideas, even from before I had my Pandaqi website. 

{{% remark %}}
In fact, it might be removed at some point, unless I actually update it to my modern standards.
{{% /remark %}}

It was in the same boat as Kingseat (which is handled in-depth below), and now I believe it was "mediocre" for the same reasons: missing those two crucial components.

In that game, each turn, you ...
* Place a hexagonal tile onto the field. (The tiles show paths, so this is how you "connect" longer and longer paths over time.) OR rotate an existing tile.
* Then place your bullet at one edge of the map.

After every round---each player has taken a single turn---you _shoot_ those bullets. Follow the paths on the map! Wherever they end up ( = shoot out of the map), they hit that player.

It felt, again, like simple and intuitive rules that would make a fun game. But let's check our crucial components.

### Info + Act
**Information:** tiles are picked from a market. So you know the _options_, but have no clue which one the opponent will pick or where they'll place their bullet. There are countless options for that combination of actions. So, when you place your bullet, you're really just making an educated guess about what the players _after_ you are going to do.

**Act on it:** let's say you have the last turn, so all players have already placed their bullet before you. You _have_ information. Can you act on it?
* Yes, _if you're lucky_. If the perfect tile happens to be in the market, or there's one tile you can rotate and it solves everything.
* Once the bullets are shot, they must follow the rules of the game, so their path and the outcome is (mostly) set in stone.

Again, we find a game where you're just guessing at what others will do (out of 100+ options), and then the game mostly _plays itself_.

This feels like a nearly invisible wall. You _feel_ like your game should work, and it _is_ playable, but the real fun factor stays out. And now I believe that happens when one of those components is missing.

### How do we solve that?
Knowing this, how might we go about improving the game idea?

**Reduce the number of options** on your turn. Having 10 options each turn is _more than enough_ for variety and choice. So don't allow picking any market tile and placing it anywhere OR rotating any tile. Put restrictions on it. For example:
* Each turn, you place a tile AND rotate.
* The tiles have some unique element, like a color or shape. You can only place them adjacent to one with a matching element.
* And you can only rotate a tile with a matching element.

If there are only a few tiles in the market, play becomes _predictable enough_ that players can plan ahead and try to play into other player's turns.

**Reduce the number of options for bullet placement.** Now that we have our "identifier" for tiles (such as a shape), we can also limit where to place bullets!
* The bullet also has a shape.
* You can only make it start from a matching side.

Again, this means you have a handful of options for where your bullet starts. Less overwhelming for you---other players can guess what you will pick and plan ahead for that.

**Delay making decisions until you have information.** Instead of doing your turn at once (change map, place bullet), split it.
* First everyone changes the map.
* Then, in reverse order, everyone places their bullet.

Similarly, we can allow decisions _after shooting the bullets_. Maybe you made a mistake calculating the trajectory. As the bullets fly, you realize things are going wrong---you get _more information_ and you want to _act on it_.

So create tiles with splits, or special actions, or other mechanics that allow one or two choices/tweaks as the bullets fly around.

These are simple changes that I came up with in 30 seconds, while writing this. But if I had done this, the game would've been _soooo much better_. Just by picking the two components and really drilling into them, finding ways to constantly _give information updates_ and allow _acting on them_.

## Example: Kingseat
Kingseat is the game I returned to after a year or so. The basic rules are as follows.

* Each player starts with a hand of "votes" (for specific made-up political parties)
* Each round, you simultaneously cast a vote.
* The longest sequence of matching votes (checked clockwise from the King) wins the round. Those votes are scored for the end.
* All remaining players either execute their card's action or swap places.

That's it. That's the whole game. Simple, right? Sounds good, I thought.

And yes, it _does work_. 
* You can act, controlling what you vote and how you respond to not winning the vote.
* Rounds are fast, all players are always active.
* The objective is simple (score the most votes for your secret faction)
* And by swapping places, you can control where your vote sits in the order, hopefully creating the longest sequence at the right time.

But it just _wasn't great_. And now I know it's because the two crucial components were mostly missing.

### Information
**Information:** the only information you get is the Vote from each player, every round. You don't know the rest of their hand. You can't predict their votes in advance. 

But okay, we can fix this with some tweaks. That's what I did when I returned and updated (almost completely redid) the games.
* Actions that allow seeing other player's cards.
* Actions that limit what you may play (or MUST play) next round.
* Or, as I did with Kingseat, exchange cards during setup (give 2 to the right, 2 to the left) so everyone knows at least _something_ about each other's hand.
* When you swap places, you also swap 1 card.
* One of the players (picked in whatever way) must vote first and faceup, so you know _one vote_ (and its position) already.

### Act on information
**Act on information:** this is the more egregious offence. But it's hard to spot or correct while developing, which is why I'm writing this article.

Let's say you just studied another player's hand. You know they have 3 Red votes, 2 Green, and 2 Blue. So ... what?

You can't control what they vote. You have no clue which of the options they'll pick.

If you _studied_ the other player's hand, it means you've taken your action (instead of swapping places). So even if you _did_ know exactly what they were going to vote, you couldn't position yourself to benefit/block it.

I can add all the mechanics or actions to share information in the world---but if you can't instantly act on it, what's the point? The game just isn't fun. 

You're sitting there thinking "well I know this will not go well for me, but there's no way to change it now, so I'll just vote some random thing! Let's hope this game is over quickly and we can do actual fun stuff!"

Similarly, I tried making voting "open" half the time. So you vote in turn, playing faceup, giving you _loads_ of information. This was still unfun, however, because you couldn't _act_ on it.

Say you're one of last few players in a 5-player game. There is already a sequence of 2 matching votes before you, so _no matter what you play_, you won't win anyway. (Even if you create your own pair of 2 matching votes, the other one _comes first_ and actually wins.)

All these tiny things add up to make a game just ... not really fun in the long run. Only giving information but no way to act on it, is like dangling candy in front of your players and then putting them in a cage.

### How do we solve that?
I didn't know. That's partially why I dropped the ideas a year ago. _How do we solve this?_

Now you see why I gave the other example first. Much of the same solutions apply here, and I've come to realize they apply almost everywhere.

**Give players a few options, but not too many.** Actually reducing their options (for Voting or execute/swap) means any information other players get is more reliable and can predict the future better. So ...

* Add a rule that limits what you can/can't Vote _every round_. This is a consistent rule that one can also predict in advance/control for the future.
* Add limitations on when you may execute or swap places. For example, only allow 1 swap per round.

**Less randomness _after_ making your decision.** My testing showed that the winners often won with a sequence of only 1 or 2 cards. This means, in a 5-player game, you have 3 players who can do the action they played OR swap places. 

That's a lot of ... chaos and randomness for which you can't account. Now, when you Vote, you have no idea how the round will play out. Will your action even make sense once you've seen what the others have done!? Nobody knows!

Randomness _before_ acting is fine. Randomness _after_ acting induces that frustrating feeling of being in a cage again!

How might we solve that?
* Rig the game to have bigger winning votes (3+ cards). So that, on average, way fewer players get to do something unpredictable each round. => An easy way to do this is to rewrite the core rule to say "most votes wins" instead of "longest unbroken sequence".
* Split the different phases _per round_.
	* First you Vote simultaneously. 
	* After the reveal, winning votes are scored. (Or maybe even make _this_ a choice, so you can still decide if you want to score your vote _after_ seeing the results.)
	* Then only handle the players who want to _swap places_. 
	* Then only handle the remaining players, who must _execute_ their action. (They now know the final layout for the next round; likely, this is only a single player remaining, so chaos is reduced.)
* Split the different phases _per game_.
	* Instead of picking your Loyalty at the start ( = if that faction has the most votes at the end, you win), pick it at some other moment. Or just say: "Your final card is your final bet." This allows you to constantly _act_ on what happens in the game by changing whom you're going for.
	* Instead of counting votes all the way at the end, count them regularly and have that result influence the game.

I'm not saying I did (or should do) all of these things. But they're clear, simple ideas that directly tackle the core issue here. It's what a game usually needs to be fun, instead of endless extra actions/cards/tokens/whatever.

**Information shouldn't be given out all at once at the start.** My original solution for Kingseat---trading some cards with neighbor players at the start---isn't the best because it only happens during setup. 

Instead, I now feel good games should _continually_ update your information. It's easier to remember, the info is always more up-to-date, and it gives a better sense of momentum and constant progress.

* Include Actions that allow you to see other player's hands. (Though I've also learned that _swapping_ cards is stronger than looking, because you actually change your hand + don't need to remember what you saw, because you actually _have_ the card now.)
* Instead of starting with all your Votes, collect them as you go.
* Or start with some facing outwards (they're public info and only 1 of them flips back to secret each round, allowing you to vote with it).

All of these ideas would already improve the game. Now it was up to me to pick the right ones (that had the biggest impact), while keeping rules simple and the different Throneless Games (the overarching project of which Kingseat is just one game) unique.

I spread out most of these across the different versions. The simplest version does the bare minimum (to, well, keep it simple), the most complicated version chucks in a lot of these balancing factors (through the use of randomized Thronecards each round).

If I were making just a single game, I'd make many of the tweaks expansions or variants. Ways to change the game to suit _your group / your players_ as well as possible. Because even the best efforts from me will not make a game the most fun or intuitive for _all possible human beings_.

## Conclusion
Once you look for it, you'll probably find this in all good games. In their core rules, in the subtle details, they make sure you are always able to _get information_ and then _act on it_. 

The actions are rigged so that players must always give away more information for the greatest rewards.

The gameplay is split into phases so you can still act or course-correct on whatever the previous phase did.

The options available to any other player are manageable (<5 or <10), so any information about them will actually help you think ahead and predict the optimal path to victory for you. Too many options make it completely impossible to act on anything; too few obviously mean you can't act at all.

The information-gathering actions (or phase, or mechanic, or whatever) is always _before_ the acting phase. Similarly, randomness happens while you get information, not after you've acted.

The specific actions you can do _directly_ feed into the information you're getting about the game state. Don't do: "each round, reveal your highest card---then you do something unrelated, like roll the dice." Do: "Each round, roll the dice. Then the player with the highest card is allowed to pick one dice to reroll."

Information > Act on information. That's the feedback loop that seems to power most fun games. Make this cycle clear and direct, as tight and fast as possible, and it will repeat the fun experience until the end of the game.

Without that, you can have a game that's playable, or feels balanced on paper, but just doesn't turn out _fun_ in the end.

At least, those are my thoughts at the moment.