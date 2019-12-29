export const fakeAuth = {
  
    isAuthenticated: false,
    authenticate(cb,user_name,user_pass) {
      const userName=localStorage.getItem("user_name");
      const userPass=localStorage.getItem("user_pass");
     
      if(!userName && !userPass){
      
        localStorage.setItem("user_name","sam");
        localStorage.setItem("user_pass","12345")
        fakeAuth.isAuthenticated = true;
        setTimeout(cb(fakeAuth.isAuthenticated), 100);

      }
      else if(userName==user_name && userPass==user_pass){
        console.log(userName,user_name)
        fakeAuth.isAuthenticated = true;
        setTimeout(cb(fakeAuth.isAuthenticated), 100);

      }
      else{
        console.log(userName,userPass)
        fakeAuth.isAuthenticated = false;
        setTimeout(cb(fakeAuth.isAuthenticated), 100);
      }

    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
   
      setTimeout(cb, 100);
   
    }
  
};
