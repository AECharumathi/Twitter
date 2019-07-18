var PromiseList=[ "https://fsd1.herokuapp.com/users/login",
                  "​https://fsd1.herokuapp.com/users/create"
                ];
async function response(url,init){
                    let PromiseCall=await fetch(url,init);
                    let data=await PromiseCall.json()
                    return data;
                    }
function loginMsg(event,email,password){
    event.preventDefault();
    let loginEmail=email.value;
    let loginPassword=password.value;

    var user={
        "user_email":loginEmail,
        "user_pass":loginPassword
    };

    var init = {
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json'
        }
    };
   
    response("https://fsd1.herokuapp.com/users/login",init)
   .then(data=>{
            if(data.status!="success"){
                document.getElementById("loginWarningMsg").textContent="Enter valid credentials";
            }
            else{
                window.location.href="../Twitter Home Page/home.html";
            }
        })
        .catch(error=>console.log(error));
}	



async function signUp(event){
    event.preventDefault();
    let userName =document.getElementById('username').value;
    let email=document.getElementById('emailId').value;
    let password=document.getElementById('passwd').value;
    let confirmPassword=document.getElementById('confirmpasswd').value;
    if(password==confirmPassword){
        var user={
            user_name: userName,
            user_email: email,
            user_pass:password
        };

        var init = {
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        };
        response("https://fsd1.herokuapp.com/users/create",init)
            .then(data=>{
                        if(data.status!="success"){
                            document.getElementById("signUPWarningMsg").textContent=data.message;
                        }
                        else{
                            document.getElementById("signUPWarningMsg").textContent=data.message;
                        }
            })
            .catch(error=>console.log(error));
    }
    else{
        document.getElementById("warningMsg").textContent="Password mismatch. Please try again later";
    }

}	