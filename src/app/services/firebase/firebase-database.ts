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
  updateDoc,
} from 'firebase/firestore/lite';
import { BehaviorSubject } from 'rxjs';
import { Friend } from 'src/app/abstractions/friend';
import { environment } from 'src/app/environments/environment';

export class FirebaseDatabase {
  /** List of existing friends */
  private friends = new BehaviorSubject<Friend[]>([]);

  /** List of existing friends */
  friends$ = this.friends.asObservable();

  /** Flag to indicate when API call is being made */
  isLoading = false;

  /** Firebase app to access database */
  private firebaseApp: FirebaseApp;

  /** Firebase database */
  private firebaseDb: Firestore;

  /** Table in the firebase database */
  private friendsCollection: CollectionReference<DocumentData>;

  /** Current state of the firebase database */
  private friendsSnapshot: QuerySnapshot<DocumentData>;

  /** Collection id for the current user */
  private collectionId: string;

  constructor() {
    this.initialize();
  }

  /** Gets the latest list of friends in the database */
  async getFriends(collectionId?: string): Promise<void> {
    if (collectionId) {
      this.collectionId = collectionId;
    }

    this.friendsCollection = collection(this.firebaseDb, this.collectionId);
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

  /** Removes all loaded friends list */
  cleanFriends(): void {
    this.friends.next([]);
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
  private findFriendDoc(friend: Friend) {
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

  /** Turn on loading flag */
  private startLoading(): void {
    this.isLoading = true;
  }

  /** Turn off loading flag */
  private stopLoading(): void {
    this.isLoading = false;
  }
}
