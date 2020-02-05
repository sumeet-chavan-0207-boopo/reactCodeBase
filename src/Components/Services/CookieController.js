import Cookies from 'universal-cookie';
const cookies = new Cookies();


//set and get email_id and password 
export function getCookieFunction(key)
{
   let cookietoken = cookies.get(key);
   return cookietoken;
}   


export function setCookieFunction(key,data)
{
   cookies.set(key,data);

}

export function flushCookieFunction(key)
{
   cookies.remove(key);

}