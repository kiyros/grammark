import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSYHn4OMZfXeoW0TEFTqnwgwuS_I0FqCI",
    authDomain: "gramulardatabase.firebaseapp.com",
    databaseURL: "https://gramulardatabase-default-rtdb.firebaseio.com",
    projectId: "gramulardatabase",
    storageBucket: "gramulardatabase.appspot.com",
    messagingSenderId: "765198495430",
    appId: "1:765198495430:web:c54cd6006c9b84307031c7",
    measurementId: "G-KGM1GEWG1T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

// get academic styling
export default async function getAcademicStyles(db) {
  const q = query(collection(db, "academicstyle"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

export {app, db}