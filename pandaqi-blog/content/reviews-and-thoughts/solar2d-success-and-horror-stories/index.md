---
title: 'Solar2D - Success & Horror Stories'
thumbnail_media: corona-stories-header.webp
tags: ["stories"]
date: 2020-03-07 18:20:32
---

This article is an addition to my **review of the Solar2D game engine**. (Click here to read that: [Solar2D Engine - Review](/blog/reviews-and-thoughts/my-review-of-solar2d-game-engine/))

After using the engine (intensively) for a few months, I have a few anecdotes I wanted to share. These are hopefully fun and educational to read, and highlight the strengths and weaknesses of this game engine.

## Success story \#1

I was testing a two-player game on my phone with my little sister. The game _must_ be played with two players, so I could only test it with someone else.

After a few fun levels (without bugs), the game crashed.

I read the error message and immediately uttered "ugh, stupid, this should be easy to fix – wait! I can fix this and be back in 30 seconds!"

So I did. I ran to my laptop, updated the code, which immediately updated the game on my phone (because of _Live Builds_), and we could play again.

I can't express in words how useful this is. It means I can literally playtest AND fix/develop the game with other players, without any annoying obstacles or waiting times.

In fact, we can go even further. A few days later, I was testing again (with the same person), and I was telling her about my future ideas for the game. She seemed very excited about them, even the small improvements, so I thought: "why not create that now?"

I ran off again, spent 5-10 minutes coding like a maniac, and then returned to my phone. (My sister had just made some snacks in the meantime.) Guess what? We could immediately test this new system and play another 6 levels of the game.

That was a great day.

## Horror story \#1

I was working on a game where you could drive a car through a city. (The same game I mentioned in the review.)

I had written a big, complex system that could render this city without crashing the phone. I was proud of myself when I could hit 60 FPS on my phone that night.

The next day I made a few small tweaks to the game, tested it again … and was horrified when the game could barely reach 10-20 FPS.

What happened? Was my phone busy doing something else? Did I make a big mistake yesterday?

After a lot of searching, I found out that there could only be one culprit: masks.

Each player in the game has a button, which uses a mask to display a pie-shaped health bar. The whole game had just _four_ of these simple masks, nothing more. Yet they caused the game to become unplayable.

The only solution was to just get rid of the masks and use a completely different technique.

First of all: masks are very important and useful, I want to be able to use them. Secondly: four masks should never make a game drop to 10 FPS – there must be something going really wrong at the Solar2D backend.

(This may not seem much of a horror story, as I was able to fix it and continue. But it took me a whole day to fix this problem, and I really shouldn't have had to do that. Besides, for this game there was an alternative, and this won't be true for all games.)

## Success story \#2

Over a month ago, I returned to university to finish my bachelor's degree. I knew that, once I had returned, I would have almost no time to work on game development.

I gave myself a challenge: the last Sunday before I returned, I wanted to get a full new game concept up and running.

And, to my surprise, I was able to do that (using this engine).

At the end of the day, I had worked around 8-10 hours. In that time, I was able to

- Create a system that draws hexagonal maps
- Create a system that allows me to zoom in/out and pan around the map (with the right touch gestures)
- Create a system that detects when you clicked a hexagon, and if so, places a "tower" on top of it. (They are called towers in the game idea, but when I made the game they just looked like white cubes of course.)
- Create a system that randomly generates terrain and places "collectibles" across it.
- Create a system that collects these collectibles if you place the towers correctly. (In other words: you were able to solve the puzzle by following the rules.)

That's a lot of things. I am not an amazing or lightning fast programmer – in fact, I am quite slow in most areas – yet was able to create a working game on that Sunday.

Solar2D was made for rapid prototyping, and it shows.

Because of this, I am confident that I can finish this game _while_ I'm studying, instead of having to wait a few months until I'm done. It just helps to have a strong basis/proof of concept ready within a day.

(That game is the next project I intend on finishing. So if all goes well, you'll soon see exactly what I'm talking about.)

## Horror story \#2

This will be a mini story. The next one is a much longer horror story.

My review was almost done … when I implemented _particles_ for the first time.

What a mess.

It took me a while to find a "particle playground" online that exported the right format for Solar2D, and even then, the results weren't necessarily as expected.

After a lot of experimentation, I figured out what most of the parameters did and how you could use that to, for example, create an explosion effect.

