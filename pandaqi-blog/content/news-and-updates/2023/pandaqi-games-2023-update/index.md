---
title: "Pandaqi Games: 2023 Update"
date: 2023-02-20
emoji: "🎮"
---

The past few months, I've updated all my websites in significant ways. Pandaqi Games was the main focal point. In this article, I'll explain _why_ I made changes and _what_ I changed exactly.

## What was wrong?

Nothing specifically was _wrong_. All the interactive elements still worked. The system was already quite nice after my huge update a few years ago.

But ... there was a long list of annoyances that I wanted to fix. Doing so became increasingly demotivating, because the code behind certain parts of the website was a hot mess.

The biggest issue were my **board games**. Many of them have interactive components, like ...

* You can generate a random board to print and play with, right from the website
* The game is a "hybrid": you play with the help of a phone (or other device), which needs an interface and working game system of course
* All of these allow toggling a bunch of settings on/off

And all of that ... was custom made for each game. 

Each time, my requirements were slightly different. When I made those things, it was one big experiment. I didn't know what I was doing. And I certainly didn't know how to do it _well_. 

The result? All games had _loads_ of interconnected dependencies. I copy-pasted repetitive JavaScript like my life depended on it (it kind of did). And it was just cumbersome to find issues or add new games. Which is never good.

Now it's a few years down the line. I knew a full rewrite of that code was needed and I actually had the skill to do it.

## Introducing "Pandaqi Tools"

I decided to create a bundle of "pandaqi tools". Just some JavaScript libraries that do _one thing_ very well, which I can easily reuse in all games.

In the end, I created

