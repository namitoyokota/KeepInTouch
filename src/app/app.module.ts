import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbThemeModule,
  NbToastrModule,
  NbTooltipModule,
} from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AddDialogComponent } from './pages/home/add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from './pages/home/add-dialog/confirm-dialog/confirm-dialog.component';
import { SelectAvatarComponent } from './pages/home/add-dialog/select-avatar/select-avatar.component';
import { FooterComponent } from './pages/home/footer/footer.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './pages/home/layout/card/card.component';
import { LayoutComponent } from './pages/home/layout/layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AddDialogComponent,
    LayoutComponent,
    SelectAvatarComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LandingComponent,
    AuthenticationComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbTooltipModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