But … suddenly no particles showed up! It was like they were invisible or drawn off-screen.

I was dumbfounded. It worked just a second ago? And I did nothing that actually changed the _position_ or _alpha_ value of the particles?

**Eventually** , I figured out that we needed to set GLSL draw modes for the particles. And that these draw modes were absolutely essential to how something was rendered. And that there were more options than I ever knew.

This could have been explained much better. Or, preferably, abstracted away behind a better system.

When I searched the Q&A forums, I only found one of the developers placing a link to a website explaining GLSL draw modes. That did not help at all. The website was ugly, unclear, and some of the codes didn't match the way Solar2D implemented it.

Just provide a better explanation within your own docs, man. Or write a better system.

**Note** : I am used to creating particles _using an editor/interface_, so I guess this is just the way it works when you don't have that. After a steep learning curve and lots of tweaking, I _did_ finally understand the way Solar2D does particles.

## Horror Story \#3

If you're developing mobile games, the most likely way to monetize them is through ads. So that's what I tried.

I was able to integrate the _Appodeal_ plugin very quickly, getting working test ads whenever I checked.

I was happy that ads were working so quickly and easily. That certainly hadn't been the case for my previous game (made with the Godot engine).

Then I tried to publish the game … and everything went wrong.

When you create a mobile game, you need to sign it with a certain certificate, to tell everyone that the game is safe and definitely coming from you ( = the developer).

During testing, you can just use a standard "debug key". Using this key, everything worked great. I had absolutely no reason to expect it would be different with a proper release key, because it shouldn't be able to influence the actual workings of the game – it should just add your signature to the .apk file.

But it did change the game. The officially signed version could not load or display any ads. When I restarted a level, the screen got "corrupted" (pixelated and textures all stretched and ripped apart) for a few seconds before returning to normal.

Me trying to be a proper developer, I tested everything:

- Was it the certificate? No, recreating certificates (or testing old ones which I knew worked) had the same effect.
- Was it some build setting of Solar2D? No, there weren't even many settings, and they were all correct. (Besides, if anything went wrong with the build, I should have gotten an error.)
- Was it something on my phone? No, I completely uninstalled all previous versions and made sure to reset everything.
- Was the ad server down, or had I violated some policy? Nope. (I wouldn't _dare_ violate AdMob policy. Almost any page about AdMob I stumble across, talks about the service as if it was a dictator trying to keep its users under control.)

After wasting a whole day, I finally found something: **permissions**.

Not because of the Solar2D documentation or Forums. Because I had searched and tried for hours and finally ended up somewhere on a distant, long forgotten forum thread about Android permissions.

Apparently, simply stating your permissions in the _AndroidManifest_ does not grant them immediately. For some, it does. But for the so-called "dangerous permissions", the user needs to manually grant these.

The story gets even better: for older Android versions, the system would automatically show the right popup screen to ask these permissions. This is what I was used to for many years. For newer versions, though, you need to program this yourself and execute that before anything else in your app.

Adding these permissions – I needed external storage writing for several reasons – fixed the issue. Test ads worked again with the properly signed app, and the weird texture corruption went away.

This seems like a crucial step. Like a crucial thing to know, yet it's barely explained anywhere.

**UPDATE:** test ads may be working … but live ads still didn't work. Again, no proper feedback. I could check logs all I want, check the statistics on the ad network, and it gave absolutely no clue about why live ads weren't working.

**Solution?** Apparently, live ads will only work for signed apps, if that app comes from the target store. (In this case: the Google Play Store). For debug apps, it grants permissions for anything you want, so even live ads work. (Note: do NOT do that though, as it violates ad policy to watch your own ads.) But once signed, it all goes to shit.

Why not tell me that?! WHY?! Just a message in the logs, just a small warning in the documentation _at any point_.

I have wasted three days on this problem. I was ready to release the game, but had to research and experiment 24/7 for three days straight until I found the answers.

(On the upside, I did learn a lot about Android, manifests, apk signing and how ad integration works.)

## Conclusion

That's it for my best success and horror stories. It might seem now that Solar2D game engine is a piece of garbage, but that's simply because horror stories are easier to tell and recall.

In reality, I like it so much that I intend to use it for future projects. So, maybe in the future, there will be even more stories here.

Until next time,

Pandaqi