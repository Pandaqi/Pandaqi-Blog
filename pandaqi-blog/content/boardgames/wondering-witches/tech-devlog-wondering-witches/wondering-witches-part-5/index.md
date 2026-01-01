---
title: 'Wondering Witches (Part 5)'
thumbnail_media: ../../wondering-witches-header.webp
tags: ['technical devlog']
date: 2020-04-12 13:00:00
multipart: true
---

Welcome to part 5 of my Technical Devlog for the game Wondering Witches!

Haven't read the other entries? Go to the [devlog overview](../).

Generating a "fair" Board
-------------------------

As I said before, this part took me the most time. I will only describe
the code I ended up using, as describing numerous failed attempts
doesn't seem too interesting. But don't let that fool you -- it took me
a long while to get here.

### Splitting the board into sections

First of all, I wanted to give each player their own little part of the
board. Their own garden to tend. If needed, you could cut the board into
pieces so people wouldn't need to huddle around a small piece of paper,
but could mostly focus on what's in front of them.

For this I just used a fixed distribution. With X players, the board is
always split into the same shapes.

(Of course, I *could* have tried to make it dynamic, but what's the
point? It would only add unneeded complexity, whilst players don't
really care about how their pieces of the board are distributed on the
original piece of paper.)

I saved this in the code as an array of rectangles: each shape had a
start point (x,y) and a size (width, height).

{{< highlight javascript >}}
// divide the paper into rectangles based on player count
var paperSectionsLibrary = {
	'players-1': [[0,0,8,4]],
	'players-2': [[0,0,4,4], [4,0,4,4]],
	'players-3': [[0,0,5,2], [0,2,5,2], [5,0,3,4]],
	'default':   [[0,0,4,2], [4,0,4,2], [0,2,4,2], [4,2,4,2]],
	'players-5': [[0,0,3,2], [3,0,3,2], [0,2,3,2], [3,2,3,2], [6,0,2,4]],
}

// grab the right setup if it exists, otherwise go to the default setup (which is used in most cases)
var tempSectionKey = 'players-' + this.playerCount;
this.paperSections = [];
if(typeof(paperSectionsLibrary[tempSectionKey]) == 'undefined') {
	this.paperSections = paperSectionsLibrary['default'];
} else {
	this.paperSections = paperSectionsLibrary[tempSectionKey];
}

// Create array of players + their own sections
var playerArray = [];
this.sections = [];
for(var i = 0; i < this.paperSections.length; i++) {
	playerArray[i] = i;
	var s = this.paperSections[i];

	this.sections[i] = [];
	this.sections[i][0] = { 
		'rect': s,
		'fullRect': new Phaser.Geom.Rectangle(s[0]*this.rectWidth, s[1]*this.rectHeight, s[2]*this.rectWidth, s[3]*this.rectHeight),
		'cauldrons': [],
		'spaceLeft': s[2]*s[3],
	}

	this.sections[i][1] = {
		'rect': [(this.xLines - s[0] - s[2]), s[1], s[2], s[3]],
		'fullRect': new Phaser.Geom.Rectangle((this.xLines - s[0] - s[2])*this.rectWidth, s[1]*this.rectHeight, s[2]*this.rectWidth, s[3]*this.rectHeight),
		'cauldrons': [],
		'spaceLeft': s[2]*s[3],
	}
}
{{< /highlight >}}

<!-- {{< gist Pandaqi 4c3872b2ab0190839722d5d1461a7e91 >}} -->

### Creating a Cauldron distribution

The "naïve" way to distribute cauldrons, would be something like this:

-   Keep a counter of how many cauldron cells have been filled. (For
    example, "cauldronCellsLeft = 32")

-   Start a loop.

-   Each iteration, try to fit a cauldron of random size on the paper.

-   Keep doing this until your counter has surpassed the maximum
    ("cauldronCellsLeft \<= 0")

This was the very first implementation when I just needed something to
test. But what are the problems?

-   No guarantees on cauldron size. (If unlucky, you could end up with
    tons of minuscule cauldrons, or only three *very big ones*.)

-   Unsolvable games. If your recipe needs a cauldron of at least size
    6, there must be at least one of those on the board.

-   Unfair distribution. Some players might get all the cauldrons (and
    no garden), and vice versa for the rest.

How to solve this? Using a technique very common to random generation:
*fixing the distribution up front*.

Before trying to fit cauldrons, I fix a distribution, like this:

-   Create an empty list (an array in this case).

-   I want at least one cauldron of size X and one of size Y (to make
    levels solvable). Add these to the array.

-   Then, repeatedly add a new cauldron to the array of random size,
    until we've reached our *exact* fill percentage.

