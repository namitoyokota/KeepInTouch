import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
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
  updateDoc,
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

  /** Flag to indicate when API call is being made */
  private isLoading = new BehaviorSubject<boolean>(false);

  /** Flag to indicate when API call is being made */
  public isLoading$ = this.isLoading.asObservable();

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

  async signUp(email: string, password: string): Promise<void> {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.warn(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  async signIn(email: string, password: string): Promise<void> {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async signOut(): Promise<void> {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  /** Create a new friend in the database */
  async addFriend(newFriend: Friend): Promise<void> {
    this.startLoading();

    return new Promise((resolve, reject) => {
      addDoc(this.friendsCollection, {
        id: newFriend.id,
        name: newFriend.name,
        favorite: newFriend.favorite,
        goalDays: newFriend.goalDays,
        lastCaughtUp: newFriend.lastCaughtUp,
        avatarId: newFriend.avatarId,
      })
        .then(async () => {
          await this.getFriends();
          this.stopLoading();
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          this.stopLoading();
          reject();
        });
    });
  }

  /** Update an existing friend in the database */
  async updateFriend(friend: Friend): Promise<void> {
    this.startLoading();

    const friendDoc = this.findFriendDoc(friend);

    return new Promise((resolve, reject) => {
      updateDoc(friendDoc, {
        id: friend.id,
        name: friend.name,
        favorite: friend.favorite,
        goalDays: friend.goalDays,
        lastCaughtUp: friend.lastCaughtUp,
        avatarId: friend.avatarId,
      })
        .then(async () => {
          await this.getFriends();
          this.stopLoading();
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          this.stopLoading();
          reject();
        });
    });
  }

  /** Removes an existing friend from the database */
  async removeFriend(friend: Friend): Promise<void> {
    this.startLoading();

    const friendDoc = this.findFriendDoc(friend);

    return new Promise((resolve, reject) => {
      deleteDoc(friendDoc)
        .then(async () => {
          await this.getFriends();
          this.stopLoading();
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          this.stopLoading();
          reject();
        });
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
        doc.data()['lastCaughtUp'],
        doc.data()['avatarId']
      );
    });
    this.friends.next(friends);
  }

  /** Turn on loading flag */
  private startLoading(): void {
    this.isLoading.next(true);
  }

  /** Turn off loading flag */
  private stopLoading(): void {
    this.isLoading.next(false);
  }
}
