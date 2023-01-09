import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  /** Navigates user to authentication page */
  goToAuthenticationPage(): void {
    this.router.navigate(['authentication']);
  }

  /** Navigates user to landing page */
  goToLandingPage(): void {
    this.router.navigate(['landing']);
  }

  /** Navigates user to home page */
  goToHomePage(): void {
    this.router.navigate(['home']);
  }
}
