---
draft: true
title: 'How to deploy a Phaser game as an executable'
tags: ["tutorial"]
date: 2023-01-01 12:09:32
---

You have created an HTML5 game. This tutorial mentions Phaser because it's the most-used web game framework, but the process below works for _any_ HTML5 game.

And now you want to publish and deploy the game for _desktop computers_.

In my case, I simply like having executable versions of all games. Some HTML5 games I made 10 years ago don't work anymore because of slight changes in browsers, which is sad. Keeping executables means your game will be playable for a much longer time.

But the reason isn't important. It's about how to do it! Let's start.

> If you want to build for _mobile_ instead, check out my other tutorial: [How to deploy a Phaser game for mobile](../deploy-phaser-game-for-mobile/). The start of both tutorials is very similar, then it differentiates.

## Web wrappers

A web game is nothing more than a set of files that a web browser can understand and display correctly.

So how do we turn it into a standalone program? By *bundling* the game with a web browser! So it doesn't need an external browser anymore!

This is called a **wrapper**. Such a package wraps _around_ your game files to place them in a simulated web browser.

And that's good news, because wrappers are always small and easy to use. You've already done most of the work: creating the _actual game_ and getting _all the files ready_.

All that's left, is putting it inside the right wrapper with the right configuration.

## Electron

