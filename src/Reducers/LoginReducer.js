const start_state={loggedin:false,user:{}};

const LoginReducer=(initial_state=start_state,action)=>{
    if(action.type=='LOGGED_IN'){
        return {
            loggedin:true,
            user:action.user
        }
    }
}
export default LoginReducer;