---
title: "How To Quickly Debug Online Multiplayer in Godot"
tags: ["tutorial"]
date: 2026-03-03
emoji: "💬"
---

This article explains my lessons learned when creating my first online multiplayer games in the Godot Game Engine. More specifically, it talks about how to make the development (or "debugging") process as pain-free as possible.

On top of all its other challenges, online multiplayer is annoying to debug because it requires **multiple instances**. You need at least two instances of the game to connect to each other and test if your game is working. You also don't want to have to press buttons and go through your login/lobby UI _every time you want to test something_. So, how do we do that?

## Step 1: Configure Multiple Instances

This step will make Godot spawn _multiple windows_ whenever you run/test your game.

* Go to `Debug` > `Customize Run Instances`. 
* Click `Enable Multiple Instances` and set it to 2. (You can go higher, of course, but I never found a need.)
* Then, in the list below, you can set unique "run args" per instance. This is just a string that's passed to that specific instance, allowing you to uniquely identify and configure them. 
  * I like setting the first instance to `--server`
  * And the second to `--client`

I also recommend writing some code to display these arguments in the window title. This ensures you've configured it correctly _and_ helps identify which is the server and which is the client. To do so, use something like,

```
var args := OS.get_cmdline_args()
var window_title := "Server" if args.contains("--server") else "Client"
DisplayServer.window_set_title(args)
```

## Step 2: Instant Join

The first thing you probably made for your online multiplayer game is the buttons to "host a game" or "join a game". You don't want to have to press all those buttons every time you want to test your game. So,

* Set a variable somewhere called `instant_join`. You probably want to set it to true while developing, and turn it to false when deploying the final game.
* If `instant_join` is true, on `_ready()`,
  * Immediately call the function to "host a game" in the `--server` instance
  * Immediately call the function to "join a game" in the `--client` instance
* This requires, of course, that the functionality for these two networking actions is contained in some nice function. The one you also attached to the _button_ when pressed.

_Check the documentation and tutorials, available aplenty online, for how to set up a very basic online connection in Godot if needed._

Because this creates a local connection, it is instantaneous. As long as your instances are ordered like this (server first, then client), this connection will always immediately succeed.

Now, when you run your game, you are _immediately_ inside an online game shared by the two instances.

## Step 3: Switch To An Online Service

The default networking in Godot only works locally, or if you know the exact IP address of the other player (_and_ their router allows you to access them). It's great for debugging, but will obviously fail in the final game when your players are all on different computers, spread out across the world.

As such, you need to implement an actual public server or online service. A sort of middle man that helps get all players into the same lobby and connect them, without requiring typing IP addresses or anything.

The common solutions for Godot are _Epic Online Services_ or _Steamworks_. A nice plugin exists for both, which you only need to install and configure correctly for your game. 

I used Epic, though, for several reasons.

* Steamworks requires paying the $100 first to get your game registered on Steam and get access to their SDK.
* Steamworks requires multiple accounts on different computers, making quick local testing incredibly annoying.
* Epic is free and, with a bit of work, allows testing the final game quickly from within Godot.

I spent a day or so implementing all three services as a standalone module (Godot, Epic, Steam). It's really nice to be able to _swap_ one for the other with a single line of code, so I'm happy I put in the time and I might share this method in the future. (Once I've used it a lot more and made sure there aren't some massive flaws :p)

_Check the documentation and tutorials on how to get an Epic developer account and install the plugin if needed. I won't cover that in this article._

As such, if I want to see if the game still works _using real servers_, I merely need to swap to my Epic networking layer. And, unfortunately, take the following step.

## Step 4: Epic DevAuth Tool

Online services require a unique ID for every user that connects to it. It obviously does not allow someone to connect _multiple times_. As such, spawning two instances of your game will only connect _one_ and fail the _other_. Because both instances try to connect to Epic services from the same application, on the same device, which means they're treated as the same user. And you can't have duplicate players in an online game!

