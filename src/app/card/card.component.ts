import { Component, Input } from '@angular/core';
import { Friend } from '../abstractions/friend';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() friend: Friend;

}
