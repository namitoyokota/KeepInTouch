import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";

import { environment } from '../environments/environment';
import { Friend } from '../abstractions/friend';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private friends = new BehaviorSubject<Friend[]>([]);

  friends$ = this.friends.asObservable();

  private firebaseApp: FirebaseApp;

  private firebaseDb: Firestore;

  private friendsCollection: CollectionReference<DocumentData>;

  constructor() {
    this.initialize();
    this.getFriends();
  }

  addFriend(newFriend: Friend) {
    addDoc(this.friendsCollection, {
      name: newFriend.name,
      favorite: newFriend.favorite
    }).catch(error => {
      console.warn(error);
    });

    this.getFriends();
  }

  updateFriend(friend: Friend) {

  }

  removeFriend(id: string) {

  }

  private initialize() {
    this.firebaseApp = initializeApp(environment.firebase);
    this.firebaseDb = getFirestore(this.firebaseApp);

    // const analytics = getAnalytics(this.firebaseApp);
  }

  private async getFriends() {
    this.friendsCollection = collection(this.firebaseDb, 'friends');
    const friendsSnapshot = await getDocs(this.friendsCollection);

    const friends = friendsSnapshot.docs.map(doc => doc.data());
    this.friends.next(friends);
  }
}