import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  /** User input email */
  email: string;

  /** User input password */
  password: string;

  constructor(
    private firebaseService: FirebaseService,
    private navigationService: NavigationService
  ) {}

  /** Sign up user with firebase */
  signUp() {
    this.firebaseService.authentication
      .signUp(this.email, this.password)
      .then(() => {
        this.navigationService.goToHomePage();
      })
      .catch(() => {});
  }

  /** Sign in user with firebase */
  signIn() {
    this.firebaseService.authentication
      .signIn(this.email, this.password)
      .then(() => {
        this.navigationService.goToHomePage();
      })
      .catch(() => {});
  }
}
