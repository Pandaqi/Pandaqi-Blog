---
title: "Keebble"
date: 2023-02-18
emoji: "📔"
thumbnail_media: "keebble_header.webp"
---

Welcome to the devlog for my word-based party game [Keebble](/keebble-games/spell/keebble/) This is a short article about the creation process: what problems I faced, how I solved them, and other interesting tidbits I wanted to share.

## What's the idea?

I like Scrabble. Most people like it and know it.

But there are some downsides,

* You have to buy the game
* It comes in a rather big box
* It takes quite long to play, often waiting forever on your turn
* The board and letter values are always the same

For example, you _can't_ completely figure out your turn in the downtime. Because somebody else might place a word precisely where you wanted to place it. In fact, this happens often. Which means people just wait on their turn, then spend ten minutes trying to find the absolute best word.

I wanted to solve that. I generated three ideas that evening, of which this was the first and the easiest to execute.

How would I solve these "issues"?

* A free game you can play with pen and paper. (I already invented the One Paper Games for that!)
* The board is smaller and turns are interactive: you all do something at once
* Boards can be randomly generated (by my website), or vary through smart rules

With this idea---rules no longer than a few paragraphs---I started work.

## The name

Word games always have such stupid names, especially those on mobile. Like, "Words with Friends". Isn't that the most unimaginative name imaginable? :p

