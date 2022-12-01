import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Friend } from '../abstractions/friend';
import { FirebaseService } from '../services/firebase.service';

@Component({
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  /** New friend to add */
  friendToEdit: Friend;

  /** Indicates whether new friend object is valid */
  valid = false;

  constructor(
    private firebaseService: FirebaseService,
    private dialogRef: NbDialogRef<null>
  ) { }

  editName(event: any) {
    this.friendToEdit.name = event.target.value;
    this.checkValid();
  }

  toggle(checked: boolean) {
    this.friendToEdit.favorite = checked;
  }

  private checkValid() {
    this.valid = !!this.friendToEdit.name?.length;
  }

  remove() {
    this.firebaseService.removeFriend(this.friendToEdit);
    this.close();
  }

  add() {
    this.dialogRef.close(this.friendToEdit);
  }

  close() {
    this.dialogRef.close();
  }
}
