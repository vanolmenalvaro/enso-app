import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCf26dWGTD3ydy5vJ1fpjGpiwWgvu1s12U",
    authDomain: "enso-app-1234.firebaseapp.com",
    databaseURL: "https://enso-app-1234.firebaseio.com",
    projectId: "enso-app-1234",
    storageBucket: "enso-app-1234.appspot.com",
    messagingSenderId: "936216175252"
  }

  firebase.initializeApp(config)
  firebase.firestore().settings({ timestampsInSnapshots: true })

  export default firebase