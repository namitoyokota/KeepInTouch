import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'landing',
    title: 'Keep In Touch - Landing',
    component: LandingComponent,
  },
  {
    path: 'authentication',
    title: 'Keep In Touch - Authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'home',
    title: 'Keep In Touch - Home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'Keep In Touch - Not Found',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
