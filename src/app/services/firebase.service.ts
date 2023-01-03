import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  DocumentData,
  Firestore,
  getDocs,
  getFirestore,
  QuerySnapshot,
} from 'firebase/firestore/lite';

import { BehaviorSubject } from 'rxjs';
import { Friend } from '../abstractions/friend';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** List of existing friends */
  private friends = new BehaviorSubject<Friend[]>([]);

  /** List of existing friends */
  public friends$ = this.friends.asObservable();

  /** Firebase app to access database */
  private firebaseApp: FirebaseApp;

  /** Firebase database */
  private firebaseDb: Firestore;

  /** Table in the firebase database */
  private friendsCollection: CollectionReference<DocumentData>;

  /** Current state of the firebase database */
  private friendsSnapshot: QuerySnapshot<DocumentData>;

  constructor() {
    this.initialize();
    this.getFriends();
  }

  /** Create a new friend in the database */
  // addFriend(newFriend: Friend) {
  //   addDoc(this.friendsCollection, {
  //     id: newFriend.id,
  //     name: newFriend.name,
  //     favorite: newFriend.favorite,
  //     goalDays: newFriend.goalDays,
  //     lastCaughtUp: newFriend.lastCaughtUp,
  //   })
  //     .then(() => {
  //       this.getFriends();
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //     });
  // }

  /** Create a new friend in the database */
  addFriend(newFriend: Friend): Promise<void> {
    return new Promise((resolve, reject) => {
      addDoc(this.friendsCollection, {
        id: newFriend.id,
        name: newFriend.name,
        favorite: newFriend.favorite,
        goalDays: newFriend.goalDays,
        lastCaughtUp: newFriend.lastCaughtUp,
      })
        .then(() => {
          this.getFriends();
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          reject();
        });
    });
  }

  /** Update an existing friend in the database */
  updateFriend(friend: Friend) {
    // TODO: add
  }

  /** Removes an existing friend from the database */
  removeFriend(friend: Friend) {
    const friendDoc = this.findFriendDoc(friend);
    deleteDoc(friendDoc)
      .then((ref) => {
        this.getFriends();
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  /** Returns friend in the database */
  findFriendDoc(friend: Friend) {
    let friendDoc;
    this.friendsSnapshot.docs.forEach((doc) => {
      const user: Friend = doc.data();
      if (user.id === friend.id) {
        friendDoc = doc.ref;
      }
    });

    return friendDoc;
  }

  /** Initializes firebase access */
  private initialize() {
    this.firebaseApp = initializeApp(environment.firebase);
    this.firebaseDb = getFirestore(this.firebaseApp);

    // TODO: Added after going production
    // const analytics = getAnalytics(this.firebaseApp);
  }

  /** Gets the latest list of friends in the database */
  private async getFriends() {
    this.friendsCollection = collection(this.firebaseDb, 'friends');
    this.friendsSnapshot = await getDocs(this.friendsCollection);

    const friends = this.friendsSnapshot.docs.map((doc) => {
      return new Friend(
        doc.data()['id'],
        doc.data()['name'],
        doc.data()['favorite'],
        doc.data()['goalDays'],
        doc.data()['lastCaughtUp']
      );
    });
    this.friends.next(friends);
  }
}
