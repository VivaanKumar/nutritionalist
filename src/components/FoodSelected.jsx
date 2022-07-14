import React, { useState , useEffect} from 'react'

export default function FoodSelected() {
    const [data, setData] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [foodMeasureName, setFoodMeasureName] = useState("");
  const [foodMeasureWeight, setFoodMeasureWeight] = useState(100);
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [fat, setFat] = useState("");
  const [pot, setPot] = useState("");
  const [justForThis, setJustForThis] = useState("");
  const [vitaminC, setVitaminC] = useState([]);
  const [vitaminA, setVitaminA] = useState([]);
  const [vitaminD, setVitaminD] = useState([]);
  const [vitaminK, setVitaminK] = useState([]);
  const [vitaminE, setVitaminE] = useState([]);
  const [toggleVi, setToggleVi] = useState(false);


    // const [carbs, setCarbs] = useState(0);
  useEffect(() => {
      setData(JSON.parse(localStorage.getItem("food")));
    let d = JSON.parse(localStorage.getItem("food"));
    if (d.foodMeasure !== []) {
      setFoodMeasureName(d.foodMeasure[0]);
      setMultiplier(d.foodMeasure[1] / 100);
      setFoodMeasureWeight(d.foodMeasure[1]);
    }
    if (d.title == "100 GRAND Bar") {
      setJustForThis("KIND Bar Minis, Variety Pack, Dark Chocolate Nuts, Caramel Almond Sea Salt, Peanut Butter Dark Chocolate, Gluten Free, Low Sugar, 0.7 oz. (Protein extra 1.95 G per single)")
    }
    
      console.log(d);
      for (let i = 0; i < d.nutrition.length; i++) {
        //calories
          if (d.nutrition[i].nutrientId == 1008) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setCalories([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1003) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setProtein([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1004) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setFat([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1092) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setPot([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1092) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setPot([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1162) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setVitaminC([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1106) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setVitaminA([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1114) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setVitaminD([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1185) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setVitaminK([d.nutrition[i].value,d.nutrition[i].unitName])
        }
        if (d.nutrition[i].nutrientId == 1109) {
            console.log(d.nutrition[i].value, d.nutrition[i].unitName)
            setVitaminE([d.nutrition[i].value,d.nutrition[i].unitName])
          }
      }
  }, [])
    const addToCalories = () => {
      const getPrevCals = localStorage.getItem("cals");
      localStorage.setItem("cals", (Number(getPrevCals) + Number(calories[0]) * multiplier));
      window.location.pathname = "/logged-in"
    }
    return (
        <div className="backg">
        <div className="navbar">
        <p></p>
            <h2 style={{ color: "white", fontWeight: "normal" }}>{data.title}</h2>
            
            <p></p>
        </div>
        <div className="nutritionVal">
        <p style={{ color: "black" }}>Category: {data.category}</p>
        <p style={{ color: "black" }}>Published: {data.published}</p>
          <p style={{ color: "black" }}>Source from: {data.dataType}</p>
          </div>
        <button className={ multiplier == 1 ? "buttondisabled" : ""} onClick={() => setMultiplier(1)}>100 grams</button>
        {foodMeasureWeight ? <button className={multiplier == (foodMeasureWeight / 100) ? "buttondisabled" : ""} onClick={() => setMultiplier(foodMeasureWeight / 100)}>{foodMeasureName} ({foodMeasureWeight} grams)</button> : <button>No Other Measures found</button>}
        <div className="nutritionVal">
        <p></p>
        <p style={{ color: "skyblue" }}>Calories: {(calories[0] * multiplier).toFixed(1) + " " + calories[1]}</p>
        <p style={{ color: "skyblue" }}>Protein: {(protein[0] * multiplier).toFixed(1) + " " + protein[1]}</p>
        <p style={{ color: "skyblue" }}>Fat: {(fat[0] * multiplier).toFixed(1) + " " + fat[1]}</p>
        <p style={{ color: "skyblue" }}>Pottasium: {(fat[0] * multiplier).toFixed(1) + " " + fat[1]}</p>
        </div>
        <p onClick={() => setToggleVi(!toggleVi)}className="vitamin" style={{ color: "black", textDecoration: "underline", backgroundColor: "white", padding: "12px 8px", width: "50vw", borderRadius: "8px", display: "inline-block", cursor: "pointer", marginRight: "-15px" }}>Vitamins <i className="fa fa-sort-desc" aria-hidden="true"></i></p>
        {toggleVi && <div className="toggleVitamin">
          <p style={{ color: "black" }}>Vitamin C: {(vitaminC[0] * multiplier).toFixed(1)} {vitaminC[1]}</p>
          <p style={{ color: "black" }}>Vitamin A: {(vitaminA[0] * multiplier).toFixed(1)} {vitaminA[1]}</p>
          <p style={{ color: "black" }}>Vitamin D: {(vitaminD[0] * multiplier).toFixed(1)} {vitaminD[1]}</p>
          <p style={{ color: "black" }}>Vitamin K: {(vitaminK[0] * multiplier).toFixed(1)} {vitaminK[1]}</p>
          <p style={{ color: "black" }}>Vitamin E: {(vitaminE[0] * multiplier).toFixed(1)} {vitaminE[1]}</p>
          <button onClick={() => setToggleVi(false)} className="btne"><p style={{ color: "black" }}>Close</p> <i style={{}} className="fa fa-times" aria-hidden="true"></i></button>
        </div>}
        <br/><br/>
        <p style={{color: "black"}}>Allergies: (Under Development)</p>
        <p className="e2e" style={{ color: "grey" }}>Similar but healthier foods: {justForThis ? justForThis : "Not found. Fixed in full prototype"}</p>
        <br/>
        <button onClick={ addToCalories} style={{ color: "white", backgroundColor: "#a9f04b", borderRadius: "8px"}}>Add calories to Today Calories</button>
        <br />
        <br/>
        <button className="buttonC" style={{ backgroundColor: "#23272a", color: "white", borderRadius: "8px" }}>Give us Feedback</button>
        <br />
        <br/>
            </div>
  )
}
