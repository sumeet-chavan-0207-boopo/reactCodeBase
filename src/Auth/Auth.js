import {GetRequestFunction,PostRequestFunction} from '../api/ApiHelper';
import {getApiurl} from '../api/ApiKeys';
import {getCookieFunction,flushCookieFunction} from '../Components/Services/CookieController';


export async function checkAuthentication(permission,isdashboard=false)
{
    let gettoken = getCookieFunction("token");
    if(gettoken)
    {
        let param = {token : gettoken}

        let url = getApiurl("getpermission");
        let permissionList = await GetRequestFunction(url,{},param);
        if(permissionList.success)
        {
             let permissionArray = permissionList.permissions;
             if(permissionArray.includes(permission))
             { 
                return permissionArray;
             }else
             {
                if(isdashboard)
                {
                   logoutWithToken();
                }
                else
                {
                   redirectToDashboard();
                }
             }
        }else
        {
            logout();
        }
    }else
    {
       logout();
    }
}

function logout()
{
   flushCookieFunction('token');
   window.location.href = "/"
}


export async function logoutWithToken()
{
   let gettoken = getCookieFunction("token");
   let url = getApiurl("getpermission");
   let head = {bearer : gettoken}
   await PostRequestFunction(url,head,{});
   logout()
}

function redirectToDashboard()
{
  window.location.href = "http://localhost:3000/task";
}