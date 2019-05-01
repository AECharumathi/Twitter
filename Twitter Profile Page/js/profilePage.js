var PromiseList=[ "https://fsd1.herokuapp.com/users/1/details",
				  "https://fsd1.herokuapp.com/users/1/media",
				  "https://fsd1.herokuapp.com/users/1/followers/suggestions",
				  "https://fsd1.herokuapp.com/users/1/tweets",
				  "https://fsd1.herokuapp.com/users/1/following",
				  "https://fsd1.herokuapp.com/users/1/followers"
				];
var  requests = PromiseList.map(url => fetch(url));
var store=[];
	Promise.all(requests)
			.then(responses=>{
				responses.forEach(response=>store.push(response.json()))
			})
			.catch(error=>console.log(error));
			
function PromiseCall(url){
	return fetch(url)
			.then(response=>response.json())
			.catch(error=>console.log(error));	
}

function TweetDate(month){
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; 	
		return `${monthNames[month]}`;
}


var list=0;

PromiseCall(this.PromiseList[list])
		.then(data=> user_data(data.data));

function user_data(data){
		document.querySelector(".header-footer div img")
						.src=data.profile_img;
		document.querySelector(".header-footer-body span:nth-child(1) h3")
						.textContent=data.stats.tweets;
		document.querySelector(".header-footer-body span:nth-child(2) h3")
						.textContent=data.stats.following;
		document.querySelector(".header-footer-body span:nth-child(3) h3")
						.textContent=data.stats.followers;
		document.querySelector(".user_name h2")
						.textContent=data.full_name;
		document.querySelector(".user_name span")
						.textContent=`@ ${data.user_name}`;		
	 	document.querySelector(".user_detail div:nth-child(2) span")
	 					.textContent=data.user_from;
	    document.querySelector(".user_detail div:nth-child(3) span")
	 					.textContent=data.user_website;
	 	var created=new Date(data.user_created_at);
	   		 	document.querySelector(".user_detail div:nth-child(4) span")
	 					.textContent= `Joined ${TweetDate(created.getMonth())} ${created.getFullYear()}`;
	 	var birthday=new Date(data.user_birthday);
	    	 	document.querySelector(".user_detail div:nth-child(5) span")
	 					.textContent=`Born ${TweetDate(birthday.getMonth())} ${birthday.getDate()}, ${birthday.getFullYear()}`;
}

PromiseCall(this.PromiseList[++list])
				.then(d=>user_media(d.data));

function user_media(data){
	var createMedia=[];
	for(var index=0;index<data.length;index++){
		if(data[index].type==="video"){
				var mediaElem=document.createElement("video");
						mediaElem.src=data[index].url;
						mediaElem.className="side-container1-body-div";
				  		document.querySelector(".side-container1-body").appendChild(mediaElem);
			}
		else if(data[index].type==="image"){
				var mediaElem=document.createElement("img");
						mediaElem.src=data[index].url;
						mediaElem.className="side-container1-body-div";
						document.querySelector(".side-container1-body").appendChild(mediaElem);
			}
	}
}

PromiseCall(this.PromiseList[++list])
						.then(d=>friend_suggestion(d.data));
						
function friend_suggestion(data){
 	for(var index=0;index<data.length;index++){
 	  var element_div=document.createElement("div");
 	 	 element_div.className="side-container2-body";
	  	 document.querySelector("#side-container2").appendChild(element_div);
 	  var element_image=document.createElement("img");
	  	  element_image.src=data[index].profile_img;
	  	  document.querySelector(".side-container2-body").appendChild(element_image);
	  var element_follow=document.createElement("span");
	  	  element_follow.textContent=data[index].user_name;
	  	  document.querySelector(".side-container2-body").appendChild(element_follow);	
	  var element_span=document.createElement("span");
	  	  element_span.className="text-property";
	  	  element_span.textContent=data[index].full_name;
	  	  document.querySelector(".side-container2-body").appendChild(element_span);	
	  var element_button=document.createElement("button");
	  	  element_button.className="button";
	      element_button.textContent="Follow";
	  	  document.querySelector(".side-container2-body").appendChild(element_button);
	}
}

