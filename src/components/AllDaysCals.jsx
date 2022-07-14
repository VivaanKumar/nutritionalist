import React, {useState, useEffect} from 'react'

export default function AllDaysCals() {
    const [allDaysCals, setAllDaysCals] = useState([]);
    useEffect(() => {
        let getPreviousDayArray = localStorage.getItem("calorieDays") ? JSON.parse(localStorage.getItem("calorieDays")) : [];
        getPreviousDayArray.sort((a, b) => a.timestamp - b.timestamp);
        console.log(getPreviousDayArray)
        setAllDaysCals(getPreviousDayArray);
    }, [])
    
  return (
      <div className="jeertf">
          <div className="navbar">
          <p></p>
          <p>All Calories of Days Recorded</p>
          <p></p>
          </div>
          <div className="previousDayCals">
              <p style={{color: "black"}}>{allDaysCals.length} record found</p>
              {allDaysCals.map((object) => (
                  <div style={{marginTop: "20px"}} className="aDayCals">
                      <strong style={{ color: 'black' }}>{object.calories}/{object.outOf} calories</strong>

                      <p style={{color : "grey"}}>{(new Date(object.timestamp)).toLocaleString()}</p>
                </div>
              ))}
          </div>
    </div>
  )
}
