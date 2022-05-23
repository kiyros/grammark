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
    let getAcademicJson = {};

    const q = query(collection(this.db, "academicstyle"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshot
      // print the firestore values in the academicstyle

      var wrong = doc.data().wrong;
      var fixed = doc.data().fixed;
      getAcademicJson[wrong] = fixed;
    });
    return getAcademicJson;
  }

  // get eggcorns
  async getEggcorns() {
    let getEggcornsJson = {};
    const q = query(collection(this.db, "eggcorns"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshot
      // print the firestore values in the academicstyle

      var wrong = doc.data().wrong;
      var fixed = doc.data().fixed;
      getEggcornsJson[wrong] = fixed;
    });
    return getEggcornsJson;
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
    let getTransitonsJson = {};
    const q = query(collection(this.db, "transitions"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshot
      // print the firestore values in the academicstyle

      var wrong = doc.data().wrong;
      var fixed = doc.data().fixed;
      getTransitonsJson[wrong] = fixed;
    });
    return getTransitonsJson;
  }

  // get wordiness
  async getWordiness() {
    let getWordinessJson = {};
    const q = query(collection(this.db, "wordiness"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshot
      // print the firestore values in the academicstyle

      var wrong = doc.data().wrong;
      var fixed = doc.data().fixed;
      getWordinessJson[wrong] = fixed;
    });
    return getWordinessJson;
  }







}