var PromiseList=[ "https://fsd1.herokuapp.com/users/1/details",
				  "https://fsd1.herokuapp.com/users/1/followers/suggestions",
				  "https://fsd1.herokuapp.com/users/1/tweets"
				];

let  requests = PromiseList.map(url => fetch(url));
let store=[];
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
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; 	
		return `${monthNames[month]}`;
}

let list=0;
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
		let suggest=document.createElement("div");
		suggest.className="side-container2-body";
		document.querySelector(".side-container2-b").appendChild(suggest);
        });
		let parentDiv=document.querySelectorAll(".side-container2-body");
		
         [].forEach.call(parentDiv,(parentDiv,i)=>{
			let img_div=document.createElement("div");
			let content_div=document.createElement("div");
			parentDiv.appendChild(img_div);
			parentDiv.appendChild(content_div);
		 });
		 let img_div=document.querySelectorAll(".side-container2-body div:nth-child(1)");
		 let content_div=document.querySelectorAll(".side-container2-body div:nth-child(2)");
		 [].forEach.call(img_div,(img_div,i)=>{
			 [].filter.call(data,(data,ind)=>{
                    if(i==ind){
                        let imageElem=document.createElement("img");
                        imageElem.src=data.profile_img;
						img_div.appendChild(imageElem);
					}
				})
			});

		[].forEach.call(content_div,(content_div,i)=>{
			let name_div=document.createElement("div");
			let btn_div=document.createElement("div");
			content_div.appendChild(name_div);
			content_div.appendChild(btn_div);
		});
		let name_div=document.querySelectorAll(".side-container2-body div:nth-child(2) div:nth-child(1)");
		let btn_div=document.querySelectorAll(".side-container2-body div:nth-child(2) div:nth-child(2)");

		[].forEach.call(name_div,(name_div,i)=>{
			[].filter.call(data,(data,ind)=>{
				   if(i==ind){
                        let userName=document.createElement("span");
                        userName.textContent=data.user_name;
						name_div.appendChild(userName);	
				        let fullName=document.createElement("span");
						fullName.className="text-property";
						fullName.textContent=`  ${data.full_name}`;
						name_div.appendChild(fullName);	
				   }
				})
			});
			[].forEach.call(btn_div,(btn_div,i)=>{
		          let follow=document.createElement("button");
                  follow.className="button";
                  follow.textContent="Follow";
                  btn_div.appendChild(follow);
            });

    }

	PromiseCall(this.PromiseList[++list])
			.then(d=>tweet_data(d.data));
			
	function tweet_data(data){
		[].forEach.call(data,dataV=>{
			let element_div_main=document.createElement("div");
			element_div_main.className="main-container2";
			document.querySelector(".main-container-tweet").appendChild(element_div_main);
				let element_div=document.createElement("div");
				element_div.className="main-container2-header";
				document.querySelector(".main-container2").appendChild(element_div);
					let profile_image=document.createElement("img");
					profile_image.src="Images/avatar.png";
					profile_image.className="avatar"; 
					document.querySelector(".main-container2-header").appendChild(profile_image);
					let element_follow=document.createElement("span");
					element_follow.textContent=dataV.user.full_name;
					document.querySelector(".main-container2-header").appendChild(element_follow);	
					let element_span=document.createElement("span");
					element_span.className="text-property";
					element_span.textContent=`@ ${dataV.user.user_name}`;
					document.querySelector(".main-container2-header").appendChild(element_span);
					let element_span1=document.createElement("span");
					let tweet_date=new Date(dataV.created_at);
	  				element_span1.textContent=`${tweet_date.getDate()}-${TweetDate(tweet_date.getMonth())}-${tweet_date.getFullYear()}`;
	  				element_span1.className="text-property";
					document.querySelector(".main-container2-header").appendChild(element_span1);
					let toodle_img=document.createElement("img");
					toodle_img.src="Images/drop-down.png";
					toodle_img.className="dropdown-toodle"; 
					document.querySelector(".main-container2-header").appendChild(toodle_img);
				let element_div_body=document.createElement("div");
				element_div_body.className="main-container2-body";
				element_div_body.textContent=dataV.text;
				document.querySelector(".main-container2").appendChild(element_div_body);
					if(dataV.entities.hasOwnProperty('media')){
						if(dataV.entities.media[0].type==="video"){
							let mediaElem=document.createElement("video");
							mediaElem.src=dataV.entities.media[0].link;
							mediaElem.controls=true;
							mediaElem.className="tweet-video";
							document.querySelector(".main-container2-body").appendChild(mediaElem);
						}
						else if(dataV.entities.media[0].type==="image"){
							let mediaElem=document.createElement("img");
							mediaElem.src=dataV.entities.media[0].link;
							document.querySelector(".main-container2-body").appendChild(mediaElem);
						}
					}
			let imgSrc=["Images/comment.png", "Images/refresh.png", "Images/like.png"];
			let footerImg=[];
			let element_span_foot=[];
			let imgValue=[dataV.stats.comments, dataV.stats.retweets, dataV.stats.likes];
			let element_div_foot=document.createElement("div");
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