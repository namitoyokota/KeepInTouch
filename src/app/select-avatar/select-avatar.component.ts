import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss'],
})
export class SelectAvatarComponent {
  /** Currently selected avatar */
  @Input() selectedAvatar: string;

  /** Emits when avatar has been selected */
  @Output() avatarChanged = new EventEmitter<string>();

  /** List of avatars to select from */
  // avatarList: string[] = [];
  avatarList: string[] = ['9375223', '9375226', '9375232', '9375236'];

  /** Flag to indicate when avatar list is open */
  isSelectingAvatar = false;

  constructor() {}

  toggleList(): void {
    this.isSelectingAvatar = !this.isSelectingAvatar;
  }

  selectAvatar(avatarId: string): void {
    this.avatarChanged.emit(avatarId);
    this.isSelectingAvatar = false;
  }

  private retrieveAvatars(): void {
    // Gets filenames of the avatar icons and sets to avatarList
  }
}
