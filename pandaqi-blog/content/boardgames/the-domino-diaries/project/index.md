---
title: "The Domino Diaries"
date: 2025-06-26
emoji: "🀆"
thumbnail_media: "the_domino_diaries_header.webp"
---

Welcome to the devlog ("developer diary") for my collection of games I dubbed [The Domino Diaries](https://pandaqi.com/the-domino-diaries/)

This article describes the general approach to the collection, quite briefly. It's an overview/general _project devlog_. Each game received its own individual devlog for more details.

## What's the idea?

Domino games. They're awesome. Extremely simple and intuitive to explain, while inherently adding challenge (because each domino has _two_ things and you have to decide _which one/how_ you want to use them).

When I realized this, though, I was already busy with a hundred other projects and had no time to even prototype a few ideas on paper. It took nearly a year to come back to my first idea, which meant it had grown into _multiple ideas_ by that point, with _more detail_.

With the schedule finally cleared, and me trying to take a short break from writing 3,000 words a day, I got started on ... all of them at the same time.

Why? Partially because I am stupid and easily distracted. Partially because this helps build a _shared_ foundation, so the games can reuse code, illustrations, rules, etcetera efficiently.

But most of all to apply a new technique that really helps me when building multiple related games: **try all the combinations!**

In short, I identify a few core aspects of the type of game I'm making. And for each unique game in the collection, I add the restriction that it must have a different _combination_ of those core factors.

For the Domino Diaries, this resulted in the following list.

* **Dinoland**: free placement, no paths or enclosure, terrain-based, score = SIZE x ENTITIES INSIDE, shared map only, special = asteroid + hatching
* **Theme Parque**: restrictive placement, paths, score = LENGTH OF PATH x ITEM FACTOR, shared map only, special = different paths/tunnels + many score types/synergies
* **Zoo Parque**: restrictive placement, enclosure, half terrain-based, score = SIZE x ENTITIES INSIDE (if enclosed), shared map only, special = dynamic dominoes (overlap/remove) + treat animals well and uniquely
* **Dynasty**: free placement, paths+enclosure, score = LENGTH OF PATH x ENTITIES INSIDE, both individual and shared map, special = assigned roles for strong cooperative play + goal/target/contract cards
* **Highrise**: half-restrictive placement, no paths or enclosure, proximity-based, score = TENANTS ATTRACTED, individual map only, special = connections between individual maps + permanent points/score system

As you see, they're all clearly domino games with shared elements. That's what makes it a _collection_ of related games.

But they all combine the core elements in different ways. So they all have a unique core that requires me to build a unique game on top.

This list might seem like nothing, but it's _so helpful_. The biggest danger when being creative is being _unable to choose_ because you're overwhelmed with all options or everything you want to try. Restricting yourself in this logical, simple way helps a lot. Now I know, for example, that the "Dynasty" game should not do the same things that the other games are already doing.

## Dinoland

Not the first idea, but the first one I (fully) developed. It was always supposed to be the simplest one. (As you can see in the "combination list" above, this idea has almost every feature turned off or not included :p)

No need to match elements on the same domino. No fences, or paths, or score numbers, or whatever. A very simple cartoony style that I am familiar with and can execute quickly.

Ironically, this is the only game that includes a separate type of material (the tiles/cards to handle the asteroid), which actually made programming a bit of a chore for the first part. It means I have to set up the different sizes, generators, systems, drawing code, etcetera for the two _different types of material_.

Besides that, because of the simple and freeform gameplay, the generation and drawing code is incredibly simple as well. This idea was conceived one day and finished the next. (At least, the v1 prototype version that was playable at my sister's birthday was finished. There's a lot of testing, polishing, rulebook images, etcetera that has to be done later.)

Read the full devlog here: [Dinoland Devlog](/blog/the-domino-diaries/dinoland/)

## Theme Parque

The second idea to be fully developed.

Even though the core idea was very promising, I put these domino games off for a long time because of this particular idea and how hard it might be to make. I was mostly right about that, but I pushed through!

Why was it so hard?

* Getting illustrations for the attractions (and the stalls/decorations to a lesser extent) would be a lot of work. The AI just doesn't know these things, and if it does, it doesn't know how to draw them in perfect side view. So I had to draw things myself first, play around, try a lot of things, until I finally had most attractions looking consistent in perspective and style.
* This game has _a loooot of illustrations_ in general. Even those that the AI could make very comfortably still took a while to create, edit (if needed), and place in the game.
* The most important element is the _pathing_. This means there must be a nice spread of paths (corner, straight, t-split, ...) and they must be present in the right numbers to make the game possible. Even worse, the paths need to match the _other thing_ that's on the same domino as theirs. (For example, decorations can never have a path leading into them, while two paths of the same type should usually _connect_ in the middle of the domino.)
* The three types of paths should be clearly distinguished. But the first few "patterns" I tried on the queues (stripes, dots, triangles) failed hopelessly when I realized they wouldn't match up if the other dominoes were rotated a certain way :p

It took some trial and error to get both the code and the graphics working at all. To make sure the dominoes were legible no matter how they were rotated, paths were _very_ easy to see and connect, and the text description / score number didn't obscure anything.

After finishing this, however, I'd basically learned enough tricks (and written enough standard domino-tile-generation-code) that all the other games became much easier.

Read the full devlog here: [Theme Parque Devlog](/blog/the-domino-diaries/theme-parque/).

## Zoo Parque

The third idea to be fully developed.

As my "combination list" shows, I wanted this to basically do the opposite of Theme Parque---make it as different as possible, while still building a "park" together. It uses enclosures (animal exhibits, fenced off) instead of pathing. It only has a few decorations/stalls in the expansions, because it focuses almost entirely on the animals and terrains. Where Theme Parque can be very "mean" and competitive, stealing queues or building attractions at unhelpful places, Zoo Parque is more cooperative and cozy by design.

I struggled a bit to find the right graphics. I wanted something more realistic and painterly, while staying cartoony and colorful. I needed a lot of fences on all the tiles, which should be easy to see and distinguish, but they couldn't be too thick or they'd cover everything else. I wanted to give that nature-wildlife vibe to _everything_, but that just made it too busy and messy. I had to find a balance between "add texture and leaves and bamboo here", and "leave this empty space alone and just use a solid color".

The generation was _mostly_ straightforward. Only the fact that it has both empty dominoes (no terrain, meant for overlap) and filled dominoes (terrain, meant as base layer to be placed on the table) required a shift in approach. And the fact that animals have a preferred terrain or fence, which restricts my random generation of dominoes a lot.

In the end, this game probably does the most "unique" things out of all domino games. The way that you're _supposed_ to treat dominoes dynamically (overlap, remove, etcetera), the way that exhibits are shared between players and can have multiple terrains/animals, the way each animal has unique details.

That also made me very uncertain about this game---probably most uncertain out of all domino games. Would it even work? Would any of it make sense? I had doubts about that from start to finish, until I could actually fully test the game (or have others test it) and see for myself.

In the end, though, it does look like a very warm and comfortable domino game that is clearly about building a zoo.

Read the full devlog here: [Zoo Parque Devlog](/blog/the-domino-diaries/zoo-parque/).

## Highrise Homino

This was actually the last idea to come to me, but I wanted to make it _before_ Dynasty. 

Why?
* I wanted to learn how to balance/write rules for _individual maps_ (per player, instead of placing dominoes to a shared map). Both this idea and Dynasty do that, but this one is the simpler of the two.
* With every games collection, one idea always jumps out as "this will surely be the most complicated/biggest/longest of them all". Dynasty had that honor since the moment I came up with the idea. And so, in a sense, I am "building up" to that game by making all its smaller elements first in other games.

My "combination" told me the requirements for this game, which quickly led me to two unique components: you're _attracting_ tenants for scoring (instead of score being read from the final domino map you built) and though you build an individual map, they're all storeys in the same building (and thus connected).

This meant the actual domino placement could be pretty basic, basically allowing whatever you want, because it was not about that. It was about _what_ you placed on your floor and how you could get what _others placed on their floor_. A pretty experimental idea, but I felt it would work if I just developed it long enough.

To deviate from the general painterly/fantasy/cartoony art style in the other games, I purposely picked a more modern/abstract/geometric style here. To really make it look like you're building some architectural floor plan.

(Other theme ideas for this game were tending a garden, designing your own city or managing your own store. These have all been done to death, however, in the domino-placement genre. I also didn't have any unique or special ideas surrounding such a theme, while elements of it are _partially_ present in Dynasty anyway.)

Read the full devlog here: [Highrise Devlog](/blog/the-domino-diaries/highrise-homino/).

## Domino Dynasty

As expected, the final idea to be fully developed and finished. (Though the gist of the idea and the fonts were ready far earlier.)

I wanted this game to be the one that takes up to 2 hours to play. The one with more material, more depth, more strategy, more number-crunching.

At the same time, a new mechanic had naturally emerged as I made these games, and I really liked it: games that, at their core, support both cooperative and competitive play. This game has both an _individual map_ (per player, only you can touch) and a _shared map_ (everyone can add to it), which obviously perfectly allows a mix of cooperative and competitive play.

Leaning into that, I decided on the theme that you're all playing different roles within the same empire, tasked with delivering or handling one specific aspect to keep it all running smoothly. (One player handles economy, the other military, the other public relations, etcetera.)

This game was by far the hardest to create, but I had expected that. I needed many revisions to settle on the simplest possible rules, the least material needed, and so forth. 

It is easy to just give every role their own icons/dominoes. It would also create a game with 500 dominoes, which nobody wants to print-n-play :p So, instead, I had to find a way to allow _differentiation_ and _roles_ while keeping a small, shared set of dominoes that everyone plays with. I had to find a way to clearly give people their own area of expertise (that no other player can touch), while still using the same material and feeding it all back into the same shared map.

Fortunately, by having made all the "simpler" games first, I was more prepared and already had a good chunk of the code and ideas to make it happen.

Read the full devlog here: [Dynasty Devlog](/blog/the-domino-diaries/domino-dynasty/).

## More games?

As usual, I have more ideas than this. But I'd now been making domino games non-stop for a while, and those other ideas were a bit more uncertain or vague at this point. So I decided that 5 games was a nice cutoff point. I wrote down those other ideas as well as I could, and planned to return to this series in one or two years time.

Most of those games either fill a gap in _difficulty_ (for example, the games trend towards slightly more difficult than I wanted, so I'd like to add 1 or 2 entries that are even simpler than dinoland and really, really easy), or a gap in _experimental mechanics_ I hadn't explored yet. Such as, for example, a game idea I call "domino removal": you never actually place new dominoes, you start with a random board and must _remove_ them in a valid way.

As you can see, I have many ideas that are very experimental and have never been done before (as far as I can tell), which makes them a huge challenge and adds lots of uncertainties. And so I decided to stop work for now and give my head a break, so I can return to the Domino Diaries in the future.

Also, as usual, those other ideas currently feel _better_ than what I've made so far. Because by making these first 5 games, I've learned a lot about how to make even simpler or more strategic domino games. So I don't want to "rush through" those other ideas while I'm a bit tired, because I think most of them will be _great_ games for families/kids/non-gamers.

## Conclusion

Once all games were done, I did a final pass to make them more consistent.

* I ended up increasing the size of all dominoes. (Instead of 6x4 on one A4 paper, it's now 5x3 on Regular size.) After printing and playing with it, I just felt like I needed bigger tiles on the more complex games (which is why Dinoland remains the original, slightly smaller size). 
  * This was especially needed by those games that have text on tiles. At the old regular size, it was "readable, but on the edge". Some people might struggle to read the text, and especially on busy backgrounds, it wasn't super clear.
  * In the future, I might want to think about this the other way around: instead of making dominoes larger to fit the text (when needed), keep the game simpler so no text is needed :p
* To provide a cooperative + competitive mode in each. 
* To iron out some discrepancies in style, wording, etcetera.
* To assign the same metadata (genre, tags, categories), launch date, and any other consistent settings across the project.

And then it was done!

All in all, the bulk of the work was done in two weeks. And if we're honest, the only reason I did it was because I felt completely unmotivated to start on my next book, so I decided to take a "vacation in Tiamo style" and just work on a few games and see where it led. 

(I had written, translated, and read SO MUCH the past few months. I've learned that it's better to take a break for a few weeks from writing after that, instead of trying to push through. I know that, given that break or just enough time, motivation and inspiration eventually refills and I can easily start that next book again.)

Because the original time constraint for two of the games (Dinoland for sister's birthday, Theme Parque for brother's birthday shortly after), I had to be quick about it. And when you're in the flow, able to copy-paste code and keep the development going on similar games, you just keep going.

This does mean that, as usual, I expect there to be improvements to make for all these games. That's the beauty of free, generated print-n-play games. I regularly tweak numbers, update some graphics, add/remove aspects, improve wording in a rulebook, etcetera. These are tiny fixes brought up by me, my playtesters, or a random internet stranger. But over time they make every game better and better.

People often claim that I am rushed and should spend way more time on projects. I respond that no project ever comes out "perfect", no matter how much time you put into it or how long you wait with publishing it. I'd rather actually finish projects. Ones that are good enough, knowing they will become better over time, because that's the reality of how the world works and striving for perfection or testing a game to death before showing it to anyone will simply not lead anywhere.

Then again, I _am_ a bit rushed because my hyperactive brain can't stay interested in the same thing for too long :p

Until the next devlog, keep playing,

Pandaqi