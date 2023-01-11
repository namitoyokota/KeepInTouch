import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { FirebaseService } from '../firebase.service';
import { NavigationService } from '../navigation.service';

export class FirebaseAuthentication {
  /** Currently logged in user */
  currentUser: User = null;

  constructor(
    private firebaseService: FirebaseService,
    private navigationService: NavigationService
  ) {}

  /** Listen to change in log in state */
  listenToAuthChange(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User) => {
      if (user) {
        this.currentUser = user;
        this.firebaseService.mailbox.retrieveCollection.next(
          this.currentUser.uid
        );
        this.navigationService.goToHomePage();
      } else {
        this.currentUser = null;
        this.firebaseService.mailbox.clearCollection.next();
        this.navigationService.goToAuthenticationPage();
      }
    });
  }

  /** Creates new account with provided credentials */
  async signUp(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
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
        .then(() => {
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
    const userToDelete = getAuth().currentUser;

    return new Promise((resolve, reject) => {
      deleteUser(userToDelete)
        .then(() => {
          this.firebaseService.mailbox.deleteCollection.next(userToDelete.uid);
          resolve();
        })
        .catch((error) => {
          console.warn(error);
          reject();
        });
    });
  }
}
