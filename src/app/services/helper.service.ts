import { Injectable } from '@angular/core';
import { Friend } from '../abstractions/friend';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  /** Deep copies the friend object */
  deepCopy(friend: Friend) {
    return JSON.parse(JSON.stringify(friend));
  }
}