That's why I _adore_ the name Scrabble. It's fun, it's unique, it's easy to pronounce. (Even though it has nothing to do with the game itself. It's an uncommon variant for "to scrawl or scrape".)

So I wanted to do a parody on that. To me, Scrabble read like "Scrap + bble". So I just took the opposite of scrapping: **keeping** or **preserving**.

Five seconds later, Keebble was born. A nice name, not used by anything, fun to say. It also sounds a bit like "to kibble". Which is the main activity when playing scrabble: kibbling over whether something _is a valid word or not_.

## How to play Scrabble with paper?

The general idea translates well.

Instead of _placing tiles_, you simply _write the letters_ in cells on the board. (Cells are easily created by folding the paper a few times. I've done this for earlier games and it's great.)

Tiles are never removed or changed after placement, so this works. Written letters are obviously just as permanent.

But the details need more work.

* Hands are _hidden_. We can't do this. The paper is visible to anyone, and hiding would allow _cheating_ about what letters you have. (You can just write down other stuff.)
* Hands are _random_. We can't do this. There is no random bag of tiles to draw from.

### Solution 1: Everything is public

It's the only option, really. Everybody's "hand of letters" is written on the board. Each player picks one cell at the start into which to write this.

The only downside is that players can actively block your next moves. If they see you have the perfect letters for a nice word, they might do a turn designed only to block you.

Is this a problem, though? I don't think so. It adds strategy. I actually don't like the secrecy of original Scrabble. Many times, players end up sharing their letters anyway. To prove they have "the worst letters ever", or to collaborate on finding a good word.

All my intuition / experience tells me this is actually an improvement. Furthermore, we might be able to use this for some fun rules or new mechanics!

### Solution 2: The "Tiny Towns" approach

In the game Tiny Towns, turns are highly interactive and simultaneous. This is _great_. I've never played a game this deep and complex, which plays so fast and smooth.

How does it work?

* Somebody calls out a resource of choice
* _All_ players get that resource and place it in their own town

You see what I see? :p

* Somebody calls out a letter
* _All_ players may add this letter to their hand

This means everybody is always active. This is how you fill your hand.

But it's obviously too slow. And if we do this, some more choice and randomization would be nice. So I changed it to

* On your turn, call out _three_ letters
* You get all three
* The rest picks one to take for themselves

This grows your hand quickly enough. You have lots of agency ( = choose your three letters, choose which one to keep), but your hand will still be somewhat random ( = you don't control which letters other players will say).

### A slight modification

At first, this was the start of your turn.

* Step 1: call out new letters
* Step 2: play a word to the board

However, it seemed more interesting to switch the order. Otherwise your turn was too "easy": just say the exact three letters you need for that superlong word, then play it immediately, nobody can stop you.

Turn it around, and the whole dynamic changes.

* You need to pick three letters _in advance_
* Then all the other players could block you or interfere on their turn

This adds even more strategy to letter picking. You need to pick someone that reduces the chance others can interfere, but still helps you out. You must choose between great letters, or reducing risk.

## Where are we now?

Okay. We have turns. We have a way to fill your hand and to score points by placing words. (This just follows default Scrabble rules.)

What are we missing?

* An objective: when does the game end?
* Variation: how do special tiles enter the board?
* Scoring: how do I communicate the point value for each letter (if there are no tiles)?
* Rule gaps: what if you cannot play a word? Is there a hand limit?

Let's solve these one by one.

### Objective

At first, I wrote down the naïve "when the board is full". This is madness. You can't fill a board completely with valid words.

Then I changed it to a number. "When 20 cells are full" or "when 80% of the board is full", but that's similarly stupid. It would require constant counting (of numbers that aren't trivial) by the players.

So I thought about my Scrabble games. I looked up images of "finished" boards. And I realized: the game usually ends as soon as 2 or 3 of the corner squares have been reached.

That seems a good rule. "The game ends once all four corners have been filled"

It was close, but not great. I've never played a Scrabble game where we captured _all_ four corners. Additionally, because players claim one cell for "writing down their hand", it might be _impossible_ to reach a corner!

So it changed to: "The game ends once 10 edge cells have received a letter"

This should be reachable within 30 minutes. It's not hard to check. And claimed cells don't make this impossible.

### Variation

As usual, I like solving _multiple_ problems at once. That's how I came up with the following rule:

> If you don't play a word, you must add a special cell to the board

It gives you something to do when you have terrible letters (or don't _want_ to play a word). It also adds that variety---the special cells---to the board.

I wrote down a list of special cells in the rulebook. This made me realize: duh, people will always choose the strongest one! "Triple Word" ... right?

But they won't. Because what if _another_ player uses it before they can use it? Strategic players will not pick a very strong special cell (every time).

As a game developer, however, I've learned that you cannot blindly trust players to be strategic. You need to give them _some_ boundaries and nudge them in the direction that's most fun.

I had to add a simple rule that restricts which types you can place. I ended up with:

> You cannot pick a type that's already in an empty cell on the board ( = a special cell that's not yet used)

Simple, but fixes everything. Once somebody places a Triple Word, nobody else can place it. Until that cell is filled by someone.

For the base game, I just kept to the basic four bonuses (double word, triple word, double letter, triple letter). All my other ideas for special cells were moved to "expansion" or "higher difficulty".

I really want Keebble to be something to pick up within 30 seconds if you know (and like) Scrabble.

### Hand limit?

I couldn't come up with good solutions. Partially because I don't see this as a real problem. 

Let's say you play with 4 players. Between turns, you get 3 + 1 + 1 + 1 = 6 letters. 

If you play a word with 5 letters (most common in my experience), your hand is almost empty again. 

Yes, it will _grow_ over time. Because of those leftover letters you don't use. But is that a problem that warrants one or two new rules / exceptions? I don't know.

It wouldn't be _too bad_ to say you can have 7 letters at most. I'll try that.

But I'd rather design other parts of the game around it. To make it more likely that you empty your hand (or receive fewer letters)

{{% remark %}}
I did add an expansion, again, with an alternative approach. You quickly divide your start cell into smaller slots. That's your "hand", that's your backpack, that's all your get. Once you used all those slots, you can't receive any more letters. When playtesting the game, I want to try and test all these variations to see which one to keep for the "base game".
{{% /remark %}}

### Points?

I created the table with point values, for the rulebook. This made me realize: nobody is going to remember that. And nobody likes checking all the time.

No, screw that. We need one or two _simple_ rules for how many points letters score, instead of fixed values.

I realize two things 

* All our information is _public_. We can base points on how "available" or "wanted" a letter is.
* Original Scrabble assigns high points for letters (Q = 10) because you _will_ draw them at some point. In my game ... there is no drawing. So people will just skip the hard letters.

This led to the following rules

* All vowels are 1 point
* All consonants are 3 points
* Each letter that only appears _once_ in the player's hands is 5 points

I'm most uncertain about this part and the consequences. We'll see when I test the game.

## Asking letters: a conundrum

I realized allowing you to name "any three letters" was perhaps too much freedom. It's not hard to come up with restrictions---the real question is whether it's a good idea.

I wrote down things like this:

* All three letters must be different
* You may not say a letter you already have
* You must say three letters that are on the board, connected

All fine ideas. But for now, I left them as an expansion as well.

Similarly, I wrote down that you could also _skip_ asking letters (to place a special cell). This gave a nice consistency to the rules.

But this also gave me doubts. Because such a rule _can_ allow the game to turn into a stalemate:

* Nobody asks for new letters anymore, because that'd just help the other players as well
* Which means the game never progresses
* (And the board is filled with special cells to a ridiculous extent.)

### The solution (was already there)

When I read the rules a few times, though, I realized I already had the solution.

Remember the restriction on placing special cells? You can't pick a type that's already there. If everybody places a special cell on their turn ... your options are exhausted within one round!

Which means you can't take that action anymore.

### The improved gameplay loop

This allowed me to simplify the rules into something _better_. On your turn, you

* Either play a word, then ask new letters.
* Or place a special cell.

If you _can't_ do one of them, you get one letter of choice and end your turn.

This solves all the issues:
* You're rewarded for _playing words_, which helps others and progresses the game. (You get to ask more letters.)
* But if you can't, or strategically don't want to, you can place that special cell.
* But both actions are restricted => if they both fail, there's a simple backup (get one letter and move on)

## Starting Hand: another conundrum

If you start with a blank page, you start the game without letters. (If you use the website, it provides your starting hand for each player.)

My kneejerk reaction was to add a rule (during setup) like "pick any 5 letters and add them to your hand". But more rules = bad. Also, this would halt the game every time:

* Players would take ages to decide their first five letters
* And they'd likely pick the same ones every game, leading to the exact same start

The current rules actually handle this somewhat well. 

* Without a hand, the only action you can do is "place a special cell".
* So, the first few turns will see players adding variation to the board
* Until all types are placed and players start receiving letters

The only question is: _isn't this too slow?_ To start the game by receiving one letter every turn ( = the "fail safe" action)?

And I decided it was. 

I still needed a rule about "first word placement" as well. (Just like Scrabble.) Why not combine that with another rule?

> The first word must cover the center square. Until that first word is played, you can ask three letters on your turn _without_ playing a word first

I felt this was a good compromise. The game starts with players either (collectively) adding letters or placing special cells. Within one or two rounds, the first word will surely be played and the game is on.

## I did it again

I made the same old mistake as always. Well, it's not really a mistake. Just part of the process of _simplifying_ and _figuring out your game_.

Remember my game loop above? I gave players _two_ actions. Play words, or add a special cell.

But simpler is always better. And in this case, it's easy to reduce this to _one action_. Just remove the special cells entirely from the base game, or your "first game".

Why? Because the game doesn't _depend_ on the special cells. Scrabble would still work with a completely blank board, it'd just be slightly more boring.

So _all_ the rules and actions about special cells can simply move out of the base game.

_Isn't this too simple?_ No. It's the most important principle I learned after years of making games. Simpler is ALWAYS better. And you can ALWAYS move complexity to an expansion or a higher difficulty. First players need to give your game a chance and understand the core loop. Once they _know_ the game and _like it_, you can add more complexity or challenge.

Additionally, the rules actually strayed quite far from Scrabble. Far enough to stop calling this a "Scrabble clone". Reading the rules, I knew it had to be simplified further.

The new rules are _barely_ one page. Including big font, headings, and example images. There's only one exception (the one about the starting hand), which is nice.

## Sounds like a plan

This finished the rules for me. I saw no issues, no holes, nothing that could be simplified even further.

What's left to do?

* Create that random setup generator (and pick fonts / icons / visual design)
* Finish the rules (so others can read them while we ... )
* Test the game!

I expect this game to crash and burn.

* It's highly interactive, so testing it by myself doesn't do much.
* I mostly worry about board size. Real scrabble is 15x15, which means 225 squares. Will my board of 32 cells be big enough?
* And then about the start of the game from a completely blank paper. Will players understand? Will it be too slow?

We'll use that feedback and experience to improve it.

### Guess what, changed my mind

While creating the visual designs and board generation, I knew for sure: 32 cells is too few. My code still supports it, but the default is now 64.

I also knew that my "one exception" needed to be removed. Taking distance from a project for a week does wonders for your perspective :p I read back the rules and the last line was:

> "If you don't play a word, you may only ask 1 letter. Ignore this rule if there are no words on the board yet."

That's an exception ... with an exception!

Yes, I need to incentivize being _active_ and _playing words_. I also need you to gain letters quickly at the start of the game. But this is too harsh---and a monstrous rule to add at the end.

Playing words will always be better. That's probably enough incentive for all players. Our "hand limit" is a simpler, intuitive rule that actually solves more of the problems. So we keep that and remove this exception altogether.

### Playtesting

I tested the game! My results?

First of all, **it works!** It takes 30 seconds to explain. You're immediately playing. It scratches that Scrabble itch, while clearly being its own game. This game is already 99% done. It takes 15-20 minutes, plays quickly, it's all _great_.

Besides that,

**Board size?** Yes, 64 cells is the right amount. It's still _just_ too cramped for space. But 32 cells would have never worked out => I'll use that for low player counts (1-2)
  
**Asking letters?** Asking 3 letters on your turn is _just_ too much. (As you also get letters from other player's turns.) I changed it to **ask 2 letters**. The problem was hitting the hand limit, not having an empty hand.

**Objective?** Similarly, 10 edge cells are easily filled. Additionally, it feels slightly unfair to end the game _immediately_.

Here's a better idea. Once 10 edge cells are filled, players can only _play words_ on their turn and nothing else. The game ends immediately once somebody has an empty hand.

(This allows both _exceeding_ that limit of 10 edge cells by a bit, and a less abrupt ending.)

**Biggest issue?** It's almost always a good choice to grab a letter from somebody else ( = one they asked on their turn). At the same time, the board is small and possible words are rather limited.

If you're unlucky, it might even be _impossible_ to fill 10 edge cells due to how people laid their words!

Solving all these problems at once ... is the idea of a **wall**. Color in any (empty) _edge_ on the board. Now these two cells aren't considered "adjacent" anymore.

This allows you to:

* Place any word, given enough time and empty cells
* Break existing words in such a way that you can re-use parts of them.

But when do you place one? Aha! Remember the issue of "people choose a letter almost 100% of the time"? Let's solve that by making walls the alternative option.

Here's how a turn works now.

* Somebody asks 2 letters
* All other players either "pick" a letter for their hand **or** place a wall on the board. 

This means you have a strategic choice. Do I really need that "K"? Or do I break up some part of the board so I can place the letters I already have?

## Conclusion

That actually finishes the game! I think creating the rules and random boards actually took longer than creating and polishing the rules. That's, of course, partially a byproduct of basing your game on a proven concept like Scrabble.

I wasn't sure about the visual style at first. But I think this might actually be my favorite look for a game yet! It's simple, colorful, but also consistent and clear. It's very different from earlier things I did.

In the end, I call this a success. Hopefully I can make my other "Scrabble Variations" (which will also be called Keebble \<something\>) soon.

Until the next devlog,

Pandaqi