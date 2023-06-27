import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Z_lTQubStZzdFRV4J36l7749JGcl1Ys",
  authDomain: "react-community-b1e10.firebaseapp.com",
  projectId: "react-community-b1e10",
  storageBucket: "react-community-b1e10.appspot.com",
  messagingSenderId: "140433593636",
  appId: "1:140433593636:web:974d7ef43ee95d09378fb1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;