-   Finally, sort this array from largest to smallest.

The code looks like this:

{{< highlight javascript >}}
// Determine a cauldron distribution
// Requirements:
//  * 32 cauldron cells in total
//  * Each player has at least one cauldron
//  * There must be one cauldron of length "codeLength"
var maxCauldron = [3,2];
if(!this.variableRecipe) { maxCauldron = [2,2]; }

var totalCauldronCells = 32 - maxCauldron[0]*maxCauldron[1];
this.cauldronDistribution = [maxCauldron];
while(totalCauldronCells > 0) {
  var tempSizeX = Math.floor(Math.random()*3)+1;
  var tempSizeY = Math.floor(Math.random()*3)+1;

  // prevent cauldrons greater than our budget allows
  // (scale down to an approximately correct number)
  if(tempSizeX*tempSizeY > totalCauldronCells) {
    tempSizeX = totalCauldronCells;
    tempSizeY = Math.round(totalCauldronCells*0.5);
  }

  // prevent cauldrons of 1 (or less)
  if(tempSizeX*tempSizeY <= 1) {
    tempSizeX = 2;
    tempSizeY = 1;
  }

  // prevent cauldrons greater than 6
  if(tempSizeX*tempSizeY > 6) {
    tempSizeX = 3;
    tempSizeY = 2;
  }

  // subtract from total
  totalCauldronCells -= tempSizeX*tempSizeY;

  // add to distribution
  this.cauldronDistribution.push([tempSizeX, tempSizeY]);
}

// Sort the distribution descending (so we place the largest cauldrons first)
this.cauldronDistribution.sort(function(a, b){ return b[0]*b[1] - a[0]*a[1] });
{{< /highlight >}}

<!-- {{< gist Pandaqi 810c0fcb68bd57347fb17f61e90443a5 >}} -->

When this process is done, we have a list with the *exact* cauldrons we
want to place. If we manage to place all of them, we are *certain* the
distribution is correct. (And if we start at the biggest cauldrons, the
probability we'll be able to place them all increases. Because smaller
cauldrons are easier to fit at the end.)

### Trying to fit cauldrons

Now that we have a distribution, we go back to being naïve again. This
code is inside a loop that runs until all cauldrons have been placed:

-   For each player ...

-   Choose a random side (front/back of the board)

-   Go through the list of cauldrons and find the *largest* cauldron
    that fits.

    -   Rule \#1: Obviously the cauldron cannot be larger than the
        available area.

    -   Rule \#2: If the total area for this player (front and back)
        combined has no space left (after placing the cauldron), do NOT
        place it! Why? Because this would leave a player with only
        cauldrons and NO gardens, which is unfair.

-   Place it.

-   Remember we placed it (discard/disable all cells we occupy and
    subtract from total)

There is a small chance this goes wrong. For whatever reason, everything
doesn't work out, we place gardens and special tiles at annoying
locations, and we *cannot* place all the cauldrons.

In that case ... I simply discard all progress and try again :p
Sometimes solutions are quite simple.

{{< highlight javascript >}}
// go through all extra cells
while(emptySpaces > 0) {
  // find a random place (that still exists)
  var gardenX, gardenY;
  do {
    gardenX = Math.floor(Math.random()*maxSizeX);
    gardenY = Math.floor(Math.random()*maxSizeY);
  } while(!section[gardenX][gardenY]);
  
  // NOTE: section is the 2D array created earlier that is exactly the size of each player's own board

  // start a garden here
  var newGarden = [ [gardenX + x0, gardenY + y0] ];
  section[gardenX][gardenY] = false;

  // now we simply go through neighbours (again and again) until we decide to stop (we're large enough) or we must stop (nothing to explore anymore)
  var cellsToCheck = [ [gardenX, gardenY] ];

  // check the neighbours (in a random order)
  var terminateLoop = false;
  while(!terminateLoop) {
    // grab the first cell on the list
    var c = cellsToCheck.splice(0,1)[0];

    emptySpaces--;

    // check all the neighbours (in a random order)
    var dirs = [[1,0], [0,1], [-1,0], [0,-1]];
    dirs = shuffle(dirs);
    for(var d = 0; d < 4; d++) {
      var tempX = c[0] + dirs[d][0], tempY = c[1] + dirs[d][1];

      // if out of bounds, ignore
      if(tempX < 0 || tempX >= maxSizeX || tempY < 0 || tempY >= maxSizeY) { continue; }

      // if non-existent, ignore
      if(!section[tempX][tempY]) { continue; }

      // now check probability: the larger we get, the less likely we are to grow
      var probCutoff = 1.0 / (0.5*newGarden.length);
      if(Math.random() > probCutoff) { continue; }

      //
      // we will grow!
      //

      // add this cell to the garden
      newGarden.push([tempX + x0, tempY + y0]);

      // and plan a check (for potentially growing further)
      cellsToCheck.push([tempX, tempY]);

      // and remember we lost a space
      section[tempX][tempY] = false;
    }

    // terminate if there's nothing more to check
    terminateLoop = (cellsToCheck.length <= 0);
  }

  // add the final garden to the list
  this.gardens.push(newGarden);
}
{{< /highlight >}}

