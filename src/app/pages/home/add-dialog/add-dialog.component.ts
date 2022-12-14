import { Component } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ToastService } from 'src/app/services/toast.service';
import { Friend } from '../../../abstractions/friend';
import { FirebaseService } from '../../../services/firebase.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  /** New friend to add */
  newFriend = new Friend();

  /** Whether dialog is adding or editing a friend */
  editMode = false;

  /** Used to set max date */
  readonly today = new Date();

  /** Format used to parse date in input field */
  readonly dateParser = 'MMM d, y';

  constructor(
    private dialogRef: NbDialogRef<AddDialogComponent>,
    private dialogService: NbDialogService,
    private firebaseService: FirebaseService,
    private toastService: ToastService
  ) {}

  /** Toggles favorite flag */
  toggle(checked: boolean) {
    this.newFriend.favorite = checked;
  }

  /** Checks all required fields are set */
  checkValid() {
    const nameIsValid = !!this.newFriend.name?.length;
    const goalIsValid = !!this.newFriend.goalDays;
    const dateIsValid = !!this.newFriend.lastCaughtUp;

    return nameIsValid && goalIsValid && dateIsValid;
  }

  /** Open delete confirm dialog */
  delete() {
    this.dialogService
      .open(ConfirmDialogComponent, {
        context: {
          title: 'Are you sure?',
          subtitle: 'This action cannot be reverted.',
        },
      })
      .onClose.subscribe((answer) => {
        if (answer) {
          this.deleteFriend();
        }
      });
  }

  /** Returns new friend object to create/update */
  submit() {
    this.dialogRef.close(this.newFriend);
  }

  /** Closes dialog without a friend object */
  close() {
    this.dialogRef.close();
  }

  /** Deletes friend  */
  private deleteFriend() {
    this.firebaseService.database
      .removeFriend(this.newFriend)
      .then(() => {
        this.toastService.primaryToast('Success', 'Deleted Friend');
        this.close();
      })
      .catch(() => {
        this.toastService.failureToast('Failed', 'Failed to delete friend');
        this.close();
      });
  }
}
