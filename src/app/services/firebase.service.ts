import { Injectable } from '@angular/core';

import { FirebaseAuthentication } from './firebase/firebase-authentication';
import { FirebaseDatabase } from './firebase/firebase-database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** Authentication service */
  public authentication: FirebaseAuthentication;

  /** Database service */
  public database: FirebaseDatabase;

  constructor() {
    this.authentication = new FirebaseAuthentication();
    this.database = new FirebaseDatabase();
  }
}