To fix this, you need the "DevAuth" tool. It creates a fake local connection, pretending you're some other user that's also logged in to this game.

First you need to _find it_, which they don't clearly explain anywhere for some reason.

* Go to your Epic Developer Portal.
* Download the latest SDK.
* Within its Tools folder is a ZIP file with the DevAuth tool.
* So, unzip, and place that tool in your program files (or wherever suits you).
* Perhaps create a shortcut for the `.exe` file on your Desktop for easy access.

Now, launch it. 

* Pick whatever port you want to run it on. (I use `4545` because that's what the example in the docs used.)
* Add a new account to the tool
* Log in to your Epic account.
* Pick a name for this "credential"

Now, within your game, you can log in two different users.

```
if instance_is_server:
    HAuth.login_devtool_async("localhost:4545", your_credential_here)
if instance_is_client:
    await HAuth.login_anonymous_async(pick_a_random_user_name_here)
```

The first instance uses your Epic Developer Account from the DevTool. The second one creates a temporary login (based on device and ip). These are different, so they're both accepted, and now you can fully debug the "real" version of the game within Godot!

You can also simply add 2 (or more) Epic Accounts to that DevAuth tool. Then you can use those unique credentials to get three or four instances that all think they're different users! But I don't _have_ that many accounts and did not feel like making them just for this.

{{% remark %}}
The first time you do this, it will launch a page in your browser asking you for PERMISSION to use this credential. This is annoying and confusing, but you only need to click accept a few times, and then it never asks again and it all works. 

It was mostly annoying for me because my default browser was apparently set to Edge---because fuck Microsoft and forcing it down your throat---which means the first time I tried this my computer had a spasm as it tried to launch, update, and load a browser I never used before.
{{% /remark %}}

With this setup, I could just launch the DevAuth tool, launch Godot, and quickly debug my game on real servers and real connections all day. 

## Step 5: Use Clumsy

[Clumsy](https://jagt.github.io/clumsy/) is a handy tool that you can download and use for free. It's just a tiny bit of software that you can launch on your computer to "fake" internet issues. You can turn on different types of errors (latency, missing packets, etc) and it will simulate these network conditions.

With Clumsy turned on, you can test your game _locally_ under _real conditions_. You can debug the game with multiple instances on the same device, and still check how the game plays when lag and wi-fi delays are involved. (And when you're not interested in that, you can just quickly turn Clumsy off and have an immediate local connection again.)

## Step 6: Use The Network Profiler

The `Debugger` panel has a tab for `Network` only. It shows, for example, how much data your game is uploading and downloading every frame.

Now, if your game is quite simple, this won't be of much interest to you. My first few online multiplayer games---tiny prototypes to teach myself how it works---only sent like 3 signals once in a while and would never be an issue. But when the game gets bigger, you have to start thinking about compressing your data, being _really_ frugal with the limited bandwidth you can spend on a typical wi-fi connection.

Also note that multiple instances create unique Debugger tabs. If you spawn 2 windows (one `--server` and one `--client`), then the debugger only shows the data for the one it has selected. You need to click the tab (top-left) of the other one to see its data.

There have been numerous times when I thought I was looking at data for window 1, but it was actually window 2, and vice versa. Same thing with the Remote tree inspector. A trick to reduce these annoying situations is to,

* Add a node near the top level of the tree. The node should _not_ actually have a function or be part of the networking logic!
* Give it a unique name based on the instance. (Just like setting a unique window _title_ in step 1.)
* Now, whenever you go to inspect the remote tree, you'll immediately see this node up there and the name tells you where you're looking.

## Conclusion

These were my quick tips and tricks for instantly debugging online multiplayer in Godot, on the same device, with the least frustration possible. I'm still learning the ways of online multiplayer myself, of course, so I'm sure there are more things to try and techniques to use. But the steps above were enough to make development surprisingly rapid and pain-free on a handful of diverse online multiplayer prototypes.

Until next time,

Pandaqi