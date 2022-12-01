import { Component, OnInit } from '@angular/core';
import { Friend } from './abstractions/friend';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'keepintouch';

  currentlyAddingFriend = false;

  valid = false;

  newFriend = new Friend();

  friendsList: Friend[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getFriends();
  }

  async getFriends() {
    this.firebaseService.getFriends().then(friends => {
      this.friendsList = friends;
    });
  }

  addNewFriend() {
    this.newFriend = new Friend();
    this.currentlyAddingFriend = true;
  }

  cancelAdd() {
    this.currentlyAddingFriend = false;
  }

  editName(event: any) {
    this.newFriend.name = event.target.value;
    this.checkValid();
  }

  checkValid() {
    this.valid = !!this.newFriend.name?.length;
  }

  submitFriend() {
    console.log(this.newFriend);
    this.cancelAdd();
  }

  toggle(checked: boolean) {
    this.newFriend.favorite = checked;
  }
}
