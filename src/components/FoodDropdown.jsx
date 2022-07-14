import React from 'react'

export default function () {
  const searchLocate = () => {
    window.location = "search"
  }
    const searchLocateC = () => {
    window.location = "/ask"
  }
  const searchLocateB = () => {
    window.location = "/diet"
  }
  return (
    <div className="FoodDropdown newRoundedEdge1">
      <div onClick={searchLocate} className="FoodIcon">Search foods</div>
      <div onClick={searchLocateB }className="FoodIcon">Make Diet Plan</div>
      <div onClick={searchLocateC} className="FoodIcon">Ask the AI</div>
    </div>
  )
}
