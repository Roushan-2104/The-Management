import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAxF6N5J0ylZkhyDi5Eu8kwtFpC1vNksSk",
    authDomain: "the-managment.firebaseapp.com",
    projectId: "the-managment",
    storageBucket: "the-managment.appspot.com",
    messagingSenderId: "385006517018",
    appId: "1:385006517018:web:47ab80aad19b85cb4e8aa3"
  };

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timeStamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, timeStamp}