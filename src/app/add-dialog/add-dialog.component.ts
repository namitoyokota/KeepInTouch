import { Component } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Friend } from '../abstractions/friend';
import { FirebaseService } from '../services/firebase.service';

@Component({
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  /** New friend to add */
  newFriend = new Friend();

  /** Whether dialog is adding or editing a friend */
  editMode = false;

  /** Indicates that change has been made */
  dirty = false;

  /** Indicates whether new friend object is valid */
  valid = false;

  /** Used to set max date */
  readonly today = new Date();

  /** Format used to parse date in input field */
  readonly dateParser = 'MMM d, y';

  constructor(
    private dialogRef: NbDialogRef<AddDialogComponent>,
    private firebaseService: FirebaseService,
    private toastService: NbToastrService
  ) {}

  /** Toggles favorite flag */
  toggle(checked: boolean) {
    this.newFriend.favorite = checked;
  }

  /** Checks all required fields are set */
  checkValid() {
    this.dirty = true;

    const nameIsValid = !!this.newFriend.name?.length;
    const goalIsValid = !!this.newFriend.goalDays;
    const dateIsValid = !!this.newFriend.lastCaughtUp;

    this.valid = nameIsValid && goalIsValid && dateIsValid;
  }

  /** Deletes friend  */
  delete() {
    this.firebaseService
      .removeFriend(this.newFriend)
      .then(() => {
        this.primaryToast('Success', 'Deleted Friend');
        this.close();
      })
      .catch(() => {
        this.failureToast('Failed', 'Failed to delete friend');
        this.close();
      });
  }

  /** Returns new friend object to create/update */
  submit() {
    if (this.valid && this.dirty) {
      this.dialogRef.close(this.newFriend);
    }
  }

  /** Closes dialog without a friend object */
  close() {
    this.dialogRef.close();
  }

  /** Displayed primary toast with given messages */
  private primaryToast(title: string, message: string) {
    this.toastService.primary(title, message);
  }

  /** Displayed warning toast with given messages */
  private failureToast(title: string, message: string) {
    this.toastService.warning(title, message);
  }
}
