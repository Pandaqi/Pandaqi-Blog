---
title: "How I Coded My Own Webshop"
date: 2026-01-01
emoji: "🛒"
---

This article explains the steps I took to build my own "custom" webshop. It took a lot of effort to figure out how to set it up, how to connect different systems to each other, how to prevent making a lot of silly (or even costly) mistakes. That's why I wrote about the entire process and hope others can learn from it!

This is _not_ a guide to coding your own e-commerce system from scratch. I don't recommend that to anyone, certainly not on your own or as a "side hustle". It's about how I used existing tools, and some custom solutions by myself, to get a pretty unique webshop setup.

As we go, I'll mark my biggest lessons or crucial tasks as **LESSON LEARNED**. Because this article is also a reminder to myself---a sort of cheat sheet---about all the things I need(ed) to take into account.

Also, a large part of creating such a project is _not_ related to the code or technicalities. I'll also talk about things like budgeting, marketing, picking a name and offerings, and any _other_ (perhaps odd) decisions I had to make regarding an online webshop presence.

Finally, let me state that I had _some_ experience with APIs, Webhooks, Webshop systems, etcetera beforehand. But it was very minimal experience, and most of this journey was a collection of surprises and realizations as I stumbled through it. As every developer knows, that's just the typical way to learn new programming stuff :p

## What's our goal?

I wanted a webshop system that gave me a lot of **freedom** and **ease of maintenance**. 

