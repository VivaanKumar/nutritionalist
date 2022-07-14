import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import SignInButton from "./SignInButton";

const Base = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    if(user) {
      window.location.pathname = "/logged-in"
    }
  }, [])
  return (
    <>
      <Navbar choose={false} />
    <div className="base">
      <h2 className="slogan">IMAGINE IF YOU COULD...</h2>
      <p className="slogan-text">...search your foods calories in a snap, find out nutritional facts of your favorite foods? Check out allergie risks harmful to you? </p>
      <SignInButton text="Start now"/>
    </div>
    </>
  )
}

export default Base;