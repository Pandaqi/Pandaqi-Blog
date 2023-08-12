---
title: 'Finding Fonts & Licensing'
tags: ["thoughts"]
date: 2023-01-01 23:46:32
emoji: "💬"
---

This article is about how to deal with **fonts** when it comes to creative projects. I explain where I find my fonts, but mostly about _licensing_ and things to look out for. Because I---like many---learned about this way too late. 

This is not a "tutorial". Just my thoughts, some info, and some quick advice.

## The issue

You have a project. A video game, a board game, a website, whatever. Now you want beautiful fonts for your project.

Where do you get them? Like most people, I went to Google and just typed some general keywords. "Legible font fantasy-like free".

After some searching, I'd find something decent and use it. This was _fine_ when it was just me doing hobby projects that would most likely be abandoned after three days.

But the trouble starts when you get serious.

* The font misses symbols. Or variants, like _italic_.
* The font is huge (at least 1 MB) and you can't (or don't want to ) serve that
* The font license only permits **personal use** (and you don't know what that means exactly)
* The font turns out to be ... paid.

How to deal with all that?

## Where to find good fonts?

Good fonts can be found at _paid_ services, like font foundries. Famous ones are [Adobe Fonts](https://fonts.adobe.com/) and [MyFonts](https://www.myfonts.com/). When you pay, perhaps, 100 euros for a font, you can be sure you get ...

* All symbols
* Multiple variations
* Good support if anything goes wrong

I'll talk below about cheaper fonts. Usually the ones that are free for personal use, but need to be bought for commercial use, are only 10 or 20 bucks.

Because most people---like me---don't have the budget for those fonts.

In that case, I recommend

* [Google Fonts](https://fonts.google.com)
* [FontSquirrel](https://fontsquirrel.com)
* [DafontFree](https://dafontfree.com)

Everything on Google Fonts is _free_ to use any way you like. You can link to them (which means they host the fonts and serve it to you), or download it to use yourself. There's a strict process before a font is admitted, which means you can be quite certain any font on it has a good quality.

The problem is, of course, that such a repository will have a limited set of fonts. Other websites have a much _larger_ offering, with much more variation and niche fonts.

This is important. Because fonts are often 90% of what people see from a project, you want them to be **good**, but also **unique**. You don't want to use a font that millions of others also use. And that's a risk you immediately take when going for the most-used free font repository in the world.

That's why, over the years, I strayed slightly towards the other alternatives. Just to find fonts that were an even _better_ fit for my project, and less likely overused.

Now, with every project, I usually start by downloading 10-15 fonts. Even if I find one that looks decent, I keep searching (for an hour or two) in hopes of a _great_ one.

## How to deal with heavy font size?

The first option is to let others host them for you. Google Fonts does that. Many websites that sell fonts will also allow you to do this. This means you get a link or two, which you include on your website, and they handle the rest.

The problem? This is a dependency. Your website only loads as fast as _those services are_. And if they go down, your website might suddenly display in some ugly unintended font. Or, if they ever change their system or API, you might run into trouble without causing it yourself.

That's why, over the years, I've tried to make more and more fonts self-hosted. 

{{% remark %}}
I'm still not there yet, as a quick glance at the source code of any of my websites will reveal. But that demonstrates the issue precisely: I am so _entangled_ with Google Fonts, that it's hard to get rid of them.
{{% /remark %}}

But yes, font files can be huge. Fortunately, the `.woff` and `.woff2` formats are supported everywhere now. Use any service (such as [Transfonter](https://transfonter.org/)) to convert your font to that format. It will shrink the size immensely.

Besides that, ask yourself if you _really need_ that font. My first few websites had the beginner mistake of thinking "hey I need a font for this thing, let's find a new one"---which means you end up with six different fonts. Which is a huge strain on the server, and also ugly and inconsistent. For most projects, it's enough to ...

* Use two fonts
* And one of them has a few variations (such as _italic_ and **bold**)

You might get away with one font. Sometimes, you only need a font for a _very specific purpose_. Then you can search for one that _only has the symbols you need_, which means it will be way smaller. 

{{% remark %}}
Alternatively, you can strip out the unneeded symbols yourself. But the license has to permit that _and_ it takes computer knowledge that 99% of people won't have. I ended up ignoring this option entirely for those reasons.
{{% /remark %}}

With only a few fonts, in `woff2` format, their strain on file size or bandwidth is really minor. Even all Google Fonts entries can be download to host locally this way.

## How do font licenses work?

I must admit, ashamedly, that I only learned this some time ago. I knew the basics ... but not the important details.

A font usually has one of two licenses: **personal use** or **commercial use**

Personal use means the font ...

* Is used in something never seen by anyone else
* Made individually, not for a company or assignment

Now the important consequence: **anything else is commercial use!**

This means ...

* Using it within a company
* Using it for anything that will be published (or used outside of your private work environment)
* Using it in any way to make money or _promote_ something else that makes money

I thought I could use "personal use" fonts on some of my own projects. Because they were free and I sought no profit from it. But that was _wrong_.

Personal use is for things like

* A holiday card you only send to a few friends and family members
* A hobby project you make for yourself only
* Quick prototyping of an idea, knowing that the font will be _replaced_ by something else before the project leaves that prototype phase

Yes, you can use those fonts on tiny ideas and sketches. But not any further than that, not even that tiny project on your personal website that is absolutely free. That still registers as "commercial use".

Now that I know this, I can see that most fonts include this warning already :p 

Many fonts release one "free for personal use" variant. To demo the font, or just to be nice. But if you want to use the font seriously (in all its glory), you have to _pay_ for the commercial license.

Fortunately, these licenses usually aren't breaking the bank. I think it's a more than fair deal:

* You may try our font on some personal prototypes
* If you like it enough, give us 10-30 bucks and you get this great font to use _any way you like_

That's what I'd recommend. 

* Check the font's license. Now you know how restrictive personal use actually is. 
* Don't buy fonts far in advance. There are enough free fonts to suit you 99% of the way. 
* But if you find one you _really like_, don't hesitate to buy that commercial license for it.

For many projects, I was able to find _amazing_ fonts under "personal use" easily, but (almost) none that were completely free. There's this gap. And I think jumping over the gap will lead to projects that look more professional and unique. Because the font they used is _not_ a free one that millions of websites used without thinking about it for a second. 

## What if there's no license?

If this information isn't stated anywhere, do not _assume_ that the font is completely free. There are many websites where you can download "free fonts", but there's no telling where they got it. And if it's actually free.

Type the name of the font into Google. Usually, the first few results will reveal the original creator or owner. They will tell you the license; if it's paid or not.

Otherwise, the license is usually included with the download of the font. A second `.txt` file besides the actual font files.

In my experience, _most_ fonts are only "free for personal use". That's why the Google Fonts library---large though it is---is quite restrictive and "similar". Because the number of fonts that are _very good_ and also _completely free_ is just small.

## What I don't like

Some websites sell multiple (other) licenses for fonts. Something like ...

* **Game License**: you pay relative to the number of times the game sold
* **Web License**: you pay for how many page views you get per month
* ...

I don't like this. I recommend you ignore anyone that does this. Why?

In general, I'll always tell you to _own what you buy_. Pay one fee, own the thing forever. This prevents a pile of problems, removes headaches in the future, and is usually cheaper and well-supported through law.

Besides that, it's a band-aid solution to a problem. Designers have freaked out, ever since the internet appeared, because their fonts were illegally downloaded and shared everywhere. Rightly so, of course. But this leads to such licenses that try to control and restrict, very tightly, what you can do with the font. Even if you bought it (for quite some money)!

You can't predict the future. And you certainly don't want to be "punished" for success. (What if you bought the font for a game, but requirements change, and now it's a _web game_? What if your game blows up and you realize most of your profit is evaporating because of this license to use a single font?)

## Conclusion

So, let's summarize.

* Google Fonts is an amazing resource. But look at other resources and you'll often find fonts that fit better and are more unique.
* Check the license. If not stated, don't assume it's free or for commercial use. 
* Personal Use means nobody else will ever see it and you use it only for your personal goal. Commercial Use is everything else.
* You can host your fonts elsewhere. You can buy perpetual licenses. But I'd recommend _owning_ the font entirely and hosting locally. Compression and smart design choices can reduce the strain.

Anyway, that's what I've learned after many years of creating projects and needing fonts for them. By now, I've visited Google Fonts so often, that I _know_ all the fonts there and can never find anything new anymore :p That's also what prompted me to write this article.

Quickly, I found the ideal font elsewhere. Happily, I included it, enjoying my designs. (This was for a book cover for a fantasy novel.) And then I double-checked the license, and you guessed it: personal use only. For the first time in my life, I actually spent money (only 10 euros) on a font.

It felt great. I felt like a professional. But for 90% of my projects, free fonts seem to be enough still.