I used [Electron](https://www.electronjs.org/).

Advantages:

* The most well-known and popular software for doing this
* If it's good enough for some of the biggest (web) companies, it's good enough for me
* The only one for which I found a reasonable amount of documentation and help

Disadvantages:

* It's bigger and slower than newer frameworks

## What do I need?

Electron isn't software to install. It's a _node package_. So [install Node](https://nodejs.org/en/download/)

I will be using Yarn. To do so, open a Node prompt and type `enable corepack`. But you can ignore that. Any command in this tutorial where you see `yarn`, you can simply replace that with `npm`.

I recommend [Visual Studio Code](https://code.visualstudio.com/) for editing the code and running the commands. 

It has an integrated terminal or command line. When you add a folder to the workspace, you can right-click and choose "open integrated terminal here". It's an easy way to type commands inside any project.

And lastly, I recommend installing [GitHub Desktop](https://desktop.github.com/) and making an account at GitHub. Git is a _versioning_ tool. This means it keeps track of all your changes. When done with a feature, you can commit those changes to create a backup on GitHub.

{{% remark %}}
If you do so, go to the option "Git Ignore" and choose the "Node" template. This ensures git ignores the _many, many_ modules that every node project will install. Which would slow down versioning and backup by a ton.
{{% /remark %}}

## My way to do it

You _could_ create this wrapper around _every project you make_. In other words, whenever you start a new web game, also install electron again, configure it again, so it's integrated with the project.

But I don't like that. It adds a lot of overhead and complexity to any game. 

I only care about electron at the final stage: the game is _done_ and I want to _deploy it_. The other 99,9% of the time it has no business being in that game project folder.

My technique is therefore to create a **single, separate Electron project**. When I want to deploy somethnig, I simply copy-paste all its files to this Electron project and run it once.

This won't work if all your games are radically different in terms of _configuration_. But most likely, they are all radically _exactly the same_ :p

## Create a new project

Create a new folder wherever you want. Let's call it `electron-export`. 

I have a "Games" folder at the top level of my computer, with all games in it (duh). This Electron project could be used by anything, so it's at the root of that folder.

Open a terminal there and type `yarn init`.

It asks a few questions. Only the `entry point` is important. Let's make that `main.js`. (Most people already use `index.js` for their web game or application. Otherwise, that's the standard name.)

However, do make sure you put _something_ everywhere. I found out the hard way that some packages simply crash if some information isn't set.

Once done, it has created a `package.json` file with these details. Your project is now officially a Node project!

## Add electron

Because it's a Node project, we can now very simply add that "Electron" package.

In the terminal, type `yarn add electron --dev`.

Wait until it's done. You can check it worked in two ways:

* Now you should have a `node_modules` folder inside that project of yours. Again, make sure Git ignores this, or you're in for a world of pain.
* Open `package.json` and check if electron is listed under `devDependencies`

## Tell the project to use electron

An electron project should _start_ by calling that package and going to the entry point. (That file we set earlier in the configuration, `main.js`).

In Node projects, this is usually done by adding "scripts" to the configuration. Go to `package.json` and add this:

{{% highlight Javascript %}}
{
    // ...
    "scripts": {
        "start": "electron ."
    }
    // ...
}
{{% /highlight %}}

Now you should be able to _start_ this project by simply typing `yarn run start` (in the terminal) or simply `yarn start`. It's a shorthand for quickly running a project.

But if you do that now, everything crashes and burns!

Why? We obviously haven't _created_ the entry point yet. There's nothing to wrap around!

## Creating the entry point

Create the file `main.js`. Simply place it at the root of the project.

What is the purpose of this file? It will tell Electron ...

* The file(s) it should load
* And to put the result of that inside a new application _window_, with certain settings.

The code below is the basic boilerplate for that.

{{% highlight Javascript %}}
const { app, BrowserWindow } = require('electron')
 
function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html');
}
 
app.whenReady().then(createWindow)
{{% /highlight %}}

The syntax is quite self-explanatory. When the app is ready, call the function to kick things off. 

Inside the function, we create a new Window (with some settings), and then we load the entry point of our _game_ into that.

Again, if you run this now, not much happens. Because we don't have our `index.html` yet.

But where should that file come from? That should be our game! If you've made a web game, you will have one `index.html` file which loads any other files (such as the JavaScript). If not, I recommend renaming or restructuring to that, as it's most common and easiest to use.

## Placing the game inside the wrapper

This step seems like a mistake, but it's really that simple.

* You should build your game or make a copy of all its files
* Now drop these inside the electron project

And you are done.

Type `yarn start`. A window will pop up, which loads your game, and you can play it!

{{% remark %}}
It might lag a little bit. That's because this is a _dev_ build, which stays connected with your VS Code for debugging and isn't optimized. If your game doesn't lag in regular browsers, it shouldn't lag once exported.
{{% /remark %}}

## Turning it into an executable

Okay, how do we go from here to an `.exe` file you can click?

Remember, Electron is merely a wrapper. As you saw, with minimal effort, it loads your game inside a window. But it doesn't do anything else.

For packaging your project, use an extension (by the same creators) called Electron Forge. This is a wrapper around a wrapper. So install it in the same project using ...

{{% highlight Bash %}}
yarn add --dev @electron-forge/cli
{{% /highlight %}}

Once done, tell it to import the work we've done so far ...

{{% highlight Bash %}}
npx electron-forge import
{{% /highlight %}}

Again, wait until all is done. Don't modify the folder or start changing stuff while a process like this is being executed. (I say this, because I can get very impatient, and have destroyed many setups by trying to setup three things at once :p)

Check if it worked correctly:

* There should be some more `devDependencies` in your `package.json`
* There should be a `forge.config.js` file in your folder
* It should have added a few extra `scripts` in the same file

Earlier, we used "start" to run Electron. To test if it was working.

To create a package out of the project, instead of running the project, we use a different script. 

The naming is conventional and self-explanatory. Type: `yarn make`.

## Finding the package

It should try to build your game for your current operating system. (Because we haven't told it anything else yet. We'll do this soon using that new `forge.config.js` file.)

It neatly shows all the steps. When it's done, a new `out` folder will be in your project.

It has two folders:

* An electron export
* And one called `make`

This first one is simply your game exported to an electron project, what you were able to do before. This is an "intermediate step" that Forge uses. You can ignore it.

The second holds your _installer_. Double-click and you can _install_ your game. It shows an animation for a few seconds, then it should be installed and it immediately launches your game.

## A story about failure
Story time! This did _not work_ for me. It just crashed without _any indication_ what was happening. I had nothing to go on.

It only said "An unhandled rejection has occurred inside Forge: [object Object]". The error was so obscure, they didn't even write code to display the object for it :p

I reinstalled everything, checked the dependencies, checked everything. The electron build was fine and without errors. But Forge would crash and burn.

What was the issue? I, somehow, did not have an `author` field in my `package.json`. Yeah. That was the problem. Adding any author solved the crash and suddenly everything was fine. 

How did I discover this? Because of a small remark by someone about the package file, under an otherwise mostly unrelated issue. I was already clicking away the tab, when I was like "meh, I've wasted two hours on this, might as well try that".

The lesson here? That package file needs a `name`, `version`, `author` and `description`. Otherwise Electron Forge just crashes. 

## Improving the window

Obviously, there are many ways to configure or improve this output. I'll mention the most useful ones below. Let's start with ways to improve the app (Electron). The next section discusses ways to change the packaging (Electron Forge).

You can always check the [full list of BrowserWindow properties](https://www.electronjs.org/de/docs/latest/api/browser-window).

Except for the first one, these things are changes the configuration of the `BrowserWindow` object (in `main.js`).

### Menu bar

There's this annoying menu bar at the top of the window. Great for applications, not useful for games.

Remove it by adding this line to your `main.js`, before you load the `index.html` into the window.

{{% highlight Javascript %}}
win.setMenuBarVisibility(false);
{{% /higlight %}}

### Fullscreen

Add `fullscreen: true`. Note that the default app _can_ be put into fullscreen by default (using the method for making a window fullscreen, for that specific OS). This just means it already is fullscreen when started.

### Icon

Add `icon: path/to/icon.ico`. Note that this only applies to Windows. Also note that this is the icon of the _window_, not the icon for the executable.

### Title

Add `title: "your title"`. Note that this is _overridden_ if your `index.html` file specifies a `<title></title>` attribute.

## Improving the output

These things need to be changed in the `forge.config.js` file.

{{% remark %}}
Past versions of Electron Forge simply put the configuration in the `package.json` file, under a `forge` key. You will find this syntax everywhere online. It's not recommended to use it anymore.
{{% /remark %}}

### Makers

When you make your project, it builds it for your specific platform. How does it know? How do you change this?

Electron has support for many different "makers". If you go to that `forge.config.js` file, you will see multiple makers have already been specified! Not every maker works on every system (Windows / Mac / Linux). Which is to be expected, as different systems use very different architectures for creating software.

Take a look at [the full list of makers](https://www.electronforge.io/config/makers).

For windows, it will use "Squirrel" by default. You can switch to "WiX" if you want a proper, customizable installer. The "Zip" maker works everywhere and has no configuration, as it merely packages your files into that archive format.

Most options belong to Linux (deb, flatpak, rpm, snapcraft) and Mac (appx, dmg, pkg).

### Icons

It's recommended to start with a 1024x1024 image. Then use any tool (like an online website) to convert into a full suite of symbols. (At all sizes and extensions.)

Now you can add the symbols---note the plural---like this, by not specifying the extension.

{{% highlight Javascript %}}
    packagerConfig: {
        icon: '/path/to/icon'
    }
{{% /highlight %}}

For Linux, you need to specify the icon at the _maker_, instead of globally.

### Performance & Protection

By default, Electron Forge ignores that big node_modules folder. If that doesn't seem to happen (it takes very long, final build is very large), you can enter your own paths to ignore:

{{% highlight Javascript %}}
    packagerConfig: {
        ignore: ['path1', 'path2', ...]
    }
{{% /highlight %}}

Additionally, Electron Forge can compress all your files into one archive file. Which is faster to create and to load. This uses a format called "Asar".

{{% highlight Javascript %}}
    packagerConfig: {
        asar: true
    }
{{% /highlight %}}

This provides _a bit_ of protection against code theft. It takes many more steps now to find your source files and get them.

But it's not a full protection. That is _never_ possible. If code is to be run on somebody's computer, they need full access to that code somehow.

If you're building your game using Webpack or another Node-based system, you will automatically have access to tools that _minify_ and _obfuscate_ your code. Use them. They are another layer, although still not full protection.

Strings, for example, will always stay the same.

For this reason, **don't expect your code to be encrypted and hidden**. Don't put sensitive information in there. And dn't go out of your way---hurting user experience---to protect something that is unprotectable.

You probably created a web game to make it playable _on the web_. That means the code and assets are automatically 100% available. Creating an executable won't change this much.

## Signing & Certification

Talking about that, any software for Mac and Windows should probably be _signed_. You need to add your own certificate (and unlock it by a private password) to show to users who made it. Over time, as more users open your software, this certificate becomes more and more _trusted_.

If you're trusted, your software immediately opens without issue. If not, a warning might appear, or it might be blocked entirely.

Obviously, getting certified is the way to go. The issue is that it costs money.

If you're serious about this and ready to deploy your game for professional purposes, take a long look at the [Certification Guide](https://www.electronjs.org/docs/latest/tutorial/code-signing)

{{% remark %}}
I haven't done this yet, so I can't say anything else about it.
{{% /remark %}}

## Conclusion

That's it!

You know have a project configured to export any HTML content into an executable/installer.

Whenever you want to export something ...

* Delete any old content (if still there from a previous export)
* Copy-paste the new files, ensuring the main entry point is still `index.html`
* Ensure the important properties are changed. (Title, icons, any unique configuration for this project. It's best to save these changes in a file within each project, so you can easily copy-paste the changes as well.)
* And run `yarn make` from a terminal within this folder

Of course, you're free to add this Electron + Electron Forge setup to _every project_. It's just too heavy and cumbersome for my crappy old laptop, so I use this method to stay lean.

Hopefully you can now easily turn your HTML5 games into desktop games.