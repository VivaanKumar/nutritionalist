import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FoodDropdown from "./FoodDropdown";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [addFood, setAddFood] = useState(false);
  const [routine, setRoutine] = useState(true);
  const [onCalories, setOnCalories] = useState(false);
  const [calories, setCalories] = useState(0);
  const [calorieWant, setCalorieWant] = useState("");
  const [todayCals, setTodayCals] = useState(0);
  const [menuToggle, setMenuToggle] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("dailyCals") == null) {
      localStorage.setItem("dailyCals", 2000);
    }
    if (localStorage.getItem("calorieDays") == null) {
      localStorage.setItem("calorieDays", JSON.stringify([]));
    }
    if (localStorage.getItem("cals") == null) {
      localStorage.setItem("cals", 0);
    }
    setCalories(localStorage.getItem("dailyCals"));
    setTodayCals(localStorage.getItem("cals"))
    if(user == null) {
      window.location.pathname = "/";
    }
  }, [])
  const notify = () => {
    toast.success('Calorie Goal Set!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
    });   
  }
      
      const setDayCalories = () => {
        console.log(todayCals);
        if (todayCals < 100) {
          alert("The calorie you want to set is too low, set something above 100 calories max.")
        } else {
          let currentDaysCals = JSON.parse(localStorage.getItem("calorieDays"));
          currentDaysCals.push({
            calories: todayCals,
            outOf: calories,
            timestamp: new Date()
          });
          localStorage.setItem("calorieDays", JSON.stringify(currentDaysCals));
          window.location.href = "/all-days-calories";
        }
    }
  const AddFood = () => {
    const OutFood = () => {
      setAddFood(false);
      document.getElementById("main").style.opacity = "1"
    }
    setAddFood(!addFood);
    if(!addFood) {
      document.getElementById("main").style.opacity = "0.3";
      document.getElementById("main").addEventListener("click", OutFood)
    } else {
      document.getElementById("main").style.opacity = "1"
      document.getElementById("main").removeEventListener("click", OutFood);
    }
  }
  const submitCalories = () => {
    setOnCalories(!onCalories);
  }
  const submitWantedCalories = (e) => {
    e.preventDefault();
    notify();
    setCalories(calorieWant);
    localStorage.setItem("dailyCals", calorieWant)
    console.log(calorieWant);
    setOnCalories(false);
  }
  return (
    <>
    <Navbar choose={false}/>
      <div id="main">
        <div id="maininner">
      <div  className="calories-div newRoundedEdge1">
      <p style={{fontSize: "20px", color: "black"}}>Calories Today</p>
      <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
              <h1>{Math.round(todayCals)}</h1>
            <h1 style={{ fontSize: "20px", color: "skyblue", marginTop: "6px", marginLeft: "5px" }}>cals</h1>
          </div>
                <p style={{ color: "grey"}}>/{calories} ({Math.floor((todayCals/calories).toFixed(2) * 100)}%)</p>
            <p style={{ color: "grey", fontSize: "12px" }}>{Number(todayCals) > Number(calories) ? "Above Calorie Need" : "Below Calorie Need"} <button onClick={() => { setTodayCals(0); localStorage.setItem('cals', "0") }}className="buttonP">Reset</button></p>
          </div>
          <div className="suggestion newRoundedEdge1">
            <button onClick={setDayCalories} className="buttonP">Save as today's calories</button>
          </div>
    <div className="suggestion newRoundedEdge1"><i className="fa fa-thumbs-up"></i> <p>You can eat as much as you want as long your daily calories are under budget but higher than needed</p> </div>
        <p onClick={submitCalories} className="set-goal" style={{ marginTop: "5px", backgroundColor: "white", padding: "12px 8px", width: "fit-content", display: "inline-block", borderRadius: "8px", boxShadow: "rgba(27, 31, 35, 0.04) 0px 2px 0px, rgba(255, 255, 255, 0.25) 0px 2px 0px inset", color: "black" }}>Set Calorie Goal <i style={{ color: "grey" }} className="fa fa-pencil"></i></p>
        {onCalories && (
          <form onSubmit={submitWantedCalories}>
              <input className="inputtext" placeholder="Daily calories. E.g 2000" type="text" onChange={ (e) => setCalorieWant(e.target.value)}/>
            <p style={{ color: "grey", fontSize: "12px", width: "250px", display: "inline-block",marginTop: "10px"}} class>We recommend for a healthy lifestyle, 2000 calories is the max</p>
          </form>
        )}
        {routine ? <div className="routine newRoundedEdge1">
          <p style={{ color: "black" }}>Try some Useful <a href="">Routines</a></p>
          <button onClick={() => setRoutine(false)} className="button denied"><p>×</p></button>
          </div> : <></>}
        </div>
        <ToastContainer />
        <div className="lensfood">
          <button onClick={() => window.location.pathname = "identify-food"} className="buttonPz">
            <div style={{display: 'flex'}}>
              <p style={{ color: "black" }}>Food Lens</p>
              <i className="fa fa-camera"></i>
            </div>
          </button>
          <button className="buttonPz e3ed">Or Chat Bot</button>
        </div>
    <div className="add-food">
      <button onClick={() => AddFood()}><p>+</p></button> - Add food
    </div>
      </div>
      <>
        {addFood ? <FoodDropdown /> : <></>}
        </>
    </>
  )
}

export default Main;
