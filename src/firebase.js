import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCyRn_ex_xvI_-4kE3s3zUWNbMlhPwEoX0",
  authDomain: "challenge-a9f8e.firebaseapp.com",
  projectId: "challenge-a9f8e",
  databaseURL:"https://challenge-a9f8e.firebaseio.com",
  storageBucket: "challenge-a9f8e.appspot.com",
  messagingSenderId: "1072670434110",
  appId: "1:1072670434110:web:70de34fd1306c6bbf1c26f",
  measurementId: "G-ZSKD9TN2MQ"
};
  
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db,auth};
