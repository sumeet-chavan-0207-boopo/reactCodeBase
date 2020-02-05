import React from 'react';
import {fbLogin} from '../../Services/FacebookLoginFunction';

export default function FacebookLogin(){
    return (
         <div>
         	<button onClick={fbLogin}>Facebook Login</button>
         </div> 
    )
}
