---
title: "How to Handle Disconnects & Reconnects (in Godot)"
tags: ["tutorial"]
date: 2026-03-03
emoji: "💬"
---

Most tutorials about creating online multiplayer games only show the very first step: connect peers -> instantiate players. That's nice and helped me get a basic online game going within a few hours ... but it's obviously not the full story. 

I ran into a _lot_ of trouble---and complete lack of information---when it came to the other steps in an online game's cycle: disconnecting and reconnecting. In other words: what to do when something goes wrong, and what to do when the game is done.

In this article I'll briefly explain what I discovered after a lot of trial and error.

## Destroying the Game

Godot offers two nodes to help out when making online games: `MultiplayerSpawner` and `MultiplayerSynchronizer`.

The `MultiplayerSpawner` is great because it synchronizes the _existence_ of nodes across all players.

* It spawns the node for everyone.
* If you delete the node, it deletes it again for everyone.
* If someone joins _late_---while the game is already going, for example---it neatly spawns the node for them too.

That's why I recommend using this node whenever possible. Because it makes "deleting" the game (once you're done) much easier: 

* Usually, the server is the one with authority over any spawner.
* Manually keep track of the nodes it spawns (by saving the return value of `spawn()` in some Array)
* Now the server can simply **call `queue_free()` on all the nodes it has spawned**, and it will delete them everywhere for everyone.

{{% remark %}}
Only the AUTHORITY---the one owning the spawner---can delete things again. Deleting them from somewhere else will at best silently fail, at worst cause unexpected behavior or crashes.
{{% /remark %}}

For my first online games, I had a spawner for the _Map_ ( = Level/Game World) and the _Players_. Clearing them both was enough to neatly destroy the game for everyone once done.

There is one issue, however, if you use that second node too: the `MultiplayerSynchronizer`. This node will constantly send signals to the same node on all other clients. As such,

* Player A may send a sync signal to player B ...
* ... but in the meantime the node has been queue_freed on Player B's end.
* So now the signal arrives and it can't find the right node!
* The game does not crash, but it prints a lot of errors, and it's not nice to leave this unattended.

How do we fix this?

* First call `syncer.set_public_visibility(false)` on all those synchronizers.
* Wait a little bit (a fraction of a second)
* _Then_ destroy the game.

In that sense, destroying an online game is a two-step process. First you tell everyone to stop emitting signals (to "go silent"), and once everything is silent, the server can freely clean up without causing issues.

I've seen many people online sidestep these two helper nodes and code the functionality completely on their own. This is fine, of course, and can be quite simple depending on the game you're making. But most of those people are very happy with their approach ... until they have to write the code for handling disconnects and reconnects ;) 

Online multiplayer code is _easy_ when everything is going well. When you're just connecting and sending simple info. But I would usually recommend using those two helper nodes because it makes all the _other_ parts (destruction and such) much simpler.

## Disconnects

`MultiplayerPeer`s have two signals you can listen to: 

* `peer_disconnected`: another player lost its connection to you. This "merely" means you need to clean up their stuff, which comes down to destroying their player character. If you spawned players with a `MultiplayerSpawner`, the SERVER (and only the server) just needs to call `queue_free()` on that player's node.
* `server_disconnected`: you lost connection with the server. This means _you_ are kicked out of the game and need to return to the main menu or something. If the server has died, then this simply means all players are kicked out and the game does not exist anymore.

You _could_ try to "salvage" a server death, by immediately giving the game to another player, but it's pretty impossible. It requires ...

* Coding your game such that every player _knows_ what the server knows. (There is no time for the server to _send_ this info anymore because it has died! So players already need to secretly know all the information they need.)
* Picking a new player to become server.
* Telling them to destroy all connections, create a new _server_ peer, then rebuild all connections to other players.
* Now they will continue to be the server running the game.

It's very rare for online multiplayer games to support this. A dead server just means a dead game, bad luck, players can understand that. But the steps above are how you'd do it in general.

I just explained the situation when **something goes wrong**. 

But what if the game is over? Players leave the lobby again to play a new game with new people? Then we need to _purposely_ disconnect everyone. And this is where it gets tricky with very little documentation.

* When a player leaves, loop through all connected peers and call `multiplayer.multiplayer_peer.disconnect_peer(peer_id)` on it. (I simply track all connected peers in an Array myself by listening to `peer_connected` signal. And by removing them again on `peer_disconnected`, of course.)
* Then, once done, call `multiplayer.multiplayer_peer.close()` => THIS actually closes the peer and cleans it up. If you forget to do this, your peer will just keep running but without any connections. But closing the peer without disconnecting first is BAD because that `peer_disconnected` signal is NOT sent.

If the server is the first to leave, that's fine. Because all other peers will simply receive the signal that the server "died" and your code should handle it like usual, sending them out of the game and back to the menu.

Now, if you want random strangers on the internet to actually play together, you need some framework to create lobbies and connect people. This is a topic for another time, and covered in more detail online. I used the free _Epic Online Services_ to do this. I ask it to create a lobby on their servers (with the ID you gave it) and can then use that to connect different players (who type in the same ID).

Of course, these services have a timeout after which they delete an inactive lobby. But it's much nicer to manually track and destroy it.

