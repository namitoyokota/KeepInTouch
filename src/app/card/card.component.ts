import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Friend } from '../abstractions/friend';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  /** Friend to display */
  @Input() friend: Friend;

  constructor(private dialogService: NbDialogService) {}

  /** Open edit friend dialog */
  editDialog() {
    this.dialogService
      .open(AddDialogComponent, {
        context: {
          newFriend: this.deepCopy(this.friend),
          editMode: true,
        },
      })
      .onClose.subscribe((newFriend) => {
        console.log(newFriend);
        // TODO: this.updateFriend(newFriend);
      });
  }

  /** Deep copies the friend object */
  private deepCopy(friend: Friend) {
    return JSON.parse(JSON.stringify(friend));
  }
}
