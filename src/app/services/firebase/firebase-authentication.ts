import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { FirebaseService } from '../firebase.service';

export class FirebaseAuthentication {
  /** Currently logged in user */
  currentUser: UserCredential = null;

  constructor(private firebaseService: FirebaseService) {}

  /** Creates new account with provided credentials */
  async signUp(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
          this.currentUser = userCredential;
          this.firebaseService.mailbox.retrieveCollection.next(
            this.currentUser.user.uid
          );
          resolve();
        })
        .catch((error: FirebaseError) => {
          console.warn(error);
          reject();
        });
    });
  }

  /** Logs in user with provided credentials */
  async signIn(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential: UserCredential) => {
          this.currentUser = userCredential;
          this.firebaseService.mailbox.retrieveCollection.next(
            this.currentUser.user.uid
          );
          resolve();
        })
        .catch((error: FirebaseError) => {
          console.warn(error);
          reject();
        });
    });
  }

  /** Logs out currently logged in user */
  async signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      signOut(getAuth())
        .then(() => {
          this.currentUser = null;
          this.firebaseService.mailbox.clearCollection.next();
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          reject();
        });
    });
  }

  /** Delete user's account and their data */
  async deleteAccount(): Promise<void> {
    return new Promise((resolve, reject) => {
      deleteUser(getAuth().currentUser)
        .then(() => {
          this.firebaseService.mailbox.deleteCollection.next(
            this.currentUser.user.uid
          );
          this.currentUser = null;
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          reject();
        });
    });
  }
}
