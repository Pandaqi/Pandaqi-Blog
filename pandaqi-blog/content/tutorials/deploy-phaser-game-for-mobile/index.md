---
title: 'How to deploy a Phaser game as a mobile app (including AdMob)'
tags: ["tutorial"]
date: 2024-06-01
---

You have created an HTML5 game. This tutorial mentions Phaser because it's the most-used web game framework, but the process below works for _any_ HTML5 game.

And now you want to publish and deploy the game for **Android**, probably including support for **ads** (via AdMob).

I was in the same position. Thus I looked for the easiest way to do it and will now teach that to you!

_This guide was written in June of 2024, shortly after major updates to all crucial components. I expect it to be valid for a long time, but be cautious anyway. CapacitorJS also seems a promising alternative and might be evaluated in the future._

> This should also work for iOS, but you need an Apple device for that. I don't have one, so I can't test it or comment on it further.

> If you want to build for _desktop_ instead, check out my other tutorial: [How to deploy a Phaser game for desktop computers](../deploy-phaser-game-as-executables/). The start of both tutorials is very similar, then it differentiates.

## Web wrappers

A web game is nothing more than a set of files that a web browser can understand and display correctly.

So how do we turn it into a standalone app? By *bundling* the game with a web browser! So it doesn't need an external browser anymore!

This is called a **wrapper**. Such a package wraps _around_ your game files to place them in a simulated web browser.

And that's good news, because wrappers are always small and easy to use. You've already done most of the work: creating the _actual game_ and getting _all the files ready_.

All that's left is putting it inside the right wrapper with the right configuration.

## Cordova

