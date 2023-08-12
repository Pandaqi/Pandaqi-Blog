---
draft: true
title: 'How to deploy a Phaser game as a mobile app'
tags: ["tutorial"]
date: 2023-01-01 12:09:32
---

You have created an HTML5 game. This tutorial mentions Phaser because it's the most-used web game framework, but the process below works for _any_ HTML5 game.

And now you want to publish and deploy the game for Android / iOS.

I was in the same position. So I looked for the easiest way to do it and will now try to teach that to you!

> If you want to build for _desktop_ instead, check out my other tutorial: [How to deploy a Phaser game for desktop computers](../deploy-phaser-game-as-executables/). The start of both tutorials is very similar, then it differentiates.

## Web wrappers

A web game is nothing more than a set of files that a web browser can understand and display correctly.

So how do we turn it into a standalone app? By *bundling* the game with a web browser! So it doesn't need an external browser anymore!

This is called a **wrapper**. Such a package wraps _around_ your game files to place them in a simulated web browser.

And that's good news, because wrappers are always small and easy to use. You've already done most of the work: creating the _actual game_ and getting _all the files ready_.

All that's left, is putting it inside the right wrapper with the right configuration.

## Cordova

I used [Apache Cordova](https://cordova.apache.org/)

Advantages:

* Probably the most well-known package for this purpose
* The documentation is well-written and easy to find.
* You can find many other tutorials combining Phaser and Cordova, which means it's probably the most common tool

Disadvantages:

* Only mobile export. (Desktop used to be "somewhat supported", but that's all deprecated now. See my other tutorial for that.)
* Nothing else, as far as I can tell? Yes, you need lots of Java build tools installed, but that is needed for _any_ Android export and just a nasty part of that ecosystem.

## What do I need?

Cordova isn't software to install. It's a _node package_. So [install Node](https://nodejs.org/en/download/)

I recommend [Visual Studio Code](https://code.visualstudio.com/) for editing the code and running the commands. 

It has an integrated terminal or command line. When you add a folder to the workspace, you can right-click and choose "open integrated terminal here". It's an easy way to type commands inside any project.

And lastly, I recommend installing [GitHub Desktop](https://desktop.github.com/) and making an account at GitHub. Git is a _versioning_ tool. This means it keeps track of all your changes. When done with a feature, you can commit those changes to create a backup on GitHub.

{{% remark %}}
If you do so, go to the option "Git Ignore" and choose the "Node" template. This ensures git ignores the _many, many_ modules that every node project will install. Which would slow down versioning and backup by a ton.
{{% /remark %}}

## My way to do it

You _could_ create this wrapper around _every project you make_. In other words, whenever you start a new web game, also install cordova again, configure it again, so it's integrated with the project.

But I don't like that. It adds a lot of overhead and complexity to any game. 

I only care about cordova at the final stage: the game is _done_ and I want to _deploy it_. The other 99,9% of the time it has no business being in that game project folder.

My technique is therefore to create a **single, separate Cordova project**. When I want to deploy something, I simply copy-paste all its files to this Cordova project and run it once. This neatly _separates_ the development and coding step, from the building and exporting step.

This won't work if all your games are radically different in terms of _configuration_. But most likely, they are all radically _exactly the same_ :p

## Create a new project

Create a new folder wherever you want. Let's call it `cordova-export`. 

I have a "Games" folder at the top level of my computer, with all games in it (duh). This project could be used by anything, so it's at the root of that folder.

You don't need to do anything else. (Like turning this folder into a node project itself. Not needed.)

## Install cordova

Because it's a node package, we can add Cordova now with a single line of code.

{{% highlight bash %}}
npm install -g cordova
{{% /highlight %}}

This installs it _globally_. This simply means that you can now use the `cordova` keyword within any node project, like the one we just created, to accomplish stuff.

This is "Cordova CLI": Cordova Command Line Interface. Apparently there are other versions, mostly in the past. But this can be really confusing when you look up issues or documentation, as it might be talking about a _different_ version. So keep that in mind.

## Convert the project into Cordova Structure

So let's use that keyword to turn our current project into a structure that cordova likes. 

{{% highlight bash %}}
cordova create foldername packagename projectname
{{% /highlight %}}

Those three names must be supplied by you:

* Foldername = the name of the folder containing the cordova skeleton
* Packagename = required for mobile apps, has the form `com.developername.gamename`
* Projectname = the title of your project and app

Within a few seconds, it has created that folder. Within it resides the _skeleton_ for any cordova app.

I want you to note two important files: `package.json` and `config.xml`

The `package.json` file has some of the more general information you just entered. **You can change this at any time.**

The `config.xml` file contains more specific information about how to build the app and how it should function. For example, this is where you need to put some lines of code to make AdMob work. **You can change this at any time.**

This is how you can easily use this _one_ project for _all_ your web game exports. For each game, simply save its own `package.json` file with the right parameters and its own `config.xml` with the right parameters. 

When it's time to deploy, swap out the files, and your settings (title, version, author, etcetera) should be correct. One cordova project---use it to export any of your projects.

## Add your own files

The `www` folder contains the content of the app. For now, it has a very small demo project.

There are several lines of importance in `index.html`:

* The meta tags in the head. Copy them to the `index.html` of your own game. 
* The inclusion of a script `cordova.js` at the end of the body. Copy this line of code to your own `index.html`

Some people have reported the need to add "blob" type to the security policy (when using Phaser). I didn't need to, but this is what that means:

{{% highlight html %}}
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline';  media-src *; img-src 'self' data: content: blob:;">
{{$ /highlight %}}

The cordova script is used by cordova to add extra functionality to your game. You might be able to do without it, but there's no reason not to just include it.

There is also an `js/index.js` file. It has boilerplate code that allows checking if your app is ready to go. You might want to copy this to your game as well, in case you want to use it.

{{% highlight Javascript %}}
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
{{% /highlight %}}

Now you can ...

* Remove that whole demo project.
* Copy-paste your web game into it. Make sure your main file is also called `index.html`

It's that simple. Now cordova knows the files it should load.

## Adding platforms

We need to tell cordova to which platforms it should export. For this tutorial, I'll keep it simple and stay with Android.

**Go inside this project directory**. You can use `cd foldername` for that in the terminal. Then type ...

{{% highlight bash %}}
cordova platform add android
{{% /highlight %}}

It might take a while. Wait until it's done. Check it worked:

* A `node_modules` folder was added
* A `platforms` folder was added, containing an `android` folder.
* The `package.json` file was updated to indicate the platform android.

## Preparing for building

This is the "nasty" step I mentioned when it comes to android. It requires some very huge and slow-to-install android tools. There are _many things that can go wrong_.

You can check if you have all the requirements by typing `cordova requirements`. It will tell you exactly what you have and what you're missing.

The [Cordova docs](https://cordova.apache.org/docs/en/11.x/guide/platforms/android/index.html#requirements-and-support) outline how to get every required part. 

I don't see a reason to copy this to my tutorial. Read that guide from top to bottom and you should have (and understand) everything needed.

But let me give you a summary _and_ the many things that went wrong for me. Because I am truly the champion of hitting every possible obstacle when trying something new.

Keep trying and typing `cordova requirements`. Once it's completely happy, you can continue to the next section!

**You probably need to restart Visual Studio code after every try**. The path/system variables are only read and stored when a terminal/command program _starts_. So if it's already running, and you change something, it won't see it (yet).

### The summary

Here is a summary of the steps.

* Java Development Kit (JDK) => the toolkit to make Java (programming language, used to build Android) work. A bunch of files to unzip and place on your computer.
* Android SDK => the toolkit to make building to Android work
* Android target => each version of android needs its own settings and tools
* Gradle => building, package and version manager for all this android stuff (similar to NPM). A buch of files to unzip and place on your computer.

Both SDK and targets are best acquired by installing the latest version of Android Studio. It should install or update the latest versions automatically.

All of these need to be specified in the system `PATH`. So that the terminal can actually find them.

### Possible Issue: Java naming is stupid

The JDK has _versions_ that are integers. Like: JDK v17.

But when you download them, and unzip their folder, their version has a _product id_. Like: 11.0.17

The last element of the product ID is the actual JDK version. This is confusing. Now you know.

{{% remark %}}
Also, since some years, you need an account to download Java executables. This is a stupid move from Oracle that is clearly not in the best interest of the _users_. Simply Google "Java JDK without login" and you'll find many people providing links to download from without making an account.
{{% /remark %}}

### Possible Issue: too old

For some reason, when I went to "latest" downloads for both Gradle and JDK ... I did _not_ get the latest downloads.

The current version of Cordova (v11) needs JDK 11 and Gradle 7+. Make sure you download those. As you know now, JDK 11 is also known as JDK v17 😒

Also make sure the `PATH` points to them.

Actually, there are _two_ different paths.

* The System Variables. These need a path **and** a name. The JDK must be saved there under `JAVA_HOME`. The Android SDK must be saved there under `ANDROID_SDK_ROOT`.
* The general Path variable. Supply paths to folders. All scripts/executables inside the folder are now known to the terminal. Everything else must be set _here_.

### Possible Issue: too new

Cordova is often updated. But Android as well. It might happen that you download these at a weird time (like me!) and get a version that is _too new_.

Then you need to install a few older Android targets that Cordova recognizes.

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

Don't get an error? It works properly. And you can use this command to get information! Type `sdkmanager --list` to get a list of all installed Android targets. Or type `sdkmanager --install "sometarget"` to install something new (without needing to go through Android Studio).

If this command reports you have some targets, cordova _should_ be able to find them and be happy.

### Possible Issue: no virtualization

Cordova couldn't emulate anything, in my case. It would just crash or not find anything to emulate.

When I checked the virtual devices in Android Studio, there was one default device! But it had a big red message from Android Studio saying "VT-x disabled in BIOS". 

Apparently, "virtualization" is something that can be enabled/disabled in your BIOS. And it was disabled in mine by default. So I looked up what that was and how to enable it. Once I did that, stuff worked.

## Building the game

With all this setup done, building is just one command: `cordova build`

It will setup a gradle (this might take a while). Once done, it uses that to build the game (this is very quick).

The output is within `platforms/android/app/build/outputs`. Yeah, it's a very long path. Just CTRL + Click on the path in your terminal and VS Code brings you to it :p

A few important notes:

* This signs the app using a debug key. If you want to deploy it, you need to create your own key and sign it with that.
* It defaults to exporting an `.apk` This is somewhat deprecated and Google Play wants an `.aab` now

Both these steps will be discussed at the end of the tutorial.

## Testing the game

It's annoying to constantly build and transfer the file to your own smartphone. That's why cordova can _emulate_ the game, as a mobile app, right on your computer. 

Cordova uses the "virtual devices" setup by Android Studio. There should be a suitable one by default. But in case anything went wrong, you can [add and change virtual devices yourself](https://developer.android.com/studio/run/managing-avds.html)

Type: `cordova emulate android`

This opens a window with your game. And some extra buttons/UI you'd commonly find on phones.

You can also plug in your smartphone and test it _directly_ on it. Type: `cordova run android`

_Hey, this doesn't work!_ Ensure your smartphone has USB debugging enabled. (Enable dev tools on your android phone, then plug it into your device and accept. You can find guides online, but it often depends on your specific model.)

Virtualization/emulation is really tough on a computer. My crappy old laptop was too old to actually use the emulation---it took almost 10 minutes before it was running. So I had to test immediately on my phone, which was (relatively) quick and easy.

## Plugins

By default, cordova will merely wrap your game inside a browser environment. For many games, this will be fine. They only need common browser features that don't depend on the device used.

But this means you don't have access to smartphone features like a native app: camera, media access, GPS, battery status, etcetera

To change this, cordova uses **plugins**. You can [search the plugin list](https://cordova.apache.org/plugins/).

Once you know what you need, copy the package name and type

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

Or read the [full docs for the screen orientation plugin](https://cordova.apache.org/docs/en/11.x/reference/cordova-plugin-screen-orientation/).

## AdMob

A very common addition to mobile games are _ads_, and more specifically AdMob.

Fortunately, there is another package for that: [Cordova Admob](https://www.npmjs.com/package/cordova-plugin-admobv1)

Install it, still in the same terminal and project, using the regular syntax:

{{% highlight bash %}}
cordova plugin add cordova-plugin-admobpro
{{% /highlight %}}

Alternatively, you can immediately set the right Admob ID:

{{% highlight bash %}}
cordova plugin add cordova-plugin-admobpro --save --variable ADMOB_ANDROID_APP_ID="your id here"
{{% /highlight %}}

Once done, you'll notice it has added your ID to a file `plugin.xml`. (Instead `plugins/cordova-plugin-admobpro`.) If you, like me, use a single project for all your games, you'll need to keep a unique `plugin.xml` for each game with the right ID. You can simply copy this file and edit as you like.

{{% remark %}}
Or, you use a single "admob app" for all your apps. Which is messy. But I think recent changes made this impossible anyway, as now it requires a link to the actual app in a supported app store.
{{% /remark %}}

With this added, calling AdMob is a matter of writing a few lines of JavaScript.

{{% remark %}}
I recommend coding projects to be platform-agnostic. So, wrap your calls and functionality based on AdMob in something that _checks if it exists_. And if not, gracefully ignore/hide that functionality. This way, you can use the exact same project, but export it to many platforms without issues.
{{% /remark %}}

First, tell it what **ad unit ID** to use. 

(Don't know what that is? Create an AdMob account. Then create a new unit for your project and copy the IDs it returns to you. You need to create a new unit for each _type_ of ad, and thus have a unique id for each type.)

{{% highlight Javascript %}}
var admobConfig = {
    banner: "ca-app-pub-xxx/xxx",
    interstitial: "ca-app-pub-xxx/yyy",
    rewarded: "ca-app-pub-xxx/yyy"
};
{{% /highlight %}}

Ads aren't instantly loaded---it takes time to find them and download them to the device. (With the exception of small ad simple "banners".)

Others need to be "prepared" and cached, so you can load them at some point later. It's recommended to call these preparation functions any time a level starts or ends, at fixed points in the game loop.

Below is an example for rewarded videos.

{{% highlight Javascript %}}
let rewardedVideoAvailable = false;
const cfg = { adId: admobConfig.rewarded, autoShow: false };
AdMob.prepareRewardedVideo(cfg, onSuccess, onFail);

function onSucces() {
    rewardedVideoAvailable = true;
}

function onFail() {
    rewardedVideoAvailable = false;
}
{{% /highlight %}}

Then, whenever you want to show a rewarded video, call that function on the `AdMob` object.

{{% highlight Javascript %}}
if(rewardedVideoAvailable) {
    AdMob.showRewardVideoAd();
} else {
    hideAdButton();
}
{{% /highlight %}}

And there you have it.

The [documentation/examples on this package](https://www.npmjs.com/package/cordova-plugin-admobv1) are great.

{{% remark %}}
When building, it might error. This means it needs some more SDKs installed through Android Studio. The documentation has a clear image of the things you need. I really hope we find a better system for Android/Java/SDK stuff some day ...
{{% /remark %}}

## Configuring your app

I mentioned before that your app is built, by default using a _debug key_. This is fine for development and debugging. But you need a proper key if you want to publish the app.

### About keystores

Mobile apps use _keystores_ to sign an app. They encrypt your app and prove they come from _you_. (Without these details, people can't look inside your app, and can't deploy their own apps _as if they were made_ by you.)

It's called a keystore because it can hold **multiple keys** for **multiple projects**. This is a fact I was stupid enough to ignore. So my first 10&ndash;20 projects all used _their own keystore_ for only _their own key_, which created an unncessary mess.

As such, I recommend creating one keystore, keeping it in a safe place you can easily find, and using it for all projects you export to android.

### Creating your own keystore.

There are two steps. Create the keystore file and a password to unlock the _file_.

If that's done, you can do this step as many times as you want:

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

### Using it

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

## Conclusion

That's it! Let's recap:

* You can create a cordova app. 
* You can place your own game files in there, changing what's needed to make full use of cordova
* You can setup all configuration and paths to make exporting work
* You can emulate, test run, and build to any target
* You can create keystores and bundles to professionally publish the game
* You can add extra common functionality, such as camera or AdMob

Hopefully this was clear and informative. As you can see, I'm amazing at hitting every roadblock imaginable, so learning this and setting it up took me quite some time. I tried to distill that into a to-the-point tutorial.

Until the next time,

Pandaqi