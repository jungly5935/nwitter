import React, { useEffect, useState } from "react";
import AppRouter from 'components/Router';
import { authService } from '../fbase';

function App() {
  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false); //로그인여부 확인 가능
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) =>  {
    if(user){
      setisLoggedIn(true)
      // setUserObj(user);
      setUserObj({
        displayName:user.displayName,
        uid:user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
    } else{
      setisLoggedIn(false)
      setUserObj(null)
    }
    setInit(true)
    })
    
  }, [])
  

  // console.log(authService.currentUser)
  // setInterval(() => {
  //   console.log(authService.currentUser)
  // }, 2000)


  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <div>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/>  : "Initializing..."}
      {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
    </div>
  );
}

export default App;
