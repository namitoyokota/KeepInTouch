import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /** Emits when search button clicked */
  @Output() onSearchToggle = new EventEmitter<boolean>();

  /** Emits when create new button clicked */
  @Output() createNew = new EventEmitter<void>();

  /** Flag to indicate when searching */
  isSearching = false;

  constructor() {}

  /** Shows or hides search bar */
  toggleSearch(): void {
    this.isSearching = !this.isSearching;

    this.onSearchToggle.emit(this.isSearching);
  }

  /** Emits event to open create friend dialog */
  createNewFriend(): void {
    this.createNew.emit();
  }
}
