---
title: "Why everyone should use static typing"
date: 2024-09-09
emoji: "💬"
---

So you want to learn programming or pick a programming language for your next project. But there are so many options! Do not fret, dear reader, for I will give you my thoughts in this article.

Of course, the way you program and the language you use will always depend on the specific requirements of the problem you're trying to solve. Don't use an electric drill when you actually needed a simple hammer, and vice versa. I can't possibly list all problems and the solutions I'd pick, and I don't think that would be a helpful article in any case.

Instead, after 15+ years of coding in many different languages/styles and for many different purposes, I've realized the most important decision. The one you need to get right and everything else doesn't matter as much.

That decision is between a **dynamically typed language** or a **statically typed language**.

And the conclusion of this article, for those who don't want to understand the reasoning behind this, is that **for 99% of use cases, go with statically typed and be glad you did**.

## What is that?
At its core, programming means working with data such as numbers and text. In other words, it means working with different **types** of data.

In a **dynamically typed** language, you are not _required_ to state the **type** of every bit of information in your code, nor do these types have to be "correct". 

For example, in JavaScript I can simply type `var a = 5`, without explicitly telling the program that `a` should be a `number`. Similarly, I can write `a = "HELLO!"` on the next line, and it won't complain. Even though we suddenly stored text inside what was previously a number.

In a sense, bugs, errors and crashes appear during _runtime_ (as the program runs).

In a **statically typed** language, as expected, you _are_ required to give everything a proper type and the compiler will constantly check if types are correct.

For example, in Java you declare an integer variable with `int a = 5`. If I wanted text instead, I should have coded `String a = "HELLO!"`. Once the type is declared, I _can't_ store the wrong thing inside of it. Once I've written `int a = 5` I can never store anything in `a` that is not an integer later.

In such languages, potential bugs or logic errors are caught at _compile time_ (before the program is ever started).

Some people use the terms _weakly typed_ and _strongly typed_ interchangeably with this. That is incorrect, if you ask me. Those terms mean the following instead.

* Weakly Typed = the types used in the language give you no guarantees. They are not checked, they can be cast to other types, there are loopholes to circumvent any mismatches.
* Strongly Typed = the types used in the language are complete and strict.

It is **impossible** for a programming language to be _not typed at all_. Even if you made a loosey-goosey language where every bit of data is stored and handled in exactly the same way ... then your programming language still has a type system, namely _that single type it uses for everything_.

This will become important when it comes to my arguments for static typing.

## Advantages of dynamic typing
When you research this online, you are met with lots of wild unproven claims. Some people even seem to _hate_ one type (dynamical or static) with a passion and will invent any nonsense to make others join their little purist tribe.

For example, they will claim that "dynamic languages obviously make you far more productive". Obviously? Based on what? All my own data shows I am _far more productive_ when using statically typed languages, and many other programmers report the same thing. So what is this based on?

When I look past that, and look at my own experience, there are only two clear advantages to dynamic typing.

### 1. First impressions matter
**It looks less intimidating.** This is important for beginners, of course. And it's important for people in general, because humans _will_ make sweeping assumptions about anything at first glance and stick to that. If the first piece of code somebody sees is an extremely verbose, statically typed Java program ... yeah, that will scare them away from programming for life.

For a beginning programmer, they just want to see a cube on the screen, or Mario move left and right when pressing a button. A dynamic language gets you there while looking less intimidating.

When you're just getting started, you are not making any large, complex or long-term programs. A large class of benefits that static typing provides are just _not relevant for you_, so keeping it simpler and less intimidating with a dynamic language can be smart.

Java is probably to blame for the "bad rep" that static languages get from many. For a long time, it was basically the only one of its kind and the one people would learn. Even my university, in 2014, taught Java as its first programming language! But I, like many, hate Java with a passion too. Because it's clunky, has lots of boilerplate, has no clear philosophy behind its types, etcetera.

