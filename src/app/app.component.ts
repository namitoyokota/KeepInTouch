import { Component } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
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

  /** Flag to indicate when data is loading */
  isLoading$ = this.firebaseService.isLoading$;

  constructor(
    private firebaseService: FirebaseService,
    private dialogService: NbDialogService,
    private toastService: NbToastrService
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
    this.firebaseService
      .addFriend(newFriend)
      .then(() => {
        this.successToast('Success', 'Added friend');
      })
      .catch(() => {
        this.failureToast('Failure', 'Failed attempting to add a friend');
      });
  }

  /** Displayed success toast with given messages */
  private successToast(title: string, message: string) {
    this.toastService.success(title, message);
  }

  /** Displayed warning toast with given messages */
  private failureToast(title: string, message: string) {
    this.toastService.warning(title, message);
  }
}
