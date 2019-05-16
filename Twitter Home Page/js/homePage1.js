var PromiseList=[ "https://fsd1.herokuapp.com/users/1/details",
				  "https://fsd1.herokuapp.com/users/1/followers/suggestions",
				  "https://fsd1.herokuapp.com/users/1/tweets"
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
	    document.querySelector("#side-container1-body-inside h2")
					.textContent=data.full_name;
		document.querySelector("#side-container1-body-inside span")
					.textContent=`@ ${data.user_name}`;
		document.querySelector("#side-container1-body img")
					.src=data.profile_img;
		document.querySelector("#side-container1-footer div:nth-child(1) h3")
					.textContent=data.stats.tweets;
		document.querySelector("#side-container1-footer div:nth-child(2) h3")
					.textContent=data.stats.followers;
		document.querySelector("#side-container1-footer div:nth-child(3) h3")
					.textContent=data.stats.following;
	}

	PromiseCall(this.PromiseList[++list])
			.then(d=>friend_suggestion(d.data));
			
				
	function friend_suggestion(data){
		[].forEach.call(data,()=>{
		var element_div=document.createElement("div");
		element_div.className="side-container2-body";
		document.querySelector(".side-container2-b").appendChild(element_div);
        })
        var parentDiv=document.querySelectorAll(".side-container2-body");
         [].forEach.call(parentDiv,function(sug,i){
                                [].forEach.call(data,function(data,ind){
                                   if(i==ind){
                                    var element_image=document.createElement("img");
                                    element_image.src=data.profile_img;
                                    sug.appendChild(element_image);
                                    var userName=document.createElement("span");
                                    userName.textContent=data.user_name;
                                    sug.appendChild(userName);	
                                    var fullName=document.createElement("span");
                                    fullName.className="text-property";
                                    fullName.textContent=data.full_name;
                                    sug.appendChild(fullName);	
                                    var follow=document.createElement("button");
                                    follow.className="button";
                                    follow.textContent="Follow";
                                    sug.appendChild(follow);
                                    }
                                   })
                                });

    }

	PromiseCall(this.PromiseList[++list])
			.then(d=>tweet_data(d.data));
			

	function tweet_data(data){
		[].forEach.call(data,dataV=>{
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
					element_follow.textContent=dataV.user.full_name;
					document.querySelector(".main-container2-header").appendChild(element_follow);	
					var element_span=document.createElement("span");
					element_span.className="text-property";
					element_span.textContent=`@ ${dataV.user.user_name}`;
					document.querySelector(".main-container2-header").appendChild(element_span);
					var element_span1=document.createElement("span");
					var tweet_date=new Date(dataV.created_at);
	  				element_span1.textContent=`${tweet_date.getDate()}-${TweetDate(tweet_date.getMonth())}-${tweet_date.getFullYear()}`;
	  				element_span1.className="text-property";
					document.querySelector(".main-container2-header").appendChild(element_span1);
					var toodle_img=document.createElement("img");
					toodle_img.src="Images/drop-down.png";
					toodle_img.className="dropdown-toodle"; 
					document.querySelector(".main-container2-header").appendChild(toodle_img);
				var element_div_body=document.createElement("div");
				element_div_body.className="main-container2-body";
				element_div_body.textContent=dataV.text;
				document.querySelector(".main-container2").appendChild(element_div_body);
					if(dataV.entities.hasOwnProperty('media')){
						if(dataV.entities.media[0].type==="video"){
							var mediaElem=document.createElement("video");
							mediaElem.src=dataV.entities.media[0].link;
							mediaElem.controls=true;
							mediaElem.className="tweet-video";
							document.querySelector(".main-container2-body").appendChild(mediaElem);
						}
						else if(dataV.entities.media[0].type==="image"){
							var mediaElem=document.createElement("img");
							mediaElem.src=dataV.entities.media[0].link;
							document.querySelector(".main-container2-body").appendChild(mediaElem);
						}
					}
			var imgSrc=["Images/comment.png", "Images/refresh.png", "Images/like.png"];
			var footerImg=[];
			var element_span_foot=[];
			var imgValue=[dataV.stats.comments, dataV.stats.retweets, dataV.stats.likes];
			var element_div_foot=document.createElement("div");
			element_div_foot.className="main-container2-footer";
			document.querySelector(".main-container2").appendChild(element_div_foot);
				element_span_foot=document.createElement("span");
				element_span_foot.className="main-container2-footer-span"
				document.querySelector(".main-container2-footer").appendChild(element_span_foot);
                [].forEach.call(imgSrc,function(imgSrc,i){
                    footerImg[i]=document.createElement("img");
                    footerImg[i].src=imgSrc;
						document.querySelector(".main-container2-footer-span").appendChild(footerImg[i]);
						document.querySelector(".main-container2-footer-span").appendChild(document.createTextNode(imgValue[i]));
					})
		})
	}
