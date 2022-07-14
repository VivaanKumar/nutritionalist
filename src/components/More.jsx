import React from 'react'

export default function More() {
    return (
        <>
            <div className="navbar">
                <p></p>
                <p style={{marginLeft: "75px"}}>More Settings</p>
                <button onClick={() => window.location.href = "/logged-in" } className="buttonA">{"<"}</button>
        </div>
            <div style={{ marginTop: "-50px" }} className="more">
                
                <li onClick={() => window.location.href = "/local-help"}>Community Nutrition Help</li>
                <hr/>
                <li onClick={() => window.location.href = "/add-food"}>Add food to database</li>
                <hr/>
                <li onClick={() => window.location.href = "/feedback" }>Feedback</li>
            </div>
            </>
  )
}
