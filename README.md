# crypto-twitter-filter

This is a simple browser userscript to delete unhelpful tweets and improve your scrolling experience.

## How to use

Install violentmonkey extension in your browser. Violentmonkey lets you inject arbitrary js code into any webpage you browse.

Create new script and copy-paste `main.js`.

Open twitter.com. Make sure you wait a few seconds before you start browsing.

Confirm that all tweets containing the keyword "the" are being deleted.

You can use developer options to increase screen height to say 5000 px or a large number. This will cause more tweets to get loaded into DOM outside of your field of view. This allows script to process and delete these tweets before you as a user get to see them.

Tested on chrome, windows 10
