import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Friend } from '../abstractions/friend';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() friend: Friend;

  constructor(
    private dialogService: NbDialogService
  ) { }

  editDialog() {
    this.dialogService.open(EditDialogComponent, {
      context: {
        friendToEdit: new Friend(this.friend.id, this.friend.name, this.friend.favorite)
      }
    }).onClose.subscribe(newFriend => {
      // this.updateFriend(newFriend);
    });
  }
}
