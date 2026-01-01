---
title: 'Wondering Witches (Part 3)'
thumbnail_media: ../../wondering-witches-header.webp
tags: ['technical devlog']
date: 2020-04-12 11:00:00
---

Welcome to part 3 of my Technical Devlog for the game Wondering Witches!

Haven't read the other entries? Go to the [devlog overview](../).

The Importance of Feedback
--------------------------

Great, our potion evaluator can check if this is the winning potion and
execute all necessary effects.

### Feedback Level \#1

But one big step is missing: players test a potion to **gather
information**. The website should give them some feedback. This feedback
should be useful and informative, but not *too* useful. That would make
the game too easy or straightforward.

At first, I created a category of **investigative effects** to solve
this problem. It was a list of \~20 effects which simply *reported*
information about the potion.

For example, the **Detective** tells you the secret number of a *random
ingredient* from the potion. Or the **Inspector** tells you how many
ingredients had one (or more) special effects in this potion.

These effects were extremely useful and effective! Whenever they were
used, I would just save phrases like "Detective says 4", and print that
to the screen (in a random order).

{{< highlight javascript >}}
// This is a subsection of that whole switch statement in checkEffect()

//
// INVESTIGATIVE
//
case 'Liar':
  // make list of all numbers
  var allNumbers = [];
  for(var i = 0; i < codeLength; i++) {
    allNumbers[i] = i;
  }

  // go through cauldron and REMOVE numbers that are present
  for(var i = 0; i < cSize; i++) {
    var findElem = allNumbers.indexOf(curCauldron[i].myNum);
    if(findElem > -1) {
      allNumbers.splice(findElem, 1);
    }
  }

  // now pick one randomly
  singular = false;
  if(allNumbers.length > 0) {
    var randNum = allNumbers[Math.floor(Math.random()*allNumbers.length)];
    feedbackValue = 'number ' + randNum;
  } else {
    feedbackValue = 'nothing to say';
  }
  break;

case 'Detective':
  var randNum = curCauldron[Math.floor(Math.random() * cSize)].myNum;

  singular = false;
  feedbackValue = 'number ' + randNum;
  break;

case 'General':
  var totalNumEffects = 0;
  for(var i = 0; i < cSize; i++) {
    totalNumEffects += curCauldron[i].effects.length;
  }

  singular = false;
  feedbackValue = totalNumEffects;
  break;

case 'Inspector':
  var numWithEffects = 0;
  for(var i = 0; i < cSize; i++) {
    if(curCauldron[i].effects.length > 0) {
      numWithEffects++;
    }
  }

  singular = false;
  feedbackValue = numWithEffects;
  break;

case 'Calculator':
  var sum = 0;
  for(var i = 0; i < cSize; i++) {
    if(curCauldron[i].myNum == -1) { continue; }
    sum += curCauldron[i].myNum;
  }

  singular = false;
  feedbackValue = sum;
  break;

case 'Revealer':
  var numDecoys = 0;
  for(var i = 0; i < cSize; i++) {
    if(curCauldron[i].decoyStatus != -1) {
      numDecoys++;
    }
  }

  singular = false;
  feedbackValue = numDecoys;
  break;
{{< /highlight >}}

<!-- {{< gist Pandaqi ea0ecb60b8eb4c56148d0e755e06e46c >}} -->

### Feedback Level \#2

But it was not enough. When it comes to puzzle games, it's never good to
actively *withhold* 90% of the information from the player. That just
makes it an impossible problem, not a fun puzzle.

So I decided to give feedback about *any effect*. If an effect was not
investigative, it would simply say something like "Effect X was
encountered" or "Effect X was present". Knowing that an effect was
present, is very valuable information (and easy to code). Not knowing
precisely what the effect did, made it into a challenging puzzle.

### Feedback Level \#3

But there was **another level** of feedback I was forgetting. What if
players didn't figure out the solution? What if players lost the game?
Surely, they would want to know the actual solution.

So I added a button that, when clicked, printed the solution to the
screen. (Each ingredient, plus their number, plus any effects.) In
hindsight, it was absolutely stupid to forget the inclusion of this
button. I'm happy I remembered to do so.

