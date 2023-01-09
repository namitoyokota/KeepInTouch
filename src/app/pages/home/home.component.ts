import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Friend } from '../../abstractions/friend';
import { FirebaseService } from '../../services/firebase.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /** Flag to indicate when searching */
  isSearching = false;

  /** Flag to indicate when data is loading */
  isLoading$ = this.firebaseService.isLoading$;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private dialogService: NbDialogService,
    private toastService: NbToastrService
  ) {}

  /** On init lifecycle hook */
  ngOnInit(): void {
    const userLoggedIn = !!this.firebaseService.currentUser;
    if (!userLoggedIn) {
      this.goToAuthenticationPage();
    }
  }

  /** Opens dialog to create a new friend */
  openDialog() {
    this.dialogService
      .open(AddDialogComponent)
      .onClose.subscribe((newFriend) => {
        if (newFriend) {
          this.submitFriend(newFriend);
        }
      });
  }

  /** Adds requested friend in the database */
  private submitFriend(newFriend: Friend) {
    this.firebaseService
      .addFriend(newFriend)
      .then(() => {
        this.successToast('Success', 'Added friend');
      })
      .catch(() => {
        this.failureToast('Failure', 'Failed attempting to add a friend');
      });
  }

  /** User not logged in so go back to authentication page */
  private goToAuthenticationPage(): void {
    this.router.navigate(['authentication']);
  }

  /** Displayed success toast with given messages */
  private successToast(title: string, message: string) {
    this.toastService.success(title, message);
  }

  /** Displayed warning toast with given messages */
  private failureToast(title: string, message: string) {
    this.toastService.warning(title, message);
  }
}
