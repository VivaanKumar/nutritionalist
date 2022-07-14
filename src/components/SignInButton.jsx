import React, {useEffect, useState} from 'react';
import firebase from "firebase"
import { auth, provider } from "./Constant"


const SignInButton = ({text}) => {
  const SignIn = async () => {
    await auth.signInWithPopup(provider)
    .then((results) => {
      if(!results) return;
      const data = results.user;
      const dataDepth = {
        "name": data.displayName,
        "photoUrl": data.photoURL,
        "email": data.email
      }
      localStorage.setItem("user", JSON.stringify(dataDepth));
      window.location.pathname = "/logged-in"
    })
  }
  return (
    <button onClick={SignIn} className="button">
      <p>{text}</p>
    </button>
  )
}
        
export default SignInButton;
