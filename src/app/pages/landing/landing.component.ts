import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private router: Router) {}

  // TODO: below methods need to be in a navigation.service
  /** Navigates user to authentication page */
  goToAuthenticationPage(): void {
    this.router.navigate(['authentication']);
  }

  /** Navigates user to home page */
  goToHomePage(): void {
    this.router.navigate(['home']);
  }
}
