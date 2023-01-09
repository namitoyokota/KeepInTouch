import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HelperService } from 'src/app/services/helper.service';
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
    private toastService: ToastService,
    private helperService: HelperService
  ) {}

  /** Open edit friend dialog */
  editDialog() {
    this.dialogService
      .open(AddDialogComponent, {
        context: {
          newFriend: this.helperService.deepCopy(this.friend),
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
    this.firebaseService.database
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
}
