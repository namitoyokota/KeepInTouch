import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  /** Header for this confirm dialog */
  title = '';

  /** Description of what to ask */
  subtitle = '';

  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) {}

  /** Pursue action */
  yes() {
    this.dialogRef.close(true);
  }

  /** Cancel action */
  no() {
    this.dialogRef.close(false);
  }
}