* **PQ_PDF**: can be used to create, edit and download a PDF (given canvases as input)
* **PQ_CANVAS**: can be used to create a new canvas and convert it to images (as well as some other useful edits, like splitting the canvas into multiple parts)
* **PQ_PHASER**: many of those games use the Phaser framework as the backend. This instantiates a Phaser game, makes sure the right things are visible/hidden, and handles all that.
* **PQ_SETTINGS**: this _automatically_ reads "settings blocks" and saves them properly in local storage, to be used easily wherever I need those settings (such as the board generation code)
* (**PQ_WORDS**: I'll write another article about this one, it's only tangentially related. But it's still a great and useful tool I built. It contains English word lists and allows me to randomly draw/query from them.)

Together, these are merely 600 lines of code. Yet they allowed me to ...

* Completely remove any custom (or repeated) code from all projects
* Create images and PDFs in a much cleaner, more robust, and faster way
* And _extend_ these objects to allow more useful functionality (for now or the future)

As a bonus, this revealed holes in my older logic and "accidentally" fixed issues.

## Pandaqi PDF

This uses the excellent [jsPDF](https://github.com/parallax/jsPDF) library. I reveal a class called `PdfBuilder`. Any code can instantiate one and, well, use it to build a PDF.

This is done by simply feeding it images, which it saves in an array.

When you call `downloadPDF` on it, it puts all those images into a PDF, then saves it. The code is pretty barebones, as that's all you really need.

{{< highlight javascript >}}
// these properties are fed into the builder on creation
const pdfConfig = 
  {
    unit: 'px',
    orientation: this.orientation, 
    format: [this.size.width, this.size.height],
    fileName: fileName
  };

const doc = new window.jspdf.jsPDF(pdfConfig);
const width = doc.internal.pageSize.getWidth();
const height = doc.internal.pageSize.getHeight();

// This simply places images, one per page, and creates a _new_ page each time after the first one
// DOC: addImage(imageData, format, x, y, width, height, alias, compression, rotation)
for(var i = 0; i < this.images.length; i++) {
  if(i > 0) { doc.addPage(); }
  doc.addImage(this.images[i], 'png', 0, 0, width, height, undefined, 'FAST');
}

doc.save(pdfConfig.fileName);
{{< /highlight >}}

The _compression_ is key here. Without it, files are absolutely _huge_. Let's say you download a randomly generated board for one of my games (and split it), you're already looking at 4 full-color detailed A4 images at high-resolution.

Additionally, the PQ_PDF toolkit decides the **resolution** of all my games. 

Previously, the PDF simply copied the resolution of the canvas. This was an A4 ... but in pixels. Paper has a bigger size and higher resolution.

So, this object calculates a factor with which all canvases are scaled. The number `3.775` is how you convert pixels to millimeters. The number `1.66` was ... found through experimentation. It's the point at which my end result looks crisp (and not _blurry_ like before), without being overly huge or slow.

{{< highlight Javascript >}}
const factorDPI = window.devicePixelRatio * 3.775 * 1.66;
{{< /highlight >}}

If anybody knows one simply function to call, which calculates the exact image resolution to get an A4 300 DPI PDF, let me know.

Anyway, the result of that? Finally all my generated images/PDFs are _clean_ and _sharp_ all the way through.

{{% remark %}}
I did have to go back to older games and "recalibrate" them. My first few hybrid board games, I didn't think to make proportions relative to canvas size. So now that canvases were ~2 times as big, the generation would get stuck or be too zoomed out. In those cases, I simply rewrote the code to make it relative to canvas size, and multiplied by a factor to get it looking like before.
{{% /remark %}}

## Pandaqi Canvas

This uses basic JavaScript code to create new canvases or turn a given canvas into an image.

There's only one caveat: it takes _time_ for this conversion to happen and the new image to be loaded. As such, you can't immediately continue, but need to return a promise (and wait on the result).

So you get something like below. Any number of canvases can be given. They'll be converted to an image, and all the promises collected. Only once _all_ promises have returned (and thus all image loaded and done), do we return those images from the function and continue.

{{< highlight javascript >}}
function convertCanvasToImage(canvas)
	{
		let image = new Image();
		image.src = canvas.toDataURL();

		return new Promise((resolve, reject) => {
			image.onload = function() {
				resolve(image);
			};
		})
	},

async function convertCanvasesToImage(canvases)
{
  const promises = [];
  for(const canv of canvases)
  {
    promises.push(this.convertCanvasToImage(canv));
  }
  const values = await Promise.all(promises);
  return values;
}
{{< /highlight >}}

Its other major feature is that it can **split the board**. A board the size of one A4 paper is just too small for many board games. This option allows you to print that board on multiple papers, which you then lay side by side. This often makes the game much easier to play and fun to look at

To do so, it ...

* Only looks at one "chunk" of the original image (one subrectangle) at a time
* And creates a new canvas for it, the same size as the original image.
* Then draws the chunk to the new canvas. (Making this chunk twice the size, and being able to save it as its own image)
* It waits again until all those images have loaded
* And returns that

It does a 2x2 split by default (into 4 papers, most useful and most common). But any split works.

{{< highlight javascript >}}
async function splitImage(img, params = {})
{
  const cols = params.cols || 2;
  const rows = params.rows || 2; 
  const totalParts = cols * rows;
  const promises = [];

  for(var i = 0; i < totalParts; i++) {
    var x = i % cols;
    var y = Math.floor(i / cols);

    let canv = document.createElement('canvas');
    canv.width = img.naturalWidth;
    canv.height = img.naturalHeight;

    const chunkX = canv.width / cols;
    const chunkY = canv.height / rows;

    // MAGIC HAPPENS HERE => this slices part of the image and draws it onto the canvas
    canv.getContext('2d').drawImage(
      img, 
      x*chunkX, y*chunkY, chunkX, chunkY, 
      0, 0, canv.width, canv.height
    )

    const loadPromise = new Promise((resolve, reject) => 
    {
      const tempImg = new Image();
      tempImg.src = canv.toDataURL();
      tempImg.onload = () => {
        resolve(tempImg);
      }
    })

    promises.push(loadPromise);
  }

  const arr = await Promise.all(promises);
  return arr;
}
{{< /highlight >}}

## Pandaqi Phaser

This is still a bit of a mess. Because I have to balance _writing general code_ with _interfacing with Phaser and doing the specific things it wants_.

It's also not that interesting. It simply creates a new Phaser game (using the default way to do that), then saves references to it (and its configuration). This way, you can turn that game into an image/PDF at any point, simply by passing on that reference to the PQ_CANVAS and PQ_PDF above.

## Pandaqi Settings

This was a huge improvement. It seems like such a simple thing, but it was actually tough to figure out a clean way to do this.

Before starting a (hybrid) game, or generating a board, you need to define your settings. (Player count, expansions, generation seed, whatever.)

The old website had a custom JavaScript block on _every game_ to read those settings and put them in some format.

The new one uses this simple object to automatically _read and convert_ the settings.

How does it work?

* Given any node within a settings block (usually the button you clicked), it bubbles upwards to find its container. With that, we can easily get other metadata or other settings
* Collect all inputs
* Add them to a configuration variable we're building
* Save where we want to store it (in local storage)
* And done

I don't need to mess with IDs. Nor custom JavaScript. Everything is a simple Hugo shortcode on my gamepages and this all works automatically.

{{% remark %}}
Better than before, actually. I used to misspell stuff, or miss a setting entirely, or parse it wrong. Now I know: if this code works on one game, it'll work perfectly on all.
{{% /remark %}}

This is what that code looks like (only slightly simplified for this guide).

{{< highlight javascript >}}
function readFrom(startNode)
{
  const container = this.bubbleUpFrom(startNode);
  if(!container) { return {}; }
  
  const inputs = Array.from(container.getElementsByTagName("input"))
          .concat(Array.from(container.getElementsByTagName("select")));

  let cfg = {};
  for(const input of inputs)
  {
    let val = input.value;
    if(input.type == "checkbox") { val = input.checked; }
    this.addToConfig(cfg, input.id, val);
  }

  cfg.localstorage = container.dataset.localstorage;
  return cfg;
}

// If an id has a second "-", we create a subcategory for it
// "setting-expansions-blabla" will create a key "expansions" first, 
// which is an object that holds a key "blabla"
function addToConfig(cfg, id, val)
{
  id = id.split("-");
  if(id.length == 3) {
    const subcat = id[1];
    const key = id[2];
    if(!(subcat in cfg)) { cfg[subcat] = {}; }
    cfg[subcat][key] = val;
  } else if(id.length == 2) {
    const key = id[1];
    cfg[key] = val;
  }
}

function bubbleUpFrom(node)
{
  let containerClass = "game-settings-container";
  while(node)
  {
    const validContainers = node.getElementsByClassName(containerClass);
    if(validContainers.length > 0) { return validContainers[0]; }
    node = node.parentNode;
  }
  return null;
}	
{{< /highlight >}}

## Other improvements

These tools are accessible anywhere. Which means that, for new games, I usually just have to invoke a few of them and I already have 90% working of what I need.

I used that moment to immediately add _more_ tools I'll surely need. The most interesting ones are,

* **GridMapper**: similar to the PdfBuilder. You can feed it canvases, and it will neatly _place_ them in a grid on a page. This means I can just throw anything at it (like randomly generated cards for a card game). When I ask it to download the PDF, I'll find all of it efficiently and neatly arranged on pages!
* **WrapText**: I stole [this short algorithm](https://codepen.io/peterhry/pen/nbMaYg) to allow wrapping text in the canvas element. My only modification was an extra argument that, if true, _centers_ the text on the Y-axis.
* **ResourceLoader**: can load images (as one image or a spritesheet) and audio, for when I don't need or want the whole Phaser library for something. (It's a heavy file and some things it does simply work against me.)

Surely, over time, more tools will be added. But this new system has allowed me to quickly get new games and prototypes up and running.

I can't state this enough. The biggest enemy of motivation and productivity is having this huge _mess of code_ you need to wade through anytime you want to do something. By removing that, it's suddenly faster and more fun to make stuff again. 

That's my lesson for other developers. Focus on learning how to remove the messiness and the annoyances from all your code---it will improve your life significantly.

## Where are we now?

As I said, this library of tools is "only" 600 lines of code now. All board games (with any digital component) run on it, automatically, without any custom code on the pages themselves.

Additionally, this fixed some bugs in the process

* Resolution is higher; results are sharper
* It is faster and scales properly
* As long as my tools are correct, it will find the settings (and Phaser canvas) correctly
* I actually understand all parts of this process, allowing me to iron out mistakes in thinking

Visitors won't notice a thing, probably. But behind the scenes, this website just became a whole lot better and smoother.

I have a great stack of board game ideas I've been dying to make. This was the thing holding me back. Let's hope you all get to enjoy those ideas in the (near) future :)

{{% remark %}}
Oh, yeah, there was this absolutely infuriating issue with Phaser that printed the text in compeltely the wrong locations on some mobile devices. After checking my own code, again and again, I realized I did nothing wrong. I updated Phaser to the latest version and that issue finally fixed itself!
{{% /remark %}}