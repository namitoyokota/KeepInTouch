import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarImageFilenames } from '../constants/avatar-images';

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
  readonly avatarList = AvatarImageFilenames;

  constructor() {}

  selectAvatar(avatarId: string): void {
    if (avatarId === this.selectedAvatar) {
      this.avatarChanged.emit('');
    } else {
      this.avatarChanged.emit(avatarId);
    }
  }
}
