import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private navigationService: NavigationService) {}

  /** Navigates user to authentication page */
  goToAuthenticationPage(): void {
    this.navigationService.goToAuthenticationPage();
  }

  /** Navigates user to home page */
  goToHomePage(): void {
    this.navigationService.goToHomePage();
  }
}
