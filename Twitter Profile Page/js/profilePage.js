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
			
function PromiseCall(url){
	return fetch(url)
			.then(response=>response.json())
			.catch(error=>console.log(error));	
}

function TweetDate(month){
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; 	
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
	[].forEach.call(data,(mediaFile,i)=>{
		if(mediaFile.type==="video"){
				let mediaElem=document.createElement("video");
						mediaElem.src=mediaFile.url;
						mediaElem.className="side-container1-body-div";
				  		document.querySelector(".side-container1-body").appendChild(mediaElem);
			}
		else if(mediaFile.type==="image"){
				let mediaElem=document.createElement("img");
						mediaElem.src=mediaFile.url;
						mediaElem.className="side-container1-body-div";
						document.querySelector(".side-container1-body").appendChild(mediaElem);
			}
	})
}

PromiseCall(this.PromiseList[++list])
						.then(d=>friend_suggestion(d.data));
						
function friend_suggestion(data){

	[].forEach.call(data,()=>{
		let element_div=document.createElement("div");
 	 	element_div.className="side-container2-body";
	  	document.querySelector("#side-container2").appendChild(element_div);
	})
	let parentDiv=document.querySelectorAll(".side-container2-body");
	
	[].forEach.call(parentDiv,(sug,i)=>{
		[].forEach.call(data,(data,ind)=>{
		   if(i==ind){
	  			let element_image=document.createElement("img");
	  	  		element_image.src=data.profile_img;
	  	  		sug.appendChild(element_image);
	  			let userName=document.createElement("span");
	  	  		userName.textContent=data.user_name;
	  	  		sug.appendChild(userName);	
	  			let fullName=document.createElement("div");
	  	  		fullName.className="text-property";
	  	  		fullName.textContent=data.full_name;
	  	  		sug.appendChild(fullName);	
	  			let follow=document.createElement("button");
	  	  		follow.className="button";
	      		follow.textContent="Follow";
				sug.appendChild(follow);
		}
	})
  })
}

PromiseCall(this.PromiseList[++list])
			.then(d=>tweet_data(d.data));

function tweet_data(data){
	[].forEach.call(data,dataV=>{
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
	  	  	element_follow.textContent=dataV.user.full_name;
	  	  	document.querySelector(".main-container2-header").appendChild(element_follow);	
	  		let element_span=document.createElement("span");
	  	  	element_span.className="text-property";
	  	  	element_span.textContent=`@ ${dataV.user.user_name}`;
	  	  	document.querySelector(".main-container2-header").appendChild(element_span);
	  		let element_span1=document.createElement("span");
	  	  	let tweet_date=new Date(dataV.created_at);
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
	  	div_body.textContent=dataV.text;
	   	document.querySelector(".main-container2").appendChild(div_body);
		 	if(dataV.entities.hasOwnProperty('media')){
				if(dataV.entities.media[0].type==="video"){
					let mediaElem=document.createElement("video");
						mediaElem.src=dataV.entities.media[0].link;
						mediaElem.controls=true;
						mediaElem.className="tweet-video";
						document.querySelector(".main-container2-body").appendChild(mediaElem);
				} else if(dataV.entities.media[0].type==="image"){
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

PromiseCall(this.PromiseList[++list])
			.then(d=>following_data(d.data));

function following_data(data){
	[].forEach.call(data,dataV=>{
	  let mainBlock=document.createElement("div");
 	  mainBlock.className="Following-container1";
	  document.querySelector(".Following-container-body").appendChild(mainBlock);
	  })
	  let parentDiv=document.querySelectorAll(".Following-container1");
	  
	  [].forEach.call(parentDiv,(parent,i)=>{
	  	var paddingDiv=document.createElement("div");
	  	paddingDiv.className="Following-container1-padding";
	  	parent.appendChild(paddingDiv);
		})
	  var paddingDiv=document.querySelectorAll(".Following-container1-padding");
	  [].forEach.call(paddingDiv,(padding,i)=>{
	  if(data[i].cover_img!=""){
	  		let headerImg=document.createElement("img");
	  		headerImg.src=data[i].cover_img;
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
				let profile_img=document.createElement("img");
	  			profile_img.src=data[i].profile_img;
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
			    	let fullName=document.createElement("h3");
	  				fullName.textContent=data[i].full_name;
	  				body_in.appendChild(fullName);
	  				let userName=document.createElement("span");
	  				userName.className="text-property";
	  				userName.textContent=`@ ${data[i].user_name}`;
	  				body_in.appendChild(userName);
					let user_bio=document.createElement("p");
	  				user_bio.className="text-property";
	  				user_bio.textContent=data[i].user_bio;
	  				footc.appendChild(user_bio);
			}
		})
	})
}
PromiseCall(this.PromiseList[++list])
			.then(d=>followers_data(d.data));

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
	  		let headerImg=document.createElement("img");
	  		headerImg.src=data[i].cover_img;
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
			   	let profile_img=document.createElement("img");
	  			profile_img.src=data[i].profile_img;
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
				let fullName=document.createElement("h3");
     			fullName.textContent=data[i].full_name;
				body_in.appendChild(fullName);
				let userName=document.createElement("span");
	  			userName.className="text-property";
	  			userName.textContent=`@ ${data[i].user_name}`;
	  			body_in.appendChild(userName);
				let user_bio=document.createElement("p");
	  			user_bio.className="text-property";
	  			user_bio.textContent=data[i].user_bio;
	  			footc.appendChild(user_bio);
			}
		})
	})
}