import { Injectable } from '@angular/core';
import { Mailbox } from '../abstractions/mailbox';

import { FirebaseAuthentication } from './firebase/firebase-authentication';
import { FirebaseDatabase } from './firebase/firebase-database';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** Authentication service */
  public authentication: FirebaseAuthentication;

  /** Database service */
  public database: FirebaseDatabase;

  /** Workflow for sending and receiving messages */
  mailbox: Mailbox = new Mailbox();

  constructor(navigationService: NavigationService) {
    this.authentication = new FirebaseAuthentication(this, navigationService);
    this.database = new FirebaseDatabase();

    this.initializeListeners();
    this.authentication.listenToAuthChange();
  }

  private initializeListeners(): void {
    this.listenToRetrieve();
    this.listenToClear();
    this.listenToDelete();
  }

  private listenToRetrieve(): void {
    this.mailbox.retrieveCollection$.subscribe((token: string) => {
      if (token) {
        this.database.getFriends(token);
      }
    });
  }

  private listenToClear(): void {
    this.mailbox.clearCollection$.subscribe(() => {
      this.database.cleanFriends();
    });
  }

  private listenToDelete(): void {
    this.mailbox.deleteCollection$.subscribe((token: string) => {
      if (token) {
        this.database.deleteCollection();
      }
    });
  }
}
