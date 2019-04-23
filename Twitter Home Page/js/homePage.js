var user_promise=fetch("https://fsd1.herokuapp.com/users/1/details");

user_promise
		.then(response=>response.json())
		.then(data=> user_data(data.data))
		.catch(error=>console.log(error));

function user_data(data){
	    var full_name=document.querySelector("#side-container1-body-inside h2");
		full_name.textContent=data.full_name;
		var user_name=document.querySelector("#side-container1-body-inside span");
		user_name.textContent="@"+data.user_name;
		var avatar=document.querySelector("#side-container1-body img");
		avatar.src=data.profile_img;
		var tweets=document.querySelector("#side-container1-footer div:nth-child(1) h3");
		tweets.textContent=data.stats.tweets;
		var followers=document.querySelector("#side-container1-footer div:nth-child(2) h3");
		followers.textContent=data.stats.followers;
		var following=document.querySelector("#side-container1-footer div:nth-child(3) h3");
		following.textContent=data.stats.following;
}

var tweet_promise=fetch("https://fsd1.herokuapp.com/users/1/tweets");

tweet_promise
			.then(response=>response.json())
			.then(d=>tweet_data(d.data))
			.catch(error=>console.log(error));

function tweet_data(data){
	for(var index=0;index<data.length;index++){
		document.querySelector(".main-container2-header span:nth-child(2)")
					.textContent=data[index].user.full_name;
		document.querySelector(".main-container2-header span:nth-child(3)")
					.textContent="@"+data[index].user.user_name;
		var tweet_date=new Date(data[index].created_at);
		tweet_date = tweet_date.getDate()+"-"+ tweet_date.getMonth()+"-"+ tweet_date.getFullYear();
		var tweet_time=document.querySelector(".main-container2-header span:nth-child(4)");
		tweet_time.textContent=tweet_date;
		document.querySelector(".main-container2-body")
					.textContent=data[index].text;
		document.querySelector(".main-container2-footer span:nth-child(1)")
					.appendChild(document.createTextNode(data[index].stats.comments));
		document.querySelector(".main-container2-footer span:nth-child(2)")
					.appendChild(document.createTextNode(data[index].stats.retweets));
		document.querySelector(".main-container2-footer span:nth-child(3)")
					.appendChild(document.createTextNode(data[index].stats.likes));
	}
}