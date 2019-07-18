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
			
async function PromiseCall(url){
	let response= await fetch(url);
	let data=await response.json();
	return data;
}

function TweetDate(month){
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; 	
		return `${monthNames[month]}`;
}

let list=0;
	PromiseCall(this.PromiseList[list])
			.then(data=> user_data(data.data))
			.catch(error=>console.log(error));
			
	function user_data(data){
		const [full_name, user_name,profile_img,stats]=[data.full_name,data.user_name,data.profile_img,data.stats];
	    document.querySelector("#side-container1-body-inside h2")
					.textContent=full_name;
		document.querySelector("#side-container1-body-inside span")
					.textContent=`@ ${user_name}`;
		document.querySelector("#side-container1-body img")
					.src=profile_img;
		document.querySelector("#side-container1-footer div:nth-child(1) h3")
					.textContent=stats.tweets;
		document.querySelector("#side-container1-footer div:nth-child(2) h3")
					.textContent=stats.followers;
		document.querySelector("#side-container1-footer div:nth-child(3) h3")
					.textContent=stats.following;
	}

	PromiseCall(this.PromiseList[++list])
			.then(d=>friend_suggestion(d.data))
			.catch(error=>console.log(error));
				
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
						const profile_img=data.profile_img;
                        let imageElem=document.createElement("img");
                        imageElem.src=profile_img;
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
						const [user_name,full_name]=[data.user_name,data.full_name];
                        let userName=document.createElement("span");
                        userName.textContent=user_name;
						name_div.appendChild(userName);	
				        let fullName=document.createElement("span");
						fullName.className="text-property";
						fullName.textContent=`  ${full_name}`;
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
			.then(d=>tweet_data(d.data))
			.catch(error=>console.log(error));
			
	function tweet_data(data){
		[].forEach.call(data,dataV=>{
			const [user,created_at,tweet_msg,entity,stats]=[dataV.user,dataV.created_at,dataV.text,dataV.entities,dataV.stats];
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
					element_follow.textContent=user.full_name;
					document.querySelector(".main-container2-header").appendChild(element_follow);	
					let element_span=document.createElement("span");
					element_span.className="text-property";
					element_span.textContent=`@ ${user.user_name}`;
					document.querySelector(".main-container2-header").appendChild(element_span);
					let element_span1=document.createElement("span");
					let tweet_date=new Date(created_at);
	  				element_span1.textContent=`${tweet_date.getDate()}-${TweetDate(tweet_date.getMonth())}-${tweet_date.getFullYear()}`;
	  				element_span1.className="text-property";
					document.querySelector(".main-container2-header").appendChild(element_span1);
					let toodle_img=document.createElement("img");
					toodle_img.src="Images/drop-down.png";
					toodle_img.className="dropdown-toodle"; 
					document.querySelector(".main-container2-header").appendChild(toodle_img);
				let element_div_body=document.createElement("div");
				element_div_body.className="main-container2-body";
				element_div_body.textContent=tweet_msg;
				document.querySelector(".main-container2").appendChild(element_div_body);
					if(entity.hasOwnProperty('media')){
						if(entity.media[0].type==="video"){
							let mediaElem=document.createElement("video");
							mediaElem.src=entity.media[0].link;
							mediaElem.controls=true;
							mediaElem.className="tweet-video";
							document.querySelector(".main-container2-body").appendChild(mediaElem);
						}
						else if(entity.media[0].type==="image"){
							let mediaElem=document.createElement("img");
							mediaElem.src=entity.media[0].link;
							document.querySelector(".main-container2-body").appendChild(mediaElem);
						}
					}
			let imgSrc=["Images/comment.png", "Images/refresh.png", "Images/like.png"];
			let footerImg=[];
			let element_span_foot=[];
			let imgValue=[stats.comments, stats.retweets, stats.likes];
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