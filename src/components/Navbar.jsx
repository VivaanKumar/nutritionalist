import React, {useState, useEffect} from "react";
import SignInButton from "./SignInButton";
import Avatar from '@mui/material/Avatar';
import { db } from "./Constant";


const Navbar = ({choose}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if(choose) return;
    db.collection("users").doc(user?.email).onSnapshot((snapshot) => {
      console.log(snapshot)
    })
  }, [])
  return (
    <nav style={{alignItems: "center"}} className="navbar">
      {user ? <>
        {!choose ? (
          <>
            <div className="okse" style={{alignItems: "center", display: "flex"}}>
            <Avatar sx={{ bgcolor: "black" }}>{user?.email.charAt(0).toUpperCase()}</Avatar>
              <p onClick={() => { localStorage.setItem("user", JSON.stringify(null)); window.location.href = "/"}} style={{backgroundColor: "black", color: "white", width: "21.875px", "height": "21.875px", borderRadius: "4px", textAlign: "center", marginLeft: "5px"}}>{"<"}</p>
            </div>
            <p>Today</p>
            <p><i onClick={() => window.location.href = "/more" }style={{color: "white"}}className="fa fa-bars button small-btn newRoundedEdgeNav"></i></p>
          </>
        ) : (
          <>
            <p></p>
            <p>Search for...</p>
            <p></p>
          </>
        )}
      </>
      : <>
        <p style={{marginLeft: "10px"}}>Nutritonalist</p>
        <SignInButton text={"Log in with Google"}/>
      </>}

    </nav>
  )
}

export default Navbar;
