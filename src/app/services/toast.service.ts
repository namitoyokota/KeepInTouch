import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastService: NbToastrService) {}

  /** Displayed primary toast with given messages */
  primaryToast(title: string, message: string) {
    this.toastService.primary(title, message);
  }

  /** Displayed success toast with given messages */
  successToast(title: string, message: string) {
    this.toastService.success(title, message);
  }

  /** Displayed warning toast with given messages */
  failureToast(title: string, message: string) {
    this.toastService.warning(title, message);
  }
}
