import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  /** Sign up user with firebase */
  signUp() {
    this.firebaseService
      .signUp(this.email, this.password)
      .then(() => {
        this.goToHomePage();
      })
      .catch(() => {});
  }

  /** Sign in user with firebase */
  signIn() {
    this.firebaseService
      .signIn(this.email, this.password)
      .then(() => {
        this.goToHomePage();
      })
      .catch(() => {});
  }

  /** Successful log in takes you to home */
  private goToHomePage(): void {
    this.router.navigate(['home']);
  }
}
