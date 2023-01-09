import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

export class FirebaseAuthentication {
  /** Currently logged in user */
  currentUser: UserCredential = null;

  constructor() {}

  /** Creates new account with provided credentials */
  async signUp(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
          console.log(userCredential);
          this.currentUser = userCredential;
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
          console.log(userCredential);
          this.currentUser = userCredential;
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
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          reject();
        });
    });
  }
}
