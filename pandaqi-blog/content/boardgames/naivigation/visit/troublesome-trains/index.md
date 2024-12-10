---
title: "Troublesome Trains"
date: 2025-10-26
emoji: "🚂"
thumbnail_media: "troublesome_trains_header.webp"
---

Welcome to the devlog for my Naivigation game [Troublesome Trains](https://pandaqi.com/naivigation/visit/troublesome-trains/). 

It will be short and only talk about _that specific game_. Read the overall, general devlog about the project here: [Naivigation](/blog/naivigation/project/).

## What's the idea?

In this one, as expected, you're moving a train together.

Despite this idea being the most "unique" and "experimental" of all the major Naivigation games, I struggled less with it than the car variant. Perhaps because I _knew_ it would be radically different, so I'd set my expectations (and mind-set) properly.

Why? In this version, you don't move a train together. No, you **control the rail network** together (which move **multiple trains**).

## The general rules

This means we needed a few components to actually move trains.

* Train Pawns that are on the board.
* A Train Tile that indicates whether "moving" the train means going forward, backward or standing still. (A train, in this game, is moved by receiving electricity from its wires, so this card simply "applies electricity". It's not actually a train engine doing anything.)
* A Switch Tile that indicates which direction to take when you have multiple options. (So when a train leaves a "switch" with multiple branches, where should it go?)

This adds an extra step to setup and a few more tiles on the table. But it really isn't that bad, because in return we get a very simplified game loop that should work.

* Your goal is to deliver each train to a matching station. (So Blue Train to Blue Station, etcetera.)
* Your Vehicle Cards simply modify these three things.
  * Electrify a specific train to move it.
  * Change the Switch Tile. (It shows icons; the one on the top is the direction you must take at a crossroads.)
  * Change a Train Tile (to switch between forward/backward/do nothing)

Even better, we can now add a lot of _choice_ to these cards.

* Rotation can be anything, so you can change the Switch/Train Tile as much as you like, or not at all.
* The Electrify/Move card can show _multiple colors_, which allows you to decide which to move. (I briefly considered allowing you to move _all the colors_, but that just makes rules about collision and handling special tiles and stuff _really annoying_, so I skipped that.)

To stay consistent, we can just stick to 5 colors---5 trains to deliver to win the game.

Colliding is bad.

And that's ... it?

That actually simplified the rules to something very neat. I am still keeping this game as one of the harder ones, however, because of how hard it is to _win_. To wrap your head around modifying rails to send trains in the right direction, as opposed to steering the train.

## Expansions & Spice

As usual, I want to "spice up" the idea with expansions, as well as add some ideas too complicateed for the base game.

For this game, however, I'd thought about the core game for so long ... that I had no ideas for expansions yet! Not a single note about something that might be useful. 

The more I considered this, the more I realized this was inevitable. The core of this game is a bit more "niche" and "specific" than the other games, which makes it _harder_ to just tack any expansion or extra mechanic _onto_ that. It's harder to change a canvas that's already mostly painted as opposed to one that's mostly blank.

What could the expansions even do?

* Different rails?
* Different sights to see as you pass by?
* Different types of trains?
* Sections with a "railway crossing" and you're obviously not allowed to run over people crossing there? :p

None of that really felt usable. Adding many different Train Pawns would turn the game into something else entirely, losing the cohesive Naivigation core. It would turn into a much heavier game with more material than I want.

Different rail types also isn't something that happens in the real world, and I struggled to find suitable "special powers" for it. I _could_ make certain rails move you "twice as fast", and other rails only allow "trains of color X/Y". But does that add enough? Is the complexity added to the game/rules creating enough new fun/strategy?

Having cargo or passengers doesn't work here either. Because it's not _one vehicle_ like the other games, which means it would be a _mess_ to figure out which passengers/cargo belonged to which exact train, and it's just not great.

And what "sights" could you see? "Hey, another forest?" "Woah, a city skyline." What could it add?

In the end, the only expansions that worked for me became a wholly different _type_ than the usual expansions.

* One that adds a "Leading (Train) Car". It doesn't collide with other trains; it just attaches to them and pulls them along.
* One that adds a competitive mode. Now that we have multiple trains, well, players can just pick one of them and try to have them finish first!
* One that has _moving_ obstacles (animals that hop around; this is fitting and cohesive for a game about _moving_) that travel via railway crossings. And yes, you don't want to hit those. Those moving obstacles can now _double_ as sights to see.

Once I actually made these ideas _concrete_, turning them into the specific cards/actions/material needed, I saw that I actually had enough to make them worthy expansions. So I was fine with that and went ahead with this list.

## Let's make that!

### Time Skip = good?

The making of this game was a bit messy. It was a period when I had absolutely no energy or motivation, while circumstances forced me to move around a lot and lose access to electricity/internet/my device. As such, I wasn't able to keep a clean devlog of the process for a bit :(

Instead, we pick up this devlog once the graphics and generation code are all (mostly) done, and we're working towards "100% finishing" the game.

While finalizing the game, I always get a few ideas for massive improvements. Seeing the final tiles, making the final rules as specific/tight as possible, it just brings out a few things you never saw before.

In this case, the biggest realization was that we **don't need the Train Tiles!**

When I wrote the rules, I basically imagined that it would be _rare_ for the train tracks to split and force players to make a choice. I added the "Switch Tile" to control which way to turn on 4-way crossroads, but otherwise, the Train Tiles determine how you move (over straight and corner tracks).

Well, that was stupid!

When I actually drew those tracks, I realized that actually _most_ of the tiles (at least at the start of the game) would split the tracks. And I realized that it looked silly if only a few of them showed the switch symbols, but the others did not. 

I had needlessly complicated the game by splitting movement into two different situations. ("Railroad splits? Do X. Otherwise? Do Y.")

Instead,

* I simply added a "Switch Symbol" to every track end. (So, every tile shows a Circle or Square or Triangle at the edge. These same symbols are shown on the Switch Tile.)
* When moving, you simply **go in the direction of the Switch Tile symbol**. Much simpler, much more useful, _always true_.
* In many cases, this symbol won't exist _or_ multiple will match---this is fine, because then you just fall back to the situation of "you choose!" which is _similar_ to having no Switch Symbol at all on straights and turns.

This allowed removing a _bunch_ of paragraphs from the rules, and some material too, while actually making the game easier to understand and play.

Similarly, I reduced the number of "rail types" from 6 to 4. Having 6 different colors for tracks is just overwhelming. Especially when, in the base game, they are all _the same_---their special powers are only expansion material. 

{{% remark %}}
I also did this just to save myself some illustration work, to be honest. But this is why I always say: all humans are lazy, you just need to use it to your ADVANTAGE!
{{% /remark %}}

These rather simple changes made the game so much cleaner and more streamlined. But I could only see them once I was nearing "final" material and rules.

Also, I moved the original rules (with some tweaks) to an _expansion_. In case people want to play the harder and more "realistic" movement type. Mostly, though, I will reconsider this system and find something better for when I create another Naivigation game around trains/tracks.

### Final Material

Below are images of the final material. I must admit being quite tired from drawing similar things for all Naivigation games, so the collectibles are less detailed/unique here than in other games. The railroad tracks, though, received some more love because I knew how crucial (and omnipresent) they'd be. These are my prettiest board game tracks I ever made :p

@TODO: IMAGES (final material)

## Conclusion

When I started this game, I "knew" it would be the hardest one. Take the longest to play, require a few more minutes of explanation, require some real number-crunching and planning ahead to even get _one_ train where it needs to be.

After working on it, though, using lessons learned in the previous 4 games (or 7, really, including other minor games I've already done), I iterated and iterated it into something quite simple? The rules are actually shorter than some other games. The fact you're moving multiple trains makes the game easier in some parts, because players can "own" a train for a bit (they are the only ones to move it for a few rounds, giving them a lot of control). Some players really _like_ this and prefer this game over the others for that reason. 

Perhaps this is a more "friendly" version of a cooperative game. The cooperation isn't _always_ needed, to the point you need to memorize what two other players have in their hands to move without crashing. Instead, people can mostly do their own thing, move the train with their favorite color, _until_ they need help or are at risk of _colliding_.

Additionally, just before creating the "final" PDF of the rules and calling it done, I realized an obvious way to simplify a first game even further: just leave out some trains! Because you don't have a single vehicle, but five, you can just _use only three of them_ if the game is too hard at first. 

With that note added, I think the game is actually one of the easier ones to learn and play. But not to win :p I think this game is most likely to be _hated_ by some, but _loved_ by others. It's just so unique and provides such a perfect "blend" of cooperative play and personal play.

With that, the five Major Games are done. They provide really distinct ways to play the same idea: move a vehicle together. They are all really simple and reuse the same material/rules, without becoming repetitive or feeling samey. Especially this train game forced me to stretch my understanding further, but that was good. I was a bit stuck trying to find "cool new movement ideas" for minor games, _until_ I made this game and realized I was thinking far too narrowly. Once this game was done, I suddenly had 50 different ways you could do a Naivigation game in the future!

Until the next devlog,

Pandaqi