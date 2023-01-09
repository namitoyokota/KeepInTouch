import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
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
    private firebaseService: FirebaseService,
    private navigationService: NavigationService,
    private dialogService: NbDialogService,
    private toastService: ToastService
  ) {}

  /** On init lifecycle hook */
  ngOnInit(): void {
    const userLoggedIn = !!this.firebaseService.currentUser;
    if (!userLoggedIn) {
      this.navigationService.goToAuthenticationPage();
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
        this.toastService.successToast('Success', 'Added friend');
      })
      .catch(() => {
        this.toastService.failureToast(
          'Failure',
          'Failed attempting to add a friend'
        );
      });
  }
}
