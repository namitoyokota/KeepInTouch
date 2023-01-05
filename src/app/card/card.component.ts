import { Component, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Friend } from '../abstractions/friend';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  /** Friend to display */
  @Input() friend: Friend;

  constructor(
    private firebaseService: FirebaseService,
    private dialogService: NbDialogService,
    private toastService: NbToastrService
  ) {}

  /** Open edit friend dialog */
  editDialog() {
    this.dialogService
      .open(AddDialogComponent, {
        context: {
          newFriend: this.deepCopy(this.friend),
          editMode: true,
        },
      })
      .onClose.subscribe((updatedFriend) => {
        if (updatedFriend) {
          this.updateFriend(updatedFriend);
        }
      });
  }

  /** Updates requested friend in the database */
  private updateFriend(newFriend: Friend) {
    this.firebaseService
      .updateFriend(newFriend)
      .then(() => {
        this.successToast('Success', 'Updated friend');
      })
      .catch(() => {
        this.failureToast('Failure', 'Failed attempting to update a friend');
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
  /** Deep copies the friend object */
  private deepCopy(friend: Friend) {
    return JSON.parse(JSON.stringify(friend));
  }
}
