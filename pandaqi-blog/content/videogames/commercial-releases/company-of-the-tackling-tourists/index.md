---
title: "Company of the Tackling Tourists"
tags: ["devlog", "technical devlog"]
date: 2025-07-12
emoji: "🏖️"
---

Welcome to another devlog!

This time, we'll talk about the process behind [Company of the Tackling Tourists](https://pandaqi.com/blog/videogames/commercial-releases/company-of-the-tackling-tourists/), the game with the longest name (among all my projects) to date.

It's a bit of a special one, because it was born out of some realizations I had about game development (which I think are really valuable), and development started right after a night *in which I didn't sleep at all*.

There's no interesting or spectacular story behind that. I simply had to get up early for an appointment, but literally *dozens of mosquitos* surrounding my pillow had other plans. The consequence? I was quite tired the first few days of development, which somehow ... helped?

## What's the idea?

Every player is a **tour guide** on an **unknown planet** ( = randomly generated world map).

You start with a group of tourists behind you *and* several locations marked on the map. The first player to visit all locations, with at least one tourist remaining, wins the game!

At this point, the idea is vague enough for me to consider other objectives. Such as neededing to earn the most *money* from your tourists, or visiting all locations is enough---tourists be damned! But all of that is unsure right now.

## Why this idea?

We all know it's good practice to make your game objective *as simple as possible*.

In the past, this meant that I tried to get a oneliner, like "Most points wins" or "Deliver this to there!"

I realized, however, that this doesn't necessarily mean it's a *good objective*. And because I tried to get a oneliner, I often had to cut parts (or restrict myself), making the game less unique.

No, a ***good objective* is simply one that is *intuitive* and *leads to the most fun*.** If it means you need a longer sentence, or maybe multiple sentences to state it, I think that's actually okay?

So, in my head, I was searching for "a good objective" on which to test this theory. And then it hit me:

* Moving a player from A to B is very easy to understand/explain ...
* ... and it's intuitive (because we know all about movement in the real world) ...
* ... and it's very visual (with constant feedback on your progress)

The conclusion? I had to make a game which was **all about moving from A to B.**

Soon I figured out the theme of *tour guides* trying to visit specific locations, which were different for each player. This meant you had to figure out the *fastest way* to move between all *your* locations.

But, obviously, there should be ways to interact with the other players and slow down their progress. This created the idea of a rivalry between tourists, which will tackle each other when they cross paths.

And that's where this idea started!

## How to make moving more fun?

Within a day (that *very long, sleep-deprived day*) I had a game that could:

* Generate a random world map (surprisingly well, actually)
* Place landmarks and assign them to be visited by certain players
* Place players, that could *walk around* and visit these landmarks

Nice. Works as intended. Very boring.

Yes, there was a puzzle of finding the "most efficient order" for your locations. But you only had to think about that at the start of the game, and then you just ... execute that plan.

How do we make it a bigger challenge to find the fastest path? These were my ideas:

1. You can somehow change your properties (such as walking speed)
2. Other players can change your plans
3. The world might (randomly) change
4. Different regions might present more unique roadblocks (such as a region you can only enter if you have 5+ tourists)

Okay, let's try to find solutions for each of these.

### Change your tour guide's properties

What if each tourist you have *has a certain property*? For example, you might have "fit people" that increase your walking speed, or "elderly" people that prevent you from taking hazardous paths.

This way, the **tourists following you** at a given time determine what you can do. (This was actually "Eureka moment #1", as I think this mechanic is awesome and makes the game work much better.)

Additionally, tourists might give **money** when seeing a new landmark. Use this to buy new stuff? Or buy passage through a certain region?

### Player interaction

The "strategic" solution is to allow players to (permanently) alter parts of the world. For example, after visiting something, you might put a *lock* on it. So another player is required to find a key before they can enter.

The more "improvisation/chaos" solution is to make tourists attack each other when they cross paths. This simply means that you have to walk a path that *stays out of the way of the other players*.

### A changing world

It's not hard to see where this is going (although it might be harder to implement than I like): *natural disasters* could occur, *weather* might change, some regions might have special properties that (for example) mean they randomly close or open themselves.

By sprinkling in a few of these, you can never pick a path at the start and just follow it. You will have to adapt and improvise.

### Unique roadblocks

This gave me the most problems, which lead to taking a break, which ultimately lead to "Eureka moment #2"

There's this old boardgame I really like (and have played numerous times at home) called "Elfenland" (in Dutch), which literally translates to "Land of the Elves".

Its premise is basically the same as mine:

- Colored tokens are randomly distributed around the board
- You have one pawn that can move around and collect these tokens, by entering the space where they are.
- The person that collects the most tokens (by the end of the game), wins.

But here's the twist that makes it interesting: between all locations is a *path of a specific type* (such as "mountain" or "water"). You need to pay the right cards from your hand, to use such a path. For example, one *dragon* card will take you over the mountains just fine, but using a *rusty cart* will require two cards. And of course, some cards will simply *not work* on such a path.

The challenge therefore becomes: how do I move as efficiently as possible, given the cards I have right now and *how* they can move me around the board?

**I can use this! :)**

I already have a map divided into regions or "countries". I can give each of them a different terrain type, that require you to have specific *tourists* if you want to use them.

For example:

