import React, { useEffect, useState } from 'react'
import { DragPreviewImage } from 'react-dnd';
import firebase from "firebase";
import { storage } from "./Constant";

export default function Identify() {
    const [image, setImage] = useState("");
    const [info, setInfo] = useState([]);
    const [infoOn, setInfoOn] = useState(false);
    const API_KEY = "ce6d7d6d8270479b986c8a2ea34128f2";
    const handleChange = (e) => {
        setImage(e.target.value);
    }
    const uploadChange = () => {
        document.getElementById("imageShow").src = image;
    }

    const scanChange = () => {
        fetch(`https://api.spoonacular.com/food/images/analyze?apiKey=${API_KEY}&imageUrl=${image}`)
            .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setInfo(data);
            setInfoOn(true)
    })
    }
    const fileOnChange = (e) => {
        if (e.target.files[0]) {
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            document.getElementById("imageShow").src = selectedImageSrc;
            const randomId = Math.random(0) * 1000;
            const uploadTask = storage.ref(`images/${randomId}.jpg`)

                .put(e.target.files[0])
            uploadTask.on("state_changed", (snapshot) => {
                    
            }, (error) => {
                console.log(error)
            }, () => {
                storage.ref("images").child(`${randomId}.jpg`)
                    .getDownloadURL()
                    .then((imageUrl) => {
                        console.log(imageUrl);
                        setImage(imageUrl)
                    })
            })
                

        }
    }
    // const uploadChange = () => {
    //     fetch(`
    //     https://api.spoonacular.com/food/images/analyze?apiKey=${API_KEY}&imageUrl=${image}
    // `)
    //         .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data);
    // })
    // }
  return (
      <div className="lens">
          <div className="controloflens">
            <input placeholder="Image URL..." onChange={handleChange} id="inpFile" />
            <button onClick={uploadChange}>Upload</button>
              <button onClick={scanChange}>Scan</button>
              <br />
              <p onChange={fileOnChange} style={{color: "black", marginTop: "10px"}}>Or Choose File: <input type="file" style={{borderRadius: "8px"}}/></p>
          </div>
          <div style={{textAlign: 'center', marginTop: "20px"}}>
              <img style={{borderRadius: "8px"}} id="imageShow" />
              </div>
          {infoOn ? (
            <div style={{textAlign: 'center', marginTop: "5px"}}>
                  <h2 style={{color: "black"}}>Type: {info.category.name} ({(info.category.probability.toFixed(2) * 100)}%)</h2>
                  <p style={{color: "black"}}>Calories: {info.nutrition.calories.value} {info.nutrition.calories.unit}</p>
                  <p style={{color: "black"}}>Carbs: {info.nutrition.carbs.value} {info.nutrition.carbs.unit}</p>
                  <p style={{color: "black"}}>Fat: {info.nutrition.fat.value} {info.nutrition.fat.unit}</p>
                  <p style={{color: "black"}}>Protein: {info.nutrition.protein.value} { info.nutrition.protein.unit}</p>
            </div>
          ) : <div style={{ color: "black", textAlign: "center", cursor: "not-allowed", marginTop: "20px" }}><p style={{ color: "black" }}>No food given yet...</p>
                  <i style={{marginTop: "10px", fontSize: "30px"}} className="fa fa-frown-o"></i>
              </div>
          }
      </div>
  )
}
