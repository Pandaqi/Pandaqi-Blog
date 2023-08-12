---
title: 'Timely Transports (Part 4)'
thumbnail_media: ../../timely-transports-header.webp
tags: ["devlog"]
date: 2020-08-05 12:00:00
---

Welcome to part 4 of the devlog! Let's dive right in.

Second Playtest Session!
------------------------

Fortunately, everything I explained above are indeed improvements to the
game!

The board is clearer (fewer vehicles doing nothing and creating a mess),
you need more strategy and simultaneous vehicles to win. It's a simpler
game, but harder to win.

I also got to test some expansions.

The first one (Vehicle Fun) adds upgrades to vehicles. For example, your
canoe can become a kayak, which will travel way faster ( = always has a
shorter timer). I'm not sure if the current price for upgrading (5
points) is worth it, but it added interesting choices to the game, and I
eventually won by getting a kayak and zooming across the water all game!
(But I only won by a few seconds.)

The second one (Extraordinary Events) adds events to the game. These
were also fun, although I can see them becoming overwhelming on high
player counts. That's why I eventually decided to implement the setting
above that spaces out events evenly.

The third expansion remains to be tested, although I'm quite sure it
will work (given that it's the least experimental/complex of all the
expansions).

Lastly, I noticed that the board is way too small for high player
counts. A single A4 paper (or Letter paper size in the US, if I'm not
mistaken) is just too small for more than 4 players to play on
concurrently. Additionally, I'm quite liking the boards my website
generates -- so I added an option to print a larger board!

The website cuts the board into 4 pieces for you, which you can just
print separately, and then combine on the table.

**Update:** another thing I noticed, but I'm still not sure how to fix,
are asymmetric starting positions. On each board I generated, there was
always one capital that was just clearly a *worse option* than the rest.
Maybe it had no airport, or only 1-2 connections, or you could only
deliver 1-2 (of the four) goods in that section of the board.

It's not such a big deal, as fewer connections also mean you'll be left
alone (instead of being harassed by vehicles from other players), and
you can plan a strategy to use this to your advantage.

But I'm leaning towards this addition: the computer calculates a value
for each capital. It creates a "connection group", which contains all
cities with a direct connection (no airport needed). It then counts the
number of cities/connections/goods -- the higher this value, the more
valuable the capital, because you can go anywhere and do anything from
there!

Finally, the capitals with the *worst value* get a bonus. Just a simple
"+2" or "+3" mark on the board. This is the head start that these
players receive by having a worse position.

Final Playtest Session!
-----------------------

I did a final series of playtests with the game in its full glory.

It was great!

The game just ... works? I'm quite surprised as well, usually it takes
way more playtesting rounds. (My previous game, [Wondering Witches](https://pandaqi.com/wondering-witches), took
a looooong time to develop and get right. That might also be the reason it was probably the best game I've made so far.)

But it's just a simple and fun game, whilst being innovative and the
first of its kind (as far as I can see), and accessible to anyone.
Anyone understands moving goods and getting points for it, and everyone
understands that such a thing takes time and thus requires timers.

The rulebook is only 2.5 pages, including images and examples and extra
clarifications. (The fourth page is for expansions.) As I develop more
games, I come to see 3 pages as a *maximum* for these kinds of games, so
I'm happy with that. (More difficult/strategical/long games can go over,
but surely not longer than 6 pages.)

Does that mean the game is perfect? No. It still lacks some spicy
interaction, because everyone is watching their phone (or other player's
phones) quite often.

The game mechanics are somewhat imprecise: what do you do if two players
arrive in a city at the *exact same time?* (I've learned to be lenient
in those cases: just allow them both. But it's still an annoying issue
to have.)

And I don't feel like I've gotten *full use* out of the smartphones or
the original game idea, but that's to be expected for a first game of
this type. As I'll explain below, this is just the first step towards
discovering how to make these games as good as possible.

For example, the game is not as chaotic/hard as it could be. It rarely
happens that someone lets a vehicle or good timer run out, because with
a bit of focus and planning you can achieve quite a lot. (On the other
hand, I usually play with experienced gamers, who are up to any
challenge. More than someone who's played fewer (board)games in their
life.)

But hey, that's fine, because the game is still fun and it's still hard
to beat your opponents! I just think that a game with a higher skill
ceiling should be possible with this system.

Where to go from here?
----------------------

Yes, this hybrid idea has some drawbacks. It introduces *screens* into
board games, when many people play board games (instead of video games)
*to get away from screens*. In all the games I've played, there were
moments where people were too enveloped in their screen and not even
looking at any other players around the table.

I try to combat this all the time. I try to watch out for this and keep
my work as "analog" as possible, force people to come together in real
life to play my games, to socialize -- all things I hold in high regard.
So it's not perfect, but in my experience so far, games like this do not
tip the balance in the wrong direction (yet).

Such hybrid games also add some requirements (such as having a phone and
an internet connection, even if only for a second to open the website)
and a slight disconnect for some people (who aren't as comfortable with
games or devices).

But it also has clear benefits. This game I made is a lot of fun to
play, extremely easy to setup and explain, and has infinite
replayability (with randomly generated maps, events, and more). All of
that, just by connecting game types from two different domains (analog
and digital).

The future looks bright! (Yes, I know, I'm being dramatic.)

I'll continue working on these hybrid games and exploring their
possibilities. Most importantly, the next game will probably only
require *one* device (instead of everyone needing their own device) and
be way more *connected* (learning from my mistakes during this
development).

> As it stands, I'm thinking about a simple "cooking" game. The
> restaurant itself is completely analog: it's a set of tiles on the
> table, with chips/cubes/whatever as food and ovens and waiters. But
> everything you do costs time. So a single device should be placed on
> the table which can take up to 10 concurrent timers (and keep track of
> score and all that good stuff about these hybrid games).
>
> As I said in the intro: it's been done before, but it's just such a
> good application of the idea to a theme, and I need *something to hold
> onto* whilst doing these experimental games :p Seriously, I keep doing
> projects where I have absolutely no examples or previous projects to
> learn from, and it's hard.

As for this game? It's as good as done, because everything *works* and
*looks good* and it is fun to play and easy to learn, and that's really
all you can ask for in a game.

Nevertheless, being a perfectionist, some improvements might be made in
the future:

-   More diverse map generation =\> now it's just three route types
    (car, railroad, boat) and three terrain types (land, water, forest).
    There's way more to do. Could even include pre-designed buildings or
    cities that just look really good.

    -   Here's a very fun thing I discovered while coding! My code
        generates random numbers for the terrain. If a number is below a
        certain threshold, it is water. Otherwise, it's land.

    -   I have a variable called *waterLine* that controls this. It's
        currently -0.4. But, if I set this to a higher value, suddenly
        the whole map becomes a sea with cute islands!

    -   This completely changes the look and feel of the map, which is
        something I can experiment with more.

-   Connecting everything more (using the "seed" idea explained earlier)

-   More events and varied situations on the board. For example, I might
    add special locations halfway routes that trigger when you cross
    them. These might do positive things (you may carry two goods over
    this route!) or negative things (your vehicle breaks down!)

Anyway, until the next devlog,

Pandaqi