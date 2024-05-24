---
title: "Git and the Horror of Newlines"
date: 2024-05-15
emoji: "🚧"
---

A few days ago, I got the scare of my life. I had just pushed a _huge_ update to the Pandaqi website, but when I checked it out ... almost all the images and fonts were broken. No, even worse, _corrupted_.

Each resource could be _found_ (as in, the path to it was correct). The server was running just fine, and any part _not_ touched by this update was also still running fine. But everything that had been part of this update threw up loads of red errors (in the console) saying the image couldn't be decoded, the font couldn't be read, etcetera. Sometimes, images didn't display. At other times, they were completely _distorted_, twisted around or cut off in random places.

What was happening? The update _only_ reorganized and added new files. It hadn't renamed any of them, it hadn't even removed anything, so old assets (from projects already published) were the _last_ place where I expected trouble.

But now the entire website was broken, ugly and unusable. Both old and new projects, both images and fonts.

## Attempt #1: clear and reset

Naturally, I simply tried the old "turn it off and back on again". Clear whatever I can from the server, retry deployment. No, this changed nothing.

{{% remark %}}
Similarly, I cleared all my browser cache and opened an incognito window in a browser I never use---Microsoft Edge---to ensure cache/PWA wasn't messing with anything.
{{% /remark %}}

The website is hosted on CloudFlare pages, which is smart about updates and does not reupload assets already on the server (if they haven't changed). In this case, however, I thought it was an issue. Because the assets _were there_ (with the correct name, date of modification, etcetera) ... it refused to reupload them without corruption. Whenever I rolled back, retried the update, cleared cache, it would keep saying it only uploaded ~200 files files out of the ~1000 assets it should have been.

I could not find such an option. Maybe it would be nice if CloudFlare added a button to completely "clean" the server, making the next commit entirely fresh and forcing it to upload _everything_ from scratch. But alas, the option wasn't there---and it also wouldn't have been the solution.

## Attempt #2: check my local installation

Now I grew worried that it wasn't the fault of the CloudFlare server, but that the entire project/Git system was somehow corrupted.

I booted the Pandaqi website locally (which is 100x slower than building it on the server, by the way) and ... it was all fine. 

Of course it was fine! I literally developed on it this morning, finishing the huge update, and all images/fonts loaded (as usual) then.

Perhaps I'd feared that _committing_ changes to Git had somehow _made more changes_ ( = corrupted the original files), but that wasn't the case. And that's a good thing, because otherwise I'd have been screwed. I have very good habits when it comes to backup and version control, but it would still mean the past few days of work would have to be redone or restored/repaired with effort.

But no, all original files were fine and the website was very much not-broken on my own machine.

## Attempt #3: comparing Git to the real deal

So I started checking the assets in three different places: the server, Github and locally.

That's when the first hint at a solution came.

* The server had the exact same assets as Github. So yes, it was _not_ a fault of CloudFlare, it had perfectly copied the Git installation as usual.
* The file size was almost identical ... but the Github/server ones were missing just a few _bytes_. As in, the entire image was still there, but it chopped off literally one or two binary characters inside and that's it. (That's enough to make images not load or only load halfway.)

I browsed through the entire commit (in Github Desktop) until my suspicion was confirmed.

For _some_ assets (like 75% of them), the "diff" showed that the file had lost 1 or 2 bytes. (For other assets, it correctly recognized they were still the same and/or just moved to a different folder.) The original on the left displayed fine, the "new" on the right was a broken image that wouldn't show.

And then, in a flash of insight, I remembered.

## Git and Newlines

Only a week or two ago, Github Desktop had started _changing all the line endings_ to CRLF again. Despite explicitly stating I didn't want it everywhere I could. Despite working with LF endings all the time and not wanting Git to mess with it in anyway. Somehow, an update broke that old setting that was working, and now it was converting all my newlines again on every commit.

_What is CRLF and LF?_ When it comes to text on a computer, there has to be some character that indicates a "new line" or "line break". You'd want this to be universal, so that different operating systems/computers will read a text file in the same way, instead of (say) missing all the newlines and just showing one wall of text.

Of course, some people invented the LF symbol and others the CR symbol ("carriage return"), and then others decided to just do BOTH (CRLF) to be safe anyway.

Well, I work in LF and don't want Git to mess with it. But a config setting (`autocrlf`) that defaults to `true` changes all the files to CRLF, no matter how often I set that to `false`. This is a lot of messing around with files _every single time_, wasted energy and disk space, and it's a stupid decision if you ask me.

Anyway, frustrated by this change, I decided to edit the `.gitattributes` file. By default, it has the following line and nothing else: `* text=auto`. I assumed this automatically detected _line endings_ anyway, but something had just been broken in my computer or installation (as it so often miraculously does).

I found a simple snippet online that said `* text eol=lf`. I added that after the first line.

It worked! It stopped converting it all the time! So I left it in and continued.

I had, however, made a _very stupid mistake_.

I'd assumed those asterisks ... were to create a _list_ :p Like in Markdown, you put an asterisk before every line, and it's interpreted by the computer as a _list_ of connected things.

Of course it wasn't. Here's what that added line actually means.

* The asterisk (`*`) means "select everything"
* Then `text` means "treat our selection as text files"
* And `eol=lf` means "force LF line endings on our selection"

