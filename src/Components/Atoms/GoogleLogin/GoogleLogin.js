import React from 'react';
import {googleLogin} from '../../Services/GoogleLoginFunction';

export default function GoogleLogin(){
    return (
         <div>
           <button onClick={googleLogin}>Google Login</button>
         </div> 
    )
}
