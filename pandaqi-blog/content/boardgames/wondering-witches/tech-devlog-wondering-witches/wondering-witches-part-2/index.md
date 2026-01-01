---
title: 'Wondering Witches (Part 2)'
thumbnail_media: ../../wondering-witches-header.webp
tags: ['technical devlog']
date: 2020-04-12 10:00:00
---

Welcome to part 2 of my Technical Devlog for the game Wondering Witches!

Haven't read the other entries? Go to the [devlog overview](../).

Generating Random Puzzles
-------------------------

Now comes the hard part.

Generating a *completely random* puzzle is easy enough. Just create a
list of all the numbers 1-N, then hand them out to random ingredients.
The ingredients that do not receive a number are fake/decoys.

Then do the same for any special effects, and you're done! Ta da! A
random recipe!

### Checking "solvability"

However ... there's a chance such a recipe becomes unsolvable.

-   Any recipe of more than 6 ingredients is too long. (It's way too
    hard and there's not enough space on the board.)

-   Some effects may change the numbers or order in the potion, which
    *may* cause the puzzle to be unsolvable.

How do we solve this conundrum?

The "easy" solution would be to simply *not include* those nasty
effects. Keep the code under 6 ingredients, only use very basic effects,
and we're done.

But that's boring. So, two solutions remain.

One is where you check recipe solvability on an individual level. For
example, after every effect/number you hand out, check if you need to do
*something* to keep the puzzle solvable. (For example: "hey, I just
added a Spicy effect, which means we need to lower the number of the
ingredient supposed to come after it")

As you might expect, this is really hard. It requires custom code for
many effects and other operations.

The second solution is far better: simply check *all possible
solutions*. One of them is correct? Yes, this puzzle is solvable. None
of them work? Throw it out and try a different puzzle.

To do this, we only need a big loop (going over all possibilities) and
the potion evaluation function (which I described in detail in the
previous section).

*Remark:* in the end, I used a recursive function for this, simply
because I felt like that was the easiest way. It checks if the current
combination is at the correct length. If not, it adds a number, then
calls itself again.

### Heuristics for the win!

If you've worked with these kinds of simulations before, you already
know what's coming: **but ... that's 10\^6 possibilities! Too much! It's
too much!**

Unfortunately, JavaScript is not able to *create and evaluate* a million
complex potions within a reasonable amount of time. You don't even want
to try that.

Fortunately, we can use **heuristics**. We can ask ourselves: what are
general characteristics of a good solution? What are some smart rules
the solution *must* follow?

**Heuristic \#1:** Some ingredients or effects cause the computer to
"ignore" them. They do not count towards the result, so we can also
ignore these during simulation.

**Heuristic \#2:** A solution needs ingredients to be in sequence. Thus,
if the last ingredient had number 2, for example, we only need to check
ingredients with number 1-3 (or no fixed number).

The second heuristic brings down the search space significantly. It also
comes at a cost: a solution *could* be possible where the sequence isn't
so strictly followed. For example, when an effect lowers the value of an
ingredient by *a lot*, the ingredients with value 2 and 5 could be right
next to each other. We would miss those solutions now.

But that's only a tiny fraction of the possible puzzles. Using the
heuristics above, the simulation takes (on average) about 500-1000
evaluations before it knows whether a puzzle is solvable. This happens
so fast, you probably don't even have to wait.

{{< highlight javascript >}}
// THE BIG LOOP! Create puzzle, then check if it is solvable, rinse and repeat until done
// (this is called at the start of the game)
puzzleIsValid = false;
do {
  createPuzzle(); // => discussed in the previous section of the article
  checkPuzzle(); // => will discuss now
} while(!puzzleIsValid);


function checkPuzzle() {
	// Call the recursive function, starting with an empty cauldron/empty combination
	// (It will automatically check everything and return true/false accordingly)
	var result = checkCombinationRecursive([]);

	// permanently set whether the puzzle has a solution or not
	puzzleIsValid = result;
}

// This is a recursive function that steps through ingredients, checking all possible combinations
// For each combination, it calls usePotion (or a faster variant of it) and checks the result
// If the potion was correct, exit the search and return true! Otherwise, it returns false.
function checkCombinationRecursive(comb) {
	// if we're at max code length, test the potion
	if(comb.length >= codeLength) {
		return usePotion(comb);
	}

	// otherwise, check all next ingredients
	// start with the last value (so we can reduce the number of combinations to check)
	var lastVal = -100;
	if(comb.length > 0) {
		lastVal = curPuzzle[ comb[comb.length - 1] ].myNum;
	}
	
	for(var i = 0; i < curPuzzle.length; i++) {
		// ignore elements that are too far apart to be in consecutive order
		// do NOT ignore "ignore" decoys if they have (at least) one effect
		if(lastVal != -100 && Math.abs(lastVal - curPuzzle[i].myNum) > 1 && !(curPuzzle[i].myNum == -1 && curPuzzle[i].effects.length > 0)) {
			continue;
		}

    // otherwise, the combination [lastVal, curPuzzle[i].myNum] COULD be a valid one, so ...
		// append new value to combination
		var newComb = JSON.parse(JSON.stringify(comb));
		newComb.push(i);

		// check the combination and report the result
		var result = checkCombinationRecursive(newComb);
		if(result) { 
			return true; 
		}
	}

	return false;
}
{{< /highlight >}}

<!-- {{< gist Pandaqi 1314a11a9083147c8dc73366a892dec7 >}} -->

So, we now have random puzzles, which we know are solvable. We also have
a way to *test* any potion you put into it.

What's next on the list? An **interface** for testing and giving the
correct **feedback** to the players. (So, you know, they can actually
figure out the puzzle without playing for hours.)