PromiseCall(this.PromiseList[++list])
			.then(d=>tweet_data(d.data));

function tweet_data(data){
	for(var index=0;index<data.length;index++){
	  var element_div_main=document.createElement("div");
 	  element_div_main.className="main-container2";
	  document.querySelector(".main-container-tweet").appendChild(element_div_main);
	  	var element_div=document.createElement("div");
 	    element_div.className="main-container2-header";
	    document.querySelector(".main-container2").appendChild(element_div);
	  		var profile_image=document.createElement("img");
	      	profile_image.src="Images/avatar.png";
	      	profile_image.className="avatar"; 
	      	document.querySelector(".main-container2-header").appendChild(profile_image);
	  		var element_follow=document.createElement("span");
	  	  	element_follow.textContent=data[index].user.full_name;
	  	  	document.querySelector(".main-container2-header").appendChild(element_follow);	
	  		var element_span=document.createElement("span");
	  	  	element_span.className="text-property";
	  	  	element_span.textContent=`@ ${data[index].user.user_name}`;
	  	  	document.querySelector(".main-container2-header").appendChild(element_span);
	  		var element_span1=document.createElement("span");
	  	  	var tweet_date=new Date(data[index].created_at);
	  			tweet_date = `${tweet_date.getDate()}-${TweetDate(tweet_date.getMonth())}-${tweet_date.getFullYear()}`;
	  			element_span1.textContent=tweet_date;
	  			element_span1.className="text-property";
	  			document.querySelector(".main-container2-header").appendChild(element_span1);
	  		var toodle_img=document.createElement("img");
	  	  	toodle_img.src="Images/drop-down.png";
	  	  	toodle_img.className="dropdown-toodle"; 
	  	  	document.querySelector(".main-container2-header").appendChild(toodle_img);
	  	var element_div_body=document.createElement("div");
 	  	element_div_body.className="main-container2-body";
	  	element_div_body.textContent=data[index].text;
	   	document.querySelector(".main-container2").appendChild(element_div_body);
		 	if(data[index].entities.hasOwnProperty('media')){
				if(data[index].entities.media[0].type==="video"){
					var mediaElem=document.createElement("video");
						mediaElem.src=data[index].entities.media[0].link;
						mediaElem.controls=true;
						mediaElem.className="tweet-video";
						document.querySelector(".main-container2-body").appendChild(mediaElem);
				} else if(data[index].entities.media[0].type==="image"){
					var mediaElem=document.createElement("img");
						mediaElem.src=data[index].entities.media[0].link;
						document.querySelector(".main-container2-body").appendChild(mediaElem);
				}
		  	}
		var imgSrc=["Images/comment.png", "Images/refresh.png", "Images/like.png"];
		var footerImg=[];
		var element_span_foot=[];
		var imgValue=[data[index].stats.comments, data[index].stats.retweets, data[index].stats.likes];
	  	var element_div_foot=document.createElement("div");
 	  		element_div_foot.className="main-container2-footer";
 	  		document.querySelector(".main-container2").appendChild(element_div_foot);
 	  		element_span_foot=document.createElement("span");
 	  		element_span_foot.className="main-container2-footer-span"
 	  		document.querySelector(".main-container2-footer").appendChild(element_span_foot);
 	   		for(var s_index=0; s_index<3;s_index++){
 	   			footerImg[s_index]=document.createElement("img");
	  			footerImg[s_index].src=imgSrc[s_index];
	  			document.querySelector(".main-container2-footer-span").appendChild(footerImg[s_index]);
	  			document.querySelector(".main-container2-footer-span").appendChild(document.createTextNode(imgValue[s_index]));
	  		}
	}
}

PromiseCall(this.PromiseList[++list])
			.then(d=>following_data(d.data));

