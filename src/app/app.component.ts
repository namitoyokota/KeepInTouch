import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Friend } from './abstractions/friend';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** Flag to indicate when searching */
  isSearching = false;

  constructor(
    private firebaseService: FirebaseService,
    private dialogService: NbDialogService
  ) {}

  /** Shows or hides search bar */
  toggleSearch(): void {
    this.isSearching = !this.isSearching;
  }

  /** Opens dialog to create a new friend */
  openDialog() {
    this.dialogService
      .open(AddDialogComponent)
      .onClose.subscribe((newFriend) => {
        if (newFriend) {
          this.submitFriend(newFriend);
        }
      });
  }

  /** Adds requested friend in the database */
  private submitFriend(newFriend: Friend) {
    this.firebaseService.addFriend(newFriend);
  }
}
