import axios from 'axios';

export async function GetRequestFunction(apiurl,header={},parameter={})
{
	const headers = {
	 		 headers: header
	};

    try {
	    const data = await axios.get(apiurl,{ params: parameter},header);
	    return data.data;
      }catch(error){
	   	let  response = error && error.response
	    let  data =response && response.data || [];
	    return data;
     }
}

export async function PostRequestFunction(apiurl,header={},data={})
{
	try{
		 const getdata = await axios.post(apiurl,data,{
	        headers: header,
	    });

		return getdata.data;

		}catch (error){

			let  response = error && error.response
	   	    let  data =response && response.data || [];
	   	    return data;
  		}
} 

export async function DeleteRequestFunction(apiurl,header={},data={})
{
	try{

	const deletdata = await axios.delete(apiurl,{params:data},{
  		 headers: header
	});
		return deletdata.data;

	}catch (error){
		
		let  response = error && error.response
	   	let  data =response && response.data || [];
	   	return data;
    }
} 