Of course, if you select _everything_ ... it means Git will assume _everything_ is text and needs LF endings. Even images. And fonts. And audio files. All _binary files_, which are corrupted/broken if even a single bit is changed, are _also_ treated as text and stripped of anything that resembles the wrong newline characters.

So that's what had happened. All my assets were being stripped of newlines as if they were _text_, corrupting almost all of them.

At this point, it was nearly 2 AM and I'd been debugging/researching this issue for _hours_. (I'd also lost access to my computer now, as somebody else was sleeping in my work room, so I was now just Googling on my phone in the living room.) Realizing this, I was 99% sure this was the solution, and I went to bed eager to fix it the next morning.

## How do we fix this?

First of all, we remove the troublesome line. Instead, I should've simply amended the first line: `* text=auto eol=lf`

_That's_ what `text=auto` does. It _automatically_ detects if something is a text file or a binary file. That's why it's the only thing in the `.gitattributes` folder by default and the only thing most people will ever need.

Now we select "only text files" and change line endings to LF.

Just to be sure, however, I still _manually_ told Git that all my asset types were binary. Just to be sure this never happens again, and it probably makes Git slightly faster because it doesn't have to _read_ the file contents and _check_ if it's binary.

For example, you can add `*.webp binary` in that attributes file. This says "any file name + webp extension = binary file, don't touch it".

And then we get to 3 very _fortunate_ situations that made the repair "easy".

* This change by Git is _only_ done for the commit. It doesn't change any newlines on your local installation---it doesn't change the actual files---it only modifies them when pushed to Git. As such, all the original files were _not_ corrupted and didn't need replacing or repairing.
* I have a 2-step system in which I develop projects in a dev environment, and then just cut-paste the entire folder to the real website once done. This means the files are considered "new" to Git when I move them from "developing" to "finished", which means any previously corrupted files should be committed properly from that moment, and all other upcoming projects should be fine.
* I'd combined this HUGE update into one focused commit, also adding a few other big changes into it.

This means I only had to _rollback_ the Git installation by one commit. (Go to the folder in the command line, type `git reset HEAD^`. Or copy the ID/Hash of the commit before it and type `git reset <id>`.)

This is a soft reset, which means it "forgets" you committed the changes, but all the files are _unchanged_. Essentially, it just allows me to do the exact same commit _again_.

But this time, with the proper `.gitattributes`, it did no conversion and all assets were left alone. By turning off conversion, committing indeed became _much_ faster. (The first time I did it, with the wrong settings, it took minutes to convert and apply ~1000 file changes. This time, it was done in a few seconds.)

Now we have our final issue: the Github public repository is in a _different_ state than my local one. Fortunately, nothing and nobody depends on its history being clean, and the public state is _100% wrong_. So I can just `git push --force` to forcefully override the public repository with my local one.

After all that, CloudFlare Pages built the website, and a minute later I could breathe a sigh of relief. Everything worked again. Nothing corrupted, nothing ugly, nothing modified while I explicitly told it not to.

## What have we learned?

Firstly, don't just copy code from a stranger online and assume you know what it does :p If I'd just researched how `.gitattributes` works for 5 more minutes, I'd have caught the mistake far earlier and never made it. Even if a solution was correct for the one _asking_ it, or in one situation (such as a website with ONLY text files, no binary), it might not be for you.

Secondly, tight version control and backups is very nice. After overcoming my initial fear/surprise from the bricked website, I could handle it quite easily knowing I had all files backed up and could just rollback to the previous commit to keep the website working for now. All in all, I only "wasted" a few hours, which taught me _a lot_ about Git, CloudFlare pages, Hugo (the static website generator that I use), etcetera.

{{% remark %}}
For example, I learned there's a 20,000 file limit to CloudFlare Pages, no matter your plan. Seeing the speed at which I developed projects and how many files a single game can need ... I grew worried for a second. But at the moment, Pandaqi has "only" 4,000 files, partially because I was accidentally smart about cleanup.
{{% /remark %}}

Thirdly, newlines are a mess. I've been working with computers for 15+ years now, and there have been SO MANY ugly errors, crashes, bugs, whatever just because of fucking _newlines_ and how they can't decide what they want and nobody can decide what to do. That's _exactly_ why I wanted Git to _not mess with them_ and let me have full control, making them all LF. But Github Desktop forces auto-updates on you, even if that regularly breaks stuff, and that's probably how it turned `autocrlf` back on.

(With currently no way to turn it off for me, apparently. I've changed the global config, the Github Desktop config, EVERYTHING. It insists on converting to CRLF unless I do my `.gitattributes` change for every single project, which I don't feel like doing.)

Fourthly (?), perhaps don't make huge commits or updates when you're really tired at the end of the day. I don't know what on earth I was thinking about that asterisk (`*`) being a simple _listing symbol_, when I know full well that it's used as a wildcard "select all" in basically any language. It's just a ridiculous oversight that I would never have made at any other time, and I'm lucky I only had the "wrong" attributes for a few weeks and could solve it without too much danger.

Anyway, that's my story about the corrupted update and Git newlines. This version was only online for like 30--60 minutes. But if you visited the site then and thought it was ugly or unusable, well, this is the reason. (And perhaps clear your cache/refresh the website, as some of that corrupted data might still be served the coming days/weeks.)

Until next time, hopefully about something more fun,

Pandaqi