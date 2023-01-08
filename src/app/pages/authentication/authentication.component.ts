import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  email: string;
  password: string;

  constructor(private firebaseService: FirebaseService) {}

  signUp() {
    this.firebaseService.signUp(this.email, this.password);
  }

  signIn() {
    this.firebaseService.signIn(this.email, this.password);
  }
}
