import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBTxZcRtJQ8UQ-BBB0SPzNXSXEYiDheP-A",
  authDomain: "reactjs-happydrink.firebaseapp.com",
  databaseURL: "https://reactjs-happydrink.firebaseio.com",
  storageBucket: "reactjs-happydrink.appspot.com",
  messagingSenderId: "588769235863"
});

export default app;
