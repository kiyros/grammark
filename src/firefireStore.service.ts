// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, query, where, getDocs } from 'firebase/firestore/lite';
import "firebase/compat/firestore";

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  static getAcademicStyles() {
    throw new Error('Method not implemented.');
  }
  private firebaseConfig = {
    apiKey: "AIzaSyCSYHn4OMZfXeoW0TEFTqnwgwuS_I0FqCI",
    authDomain: "gramulardatabase.firebaseapp.com",
    databaseURL: "https://gramulardatabase-default-rtdb.firebaseio.com",
    projectId: "gramulardatabase",
    storageBucket: "gramulardatabase.appspot.com",
    messagingSenderId: "765198495430",
    appId: "1:765198495430:web:c54cd6006c9b84307031c7",
    measurementId: "G-KGM1GEWG1T"
  };

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);

  // get academic styling
  async getAcademicStyles() {
    const q = query(collection(this.db, "academicstyle"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshot
      // print the firestore values in the academicstyle
      console.log(doc.id, " => ", doc.data());
    });
  }

 // get eggcorns
 async getEggcorns() {
  const q = query(collection(this.db, "eggcorns"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshot
    // print the firestore values in the eggcorns
    console.log(doc.id, " => ", doc.data());
  });
}

 // get 
 async getGrammar() {
  const q = query(collection(this.db, "grammar"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshot
    // print the firestore values in the grammar
    console.log(doc.id, " => ", doc.data());
  });
}

 // get norminlizations
 async getNorminlizations() {
  const q = query(collection(this.db, "norminlizations"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshot
    // print the firestore values in the norminlizations
    console.log(doc.id, " => ", doc.data());
  });
}

 // get passive voice
 async getPassiveVoice() {
  const q = query(collection(this.db, "passivevoice"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshot
    // print the firestore values in the passivevoice
    console.log(doc.id, " => ", doc.data());
  });
}

 // get transitions
 async getTransitions() {
  const q = query(collection(this.db, "transitions"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshot
    // print the firestore values in the transitions
    console.log(doc.id, " => ", doc.data());
  });
}

 // get transitions
 async getWordiness() {
  const q = query(collection(this.db, "wordiness"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshot
    // print the firestore values in the wordiness
    console.log(doc.id, " => ", doc.data());
  });
}







}