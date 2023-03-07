// Functions
async function getResponse(msg) {
	const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: msg,
                headers: { "Content-Type": "application/json" },
            });
	if (response.status === 200) {
        let data = await response.json();
	//console.log("inside function");
	//console.log(data)
	return data
}}
//-------------------------------------------------
async function getselfResponse(msg) {
	if (!(msg==parsedTweetsselfGlobal)){
		parsedTweetsselfGlobal=msg;
	const response = await fetch("http://127.0.0.1:5000/grammer", {
                method: "POST",
                body: msg,
                headers: { "Content-Type": "application/json" },
            });
	if (response.status === 200) {
        let data = await response.json();
	chrome.storage.sync.set({
      "selftweet": JSON.stringify(data)
    });
	
	return data}
}}

async function getTweets() {
  // Function to get New Tweet Bodies
  //console.log('inside get tweets function');
  let divs = document.querySelectorAll("div"); // Load Div Elements
  //console.log('divs extracted');

  tweets = [];
  tweetIds = [];

  for (let div of divs) {
    //console.log(div.innerHTML)
    let dataTestId = div.getAttribute("data-testid");
    // data-tweet-id
    if (dataTestId == "tweetText") {
      tweets.push(div);
	  //console.log(dataTestId);
	  //console.log(div);
    }
  } // Load Tweet Elements by checking for specific Attribute
  //console.log('tweets extracted');
  //console.log(tweets);

  tweetContent = "";
  let parsedTweets = {};

  for (let i = 0; i < tweets.length; i++) {
    //console.log(tweet)
    //let aTags = tweet.getElementsByTagName("a");
	//console.log("modified division")
	//console.log(mod_div)
	//tweet.parentNode.insertBefore(mod_div, tweet.nextSibling);
	let spans = tweets[i].getElementsByTagName("span");
	let tweetid=tweets[i].id;
	tweetContent = "";
    for (let span of spans) {
	  let tex=span.innerHTML;
	  //console.log(tex);
	  if (tex.includes("</a>")){
		  let a=1;
	  }
	  else {
		  tweetContent=tweetContent+" "+tex
	  };
      //if (href.includes("/status/")) {

      //  let start = href.indexOf("/status/");
      //  let tweetId = href.split("/status/");
      //  tweetId = tweetId[1];
      //  if (!(tweetId in parsedTweets)) {
      //    //console.log(tweetId)
      //    tweetIds.push(tweetId);
      //    //console.log(tweet.innerText)
      //    parsedTweets[tweetId] = await tweetParser(tweet);
		//  console.log("tweet print");
		 // console.log(parsedTweets[tweetId]);
        }
	parsedTweets[tweetid]=tweetContent;
	//console.log('inside get tweet');
	//console.log(parsedTweetsGlobal);
	//console.log((tweetid in parsedTweetsGlobal));
	if (!(tweetid in parsedTweetsGlobal)){
		//console.log('condition is met');
		const response =getResponse(tweetContent)
		//const response = fetch("http://127.0.0.1:5000/predict", {
        //        method: "POST",
        //        body: tweetContent,
        //        headers: { "Content-Type": "application/json" },
        //    });
		//const res = response.text();
		response.then(function(result){
			console.log(result);
			tweets[i].innerHTML='<span style="background-color:cyan;" class="msg_senti">'+result['topic']+'\n</span>'+tweets[i].innerHTML
			tweets[i].innerHTML='<span style="background-color:cyan;" class="msg_senti">'+result['sentiment']+'\n</span>'+tweets[i].innerHTML
			if (result['prediction']=='clean'){
			tweets[i].innerHTML='<span style="background-color:cyan;" class="msg">'+result['prediction']+'\n</span>'+tweets[i].innerHTML}
			else {
				tweets[i].innerHTML='<span style="background-color:red;" class="msg">'+result['prediction']+'\n</span>'+tweets[i].innerHTML}
			value=result}
		);
		//console.log(value)

		//console.log(response)
		//console.log(response.prediction)
		//const res = json.response;
		//console.log("api call")
		//console.log(response)
		//tweets[i].innerHTML='<span style="background-color:cyan;" class="msg">toxic\n</span>'+tweets[i].innerHTML
	}
	//console.log("parsed tweets")
	//console.log(parsedTweets)
      }
     // Finding Tweet Id for every tweet by processing all <a> tags within the tweet
	 // Iterating through tweets

  return parsedTweets;
}
// ------- End of Functions ------
async function getselfTweets() {
  // Function to get New Tweet Bodies
  //console.log('inside get tweets function');
  let divs_1 = document.querySelectorAll("div"); // Load Div Elements
  console.log('divs extracted');

  tweets_1 = [];
  //tweetIds = [];

  for (let div of divs_1) {
    //console.log(div.innerHTML)
    let dataTestId = div.getAttribute("data-testid");
    // data-tweet-id
    if (dataTestId == "tweetTextarea_0") {
      tweets_1.push(div);
    }
  } // Load Tweet Elements by checking for specific Attribute
  //console.log('tweets extracted');
  //console.log(tweets);

  tweetContent_1 = "";
  //let parsedTweets_1 = {};

  for (let i = 0; i < tweets_1.length; i++) {
	let spans = tweets_1[i].querySelectorAll("span");
	if (spans.length>1){
		tweetContent_1=spans[spans.length-1].innerHTML
		const response =getselfResponse(tweetContent_1)
	}
  }
  return "self tweet extraxcted";
}
// ------- End of Functions ------

// Main
let main = async function () {
  console.log('inside main function');
  parsedTweetsGlobal = await getTweets();
  getselfTweets();
  //console.log('parsef function outside listener');
  //console.log(parsedTweetsGlobal);

  window.addEventListener("scroll", async function () {
    let newParsedTweets = await getTweets();
	getselfTweets();
	//console.log('parsef function outside listener');
	//console.log(parsedTweetsGlobal);
    console.log(
      "From Scroll Event Listener ",
      Object.keys(newParsedTweets).length
    );
    let newDistinctTweets = new Object();
    for (let newTweetID in newParsedTweets) {
      if (!(newTweetID in parsedTweetsGlobal)) {
        newDistinctTweets[newTweetID] = newParsedTweets[newTweetID];
        console.log("New Distinct Tweet from Scroll Event");
      }
    }

    parsedTweetsGlobal = { ...parsedTweetsGlobal, ...newParsedTweets };
    console.log(
      "New Key Length From Scroll Even",
      Object.keys(parsedTweetsGlobal).length
    );
  });
};
//console.log('started twitter scrapper');
let parsedTweetsGlobal = {};
let parsedTweetsselfGlobal ='';
chrome.storage.sync.set({
      "selftweet": JSON.stringify({"status":"loading"})
    });
main()