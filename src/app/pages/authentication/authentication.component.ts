import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  /** User input email */
  email: string;

  /** User input password */
  password: string;

  constructor(private firebaseService: FirebaseService) {}

  /** Sign up user with firebase */
  signUp() {
    this.firebaseService.authentication.signUp(this.email, this.password);
  }

  /** Sign in user with firebase */
  signIn() {
    this.firebaseService.authentication.signIn(this.email, this.password);
  }
}
