import { Component, Input } from '@angular/core';
import { Friend } from '../abstractions/friend';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  /** Flag to indicate when searching */
  @Input() isSearching: boolean;

  /** List of friends in the database */
  friendsList: Friend[] = [];

  /** List of friends searched */
  searchedFriendsList: Friend[] = [];

  /** List of favorite friends */
  favoriteFriendsList: Friend[] = [];

  /** List of friends that need attention */
  catchUpFriendsList: Friend[] = [];

  /** List of friends that doesn't need attention */
  caughtUpFriendsList: Friend[] = [];

  /** String used to search friends */
  searchString = '';

  constructor(private firebaseService: FirebaseService) {}

  /** On init lifecycle hook */
  ngOnInit() {
    this.firebaseService.friends$.subscribe((friends) => {
      this.resetList();
      this.friendsList = friends;
      this.updateLists();
    });
  }

  /** Filters list of friends with searched string */
  search(): void {
    this.searchedFriendsList = this.friendsList.filter((friend) =>
      friend.name.toLowerCase().includes(this.searchString.toLowerCase())
    );

    this.updateLists();
  }

  /** Updates list of friends with currently filtered list */
  private updateLists(): void {
    this.resetList();

    const filteredFriendsList = this.isSearching
      ? this.searchedFriendsList
      : this.friendsList;

    filteredFriendsList.forEach((friend) => {
      if (friend.favorite) {
        this.favoriteFriendsList = [...this.favoriteFriendsList, friend];
      }

      if (friend.needsAttention) {
        this.catchUpFriendsList = [...this.catchUpFriendsList, friend];
      } else {
        this.caughtUpFriendsList = [...this.caughtUpFriendsList, friend];
      }
    });
  }

  /** Empties all lists */
  private resetList() {
    this.favoriteFriendsList = [];
    this.caughtUpFriendsList = [];
    this.catchUpFriendsList = [];
  }
}
