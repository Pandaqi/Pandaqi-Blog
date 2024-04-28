---
title: "Mammoth Messages"
date: 2024-03-26
emoji: "🐘"
thumbnail_media: "mammoth_messages_header.webp"
---

Welcome to another devlog, this time for my simple party game [Mammoth Messages](https://pandaqi.com/mammoth-messages/). 

In this brief article I will explain the original idea, how I executed it, any problems or interesting stuff I encountered along the way, and hopefully some of it is interesting or fun to read.

## What's the idea?
One night, we were playing the Jackbox games. One of them, Drawful, has you ...
* _Draw_ a prompt (using very, very limited tools on your smartphone)
* Then your drawing is shown on the screen, and everyone adds their own guess as to what the prompt could have been.
* And finally, _all_ those player guesses + the real prompt are displayed, and you must figure out which one is the right one. (By voting on it with your phone.)

Somehow, some way, this turned into the following idea in my head. (Maybe a prompt had to do with cavemen, or maybe something else also influenced me that day, I don't really know.)
* What if you had to _communicate a word_ (to your fellow players)
* But all you could use were _rudimentary cave drawings and symbols_?

That's ... that's it.

I, therefore, didn't see this as a big game project, but rather something to do on the weekends as a little side project.

## Let's create that
Last year, I created my own `PQ Words` dictionary library. (A free JavaScript library to use on _websites_.) It allows me to draw random words, controlling their type, difficulty, category, etcetera.

So, the **Word Cards** were already done. For this game, we'd just use the "core" words and perhaps "easy".
* For each card, draw 10 random words.
* Give them a unique number and color.
* Place them onto the card.

What to do for the **Cave Drawings**?
* Realistically, such drawings were always about nature and humans. Most of them depict animals, landscapes, stick figures, perhaps some tools or weapons they invented, that's it.
* But that would severely limit this game's options and basically make it unplayable. (Good luck conveying any modern concept using only a deer, a spear, and a sun.)

I decided to ...
* Ask my PQ Word dictionary to spit out ~50 of its simplest words => those would be turned into drawings.
* Then _exclude_ those words from being added to the Word Cards. Because it's very easy to convey "chicken" when you literally have the chicken symbol :p

How would we turn them into drawings? I decided to try generative AI first, but if it took too much time (and/or didn't yield good results), I would just draw these myself. The icons _should_ be simple and a bit rough, so that should be doable.

Finally, the **Choice Tokens**: how you mark the word you picked. (Otherwise you can obviously cheat by saying "yeah, yeah, sure, your guess is correct, that's exactly the word I picked!" No no, you need to pick the token that corresponds with your word before guessing starts.)

This game felt _so_ simplistic, that I wanted to add a little spice here.
* Each Choice Token has two properties: a **Color** (or Pattern, to support the colorblind) and a **Number**.
* You must communicate **2 words**. => both the one corresponding with the Color and the one corresponding with the Number
* With a small chance, these 2 could fall on the same word, allowing you to give just 1 word.

This makes it harder, this adds extra creativity on how to combine both, and it adds that slight uncertainty about "are they doing 1 word or 2 words?"

I _could_ make these two separate decks, so you have true randomization. This felt like a needless complication of the game, however.
* You'd need to separate and shuffle these decks at the start. (Which would fill the table with even more piles of cards/tokens.)
* Then explain this two step process during gameplay. (Usually, party games are about communicating _one_ thing, so people will just keep forgetting they have to do two words.)
* While in general---but especially with simple party game---we want setup and rules kept to an absolute minimum!

This might seem silly, as if I think all my players are stupid. In fact, yes, I do, because _all_ humans are stupid :p Many people don't even want to _try_ a game if the rulebook is longer than a few paragraphs. In my experience, absolute simplicity is preferable over more choice or freedom in a game.

If we include enough cards of each type (Word Card, Cave Drawing, Choice Token), there'll be more than enough randomization to never run into repetitive turns.

{{% remark %}}
This is one of those tricky, subtle lessons I've learned after making so many games. Do not chase "infinite replayability" or "extreme randomization", especially not at the cost of rules or material complexity. Even the people who love your game to death will not play it enough to run into issues if you only have _some_ randomization.
{{% /remark %}}

Finally, I wrote down some variants in the rules to give the game a _little_ more meat on the bones. This mostly comes out in the competitive variant, where you play between two teams, but also share cave drawings between teams. (So you not only pick Cave Drawings to communicate your own words, but also want to remove "good drawings" that would help the other team too much.)

## The Final Material
As usual, the AI was quite helpful for generating some backgrounds or textures to "spice things up". For the actual icons, it was pretty useless.

### Word Cards
The word cards were the most work. Below is a screenshot showing some progress as I try different things. (I'm terrible at making a backup/copy first before trying something new, so there are many steps in between that we're missing here.)

!(Some steps in the process towards better looking word cards.)[mammoth_messages_word_card.webp]

This was the thought process.
* This background is dark and slightly too busy. We need a more solid, light background for the words.
* Putting a rectangle behind each word looks ugly and just obscures the texture. Let's constrain the color to just the number part.
* Let's replace that rectangle with a clay tablet texture I generated earlier.
* Let's give the "Word Card" bit an _inner shadow_. That's actually realistic (as the words would be carved _into_ the stone) and sets it apart from the words to pick. (My current layout system has no "Inner Shadow" effect yet and I didn't feel like figuring out this rather complex effect right now.)
* Let's give the words, numbers, and rectangles a _drop shadow_ that's straight downwards. This makes them pop more, while also blending with the rest of the card (instead of feeling "tacked on").
* Let's add a wiggly line _between_ the words, and alternate their alignment, to keep them clearly separate.
* (Finally, I found a font that was nearly unreadable, but _looked_ very much like scratches from a caveman. As such, I used that font to randomly generate hidden messages scribbled on the cards, only readable if you look for it ;) )

### The Rest
Once those were figured out, the rest fell into place.
* The Choice Tokens use the same "clay tablet square"-thingy, but tinted to the right color, and with the right number on top.
* The actual Cave Drawings are simply _black_ rough drawings with a _white_ background. They _should_ be abstract and rough, and they should be visually vague. (Any color, for example, could be abused to signal which _color_ your Choice Token has!)

As said, I drew these myself 100%, partially because AI sucked at doing them, partially because I still don't want to rely on generative AI. I ended up drawing way more than originally intended, once I realized how quickly you burned through these (with 10 drawings per turn) and how hard it was to communicate if you really only had a few barebones images (like sun, square, stick figure)

In fact, over the course of several days, the list grew longer each time. (When I realized another category of things that caveman have/could have drawn, and when I realized this game really only works if we have a diverse set of drawings.) 

I managed a consistent style, with the exception of some drawings I just couldn't improve. I used sharp brush strokes that are sometimes cut off or partially erased to simulate engraving. Simple, but not too barebones. Here and there, I tried to draw things in a way that allowed multiple interpretations, but that was hard. I mostly added a good number of abstract signs (mostly based on actual caveman markings we found) to the mix, which you can creatively use in any way you want.

Below is a sample of what they look like.

!(A part of the cave drawings spritesheet as I try to fill it.)[mammoth_messages_cave_drawings_progress.webp]

### Remarks
I lowered the resolution on the Cave Drawings. 

Since half a year ago, I switched to a default resolution of 1024x1024px for every piece of graphics in a game. My experience of the past years showed me this resolution would allow crisp and sharp results no matter what I ended up doing with those graphics.

With _so many_ possible drawings, however, this would lead to multiple HUGE images to load and cut into frames. Furthermore, the tokens themselves are quite _small_ (and the drawings simplistic), so I could get away with 512x512px.

## Finishing
Finally, finally, I say a devlog will be brief (and a project small, doable in a weekend) and it's actually true. 

The project is done. It works. It's a very simple, silly little party game. 

At different points, I thought it was either too easy or too hard. Turns out it flipflops between them. Sometimes you're just lucky and you get 2 words that combine well and fit perfectly with the drawings you have. Other times you're just unlucky and you need to be really smart to win that turn. But overall, this means that the general difficulty is just about right, albeit on the _easy_ side.

I'm fine with that. Hopefully the game doesn't give anybody the impression that there's some really deep, challenging puzzle awaiting here. 

As usual, I just want to _get these ideas out_ and _finish stuff_. Because if this game turns out a popular one in a few years time, but has some major drawbacks, I can just _update it_ (in a day or two) based on that knowledge. I can't update things I haven't finished or released.

{{% remark %}}
If you follow me for a while, you can probably pick out which projects are "tiny do-it-in-a-weekend ideas I want to get out of my system" and which are "let's take a few months to really make this the best thing ever".
{{% /remark %}}

Until the next devlog,

Pandaqi

