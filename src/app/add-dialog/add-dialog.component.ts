import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Friend } from '../abstractions/friend';

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

  readonly dateParser = 'MMM d, y';

  constructor(private dialogRef: NbDialogRef<AddDialogComponent>) {}

  toggle(checked: boolean) {
    this.newFriend.favorite = checked;
  }

  checkValid() {
    this.dirty = true;

    const nameIsValid = !!this.newFriend.name?.length;
    const goalIsValid = !!this.newFriend.goalDays;
    const dateIsValid = !!this.newFriend.lastCaughtUp;

    this.valid = nameIsValid && goalIsValid && dateIsValid;
  }

  submit() {
    if (this.valid && this.dirty) {
      this.dialogRef.close(this.newFriend);
    }
  }

  close() {
    this.dialogRef.close();
  }
}