<!-- {{< gist Pandaqi f2503a395b86adebaaa432c36f42aff1 >}} -->

### Filling with gardens

So, at this moment we have a board filled with cauldrons, exactly 50% of
it in fact.

We need to fill the gaps with gardens. It looks nicer, and is better for
gameplay, if gardens have organic shapes, so we don't want to fill the
gaps completely with one garden every time.

For this, I took another simple "growing" solution:

-   Keep a list of all "empty" cells in a section. (When placing the
    cauldrons, I already update this list.)

-   Choose a random empty cell.

-   Check its neighbours. If any of them is available (not a cauldron,
    not out of bounds), grow the garden to include that cell with
    probability *p*.

-   What's *p*? It's a probability that gets *smaller* as the garden
    grows *larger*. This organically restricts garden size. The specific
    number in the current code is: 2.0/gardenSize. So, a garden of size
    4, has a probability of growing further that's equal to 2.0/4 = 50%

After growing, we have a set of gardens, which is just an array of all
the cells it includes. This is immediately fed into the algorithm
explained earlier, to determine the bounds of the garden and draw the
right lines.

{{< highlight javascript >}}
// go through all extra cells
while(emptySpaces > 0) {
  // find a random place (that still exists)
  var gardenX, gardenY;
  do {
    gardenX = Math.floor(Math.random()*maxSizeX);
    gardenY = Math.floor(Math.random()*maxSizeY);
  } while(!section[gardenX][gardenY]);
  
  // NOTE: section is the 2D array created earlier that is exactly the size of each player's own board

  // start a garden here
  var newGarden = [ [gardenX + x0, gardenY + y0] ];
  section[gardenX][gardenY] = false;

  // now we simply go through neighbours (again and again) until we decide to stop (we're large enough) or we must stop (nothing to explore anymore)
  var cellsToCheck = [ [gardenX, gardenY] ];

  // check the neighbours (in a random order)
  var terminateLoop = false;
  while(!terminateLoop) {
    // grab the first cell on the list
    var c = cellsToCheck.splice(0,1)[0];

    emptySpaces--;

    // check all the neighbours (in a random order)
    var dirs = [[1,0], [0,1], [-1,0], [0,-1]];
    dirs = shuffle(dirs);
    for(var d = 0; d < 4; d++) {
      var tempX = c[0] + dirs[d][0], tempY = c[1] + dirs[d][1];

      // if out of bounds, ignore
      if(tempX < 0 || tempX >= maxSizeX || tempY < 0 || tempY >= maxSizeY) { continue; }

      // if non-existent, ignore
      if(!section[tempX][tempY]) { continue; }

      // now check probability: the larger we get, the less likely we are to grow
      var probCutoff = 1.0 / (0.5*newGarden.length);
      if(Math.random() > probCutoff) { continue; }

      //
      // we will grow!
      //

      // add this cell to the garden
      newGarden.push([tempX + x0, tempY + y0]);

      // and plan a check (for potentially growing further)
      cellsToCheck.push([tempX, tempY]);

      // and remember we lost a space
      section[tempX][tempY] = false;
    }

    // terminate if there's nothing more to check
    terminateLoop = (cellsToCheck.length <= 0);
  }

  // add the final garden to the list
  this.gardens.push(newGarden);
}
{{< /highlight >}}

<!-- {{< gist Pandaqi 59eae029005c735f81854af4fb9972e3 >}} -->

Conclusion
----------

Wow, that was a long technical devlog. I think I actually explained (and
provided code for) literally every part of the whole program.

Hopefully, it was interesting and you learned a lot from it!

If something was unclear, or you want to know more, or this inspired you
for your own projects -- let me know!

I've never seen this kind of hybrid between board and computer games
before, especially not one where you can play using a single sheet of
(blank) paper, so I wanted to share this knowledge and perhaps inspire
others.

It took me quite a while to figure this stuff out, but now that it's
working, I find this concept to be really fun and easy to understand for
everyone.

So that's why I wrote this thorough explanation.

And as always, consider trying out the game at: [Wondering Witches](https://pandaqi.com/wondering-witches)

Until the next devlog,

Pandaqi