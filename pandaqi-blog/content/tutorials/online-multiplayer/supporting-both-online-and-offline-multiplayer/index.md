---
title: "Supporting Both Online And Offline Multiplayer (Godot)"
tags: ["tutorial"]
date: 2026-03-03
emoji: "💬"
---

This article will briefly explain how to create a game in such a way that you can play both _online multiplayer_ (one player per device, connected over the internet) and _offline multiplayer_ (all players behind the same device, local). 

I've developed purely offline multiplayer games for years. Although they were quite fun, they never earned me any money because people are too afraid to buy something they can only play when other people are coming over. That's why I wanted to teach myself how to support online multiplayer _as well_ in those games, and I wanted to do it in a way that did not require any tricks or gimmicks or glue code. Preferably, the exact same code runs in both cases, no exceptions needed.

How do we do that?

## Step 1: Code For Online Multiplayer

Online is the hard part. That's your priority when it comes to coding. If you don't support online multiplayer from the start of the project, you'll find it practically impossible to add at a later stage.

This article does not explain how to get a server-client connection. (There are many tutorials on that; I will probably write an article about how I did it too some day.) So, from now on, I assume you have that part covered.

* You can start multiple instances in Godot.
* One of them is the server.
* The other is the client.
* And they can connect to each other, successfully establishing a P2P connection and able to exchange data

## Step 2: Use `Synchronizer` and `Spawner` as much as possible

Godot offers two nodes to cover 90% of the functionality you'll need in a multiplayer game. They work very well and save you from running into lots of silly mistakes and errors when trying to do the same thing yourself. As such, use them as much as possible.

* `MultiplayerSynchronizer`: this ensures that certain properties (on nodes) are kept _the same_ across all players.
* `MultiplayerSpawner`: this allows spawning a node for _all players_ (and will also clean it up for all if you delete it on the authority)

For example, to get a simple moving player,

* Spawn it using `MultiplayerSpawner`
* And give the player a `MultiplayerSynchronizer` that syncs its `position`

The neat thing about these nodes is that they "sync" all players. In other words, it _does not matter how many there are_, and it _does not matter if you're the server or not_, it will just make sure that everything matches for everyone.

This allows you to ...

## Step 3: When Playing Offline, Only Create The Server

Somewhere in your code there has to be a boolean that decides if you're online or not. (It's common to present simple buttons to the player on the home screen asking if you want to play "Online Match" or "Local Match". Whatever the player chooses decides the value of this boolean now.)

If we're offline ...

* We create a server like usual.
* We simply don't connect any other clients to it. Because, well, you're all playing on the same computer.
* Instead, provide a different interface to "log in players" (or decide "how many players" to play with)
* When the game starts,
  * Tell the `MultiplayerSpawner` to spawn _all the players logged in_.
  * And set some variable on the player script with their _unique player number_.
  * Now, depending on the player number, you can listen to the correct input. (For example, Player 1 uses arrow keys, while Player 2 uses WASD.)

That's all you need. Those sync nodes will do what they always did to make the game work. Each player gets to control _their own player_, with their input method (e.g. a gamepad they connected), and none of the others. You're now playing your game in offline multiplayer.

## Step 4: Beware RPCs & Other Dangers

Now, there are some things you can't really spawn or synchronize this way. For that you use `RPCs`: Remote Procedure Calls. That is, you tell other players to _call a specific function_ on their computer.

By default, those RPCs _don't execute locally_. Because, well, their whole point is to execute required code _remotely_: on the devices of the other players.

But this creates issues when playing local multiplayer, of course. Because now all those RPCs will not actually be called, because the game is just a single server and no remote peers. As such, simply make sure you set the `call_local` parameter on all these function that still must execute in local multiplayer. That ensures they're also called on your own device.

Additionally, often times, RPCs call a single specific peer. (Maybe you sent a private chat message to a player. Now _that player_ needs to receive it in some way, but nobody else.) This is fine. But if RPCs call _everyone_, then they won't work as you expected in local multiplayer. Because locally, you'll just get a _single call_ to that function on the server, and nothing else.

* You can fix this in different ways, depending on your situation.
* You can change the logic to use those nodes from Step 2.
* You can wrap these calls into a slightly larger function. One that simply chooses: _if local, call this function on each local player node---otherwise just call the RPC as usual_.
* You can just "circumvent" the problem. Change your game design so you rarely need such RPCs. Believe me, changing the game design instead of changing your code is a clever trick that most game developers use to actually get stuff done and out the door :p (A kind of "it's not a bug, it's a feature!" situation. Design constraints breed creativity and help make choices.)
  * EXAMPLE: Maybe there's some powerup you can grab that is applied to all players of your team. It's a personal powerup and you decide when to use it or how long you keep it. Then I would need a problematic RPC call that goes out to _all players/peers on your team_. It would break down in local multiplayer.
  * What if ... instead ... we simply change the rules about how such "team powerups" work? Every team has a _single global powerup_. When you trigger that, I just need a _single call_ to add it to your team's properties on the server. And when somebody on your team uses the power, it is now gone for the whole team again, so I only need a _single call_ to unset the property again.
  * This sneakily circumvents the problem while creating a cleaner and more interesting game design, if you ask me.

Some other issues I've discovered are,

* Online Games require lots of little tricks to hide the lag and the delay. If you're not careful, those same tricks _break down_ when there is _no lag or delay ever_. Which is the case when playing locally, of course. So make sure they still work if instantaneous---and if not possible, introduce an artifical delay yourself, such as listening for a 50ms timer to finish.
* Don't accidentally create an online "lobby" (through Steam or Epic or whatever you use) when not playing online. Code a simple shortcut to _immediately_ create that one server you need and do nothing else. In fact, make sure no internet connection at all is needed for the game to function, as people might have that turned off if they choose to play offline.
  * I spent some time at the start to make my "Online Services" completely independent modules. I can swap in _Godot (default ENet), Steam, or Epic_ depending on what you choose. All other logic remains the same and just uses the service given to it.
  * I initially did this to force myself to really understand the tutorial/SDK code. But it ended up being by far the cleanest way to do it and allowed going fully offline for local multiplayer.

## Conclusion

That's it. In the end, it's quite simple, but I could not find _anything_ about this online. Most people are online only or offline only, rarely both, it seems.

I tried a few other things,

* Keeping a "peer" for every player so absolutely nothing had to change. (All those peers were simply _on the same device_.) But that was incredibly wasteful and hard to setup. It quickly ran into all sorts of nasty bugs no programmer ever wants to find.
* Not hosting a server at all. Handle _all_ logic myself and wrap _all_ RPCs in an extra function, one that will just call _the function_ if local, and _the RPC_ if online. This was very messy and time-consuming. It leads to lots of duplicate code, where both modes (online and offline) are equally messy and prone to bugs, getting into a kind of lose-lose situation.

So this was my best compromise. Run a kind of fake server anyway and make sure all online logic still works if it's just called locally on a single peer. Beware of the pitfalls around RPCs and the lack of delay when local.

Hope this helps,

Pandaqi

{{% remark %}}
Funnily enough, after figuring this out for my game idea, I actually made a game that was ONLY online first. I thought of something even simpler than my original idea to "test/learn" online multiplayer, and it was something similar to hide and seek. Which would never work offline, because you'd just be able to see all the players on the same screen :p 

I guess that's my final tip. When learning online multiplayer, do several prototypes with the absolute simplest ideas you have. Because every part of it is _hard_. So I did a little game all about _moving around in a shared map_, I did a little game with _networked physics_, and so forth, before I even felt 10% confident I could combine all those parts into a single online game.
{{% /remark %}}