* I like to keep the lobby around to allow players to _return to the lobby_. This basically makes it easy to restart. To play _multiple games_ with the same group of players instead of having to create new lobbies all the time.
* But if players _don't_ decide to do this, then manually delete the lobby when the server player leaves it.

In general, Godot does a good job checking for disconnects and sending that signal at the right time. I found this system to work well no matter HOW things went wrong. No matter if I closed windows, made the game crash, made the server leave before the clients, etcetera.

The important part is to properly _clean up_ everything connected to a player when they disconnect. Otherwise, it will keep sending signals that don't arrive anywhere, throwing up errors. (Or, at worst, crashing for some specific reason depending on your game logic.)

## Reconnects

Okay, so, you can properly destroy the game when done or when disconnected for whatever reason. Is that the best we can do? No!

Many games support _reconnecting_. Because internet is fickle and _usually_ you can salvage the situation. The first time I tested an online multiplayer game, it was literally at the kitchen table, everyone within two meters of each other and connected to the same router nearby. And still random people were kicked out quite regularly, sent back to the main menu halfway through a 5-minute match.

{{% remark %}}
Though, admittedly, we live in a very old home with lots of people, so our wi-fi sucks at the best of times and just flat out refuses to load Google at the worst of times.
{{% /remark %}}

Instead, we want to try and save the situation.

* If we're disconnected from the server, but the game is still going, _don't kick us out yet_.
* Start a timer. If it runs out, sure, we've failed. Go back to menu and take it as a loss.
* Try reconnecting over and over.
  * We still have a _reference_ to our old lobby, so reconnect to it if we're out.
  * If we're (still) inside that lobby, it means we can reconnect to the other peers.
  * Once that reconnect is successful, don't forget to stop that timer, and then
    * `MultiplayerSpawner` should automatically spawn its nodes again.
    * `MultiplayerSynchronizer` should automatically sync the properties you selected again.
    * We just need to run custom code to make sure everything else is up to date too.

This is the hard part, because that code depends entirely _on your specific game_. But the biggest lesson is that you want to factor in reconnects **from the start of development**. I only realized this once I was done with that first multiplayer prototype/learning game ... and by then it was just too hard to add reconnects anymore.

Your entire code needs to be set up for it.

* Anything that has to be spawned is preferably handled by a `MultiplayerSpawner`
* Anything with a "state" needs a `MultiplayerSynchronizer` to immediately sync this state to the new player. Preferably, this syncer is set to "Always", because I am not sure how reliable "On Change" is at informing reconnected players quickly. 
  * This includes anything in your game that could have been _changed_ since the game started. Treasures to open. Things that spawned into the map at the start, but have maybe been picked up or depleted by now. 
  * That new "state" has to be synced to the reconnecting player, or they'll believe a treasure can still be collected and be confused/annoyed when nothing happens.
* Anything else needs a simple `initialization` function that can immediately get up to speed with the rest of the lobby. The code needs to be flexible enough that you can go from 0 to 100, so to speak, skipping the usual gameplay needed to get there.
  * This often comes down to making the server re-send specific information. 
  * Once a player has rejoined, the server will call an `@rpc` on the reconnected client to send all they've missed.
  * And the client reconstructs the game from that information.
* But don't worry about getting it exactly right. Lots of things _don't_ need to be synced for the game to still be fair or make sense. You can hide a lot behind animations, unknown information, or internet latency.
  * For example, say the map has a few animated elements, such as trees swaying in the wind or things opening/closing. Maybe grass bends when a player walks through, or there's a faint afterglow when an action happened at a certain spot.
  * Does it _really_ matter that your visuals are not perfectly in-time with those of other players? Is it _crucial_ to the game that all these visuals are perfectly reconstructed when you reconnect? No. They're a nice extra, not core gameplay that you need to play fair. It would take a _lot_ of work and bandwidth to achieve it, with little gain, so just ignore it.

TIP: You may want to _wait_ until the `MultiplayerSpawner`s have done their job before triggering your custom code. That is, listen to their the `.spawned` signal. (This fires on all clients, except the authority/server that actually controls the spawner, when it is done spawning the node.) You want to ensure the game world and its players _exist_, most likely, before referencing them and manipulating them in other ways needed for the reconnect. In my own Networking framework, I added a bunch of tiny tools like that (e.g. "wait until all instances of multiplayerspawner have spawned") and I'm very happy I did.

As such, I never implemented reconnecting in those first online multiplayer prototypes I made. It was far too hard and buggy.

But if your code is set up for it from the start, then this functionality is relatively "simple": start a timer, try the reconnect for that duration, if successful let the server send any extra info (a "welcome back!"-call) the player needs to reconstruct the game and play along again.

## Conclusion

Hopefully this was helpful. As stated, all multiplayer tutorials will happily show you how to create a peer, connect it, spawn your first player ... and then end it. The other side of the coin has almost no documentation or even discussion, so it was a bit frustrating to figure out. If you have any more questions, just send me an email. 

I might also open source those online multiplayer "learning prototypes" of mine in the future, if I don't decide to turn any into commercial releases.

Until next time,

Pandaqi