I used [Apache Cordova](https://cordova.apache.org/)

Advantages:

* Probably the most well-known package for this purpose, which also means it's constantly updated and has good plugin support.
* The documentation is well-written and easy to find.
* You can find many other tutorials combining Phaser and Cordova, which means it's probably the most common tool/

Disadvantages:

* Only mobile export. (Desktop used to be "somewhat supported", but that's all deprecated now. See my other tutorial for that.)
* You need lots of Java build tools installed, of precisely the right versions and in the right places. Though that is needed for _any_ Android export and just a nasty part of that ecosystem.

## What do I need (beforehand)?

Cordova isn't software to install. It's a _node package_. So [install Node](https://nodejs.org/en/download/)

I recommend [Visual Studio Code](https://code.visualstudio.com/) for editing the code and running the commands. 

It has an integrated terminal or command line. When you add a folder to the workspace, you can right-click and choose "open integrated terminal here". It's an easy way to type commands inside any project.

And lastly, I recommend installing [GitHub Desktop](https://desktop.github.com/) and making an account at GitHub. Git is a _versioning_ tool. This means it keeps track of all your changes. When done with a feature, you can commit those changes to create a backup on GitHub. If anything goes wrong, you have an older version to go back to.

{{% remark %}}
If you do so, go to the option "Git Ignore" and choose the "Node" template. This ensures git ignores the _many, many_ modules that every node project will install. Which would slow down versioning and backup by a ton.
{{% /remark %}}

## My way to do it

You _could_ create this wrapper around _every project you make_. In other words, whenever you start a new web game, also install cordova again, configure it again, so it's integrated with the project.

But I don't like that. It adds a lot of overhead and complexity to any game. 

I only care about cordova at the final stage: the game is _done_ and I want to _deploy it_. The other 99,9% of the time it has no business being in that game project folder.

My technique is therefore to create a **single, separate Cordova project**. When I want to deploy something, I simply copy-paste all its files to this Cordova project and run it once. This neatly _separates_ the development and coding step, from the building and exporting step.

This won't work if all your games are radically different in terms of _configuration_. But most likely, they are all radically _exactly the same_ :p

## The step-by-step

First, I'll give you the step-by-step of how it _should_ work. Then, I'll go over the many things that can go wrong or might be relevant for your specific use case.

### Install cordova

Because it's a node package, we can add Cordova now with a single line of code.

{{% highlight bash %}}
npm install -g cordova
{{% /highlight %}}

This installs it _globally_. This simply means that you can now use the `cordova` keyword within any node project, like the one we just created, to accomplish stuff.

This is "Cordova CLI": Cordova Command Line Interface. Apparently there are other versions, mostly in the past. But this can be really confusing when you look up issues or documentation, as it might be talking about a _different_ version. So keep that in mind.

### Create a new cordova project

Determine where you want to store this project.

I have a "Games" folder at the top level of my computer, with all games in it (duh). This cordova template could be used by anything, so it's at the root of that folder.

Go to that location in the command line.

As stated, you can do so in VS Code (right-click on this folder and open a terminal there). You can also simply open the command line utility of your operating system and type  `cd <path-to-folder>` to _change directory_

Now we use that `cordova` keyword to create a new project of the right type. 

{{% highlight bash %}}
cordova create foldername packagename projectname
{{% /highlight %}}

Those three names must be supplied by you:

* Foldername = the name of the folder containing the cordova skeleton, which I'll call `cordova-export`
* Packagename = required for mobile apps, has the form `com.developername.gamename`
* Projectname = the title of your project and app

Within a few seconds, it has created that folder. Within it resides the _skeleton_ for any cordova app.

Note two important files: `package.json` and `config.xml`. You can **change both at any time**.

* The `package.json` file has some of the more general information you just entered.
* The `config.xml` file contains more specific information about how to build the app and how it should function. For example, this is where you need to put some lines of code to make AdMob work.

This is how you can easily use this _one_ project for _all_ your web game exports. For each game, simply save its own `package.json` file with the right parameters and its own `config.xml` with the right parameters. 

When it's time to deploy, swap out the files, and your settings (title, version, author, etcetera) should be correct. One cordova project---use it to export any of your projects.

### Check the existing files

The `www` folder contains the content of the app. For now, it has a very small demo project.

There are several lines of importance in `index.html`:

* The meta tags in the head. Copy them to the `index.html` of your own game. 
* The inclusion of a script `cordova.js` at the end of the body. Copy this line of code to your own `index.html`, at the end of the body.

The cordova script is used by cordova to add extra functionality to your game. You might be able to do without it, but there's no reason not to just include it.

There is also a `js/index.js` file. It has boilerplate code that allows checking if your app is ready to go. You might want to copy this to your game as well, or save it for later, as you'll need this for the AdMob integration.

{{% highlight Javascript %}}
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
{{% /highlight %}}

### Adding your own files

After learning what you can from the demo project, you can ...

* Remove that whole demo project!
* Copy-paste your web game into it. Make sure your main file is also called `index.html`

It's that simple. Now cordova will load your game just like a browser would.

### Adding platforms

We need to tell cordova to which platforms it should export. For this tutorial, I'll keep it simple and stay with Android.

**Go inside the cordova folder** (in the command line). You can use `cd cordova-export` for that in the terminal. Then type ...

{{% highlight bash %}}
cordova platform add android
{{% /highlight %}}

It might take a while. Wait until it's done. Check it worked:

* A `node_modules` folder was added
* A `platforms` folder was added, containing an `android` folder.
* The `package.json` file was updated to indicate the platform android.

### Preparing for building

This is the "nasty" step I mentioned when it comes to android. It requires some very huge and slow-to-install android tools. There are _many things that can go wrong_.

You can check if you have all the requirements by typing `cordova requirements` (still inside the project folder, so it knows what cordova project to check). It will tell you exactly what you have and what you're missing.

The [Cordova docs](https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html#requirements-and-support) outline how to get every required part. 

I don't see a reason to copy this to my tutorial. Read that guide from top to bottom and you should have (and understand) everything needed.

But let me give you a summary. In a later section, I'll also explain all the many things that went wrong for me. Because I am truly the champion of hitting every possible obstacle when trying something new.

* Java Development Kit (JDK) => the toolkit to make Java (programming language, used to build Android) work. At this moment, download OpenJDK 17.
* Gradle => building, package and version manager for all this android stuff (similar to NPM). A bunch of files to unzip and place on your computer.
* Android SDK => the toolkit to make building to Android work. 
* Android target => each version of android needs its own settings and tools. 

Both SDK and targets are best acquired by installing the latest version of _Android Studio_. It should install or update the latest versions automatically. 

Even so, once installed, you still need to start the software and go to **More Options > SDK Tools**. It gives a giant list of all possible things to install, and the Cordova guide tells you which of those boxes to tick sand install too.

All of these need to be specified in the system `PATH`. So that the terminal can actually find them.

During this process, keep trying and typing `cordova requirements`. Once it's completely happy, you are ready to continue!

**You probably need to restart Visual Studio code (or the command line) after every try**. The path/system variables are only read and stored when a terminal/command program _starts_. So if it's already running, and you change something, it won't see it (yet).

## Deploying the game

### Testing

You'll do most of your game debugging simply in Phaser 3 / in your browser, of course. But you still need to regularly check if the mobile export works as intended.

That's why cordova can _emulate_ the game, as a mobile app, right on your computer. 

Cordova uses the "virtual devices" setup by Android Studio. There should be a suitable one by default. But in case anything went wrong, you can [add and change virtual devices yourself](https://developer.android.com/studio/run/managing-avds.html)

To _emulate_ your game right on your computer, type `cordova emulate android`.

This opens a window with your game, as seen through a specific phone model. It also includes some extra buttons/UI you'd commonly find on phones.

**Emulation is extremely tough on a computer.** My crappy old laptop couldn't use it. Any hardware I borrowed, no matter how new or fast (normally), couldn't use it. It took 10+ minutes to start, and then it just loaded and lagged and loaded.

As such, I actually **recommend just testing on your smartphone**.

* Ensure your smartphone has _USB debugging_ enabled. (Enable dev tools on your android phone, then plug it into your device and accept. You can find guides online, but it often depends on your specific model.)
* Plug it into your computer.
* Then type `cordova run android` and it should automatically install and run it to your device.

This lets me reliably test/debug the game within 3 seconds, even with a crappy old Android phone.

### Debugging

Now we get to another great feature of the "web app => mobile app" workflow. 

With your phone connected to your computer, you can use Chrome to _inspect_ the game.

* Go to `chrome://inspect/#devices`
* Start the game, wait a few seconds.
* It should show up as a "web view".
* Now you can click _inspect_ below it, to inspect the game just like you'd inspect/debug a web page.
* You get all the debug/error/console messages and the actual HTML tree. 
* (You can even play the game, on your phone, through your computer! Gameception.)

This was _essential_ to debugging many of my errors mentioned below. It's fast, it's easy, and it allows lots of insight into what's happening and why the game isn't working (as expected).

### Building

Once you're certain the app/game is how you want it to be, you can build it and deploy it to the common stores.

With all this setup done, building is just one command: `cordova build`

It will setup a gradle (this might take a while). Once done, it uses that to build the game (this is very quick).

The output is within `platforms/android/app/build/outputs`. Yeah, it's a very long path. Just CTRL + Click on the path in your terminal and VS Code brings you to it.

A few important notes:

* This signs the app using a debug key. If you want to deploy it, you need to create your own key and sign it with that.
* It defaults to exporting an `.apk` This is somewhat deprecated and Google Play wants an `.aab` now.

Both these steps will be discussed now, but you can skip them if you're just playing around for now and won't publish the app anywhere soon.

### About keystores

Mobile apps use _keystores_ to sign an app. They encrypt your app and prove they come from _you_. (Without these details, people can't look inside your app, and can't deploy their own apps _as if they were made_ by you.)

It's called a keystore because it can hold **multiple keys** for **multiple projects**.

This is a fact I was stupid enough to ignore. So my first 10--20 projects all used _their own keystore_ for only _their own key_, which created an unncessary mess.

As such, I recommend creating one keystore, keeping it in a safe place you can easily find, and using it for all projects you export to android.

### Creating your own keystore

There are two steps to create a single keystore in the first place.

* Create the keystore file 
* Then provide a password to unlock the _file_.

If that's done, you can do this step _as many times as you want_:

* Add an alias ( = name for a new key-password entry)
* And a password for that alias

It's best to make a new alias for each game.

How do you do this? Well, you already went through all the trouble of installing those Java and Android tools. As such, you already have everything you need!

In the command below, the ALIAS must be something you invent yourself. When executed, it will ask you some questions, such as the password.

{{% highlight bash %}}
keytool -genkey -v -keystore android_game_keys.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 100000
{{% /highlight %}}

The last arguments are common, but can be changed. RSA is simply the strongest encryption, you probably don't need more than 2048 keys in one keystore, and validity is just some _very high number of days_.

If you want to add a second alias, simply retype the command (with the same keystore), but change the alias. (It should only ask your password once, not twice, which is a sign you're adding to an existing keystore.)

### Using your own keystore (and bundling)

You specify the _key_ and the _export type_ in the command line, after `cordova build`.

* `--packageType bundle` will export it as an `.aab`
* `--keystore path/to/keystore`
* `--storePassword pwd`
* `--alias` the private key to use for signing
* `--password` the password for that private key

For example,

{{% highlight bash %}}
cordova build android --packageType bundle --keystore path/to/android_game_keys.keystore --storePassword 1234 --alias myGame --password 12345
{{% /highlight %}}

Now your app is _properly signed_ and has the _proper bundle format_. This app could be distributed through the Google Play store!

The next sections will talk about how to expand the functionality through plugins, focusing on the common AdMob for showing ads.

## Plugins

By default, cordova will merely wrap your game inside a browser environment. For many games, this will be fine. They only need common browser features that don't depend on the device used.

But this means you don't have access to smartphone features like a native app: camera, media access, GPS, battery status, etcetera

To change this, cordova uses **plugins**. You can [search the plugin list](https://cordova.apache.org/plugins/).

Once you know what you need, copy the package name and type ...

{{% highlight bash %}}
cordova plugin add pluginname
{{% /highlight %}}

For example, you need a plugin to use the _camera_ of a phone. These are installed into a `plugins` folder. Check which plugins are installed using the common `ls` ( = "list") command.

{{% highlight bash %}}
cordova plugin ls
{{% /highlight %}}

For games, it's common to lock the screen orientation. (It's unlikely your game can be played in both orientations.) That's a smartphone-specific functionality, so it needs a plugin! 

Add it:

{{% highlught bash %}}
cordova plugin add cordova-plugin-screen-orientation
{{% /highlight %}}

And lock the game into a mode through JavaScript, landscape for example:

{{% highlight bash %}}
screen.orientation.lock('landscape');
{{% /highlight %}}

Or read the [full docs for the screen orientation plugin](https://cordova.apache.org/docs/en/12.x/reference/cordova-plugin-screen-orientation/).

## AdMob

A very common addition to mobile games are _ads_, and more specifically AdMob. Over the years, however, this has become increasingly _complicated_. What used to be a simple step now has loads of extra rules, partially from governments (privacy regulations and such), partially from AdMob itself who is terribly afraid anyone might use it in the wrong way.

So let's keep it simple and go over each step.

### Create your AdMob app

This is still rather straightforward.

* Get an AdMob account. 
* Create a new app with the name of your game.
* Create the ad blocks you need. (For our example purposes here, I went with a simple banner and then the more complicated rewarded video.)
* After creating them, you get two IDs in return: the ADBLOCK id (with a `/`) and the APP id (with a `~`).

It's not required to give a link to the app in the play store here. While the game isn't finished yet, just use AdMob's test ads. You can find an [overview of AdMob test IDs here](https://admob-plus.github.io/docs/cordova/test-ads).

Once it's finished, switch to your _real_ ad id. Then upload your game to the store and update the link to it. (If not connected to a "supported store", real ads simply won't show.)

I recommend storing your IDs in an easy-to-reach location within your project, as well as the Google test IDs. For example,

{{% highlight Javascript %}}
const admobConfig = {
    banner: "ca-app-pub-xxx/xxx",
    bannerTesting: "ca-app-pub-xxx/xxx",
    interstitial: "ca-app-pub-xxx/yyy",
    rewarded: "ca-app-pub-xxx/yyy",
    // etcetera
};
{{% /highlight %}}

You will need these anyway in the final game. But this also makes it easy to switch or turn testing on/off all the time.

### Install the AdMob plugin

Fortunately, there is another package for this: [Cordova Admob](https://www.npmjs.com/package/admob-plus-cordova)

The [documentation on this package](https://admob-plus.github.io/docs/cordova) is mostly pretty great, with some exceptions.

Install it, still in the same terminal and project, using the regular syntax. Also give it the APP id (with the tilde symbol, `~`) here to save it already.

{{% highlight bash %}}
cordova plugin add admob-plus-cordova --save --variable APP_ID_ANDROID="your APP id here"
{{% /highlight %}}

Once done, you'll notice it has added your ID to a file `plugin.xml`, inside of `plugins/admob-plus-cordova`.

If you, like me, use a single project for all your games, you'll need to keep a unique `plugin.xml` for each game with the right ID. You can simply copy this file and edit as you like.

With this added, calling AdMob is a matter of writing a few lines of JavaScript.

{{% remark %}}
I recommend coding projects to be platform-agnostic. So, wrap your calls and functionality based on AdMob in something that _checks if it exists_. And if not, gracefully ignore/hide that functionality. This way, you can use the exact same project, but export it to many platforms without issues.
{{% /remark %}}

### Displaying Ads: Banner

This plugin isn't started automatically (which I explain below). It also can't do anything until the device is _ready_.

As such, all this functionality needs to wait for that `deviceready` signal. Then it has to wait for admob to start. But once that's done, you're good to go and it works very simply.

{{% highlight javascript %}}
let banner

document.addEventListener('deviceready', async () => 
{
    await admob.start();

    banner = new admob.BannerAd({
        adUnitId: 'ca-app-pub-xxx/yyy', // get this ID from the ones you saved
    })

    await banner.show()
}, false)
{{% /highlight %}}

This will show a banner at the bottom (by default, you can customize this) that automatically refreshes for a new banner once in a while.

### Displaying Ads: Rewarded Video

This is similar, but with a few extra notes. 

Any bigger ad types (so almost anything except for the banner) need _time_ to find one and load it. As such, you can't just tell it to display something immediately and expect it to work.

Instead, you need the constant cycle of "load new ad -> once ready, allow showing it".

In code, this looks as follows.

{{% highlight javascript %}}
let rewarded

document.addEventListener('deviceready', async () => 
{
    await admob.start();

    rewarded = new admob.RewardedAd({
        adUnitId: 'ca-app-pub-xxx/yyy', // get this id from the ones you saved
    })

    // make sure we always load the next one in advance
    // (for example, when the previous one is done loading)
    rewarded.on('load', (ev) => {
        await rewarded.load()
    })

    // load the first one
    await rewarded.load()

    // then, use this function (whenever needed in your game) to show cached ads
    await rewarded.show()
}, false)
{{% /highlight %}}

### Getting consent

Since a few years now, privacy regulations have required asking consent or storing permissions before showing ads.

You can technically get away with not doing it (if you're a small game that won't be noticed), but that is also technically illegal now in certain areas of the world (mostly EU). This should be communicated and handled much more clearly by AdMob, but alas, here we are.

To support this,

* Go to your AdMob account > Privacy & Messaging > Determine your settings and create messages for each of the regulations listed.
* Visit this page and do as it says: [Cordova Consent](https://admob-plus.github.io/docs/cordova/consent)
* Install the plugin, copy the code (before displaying ads), and you should be good to go.

While debugging, just completely leave this out. It _should_ recognize you don't need consent then and skip it, but in my experience this will still hinder your app, for example because you haven't set it up in AdMob yet and now it can't _find_ the consent messaging for it and thus crashes.

I am still learning about this. I've been away from all of this for a while and this was also new to me, so maybe I got some things wrong or I'm missing crucial parts here.

Honestly, it's a mess. Nobody actually cares about this. If you really don't want to be tracked, you don't play games with ads, you block ads, you probably don't come near most of the internet or gaming. For anybody else, this is just extra steps for developers _and_ extra steps for users to reach the same state as before. 

(Similar to how all websites in the EU are now forced to display a message asking your permission to use cookies, and everyone blindly accepts immediately---with frustration---or installs an extension to do that for them.)

Don't waste your breath on this. Get ads working, create a good game, worry about this at the end.

## The many possible issues

### Possible Issue: Java naming is stupid

The JDK has _versions_ that are integers. Like: JDK v17.

But when you download them, and unzip their folder, their version has a _product id_. Like: 11.0.17

The last element of the product ID is the actual JDK version. This is confusing. Now you know.

Also, since some years, you need an account to download Java executables. This is a stupid money-hungry move from Oracle that is clearly not in the best interest of the _users_. Simply go to OpenJDK instead, which has the exact same executables, but listed more clearly and, of course, openly available!

### Possible Issue: too old

For some reason, when I went to "latest" downloads for both Gradle and JDK (Java Development Kit) ... I did _not_ get the latest downloads.

The current version of Cordova (v12) needs JDK 17 and Gradle 7+. Make sure you download those. In case of doubt, just download _several different JDK versions_ and try until one works. This isn't a weird approach---it's basically the expected process when it comes to working with Java. Even the developers agree to just try them all and see which ones are supported.

Also make sure the `PATH` points to them.

Actually, there are _two_ different ;locations where things need to be added.

* The **System Variables**, in the lower box. These need a path **and** a name. The JDK must be saved there under `JAVA_HOME`. The Android SDK must be saved there under `ANDROID_HOME`. (This used to be `ANDROID_SDK_ROOT`, but that is deprecated now and will be gone some time in the future.)
* The general **PATH** variable, which is just ONE entry in the upper box. Double-click it to get another submenu for editing the PATH one by one.
  * Supply paths to folders. All scripts/executables inside the folder are now known to the terminal. 
  * Everything else must be set _here_.

### Possible Issue: too new

Cordova is often updated, but Android has to be updated _first_. It might happen that you download these at a weird time (like me!) and get a version that is _too new_. For example, Cordova only supports until Android v13, but my Android Studio defaulted to the latest Android v14.

Then you need to install a few older Android targets that Cordova recognizes. Do so from within that SDK Manager on the Android Studio home screen.

### Possible Issue: sdkmanager

In the guide, it also tells you to add four other executables to the `PATH`

* `cmdline-tools/latest/bin`
* `emulator`
* `platform-tools`
* `build-tools`

It pretends this is a "nice thing to do". No, it is **essential**. 

And don't forget the `/bin` at the end.

You can test this works by using the `sdkmanager` command. If you type it and get an error, your path variables are wrong. 

{{% remark %}}
This error is most likely _not_ a nice readable one. In my case, it was a generic Java error about some exception it raised. It was generic enough that Googling it resulted in hundreds of results that were NOT about cordova at all.
{{% /remark %}}

Don't get an error? It works properly. And you can use this command to get information! 

* Type `sdkmanager --list` to get a list of all installed Android targets. 
* Or type `sdkmanager --install "sometarget"` to install something new (without needing to go through Android Studio).

If this command reports you have some targets, cordova _should_ be able to find them and be happy.

### Possible Issue: no virtualization

Cordova couldn't emulate anything, in my case. It would just crash or not find anything to emulate.

When I checked the virtual devices in Android Studio, there was one default device! But it had a big red message from Android Studio saying "VT-x disabled in BIOS". 

Apparently, "virtualization" is something that can be enabled/disabled in your BIOS. And it was disabled in mine by default. So I looked up what that was and how to enable it. 

Once I did that, stuff worked. I was actually surprised by this.

### Possible Issue: package names

Each game requires its own unique package name, preferably something that fits and is easy to recognize.

As stated, you had to give the package name when creating the Cordova project in the first place. So ... how can you change it later? How can you give each app a unique ID when they all use that same Cordova project?

**Not** by renaming it in `config.xml` (or anywhere else). No no! You need to replace it _everywhere_ throughout the entire cordova project AND rename the java folder that contains the root file. Otherwise the entire thing _breaks_ and refuses to do anything.

But I don't recommend doing that too, as it's a lot of work and error prone.

There's a much simpler solution: add `android-packageName="com.whatever.name"` to the main tag in `config.xml`. The tag that also specifies the original package name at the start.

This means you don't need to change anything else. You can still use a unique config file per game and that's all. But it will export the game with the right details behind the scenes.

{{% remark %}}
And the Play Store is _very_ particular about package names. If you accidentally upload a first version with the wrong one, you can _never_ remove it again, only deactivate it. So now your dashboard is forever cluttered with minor mistakes from the past. Not speaking from experience, not at all.
{{% /remark %}}

### Possible Issue: No Kotlin

Remember when I said the docs for the AdMob plugin were great ... with some exceptions? This is one of them. 

(Another is the fact Test Ads and Consent are only mentioned _after_ explaining the entire system front to end, which probably caused newer developers to accidentally use real ads or do something against AdMob policy. Or get no ads at all, more likely, and think they did something wrong when they didn't really.)

This is mentioned absolutely nowhere and is 100% crucial: **you need Kotlin enabled** for AdMob to work.

Add these three lines to your `config.xml`:

{{% highlight xml %}}
<platform name="android">
    <preference name="GradlePluginKotlinEnabled" value="true" />
</platform>
{{% /highlight }}

That's it. This was the difference between _nothing_ happening and everything working flawlessly, at least for me.

How did I figure this out? There is a short _upgrade_ guide when going from v1 to v2 which mentions this. But I never used v1, so how was I supposed to know? :p

### Possible Issue: WebGL Textures

At first, when I exported the game, the entire screen was just black. I upped the brightness and saw it was not a uniform black---not a crash, no, I could play the actual game---but all the images had turned to blackish rectangles.

As it turns out, WebGL's minimum requirement on texture size support is `4096x4096`. You can be sure this is supported by all devices, but you can _not_ be sure about anything higher than that!

Well, having made loads of board games (at super high resolution) the past few years, my original spritesheets were two images with a width double that (8192px). They refused to render.

I shuffled the spritesheet around to be under the minimum size (and reduced the size overall, as such high resolution is not needed on a web game :p) and then the game exported flawlessly to my Android phone.

### Possible Issue: Meta Policy Tag

Some people have reported the need to add "blob" type to the security policy (when using Phaser). I didn't need to at first, but I _did_ need it after some updates came through. 

{{% remark %}}
I'm not sure if an update to Phaser, Cordova or Java caused it. In any case, it's related to making your app more secure by disallowing most asset types, and only allowing what's needed.
{{% /remark %}}

To solve this, add this exact tag to the head of your `index.html`.

{{% highlight html %}}
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline';  media-src *; img-src 'self' data: content: blob:;">
{{$ /highlight %}}

If this still doesn't work, just remove the _entire_ Content-Security-Policy tag for now. This will allow all assets and is the easiest way to just get a game up and running for now. For a simple game, the extra security it brings is not needed.

### Possible Issue: Delayed Sounds

This is a general issue with web audio and how browsers handle it. Processing and displaying audio is far more complex than people think. A lot can go wrong, it can be resource intensive, and support for it has been more flaky than it has been for graphics/video.

When I exported my Phaser game, the sound was severely delayed on my phone. I'm talking about 0.5-1.0 second after the sound was _supposed_ to trigger. (And yes, it played instantly on my computer.)

I wasn't sure if this was just my terrible hardware (as usual) or a persistent issue, because I could not find _any_ mention online of this specific issue. Only some more generic audio issues with Phaser/Cordova with completely different origins/solutions.

There are two solutions here: use the Cordova Media plugin instead (to natively play audio), or use the Howler.js library (which many seem to use by default for audio in any web project)

I've mentioned that I want projects to be platform-agnostic, so I want the game to be entirely self-contained and not rely on _any_ Cordova functionality or bindings. So I chose the second option and simply rewrote the few Phaser audio calls to howler.

This was very _easy_ and _fast_, and I immediately liked this HowlerJS library.

It did not solve the problem at all, however. I could not find a cause for this and it only happens on some (mobile, cheaper) devices, so I had to leave this alone for now.

### A tip: icon and splash screen

This is another very crucial aspect---delivering the right icon and boot image for your app---that is handled extremely poorly in the docs.

It's actually quite simple, once you figured it out.

As usual, all of this code is to be added in the `config.xml` file.

The following code sets the icon for all sizes and platforms.

{{% highlight xml %}}
<icon src="path/to/icon.png">
{{% /highlight %}}

The following code sets the splash screen to something else (instead of the default cordova box icon).

{{% highlight xml %}}
<preference name="SplashScreenAnimatedIcon" value="path/to/icon.png" />
{{% /highlight %}}

Of course, you can set different icons for different sizes, or apply something more advanced (such as the multi-layered adaptive icons that Android wants you to make). But I like things simple and clean and I don't care about that, so this was enough for me.

**Note** that the path to this icon is from the **root** of the project, _not_ that `www` folder that contains your actual game. As such, it's recommended to create a `res` or `resources` folder at the root and put all those extra assets in that.

### A tip: version numbering

The Play/App Store require that every new update to your app uses a _higher_ version number than the previous one. This is baked into the app file itself and must, thus, be manually updated and set accordingly before building it in the first place.

This, again, can be done in the `config.xml`.

The default one should already contain a `version="1.0.0"` line. You might know, however, that app versioning uses _integers_ (and not the dot-format of other software).

But don't worry! Cordova _automatically_ converts this version to an integer format. More specifically, it does `10000 * first number + 100 * second number + third number`

For example, if you don't change anything, your first release will have version number 10000. If you then change it to `1.1.0`, it will be 10100.

So all you need to do, whenever you publically release a new version of your game, is ensure you bumped this one version property, in this one place, to something higher. It should all work out properly then.


## Conclusion

That's it! Let's recap:

* You can create a cordova app. 
* You can place your own game files in there, changing what's needed to make full use of cordova
* You can setup all configuration and paths to make exporting work
* You can emulate, test run, debug, and build to any target
* You can create keystores and bundles to professionally publish the game
* You can add extra common functionality, such as camera or AdMob

Hopefully this was clear and informative. As you can see, I'm amazing at hitting every roadblock imaginable, so learning this and setting it up took me quite some time. I tried to distill that into a to-the-point tutorial.

I really hope we find a better system for Android/Java/SDK stuff some day. As well as a better system for Ads or Play Store integration. But for now, in the current day, this is the amount of work you need to go through to get a simple jumping ball on a phone screen and a banner ad below it.

Until the next time,

Pandaqi