// ==UserScript==
// @name        New script
// @namespace   Violentmonkey Scripts
// @match       *://*twitter.com/home
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js
// @version     1.0
// @author      -
// @description 4/27/2023, 10:12:11 AM
// ==/UserScript==


console.log("AAAA: Violentmonkey code running");

function Unhelpful(text) {
  if(text.includes("the")){
    return true;
  }
  else {
    return false;
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}



function processTwitterDivs() {
  var twitter_divs = document.querySelectorAll('[data-testid="cellInnerDiv"]');
  console.log(twitter_divs.length);

  for (let i = 0; i < twitter_divs.length; ++i) {
    try{
      var child_divs = twitter_divs[i].getElementsByTagName("*");
      var text_div = child_divs[i].querySelector('[data-testid="tweetText"]');

      var text = text_div.firstChild.textContent;

      if (Unhelpful(text)) {
        console.log("TWITTER DIV REMOVE ATTEMPTED");
        console.log(text);


        // this works best
        twitter_divs[i].innerHTML = "<div>REDACTED at timestamp " + String(Date.now()) + " </div>";

        //text_div.innerHTML = "<div>REDACTED</div>";

        //twitter_divs[i].remove();
      }

    }
    catch(err) {
      ;
      //console.log(err);
    }
  }


}



// Use Mutation Observer to decide when to trigger twitter div processing
function createAndLaunchMutationObserver(){

    const timelineNode = document.querySelector('[data-testid="cellInnerDiv"]').parentElement;
    const config = { attributes: false, childList: true, subtree: false };

    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          console.log("mutation observed at timestamp " + String(Date.now()));
          processTwitterDivs();
        }
      }
    }

    const observer = new MutationObserver(callback);
    console.log("mutation observer launched");
    observer.observe(timelineNode, config);

}



// Need better way to launch - this has to be after Timeline div has loaded in DOM, but not before load of all DOM and content (waiting for that takes too long)
// This code assumes first scroll is in this time interval.

launchedMutationObserver = false;
document.addEventListener("scroll", (event ) => {
  if(launchedMutationObserver == false) {
    createAndLaunchMutationObserver();
    launchedMutationObserver = true;
  }
})




