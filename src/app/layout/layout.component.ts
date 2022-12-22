import { Component } from '@angular/core';
import { Friend } from '../abstractions/friend';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  /** List of friends in the database */
  friendsList: Friend[] = [];

  /** List of favorite friends */
  favoriteFriendsList: Friend[] = [];

  /** List of friends that need attention */
  catchUpFriendsList: Friend[] = [];

  /** List of friends that doesn't need attention */
  caughtUpFriendsList: Friend[] = [];

  constructor(private firebaseService: FirebaseService) {}

  /** On init lifecycle hook */
  ngOnInit() {
    this.firebaseService.friends$.subscribe((friends) => {
      this.resetList();

      friends.forEach((friend) => {
        if (friend.favorite) {
          this.favoriteFriendsList = [...this.favoriteFriendsList, friend];
        }

        if (friend.needsAttention) {
          this.catchUpFriendsList = [...this.catchUpFriendsList, friend];
        } else {
          this.caughtUpFriendsList = [...this.caughtUpFriendsList, friend];
        }

        this.friendsList = [...this.friendsList, friend];
      });
    });
  }

  /** Empties all lists */
  private resetList() {
    this.favoriteFriendsList = [];
    this.caughtUpFriendsList = [];
    this.catchUpFriendsList = [];
    this.friendsList = [];
  }
}