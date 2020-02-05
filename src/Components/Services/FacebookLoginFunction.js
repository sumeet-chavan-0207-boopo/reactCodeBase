var fb_auth_window=null;

export function fbLogin()
{
  let redirect_uri = process.env.REACT_APP_FBURL;
  let url="https://www.facebook.com/v3.1/dialog/oauth?scope=email%20public_profile&response_type=code&client_id="+process.env.REACT_APP_FB_CLIENT_ID+"&state=FACEBOOKTEST&redirect_uri="+redirect_uri
  fb_auth_window = window.open(url, "fb-login", "width=600,height=600,top=100,left=300");
}

window.addEventListener('message',function(e) {
  processMessage(e.data)
} , false);

async function processMessage(data){
  if(data.hasOwnProperty("facebookLogin")){
  fb_auth_window.close();
  var getdata=data["facebookLogin"];
  console.log(getdata);
  // let authData = {
  //       authData: {
  //       "id": getdata["id"],
  //       "access_token": getdata["accessToken"],
  //       "is_mobile_sdk": false, 
  //       "full_data":getdata["full_data"]
  //       }
  //     }
  }
}