Yes, writing a "simple piece of code" in Java turns into a 1,000 line program with lots of boilerplate and useless casting to stop the compiler from complaining.

Nowadays, the most popular statically typed languages are far friendlier and just ... better. The point of this article is not to say "static > dynamic always". The actual quality and benefits of the specific language obviously matter.

### 2. Hacking things together
**You can prototype more quickly or more easily get something working in a cowboy way.**

Because you're not forced to declare types, you _can_ write a program more quickly and with fewer words. You _can_ apply questionable coding practices and make it work anyway, because it's flexible and dynamic. You can use some trickery just to "get my game mechanic working for now", and worry about all possible flaws and messy code later.

There is true value to this! Most game developers don't prototype their games (nearly enough), but jump into full-on making the idea almost immediately. They start applying all these "principles", trying to write clean abstract systems immediately, and find that they worked for months to create beautiful code ... that needs a complete rewrite because the game wasn't fun in the first place.

It still happens, sometimes, that I want to hammer out a quick game idea on a Sunday evening, but I get stuck for 30 minutes fighting a type system about something silly. Time I probably wouldn't have lost if I'd chosen a dynamic language and just did whatever worked for now.

## Advantages of static typing
I think this large divide between dynamically typed and statically typed stems, partially, from the almost philosophical idea behind static typing. This makes it seem like a big idea and a super important topic that becomes part of your identity. Almost a religion or truth of the universe :p

Bear with me here.

The first two advantages are more "grandiose" in nature, then we get to smaller practical reasons.

### 1. All code is data transformations
Every single programming problem is just _data transformations_. (In fact, every single _solution_ to any possible problem is just a data transformation.)

* You have **input**. (Certain data available to you, such as a user's name and password.)
* Your code **does something with the input.** (Such as checking them against your database of users.)
* And then it gives **output**. (Such as a message that says "success, this user is now logged in")

Data goes in, you transform it, the new data goes out. This describes _all_ coding problems.

So the absolute best help you can get while coding, is to clearly define the type of every piece of data. By defining your exact input and output, you get a map for how to transform it in the right way.

Okay, so our input is a `number` and our output should be a `boolean`? Then we know we'll have to, at some point, convert numbers into booleans. This narrows down our tasks and choices and makes it easier to figure out the logic. (And easy to find any bugs or logical oversights when we _don't_ have a step that transforms to the correct type.)

If you don't know what your data is, for sure, how can you ever transform it easily and reliably? If you have no guarantees that what enters your function has the specific properties and functions you are going to manipulate with your code, you simply haven't written code that does what it's supposed to do.

In a statically typed language, you'd simply create a `User` type (for example), plug a variable of that type into the function, and you can rest assured everything is available.

What would you typically do in a dynamic language? You'd add **safeguards**. 

At the top of functions, you might check "is the variable not `null`?" or "does the argument we received even _have_ a function called `sanitizeInput`?"

