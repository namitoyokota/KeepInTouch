import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  goToAuthenticationPage(): void {
    this.router.navigate(['authentication']);
  }

  goToHomePage(): void {
    this.router.navigate(['home']);
  }
}
