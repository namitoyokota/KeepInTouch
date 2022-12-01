import { Component, Input } from '@angular/core';
import { Friend } from '../abstractions/friend';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  /** List of friends in the database */
  friendsList: Friend[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) { }

  /** On init lifecycle hook */
  ngOnInit() {
    this.firebaseService.friends$.subscribe(friends => {
      this.friendsList = friends;
    });
  }
}