In the Godot Engine (that I've used for many games), people write checks like `some_object is Player` all over the place to make sure the node they received is of the Player class.

In other words ... in a dynamic language, if you want any certainty about your code actually doing what it's supposed to do, you'll have to _mimic a statically typed language yourself_.

**Any sufficiently large project in a dynamically typed language will end up manually emulating types anyway.**

Why do all this manual and risky work (with the extra checks, safeguards, etcetera), when you can literally let it be done for you, faster and for free?

I'll expand on this in the next section too.

### 2. It's how the world actually works
**Reality is typed.** Things are what they are. Values are measured using specific _units_, and you can only combine measurements made in the same units.

If you want two boxes, you're going to have to add Box1 to Box2. Trying to add together two different types will obviously be incompatible with what you want. Having a language that _allows_ you to add a Box and a Window instead is completely useless, because that is not what you want or need for the algorithm to work. Why ask for wiggle room that does nothing but allow _wrong_ and _nonsense_ results?

Our first and most critical step in communicating ideas and identifying the world around is, is to _apply types_. We label things of the same type with the same name/noun. We call a window a window, a box a box, a bike a bike. And by labelling it, we know whether a communicated idea makes sense or not, whether it's correct or not. If somebody says "I rode my window to school this morning", we know they must have misspoken, because the type Window has no functionality for driving :p

Similarly, we agreed on units for measurements and that you need to use the same units, otherwise the results are nonsense.

Every action, idea or solution in the real world starts by identifying the types we're working with. The types we need and the type we want to get out of it. And so the most natural approach to solving real-world problems _using code_, to me, is to be strict about giving everything the right types.

**Being forced to give everything its proper type is not a side-effect or nasty rule made up by nerds, it's how your brain actually defines and lays out the steps to solve the problem.**

It's the other way around. By thinking about the types of all your data first, you inherently solve your problems and move to a solution. When coding, you have to think about "what am I doing here? What logical step am I taking here?" anyway, so why not make it explicit in the code instead of doing it in your head?

For example, say I want to detect if two entities in my game overlap. (If player overlaps coin->grab it.) Formulating it like this can be overwhelming. It's vague, where do we start, what elements do we need?

Then we start thinking about types.

* Okay, our Player is type GameObject.
* Our Coin is type GameObject.
* This type has numeric values for `x` and `y`. (Because our system is statically typed, this is a guarantee. We either defined this ourselves or can automatically look it up in the docs for this engine/language.)
* This type also has numeric values for `width` and `height`.
* So we write a function `overlaps` that has ...
	* Two GameObjects as **input**
	* Adds and compares those coordinates and sizes to see if they overlap. (Standard AABB overlap test, not relevant for this example.) We can do that, because we _have them_ and they are _numbers_.
	* And should give a boolean `true` (if they overlap) or `false` as **output**

By defining the types for every step of the way, we've inherently defined the exact way or steps to solve the problem. It's just about plugging in the right values and writing it out.

These days, I can easily code for 5 hours straight without ever testing the program, or even having a to-do list and planning what has to happen next. Because the code is strongly typed, my code editor automatically tells me what I need to do ... and once it stops complaining, I am done.

For example: Ah, it gives me a squiggly red line here. Why? It says I'm adding a number and a boolean, can't do that. So that means this function returns the wrong type, and sure, I forgot that final line there---done, now it is guaranteed to work.

For example: I need to return several values from this function. Let's create a struct/interface for that and give it a sensible name. (And just thinking about a good name for it _also_ helps define the problem and what I'm actually doing.) Ah, now every other part of the program that relied on the result of this function automatically throws up errors, because the return type has changed. It's easy to fix those errors too, because I am _certain_ the newly returned object has property X and Y inside. Once the red squiggly lines stop, it is guaranteed to work again.

Usually, I can run the code once, see that it works as intended, and be done. That was _certainly_ not the case when I still mostly programmed with dynamic languages.

### 3. You eliminate the most common type of bug
I have no definitive proof or data on this. But I'm very certain that during all my years of programming, the most common bug was _mismatched types_. Either in the end result (a typo, a misunderstanding of a language's feature, etcetera) or in the logic behind the algorithm in the first place (a wrong assumption I made in my mind, an illogical leap between two types, etcetera).

For example, I've made some games in the Godot Engine. Its main language is GDScript, which is dynamically typed. The number of bugs I ran into because I had _no clue_ a certain value was a number as a string (so, `"1"` instead of just `1`) is stupid. I only learned this after researching several mind-breaking bugs for hours, discovering some oddities about the language or how the engine handles certain things.

If it were statically typed, bugs like these would've been caught the moment I typed the original code. It would have said "you're trying to use a string for something that requires a number!" and I would've fixed it in 5 seconds.

The same thing for integers becoming floating point numbers, because of floating point imprecision. So I was suddenly indexing an array with `1.00000003` or something. A problem about which I have no guarantees _because there are no types_!

