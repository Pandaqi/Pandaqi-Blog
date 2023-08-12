---
draft: true
title: 'How to use Firebase with Phaser'
tags: ["tutorial"]
date: 2022-01-01 12:09:32
---

For some reason, Google really likes changing their API all the time, then never updating outdated references.

I tried to use Firebase for a Phaser game recently. I could barely find good tutorials. Any information I found was outdated and 99% unusable now. It took some hours of hair-pulling to get this right.

I did find one amazing YouTube playlist: [Firebase v9 | The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb). But it's not specifically aimed at highscores or games. (And I don't like coding videos, as you can't highlight, search or copy-paste the code.)

So in this article I try to explain how to use Firebase in **2023**! 

I'm using TypeScript and a Node project. The tutorial is geared towards that. It's also the setup I'd highly recommend. Nevertheless, the main ideas and principles will apply anywhere. 

I'll be using it as most people do: for a fast and free highscore/leaderboard in a game. This tutorial works for any JavaScript application, but I focus specifically on Phaser.

## Step 0: set up a Firebase account

Go to [firebase.google.com](https://firebase.google.com). Make an account. Make a project. Make a collection.

A _collection_ is the Firebase name for a _database_ or a _table_.

It always needs to have at least one document (it will tell you). So create one any way you like. However, try to already create a document in the format that your game will require, as this makes the setup and testing easier later on.

## Step 1: include the SDK

You should already have a functional node project (with a ``package.json`` file).

Type ``npm install firebase`` or ``yarn add firebase``

Wait a bit. And congratulations: you have firebase.

Many tutorials tell you to put specific import statements at the top. These are most likely outdated, wrong, or just unnecessary.

Use a good code editor (like Visual Studio Code) and it will automatically help import the right things as you type them. (For completeness' sake, I do give you my final code at the end.)

## Step 2: How does Firebase work?

This is always "the missing tutorial". Programmers have become quite proficient at writing _documentation_ and making that _look good_. But that's only half the battle.

The other half is knowing which functions you'll actually need and _why_. What does each data type mean? What does this function expect? And where can I get that?

So here's the rundown.

### Documents

Firebase Collections work with **Documents**. A document is simply one **entry** in the database. One row in the table.

But they don't call it that way, because it's not like a traditional table or database. Entries can be completely different. Some entries might have two properties, others five. It's most like a dynamic JavaScript object that can have any list of key/value pairs.

So it's a _document_, which is a _very flexible entry in a table_.

### DocumentReferences

In the old days, you'd use an ID to make each row unique in your database. Usually this was just a number, which auto-incremented any time you added something. This was _crucial_ to making any database application work. You needed some _unique way_ to find and identify each entry.

Well, Firebase does the same using **DocumentReferences**. These can be any string of symbols. As long as they are unique.

Most applications use an "UUID" for this: Unique User ID. (Phaser generates one with ``Phaser.Utils.String.UUID()``.)

Here's the thing: almost all Firebase API functions need a _document reference_ as their parameter. They don't want your UUID string that you originally used. They want the DocumentReference object that you have from some earlier call to the API.

Remember this.

### Snapshots

The idea of Firebase is that it's a _real time_ table. As such, it can be constantly written to and read from. Any call you make will give you the latest real-time state of the database.

You don't necessarily want that. Many applications simply take a _snapshot_ of the current state, and reuse that throughout the application.

This tutorial will _not_ use that. It adds extra code and concepts. We want a leaderboard that displays the latest highscores anytime. 

But now you know what other tutorials are talking about.

## Step 3: What is our goal?

Let's formalize our goal. We want to **save a player's highscore when they finish a level** and **read the full highscore table to display a leaderboard**.

For saving:

* Use the UUID to get the DocumentReference for this player
* Check if it exists.
* If not, create a new one with the score we just received.
* If yes, update the existing one. But only if the new score is higher!

For reading:

* Get a list of all documents in the collectio
* Sorted by highscore (descending)
* And cut if off at some point

### Pitfall #1: bad imports

This one mystified me for at least an hour. Here's the error message you'll see when this happens:

{{< highlight Javascript >}}
FirebaseError: Expected type 'Xc' (or some other type), but it was: a custom 'vn' object (or some other type)
{{< /highlight >}}

Firebase has two versions. The regular one and the _lite_ version. You can use the second one if you're only doing very basic operations and want to save file size.

But **do not mix these up**. Check your imports. They should all come from the regular version or from the lite version. But don't mix-and-match, as they use different objects they don't recognize from each other.

For this tutorial, I just use the regular version.

### Pitfall #2: global functions, not prototypes

I don't know why and I don't know when this changed. Almost all information online shows how to use Firebase by calling functions _on firebase objects_ (like a _document_ or a _collection_). Something like ``collection.getDoc(docRef)``.

This is **not the API anymore for JavaScript**.

It uses global functions instead. Something like ``getDoc(collection, docRef)``.

The only indexing happens on _documents_. These have two useful functions:

* ``doc.exists()``: (*boolean*) if the document exists or not
* ``doc.data()``: (*object*) the actual entry, as a JavaScript object to do with as you wish

Again, don't try to read or manipulate documents directly. Ask for their data, do something with _that_.

## Step 4: Loading and Saving

Finally, we get to code the leaderboard. 

I'm using TypeScript. If you don't, just remove any type declarations behind variables (``variable:<sometype>``).

I wrote it as a class in its own file. To use it, call ``new Leaderboard()`` from somewhere.

### First connection

{{< highlight Javascript >}}
export default class Leaderboard
{
    // This is given to you when you create your project
    firebaseConfig = { ... }; 

    app:FirebaseApp;
    db:Firestore;

    // The collection name you used when creating it
    collectionKey:string = "highscores";
    collection:CollectionReference;
    docRef:DocumentReference;
    docResult:any;

    // @TODO: you need to generate this UUID _once_ per player and retrieve it here
    // Can be anything, but make sure its unique and not input by players themselves
    uuid:string = "BEST_PLAYER_EVER";

    score:integer = 0;

	constructor()
	{
		this.setup();
        this.getDocument(); // coming soon
	}

    setup()
    {
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
        this.collection = collection(this.db, this.collectionKey);
        this.docRef = doc(this.collection, this.uuid);
    }
}

{{< /highlight >}}

You can print some messages to the console to check if the app, db and collection are set correctly.

Now this Leaderboard of ours knows about the database, and it knows the reference we should use for everything this player does

### Getting our document

All calls from now on are made to the database ... over the internet ... which means they _take time_. These are all asynchronous functions, and we need to wait until they return something.

Note that my examples aren't the only way or the best way to do it. I chose this particular syntax because it was easy to read and modify, also for this tutorial.

{{< highlight Javascript >}}
getDocument() {
    const that = this;
    const loadData = async () => {
        try {
            that.docResult = await getDoc(that.docRef);
        } catch(err) {
            console.log(err);
        } finally {
            console.log("Retrieval done.");
            that.createDataIfNeeded(); // coming soon
        }
    }
    loadData();
    
}
{{< /highlight >}}

If the database couldn't be reached or polled (for whatever reason), it errors. If everything was fine, but the document simply doesn't exist, we _still_ get a DocumentReference. Simply one that leads nowhere ... yet.

### Creating one if nonexistent

Notice how this is also an asynchronous call.

You can do this check + setup when the player starts the game. 

You can also create the Leaderboard object once the player _finishes_ their first level. This prevents unnecessary entries for players that boot the game but never even finish a level.

But then you'll need to wait until these setups + checks are done before you can submit the score and retrieve the database.

{{< highlight Javascript >}}
createDataIfNeeded()
{
    const hasEntry = this.docResult.exists();
    if(hasEntry) { 
        this.score = this.docResult.data().score;
        return; 
    }

    const that = this;
    const createEntry = async () => {
        try {
             await setDoc(that.docRef, { 'score': 0 });
        } catch(err) {
            console.log(err);
        } finally {
            console.log("Document creation finished.");
        }
    }
    createEntry();
}
{{< /highlight >}}

Unfortunately, you do not get the new document back after a call like setDoc. (Most Firebase calls return a promise that resolves or not.) So our ``docResult`` will still think it doesn't exist after we created it.

To simplify things, I go around this by keeping the latest known score on the Leardboard object itself: ``this.score``. You can also just poll the collection again to get the entry as it is now.

### Updating our score

With all this setup, this has become a very easy step.

{{< highlight Javascript >}}
public submitScore(newScore:integer)
{
    const scoreIsntBetter = (newScore <= this.score);
    if(scoreIsntBetter) { return; }

    this.score = newScore;

    const that = this;
    const updateEntry = async () => {
        try {
            await updateDoc(that.docRef, { 'score': that.score });
        } catch(err) {
            console.log(err);
        } finally {
            console.log("Document update finished.");
        }
    }

    updateEntry();
}
{{< /highlight >}}

We should _know_ it exists now. We _only_ update if we actually need to.

This should work! Play your game and watch an entry being created + updated as you get highscores.

But of course, highscores are only fun when you can compare them with others.

## Step 5: leaderboard

By now, you hopefully understand the ideas behind Firebase and how to approach problems like these.

* It uses functions for _everything_, even passing parameters to other functions.
* The function to get multiple documents is of course ``getDocs()``
* It will be an async operation that might fail
* And you should not use the end result directly, but put it in some other structure you can use.

On top of that, there's one last piece of black magic: **queries**. You often don't want _all the documents_. You only want the top 10 highscores. You want them sorted, of course.

Queries are extremely powerful and versatile. For this tutorial I'll only do the very basic step of sorting and limiting.

{{< highlight Javascript >}}
private fetchLeaderboard()
{
    const that = this;

    // construct the query, order by score descending, limit to some number we configure globally
    const q = query(this.collection, orderBy('score', 'desc'), limit(this.NUM_SCORES_TO_DISPLAY));
    
    // fetch it, convert it to an array of objects we can easily use and debug
    const fetch = async() => {
        try {
            that.list = await getDocs(q);
        } catch(err) {
            console.log(err);
        } finally {
            that.listAsArray = [];
            that.list.forEach((doc) => {
                that.listAsArray.push({ ...doc.data(), id: doc.id });
            })
            console.log("Leaderboard fetched.");
            console.log(that.listAsArray);
        }
    }
    fetch();
}
{{< /highlight >}}

## Step 6: Usage

As I said, I create this Leaderboard at the start of the game. So it immediately checks the connection, sets it up, and creates a document if it's a new player.

Whenever the level ends, it calls ``submitScore()`` with the new score.

Whenever the user presses the leaderboard button, it calls ``fetchLeaderboard()`` and, once done, loops through the list to display those scores.

You can play around with efficiency. ``getDocs`` can read from cache, for example.

You should handle actual errors, instead of just displaying them. If the firebase database for some reason just doesn't work, it shouldn't crash your game. Perhaps set some variable ``active`` that is only true if things are working. And if not active, immediately return out of any function calls.

Besides scores, you can obviously save other data. Usernames, timestamps, statistics like "time played" or "powerups grabbed".

### Phaser specifics

In **Phaser** specifically, you could turn the Leaderboard into its own scene. Only launch the scene when the user actually wants to view the leaderboard.

For the UUID, I use ``Phaser.Utils.String.UUID()``. The game has a simple "SaveLoad" object that uses localStorage to save some things when you load the game for the first time. One of those is the UUID it generates at that moment.

For displaying the leaderboard, the easiest thing is simply placing rectangles underneath each other, with text on top of it.

@TODO: Code example for that, once I implemented it myself.

## Conclusion

Hopefully this was informative. It will probably be outdated in a few years. But I wasted a whole day banging my head against all the weird issues I was encountering. 

As I said in step 2, there's usually "the missing tutorial". You might have the _documentation_, you might have the _JavaScript knowledge_, but it means nothing if you have no idea where to start or how a system should be approached.

This article tries to be that, and nothing more.