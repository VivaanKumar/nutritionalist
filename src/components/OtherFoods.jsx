import React, { useState, useEffect } from 'react';
import { db } from "./Constant";

function OtherFoods() {
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        db.collection("userFoods").onSnapshot((snapshot) => {
            setFoods(snapshot.docs.map((doc) => ({ food: doc.data(), id: doc.id })));

      })
    }, [])
    const addToCalories = (cals) => {
      const getPrevCals = localStorage.getItem("cals");
      localStorage.setItem("cals", (Number(getPrevCals) + Number(cals)));
      window.location.pathname = "/logged-in"
    }
    
  return (
      <div>
          <div className="navbar">
              <p></p>
              <p>Food Posts</p>
              <p></p>
          </div>
          <div className="otherFoods">
              {foods.map(({ food, id }) => (
                  <div className="foode">
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between", padding: "0px 8px"}}>
                          <strong style={{ color: "black" }}>{food.userEmail.replace("@gmail.com", "")}</strong>
                          <img style={{width: "35px", height: "35px", borderRadius: "8px"}} src={food.userPhotoURL }/>
                      </div>
                       <strong style={{ color: "black", textAlign: "right" }}>This is the '{food.name}'</strong>
                      <img style={{ width: "80vw", height: "35vh" }} src={food.image} />
                      <p style={{ color: "black" }}>{food.desc}</p>
                      <strong style={{ color: "black" }}>Nutrition & Recipe: </strong>
                      <p style={{ color: "grey" }}>{food.nutrit}</p>
                      <p style={{ color: "grey" }}>Calories: {food.calories}</p>
                      <button onClick={() => addToCalories(food.calories)} className="buttonC">Add to todays calories</button>
                  </div>
              ))}
          </div>
      </div>
  )
}

export default OtherFoods