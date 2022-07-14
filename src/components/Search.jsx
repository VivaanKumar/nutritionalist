import React, {useState, useEffect} from 'react'

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [type, setType] = useState("Branded");
  const onSubmit = async () => {
    const APP_KEY = "4QK1BE4kvc8FiEpPJNyVC1GRv0ZIDd0ANKqod34l"
    const req = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=30&api_key=${APP_KEY}`)
    const response = await req.json();
    setData(response.foods);
    console.log(response)
  }
  const onFoodClick = (food) => {
    let foodMeasure = [];
    if (food.foodMeasures !== []) {
      for (let i = 0; i < food.foodMeasures.length; i++) {
        if (food.foodMeasures[0]) {
          foodMeasure = [food.foodMeasures[0].disseminationText, food.foodMeasures[0].gramWeight]
        }
      }
    }
    const foodData = {
      title: food.description,
      dataType: food.dataType,
      published: food.publishedDate,
      category: food.foodCategory,
      nutrition: food.foodNutrients,
      foodMeasure: foodMeasure,
    }
    console.log(foodData);
    localStorage.setItem("food", JSON.stringify(foodData));
    window.location.pathname = "/food"
  }
  return (
    <div className="search">
        <div className="navbar">
            <p></p>
            <input onChange={(e) => setQuery(e.target.value)} placeholder="Search for ANY food..." className="searchNavbar"/>
            <button onClick={onSubmit} className="enterButton">Search</button>
        <p></p>
      </div>
      <div>
        <button className={type == "SR Legacy" ? "buttondisabled buttonC" : "buttonC"} onClick={() => setType("SR Legacy")}>SR Legacy</button>
        <button className={type == "Branded" ? "buttondisabled buttonC" : "buttonC"} onClick={() => setType("Branded")}>Branded</button>
        <button className={type == "Survey (FNDDS)" ? "buttondisabled buttonC" : "buttonC"} onClick={() => setType("Survey (FNDDS)")}>Survey</button>
        <button style={{}} className="buttonC"><a href="/other-foods">Other Users Foods</a></button>
      </div>
      {data.map(food => (
          <>
          {food.dataType == type ? (
            <div onClick={() => onFoodClick(food) } className="food">
              <strong style={{ color: "black" }}>{type == "Branded" && food.brandOwner}</strong>
              <p style={{ color: "black" }}>{food.description}</p>
            </div>
          ) : <></>}
        </>
        
      ))}
    </div>
  )
}


export default Search;
