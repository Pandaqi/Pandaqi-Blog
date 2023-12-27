---
title: 'Why all my games were removed from the Play Store'
date: 2024-01-02 10:26:32
tags: ["update"]
emoji: "📱"
---

For many years now, I've had about 10 games on the Play Store. All those games were also released on desktop, but their primary target was usually mobile (free and supported by ads). 

Most of them barely made me 5 cents. My most successful games (Round Ogre and Square Ogre) actually made me about 30 bucks over the years (mobile ads alone; not desktop sales). That's all fine---I didn't do it for money, mostly because I have no illusions about how much money there actually is to be made for your regular game developer.

I've always hated the Play Store (and the App Store) for other reasons.

It is an absolute **pain** to publish anything there.

* Building anything for mobile is a pain. (Even if you have a functioning, modern computer---which I do not.)
* The cycle of running and testing the game on your phone is a pain. (Even if you have a functioning, modern smartphone---which I do not.)
* Filling in the **endless silly forms** of the Play Store is a pain.
* Complying with the ever-changing requirements of both their store and AdMob is a pain.
* They will reject, ban, temporarily disable, whatever you for literally bullshit.
* And all of that just to be pushed into a container that suits them---never you---and handing off your profits to people who merely host your APK.

I've long held the belief that their should either be way more "app stores" (true competition, you can upload to the place that suits best), or we should take control back into our own hands and simply provide our mobile games on our _own_ platform.

Just before Christmas last year, Play Store screwed me over once more, and this time I'm just _done_ with it. (Also because I literally cannot comply due to, let's be honest, being poor.)

Going forward, I'll be looking for ways to host and/or monetize my mobile games myself without ever touching an App Store again. **I encourage all developers to do the same, and all consumers to realize they don't need to use the App Store to get games or apps.**

{{% remark %}}
I'm using App Store (iOS) and Play Store (Android) pretty interchangeably. While they're surely different, both in front and behind the scenes, the general criticisms and processes still apply to both.
{{% /remark %}}

We should fight monopolies whenever we can. We should fight locked-down, restricted systems whenever we can. We should fight

## Why is building a pain?

To build for mobile, you need a large range of SDKs, toolkits, libraries, and more. These need to be installed, not conflict with anything else, be of the right version, and linked to whatever game engine / code you use.

This means a lot of stuff can and will go wrong. And a lot of it will be hard to decipher.

This means building takes a lot of time, especially on 10-year-old laptop like mine.

It also means that there comes a point---which was more than a year ago for me---that you simply _cannot build anymore_. I'm still not sure about the reason, but it has become impossible to rebuild my older games on my laptop. 

It just crashes without error message. I've researched this for days and days, reinstalled everything twice, learned the ins and outs of the Java and Android configurations. The best I can do is make it crash a little later.

Keep this in mind. It's why I literally cannot fix issues and reupload the games anymore. Which the App Store required of me, despite the final published games working _absolutely fine on all Android versions_.

{{% remark %}}
Never mind the fact that this takes ages to download, install or open. Especially on an old laptop.
{{% /remark %}}

## Why is testing a pain?

Well, to test a mobile game on your device,

* You need to connect your phone, enable some developer settings (and give permission time and time again), hope your game engine finds it.
* It first needs to _build_
* It needs to erase and reinstall the thing on your phone.
* At an undefined moment, it will be done and start the game. 
* If you want to know what went wrong or what it's doing, you need to learn black magic to tap into the logs from your phone, and then filter only logs for your game, and then hope you can find a cryptic message with a clue.

## Why the endless forms and changing policies?

Google and Apple are the biggest corporations in the world. That statement should be enough, but I'll explain further below.

The goal of corporations is to _make money_. Their top priority is not to create a great service or a good product, no matter how often their marketing repeats the phrase. Their top priority is not to be human or treat others like humans.

This might sound needlessly harsh, but it's the truth.

The endless forms and policies from the Play Store do nothing more than _put more work on the developer's plate_ to _save them effort_.

They want you to answer a million questions, so they don't _actually_ need to check your game. They can check your form, then maybe do a cursory glance.

They want you to answer questions like "does your game offend the leader of North Korea?" because they don't care about free speech or expression, they just want to keep making money in North Korea. (The dictator making a mess of North Korea is _very much_ allowed to be offended if you ask me.)

They notice people abusing their system to make more profit themselves. Can't have that! So they modify policies so the developers need to comply with even _more_ rules, and they can sit back and get more of the profit.

Don't believe me? Let me tell you a story.

When I uploaded my game Square Ogre---one of my first really large mobile games, which I worked on for a while---it was accepted within one or two days. Great! It's official! Let's see it in the Play Store!

