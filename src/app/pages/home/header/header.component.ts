import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigationService } from 'src/app/services/navigation.service';

enum ContextMenu {
  deleteAccount = 'Delete Account',
  logOut = 'Log Out',
}

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** Emits when search button clicked */
  @Output() onSearchToggle = new EventEmitter<boolean>();

  /** Emits when create new button clicked */
  @Output() createNew = new EventEmitter<void>();

  /** Flag to indicate when searching */
  isSearching = false;

  /** List of items to display in context menu */
  items = [{ title: ContextMenu.deleteAccount }, { title: ContextMenu.logOut }];

  /** String used as identifier for the context menu */
  readonly contextMenuName = 'account-menu';

  constructor(
    private firebaseService: FirebaseService,
    private navigationService: NavigationService,
    private nbMenuService: NbMenuService
  ) {}

  /** On init lifecycle hook */
  ngOnInit(): void {
    this.listenToContextMenu();
  }

  /** Shows or hides search bar */
  toggleSearch(): void {
    this.isSearching = !this.isSearching;

    this.onSearchToggle.emit(this.isSearching);
  }

  /** Emits event to open create friend dialog */
  createNewFriend(): void {
    this.createNew.emit();
  }

  /** Listens to item click on context menu */
  private listenToContextMenu(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === this.contextMenuName),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        switch (title) {
          case ContextMenu.deleteAccount:
            this.deleteAccount();
            break;
          case ContextMenu.logOut:
            this.logOut();
            break;
          default:
            break;
        }
      });
  }

  /** Log out user */
  private logOut(): void {
    this.firebaseService.authentication.signOut().then(() => {
      this.navigationService.goToAuthenticationPage();
    });
  }

  /** Delete currently logged in user */
  private deleteAccount(): void {
    // TODO: add confirmation dialog

    this.firebaseService.authentication.deleteAccount().then(() => {
      this.navigationService.goToAuthenticationPage();
    });
  }
}
