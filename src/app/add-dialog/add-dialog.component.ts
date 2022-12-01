import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Friend } from '../abstractions/friend';

@Component({
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  /** New friend to add */
  newFriend = new Friend();

  /** Indicates whether new friend object is valid */
  valid = false;

  constructor(
    private dialogRef: NbDialogRef<AddDialogComponent>
  ) { }

  editName(event: any) {
    this.newFriend.name = event.target.value;
    this.checkValid();
  }

  toggle(checked: boolean) {
    this.newFriend.favorite = checked;
  }

  private checkValid() {
    this.valid = !!this.newFriend.name?.length;
  }

  add() {
    this.dialogRef.close(this.newFriend);
  }

  close() {
    this.dialogRef.close();
  }
}
