import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB2UTZVlN6SylRkh4wjtRmqaX0coIoDzaw",
    authDomain: "teenai.firebaseapp.com",
    projectId: "teenai",
    storageBucket: "teenai.appspot.com",
    messagingSenderId: "353337037097",
    appId: "1:353337037097:web:8a1413fed982c36d16a738"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { firebaseApp, storage, auth, provider, db }