I downloaded it, opened it ... and it crashed. I asked someone else to test it, it crashed too. Within an hour or two, I was able to trace it back to a storage (save/load) bug that wouldn't crash the game on my laptop (while testing and debugging) but would crash it for **everyone else**.

Let that sink in. They ask you a million questions. They set thousands of rules and will reject you for any silly offense. You need to do _aaaaalll_ this work.

**They didn't actually test if the game would even fucking start.**

Or they did, but they just didn't care.

{{% remark %}}
Obviously, this event taught me to make sure I test if my games start on an array of wildly different configurations before launching. Let's say I was in my cowboy programmer period back then.
{{% /remark %}}

## Why ... just why?

_Why is everything like this? We already had way better tools for building and developing before smartphones were even invented?_ 

Wow, what a great question. You see, when people invented the first operating systems and the internet, they made a mistake. They made it way too _open_ and _free_.

So they made the smartphone and controlled its operating system tightly. It's a locked-down system, so you're stuck with whatever they make you do. 

When I was young, I tried circumventing it (by installing root kits, installing different OSes, finding holes myself). After I'd learned programming, I became really interested in hacking, seeking the boundaries of the systems, etcetera. (After a few years, this interest waned and now I don't really think about it anymore, but that's not the point.) It was _really hard_ to make your phone actually yours. It might be easier these days, but I doubt it is as easy as it should be.

As we all know, systems that are controlled like that will not innovate and will not have the best interest of developer or consumer in mind.

I have been temporarily banned because I was accused of plagiarism. The reason? My **own fucking website** that hosted images, explanation and demo of the game. It's right there! My developer name is Pandaqi, and my website is https://pandaqi.com! Fortunately, after proving this to them, they reversed it immediately.

I have received nagging emails for months telling me I need to update my games to the latest Android API, otherwise I would stop being able to update them altogether in the future. As I said, my old laptop _can't_ do this, so after a few frustrating days I just gave up on that. So now my games ... can't be updated ever again. Great.

Which brings us to our final issue: deleting all my games on a whim.

## What happened?

My server was hacked. All my websites are static websites, except my old blog which uses the security disaster that is called WordPress. (I've already planned its removal soon, once I've transferred all content and converted the old blog to a static website too.) I'm pretty sure that's how they got in. Nothing else was touched, leaked, or taken over. But I'm on a cheap shared server, so it could be anything.

This meant that pandaqi.com was down for ~5 days, including the weekend. (In that time, I obviously researched what happened, cleaned up the server, did extra safety checks, then brought it all back online.)

You know what the Play Store thinks is absolutely essential? Even though they are non-binding, nobody reads them, and nobody cares? A **privacy policy**, which you must obviously host yourself. All my privacy policies are on Pandaqi---my game studio website---and contain minimal boilerplate to say "I don't collect shit it's just a simple free game".

And now all those URLs couldn't be reached anymore.

Obviously, the Play Store was on the case! IT IS OF THE UTMOST IMPORTANCE!

They sent an email 17 december to inform me that "game performance might be limited" if I didn't provide a valid privacy policy soon. Over the course of the three days (17, 18, 19 december) they deleted all my games.

Thanks Google. Thanks for half a day of vague warning. I didn't know "limited performance" was a synonym for "death". (Okay, I'm really going to use that now in real life.)

Once Pandaqi was back online, and I confirmed all privacy policies reachable again, I appealed all these decisions. Another hour of useless work.

And I was still rejected.

Why? You see, since then, their policy has changed. The privacy policy shouldn't just be on the page, it should be "linked and clearly visible" _inside your app_.

What is "clearly visible"? Who the fuck knows! I already had this battle with Round Ogre. Because it's a _paid_ game, this rule already applied to it back then. I iterated through four versions before they finally accepted.

* A simple icon in the settings => not clear enough
* A simple textual link in the settings => not clear enough
* A tiny button that says "privacy" in the corner of the home screen => not clear enough
* A big ass button that says "privacy policy" filling the bottom right corner of the home screen => winner

Even if I _could_ update my apps, I'd need to find a way to fit a huge ugly button on the home screen of each (some don't even HAVE a home screen).

It's just not going to happen.

So all my games were suddenly gone, just before I took my first days off in the entire year during Christmas.

The ad revenue is gone---even on the hundreds of installations still on people's phones---because obviously Google will not allow people to use AdMob when their game is not in their Play Store! No no! They might lose a tiny bit of money that way!

_How do you know this?_ Surely not because Google told me! They'll only tell you the app is rejected because of some general category. In this case, the original emails I received for all apps said "rejected because of non-compliance with the User Data policy". Only the second round of emails---after my appeals---included the list of rules about the privacy policy, for me to guess which bullet point was the problem.

