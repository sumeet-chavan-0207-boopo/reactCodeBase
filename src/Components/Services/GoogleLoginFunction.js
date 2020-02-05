var google_auth_window=null;
export function googleLogin()
{
	  let redirect_uri = process.env.REACT_APP_GOOGLEURL;
	  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
	  let url="https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=code&client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&state=GOOGLETEST&redirect_uri="+redirect_uri;
	  google_auth_window = window.open(url, "fb-login", "width=600,height=600,top=100,left=300"); 
}

window.addEventListener('message',function(e){
  	processMessage(e.data)
} , false); 

async function processMessage(data)
{
	 if(data.hasOwnProperty("googleLogin"))
	 {
		  google_auth_window.close();
		  // var data=data["googleLogin"];
		  // console.log(data);
		  // let authData = {
		  //       authData: {
		  //       "id": data["id"],
		  //       "access_token": data["accessToken"],
		  //       "is_mobile_sdk": false, 
		  //       "full_data":data["full_data"]
		  //       }
		  //     }
		  //   console.log(authData);  
	  //loginUserViaTPAuth('google',authData)    
	  }
}