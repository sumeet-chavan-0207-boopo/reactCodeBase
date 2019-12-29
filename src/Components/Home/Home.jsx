import React,{useState} from 'react';
import {javascript_info,java_info,python_info} from './HomeUtils';
import classes from './Home.module.css';


export default function Home() {

    const [textInfo,setTextInfo]=useState(javascript_info)

    const selectedDropdown=(event)=>{
    
        const selected_value=event.target.value;
    
        if(selected_value==="js"){
            setTextInfo(javascript_info)
        }
        if(selected_value==="java"){
            setTextInfo(java_info)
        }
        if(selected_value==="py"){
            setTextInfo(python_info)
        }
    }
    

    return (
      <div >
        <div className={classes.home_container}>
          
            <DropDown selectedDropdown={selectedDropdown}/>
            <Information textInfo={textInfo}/>
        </div>
     </div> 
    )
}

const DropDown = ({selectedDropdown}) =>{
    return(
        <div>
             <select id="lang_detail" onChange={selectedDropdown} className={classes.dropdown_font}>
                 <option value="js">Javascript</option>
                 <option value="java">Java</option>
                 <option value="py">Python</option>
             </select>
        </div>

    )
}

const Information = ({textInfo}) =>{

    return (
        <div className={classes.textinfo_container}>
               {textInfo}
        </div>
    )

}


