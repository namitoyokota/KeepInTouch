import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Friend } from './abstractions/friend';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentlyAddingFriend = false;

  valid = false;

  newFriend = new Friend();

  constructor(
    private firebaseService: FirebaseService,
    private dialogService: NbDialogService
  ) { }

  openDialog() {
    this.dialogService.open(AddDialogComponent).onClose.subscribe(newFriend => {
      this.submitFriend(newFriend);
    });
  }

  submitFriend(newFriend: Friend) {
    console.log(newFriend);
    this.firebaseService.addFriend(newFriend);
  }
}