* Something I could easily "attach" to any website, instead of being forced into some ecosystem. (Or forced to completely overhaul all my websites.)
* Something with no or few upfront costs. (I simply _can't_ pay that.)
* Something that allowed me to have multiple webshops on multiple websites (separated by their "category", such as books or games), from just a single account, managed from just a single dashboard. (After 15+ years of making projects, I've learned that flexibility and ease of maintenance are key. I prefer barebones features and less profit over seventeen accounts in different places that constantly need checks or updating.)
* Something that allowed access to an API, so I could modify things whenever and however I wanted, and "connect" different systems if needed.

In other words, I quickly realized I was going to have to write lots of custom code.

After some searching, I found a few existing platforms to help out.

* Snipcart is a general store manager (carts, products, payment gateways, etcetera) that is pure JavaScript. You can turn any website into a webshop by simply loading its JavaScript, and then adding your products in the website HTML in the right way.
  * One evening, I thought "let's just try it, it's free in dev mode anyway", and within ~10 minutes I had a functioning workflow on an existing site!
* Printify is a POD (print-on-demand) merchandise platform. With no upfront cost---they simply take part of your earnings---they will print and deliver physical goods designed by me.
  * There are _many_ such POD platforms for physical goods, mostly merchandise. Not all of them offer an API, however, nor the freedom needed.
  * Printify was simply the one with the best functionality for me, the best reviews, the biggest offerings, or a website that didn't look like a toddler vomited on it. I briefly tried a few others, such as Printful, but that lead nowhere.

## How is this supposed to work?

You can view the different systems as having a "employer-employee" relationship.

Snipcart is the **employer**. It's by far the easiest, friendliest, fastest system I've found to _manage_ orders, payment, users, fulfillment. By adding a few JavaScript and HTML snippets to my website, it can ...

* Add products to a cart. (Including lots of common features, such as metadata for size, quantity, different variants, is it a gift or not, etcetera.)
* Then use a secure, common payment gateway to let someone pay for it.
* And then update the orders with all the necessary information, creating a nice overview for me on the dashboard.

{{% remark %}}
These products don't even need to be defined beforehand. The HTML of that buy button _is_ the product. Of course, Snipcart has many checks to ensure nobody tampered with things and ordered something impossible.

This confused me for a few seconds, though, as I desperately searched for the obvious "Add Product" or "Create Product" button that doesn't exist!
{{% /remark %}}

Notice, however, that _fulfilling_ those orders isn't a part of this. Snipcart is not a merchandise seller, or a printer, or a shop. It's a system that _manages_ everything around it.

The only thing that Snipcart can handle on its own are **digital goods**. I can upload files to their system, then get back a unique ID for each. In my shop, I can add that ID to the product, and the system will automatically mail the URL to the file upon purchase.

But what about **physical goods?** That's where our Printify "employee" comes into play.

Once Snipcart receives an order marked as physical (by me, in whatever way I want), it should tell the Printify employee to run off and actually _fulfill the order_. Snipcart isn't doing anything else for the fulfillment of the order. It's now up to Printify to do it all and inform us when something changes.

{{% remark %}}
Again, any other service with an API would be fine too. As long as Snipcart can communicate with the other platform, you should be good.
{{% /remark %}}

## A crucial example: Payment

It took me some time to wrap my head around the things I explained above. When I checked the "API Documentation" for several of the big merchandise platforms, I couldn't find a few things that I was looking for.

For example: **payment**. I couldn't find an API to redirect users to the payment page, or to accept payment, or _anything_ related to it. Odd. Really odd. Seems like pretty much the most important thing, doesn't it?

Until, after some more reading and research, I realized the following: when you do a custom integration, _everything_ needs to be custom made by you (including handling payment).

More specifically,

* The Printify API only _creates_ and _returns_ order information.
* Once an order is created, the platform will automatically execute the whole shebang: process, create product, package, ship. 
* It will also **send you an invoice** for the costs incurred in doing so.
* It is up to **you** to actually collect payment from the buyer. (And, obviously, to make sure the price is high enough to actually turn a profit here.)

In other words, if you go the custom API route, you will let people pay some other way ("directly to you"), then pay back the costs to your platform later. When all is said and done, you are left with your "profit margin" in some PayPal account or whatever.

I realized this after finding a few sad stories online. People who didn't get this workflow and lost thousands of dollars. How? Well, they connected the API to automatically _create_ orders (which Printify then happily accepted and fulfilled). But they assumed Printify would also ask for the payment and just give them whatever profit remained. As such, they never actually asked or held payment from the buyers, while Printify had already made the products and was now asking its money back.

That's not how these things work. Printify will make whatever (valid) order it receives, then ask you to pay the _cost_. _You_ have to make sure that you've been paid before sending that call to Printify to create an order.

> **LESSON LEARNED:** Snipcart is the thing that collects payment. The API of a merchandise platform _skips_ that step and allows directly creating custom orders, custom products, custom anything. ("With great freedom comes great responsibility")

> **LESSON LEARNED**: While testing API, make sure order fulfillment is set to MANUAL. This way, you can send all sorts of mock orders to Printify, and then just cancel them. (Different platforms might have stronger or different methods for "testing" or "safe mode" or whatever.)

Knowing this, I started to get a clear picture of the general workflow needed ...

## The General Workflow

In our linked, custom webshop system, this is the flow of each order.

* Printify merely contains all products I designed and made available. It's not present on my website; this is all managed from _their_ website and interface.
* Snipcart _is_ included on the website. It automatically allows displaying products and adding them to a cart, natively.
* If someone **buys** their cart, Snipcart securely collects payment, then finalizes this order.
* Now the API cycle starts!
  * (->) Snipcart should inform Printify to actually start making that product.
  * (<-) Over time, Printify will inform Snipcart about updates ("order shipped", "order delivered") it should make to the order data.

I really like the two-way arrows here. It helped me a lot while writing the actual code.

Our code that links the systems should handle information traveling _both ways_. Snipcart tells Printify about new stuff to do. Printify tells Snipcart about the progress of those things. Back-and-forth it goes until an order is completely fulfilled and delivered.

_How, though? What is that code?_ Let's dive in.

## The world of HTTP Requests

When working with APIs and backends (on the internet), you're basically reading and sending HTTP requests all the time. They're far too diverse and complicated to explain here, but I'll give the summary that I needed to understand this.

A "HTTP Request" is just a call to any URL. 

When you visit a website, you're also simply "requesting" the web page at that specific url. That kind of request is a `GET` request, the simplest and most common one. You simply want to _get_ whatever is at the URL.

Whenever you just want to _get_ some information from an API, that's all you usually need to do. Get the specific URL you need, then send a `GET` request, and read the response. 

{{% remark %}}
Many APIs use the _url_ to differentiate information. As you'll see later, for example, you need to append your unique shop ID to the _url_ to get only the products available in _your_ shop. But because of this, you don't need to send any more information along or do anything else---that one GET request gives you what you want.
{{% /remark %}}

But what if you want to signal a system that it should change or update something? Then you use a `POST` request. You send actual data along (the "request body"), and if you did it right, the other system will accept it and process your wanted change.

Less common types are `DELETE` (for example, remove a product from your store by sending a DELETE to its specific URL) and `PUT` (directly update/replace information). The difference between `POST` and `PUT`, is that the first one just accepts general data and then does more processing or checks, while the latter one instantly sets data to your new values without doing anything else. In short: "POST" requests are _handled_, while "PUT" requests are just _executed_. 

The actual content of your request is the **"body"**. If you request a webpage, for example, the body _is the actual page_. The text, the images, the elements you're seeing on your screen.

Every request, however, also has **"headers"**. This is metadata _about_ the content that's sent along. Often, the errors and bugs are _here_, because very specific headers make requests work in very different ways.

For example, the `Content-Type` header explains how to process the content in the body. For webpages, this is set to, you guessed it, website language. But on the backend, where we'll be working, we obviously don't use that. Instead, basically all APIs use **JSON** as the content type. If you don't set your requests to _be_ and to _accept_ JSON, that's your first mysterious failure already!

Similarly, these headers are used to _validate_ requests. To make sure something that hits our webshop is actually from Snipcart/Printify and not some other (evil) source. You can make a perfectly functioning webshop _without_ validating HTTP requests ... but for how long? :p

The most common way to quickly execute---or check the magical workings of---HTTP requests is the command line tool **curl**. It's installed by default on any modern Windows machine. With it, you can experiment and play with sending API requests (to Snipcart/Printify), without needing to do so on your website/server. (To a limited extent, of course, as I'll explain below.)

With all that said, you should be prepared for what's about to come.

## Serverless Functions

My websites are all hosted on CloudFlare Pages. I'm minimalist enough to _easily_ fit on their free plan with all my websites. That same free plan also allows 100,000 code executions on the server per day.

So far, all my websites have been completely "frontend". My websites are static sites that are simply built once on the server, and then all the final webpages are just flat files presented to the visitor.

A webshop, of course, is dynamic. The orders must constantly be updated. Signals must be sent, even when no visitor is present.

At the same time, I really adore this "static website" setup. It's far faster, easier, and more secure than the typical "shared hosting" systems I used years ago. It's so efficient that I've been hosting massive websites for free, for years. I don't _want_ to actually buy space on a server and get full access to the server.

> **LESSON LEARNED:** There is **no way** to run a custom webshop purely on the front end. You need to be able to access/execute functionality on the server, and dynamically manipulate it. Moreover, you need secret passwords/keys to authenticate all you do, and you _can't_ keep things secret when they're on the client-side of your website.

{{% remark %}}
In the case of Printify, it doesn't even ALLOW any calls that are not made from server side, or not from the same domain.
{{% /remark %}}

So, what do we do? We use a "Serverless Function". A special piece of code that runs _on the server_, despite the rest of the website being static.

In the case of Cloudflare Pages, creating one is really simple.

* Add any JavaScript file(s) inside a `/functions` folder in the root of your project.
* Within those files, export an `onRequest(eventContext)` function.
* Whenever something hits our server with a request, that specific piece of code is called! (This registers as 1 "execution" towards our limit.)
* As such, within that function, you can read, manipulate, and respond to all those requests.

Now we're getting somewhere. Within that "Serverless Function", I need to do two things.

* If we get an update from Snipcart, relay it to Printify.
* If we get an update from Printify, relay it back to Snipcart.

As is often the case, the Serverless Function becomes the "middle man". The thing that connects the two by listening and reacting in both directions.

Relaying or SENDING my own updates is quite easy. JavaScript has the Fetch API which is extremely straightforward. You give the (API) URL it should call, you give the data to send along, and you await the promised result.

{{% remark %}}
I'll give actual code and details later, for now we're trying to understand the general idea.
{{% /remark %}}

As such, the final big question becomes: _how do we GET those updates from Snipcart/Printify?_

## Webhooks

The name "webhook" explains itself. It allows you to _hook_ a system into another URL. Any event dispatched by the system is now sent to _that URL too_.

More specifically, I can ...

* Set a webhook in Snipcart to the URL of my serverless function.
* Whenever anything changes---order added, order deleted, order updated---it now sends a signal to my function.

In my case, my serverless URL is just the name of my website, and then the name of that JavaScript file behind it. No trailing slash. For example, if my function was in `functions/whatafunction.js`, then the webhook would need to point to `pandaqi.com/whatafunction`

If I tell Snipcart/Printify to _hook_ into my serverless function, then we're done. The cycle is complete. Whenever something happens, my function runs and informs the other party.

Okay, now I've explained all the necessary ingredients. I've basically given you the recipe and the general end product we want to pull from the oven.

Now what are the specific numbers and steps? What are the details on how to do this? Below, I will put the steps in the order that seems most sensible to me, and I will give as much code as I can without overwhelming or straying into the territory of not-so-important details. Oh, and also without giving away my own secret API tokens, of course.

It's still a simplified and summarized version of the code and processes, though. Don't assume the code you see here is _exactly_ my setup forever and that's it.

## The Implementation

### Get your tokens

In the Snipcart interface, go to API keys. Create a public one (you need it for your actual frontend shop), and a private one (keep it secret at all costs, needed for your API code).

In the Printify interface, go to Account > Connections and create a secret API token.

It's easiest to already create your Serverless Function JavaScript file, and simply save all these secret tokens as `const` variables at the top.

> **LESSON LEARNED:** Generate your tokens, then keep them in secret but easy to reach places. They're important; you need them a lot.

### Get your other information

Snipcart **doesn't** need anything else. Their API is structured around direct calls based on the unique IDs of orders, files, and more. You don't need a "user ID" or "shop ID".

Printify **does**. But it doesn't really have a dashboard or interface for its custom functionality. As such, you already need its API to get or set some crucial things in your shop! (As in, there is no button on their website to simply do that.)

First, you need to get your **shop ID**. (Assuming you already created a shop on Printify, which is just a button press on their website.) I wish they'd just display it next to your shop name, but alas.

How? Open a new Command Prompt. Then send an API request for your ID.

{{< highlight bash >}}
curl -X GET https://api.printify.com/v2/shops.json --header "Authorization: Bearer YOUR_SECRET_TOKEN"
{{< /highlight >}}

This returns some details about your shop(s), including the ID! Save it in your Serverless Function too.

{{% remark %}}
If this works, you know things are set up correctly. If it doesn't, you need to figure out why not before continuing any further, as all further work will probably fail too.
{{% /remark %}}

### Set up your webhooks

In the case of **Snipcart**, you can just go to the Dashboard > Webhooks > Enter the URL. _All_ events are sent to it, though you can have multiple URLs receive it.

> **LESSON LEARNED:** Be wary of letting Snipcart ruin your serverless function budget. Snipcart basically sends 2 API requests for _any_ change. One is the actual change, one that a notification was created. And it sends them _all_ to the function, instead of being able to listen to just one.

For full information, visit the [Snipcart Webhooks Documentation](https://docs.snipcart.com/v3/webhooks/introduction). 

At the end, it also explains how to validate/secure it using those request _headers_. Check if the Snipcart token matches the one that validation gives you, and you're good.

{{< highlight js >}}
// perform handshake to see if it's legit (secret tokens only valid for 1 hour)
const snipcartToken = eventContext.request.headers.get("X-Snipcart-RequestToken");
if(!snipcartToken) { return; }

const snipcartURL = `https://app.snipcart.com/api/requestvalidation/${snipcartToken}`
const response = await fetch(snipcartURL, {
    method: "GET",
    headers: {
        "Authorization": `Basic ${ btoa(SNIPCART_PRIVATE_TOKEN) }`,
        "Accept": 'application/json',
        'Content-Type': 'application/json',
    }
});

if(!response.ok) { return; }

// good to go!
{{< /highlight >}}

In the case of **Printify**, you need to create the Webhook through their API too. This is a bit more work, but it allows you to be more _specific_ about what it should listen for, which saves resources and prevents errors. At time of writing, this means ...

* A POST request 
* To the url `/v2/shops/{shop_id}/webhooks.json`
* The data you send along is an object with two properties: `topic` is the event to listen for, and `url` the serverless function to inform.

To try this from the command line, do ....

{{< highlight bash >}}
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer YOUR_SECRET_TOKEN" \
     -d '{ "topic":"order:created", "url":"https://mywebsite.com/serverlessfunc" }' \
     -X POST https://api.printify.com/v2/shops/{YOUR_SHOP_ID}/webhooks.json
{{< /highlight >}}

I don't like having these things be "hidden". I want an easy interface that lists them all and allows adding/deleting, _especially_ while I'm still testing and using "fake" domain names and stuff. But it is what it is.

As I tested and developed these systems, I simply validated the calls by checking if it came from their exact API URL. They admit that this is also a way to do it, though it's obviously not the best.

How should you _properly_ authenticate any signal from Printify (or most other webhooks you'll ever use)?

Well, their method of validating their calls is a lot harder to execute, even if only because they don't fucking explain it properly! Only once I started implementing support for a few other POD providers (such as Printful), did my brain make some connections between their explanations and figure out how it actually worked.

This is how it works.

* First, create your own secret key. This can be _anything_. (They propose using a simple command line tool to create a hash.)
* Save this secret key as an _environment variable_ on your server. You can now access it with `env.SECRET_KEY_NAME` inside the Serverless Function.
* When REGISTERING the webhook, you SEND THAT KEY ALONG using the `secret` property. This is how you tell them what it is, and they will store that secret with the webhook on their systems.
* When RECEIVING a signal, Printify sends an extra header called `x-pfy-signature`. To verify the signal is real, you must check if that signature matches what it _should_ be. How do you know what it should be?
  * Take the _body_ of the request and _hash_ it with an HMAC-sha256 hash, using that secret key (that you shared with Printify) as the hashing key.
  * Take the hexadecimal representation of this.
  * That signature (`sha256=HEXREPOFSIGNATURE`) should be identical to what Printify sent you.

Other platforms (such as Printful) do it the other way around. They will GIVE you a secret key when registering a webhook, and then you save _that_ in your server environment. Everything else remains the same: hash the request body using that secret key, then check if the end result matches what was given.

In code, this looks as follows.

{{< highlight js >}}
const generateSignature = function(secretToken, messageToSign)
{
  const hmac = crypto.createHmac('sha256', secretToken);
  const sig_2 = hmac.update(messageToSign);
  return sig_2.digest('hex');
}

const printifySignature = eventContext.request.headers.get("x-pfy-signature");      
const secretToken = env.SECRET_TOKEN_PRINTIFY;
const expectedSignature = generateSignature(secretToken, eventContext.request);
const isValid = (expectedSignature == printifySignature); // if true, congratulations!
{{< /highlight >}}

This is simply _not explained_. All explanations of this system (from the multiple APIs I checked) somehow _assume_ you know exactly how this works and where to look, by saying things like "After sharing your secret with Printify" and never saying another word about _how to do this_. They give a single example of how to use Python to Hash things in this incredibly specific way ... and never mention anything else.

Yes, I'm frustrated. This took me a loooong time to figure out.

> **LESSON LEARNED:** Webhook validation is important, as otherwise hackers can just send fake requests to your API. When REGISTERING the webhook, you either give or receive the secret key, which you store in your server environment variables. For every signal received, now HASH the event body with that secret key, and check if it matches the signature (given in a simple header) from the platform.

### Webhook Events

Which _specific_ events are we listening for?

* For Snipcart, I only care about `order.completed` It means a new order was successfully placed and paid---it's not "order fulfilled".
* For Printify, I care about a lot more ...
  * `order:created` => if so, send a signal to Snipcart that the order is now processed
  * `order:updated`, `order:sent-to-production` => send signals to Snipcart in case I must update some relevant status
  * `order:shipment:created`, `order:shipment:delivered` => send signals to Snipcart to update status, but also _other_ data such as package tracking number

Or you can view the full list of [Printify Events](https://developers.printify.com/#shop-events) and [Snipcart Events](https://docs.snipcart.com/v3/webhooks/order-events).

If you're interested in automatically generating/launching new products, for example, you'll be interested in the other parts of their API. For me, though, I was fine with just using their website interface for those parts.

This is the "webhook" part. It's about simply letting the other platforms know how to reach _us_. Our function is now getting hammered with these requests, but doing nothing with them!

Now it's time to actually respond and send out some messages of our own.

{{% remark %}}
I considered making different Serverless Functions ( = different JavaScript files in that folder) for the different signals and functionalities. But I decided against it. The code isn't long enough to really warrant it, while it would put the different parts in different places and create more possible silly errors---all while I was still learning how all this actually works.
{{% /remark %}}

### Snipcart -> Printify

Okay, we've received a request _and_ validated it. (We are sure it's from Snipcart.) Then we can start to parse it.

First, check if it's the event we're interested in.

{{< highlight js >}}
const json = await eventContext.request.json(); // turns request body into usable JSON object
if(json.eventName == "order.completed")
{
    // act on order completion
}
{{< /highlight >}}

Then, check all the items inside the order and which ones require physical goods. When placing these products on my webshop, I have to add the custom metadata that Printify needs to know as "custom fields" to Snipcart. This ensures they are sent along with the order.

The data Printify _needs_ to know per item, are the product ID (which I can find in the interface, or through the API if I want), and the variant ID (e.g. if it's a shirt, what size, what color, what fabric, etcetera). The quantity too, of course, but this is automatically tracked by Snipcart already.

{{< highlight js >}}
const merchandiseItems = [];
for(const item of json.content.items)
{
    const isMerchandise = item.categories.includes("merchandise"); // this is merely how I check it
    if(!isMerchandise) { continue; }

    const quantity = item.quantity ?? 1;
    const printifyProductID = item.customFields.find(elem => elem.name == "printifyId"); 
    const printifyVariantID = item.customFields.find(elem => elem.name == "variantId"); 

    const itemData = {
        product_id: printifyProductID,
        variant_id: printifyVariantID,
        quantity: quantity
    };
    merchandiseItems.push(itemData);
}
{{< /highlight >}}

If this list is empty, then there are no physical goods and we're done. If not, we have to turn that into an actual order for Printify.

{{< highlight >}}
const printifyData = {}; // explained below
const printifyURL = `https://api.printify.com/v2/shops/${ PRINTIFY_SHOP_ID }/orders.json`;
const response = await fetch(printifyURL, {
    method: 'POST',
    headers: {
        "Authorization": `Bearer ${ PRINTIFY_PRIVATE_TOKEN }`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': PRINTIFY_USER_AGENT,
    },
    body: JSON.stringify(printifyData) // notice how we must turn all data back into a JSON string before sending!
});
{{< /highlight >}}

The format (key names and expected values) of the data depends on your platform's API, and specific products/orders, and might change. There's no use copying that code here. 

All the information the platform needs, though, should be given by the Snipcart order at this point!

* Address, name, email, etcetera are all saved on the order.
* A lot of things are named identically (such as `address1`, `address2`, etcetera) These can be copied directly.
* Otherwise you just need to manually add the value into `printifyData`

It's also easiest to simply use the `.token` and `.invoiceNumber` on the Snipcart data (the `json` variable) for the order ID and invoice at Printify.

This is, ignoring things like error handling, all that needs to happen. Snipcart is at the frontend of my website and allows paying + placing an order. Once it's definitive, it tells Printify what is inside the order. The employer is done; the employee now has to do the work on its own platform and in its own time.

As it does that work, though, it will regularly emit some signals about the progress ...

### Printify -> Snipcart

This is the point where I was tempted to rant about how NOBODY EVER WRITES PROPER DOCUMENTATION FOR THEIR API.

But that's not true. Snipcart has good documentation and a solid system. Printify just ... vomits a pile of things their API can do, all on a single page, and it's up to you to figure out how to work with it.

First of all, I was afraid that nothing was working and I'd already crashed the system/reached its limitations with my very first test product. After creating it, I pressed "publish" ... and it kept saying "publishing" for days and days. It never "completed", to my eyes.

But when I used Printify's API, there it was! Whenever I requested any information about my store or its products, all my test products were right there, 100% functioning. After some more research and mock API requests, I learned my next lesson.

> **LESSON LEARNED:** When you've set your Printify store to "custom" (or, rather, your "integration" to API), the rules change. There are things you can or can't do in the interface. Most importantly, "publishing" DOES NOTHING. It will just keep saying "publishing" forever, but nothing is actually wrong and your products can be bought just fine. 

Why is that? Because the idea of publishing---turning a draft product into a visible, buyable one---only makes sense for the integrations. When you've connected your Printify store with, say, a default Shopify host, this is a necessary and logical step. You create products as a "draft"; they only appear (automatically) on your shop once you "publish" them.

But with a custom store, _you_ are 100% in control of what you show. So "publishing" a product just means ... adding it to your website. This step means nothing anymore, and that's why it does nothing if your integration is "API". 

{{% remark %}}
Nevertheless, this is silly and they should at least remove that publish button/explain this. Now everyone who uses the API, but also wants to do some things through the interface, will be afraid they're breaking stuff and everything goes wrong. Even though, ironically, the system is working flawlessly.
{{% /remark %}}

Now that I had some more experience with its API, though, I could finally see how to take this last step.

You see, we have an annoying issue here. One that got me stuck for many hours.

* When Printify sends a signal that a product has changed, it sends back the _product ID_, the change, and a _unique event ID_.
* None of these things ... tell me anything about the Snipcart order that belongs to it!
* So, at first glance, it seems there is no (easy) way to "connect" the two. To read the incoming signal from Printify and know "ah, so THAT Snipcart data needs to change"

The naive solution would be to simply ask for ALL Snipcart orders, then search the entire list for some matching data. Basically, the server would have to do lots of calculations _every time_ to connect the two orders on different systems again. I was almost tempted to _try_ it, but I _knew_ it couldn't be the way to do it.

After a while, I noticed something in that mess of API information by Printify.

* When new orders are _created_, you can send an `external_id` with it. In fact, it's the very first value in their data, and their example id looks suspiciously like the unique Snipcart order tokens.
* When you _retrieve information_ about an active order, buried in all that information, you get this `external_id` back! There it is, our unique number that _links_ the two orders!

The reason I couldn't find it for a while, is because it's in a really weird place. I'd expect there to be another `external_id` in the order info---you know, just like what we _put in_. Why not have the output be a mirror image of the input? Wouldn't that be logical and intuitive?

Instead, there's a small `metadata` object, which has a `shop_order_id` inside. That's the one you need. (The other metadata entries basically confirm that this was "external" and "set through the api".)

> **LESSON LEARNED:** Printify (and other APIs) natively support setting some external ID on orders, precisely _because_ the API is meant to be used with an external webshop managing stuff. That number/string/token is the one thing you need to let different systems communicate about _the same order_ (efficiently).

In practice, what does this code look like?

First, we'll read the incoming Printify signal and collect the changes that we need to make to the Snipcart order.

{{< highlight js >}}
const json = await eventContext.request.json();
const eventName = json.type;
const newData = {}

// add more else if statements same for other events, as needed
if(eventName == "order:created") 
{
    // ... simply update the newData thing to translate Printify's terminology about orders to that of Snipcart
    // ... in this case, only three properties can be changed on the fly: status, trackingNumber and trackingURL 
}

const changeNeeded = Object.keys(newData).length > 0;
if(!changeNeeded) { return; }

// TODO (next part): actually apply it
{{< /highlight >}}
    
Then, we need to apply those changes. As explained above, this requires two steps:

* First we need to ask Printify for _full_ information for this order, which includes the externalID we're after. 
* (Many APIs, from other platforms, immediately GIVE this external ID in the first place. So we don't need an extra expensive call for data. Which is far more efficient and intuitive, but Printify made some weird API choices if you ask me.)
* Then we use Snipcart's API to update that specific order to the `newData`

In code, leaving out any error handling and small details,

{{< highlight js >}}
const resource = json.resource;
const resourceID = resource.id;

// get full details
const orderDetailsURL = `https://api.printify.com/v2/shops/${PRINTIFY_SHOP_ID}/orders/${resourceID}.json`
const orderDetails = await fetch(orderDetailsURL, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${ PRINTIFY_PRIVATE_TOKEN }`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': PRINTIFY_USER_AGENT,
    },
});

if(!orderDetails.ok) { return; }

// apply the necessary changes on the matching order on Snipcart's side
const orderToken = orderDetails.metadata.shop_order_id;
const snipcartURL = `https://app.snipcart.com/api/orders/${orderToken}`;
const responseSnipcart = await fetch(snipcartURL, {
    method: "PUT",
    headers: {
        "Authorization": `Basic ${ btoa(SNIPCART_PRIVATE_TOKEN) }`,
        "Accept": 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData)
})

if(!responseSnipcart.ok) { return; }

console.log("Successfully updated Printify->Snipcart for order", orderToken);
{{< /highlight >}}

All in all, this code is quite short and simple. While being wildly inefficient at the moment---I can prevent repeating typing the same HTTP headers, for example---it's only 237 lines of code.

It just took me a while to figure out what exact steps to take, and which numbers to use where. This is partially a learning experience, and partially just the very crappy way Printify explains its own API and general workflow.

### Conclusion

Bringing it all together, we're looking at the following workflow for our webshop.

* I can create products in Printify using their tools and interface.
* Then I define the products using simple Markdown files (with frontmatter) on my static website. I give it the usual data (title, price, etcetera), but also a few extra properties that hold the product and variant ID of the corresponding Printify item.
* Using Snipcart, these things "automagically" get a buy button, can be put in a cart, can be bought, and show up in my dashboard.
* As this happens, 
  * Snipcart sends out 2 signals. The "order creation" event sends a single API call to Printify.
  * Printify sends back ~6 signals over time (from start, to shipped, to delivered). When they do, my function does some very rudimentary processing, then makes 2 more calls (one to Printify and a final one to Snipcart). This creates 2 more signals from Snipcart (unhandled).

This means, for each order, about 8 executions of my Serverless Function. Within those executions, we're looking at about 10--15 calls to the Printify and Snipcart APIs (combined).

I think that's nice and minimalist. 

* As stated, Cloudflare Pages allows 100,000 executions on the free plan per day. Unless I complete 10,000 orders in a day, we're going to be fine.
* Similarly, Printify has an upper limit of 600 API calls per minute. Unless I handle at least 60 orders in a minute, we're going to be fine.

{{% remark %}}
I think CloudFlare's limit is a generous one. You won't find any place that gives you unlimited serverless processing for free because, well, it literally means a server is running all day waiting to respond to lots of requests, which can quickly get out of hand. Also, I'm fine with going over this limit. As that clearly means my webshop is far more profitable than what my hosting could ever cost.
{{% /remark %}}

Of course, the "cost" of being so free, custom and minimalist, is that I have to input all my products _myself_. But that's absolutely fine: I want to do that anyway.

* By inputting all my products as their own Markdown files, that data is easily accessible on any device, takes up as little space as possible, while being fully compatible with my static site generator and my existing websites.
* By doing this, I get _full control_ over what shows up, and how, and what you can or can't order, and more. I am not bound to a given interface from some other integration, and what features they do or don't support. (And, as always, any unexpected changes to that provider that might suddenly ruin me.)
* Finally, by doing this, I can't be tempted to go overboard by adding way too many products, or variants of the same T-shirt, or anything else that the world doesn't need.

There's benefit to making something slightly harder and more manual. There's benefit to restricting yourself in smart ways. I've always tried to find the right balance there.

For example, as I tested this API, it _scared me_ how easily you could place orders for hundreds of dollars on Printify. Just one API call away. And by default, of course, everything is set to "automatically buy, automatically ship, automatically bill, bla bla". If I hadn't turned things off first, one accidental press of the Return key might have suddenly landed me with a 100 dollar debt.

Giving away your hard-earned money _should_ be a bit hard. Selling things _should_ take a bit of effort. To make you conscious of what you sell, what it's worth, and give products their due attention.

Anyway, those are my personal views on this. I'm sure many people have become very rich by 100% automating this entire process with the API---especially because I see how easily you can get there now. Good for them. This article isn't for them.

## Polishing into a final product

Now we have a "functional" shop. But does it look good? Is it a proper shop? Not yet.

### Presentation

At this point, I struggled most with how to _present_ the merchandise. I wanted to support a few "logical" variants, such as different _sizes_ for clothing. 

I ended up coding my own little "widget" for this, as I've done many times in the past for other custom/weird things my websites do.

* With a single "shortcode", I can add that widget to any page on my static website.
* It reads the different variants (name, image, price) from the metadata I set. (I set this _manually_---after making the products, I read back the numbers and simply type them into the product page.)
* And puts them into a nice Snipcart-approved layout. So people can switch between them, but also directly add the variant they want to their cart.

Because it's just a "module" I can add anywhere, this allowed me to really blend the products with the rest of the website. Use its native styling, instead of feeling like an ad or a scam. As you find the official page for a book series of mine, for example, there's simply an extra block showing you nice shirts to buy with characters from the book.

I did decide to "simplify" a few designs of my other websites. I deemed them a bit _too_ playful and colorful, and it clashed a bit with the more serious and professional nature of showing things people can buy for 50+ euros.

### Taxes, Shipping & Refunds

This is another can of worms. Another clash of personal views and simple practical wisdom.

The current climate of "buy lots of stuff, return the 99% you don't want" is incredibly stupid and harmful. 

Similarly, the current climate of "I want my \<insert completely useless tiny plastic-souvenir-thingy\> the SAME DAY I ordered it!" is equally stupid and harmful.

We're not done yet: the climate of making products dirt cheap, and then actually making profit on ridiculous shipping fees, is _also_ stupid and harmful.

Things arrive when they arrive. When you buy something, it should be rare that you want to return it or get a refund. Shipping shouldn't add a surprise 20+ dollars to, well, anything, but certainly not an item that cost 20 dollars in the first place.

I know, I'm probably losing sales this way, but I feel it's the only responsible way to run a webshop.

As such, from the start, I decided that ...

* No, refunds or "free returns" just aren't a thing. Print-on-demand just doesn't work with it, nor do digital goods. For all reasons stated above, and many more, I decided to ignore this for now. (I did research on how to handle or implement this, and unfortunately the answer was to be expected: if you offer refunds as an indie store/POD seller, you just really hope nobody uses that opportunity, for you are simply fucked. Lots of work on your end for no gain.)
* I'll let Snipcart calculate _default taxes_ (for country of buyer), but do nothing more. This simplifies everything for both me and the buyers.
  * This comes down to turning one built-in tax integration "ON" (instead of OFF). I chose TaxJar.
* I'll _always_ use Economy shipping + print as locally as possible. Cheaper for buyer, less impact on climate, and it "arrives whenever it arrives".
* I've set everything to Europe, euros, and my business residence here in the Netherlands. This means that anyone in Europe should have much more accurate and favorable prices, with things being printed (relatively) nearby. Sorry, folks in America! But that's not where I live, and I don't want to mentally convert USD to EUR all the darn time.
* I'm obviously not going to join the game of stuffing my titles and descriptions with keywords or AI-generated garbage. My products just have a succinct title that says what it is, plus a succinct personal description with the story behind it or reason this thing exists in the first place.
* Extra versions or variants of products are "by popular demand" only. I make (at most) a handful of variants for a product---the most logical or useful ones I see. This allows me to input those products manually on my websites and display a few options. But I'm not wasting energy, space, whatever on providing 200 different colors for every single T-shirt.
* Shipping is included in the price of all items, and I clearly tell customers that. Something like: "Shipping is free. Expected shipping costs are included in the base price of all products. We chose this method to make the items the same price for everyone, and because shipping costs can't be properly predicted, as our system will select the cheapest and fastest provider once the order is already placed." 
  * Research shows that people are way more annoyed by sudden shipping fees appearing at the end, than all items being a bit more expensive from the start. (Especially when shipping fees can be a ridiculous 20+ euros ... or not ... there's no certainty here at all!)
  * It also encourages buying more at once.
  * It simplifies my life.

I actually coded an integration that would calculate shipping fees on the fly. Just to learn how to do it, and see what was possible. And ... it was messy, slow, and still not exact because the buyer might not enter their billing address for a while. There's a huge amount of uncertainty here, as it really feels like platforms are quite random with their shipping fees. On top of that, Printify's API documentation is pretty garbage and doesn't include a streamlined/easy way to quickly get the exact shipping fee :/

Also,

> **LESSON LEARNED:** The Shipping Webhook Endpoint is a _different setting_ from the usual endpoint! This is nice, because it allows you to pick a different serverless function just for that. But it's also crucial to know in case you're confused why shipping rate fetching isn't hitting your usual webhooks.

The danger here is that I might actually _lose_ money on certain orders. If they order all the wrong items, and live super far away, and there's a holiday surcharge ... then shipping fees might be so high I don't actually recoup costs. 

I've learned to "accept" risks in business like that.

{{% example %}}
I actually learned this just by _watching_ my father lead the local theatre when I was young. Before he arrived, they had _loads_ of employees and systems running to make sure absolutely nobody got into the theatre without paying for a ticket and sitting on the right chair at the right time. 

He simply ... stopped doing that. He posted a few employees at the doors to _help_ people who, for example, couldn't find their seat. But you weren't rigorously checked, the vibe wasn't one of a prison anymore.

The result? Yes, from time to time, we'd notice a few girls sneaking in and giggling because they didn't have a ticket. For the most part, though, the theatre became _more_ successful. Less money and manpower was wasted on all these checks, while the theatre became far more accessible and friendly. My father actually led the theatre out of a severe debt---which they'd kept secret when he applied for the job---in a few years.

All this to say: accept that there'll always be a few people profiting or a few unlucky deals. Don't let that fool you into the demonstrably unproductive, short-sighted mind-set to ASSUME everyone else is a thief before you even met them.
{{% /example %}}

In all of this research (mostly about shipping fees), however, I discovered one crucial thing that Printify tried to hide in a footnote somewhere.

> **LESSON LEARNED:** Order Routing improves the customer experience, and Printify's bank account, but does absolutely nothing for you. The shipping fee is _not changed_.

Yes. They literally charge you a very high shipping fee, then actually ship the product for less (because it's printed nearby), and pocket the change. Great. This discovery was basically the final nail in the coffin that made me abandon shipping fees entirely and just mark up products enough to cover whatever happens there.

### Email

When I first tested the Snipcart system, it told me that the "test order" was successful and an email was sent. But no email arrived.

After some frustrated searching, I realized you could view "developer logs"! The very last item in the right-hand menu of Snipcart.

After clicking that, it revealed the issue: "Without a paying Snipcart subscription, only registered account users can receive operational emails."

In other words, I just had to use the gmail account from my Snipcart account (instead of the other email address that I own) as user data in my mock orders. When I did that, it worked flawlessly.

Although ... every mail provider thought the emails were suspicious. After some more searching and trial-and-error, I realized it was because it "sent" the emails from my default email address. The one I used to setup the Snipcart account, which is just my Gmail address for business-related stuff. Obviously, sending email from a test website ... while pretending it's from a gmail address ... is going to raise red flags when gmail receives that.

> **LESSON LEARNED:** Set up a proper, custom email address (from which to send invoices, handle updates, etcetera) that's based on your website domain. This is less likely to end in the spam folder or otherwise go wrong, while looking more professional. It also helps you track what happens where, or where certain issues/invoices came from.

I _had_ tons of custom email addresses before, when I hosted my websites on a more traditional shared hosting. (I used WordPress then. And some completely custom websites that I'd drag-and-drop onto that server.) 

Without that hosting, however, I have no space or system to manage email! When I dropped that and switched to cheaper static hosting, I had to let go of all those email addresses and start doing everything from a few Gmail addresses. Although, frankly, I also dropped them all because it was a _mess_ to have so many email addresses for so many things.

Instead, I've now learned the smarter approach. 

I have a few "free" email addresses behind the scenes. I used to use Gmail, but I've slowly moved to Proton for more privacy and security.

Each email address has a clear different purpose and is actively used. But on the frontend, my websites display a custom email address (such as "harmonize@tiamopastoor.com") that is simply _forwarded_ back to those main addresses. This way, most people see a custom and trustworthy email, and can use that without issue. 

In Snipcart, you can use their Sendgrid integration to make all the _automatic_ emails their system produces more professional and credible too. 

You can use their shared system, for which you only need to verify your _domain_. (By adding specific records to the DNS records of your domain, you can prove that it's allowed to send those emails.) 

Or you can sign up (for a free plan, if you're not too successful) and use your private Sendgrid key to _fully_ control those emails and send them from a custom domain.

> **LESSON LEARNED:** CNAME records (at least on Cloudflare) can only be read/verified from the outside if they are NOT proxied. (And the name should NOT contain the domain name too). This was necessary to verify a custom domain for mails/sendgrid stuff.

I decided to sign up, because it allowed me to also _reply_ to people---send outgoing emails that are not part of the webshop automated system---through a custom email address. That's not strictly necessary, though. Once you're actually engaged in mail conversation, it has become personal or more important anyway, so I'll use another email address.

{{% remark %}}
Also, my first and main email address is literally my name, so it's not like people aren't guessing that :p
{{% /remark %}}

In any case, I was confident I could stay well below the limits of a free Sendgrid plan. It took me half a day to clean up my old email mess, set up all the new forwarding and custom emails, and integrate it to get automated Snipcart emails that all other email clients "trusted".

To be honest, I only keep some of my gmail addresses because I need the 15 GB Drive Storage. I've made _so many_ things that I'm giving away for free (such as huge PDFs with high-resolution material for boardgames to print) that I desperately need that free storage.

### Payment Gateways

Snipcart allows multiple popular payment processors. But it only allows _one_ of them at a time. This might seem unnecessarily limiting, but it's really not. All those payment processors already "aggregate" different sources, or work in a way that allows them to cover as much ground as possible. That's, kind of, their whole reason for existing.

In Europe, there's a clear winner for me: Mollie. It's used by most of us here, because it supports all the dozens of different payment systems used in different countries here. 

{{% remark %}}
It's funny. Americans never quite realize how diverse and/or fractured Europe is because of all the different countries and cultures! In my experience, most things are handled _completely differently_ in Europe compared to the USA. This is both an advantage---most things are handled _better_ here---and a disadvantage---I have no clue about the intricacies of buying behavior elsewhere!
{{% /remark %}}

Mollie has especially good support for the system of the Netherlands. But it _also_ supports people elsewhere (through credit card, Paypal, etcetera), and it was much harder to find terrible customer experiences/reviews for them than for, say, Stripe. 

{{% remark %}}
The European Union is working towards a shared payment system for ALL EU countries. Nice idea. Knowing their pace of progress, they'll have a draft version in 10 years.
{{% /remark %}}

I went with Mollie. Within 10 minutes or so, I had it all set up, connected, and it was being verified. (I've had a personal business for a while, though, so I always have my details at hand: tax number, W8BEN forms, a clean passport picture, business bank account, etcetera. Without that, you're probably taking a lot longer here.)

### Surprise! Change of plans!

**Unfortunately, this is where I encountered a major set-back!** 

You see, Mollie only allows 1 "profile" per domain. Which completely goes against my plan to spread a single webshop over _multiple_ domains. I contacted them, of course, but their policy is clear.

Then I tried several things (such as using my portfolio as a "main entrypoint" from which you can visit all the other websites), but it just wasn't going to work. They have quite stringent checks on the validity of their customer's webshops, and they simply don't allow taking payments from a domain that's not registered as the profile's domain.

I am still happy with my general system and all the lessons I learned. This is _precisely_ why I wanted to do it this way: it's flexible. With my system, it took only 5 minutes to simply attach the entire webshop to a _new_ domain---a single one for everything I sell.

{{% remark %}}
And if I ever have the funds to own multiple Snipcart accounts, for example, I could just as easily spread the webshops again and do my original plan. Though I'm still a bit sad that Mollie doesn't just support my original, streamlined plan :p
{{% /remark %}}

Furthermore, because I own all the data and exactly how it's portrayed, I can _still_ integrate it easily with my other websites.

* I can "request" the product page from my webshop dynamically (using JavaScript). This simply uses that same `fetch` API, but now I'm requesting a public HTML page instead of some API backend.
* I can convert the response to HTML on my end.
* So I can execute simple queries to get the product data I want from my webshop.
* (When you actually click/buy that entry, that's when we move to the one and only webshop.)

Below is a simple example of how that works.

{{< highlight js >}}
const response = await fetch("https://my-webshop.com/product/123");
const body = await response.text();
const div = document.createElement("div");
div.innerHTML = body;
const productData = div.getElementsByClassName("snipcart-add-item").attributes; // this contains all the same attributes that I have to set on the product anyway for Snipcart to work
{{< /highlight >}}

Because we're using a static asset (just the webpage of that product), this isn't a Serverless Function call and thus doesn't "cost" anything. But in doing so, I can keep the entire webshop on that one verified domain, while dynamically offering relevant products on my other websites!

The more I pivoted to this system, the more I liked it actually. The webshop is _truly_ in a single place now, while still being natively integrated wherever else I need it for free. So ... I guess ... thanks Mollie for being needlessly restrictive?

Please note that, like all other fetch requests, this only works on a _server_. Trying this on your local machine, perhaps using the developer tools of the browser, will just lead to an error about invalid permissions.

{{% remark %}}
I actually realized this was possible thanks to reading Snipcart's documentation. They VERIFY every purchase with basically this method! By checking the data of the original HTML page, they can make sure nobody has sneakily altered data about the product or their cart/price.
{{% /remark %}}

## The actual products and shop content

Pfew. Let's recap. After aaaaaall that work,

* I had implemented a webshop layer that I could quickly attach to any existing static website of mine. (Or turn off again.)
* Through some webhooks and API shenanigans, it can sell digital goods on its own, but will use a different platform for physical goods. This all happens automatically.
* I made some pretty unique choices on how to present, price and offer stuff. Partially out of necessity (with my lack of funds and desire for freedom), partially because it just fits my personality and what I think is better for the world.
* I spent some time setting up custom email addresses, which should be trusted/credible, but all lead back to just a single account I have to check.
* The final system is an amalgamation of many parts.
  * CloudFlare for domains, hosting, email forwarding, and its serverless functions => I pay ~10 dollars per domain name, per year.
  * Snipcart for the entire webshop management => I pay ~20 dollars per month.
  * Printify for handling physical goods => Should never cost me anything, it's print-on-demand.
  * Sendgrid for sending from domain-based email addresses => Snipcart covers this, though I could do it myself and stay in the free plan
  * Mollie for handling all payment => Should never cost me anything, they take only a tiny cut for every transaction
  * (My Gmail accounts for email, I guess, and their associated storage for all the free stuff I keep online. But that's not really connected to the entire webshop thing.)

This was the most free and flexible webshop setup I could come up with. All parts are included, it exists on many websites at the same time, but I merely have a single dashboard where I see and manage all. It's as cheap as I can make it, without actually cutting corners, doing shady/unreliable things, or otherwise getting into trouble. (About 200 dollars extra per year, on top of the 60 or 70 I pay anyway for having my websites.)

In a way, this final number set the bar: "If I can sell more than ~250 dollars worth of products per _year_, this system is sustainable and can stay around/grow."

What's that? A dozen T-shirts and a dozen digital goods? I _believed_, at time of writing, that this was perfectly doable.

But only if I came out swinging. Come out with tons of valuable digital goods to sell, already integrated everywhere, and a nice merchandise offering. 

My only gripe with Snipcart, really, is that they bill you even when nothing has ever happened. I think both them and customers would be better off if they start billing after your first transaction. That's the part that actually incurs costs at their side, while customers are likely to accept these terms because that first transaction should cover (most) of that monthly fee.

But that's not the case! So I need to make sure that, within a few months, these webshops are selling (at least a bit).

I made a list of all the things I could offer. Some of them are already "done": they are old work of mine that has simply never been shared, such as source files for some projects. Most of them, however, needed to be made especially for this. Entire escape rooms, of professional quality, obviously aren't something I have lying around by the dozens :p

### Home Activities

At some point, I realized all the _new_ things I was making (or wanted to make) could be categorized at "Home Activities" or "Physical Experiences".

* Escape Rooms => certainly an activity, for which you need multiple people in the same room.
* Pub Quizzes => same thing
* Puzzles/Coloring books/Educational activities => same thing
* My board games and video games => same thing, all of these are local multiplayer
* More niche stuff like advent calendars

This was the most obvious type of good I could make and sell. (And I've already been making some of these things, fully or partially, for 10+ years.)

### What about my older works?

My other work has clear sales channels elsewhere. For example, my books are automatically distributed by Amazon (and other online bookstores). A system I've been using for years, at no cost to me, and I have no reason to change. The same is true for Music (distributed to most music services).

I wasn't inclined to take them off of their default sales channels. But I could offer something EXTRA.

* There are certainly works that I've never published before, because they can't be published via that channel or simply don't fit/aren't worth it. Think of short stories, for example, that are _too short_ to turn into a physical book.
* I can keep the "core product" online for free---e.g. the base game of all my board games. But _expansions_, extras, the source files behind a project, all of those could be sold.

### Lore

The more I thought about my "rules" for the webshop, and the things I could offer, the more I felt a kind of "lore" building. This webshop was going to be _different_ than others. It had to feel like a sort of magical place selling unique creative works, in a unique way, as opposed to a generic store. That was the only way to pull it all together _and_ to have my special rules make sense.

So I write down some simple articles about the store, why it was created, some snippets of "lore" that I might scatter around. After a while, I realized I was basically building a "language" for my webshop. The language (and "vibe") with which I'd communicate with customers and present all of this. One filled with magic. One where every product description is a short rhyming poem.

Honestly, I was a bit "down" on this entire project with all the setbacks, massive amount of works, and risky investments I'd have to make with my little money. But when things came together this way, the fire was rekindled. Integrations were done or almost done. A plan started to form that I could stand behind. A single webshop, at a new domain, was quite a streamlined way to start this adventure.

With that plan in place, I started the final sprint. Actually making and 100% finishing the frontend for this webshop, and some reusable modules that the other websites could use to "poll" the webshop for product information.

At the end of all of this, I had a single (new) webshop domain that handled everything I've done and set up.

Version 1 was _done_.

## Conclusion

Of course, the online store and its systems/code are not set in stone. They continue to be updated as I find minor issues, more clever ways to do something, or add new features. Especially once I _really_ started building that curriculum of products---filling the shop with 20, 50, 100 unique products with sometimes unique requirements---I gathered a long list of practical features that I overlooked at first. But that's all minor stuff. Doesn't take that long to implement, isn't that interesting or groundbreaking to mention here.

For the most part, the ideas and work I explained in this article are what the online store ended up being. And will hopefully continue to be for a long time into the future.

Now it was time to start making the products. I had originally planned a launch in the Summer (which would give 6 months of runway) with most "Level 1" products finished. As expected, this deadline was soon moved to the start of _next year_, and I hoped to have _all_ "Level 1" products finished then. Making the products themselves took more time, but some massive rewrites to the shop architecture could also delay me for a week. I can mostly write this off as my own perfectionism, though, and wanting to be as efficient and flexible as possible going into the future.

That's the story of how I created my own unique and completely custom online store.

Until next time,

Pandaqi / Tiamo