import React, { useState } from 'react';
import { db, storage } from "./Constant";

function AddFood() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
        const [calo, setCalo] = useState("");
    const [nutrit, setNutrit] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const changeHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            var selectedImgSrc = URL.createObjectURL(e.target.files[0]);
            document.getElementById("imagePreview").src = selectedImgSrc;
            document.getElementById("imagePreview").style.display = "block";
      }
    };
    const submitHandler = () => { 
        if (image) {
            const imageName = Math.ceil(Math.random() * 99999999);
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
                .put(image)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
                setProgress(progress);
            }, (error) => {
                console.log(error)
            }, () => {
                storage.ref("images").child(`${imageName}.jpg`)
                    .getDownloadURL()
                    .then((imageUrl) => {
                        db.collection("userFoods").add({
                            image: imageUrl,
                            userEmail: user.email,
                            userPhotoURL: user.photoUrl,
                            desc,
                            nutrit,
                            name,
                            calories: calo
                    })
                })
            })
        } else {
            alert("A field is missing")
        }
    };
  return (
      <div className="AddFood">
          <p>Healthy foods ONLY or good diet foods</p>
          <input onChange={(e) => setName(e.target.value) } placeholder="Food Name" />
          <br/>
          <textarea onChange={(e) => setDesc(e.target.value)} placeholder="Description"></textarea>
          <br />
          <input  onChange={(e) => setCalo(e.target.value) }type='number' placeholder="Calories"/>
          <br />
          <textarea  onChange={(e) => setNutrit(e.target.value) }placeholder="Other Nutrition - carbs, protein, calcium and etc."></textarea>
          <input onChange={changeHandler} type="file" />
          <img id="imagePreview"/>
          <button onClick={submitHandler} >Submit for moderation {progress }%</button>
    </div>
  )
}

export default AddFood