function following_data(data){
	for(var index=0;index<data.length;index++){
	  var div_main=document.createElement("div");
 	  div_main.className="Following-container1";
	  document.querySelector(".Following-container-body").appendChild(div_main);
	  	var div_padding=document.createElement("div");
	  	div_padding.className="Following-container1-padding";
	  	document.querySelector(".Following-container1").appendChild(div_padding);
	  		var div_header=document.createElement("img");
	  		div_header.src=data[index].cover_img;
	  		div_header.className="Following-container1-header";
	  		document.querySelector(".Following-container1-padding").appendChild(div_header);
	  		var div_body=document.createElement("div");
	  		div_body.className="Following-container1-body";
	  		document.querySelector(".Following-container1-padding").appendChild(div_body);
	  			var profile_img=document.createElement("img");
	  			profile_img.src=data[index].profile_img;
	  			document.querySelector(".Following-container1-body").appendChild(profile_img);
	  			var div_body_in=document.createElement("div");
	  			div_body_in.className="Following-container1-body-inside";
	  			document.querySelector(".Following-container1-body").appendChild(div_body_in);
	  				var element_span=document.createElement("h3");
	  				element_span.textContent=data[index].full_name;
	  				document.querySelector(".Following-container1-body-inside").appendChild(element_span);
	  				var element_span=document.createElement("span");
	  				element_span.className="text-property";
	  				element_span.textContent=`@ ${data[index].user_name}`;
	  				document.querySelector(".Following-container1-body-inside").appendChild(element_span);
	   		var div_body=document.createElement("div");
	  		div_body.className="Following-container1-footer";
	  		document.querySelector(".Following-container1-padding").appendChild(div_body);
	  			var div_body=document.createElement("div");
	  			document.querySelector(".Following-container1-footer").appendChild(div_body);
	  				var user_bio=document.createElement("p");
	  				user_bio.className="text-property";
	  				user_bio.textContent=data[index].user_bio;
	  				document.querySelector(".Following-container1-footer div").appendChild(user_bio);
	}
}

PromiseCall(this.PromiseList[++list])
			.then(d=>followers_data(d.data));

function followers_data(data){
	for(var index=0;index<data.length;index++){
	  var div_main=document.createElement("div");
 	  div_main.className="Followers-container1";
	  document.querySelector(".Followers-container-body").appendChild(div_main);
	  	var div_padding=document.createElement("div");
	  	div_padding.className="Followers-container1-padding";
	  	document.querySelector(".Followers-container1").appendChild(div_padding);
	  		var div_header=document.createElement("img");
	  		div_header.src=data[index].cover_img;
	  		div_header.className="Followers-container1-header";
	  		document.querySelector(".Followers-container1-padding").appendChild(div_header);
	  		var div_body=document.createElement("div");
	  		div_body.className="Followers-container1-body";
	  		document.querySelector(".Followers-container1-padding").appendChild(div_body);
	  			var profile_img=document.createElement("img");
	  			profile_img.src=data[index].profile_img;
	  			document.querySelector(".Followers-container1-body").appendChild(profile_img);
	  			var div_body_in=document.createElement("div");
	  			div_body_in.className="Followers-container1-body-inside";
	  			document.querySelector(".Followers-container1-body").appendChild(div_body_in);
	  				var element_span=document.createElement("h3");
	  				element_span.textContent=data[index].full_name;
	  				document.querySelector(".Followers-container1-body-inside").appendChild(element_span);
	  				var element_span=document.createElement("span");
	  				element_span.className="text-property";
	  				element_span.textContent=`@ ${data[index].user_name}`;
	  				document.querySelector(".Followers-container1-body-inside").appendChild(element_span);
	   		var div_body=document.createElement("div");
	  		div_body.className="Followers-container1-footer";
	  		document.querySelector(".Followers-container1-padding").appendChild(div_body);
	  			var div_body=document.createElement("div");
	  			document.querySelector(".Followers-container1-footer").appendChild(div_body);
	  				var user_bio=document.createElement("p");
	  				user_bio.className="text-property";
	  				user_bio.textContent=data[index].user_bio;
	  				document.querySelector(".Followers-container1-footer div").appendChild(user_bio);
	}
}