import { BehaviorSubject } from 'rxjs';

export class Mailbox {
  /** Message to retrieve the latest database */
  retrieveCollection: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /** Message to retrieve the latest database */
  retrieveCollection$ = this.retrieveCollection.asObservable();

  /** Message to clean up loaded database */
  clearCollection: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  /** Message to clean up loaded database */
  clearCollection$ = this.clearCollection.asObservable();

  /** Message to delete the current user's collection */
  deleteCollection: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /** Message to delete the current user's collection */
  deleteCollection$ = this.deleteCollection.asObservable();
}
