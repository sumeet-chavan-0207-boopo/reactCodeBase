export const fakeAuth = {
  
  
    authenticate(cb,user_name,user_pass) {
      const userName=localStorage.getItem("user_name");
      const userPass=localStorage.getItem("user_pass");
     
      if(!userName && !userPass){
      
        localStorage.setItem("user_name","sam");
        localStorage.setItem("user_pass","12345")
        sessionStorage.setItem("isAuthenticated",true)
       
        setTimeout(cb(true), 100);

      }
      else if(userName==user_name && userPass==user_pass){
        
        sessionStorage.setItem("isAuthenticated",true)
        setTimeout(cb(true), 100);

      }
      else{
     
        setTimeout(cb(false), 100);
      }

    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      sessionStorage.setItem("isAuthenticated",false)
      setTimeout(cb, 100);
   
    }
  
};

export const isAuthenticated="isAuthenticated"