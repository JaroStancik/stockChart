import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; //https://www.npmjs.com/package/ngx-toastr

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showError(message: string | undefined, title: string | undefined) {
    this.toastr.show(message, title, {
      enableHtml: false,
      closeButton: false,
      timeOut: 5000,
      positionClass: 'toast-align',
    });
  }
}