* You can't enter mountains with elderly people.
* You can enter a lava region, but two tourists will leave. (Let's say because they are scared, not because they died :p)

Give each type a distinct color and you get a map that both *looks good* and *is completely functional*.

## Lesson #1: Sloppy random generation is fine

Below are some images of my work-in-progress random world generator:

![The basic setup, first try.](devlog-tackling-tourists.webp)

![Making it look prettier.](devlog-tackling-tourists-2.webp)

![Making it look prettier again.](devlog-tackling-tourists-2.webp)

![Added height differences between countries to set them apart and add variation.](devlog-tackling-tourists-heightdiffs.webp)

It actually generates quite awesome worlds, with well-defined countries and seas and stuff. But there's no "genius algorithm" behind it.

It does this:

* Create a grid
* Pick a random location to start a new country.
* Grow the country (by finding an unused neighbour), until we want to stop. (Nowhere to grow, max size reached, random probability.)
* Repeat until all tiles are used.

The bulk of the code is actually needed to find the *outlines* of countries, the *height differences* (that give the map a sense of depth), and that stuff.

In case you want to know:

* Outline = for each cell, check its neighbours => if the country number is different, place an outline
* Height differences = generate a noise map (OpenSimplexNoise), everything below a certain value is water. Now compute the *average* noise value for each country, use that to draw their height.

As I said, I wrote this code very early in the day, considering going back to bed, and just wanted to get something working. But in the end ... almost all that code made it into the final game, and it works just fine.

Why is this a "lesson"? Well, if you search online for random (world) generation algorithms, you get all sorts of complicated stuff. Everyone has their own use case, their own method, their own favourite algorithm they read about somewhere (or that "game X" used).

But really, most of them are unnecessary. Random generation is about creating unique levels *that are fun*. Therefore, we're not looking for a "perfect" algorithm, we're looking for something that easily allows us (the developers) to modify it and ensure the level is fair and fun. *That's what's important. That's where all the work lies.*

With my "dumb" method, I can control country size, amount of sea, height differences, how I display it all, size of the world, anything I need---and it does so within a second.

(The rest of the week was spent *adding stuff to ensure each random world was actually fun to play*, which had nothing to do with the random generation algorithm anymore.)

The code isn't even (terribly) optimized. I know that each level is a single screen, and needs to have large enough tiles for 4 players, which restricts the scope. Yeah, I would need that performance if I needed worlds that are 1000x1000 tiles. But right now, the biggest one (I would consider "fun to play") is more like 50x25.

Below are some more images of the maps a few days later.

![Already getting some UI going and getting a feel for how big/varied things should be.](devlog-tackling-tourists-maplater1.webp)

![Same thing, just a different generation.](devlog-tackling-tourists-maplater2.webp)

![A few days later, we have actual tourists spawning + checking if they visited.](devlog-tackling-tourists-firstlandmarks.webp)

## Lesson #2: Flock behavior is cool, but not what I needed

When I wrote down the game idea, I wrote down: **"simply remember the last 30 seconds of where a player has been, and align its tourists with that path"**

It's a fine idea ... but would lead to all your tourists walking *in a straight line* behind you, which is quite unrealistic and looks bad. (And produces some other problems with game mechanics I had in mind.)

Then I vaguely remembered reading an article about "flock behavior" *yeeeaars ago*, and how a few simple rules could make a group of beings move like a crowd with a purpose. So I decided to try that first.

The rules are simple:

* **Cohesion:** Each unit steers toward the average position of its neighbors
* **Alignment:** Each unit rotates to align itself to the average heading of its neighbors
* **Separation:** Each unit steers to avoid hitting its neighbors.

In other words, each unit gets a *circle* around it. Anything within it is a "neighbor".

Now ...

* Calculate the average position, steer the unit towards it.
* Calculate the average heading, steer the unit towards it.
* Use a raycast to check if you're about to hit someone; if so, steer away from them
* Once you have the direction, move forward

How *fast* you steer, and the *weight* of each component, depends on you and your game. But that's all you need for a group of physics bodies to behave like a flock of tourists!

**Remark:** for better results, however, it's best to ignore neighbors *behind* you. You don't "see" them. So calculate the *dot product* between your heading and the vector to the neighbor, and if it's too low (below -0.5 or something), ignore that neighbor.

**Remark:** in fact, if you give each unit a very narrow view (they only see neighbors in front), they will form a line! So we can still do that.

**Remark:** weights should often be dynamic. For example, if you're *really far away* from neighbors, the "average position" should be more important. But if you're *really close* (and about to hit someone), the "avoidance" should be way more important.

In my case, though, I needed something extra: this flock has a *leader*---you! How do we account for that? How do we make it follow the leader above all else?

For now, I simply implemented the most "naive" and basic solution: your tourists ignore each other and go straight for _you_. They don't interact, but the tourists do have bodies that automatically keep them apart, as they _all_ try to get closer to _you_ (the player).

## Lesson #3: Never lock players

I've been developing games for a *long* time now. And when I was younger, I would often encounter a ruleset/game state in which one player was simply *locked in*. They couldn't do anything. Either they had to wait until something happened to be freed, or they were just out of the game.

At the time, I was like: "well, that's your own fault, if you'd played better that wouldn't have happened! So I don't need to change the game."

Well, I've learned that this is a terrible idea :p Never, ever, ever, prevent players from actually playing the game. In a sense, never *penalize* players playing badly---instead, *reward* players doing well.

### Entering new regions: not allowed?

In this game, the danger of locking in players was *always* present. This was the original idea for a mechanic:

"There are X different terrains. Each region has a random terrain. You can only *enter a terrain* if you have at least one tourist of that type. Having more of them makes you walk *faster* through that terrain."

Sounds fine, but what if random generation is against you? You simply *cannot get a tourist of type A*, but *the only way to move is through a terrain of type A*. That means you're out of options and out of the game, which is bad!

I needed a way to make tourists interact with terrain (and reward good combinations), *without* completely prohibiting something. These were my ideas:

* You can always enter a terrain. For each tourist of the *right type* you move faster, BUT, for each tourist of the *wrong type* you go slower.
* There's a sort of "chameleon" option that always works. Either a tourist that can go anywhere, or you can pay X coins to enter a locked region, or any Y tourists of the same type can be *any other type*.

Even though the second option could be really interesting, it feels much harder for players to comprehend (and use well). You'd have to constantly count your tourists, calculate how you could use them otherwise, bla bla. It feels more like a small expansion, not a core rule of this game.

(Well, the *pay X coins* aspect is much easier and will probably be a large part of the game. It's not hard for players to check "hey, do I have more coins than the number shown here?")

So I went with the first option. If you want to go through the red terrain (for example), without any red tourists, you will move *really slowly*. But you will be able to do it. It might even be the best option available to you.

But to move quickly (and win the game), you'll have to constantly manage your tourists. Get the right colors, get rid of those that slow you down.

### Starting position: acquiring tourists?

**A second example:** starting positions. At first, the idea was:

"You start with 10 tourists. During the game, you'll probably lose some to hazards and disasters and stuff. To win, you need at least *one* remaining tourist behind you."

Hopefully, you already see the problem here. What if you start with the wrong tourists? It's simply impossible to get somewhere. Maybe even impossible to move more than one or two regions before getting stuck. And even if it's *possible*, it might be completely *unfair*, because another player was dealt a way better hand (of tourists).

I can *try* to calculate this, but it would be hopeless. I can't predict how players will play, what they will need, which countries they will cross in what exact order, and then find the perfect tourist set for that. It's just a bad idea to start with.

So I changed it to:

"You start without tourists. New tourists will arrive at fixed locations (e.g. airports and docks). You can make them yours, by walking towards them and pressing a button."

There is still some randomness and unfairness possible, such as a player starting closer to tourists they could use. but its impact is much smaller.

(I mean, it isn't even obvious whether it's better to walk a distance to grab those tourists, or ignore them for now and walk straight to a landmark. That's up to you, your strategy, the actual map layout, etcetera.)

You can *choose* which tourists you want. You can *choose* whether to get extra ones or not. And everyone starts *identically*. (And because of my new rule I just explained, as long as you have NO tourists behind you, you can walk anywhere with equal speed!)

### During the game: how to lose tourists?

There's **one last issue** here, and that's about **removing tourists**. Right now, you can't. They will follow you until the end. (The only way to lose them, is by *accidentally* losing them to something.)

My first idea is the obvious one (and also the wrong one): "Just give players a button to delete tourists. Or they die when you throw them in the water, or something."

This is *too easy*. You can immediately get rid of anyone! There's no game, no strategy, no skill here.

Instead, I think there should be specific locations or actions that do this. (Because, if tied to a *location* you can't remove tourists *any**where** you like*, and when tied to an action you can't remove tourists *any**time** you like*.)

Some of the initial ideas:

* A landmark that requires you to leave behind tourists. (You *choose* which ones you leave behind.)

* A landmark/region that repels a certain type of tourist. (So, entering it will automatically get rid of a few.)

* Natural hazards, such as *lava*, that can randomly "explode" and take people with it.

* Dropping tourists at an airport, so they can continue their holiday elsewhere?

* Or a (suspicious ...) shop where you *pay* to remove tourists :p

And of course: **battling with other players!** The "tackling tourists" from the title. If you don't like your current setup, go find another player and let the tourists battle it out.

## Lesson #4: random generation = the other way around

Several times now, I've encountered a huge problem (during development of a game) with random generation ... and the solution was to think the other way around.

So, in this game, I needed the landmarks and tourist generators ( = where new tourists spawn) to be placed fairly across the map. No player should have a clear (dis)advantage right from the start.

But how do you do that? At first, I invented two "naïve" algorithms.

Landmark creation:

* Just place landmarks randomly.
* Then, determine a random *route* through them for player 1. (A route = "These are the landmarks you need to visit to win the game")
* Calculate the average distance between landmarks in this route.
* For all the other players, create a route that is *roughly* the same distance.

Tourist generator placement:

* Pick locations that are equally far from all players

There are some big problems with this.

**Problem #1:** what if the random route for player 1 is a bad one? (Extremely short or long.) Then it will be impossible to find good routes for the other players.

**Problem #2:** *How* do we make the player routes *roughly match* a certain distance? We can't try every possible combination, as that takes too long to compute. We would just have to *hope* we can get close.

**Problem #3:** When tourist generators are always equally far from all players, we'll always have a bunch of generators crowding the center of the map.

So I thought, and I thought, and I thought, and then I realized ... *wait, why don't we pick the player starting position **last**?*

Here's how that works.

* We randomly place landmarks and generators

* For each player, we determine a random path.

* Then we assign each cell a "score".

    * This is based on its distance to all generators.

    * And its distance to the landmarks in a specific path.

* Sort this list from high ( = largest distance) to low.

* Search the list until we find a few cells after each other with (roughly) the same score => place players there!

* (For best results, I guess we should also ensure two players don't start too close to each other.)

Obviously, many other factors can give you a (dis)advantage, such as the terrain types on which you start. But those deviations are much smaller*,* easier to overcome, *and* less obvious from the start.

(A game is fun *when the players think it's fun* and they *always have a chance*, not when it's theoretically 100% balanced and fair.)

## Intermezzo: a playtest

At this point, I did a playtest. It was only the *minimal playable version*, without any special tourists or landmarks or stuff.

And it was ... boring.

Sure, the "exciting" stuff wasn't in the game yet, which surely made a difference and will improve the final game. Over the years, however, I've learned that "adding more stuff" usually doesn't solve a game which has a boring core loop. It's just this "gut feeling" that you develop that tells you *adding more stuff* and *hoping for the best* will not solve anything.

As such, I wanted to hold off on "polishing/finishing" the game (by adding all that extra content), and rethink the basic game design.

Why was it boring? Well, players only repeated the following loop:

* Walk towards the nearest landmark

* Don't have the required tourists? Walk towards the nearest tourist generator and hope you get something useful. If not, oh well.

* Happen to meet another player? Start a tackling frenzy and see where you end up.

Additionally, many players had no clue what the others were doing. Was someone about to win? They don't know! Which meant the game over screen came as a complete surprise most of the time.

This was the feedback I received the most:

* "It's too easy to get tourists (which you often don't need), and then too hard to *lose* them."

* "I just don't know what the rest is doing. I'm surprised when the game suddenly ends."

* "I'm just ... you know, walking." (And if people didn't say this explicitly, I could see them losing interest with every second.)

(Of course, I'm only highlighting the negatives here. The game worked, people understood how to play immediately, it already looks quite nice, etcetera. It's not like I made something unsalvageable that was just terrible in all regards :p If that was the case, I would quit development right here and start something else.)

To solve these issues, I see two options:

* Give more control over your tourists (adding/losing them)

* Make actual *moving* more challenging, and the effects of different tourists on speed more extreme. (Because now people just move in a straight line.)

In short: it's a game about moving and managing tourists, *then both parts should be very fun and challenging on their own*.

### Option #1

From the start, I had plans of dedicating a button to "grabbing a tourist", but now that I know what gameplay looks like, this was a stupid idea. Tourists follow you, so you literally *can't* turn around and grab a specific one. They would just evade you!

So I'm changing this to a more precise control: while holding a button, you can cycle through your tourists (with your joystick) to select precisely the one you want.

Besides that, I think there should be *more* tourist locations, with *fewer* tourists per location.

And there should be more *hazards* in the game world or *landmarks* that require you to "sacrifice" a tourist.

### Option #2

With your joystick, you control your precise direction, at "walking speed".

To make movement more varied, we could add these other actions:

* Dash/Tackle => burst of speed in a given direction, needs a time out

* Jump => certain obstacles can be jumped *over* to avoid them

* Custom => *I'll explain this below*

Right now, tackling is already implemented. Just press any button and you tackle! The issue? It's too strong. You are just way faster if you spam the button and constantly tackle. Additionally, you could be an asshole and just tackle other players constantly to prevent them from playing the game.

What if ... **you must sacrifice a tourist to do any action?**

When you press the "dash" button, it sacrifices a random tourist. No tourists left? You can't do it.

The "custom" action is just a slight variation on that. When you press it, you can select *which tourist to sacrifice*, and that determines which action is executed. (For example, one tourist might give you a temporary speed boost, while another allows you to teleport.)

This actually solves **both problems at once**. Moving is more varied (and if you're skillful, there are ways to be faster than the others), but you can also more easily lose tourists.

## Lesson #5: Multiple currencies

So, when trying to implement all my ideas above, I kept running into the following problem:

* Putting **no cost** on an action makes it too easy and powerful

* But making players **lose a tourist** every time they do an action was *too big of a cost*.

I broke my head over this, knowing that both extremes weren't balanced or fun to play, but seeing no clear way to solve this.

Until I introduced "money", that was. At first, I simply introduced it as a *tiny, nice addition*. Maybe you could pay for some stuff with money, or do a super special action if you have a lot of it, something like that.

It took me a few days of playing around until I realized: **wait a minute, money *is valuable*, but it's *less valuable than a tourist*.**

It was the perfect middle ground. Instead of making players "pay" a tourist to do an action, I could just make them pay money and keep the tourist.

This way, there was still a *cost*, and you couldn't just infinitely spam a certain (beneficial) action. But the cost isn't *so high* that nobody wants to pay it.

In most games, on average, people have 3-5 coins for each tourist they have. This means you have more than enough room to pay a few coins for actions.

(I'm trying to find the correct term for this, but haven't succeeded so far. The idea is simply: money as a currency has *more subdivisions* than tourists, as you cannot sacrifice "half a tourist" or "1/4 of a tourist". This makes it more flexible to use as a currency.)

**The lesson is:** if you cannot find the right "cost" for a certain action, either add a new currency (that is less valuable), or find a way to subdivide your currency into smaller pieces. (Alternatively, make the action itself *even more powerful*, but that wasn't an option here.)

## Lesson #6: Tutorials can always be better!

Over the years, my games have simplified immensely, and the tutorials improved.

But still ... when playtesting my previous game (well, actually the one before that, my last game has no tutorial to speak of) I noticed that it still wasn't great.

At the start of each level, I showed a big image with a new rule/mechanism/cell being added. If a level had multiple additions, I showed a few images after each other. (Players can press a button to indicate they've understood an image and want to show the next one.)

Even though this is *fine* and gets the message across reasonably well and quickly, I still saw many testers just *skipping* it or being *overwhelmed* by these images. (Especially when they came to the later levels, when a certain amount of complexity had already been built.)

So I wondered: can I make these tutorials *even smaller*? Can I make sure that I don't present everything *at the same time*, but in bite-sized pieces, in *sequence*?

As it turns out, I could! One day, when I just went to bed, the idea popped into my head:

"What if we display the tutorial as *cards*? Each level has 1-3 cards. Pressing a button *flips* the first card and shows its content. Press a button again to flip the next one, and so on until you've seen all cards. Then the game starts."

![This wasn't the first version, but one with lots of other things already implemented. I forgot to take a screenshot while developing this.](tourists_tutorial_1.webp)

![But the general idea of the tutorial system is hopefully clear.](tourists_tutorial_2.webp)

This has several clear benefits:

* Each card is *exactly one thing*. (Usually a one-liner rule + some icon/image to help explain it.)

* This forces me to keep it as simple and small as possible. (I forbid myself from "spreading" an explanation across multiple cards.)

* Information is presented in sequence. Players choose when to show the next bit of information.

* Players know exactly *how much* tutorial there is. (The backs of the cards even tell you what *type* of information it is: A new rule? A new terrain? A new control?)

It's just a very visible, clear, simple, controlled way of giving a tutorial.

As I write this, I've implemented the system + drawn all cards until level 20 of the campaign. And I'm very happy with the results! It looks great, and even though this game has *loads of content* (different tourists, different terrains, etc.), I don't think *anyone* will have trouble learning or understanding it.

**Remark:** the *controls* are still completely interactive though! When you log in, a bubble appears above your character that tells you "MOVING = THIS KEY". When a new control is taught, a bubble stays above your character (for a minute or so) that says "NEW CONTROL = THIS BUTTON"

This way, you have a constant reminder, and can immediately *test* the button. I've found this kind of interactive tutorial to *always* be the best way to teach new controls.

**Remark:** Also, if I do end up with a game that's too complex ... that's no problem! I can just rip out the most "boring" or "complex" mechanics by never teaching them (and removing them from the list of options in *free play*).

Yes, it does feel like "wasted work", throwing away things you've worked so hard on. But I have to remind myself: the only reason I *know* that a certain mechanic didn't work (as well as I hoped), is because I built it and tested it. So it wasn't for nothing: it helped make good decisions. And it helped the game improve as a whole.

## Lesson #7: Making a good campaign is about asking yourself: "is that really so?"

The campaign structure you see in the final game is *nothing like the original draft for the campaign*.

There are mechanics/rules that I *thought* needed to be taught as early as possible. But when I implemented it, and tested it, and thought about it some more, I asked myself: "hmm, is that really so? Do I really need to already explain this mechanic in level 2?"

Usually, the answer was *no*. I could move it to a much later (and better) moment. By turning off some other rules, or delaying the introduction of a button, I could simplify things even further.

Many tutorial cards from the first 10 I made ... ended up being used for the first time in level 6 or 7. That's how much I was able to simplify *and* move stuff around in the end.

**Remark:** my first draft also had some elements that were, in hindsight, completely stupid. For example, level 1 taught the rule: "when tourists come close to each other, they will tackle each other!" But ... in level 1, there aren't even any tourists yet xD Those are only introduced in level 3. So it's completely unnecessary to explain the rule in level 1.

**Remark:** another example of the mistake above. At first, the control for *choosing which tourist to sacrifice* was explained in level 7. (At the same time I explained sacrificing in general.) But ... at that moment, there is only ONE tourist type in the game! So switching is absolutely useless, because there's only one tourist to sacrifice xD

However, there's also a reverse problem: if you remove too much, the game will become too boring/easy/repetitive. Especially the first 1-3 levels of a campaign are all about *teaching* the rules, about giving players *a sense of how the game plays*.

### My "rules" for this

So these are my rules for making that a good experience:

**Rule #1: Make the first levels considerably shorter.** In my case, length is determined by *the size of the map* and *how many landmarks are on it*. As such, the first part of the campaign has a map that's *half the size* of a full map.

* Alternatives are to set a *timer* and make it very short.

* Or to lower your objective (if you need X points to win, for example)

* Or to add simple mechanics/rules that force the game to a close. Maybe players have only 1 life during the tutorial levels, instead of the 3 they have normally.

**Rule #2: With each "core mechanic" you explain, make sure to also feed a *tiny* bit of spicy topping.** This is a hard one, for sure. It's all about finding *something* from your game that is very easy to understand for new players, yet adds lots of variety and fun on its own.

* I already add the first hazard ( = a hole to fall into) at level 2. I could've waited much longer, for example until the moment more terrains and hazards are introduced. But the hole is the only thing preventing you from just driving in a straight line from A to B. It is, therefore, crucial in making the game more challenging.

* Similarly, I wanted to add the "gate" landmarks as soon as possible. (The large gate has a *number* => you can only visit if you have *at least* that many tourists. The tiny gate works the same, but reversed.) It's a very simple landmark, but it's crucial in forcing you to *think about your tourists*. Without these, you can as good as forget about tourists, and just walk to all landmarks.

**Rule #3: Find a balance between structure and variety**. In most games, there are many things that fall into the same "category" or "system".

For example, there are 10 tourists in this game that are *connected* to a terrain type. They all do the same thing: when sacrificed, they paint the terrain to their type. They're in the same "class", if you will.

It's much *easier* for players to understand these, if you explain them *right after another* ( = structure). But it's also *more boring*, because players don't see any *truly novel elements* for 10 levels in a row.

That's why I decided to always add a *new landmark* during these levels as well.

This way, I keep the structure ( = all those tourists are explained after each other), but there's always something new ( = a completely new landmark to visit).

**Remark:** obviously, I have a simple script that *forces* the "new elements" to be used a lot. For example, the level that introduces the "gate" landmark is *guaranteed* to include at least X gates (of each type). This ensures players *actually get to interact* with the new thing they learned, before continuing.

**Remark:** in that sense, my game has a *great* objective! Because you need to visit all landmarks to win, I'm *100% certain* players will also visit the new landmark! Because you need certain tourists to win, I'm *100% certain* players will use them! This makes my job considerably easier. I don't need any "workarounds" to ensure players interact with whatever the tutorial taught---it happens automatically.

### Another good example

**UPDATE! Another good example**, which I forgot to share here initially.

The first plan for the campaign had everything mixed and mashed together. Each world would have 10 levels, each level "introducing" a new landmark + terrain + tourist. This was too much. Also, there was no way for the *player* to know if they needed to continue the campaign (to learn some essential rules of the game), or already learnt enough to do free play.

Thus, the second plan became: make each world about *one thing*. The second world introduces *all* tourists of one type (terrain painters) and their corresponding terrains. The third world introduces *all* special tourists. Etcetera.

You see the problem? Worlds would get large. And *all those levels*, you were constantly being taught something *in the same category*. There was no variety. I had to wait 30-40 levels to introduce a landmark which I thought was pretty basic and useful anywhere.

So, the third plan was born.

* Each world still does *only one thing*. (Either new landmarks, new tourists, or new terrains.) Way easier to teach, similar information is close together, and worlds are "themed" somewhat.

* But worlds have at most 5-6 levels. After that, a new world starts *with a new category*. This way, you get the necessary variety, and I can introduce cool (simple) stuff as early as possible.

* And to top it off, I added message to the campaign screen saying "world 1 + 2 teach you the essentials (so follow them in order), after that each world simply adds more variety and content"

(It would've been ideal to allow "after that, pick any world that seems fun!" But I can't do that, as there is still an order to the things being taught. If you randomly start a world near the end, it will use all sorts of landmarks you've never seen before! And don't know how to use!)

This way, each world is short and coherent (and doesn't overwhelm players), while keeping variety and making each level feel different.

**In conclusion:** as you can see, the process of *teaching* a game, and *presenting* all its rules/mechanics/content is way more work than you'd think. At least, if you want to do it right.

## Lesson #8: Take some time off

Halfway during development, I was certain I was making a boring-ass game. It just felt "meh". And anything I added, tipped the scale of complexity *all the way to the other side*. (With one early playtest revealing that many games were simply *unwinnable*.)

So I took time away. I started a new project---which I'm actually *very* excited about and is looking great---and worked on it for a week.

Then I went back. I still had that old lingering feeling: "why am I even doing this? It's not a good game." But it was subdued and I could force myself to implement the tutorials, to implement some new landmarks, try it again.

And guess what? *I was surprised how fun and challenging it was*.

I played a random level (somewhere halfway the campaign), and actually had to *work hard* to complete it and keep myself alive. And be a strategic with my movement and landmark visiting order. And I wasn't even playing against someone else :p

Simply by taking some time off, I could see the game with fresh eyes and realize it actually had great potential (and already was halfway there). If I hadn't done so, this game would probably have been thrown in the garbage and I would never have looked back.

**Remark:** as I'm an artist in general, I'm obviously a perfectionist and never satisfied with anything. So I'm still afraid the game has too much content to learn (easily, for the casual gamer) and too little fun gameplay to keep it interesting. But I know myself, and I know these thoughts, so I decided to ignore them and just *finish the game* and make it *as good as possible* within a few weeks time.

## Intermezzo: Another playtest

After some struggles with crashes and buggy systems, I was able to do a proper playtest again.

(If the game crashes 3 times within 10 minutes, I usually just say "you know what, let's try again another time" :p It's never a big issue, though. I immediately see what's wrong and fix it within 10-15 minutes. But I don't want my playtesters to just *sit and wait* every time I need to fix stuff.)

**Yes, this game is finally becoming what it's supposed to be!**

It's fun to play. It's hard to avoid hazards, to visit special landmarks, to find the fastest strategies. It's fun when you have the right tourists and you're *speedy speedy* across a certain terrain.

I'm quite certain now that this game will become good and it's worth properly finishing and releasing.

That said, there were obviously things to fix:

* Gates need to be *slightly* wider. Now it happens too often that it comes down to *pixels* whether you can go through them or not---way too annoying.

* The game crashed when using the D-pad on a controller. Probably a stupid typo by me somewhere.

* There should be **some limit** on player tackling. Otherwise, a player can just infinitely annoy you and prevent the game from ending.

    * Maybe there's a countdown for "aggression" or something. It takes time before you're "allowed" a tackle again?

    * I want this to be *subtle*, not some obvious restriction forced upon the game. So I need to think about this.

* In a similar vein, the **"Notre Ham"** presents an issue. If you have fewer than 5 coins, but it's the last landmark left for you ... you can never visit it anymore.

    * I can either *spawn random coins around the map*.

    * Or provide a way to *trade/sell* tourists for money :p

* The "**Golden Trade Bridge**" needs clear feedback *if you're standing on the sacrificing platform*.

    * Probably an outline around the platform + it lights up + a feedback icon?

* The "**Big Band"** ( = Big Ben) is too hard. It requires you to have *at least one of each tourist type* in the game => it's rare that someone manages to do it *once*, let alone *multiple times per game*.

    * I've changed the sprite to show *three (different) tourist types* at the front.

    * You must have *all of these* to visit it.

    * The Big Band appears *at most* twice per game, usually only once.

* Tourists need to **stay with you better**.

    * Now it just uses a rough distance estimate => if you're more than 200px away from one of your tourists, they stop following you

    * Instead, they should stick together *as long as there's any other tourist within that range*. It's only realistic: as long as you can see *one member* of your group, you're not lost and can still follow the group.

* Terrain painting needs to be **way more useful and practical.**

    * Right now, you simply pay 1 coin to paint the terrain *you're currently on*.

    * But ... painting is only useful *if you still need to go somewhere*, not if you're already there.

    * So, instead, when painting you can **choose a neighboring region** to paint.

    * Yes, it adds an extra step, which is more complexity (to explain + to code). But it's *waaay* more useful, and fun, and strategic, and powerful.

    * (If it ends up being as powerful as I predict, I *will* increase the price of the action of course. Paying 1 coin is way too little then. Maybe it even costs the full tourist.)

Yes, quite a few changes. Some big ones as well. But I'm sure these are great improvements to the game, and, I hindsight, I'm mad at myself for not thinking of these things earlier :p

## What if this was ... 3D?

First of all: from now on, the devlog will become a little less technical, as I realize it's getting very long and I'm probably boring you with these *tiny details*.

Secondly, at this point I realized I might have made a mistake when I decided to make this game **2D**. Why? Because this game is *all about space*. It's about moving from one place to another, all the time. That's the whole objective and main action of the game.

If your game is about spatial relationships (and moving), it's basically **always a good idea to add an extra dimension** (aka, 2D -\> 3D). Adding that one dimension opens up whole worlds of possibilities for movement and placement of landmarks.

For example, if it were 3D, I could allow players to move up and down. Some landmarks or terrain would be at specific heights---finding a way to get up (and down) would be an extra challenge.

Also, it would probably look better, because the current 2D map is more functional and silly than that it gives a sense of "this is another planet with beautiful landmarks"

So, yeah, that's it. If this game becomes successful, and I'm not completely annoyed by it when it's done, I might write a plan to turn it into 3D. For now, though, all code/sprites/mechanics are for 2D only (and the game is at least 75% done), so I'm not changing this now.

## Lesson #9: Leave something on the table

I am *amazing* at generating ideas (and implementing them, most of the time). I don't know why, my head just works like that, and I've tried to hone that skill over the years. (This will probably sound arrogant, but please read on.)

This has the big *issue*, though, that my projects always *explode with content*, as I try all these ideas and find that 90+% of them fit well. And I don't want to remove them.

The result? It takes at least *double* the time for me to finish games, at which point they are so big that I'm really not sure if it's just *too overwhelming* for new players. (And what price I should ask, or what popularity I should expect.)

This game is perhaps the best example of that. There are three components that can basically have endless variety: tourists, landmarks and terrains.

Obviously, I have a big list with loads of ideas for each. I've already forced myself to narrow it down and allow *at most* 20 tourists and terrains. But that's still a lot. And no matter what I try, no matter how long I think about it, I can't find a clear set of them to remove from the game. Most are equally "strong" or "fun".

In the past, I would try to churn through all these ideas. Within a week, I would just work and work to get it all implemented. If it all worked, I put it in the best order, gave it tutorials, and called the game finished.

This, unsurprisingly, drained all my energy and didn't necessarily give the best end product.

So, for this game, I broke all that content into "worlds" (for the campaign) with at most 5 levels. (Which I explained before, but this was another reason to do it.)

I will implement and test these one at a time, and only continue to the next if I *still have energy and motivation* and *all previous things are finished and work great*.

The result is a game that has 60%-70% of all my ideas in it. But, if it's popular enough (and I take some time off), I have a bunch of worlds ready to be added as "expansions" or "bonus content". In a sense, that last 30% is a *bonus reward* if people really like the game.

This prevents me from burning myself out and blindly filling the game with content. I've come to realize that **just because something is fun and interesting and cool, doesn't mean it *has* to be in the game or your project has failed.**

I can leave some stuff on the table. Maybe it will stay there until I do a thorough cleaning in the future, or someone else will pick it up (after being inspired by this game and its ideas), or I'll pick it up myself if my fans ask for it.

But it's way better to leave it on the table for now, than to spend weeks stuffing it all in bags, whilst most people are more than happy (and occupied) with the first bag you gave them.

## Lesson #9.5: A sequel?

The more I worked on this game, the more I learned of ways to improve the core concept. As is always the case, though, I was stuck in my current path and these improvements basically meant *a complete overhaul* of the code and the systems.

(That's the problem with making art: the more you do it, the better you get, so everything seems like it should've been made differently *in hindsight*.)

But I decided *not* to do these big overhauls, which is a continuation of the idea "leave something on the table". Instead, I wrote them down as a wishlist for a possible sequel.

The wishlist is as follows:

* Make it 3D

* Find a way to keep the current length/complexity/variety, *but with a smaller map* (or one that's simply easier to read and comprehend)

* This also means I want to make individual tourists *more valuable*, making it a tough choice when to sacrifice one or pick up a new one. (Currently, depending on the map and landmarks, most players are a bit careless about tourists.)

* Focus way more on *landmarks* and the core *moving mechanics*, instead of terrains and tourists. This should keep variety, as you need different strategies for visiting, but make the game much simpler to learn.

    * (For example, I've learned that simply putting loose requirements on the *order* in which you must visit things is already enough to make the game challenging and fun. Or simple restrictions on the tourists/speed/money you need at that given time.)

* Show more clearly the exact bounding box for landmarks and players/tourists. It's *fine* right now ... but it can sometimes be a bit annoying when you're not sure how far you have to move to visit something.

* Really home in on the *interactive* elements of the game. Now only 25% of the elements provide interaction, the rest of the game is just your own puzzle to solve. But the interactive bits are usually the most fun, according to me and my testers, so why not turn that up to 50-75%?

* This one's more for myself: determine a good general structure for all the components, write a script/scene for that, and use that to streamline the process.

    * (Right now, there's lots of duplicate code all over the codebase and unnecessary busywork for myself. I could've just written one base "landmark" class at the start and be done with that.)

* Think about a solo mode, hand-made maps, and perhaps allowing 4+ players. Really turn this into a broader game that could be played in more situations.

* Remove the need to learn two buttons plus their actions (which can vary greatly between tourists, terrains, and levels). Instead, give players one "general" button, that has a clear function in each situation.

All of this should lead into the following: I think this game and its ideas could be a huge hit with casual/general audiences ... but the current version is too "gamery" and tries to attain too much depth to achieve this. (Maybe people will surprise me, but I don't expect this game to find a large audience.)

And to make that happen, it just needs to focus on *one strong idea* (the landmarks and visiting them), and create visuals that are big, bold, beautiful---and easy to comprehend at all times.

It's hard to explain. It's just a gut feeling and a visual in my head. Maybe I'll make that successful sequel and show/prove what the heck I'm talking about :p

## Lesson #10: Never too late to switch some things around

Overhauling complete game mechanics was too much for me, hence the "sequel" tip above and the decision to shove all that to another project.

But ... those lessons about which landmarks work best are still valuable here, because it's not too much work to switch them around. To put the "best" landmarks at the front. (Those that have the perfect balance of simplicity and excitement.)

So I did. I spent a whole day figuring out the best order, couldn't do it, so I slept on it, and then figured out the final order the next day.

These were key things I tried to fix:

* **Problem?** One of the reasons players don't think too much about their tourist usage, is because you can always easily *kill some by walking into water*. Players soon figure out that they can grab as many tourists as they like, and dump them this way, which is a valid strategy at the moment.

    * **Solution?** I removed that. Now it costs *money* to enter water. Which means the only way to get rid of tourists, is by visiting a remover (only a few on the map, spaced-out), or sacrificing one.

    * **Solution 2?** The "Hanging Barbers" landmark was moved forward. It forces you to think more about the order in which you do things and is just, in general, a great landmark to introduce early on. (It's simple: each barber has a number, visit them in order.)

* **Problem?** When the "sacrifice" button is explained ... there is no real incentive to actually use it. No landmark *requires* it and the tourists you currently have don't give *crucial* bonuses when sacrificed.

    * **Solution 1?** I moved the "Golden Trade Bridge" landmark to this level. To visit it, you must sacrifice X tourists (while standing on it). The perfect test!

    * **Solution 2?** The only tourist you have, at that moment, received a better power, so you *want* to sacrifice it sometimes.

* **Problem?** Similarly, the "paint the terrain" mechanic is not essential when it's explained.

    * **Solution?** I moved the "Panthebomb" landmark to the front. To visit it, you need a tourist with the same terrain type. Often, this landmark will be on the wrong terrain (or no terrain at all), *forcing you to paint it!*

    * **Solution (sort of)?** The mechanic is now explained over *multiple levels*, instead of one, making it easier to grasp.

* **Problem?** This game has two methods that can be used for something I call "bullying the game". If you use these methods well, you can simply *prevent anyone from winning*. Which is an asshole tactic, but I just know *some* people will go for that and ruin it for everyone. Obviously, that needs fixing.

    * **Solution 1?** The "delicate vase" landmark is removed. (It said that only *one player* can be in a region with a vase at a time. So, someone can just camp in that region the whole game, and nobody can win.) I might adapt it and bring it back later.

    * **Solution 2?** The "tourist tackling" mechanic is severely weakened. (It said that, anytime two players come close, their tourists attack each other.)

In other words: many landmarks were moved to the front, others pushed back, and some rules and levels were changed to make more sense (or be a better introduction).

If you've read this whole devlog, you know that the "tackling tourists" part has actually given me endless headaches. But it's in the title. It was at the core of the game, since the start, so even though I'm *tempted* to completely remove it, I don't want to.

Why is it a good idea? It forces players to keep a safe distance from each other + creates some fun chaos. Why is it a bad idea? Someone can just keep attacking you and prevent you from winning.

Usually, you'd say something like: the one who started the attack is punished for that. But I *don't know* who started the attack, because if tourist A sees tourist B ... then B also sees A. So they attack at the same time. There's no way to draw a (clear and fair) distinction.

As such, I chose to simply *limit* the tackling in the simplest way I could think of: you get X tackles per game, end of story.

But then I thought: what's a logical amount? How do I communicate this to players and make sure they remember? Choosing a random number, and displaying it just as randomly, isn't great.

This is how, **the day I tried to completely finish the game**, a whole new mechanic was born: **reputation**. Whenever you kill a tourist, your reputation drops. Whenever you attack other tourists, your reputation drops. Whenever you die, your reputation drops.

And guess what? You only "auto tackle" if your reputation is high enough! This solves all the issues, because after one or two attacks this reputation will be depleted, so you can't attack for a while. Additionally, a player who is aggressive and just annoying, will already have a lower score and be less likely to do this.

(And hey, that's nice, now the delicate vase can stay where it is! *You can only visit it if your reputation is high enough*. Makes sense thematically as well---they wouldn't want rogue tour guides coming near that *delicate* vase!)

My only complaint, obviously, was the fact that this added *another different thing to the game*. But in the end, I think it's worth it, and I made enough space in the campaign for it to be explained well.

## A Playtest that changed everything

### The playtest

So. The game was finished. Polished, no bugs left, complete campaign/tutorial worked out, *ready to be released*.

Of course, I wouldn't release it without playtesting it first. So that's what we did. I gathered some players (who'd never seen the game before---they didn't even know what it was about) and asked them to play, with no input from my end.

On one hand, the playtest went better than expected. There were no crashes, only three minor bugs, they played for an hour longer than planned (which indicates they were at least engaged), I didn't have to explain anything ...

... until I did. As soon as worlds 3 and 4 rolled around, I started losing players. They just ignored any new things explained and stumbled their way to almost-victories. (Most of the rules are *essential*. Without knowing them, you cannot win, but you can *almost win*.)

The whole "painting" mechanic was lost on everyone, except for the one player who calls himself a "gamer" and immediately knew what I was going for.

On the flipside, the first few levels of the game weren't really fun, because they were so *basic*. Only one or two things you can do, a very blank/simple map, which means it's not the "booming start" you hope for with your game.

So yes, the game works, it's *kinda* easy to pickup for anyone, and *kinda* fun from the start. But that just won't do. Because this means the game can be summarized as: a slow start, and after that it's too difficult to understand. A lose-lose situation.

> **Remark:** there is one extra issue here, though. My playtesters *are really bad gamers*. Not in terms of skill, but in terms of attitude. If you play boardgames with them, they just ignore rules explanations, and then complain the whole game long that they don't know what to do, giving up before we even started. This means that I always have to ask myself: *is this really that difficult, or are they just not trying at all?*
>
> I, however, try to approach this the other way around. Because I know, from past playtests, that *if the game is simple and good enough*, I *will grab their attention* and they *will try to win*.
>
> It's a challenge: how can I design the game to get this perfect, ultimate, wonderful situation to appear?

Even though I decided to stop here and leave major changes until the sequel ... as I said, this just won't do. There *needs* to be a better, cleaner way to include *everyone* into the possible target audience for this game. A way to start the game with a bang and get everyone's interest from the start.

This is the target:

* Add *the* elements, in the first 1-5 levels, that produce the biggest "wow!" moments. Start with a bang.

* Take a *long hard look* at *all* rules/exceptions/systems in the game. See if they can be simplified, combined, or ideally *completely removed*. (Even if that means the game becomes less challenging or strategic.)

* Leave a *big gap* between introducing different big systems.

* Make it *essential* to understand a new rule/button/whatever. You cannot play or win without trying it.

* Completely prevent players being "stuck" or "held back". (Right know, you can only get stuck for "obvious" reasons, such as when you drive straight into a wall. Even though that's obvious and logical ... doesn't mean it's *fun* for players. As it turns out.)

* Move "learning a button" *as late as possible*. And, it pains me to say this, think about removing (or seriously altering) the *terrain painting* mechanic.

In a sense, I should look at the game as a "mario kart---advanced". It's a racing game. You're literally in cars, trying to be faster than anyone else, visiting (check)points.

Mario kart is accessible and fun for anyone. So how do I copy those properties to *my* game, which has so many similarities?

Well ...

* To play mario kart, you only need to know one thing: **move**.

* To play it *well*, you can use 1-3 extra buttons. But it's not necessary to play, have fun, and have a chance of winning. Why?

* Because the objective is straightforward and identical each time: reach the finish as fast as possible. (No player is ever thinking: "hmm, I don't know what to do anymore". Drive straight ahead. It's all you do. With my game, though, this often happened: "man, so many options, so many restrictions to visiting landmarks, what to do!?")

* And the game does a lot of work to *help players falling behind* and *fight against players leading the pack*.

In the next section, I'll talk about the biggest lessons I learned. (From playtesting, from comparing to Mario kart, and from this game's development in general.)

After that, I'll explain how I improved the game, using this knowledge.

## Lessons learned

### Lesson #1

**Lesson #1: When you teach something in a game, make it *essential* for *everyone* to know/understand, otherwise they can't play/win.**

I used to think this was a bad idea. I wanted to be "kind" to new players. Allow people to play, even if they didn't really know what was going on. *This is a mistake.*

Why? Because those people just won't have that much fun. And the other players, who are competing against them, *also* don't have much fun, because it's just too easy to win.

This is what I learned. You need to challenge players, it's the only way to ensure a solid game.

**Solution?** Whenever something new is taught, I add something that forces you to use it, or you get stuck immediately. (And it's up to me to make those new elements *simple* and *fun* and *well-explained*.)

### Lesson #2

**Lesson #2:** **Make game rules a *natural consequence* of each other, not something you need to teach.**

This is hard. Like, really hard. But also a great idea.

The version of the game (pre-playtest) had 10-20 "little rules" thrown in. Entering water? Pay money. Out of money? You die. Tourists come close? They tackle each other, but only if you have a good reputation.

Over time, these add up. Players forget them, players won't use them to their advantage, and they might even get frustrated because they don't "understand" what's really going on.

Instead, you need to design systems that *naturally lead* to the rulesets you want. So you don't need to explain them or "push" them on the players.

**Solution?** Well, there's no one-size-fits-all. For this game, I had to revisit all those tiny rules and find a creative way to get rid of them.

But here's an example to clarify the idea. I need "water" to be different from land, because it adds an interesting strategic choice: take the *long way around*, or go *straight through water* (at some cost).

Thus, the rule (which is taught quite early): "entering water costs X money. No money? Pay a tourist."

How do we eliminate that rule, but keep the special properties of water? These were some ideas:

- Make something obvious happen *automatically*. (So no need to explicitly teach it.) For example, you move more slowly in water.
- Automatically add *different things* in water areas. For example, I might add *way more* "tourist removers" in water, making it a (literal) sea of land mines to navigate.
- Or hook into an existing rule. If the general rule is "you need a tourist of type X to enter terrain of type X" ... well, why not add a "water tourist" that simply follows that rule?
- Create general "events" that happen automatically. One of them might be "thunderstorm" which electrocutes everyone standing in water. Knowing this event *might occur*, makes it a bit dangerous.

Hopefully this gives some *intuition* for how to do this. The idea is: don't teach a bunch of rules to players, do stuff *automatically* ("behind the scenes") to make those rules a consequence.

### Lesson #3

**Lesson #3: if your goal is a *family-friendly, extremely accessible multiplayer game* ... limit yourself to 1 button and 1-step actions.**

I thought that 2 buttons was a good limit. I though that a 2-step process (select a painter tourist, select a region to paint) was manageable.

It wasn't. Yes, people who are regular gamers have *no issues at all with this*. But everyone else? 1 button max, 1 step max. (Seriously. I could put a BIG FLASHING PROMPT on screen saying "press THIS BUTTON to do THIS", and they just don't read it and go like "well this game is hard!")

Yes, the current game, in its current state, is highly strategical and very interesting for those looking for a challenge.

But that's not why I make these games! That's not why I make them *local multiplayer*! It's a mismatch between the game and my target audience/goal/intention.

(Of course, I can keep the current ruleset/systems as an "expert mode" you can choose to play. But the default mode, right out of the gate, needs to follow the lesson above.)

### Lesson #4

**Lesson #4: To make local multiplayer games consistently fun, *help* players falling behind, and *fight* players taking too big a lead.**

Again, this isn't "fair". But it's the best way to go, for games like these.

Here's a situation that often happened: a group of testers had 1 player who was obviously the worst. When somebody won ... they only had 20-50% of their landmarks.

Not only is this a bit disheartening and gives a feeling of "being left out", it also means that they *didn't have a chance to interact with the new "rule" being taught*, and have no chance to win.

To repeat myself: these games are not made to be supercompetitive and give the win to *the absolute best player*, they are supposed as lighthearted fun for everyone.

So if there's any way to close some of the skill gap---even if it's an unfair mechanic---it's worth it ten times over.

Here are some ideas:

* Create a landmark (early on) that becomes *easier* to visit over time.
* Invent some simple rule/system/mechanic that makes progress *slower* once you get close to winning. (For example: for each landmark visited, your maximum speed decreases a little.)
* Sneakily place *more* hazards close to the winning player, or make them faster, or reduce their chance of earning good stuff.

## Conclusion

### The core concept worked

So yeah, this game started out as the simplest of ideas, mostly to test some theories I had about game design: "if we use a single objective that uses the *very intuitive, physical* act of moving, the game should explain itself!"

I can safely say that this theory was right!

No matter how much extra things I piled on, I rarely noticed people having trouble understanding or playing the game. (Sure, sometimes a landmark was explained and players were like "I *guess* I understand ... let's just play". But that happens even in the simplest of simple games, is my experience.)

All because the core of the game stayed the same:

* You are a character that can move around freely.
* There are locations on the map.
* Be the first to visit them all.

This never changes. There are no other objectives, no secret ways to win, and I made sure to never lock out players completely.

(For example, at first I had thoughts of adding *gates* or *walls* to regions, so you could only enter/leave a region under certain conditions or during a certain time. The problem? This interferes heavily with the core concept, as it might mean players just *cannot move* for 30 seconds, which means they *cannot play* for half a minute. Which is bad.)

(Another example: I thought of some "unique" landmarks which you could visit by, for example, collecting 4 keys strewn around the map. It's a fine idea, not too hard to explain or implement ... but again interferes with the core concept. To visit such a landmark, you *don't need to physically move towards it*, which was true for 99% of the other landmarks! I don't want to break that pattern or introduce extra complexity, so all these were scrapped.)

### The final game got too big

The game ended up having almost 20 tourist types, 20 terrains, and 30 landmarks. That is *a lot*. Arguably, too much, which is why I planned to do a sequel that focuses on landmarks (mostly). But because the core concept was so simple to teach and play, and I spent way too much work on creating the perfect campaign, being overwhelmed with information or possibilities never became an issue in all my testing.

Yes, a "One Week Game" ballooned in size and complexity to be a "several months game" that's maybe the biggest I've ever made. Even though this is a great improvement over my older habits (of making things even bigger or not finishing them), it's still another lesson to learn: keep it smaller, you idiot.

As I said before, it's a little too "gamery" now, while the exact same theme and idea could appeal to a very broad audience, both casual and experienced gamers. And the complexity of it, the sheer number of landmarks that can appear, is one part of why it's "gamery".

But I finished the game. I think it's very fun to play. My playtesters agree wholeheartedly. It's something I've never seen or played before, it has endless variety, and is still surprisingly easy to teach and pick up for new players. Even now, after creating the game, I am surprised by people inventing better strategies than mine, or funny moments because I did something stupid.

So yes, still a great success! I just think it could be even better :)

And it's even funnier if you look at some of the ideas I wrote down at the start (even in this devlog). Things like *weather*, or *vehicles to use*, and more.

All of these never even made it into the game! In fact, I didn't even *try* to put them into the game, because I already knew it was becoming too big and didn't need these ideas. But when I started the project, those were some of the first things I wrote down and was *sure* would be in the final product.

(Of course, I can make the prediction now that these elements---like weather or natural disasters---will come in the sequel ... but we've just seen how bad game developers are at predicting which ideas make it :p)

### Publishing

Which left me with one final, very hard question to answer: "do I sell the game and if so, for what price?"

The game is much bigger, better and more professional than just a "tiny game" or "free game" or "hobby project". But it's also a local multiplayer game (2-4 players only) without *amazing* graphics, which means I'm looking at a nice market, and pricing the game will only make it more niche.

This is why I decided to do the following:

- Create a *generous* free demo. Not only do I think you should always do this (people should be able to try before they buy), it's also just better marketing: many more people will give the game a try, experience it, and perhaps do something to spread the word.
- Make the game *paid* for a fair (and not too cheap) price. Probably 7 or 8 bucks, as it stands now.

The free demo should get the game in the hands of enough people. (That's what it's all about: making experiences that many people will actually experience!) They will get a large part of the "base game", which already has enough variety and levels for many people.

But the price is a fair one for the work, skill and effort I put into the game. And I'm, you know, one of those people that needs money to survive and thinks you should get paid for artistic work. (I notice many non-artists don't realize this. But it's atrocious how many people just expect you to work for free, to get your work (such as games) for free, and even feel entitled about it.)

That's it. That's the devlog. Whether the sequel gets made depends on the success of this one, if all my plans can come together, and when I regain motivation for this project. (I'll certainly take some break from it, as is healthy.)

Until the next one,

Pandaqi

## PLOT TWIST: It doesn't end here!

I, perhaps, wrote the ending of this devlog a bit prematurely. Many, many years ago. This is Pandaqi / Tiamo from the future, as I come back to this project to _actually_ release it.

Yes, I finished the game in the sense that all content is in there, it is bug-free (as far as I know), and I could've released it then and there.

However, as I did some "final playtests", more improvements popped up. More things that I should really fix or change ... while I had already assumed the game was done and _wanted_ it to be done so I could move on. (With my limited means, playtests are unfortunately rare, which is why "final playtests" can still reveal major issues.)

This was just too much for me. A few unfortunate events coincided in my life, such as having to go back to university to finish my degree (Applied Mathematics) and my hardware failing to the point of making game dev impossible. And I just couldn't bear the thought of working on this game for several weeks more and fixing all those new issues. Only to, probably, playtest and find new issues _again_.

So I left the project in its "95% done"-state, for many years.

When I returned,

* I had ~4 years worth of extra experience with game design (by designing _board games_)
* I had ~4 years worth of extra experience with programming and project structure (by making websites, doing loooads of other projects)
* I had obviously completely forgotten the structure, code, and nasty exceptions throughout this entire project.
* And I clearly felt I should get this game out in the world---but I felt no need to actually make it good or successful. 

No, the project is too "meh" and too old for that. I can't understand half the code inside this thing. I can't update or rewrite most of it without fear of breaking a gazillion things. (And I surely won't re-do the whole thing from scratch with my current knowledge and skill.)

Even something as simple as that distinction between "paid version (full)" and "demo version (free but limited)" is something I don't understand anymore. I have this single boolean `demo` at the top level, but when I set it to true, some things are still not limited and other things are limited when they shouldn't be, so _clearly_ I need to make other changes for the demo version too ... but I don't know what! I have no clue anymore!

I see now how this project completely ruined its original idea by making it too complicated and trying to stuff too much "content" in there. The core idea is still _great_ and I can easily write a solid plan for a "sequel" that's 3D, simpler, more partified, and will appeal to more people. I might actually make that, regardless of how well this game does.

But as for this big messy project folder? I want to just finish this and move on.

Below I'll give a short overview of what I did, and then we can properly end this devlog and this chapter of my life.

### Game Design Fixes

I found these the most important ones to do (well). These are simple tweaks to the gameplay that can actually make or break the game.

* **UNIFY:** My "tourist spawners" just randomly added tourists until now. This made the map hard to parse and made it hard to be strategic.
  * SOLUTION? I changed that to make them spawn only _one type_, consistently. This makes the map far easier to understand at a glance and tourists easier to predict. It also fixes a lot of the game's balance, because having more tourists _of the same type_ is good for gameplay in almost every way.
  * Of course, I had to _make sure_ that all possible/needed tourist types were present in spawners. It doesn't work if all the 5 spawners on the map spawn the same Red tourist and nothing else ever appears :p
* **DON'T OVERWHELM:** Until now, all tourists spawned right at the start of the level. This means you had this big "blip" with loads of stuff spawning at once, which playtesters said was overwhelming. (And computers also don't like.)
  * SOLUTION? I noticed I'd introduced a "signs" system before leaving the project: tourists hold a sign showing how much they'll pay if you service them. I could re-use this to show their type, so I could hide the actual tourist.
  * SOLUTION? Just have a random delay at the start; only after ~5 seconds has everything spawned in that needs to be there.
  * SOLUTION? Also maintain a maximum for how many tourists can be around the same spawner. (Yes, I made this game before I had the common sense to automatically apply min/max bounds to EVERYTHING in a game.)
* **TELL THE PLAYER:** A crucial part of this game is the _interaction range_ of things. How far away must tourists be before you lose them? How close must you be to this landmark to visit? Well, I didn't actually _show this_ (how on earth could I neglect that!???), which playtesters noted as frustrating.
  * SOLUTION? A simple shader on the ground that shows the range of stuff, applied to players and landmarks.
* **SIMPLIFY**: This game has soooo many tiny rules that I once added because I thought they'd be great, but they ended up just being a "slight bump" or "slight balance fix". 
  * SOLUTION? I went through the full list of rules and just removed anything that didn't add enough. You can still turn them on in the custom settings (if you freeplay), but they're gone from campaign/automatically enabled.
  * SOLUTION? There is a whole "reputation" system that my notes, correctly, mark as "not really used enough and not really balanced". I simplified that to the point of just being a tiny addition for those who work with it, but otherwise not important. Again, this stems from the _original_ game idea where the "reputation" of your tourist company would obviously matter in all sorts of ways---but the final product just didn't need it, it turned out.
  * Really, the most important part here is that players do not feel overwhelmed or stop understanding the game. I am fine with the game being too easy or less interesting, as long as people actually _understand how to play_.

These actually required going into the code and fixing/cleaning up _some_ parts of it. So let's talk about that next.

### Code/Project Fixes

Of course, the code isn't _all bad_. I made plenty games before this one, so the structure is "fine" and the readability is "fine". 

That doesn't mean I feel confident making any major changes, though. For example, the entire player code ... is in a single script :p Yes, `player.gd`, some two-thousand lines. Terrible idea. Impossible to work with now. Even if my variables have descriptive names and my game logic is relatively simple.

Instead, I ...

* Opened the project in the latest version of Godot Engine 3
* Added _types_ to variables and functions wherever I went. (This automatically caught loads of (potential) bugs, while helping me understand the codebase again and giving a big performance boost for free.)
* Fixed a few bugs/crashes that were left in my notes this way.
* Then called it a day.

I could've pulled stuff out of the player script to put it into smaller, self-contained modules. But then I noticed that _other_ scripts in the game directly call upon variables from the player script, so I'd have to hunt down all _those_ references too and hope I didn't miss any, and ... it's just a mess.

Similarly, the campaign (the exact order in which things are revealed and stuff) is one giant Dictionary with an entry per campaign level. Nowadays, I'd create a Custom Resource for every campaign/tutorial element, so it could easily be edited from the inspector and contain its own logic for displaying/removing itself. But to make that change now ... makes me very afraid.

So no, I guess I improved the code/structure by 25% and stopped there. 

### Quality of Life / Improvements

This is just a long list of tiny tweaks ... that still take a lot of work, but you do it because they remove potential frustrations. And nobody wants their players frustrated just because you didn't add a simple Quality of Life feature.

* **FEEDBACK:** Should be consistent. Now, feedback is sometimes phrased as "don't do this", and sometimes as "you SHOULD do THAT instead". I made it consistent in phrasing, coloring, size, everything.
* **REMINDER:** I added a very quick reminder screen in the menu. It will bring up all the landmarks/terrains _in your current level_ and explain them again.  
  * Ideally, I'd design the game so this wasn't needed, or the explanation was _in the level itself_. But we're obviously working with an old game of mine here, so this is the bandaid fix.
* **BALANCING**: Money was a bit too easy; make stuff more expensive. Some stuff was made bigger, some stuff smaller. (Depending on my first impressions when coming back to the project. Some things that were crucial info were relegated to some small size or corner of UI, while other things that really didn't matter much were way too big :p)
* **TOURISTS**: A plethora of ways to make tourist handling cleaner.
  * When you lose tourists (because they're distracted/too far away), they are clearly pushed away from you. (Before, you had no other clue besides that tourist just ... not following you anymore.)
  * When you _just_ grabbed a tourist, they're temporarily immune to dangers or being lost. (Otherwise you get this really annoying cycle of getting one, instantly losing it, getting it again, instantly losing it.)

My final bit on the to-do list was to make buttons execute when _hold_, not instantly on press. In multiplayer games, that's usually better. It prevents accidental presses from the many players, you have time to discuss/change your mind, you have constant feedback that your controller/input device is working, etcetera.

Buuuut the way I set up the UI in this one was completely not set up for that. I'd forgotten. The UI is incredibly static, mostly made from fixed images and clickable areas, which made that change far harder. Too hard to be worth doing, I decided. (I'd need to make _all_ UI elements throughout the _whole_ project stop triggering when pressed, but instead when held for a second or so, including the FEEDBACK for that. Meh.)

### Marketing / Publishing

Fortunately, I'd already finished a really nice logo, strong marketing texts, all that jazz. 

I "merely" had to add a trailer. Of course, my documents had this great script and ambitious plan for a nice trailer. And it _is_ a great plan!

But I won't do it. My hardware still can't really do video editing, and because of renovations to the home I don't have my usual recording booth/equipment (and enough _silence_) to record the music and voice-over I wanted.

Instead, I simply combined a few clips from a recorded playtest session, and sung a silly variation of "Pokemon, Gotta Catch Em All!" but with the lyrics changed to be about "Monuments, Gotta Visit Em All!"

(Also, I created a few GIFs from that, updated the logo to show single player is supported, and finished this devlog and uploaded it to Pandaqi Blog.)

I'll use that more ambitious plan for that sequel. I'll only make that anyway once I get proper hardware again and the tumultuous days at my home are over.

I also decided to just make the game 5 euros. Cheaper than my original price, which you probably expected. And no free demo version.

_Why ask money if you think the game's shit?_ I think everything I make is shit. Most artists think their final product is terrible and can barely be convinced to show it to the world. But that's irrelevant. Asking money for work isn't about how good you think the work is; it's about having done the work and the other one paying for it. It's not like all bananas should be given to you for free just because you don't like the taste of bananas and promise to not actually eat it.

_Why no free demo version anymore?_ I couldn't figure out how to do that anymore in this project. There were probably some easy steps---a handful of variables to tweak or booleans to toggle---but they are lost to time. Additionally, I need to make decisions about where my income should come from, and video games are one area where I think the amount of work is far too high to make them free all the time.

### That's it

The game is playable, functional, looks funky and is even a lot of fun. It has all the "bare necessities" of a big professional game.

It's also barely balanced, most of the content will never be seen by anyone because it's just _too much_, and it has nothing _on top_ of the bare necessities. No localization, no key rebinding, not many settings at all, etcetera.

But at least it's published, out into the world now. At least I finished it, I can close that chapter, and I can move on.

And who knows---maybe someone buys it, maybe it gives some people around the world a bit of fun.

And maybe the Company of the Tackling Tourists will return.