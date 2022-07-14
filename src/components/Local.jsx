import React, { useState, useEffect } from 'react';
import firebase from "firebase"
import { auth, provider, db } from "./Constant"


function Local() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  if (!user) {
    window.location.href = "/";
  }
  const sendComment = (text, id, comments) => {
    if (comment == "") return;
    let allComments = comments;
    allComments.push({
      comment: comment,
      username: user.email.replace("@gmail.com", "")
    })
    console.log(allComments);
    db.collection("local").doc(id).update({
      comments: allComments
    })
  }
  useEffect(() => {
    const ref = db
      .collection("local")
      .orderBy("timestamp", "desc");
    ref.onSnapshot((snapshot) => {
      let allMessages = snapshot.docs.map((doc) => ({ message: doc.data(), id: doc.id }));
      console.log(allMessages);
      setMessages(allMessages);
    })
  }, [])
  const send = (e) => {
    if (query !== "") {
      e.preventDefault();
      db.collection("local").add({
        text: query,
        timestamp: new Date(),
        userSent: user.email,
        comments: []
      })
      setQuery("");
    }
  }
  return (
    <div className="localHelp">
      <div className="navbar">
        <p></p>
        <p>Food Community Queries</p>
        <p></p>
      </div >
        
      <div className="localChat">
        {messages.map(({ id, message }) => (
          <div style={{
          backgroundColor: message.userSent === user.email ? "#dcf8c6" : "WHITE",
        }} className="chat-message">
            <strong className="chat-message-text">{message.text}</strong>
            <p className="chat-message-date">{new Date(message.timestamp.toDate()).toLocaleString()}</p>
            <div className="ansrQuestion">
              <input onChange={(e) => setComment(e.target.value) } placeholder="Answer Question" />
              <button onClick={(e) => sendComment(comment, id, message.comments)}>Send</button>
            </div>
            <br/>
            <h3 style={{color: "black"}}>Comments ({message.comments.length}): </h3>
            {message.comments ? (
              message.comments.map((comment) => (
                <div className="comment">
                  <strong style={{ color: "black" }}>{comment.username}:</strong>
                  <p style={{ color: "black", margin: "8px 0px" }}>{comment.comment}</p>
                </div>
              ))
            ) : (<></>)}
          </div>
        ))}
      </div>
      <form onSubmit={send}>
      <div className="controlsmessage">
        
          <input value={query} onChange={(e) => setQuery(e.target.value) } placeholder="Food Queries ONLY..."/>
          <button>Send</button>
        </div>
        </form>
    </div>
  )
}

export default Local