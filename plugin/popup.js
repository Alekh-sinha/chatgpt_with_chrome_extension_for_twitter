console.log("inside pop up")
chrome.storage.sync.get("selftweet", (data) => {
      console.log("reading from storage")
	  console.log(data)
	  //const currentjson = JSON.parse(data);
	  
	  const container = document.getElementsByClassName("container")[0];
	  container.innerHTML = '<div class="title">'+data["selftweet"]+'</div>';
    });

