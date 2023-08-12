---
draft: true
title: Creating games with Phaser and Typescript
tags: ["tutorial"]
date: 2022-01-01 12:09:32
---

This is an article explaining my process of learning how to use *Phaser* and *TypeScript*.

I made many mistakes along the way. Most of the information online assumed you already know stuff (I do not) or was already outdated (at time of writing, early 2023).

So I had to stumble my own way towards success. This is what I did. It's heavily focused on Windows and I'm not sure how well each step applies to other operating systems.

In summary, there are four major steps to this article

-   Install Node and friends
-   Configure *everything*
-   Get it up and running
-   How to go from there to a more complicated game

## Install Visual Studio Code

Download [VS Code](https://code.visualstudio.com/). It's probably the most-used and most-loved code editor. I share that sentiment. (Although it could be a bit less heavy, in terms of performance and file size.)

It has built-in TypeScript support. It has a built-in command line you can use for all the commands below. (It calls it a *terminal*. You might need to drag from the bottom to display it.)

So I recommend using that. Download, install, open.

## Install Node

Go to the [Node download page](https://nodejs.org/en/download/). Download and install the latest version.

*What's Node?* Node helps automatically convert your *TypeScript* to *JavaScript* and then put it on a local server. This way, you can immediately test your phaser games while working on them.

Check out the install instructions for [Yarn](https://yarnpkg.com/getting-started/install). Last I checked, you only needed to open a command prompt and type "corepack enable"!

(To open a command prompt, press the Windows key and type "cmd", click the program that appears.)

*What's Yarn?* Node comes with its own package manager: NPM. It's fine. It's the thing you use to install new packages and modules for projects. Yarn is the same, but simply faster and more modern.

(So whenever a tutorial says to type a line of code starting with "npm", you can just replace that with "yarn".)

## Create a project

Create a folder in some reasonable location and give it the name of your game.

Now go into that folder using the command line. Type: `cd <path to folder>`. (CD stands for *change directory*.)

We need to convert this folder to a Yarn project. Type: `yarn init`.

It might ask questions. Answer whatever, skip through this. The only thing it does is create a `package.json` file with your answers (which you can change later).

## Configure it

Within `package.json`, we state information about the project. Like its name and its author.

But more importantly, we state what the project needs: *dependencies*.

Technically, we only need three modules:

-   `Phaser` => obviously
-   `Ts-loader` => for converting TypeScript to JavaScript
-   `Webpack` => for creating the local webserver for testing

Now you can do two things.

-   You can type those package names into this file and work from there.
-   You can copy this file from somebody else who already did that.

I like the second option.

I used this GitHub repository as blueprint: [Phaser Webpack](https://github.com/sebsowter/phaser-webpack)

{{% remark %}}
I also liked [this tutorial](https://spin.atomicobject.com/2019/07/13/phaser-3-typescript-tutorial/). Although it's out of date, especially on the webpack stuff.
{{% /remark %}}

Go there, copy what's inside the `package.json` file to your own.
Update to match your own project settings, such as the name and author.

Some notes:

-   **Main**: the path to the entry file for the Phaser game. The one
    where you configure it and start the game.
-   **Scripts**: when you want to test the project, it runs these
    commands for you. Basically saves you some typing time.
-   Each **dependency** is a package name and then its version. Usually
    a `^` is put in front, to signal that any version *above* the one
    specified is also fine.

## Actually install the modules

Great. The package now knows what it needs. But it doesn't have it yet.

Go to your command line, still within your project folder, and type: `yarn install`

It will go through all dependencies and install them in a "node_modules" folder. This can take _a while_. This folder might end up with _many many folders and modules_.

If you use a backup or versioning system, tell it to **exclude** everything within `node_modules/*`. Otherwise these modules will eat space and transfer time.

## Configure TypeScript

TypeScript is basically a strict teacher looking over your shoulder and criticising every line of code you write. Unused variables? Not capitalizing stuff correctly? Implying a certain type then using something else? BAD!

Luckily, you can configure how strict that teacher is.

Create a file `tsconfig.json`. Within it, I like these settings:

{{% highlight JSON %}}
{
  "compilerOptions": {
    "target": "es6",
    "sourceMap": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "moduleResolution": "node16",
  },
  "include": [
    "**/*.ts"
  ]
}
{{% /highlight %}}

They are quite strict, but not too bad. They tell the compiler *which* files to consider and *how* to judge them.

In this case it will compile all files ending in `.ts`. That's the default ending for all TypeScript files. Do not use `.js`.

Some notes ...

-   The `moduleResolution` is important! Many articles don't mention this. But from Node 16+, you need to use "node16", or modules won't work
-   If you want to support much older devices, set the target to "es5" instead

You can find a [list of all settings here](https://www.typescriptlang.org/tsconfig)

*But how does TypeScript work?* First learn JavaScript. If you can write that, you can write TypeScript. It's simply an *added* layer. So once you're comfortable with JavaScript, check out any tutorial online for the basics. It's mostly about defining the types of variables by using the colon (`:`) syntax.

{{% highlight TypeScript %}}
const variable : integer = 5;

function doSomething() : boolean
{
    return true;
}
{{% /highlight %}}

## Configure Webpack

For this step, you have two options, again.

-   Learn the magical ways of WebPack
-   Use somebody else's code

I used that GitHub repo again. I copy-pasted the contents of `webpack.config.js`. (This one ends in js, not json!)

Webpack is very strict as well.

If you'd try to run the server now, it would crash. But nothing is actually wrong. It just wants your project to have a specific structure.

-   Create an `src` folder. This has the *source* of your game.
-   Put an `index.html` file in there. Any basic template will do. But I like adding a `<div id="game-container">` to the body to hold the Phaser game.
-   Create two subfolders: `js` and `assets`.
-   Within `js`, create the `index.ts` file. (Remember, the one we
    designated as our main file in the configuration? When this local server is visited, it calls _that_ script to start everything.)
-   Within `assets`, create a few subfolders for different asset types. (It expects this and it will crash without it. Let's call it *enforcing good folder structure*.)

## How the hell do we run this project?

Ah! With all this configuration done, that part is as simple as can be.

Still within the command line, within your project folder, type: `yarn start`

It will tell you what it's doing. Hopefully it's all green and happy. 

Go to `localhost:8080` in your browser and you should have a webpage ... that does nothing.

If there are errors, you can usually Google them and find others with the same problem.

It will *automatically reload* ("hot reloading"). So you only need to type this once (per session), and then you can code away and it will constantly update your server.

## How Phaser works

This is not a Phaser tutorial. But I want to leave you with a basic functional game and how to continue from there.

Phaser only needs two things to work:

-   Some code that asks Phaser to create a "game"
-   A scene for Phaser to start with

Scenes basically represent "a group of things that should be together". Phaser can display as many scenes as you like at the same time. So you might have a scene with **UI elements**, overlaying a different scene holding the **background**, etcetera.

The `this` variable within each scene holds all the functionality to use Phaser. Anytime you want to do something, you start with `this` and go from there.

Phaser has three magical functions that are called for every scene.

-   **Preload:** called before the scene starts, used for loading assets
    and needed resources
-   **Create:** called once when the scene starts
-   **Update:** called 60 times per second; the main loop of the game

## Creating a game

Within your **index.ts**, create the code for initializing Phaser.

{{% highlight TypeScript %}}
import "phaser";
import Game from "./game";

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'GAME TITLE',
 
  type: Phaser.WEBGL,
  scene: [Game],

  backgroundColor: '#AAAAAA',
};

export const game = new Phaser.Game(gameConfig);
game.scene.start("game");
{{% /highlight %}}

Notice how we import Phaser at the top. Also notice how we import another file: that's where we'll define the scene in a moment.

Imports are great. I suggest you use them, so that every bit of game logic has its *own* separate file, and is easily *reusable*.

In its simplest form, use them as follows.

At the end of a file, state that something should be exported so it's available elsewhere.

{{% highlight Javascript %}}
const obj = { "a": 5, "b": 3 };
export default obj;
{{% /highlight %}}

When you want to use this elsewhere, import it at the top of that other file. If you export multiple things, you can pick which one(s) to use.

{{% highlight Javascript %}}
import obj from "./obj"
{{% /highlight }}

Notice that the paths start from the current folder (`.`) and do *not* include the extension (`.ts`).

Knowing this, create that second file `game.ts` to hold your game scene. Do so by creating a new class that _extends_ the Phaser scene. 

{{% highlight TypeScript %}}
const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'game',
};

export class Game extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
 
  constructor() {
    super(sceneConfig);
  }
 
  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
    this.physics.add.existing(this.square);
  }
 
  public update() {}
}
{{% /highlight %}}

The game still does nothing besides creating a white square. But at least we have a functional running game!

Also, remember that we wrote a list of scenes in the configuration above. There we wrote the key "game", which means we must use it here as well. 

{{% remark %}}
I made the mistake of capitalizing this key by accident: "Game". This led to fifteen minutes of asking myself: "why on earth is this simple thing not working!?"
{{% /remark %}}

## Extending the game

Why did I spend so much time explaining *import/export* and *Phaser scenes*?

Because it's crucial to maintaining a clean project structure as the game grows.

### File structure

My advice:

-   Use separate scenes for the major parts of your game. (UI, Menu, MainGame)
-   Use separate files for any parts that belong together, but can be disconnected from the rest.

Let's say you want to add a player.

It's easy to fall into the trap of *adding everything within the scene file*. Want to move the player? Write some code in the `update()` function. Want to listen for input? Write some more code in the `update()` function.

But over time this means you get one file with tens of thousands of lines of code. Everything knows about everything, it's all a big spaghetti mess, and you don't want to work on the game anymore.

Instead, create a file `player.ts` and put all the logic in there. Now simply call "player.update()" from the main update loop, and you're done.

### Entity-Component

If your game becomes bigger, you might want to switch entirely to an *entity-component-system* or ECS.

Every dynamic object in your game is an **entity.** Add it to a big global list in the main file. Now just loop through that list in the `update()` function, calling `entity.update()` on every single one.

(So you don't have to manually call the function for each entity that needs it.)

It also means that functionality is created as tiny *modules* that can be added/removed to any entity. For example, want a player to take damage when hit by a bullet? Write a module "DamageTaker" (or something like that), add it to any entity that needs it, and done.

Again, this is easily done by keeping a list of all modules on an entity.

There are probably better guides or premade libraries for these things. I don't know, I haven't used them.

### Loading

Most Phaser devs don't start the game with the menu. They call a "boot" or "loader" scene. The scene only has its `preload()` function and simply loads all the assets. While doing so, they display a loading screen of some sort.

### Scaling

I like using a fixed resolution, but scaling to fit. Scaling to use *all available space* simply never worked out well for any game I tried.

To achieve this, simply set the *scale* configuration in your index.ts file to:

{{% highlight TypeScript %}}
const gameConfig: Phaser.Types.Core.GameConfig = {
    // ...
    scale: {
        parent: 'game-container',
        width: 1920,
        height: 1080,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    // ...
};
{{% /highlight %}}

That's the common 16:9 resolution. It scales to fit, without distorting. It automatically centers the game on the page. Solves basically any problem you might have with responsive design.

## I've finished my game, how to deploy?

Remember the `package.json` that had multiple entries for `scripts`? We've been using the first one for development: `yarn start`

The second one is used for creating an actual production build. (This is the common way to do it.)

Stop your server, if it's currently running, with `CTRL + C`. Type: `yarn build`. 

It builds your game in the `dist` folder. It might take longer than the other command.

These are simply flat website files. As such, you can upload the contents of this folder straight to whatever server you're using. For example, create a folder on the server with the game's name and put these files inside.

If your game is called "mario", then the URL to play the game online would simple be: "https://yourwebsite.com/mario/"

I like flat/static websites, so this would be my approach. But if you have many games, or use some other tech stack, you might look into building this into some automated process.

## Conclusion

That's it!

Hopefully the steps worked and nothing is outdated yet.

You should be able to freely code in TypeScript, build your dream game, and with a simple `yarn start` compile and test it within the browser.

When you're ready, you can type another simple `yarn build` to deploy the game.

That's Phaser + TypeScript + easy development on Windows.

Check out my game studio to see the games I made with this setup. (I just learned this, so it might be a few months before games using Phaser are released.)