## So, what do we do?

I finally have enough money to buy a new computer soon. So I should be able to update the apps, sent the update, and probably be accepted.

Until they find another reason to suddenly delete stuff or change policies. This pattern has repeated for years and years, and I've always complied telling myself "just this quick update to 5 games, and you can keep them online, just do it". Well, a limit was clearly reached.

So I'll repeat my statement at the start.
* If you have the resources and inclination, start another App Store. (One that preferably does not pull this bullshit. But that's not even a requirement: any competition is good.)
* Phone manufacturers, start shipping phones that give people a different OS, or better a _choice_ for the OS. (There _are_ already operating systems to rival Android---they just make it as hard as possible to find and install them on your regular consumer smartphone.)
* Game developers, keep your games in your own control. Find ways to host them yourself, sell them yourself, market them yourself. Pull them off the App/Play Store; don't give them a dime.
* Game consumers, realize the default apps on your smartphone are usually not the apps you want. They are there to, again, lock you down and keep you in their ecosystem. Search the internet. Find alternative stores. Find the original source for a game or app you want---and if you truly enjoy it, _pay for it_, instead of complaining about an amazing free game because it has a few ads.

Until most of these happen, the entire ecosystem of mobile gaming is broken to the point that even I won't even touch it anymore.

Some closing questions.

_But if my kid should download games from any source, how do I guarantee the content is safe for them?_ Ha. Ha ha. Hilarious. 

The Play Store is no guarantee. You can find evidence, for example, of literal terrorist propaganda being shown as the "ad" in a kids game. You can find many games that skipped their "cursory glance check" for some time, containing precisely all the content they try to ban. 

The internet surely is no guarantee. Your kid is more likely to find adult content just by browsing Google and clicking on something random, than by downloading a game that somehow completely misrepresents itself in the marketing. (Personally, I do not see any issue with any content or ideas being presented to people of any age. But I know that actual true freedom and transparency is hard to reach and undesirable to many.)

The most popular games in the world are literally designed to be addictive and to get kids to swipe their parent's credit cards. Heck, the developers behind such games (or popular social media apps) usually forbid their own kids from having a phone or using their games. Because they know.

_Or what about viruses? Surely downloading from a developer's website is far less safe?_ You know what would be great idea? If people learned to think for themselves.

You can easily check the likelihood of a game being a virus (or just, you know, being bad quality).
* Check the developer's track record. (How long have they been around? How many games do they have? Are there comments about them online?)
* Run your own quick virus scan.
* Bail if you find any red flags, such as a Flappy Bird game asking for permission to use your microphone.

"Protecting" people from having to think critically or use common sense---which the Play Store _does_ do to some extent---is not actually a desirable habit. We want the opposite. Let people install a virus once---they'll never forget and never be surprised again.

_Most developers won't have their own eshop system, right?_ True. 

First of all, most mobile games are free anyway. So no digital shop needed. Though AdMob (from Google) is perhaps the best ad provider, there are many others reputable ones that do not require your game to be on the Play Store.

Second of all, it has become relatively easy to set up one of those. If you're just starting out, you don't need a digital shop as you won't actually make much money. If you _are_ experienced, with lots of big popular games under your belt, you surely have the resources to do this yourself. (And if not that, to make demands of the App Store. All the popular games don't need to follow their policies, and blatantly so.)

Thirdly, many developers use their free mobile games to market other things they actually sell. They'll make a few fun games---free, no ads, nothing---that constantly link or advertise their big PC game on Steam. They'll make a game to illustrate they can tell stories, then sell their book.

## Conclusion

Hopefully, this article
* Was a succinct explanation of why the App Store / Play Store suck and should be fought. (There's obviously way more to say, more examples to give, more evidence to provide, etcetera. But make the article any longer and nobody reads it.)
* Gave ideas on how to do so and answered the most common criticisms of such approaches.
* And explained why you cannot find all my (Pandaqi's) mobile games on any App Store anymore.

Do not fret. You can find all my mobile games on [itch.io](https://pandaqi.itch.io), for free, no ads ;) I guarantee that I collect no data and never will. That privacy policy thing is a waste of time and effort in all possible ways.

Heck, you can even find the source code for all my games in my public GitHub repositories. Check my statements for yourself. Or build the game yourself, deploy it on your own phone, I don't care.

Just don't give the App Stores any more than they already have. We've given them a finger, they've taken the hand, and the past 5+ years they've basically taken the entire body.

I'm currently researching more ways to circumvent this and make the mobile (gaming) ecosystem more open and healthy. I might have found a few things, but I'm not sure yet. You'll hear about this when I have something concrete.

My rant is over,

Pandaqi
