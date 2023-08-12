---
draft: true
title: 'How to create AI opponents - Part 2 (Machine Learning)'
---

Welcome to part 2 in this tutorial series on creating AI opponents for your games!

In the first part ([How to create AI Opponents - Part 1](https://pandaqi.com/blog/tutorials/how-to-create-ai-opponents-part-1/)), we talked about Heuristic AI. Using rules of thumb, estimates, formulas that are somewhat correct to teach a computer to play a game. It works fine, especially for arcade games, but there are obvious issues.

In this article we'll look at _Machine Learning_, and more specifically _Neural Networks_ (and evolutionary algorithms), to train AI opponents to portray extremely complex and intelligent behaviour!

Depending on your pre-existing knowledge, this article can be quite hard or quite easy to understand. Both topics (neural networks + evolutionary algorithms) take quite some time to explain and understand, so don't worry if it all seems a bit magical on your first read. I'll keep it as simple as possible, and provide examples wherever I can.

At the end of this article, I will show the results of applying these techniques to my own game called Art Hockey. (The same game that I used in part 1 of the series.)

@TODO: WRITE THE ARTICLE
* Explain the general idea behind machine learning
* Explain neural networks
* Explain how we're looking for the "fittest" network, and thus need evolutionary algorithms to get there. (Instead of, for example, backpropagation networks that can precisely calculate how to adapt themselves to make better predictions in the future.)
* Explain how such an evolutionary algorithm works (and that there are others, but this is the basic form)
* Explain why input/output/activation function is VERY important ...
* Then I just need to show my first try, my tries in between (and what I learned from those), and my last try.
* Conclusion, final result, advantages vs disadvantages, etc.