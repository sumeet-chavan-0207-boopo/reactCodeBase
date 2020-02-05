export function getApiurl(apikey)
{

	const PATH = "https://node-base-api.herokuapp.com";
	var allapiurl = {
		"getallstudent" : `${PATH}/student/list`,
		"viewstudent": `${PATH}/student/view`,
		"updatestudent": `${PATH}/student/update`,
		"deletestudent": `${PATH}/student/delete`,
		"getpermission": `${PATH}/acl/permissions`,
		"createstudent": `${PATH}/user/create`,
		"login" : `${PATH}/auth/login`,
		"logout" : `${PATH}/auth/logout`,
		                     
	} 

	let requestedapiurl=allapiurl[apikey];
	return requestedapiurl;
} 
