import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastService } from 'src/app/services/toast.service';
import { Friend } from '../../../../abstractions/friend';
import { FirebaseService } from '../../../../services/firebase.service';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';

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
    private toastService: ToastService
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
        this.toastService.successToast('Success', 'Updated friend');
      })
      .catch(() => {
        this.toastService.failureToast(
          'Failure',
          'Failed attempting to update a friend'
        );
      });
  }

  /** Deep copies the friend object */
  private deepCopy(friend: Friend) {
    return JSON.parse(JSON.stringify(friend));
  }
}