Using a statically typed language completely eliminates this entire class of bugs. If the compiler is happy, and you didn't expressly work hard to circumvent its checks, you can rest assured no bug related to types appears.

If you ask me, this is more than worth the trade-off of having to make the compiler happy with correct types. It means code is more robust and less prone to crashes, it means the code is easier to update and maintain going into the future.

### 4. In many cases, both development and code are faster
As stated, thinking about types from start to finish actually _helps_ think through problems and know how to solve them step by step.

It also helps explain the code to anyone else, most notably colleagues or collaborators on the same codebase of course. 

If a line of code adds two values together in a dynamically typed language, you'd have to hunt through the code to figure out what those values are and thus what the result of that operation would be. Even worse, because it's dynamically typed, the original value put into those variables might not be its value _at the moment the line of code is executed_ at all. Good luck finding the one line that suddenly changes this variable to a string in the entire codebase, changing your entire perception of that other piece of code.

If types are added, it literally explains the types that are combined and what should come out of it, right there. Most of the time "coding" is actually spent reading back old code, to see how that part worked and what might need changing/fixing. Types make it far easier to do this quickly and with certainty.

Once the program gets sufficiently large---and most do, faster than you expected or wanted---types are a blessing. They make it _easier_ to understand, update and change the program. 

If a function returns type X, and all other parts of your code expect that, it is trivial to add another property to that type which is used for just one exceptional case. All types still match, everything still works, nice.

If you don't have that, you now have to hunt through the codebase to find all locations where this changed function is used, and then check if it needs fixing and how.

_But but but, you also need to type more and fight the compiler more, right?_ Not really.

* The difference between something like `var a = 5` and `int a = 5` is obviously non-existent.
* Yes, some typed languages have a longer syntax like `var a:number = 5`, but ...
* Those languages usually also support _inferring_ types. This means it is optional to add them, and if you don't, it will be smart and recognize the type of the first thing you put in. You can just write `var a = 5` then, and if you ever try using that variable as something that's not a number, the compiler will still complain and save you from a bug.
* The number of times that I am frustrated because I have to invent a type for something or fight the compiler ... is nearly zero. 
	* When I need to invent and designate types, as stated, it's an opportunity to define and understand my problem better, and I know it will help me big time in the long run.
	* Fighting the compiler only happens when I'm using a feature of a language I never used before, thus not understanding its exact syntax or usage. After some trial and error, I actually learn something new and the problem goes away forever. 

In other words: in my experience, statically typed languages do _not_ mean any excessive typing or fighting obscure rules the language requires you obey.

Finally, in most cases your final code also runs much faster.

In GDScript (from Godot Engine, as mentioned before), for example, it is optional to add types. Either manual (`var a:number = 5`) or inferred (`var a:= 5`). But if you do, you can sometimes get 10--100x speedup on the exact same code.

Why? Two reasons.
* We don't need those safeguards! Because you guaranteed GDScript (in this case) that it is working with numbers, it does not need to check this at runtime to prevent crashes or cast type A to type B.
* Certain low-level optimizations become possible. Most of the time, code looks very similar to each other, and those "most common" approaches are usually optimized by languages _if they can recognize you're doing that_. And they can only recognize that if you give them guarantees about the types and how you transform them.

Similarly, even without such benefits, code still ends up being faster. Because you've gotten rid of those manual safeguards you would have added yourself. Because the types allowed you to see more efficient approaches for solving issues.

TypeScript, for example, does _not_ provide inherent speed benefits. It's just a layer on top of JavaScript to give the benefits of static typing, but in the end it compiles to JavaScript, which is still a dynamic language. Even so, I've found my code to end up far cleaner and more efficient _because_ I am forced to really think about my types and make sure they match.