Of course, I was worried about people accidentally clicking it. Or being
too tempted to click it. So I made it smaller, moved it away from the
interface, colored it red, and clearly marked it as a danger zone. It's
worked perfectly so far.

### Feedback Level \#3

But wait, is that ... **another level of feedback** I am forgetting?
Sure it is!

This realization only came to me after numerous playtests. (Which tells
us, again, that playtesting your game is always the way to go.)

At the start of the game, players were just ... really unsure about what
to do. They had absolutely *zero* information, so what does it matter
which ingredients we grow? What does it matter which potion we try?

I changed this to give the players a flying start. When you generate a
puzzle, it gives you one clue "for free". It might say something like
"Free Advice: Parsley is NOT number 1" or "Bonus Tip: Either Parsley,
Sage or Thyme is a DECOY"

This gets you started! You already know some ingredients you want to
test (or avoid). Additionally, it makes the game a little easier. As it
stands, the game is quite hard, so by framing this information as a
"free clue", I can sneakily balance the game a bit more.

{{< highlight javascript >}}
function generateFirstHint(type) {
	var txt = '<p>Here\'s a <strong>free clue</strong> to start the game!</p><p>';
	switch(type) {
		// reports a group of three elements
		// and either says "one of these is a decoy"
		// or "one of these has number X" (and thus is a good ingredient)
		case 'Group':
			var copyPuzzle = JSON.parse(JSON.stringify(curPuzzle));
			copyPuzzle = shuffle(copyPuzzle).splice(0,3);

			if(copyPuzzle[0].decoyStatus >= 0) {
				txt += 'One of these ingredients is a DECOY: ';
			} else {
				txt += 'One of these ingredients has number ' + copyPuzzle[0].myNum + ': ';
			}

			copyPuzzle = shuffle(copyPuzzle);
			txt += copyPuzzle[0].myName + ', ' + copyPuzzle[1].myName + ' or ' + copyPuzzle[2].myName;
			break;

		// picks one ingredient and states which number it is NOT
		case 'Negative':
			// pick a random ingredient
			var randNum = Math.floor(Math.random() * curPuzzle.length);
			var randIng = curPuzzle[randNum];
			txt += ingredientNames[randNum] + ' is NOT ';

			// if it's a non-imposter decoy, return any valid number
			// otherwise, report a lower number with 50% chance, or a higher number with 50% chance
			var realNum = randIng.myNum;
			if(realNum == -1 || realNum == 0 || realNum == (codeLength+1)) {
				txt += Math.floor(Math.random()*codeLength) + 1;
			} else {
				if(Math.random() <= 0.5) {
					txt += Math.floor(Math.random()*realNum);
				} else {
					txt += Math.floor(math.random()*(codeLength-realNum+1))+realNum+1;
				}
			}

			break;

		// pick one ingredient and state whether it has effects or not
		case 'Effects':
			var randIng = curPuzzle[Math.floor(Math.random() * curPuzzle.length)];
			txt += randIng.myName;

			// if effects aren't even enabled, ??
			if(effectsLevel == 0) {
				if(randIng.myNum <= 0) {
					txt += ' is a decoy';
				} else if(randIng.myNum <= Math.floor(0.5*codeLength)) {
					txt += ' should be in the first half of the potion';
				} else {
					txt += ' should be in the last half of the potion';
				}
				
			
			// if effects are enabled, return info here
			} else {
				txt += ' has ' + randIng.effects.length + ' effects ';
			}

			break;
	}

	txt += '</p>';
	return txt;
}
{{< /highlight >}}

<!-- {{< gist Pandaqi b095019eb83253a56246e0bc2e4815ca >}} -->

*Remark:* additionally, I changed something about board generation to
fix this problem. I'll talk about it more later, but here's the general
idea. At first, when I generated a starting setup, I placed random
ingredients in *gardens*. Now I changed that so it also places some
ingredients within *cauldrons*. Why? Because this means you can already
test a potion within one or two turns, giving the game a quicker start.

**What's the conclusion?** When it comes to games, the mantra is
"feedback, feedback, feedback" Both boardgames and video games.