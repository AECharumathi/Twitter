var PromiseList=[ "https://fsd1.herokuapp.com/users/1/details",
				  "https://fsd1.herokuapp.com/users/1/media",
				  "https://fsd1.herokuapp.com/users/1/followers/suggestions",
				  "https://fsd1.herokuapp.com/users/1/tweets",
				  "https://fsd1.herokuapp.com/users/1/following",
				  "https://fsd1.herokuapp.com/users/1/followers"
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


var list=0;

PromiseCall(this.PromiseList[list])
			.then(data=> user_data(data.data))
			.catch(error=>console.log(error));

function user_data(data){
	const [profile_img,stats,full_name, user_name,user_from,user_website,user_created_at,user_birthday]=
							[data.profile_img,data.stats,data.full_name,data.user_name,data.user_from,data.user_website,data.user_created_at,data.user_birthday];
		document.querySelector(".header-footer div img")
						.src=profile_img;
		document.querySelector(".header-footer-body span:nth-child(1) h3")
						.textContent=stats.tweets;
		document.querySelector(".header-footer-body span:nth-child(2) h3")
						.textContent=stats.following;
		document.querySelector(".header-footer-body span:nth-child(3) h3")
						.textContent=stats.followers;
		document.querySelector(".user_name h2")
						.textContent=full_name;
		document.querySelector(".user_name span")
						.textContent=`@ ${user_name}`;		
	 	document.querySelector(".user_detail div:nth-child(2) span")
	 					.textContent=user_from;
	    document.querySelector(".user_detail div:nth-child(3) span")
	 					.textContent=user_website;
	 	let created=new Date(user_created_at);
	   		 	document.querySelector(".user_detail div:nth-child(4) span")
	 					.textContent= `Joined ${TweetDate(created.getMonth())} ${created.getFullYear()}`;
	 	let birthday=new Date(user_birthday);
	    	 	document.querySelector(".user_detail div:nth-child(5) span")
	 					.textContent=`Born ${TweetDate(birthday.getMonth())} ${birthday.getDate()}, ${birthday.getFullYear()}`;
}

PromiseCall(this.PromiseList[++list])
				.then(d=>user_media(d.data))
				.catch(error=>console.log(error));

function user_media(data){
	
	[].forEach.call(data,(mediaFile,i)=>{
		let [mediaType,mediaUrl]=[mediaFile.type,mediaFile.url];
		if(mediaType==="video"){
				let mediaElem=document.createElement("video");
						mediaElem.src=mediaUrl;
						mediaElem.className="side-container1-body-div";
				  		document.querySelector(".side-container1-body").appendChild(mediaElem);
			}
		else if(mediaType==="image"){
				let mediaElem=document.createElement("img");
						mediaElem.src=mediaUrl;
						mediaElem.className="side-container1-body-div";
						document.querySelector(".side-container1-body").appendChild(mediaElem);
			}
	})
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
		let div_main=document.createElement("div");
 	  div_main.className="main-container2";
	  document.querySelector(".main-container-tweet").appendChild(div_main);
	  	let header_div=document.createElement("div");
 	    header_div.className="main-container2-header";
	    document.querySelector(".main-container2").appendChild(header_div);
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
	  			tweet_date = `${tweet_date.getDate()}-${TweetDate(tweet_date.getMonth())}-${tweet_date.getFullYear()}`;
	  			element_span1.textContent=tweet_date;
	  			element_span1.className="text-property";
	  			document.querySelector(".main-container2-header").appendChild(element_span1);
	  		let toodle_img=document.createElement("img");
	  	  	toodle_img.src="Images/drop-down.png";
	  	  	toodle_img.className="dropdown-toodle"; 
	  	  	document.querySelector(".main-container2-header").appendChild(toodle_img);
	  	let div_body=document.createElement("div");
 	  	div_body.className="main-container2-body";
	  	div_body.textContent=tweet_msg;
	   	document.querySelector(".main-container2").appendChild(div_body);
		 	if(entity.hasOwnProperty('media')){
				if(entity.media[0].type==="video"){
					let mediaElem=document.createElement("video");
						mediaElem.src=entity.media[0].link;
						mediaElem.controls=true;
						mediaElem.className="tweet-video";
						document.querySelector(".main-container2-body").appendChild(mediaElem);
				} else if(entity.media[0].type==="image"){
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

PromiseCall(this.PromiseList[++list])
			.then(d=>following_data(d.data))
			.catch(error=>console.log(error));

function following_data(data){
	[].forEach.call(data,dataV=>{
	  let mainBlock=document.createElement("div");
 	  mainBlock.className="Following-container1";
	  document.querySelector(".Following-container-body").appendChild(mainBlock);
	  })
	  let parentDiv=document.querySelectorAll(".Following-container1");
	  
	  [].forEach.call(parentDiv,(parent,i)=>{
	  	let paddingDiv=document.createElement("div");
	  	paddingDiv.className="Following-container1-padding";
	  	parent.appendChild(paddingDiv);
		})
	  let paddingDiv=document.querySelectorAll(".Following-container1-padding");
	  [].forEach.call(paddingDiv,(padding,i)=>{
	  	if(data[i].cover_img!=""){
				let cover_img=data[i].cover_img;
	  		let headerImg=document.createElement("img");
	  		headerImg.src=cover_img;
	  		headerImg.className="Following-container1-header";
	  		padding.appendChild(headerImg);
			}
			else{
				let headerImg=document.createElement("img");
				headerImg.src="Images/DefaultCoverImage.png";
				headerImg.className="Following-container1-header";
				padding.appendChild(headerImg);
			}
	  		let body=document.createElement("div");
	  		body.className="Following-container1-body";
	  		padding.appendChild(body);
	   		let footer=document.createElement("div");
	  		footer.className="Following-container1-footer";
	  		padding.appendChild(footer);
	})  			
	 let body=document.querySelectorAll(".Following-container1-body");
	 let footer=document.querySelectorAll(".Following-container1-footer");
	 [].forEach.call(body,(body,i)=>{
		[].forEach.call(footer,(footer,ind)=>{
		   if(i==ind){
				 let profile_pic=data[i].profile_img;
				let profile_img=document.createElement("img");
	  			profile_img.src=profile_pic;
	  			body.appendChild(profile_img);
	  			let body_in=document.createElement("div");
	  			body_in.className="Following-container1-body-inside";
	  			body.appendChild(body_in);
				let footerContent=document.createElement("div");
	  			footer.appendChild(footerContent);
			}
	})})
	let body_in=document.querySelectorAll(".Following-container1-body-inside");
	 let footerContent=document.querySelectorAll(".Following-container1-footer div");
	 [].forEach.call(body_in,(body_in,i)=>{
		[].forEach.call(footerContent,(footc,ind)=>{
		   if(i==ind){
				 let [full_name,user_name,user_descrp]=[data[i].full_name,data[i].user_name,data[i].user_bio];
			    	let fullName=document.createElement("h3");
	  				fullName.textContent=full_name;
	  				body_in.appendChild(fullName);
	  				let userName=document.createElement("span");
	  				userName.className="text-property";
	  				userName.textContent=`@ ${user_name}`;
	  				body_in.appendChild(userName);
					let user_bio=document.createElement("p");
	  				user_bio.className="text-property";
	  				user_bio.textContent=user_descrp;
	  				footc.appendChild(user_bio);
			}
		})
	})
}
PromiseCall(this.PromiseList[++list])
			.then(d=>followers_data(d.data))
			.catch(error=>console.log(error));

function followers_data(data){
	[].forEach.call(data,dataV=>{
	  let mainBlock=document.createElement("div");
 	  mainBlock.className="Followers-container1";
	  document.querySelector(".Followers-container-body").appendChild(mainBlock);
	  })
	  let parentDiv=document.querySelectorAll(".Followers-container1");
	  
	  [].forEach.call(parentDiv,(parent,i)=>{
	  	let paddingDiv=document.createElement("div");
	  	paddingDiv.className="Followers-container1-padding";
	  	parent.appendChild(paddingDiv);
		})
	  let paddingDiv=document.querySelectorAll(".Followers-container1-padding");
	  [].forEach.call(paddingDiv,(padding,i)=>{
			if(data[i].cover_img!=""){
				let cover_img=data[i].cover_img;
	  		let headerImg=document.createElement("img");
	  		headerImg.src=cover_img;
	  		headerImg.className="Followers-container1-header";
	  		padding.appendChild(headerImg);
			}
			else{
				let headerImg=document.createElement("img");
				headerImg.src="Images/DefaultCoverImage.png";
				headerImg.className="Followers-container1-header";
				padding.appendChild(headerImg);
			}
	  		let body=document.createElement("div");
	  		body.className="Followers-container1-body";
	  		padding.appendChild(body);
	   		let footer=document.createElement("div");
	  		footer.className="Followers-container1-footer";
	  		padding.appendChild(footer);	  				
	})
	let body=document.querySelectorAll(".Followers-container1-body");
	let footer=document.querySelectorAll(".Followers-container1-footer");
		[].forEach.call(body,(body,i)=>{
		[].forEach.call(footer,(footer,ind)=>{
		   if(i==ind){
				 	let profile_pic=data[i].profile_img;
			   	let profile_img=document.createElement("img");
	  			profile_img.src=profile_pic;
	  			body.appendChild(profile_img);
	  			let body_in=document.createElement("div");
	  			body_in.className="Followers-container1-body-inside";
	  			body.appendChild(body_in);
				let footerContent=document.createElement("div");
	  			footer.appendChild(footerContent);
			}
		})
	})
	let body_in=document.querySelectorAll(".Followers-container1-body-inside");
	 let footerContent=document.querySelectorAll(".Followers-container1-footer div");
	 [].forEach.call(body_in,(body_in,i)=>{
		[].forEach.call(footerContent,(footc,ind)=>{
		   if(i==ind){
				let [full_name,user_name,user_descrp]=[data[i].full_name,data[i].user_name,data[i].user_bio];
				let fullName=document.createElement("h3");
     			fullName.textContent=full_name;
				body_in.appendChild(fullName);
				let userName=document.createElement("span");
	  			userName.className="text-property";
	  			userName.textContent=`@ ${user_name}`;
	  			body_in.appendChild(userName);
				let user_bio=document.createElement("p");
	  			user_bio.className="text-property";
	  			user_bio.textContent=user_descrp;
	  			footc.appendChild(user_bio);
			}
		})
	})
}