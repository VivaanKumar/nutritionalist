import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Base from "./components/Base";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import FoodSelected from "./components/FoodSelected";
import { useEffect, useState } from "react";
import Diet from "./components/Diet";
import Identify from "./components/Identify";
import AllDaysCals from "./components/AllDaysCals";
import More from "./components/More";
import Local from "./components/Local";
import AddFood from "./components/AddFood";
import OtherFoods from "./components/OtherFoods";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/logged-in" element={<Main/>}/>
          <Route exact path="/" element={<Base/>}/>
          <Route path="/search" element={<Search />} />
          <Route path="/food" element={<FoodSelected />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/identify-food" element={<Identify />} />
          <Route path="/all-days-calories" element={<AllDaysCals />} />
          <Route path="*" element={<PageNotFount />} />
          <Route path="/more" element={<More />} />
          <Route path="/local-help" element={<Local />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/other-foods" element={<OtherFoods />} />
          
          
          {/* {<Route path="/menuitem/:id" element={<MenuItem />} />} */}
        </Routes>
      </BrowserRouter>
    </>
)
}

const Ask = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [result, gotResult] = useState(false);
  const API_KEY = "60b378e6b0d74c47acb44157a9ffb8af";
  const AskFunction = async () => {
    const query = text.replaceAll(" ", "+");
    console.log(query);
    const req = await fetch(`https://api.spoonacular.com/recipes/quickAnswer?apiKey=${API_KEY}&q=${query}`);
    const response = await req.json();
    setData(response);
    gotResult(true);

    console.log(response)
  }
  return (
    <div className="ask">
      <div className="navbar">
        <p></p>
        <h2 style={{ color: "white", fontWeight: "normal" }}>Ask The AI</h2>
        <p></p>
      </div>
      <br />
      <textarea onChange={(e) => setText(e.target.value)} className="inputtext widthE" placeholder="Ask any questions you have about nutritional aspects, values. etc; anything related to food..."></textarea>
      <br/>
      <button style={{ color: 'white', borderRadius: "8px", width: "80px", backgroundColor: "#a9f04b" }} className="buttonC" onClick={AskFunction}>Ask</button><button onClick={() => window.location.pathname = "/logged-in" }className="buttonA"><i className="fa fa-angle-left"></i></button>
      <br /><br />
      {result && (
      <>
        <h2 style={{ color: 'black' }}>Answer:</h2>
          <p className="ans" style={{ color: 'black', fontStyle: "italic", width: "90vw", display: "inline-block" }}>"{data.answer}"</p>   
          <br/><br/>
          
          <button onClick={() => window.location.pathname = "feedback" }className="button">Not giving what you wanted? Give Feedback</button>
      </>  
      )}
    </div>
  )
}

const Feedback = () => {
  return (
    <div className="feedback">
      <div className="feedbacknav">
      <h3 style={{color: "black"}}>Unhappy with a product? Or just some nice feedback?</h3>
        <p style={{ color: "white" }}>Give feedback:</p>
      </div>
      <br />
      
        <textarea className="ta" placeholder="Feedback... Stretch to make bigger">
          
      </textarea>
      <br />
      <br/>
      <button className="button">Send Feedback</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p style={{ color: "grey" }}>Version 1.1</p>
      <p style={{ color: "black" }}>Feedback will be greatly appreciated <i style={{color: "lightgrey"}} className="fa fa-thumbs-up"></i></p>
    </div>
  )
}

const PageNotFount = () => {
  useEffect(() => {
  alert("This page is not valid, please go back to the main site - nutritionalist dev")
  }, [])
  return (
    <button onClick={() => window.location.href = "/"}>Return to home page</button>
  )
}


export default App; 
