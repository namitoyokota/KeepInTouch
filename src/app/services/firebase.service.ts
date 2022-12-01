import { Injectable } from '@angular/core';
 
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebaseApp: FirebaseApp;

  private firebaseDb: Firestore;
 
  constructor() {
    this.initialize();
  }

  initialize() {
    this.firebaseApp = initializeApp(environment.firebase);
    this.firebaseDb = getFirestore(this.firebaseApp);

    // const analytics = getAnalytics(this.firebaseApp);
  }

  async getFriends() {
    const friendsCol = collection(this.firebaseDb, 'friends');
    const fritendsSnapshot = await getDocs(friendsCol);
    return fritendsSnapshot.docs.map(doc => doc.data());
  }

  addFriend() {

  }

  removeFriend(id: string) {

  }
}