_When is this not faster?_ For really small programs or really odd use cases (that can't be optimized anyway and do fight the type system).

### 5. Mismatched types is never the solution to your problem
The final "argument" by proponents of dynamic languages is the freedom it gives you. That it _allows_ you to mix and match types, allows you to cast one thing to another at will, and that this can be exactly what you need to solve a problem quickly.

Well, yes, it does.

**In practice, however, using the wrong types is never the actual functionality your code needed and the actual solution to the problem you tried to solve.**

In the best-case scenario, you might have a "trick" to use this freedom to your advantage and make something work. Good for you.

In some scenarios, your program simply does nothing. Not great, also not terrible.

In most scenarios, your program simply _crashes_ or does _the wrong thing_ because the types you used are wrong.

Coding is a very strict practice. The computer does exactly what you tell it to do. An algorithm will _only_ work if its exact steps, every single one of them, to the final detail, is _exactly what was needed_. 

It is extremely rare, if not practically impossible, to need a piece of code where there can be a mismatch of types or "any type is fine" and it _still works as intended_.

If your code is supposed to combine the prices of all the products (to get the final price in your e-shop basket or whatever), then the inputs must be _numbers_ and anything else will be plain _wrong_.

If your code is supposed to return all bodies that the Player hits, to deal them damage, returning anything else than a list of Body type objects is _plain wrong_.

So dynamic languages give you freedom, but what is the (practical) point of that freedom? To make it easier to write code that does the wrong thing? To make it more likely that something breaks?

## Why I like TypeScript (despite its flaws)
Let's summarize what we've seen so far.

Statically typed languages ...
* Usually do not take way more words or effort to write.
* Help you define and reason about the problem in the first place, making it easier to do the actual coding and problem solving.
* Match with how the real world works and how our brain inherently thinks about problems. (All code is just data transformations, and all data must have a type, so having them all explicitly typed is the best help you can get.)
* Make you more productive while programming (on any longer-term project) and make the final code run faster too.
* Give you _guarantees_ about your code, eliminating an entire class of bugs and making logic errors or crashes unlikely. This is nice in general, but especially if you have any intention of your code being long-lived and not requiring constant maintenance. 
	* (Too many programmers pretend that technical debt doesn't exist and that anything they make will only be relevant for a month. This is the wrong mindset, if you ask me, exacerbated by using a dynamic language that does not _allow_ any effortless future work on a project that gets reasonably big.)

Dynamically typed languages ...
* Are better for very small projects or when you're doing something very odd/experimental/hacky. In that case, they _do_ mean less code to write and less effort to make it clean or make the computer happy.
* Look less intimidating to beginning coders, which also allows them to be used in very fast and obstacle-free online code courses for example.

Unless you make something tiny, such as a quick prototype or "just get the idea out of my head for now", statically typed languages simply provide way more benefits with almost no downsides. I wish I'd used them more since the start, because some old projects of mine are now basically "lost" (because the code is such a mess and so hard to update), while others were a _pain_ to update and bring to my latest game studio website.

And the entire reason I'm writing this article, is because of the umpteenth debate I encountered about using TypeScript or not. Many people are against it, stating it "overcomplicates things" or is "premature optimization" or whatever. And that is just a load of nonsense.

In my eyes, TypeScript is the perfect blend between dynamic and static. Ever since I used it for the first time, just to "check it out", I've loved using it and coded far more efficiently and cleanly as a result.

* You don't _have_ to declare types. It's optional, which still allows me to be more hacky and quick on tiny experiments.
* But it automatically _infers_ types anyway, catching errors and telling me incomplete parts of the program _even if I never declare types myself_.
* And the way you create your own types or declare more advanced inputs (such as multiple possible types) is very fast and intuitive, which made me use it more and more and more over time. 
	* In other words, it is _not_ faster to just tack on another property to any old object, than to simply define that object with an interface and add one more property to _that_. 
	* Once a statically typed approaches doesn't need more work or thought than the dynamically typed approach, why _not_ pick the static typing with all its automatic benefits?

That other language I mentioned, GDScript, is similar and probably why Godot is the game engine I ended up using the most. Adding types is optional, as it can infer types, so you can still be as dynamic as you like. But if you add it, you get much more certainty _and_ a speed boost. (Though as of this moment, it lacks some features like structs/interfaces, which I really hope arrive soon because they are a godsend.)

I think this _blend_ between the two is the ideal one for most programmers. Both an ideal _entry point_ for the newbies and an ideal _long-term language_ for the veterans. 

{{% remark %}}
I've probably only been using 10% of TypeScript features anyway, only recently starting to implement generic types instead of `any` in certain places :p But that's the point. You CHOOSE how strongly typed you want to be. The more comfortable you become, the more experience you get, the more you start using it for all its benefits.
{{% /remark %}}

## Practical anecdotes
### Converting old projects
The second reason I write this article is simply because the past few years showed me how much time I wasted with dynamic languages.

When I started programming (as a young boy), I coded some apps and websites but mostly games. And I did so in dynamic languages: JavaScript, GDScript (before it had type inferrence and stuff), Lua, a bit of Python.

As my game studio website grew and I progressed as a designer/programmer, I was left with a large pile of old projects. Projects that still worked in their current state, and that I wanted to keep around because they were good enough, but ... I'd have to update some things or make it compatible with my current website/libraries/standards.

And boy, that updating process was an endless _hell_.

Without types and compiler checks to rely on, I had to study the old code for _hours_ just to ...

* Find out what I was even doing somewhere.
* Find all the places where certain types were expected or functions were used.
* Remove the endless safeguards, checks, comments and notes with little gotchas about how some line of code could fail if I didn't do X or Y.
* Painstakingly update all that and run into a gazillion bugs anyway because of some lines I forgot to update or some exceptions that my previous code created that only jumped out now that types were defined.
* Hope and pray.

I still remember how much time was wasted on fixing tiny silly bugs all the time. In fact, it might be a slight trauma, all those hours sitting behind my screen to work through a mess of code and finally realize I was simply accidentally sending the wrong type to the wrong thing. All those hours scanning the code, logging what a variable was, adding safeguards against crashes that popped up, which could have been prevented 100%.

### Converting the old One Paper Games
This was even true for more recent projects, which had good naming, good coding conventions, clear structure and hierarchy. Even then, the lack of defined types meant lots of previously missed bugs and regular uncertainty about what code did _exactly_.

Many old projects ... were just impossible to recover. I'd have to do a complete rewrite and that wasn't worth it, which is a shame.

For example, I did this for my first One Paper Games on the Pandaqi website. They were originally written in JavaScript, when I just started university and wasn't the best coder yet. By simply renaming the files to `.ts` (a TypeScript file), it immediately threw up red squiggly lines and showed me a handful of _mistakes_. Just plain logic mistakes that I never caught when I worked on the actual project, because it did not crash the program (merely made it function less as intended) and I wasn't strict enough about my types!

Then, in defining the types and interfaces and everything for those old projects, I was able to rewrite some chunks to be far more efficient and easy to read. It took me 30 minutes to understand those pieces of code the first time; after the rewrite, they were half as long and I think anyone would understand their purpose at first glance.

I didn't update everything. There were just too many old projects, and they were too big. And that's why I called TypeScript a really nice language, because I didn't _have to_. I could add types where I needed them for clarity or guarantees, but left other (simpler or less important) pieces of code alone---the same old JavaScript as it was before.

I don't want to make projects that are fine for a year and then get lost. I want to make things that can easily be maintained for a long time. And even if I die or stop working on it, others can easily take up the project and extend it however they want. Because the code explains itself and is easy to maintain, and you get all that automatically by having _good strictly defined types_.

### Dreading old projects
Finally, I have two big ("professional") games made in Godot ... that are 95% finished, and I know I just have to completely finish and publish them some day, but I still haven't done it. Because I dread it! They were coded in a dynamic way, before I experienced the benefits of static typing, and just reading back the first pieces of code that need fixing makes me feel overwhelmed and confused. 

When I do finally complete them (perhaps in the far future), the very first step of that process would just be to _give everything clearly defined types_ (where possible/reasonable). I just _know_ doing that initial step will save me endless pain, suffering and wasted time later down the line.

This would be less of a problem if the games were tiny prototypes or quick experiments. But anything that grows beyond a few thousand lines of code, if you ask me, is asking for trouble if it's dynamically coded. Maybe not now, which is why it might feel "fine" or "doable", but certainly in the long-term.

### Day-to-day coding practices
In situations like these, I think it's wise to just **look at the practical use-cases**. In other words: **look at what people are actually doing**. All these arguments, these supposed advantages and disadvantages of certain approaches to a problem, are somewhat meaningless compared to your actual coding work from day to day. Look at what people actually need, what they run into when coding in a certain language, what would make their code more robust or their life easier _in practice_.

Sure, prototyping is nice in a dynamic language, but how many of those games actually shipped a full product? How many of the biggest apps and websites today use static typing, or switched to it some time ago when they grew too large? How many people end up writing extra _tools_ and _workflows_ to combat the uncertainty of a dynamic language?

{{% example %}}
Another argument for dynamic languages is to say "well we can have certainty / guarantees about our code by writing unit tests!" If you ask me, it's very odd to present "we can do loads of extra work to get close to what a statically typed language does by default!" as an advantage. On top of that, unit tests can't cover everything, and if you end up changing the program you ALSO have to change your unit tests.
{{% /example %}}

JavaScript is the butt of a lot of jokes because it just keeps adding more stuff, more functionality, to a language invented in three days when the internet just started. But ... everyone and their grandmother uses JavaScript, while most people _like_ to use it and give coding examples with it. Most of the things they added over the years are really useful features that make code more succinct and clean, such as the _arrow functions_ or _async / await_. Add types on top, using TypeScript, and I really like working with that _in practice_.

In the end, once you bump into the _practical need_ to have well-defined types, just know that you can grab a statically typed language. It solves a practical problem that 90+% of developers run into for free, that's why they were invented! 

If there is no practical need for you, then sure, stick with a dynamic language.

## Conclusion
I wanted this article to be a short and snappy overview of the many benefits of static typing and why I'd recommend using it from start to finish. 

But, well, it proved to be such an important decision---or maybe I had so much regret about using dynamic languages for so many projects in my past---that the article became far longer.

My _personal experience_ is that static languages actually make everything easier, faster and more error-free. And all of that without any effort on your part. The only "effort" needs to be put into defining your exact types, but you need to do that _anyway_, and doing it explicitly helps think through a problem and solve it.

If I'd used them from the start, there would be 30 more (web) games from me on the internet today. Instead of those games being relegated to a backup and never seeing the light of day again, because they are broken now and fixing them is more work than simply making a new game. And after all those years, I've tracked down the biggest culprit of that issue to be my choice to use a dynamically typed language.

I currently work the most in TypeScript (my websites, web tools, web games) and GDScript (bigger games in Godot Engine). I mostly strictly define my types, but can still opt out of that if I just want to hack something together "quick and dirty". It has allowed me to drop projects and come back 6 months later, and I can instantly understand what I was doing and start working on it again (without fear or being overwhelmed). Whilst previously, I would not even dare return to old projects, knowing the mess it was.

I've also worked in Java, Rust, and C#. (And more "fully" statically typed languages, but those three are the big ones.) 

I hate Java. I like Rust, and it is _really fast_, but it lacks a fully-featured game engine that I would use for long-term projects. I'm undecided about C#, liking some aspects and hating others, but I'm considering using it for a big Godot project in the future. (As the engine also supports C# very well, and it has some of the nice static typing features that GDScript _currently_ misses. And it's faster, which that specific project needs, but most don't.)

Those were my current thoughts on the topic, keep playing and coding,

Pandaqi