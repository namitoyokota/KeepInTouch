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

  /** Indicates whether new friend object is valid */
  valid = false;

  today = new Date();

  readonly dateParser = 'MMM d, y';

  constructor(private dialogRef: NbDialogRef<AddDialogComponent>) {}

  toggle(checked: boolean) {
    this.newFriend.favorite = checked;
  }

  checkValid() {
    const nameIsValid = !!this.newFriend.name?.length;
    const goalIsValid = !!this.newFriend.goalDays;
    const dateIsValid = !!this.newFriend.lastCaughtUp;

    this.valid = nameIsValid && goalIsValid && dateIsValid;
  }

  add() {
    if (this.valid) {
      this.dialogRef.close(this.newFriend);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
