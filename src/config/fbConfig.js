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

  const settings = {timestampsInSnapshots: true};

  firebase.initializeApp(config)
  firebase.firestore().settings(settings)
  firebase.firestore().enablePersistence()
    .then(function() {
      // Initialize Cloud Firestore through firebase
      firebase.firestore();
    })
    .catch(function(err) {
      if (err.code === 'failed-precondition') {
          console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code === 'unimplemented') {
          console.log('The current browser does not support all of the features required to enable persistence')
    }
  })

  export default firebase