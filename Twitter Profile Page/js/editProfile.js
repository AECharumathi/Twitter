var PromiseList=[ "https://fsd1.herokuapp.com/users/4/details",
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

async function response(url,init){
	let PromiseCall=await fetch(url,init);
	let data=await PromiseCall.json()
	return data;
}

function TweetDate(month){
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; 	
		return `${monthNames[month]}`;
}


var list=0;

PromiseCall(this.PromiseList[list])
		.then(data=> user_data(data.data))
		.catch(error=>console.log(error));	

function user_data(data){
		document.querySelector(".header-footer-body span:nth-child(1) h3")
						.textContent=data.stats.tweets;
		document.querySelector(".header-footer-body span:nth-child(2) h3")
						.textContent=data.stats.following;
		document.querySelector(".header-footer-body span:nth-child(3) h3")
						.textContent=data.stats.followers;
}


function editProfile(event){
			event.preventDefault();
			let profile_pic=document.getElementById('profile_pic').value;
			let cover_pic=document.getElementById('cover_pic').value;
			let user_name=document.getElementById('user_name').value;
			let full_name=document.getElementById('full_name').value;
			let email=document.getElementById('email').value;
			let password=document.getElementById('password').value;
			let confirm_password=document.getElementById('confirm_password').value;
			let gender=document.getElementById('gender').value;
			let url=document.getElementById('url').value;
			let location=document.getElementById('location').value;
			let bday=document.getElementById('bday').valueAsNumber;

				let user={
					user_name: user_name,
					user_email: email,
					user_birthday: bday, 
					user_from:location,
					user_website:url 
				};
				
				const init = {
					method:'PUT',
					body:JSON.stringify(user),
					headers:{
						'Content-Type':'application/json'
					}
				}
		respnse("https://fsd1.herokuapp.com/users/4/profile",init)
			.then(data=>{
				if((user.user_name==data.user_name)&&(user.user_email==data.user_email)&&(user.user_birthday==data.user_birthday)&&(user.user_from==data.user_from)&&(user.user_website==data.user_website)){
					document.getElementById("warningMsg").textContent="No change";
				}
				else{
					if(data.status!="success"){
						document.getElementById("warningMsg").textContent=`Please enter proper value`;
					}
					else{
						document.getElementById("warningMsg").textContent=data.message;
					}
				}
				})
			.catch(error=>console.log(error));
}