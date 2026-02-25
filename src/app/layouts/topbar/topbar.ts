import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  changetheme,
  changemenucolor,
  changetopbarcolor,
} from '@store/layout/layout-action';
import { getLayoutColor } from '@store/layout/layout-selector';
import { AuthenticationService } from '@/app/core/services/auth.service';
import { ChangePasswordModal } from './change-password-modal/change-password-modal';
import { logout } from '@store/authentication/authentication.actions';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './topbar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Topbar {
  store = inject(Store);
  private modal = inject(NgbModal);
  auth = inject(AuthenticationService);

  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme');
    const next = color === 'light' ? 'dark' : 'light';
    this.store.dispatch(changetheme({ color: next }));
    this.store.dispatch(changemenucolor({ menu: next }));
    this.store.dispatch(changetopbarcolor({ topbar: next }));
    this.store.select(getLayoutColor).subscribe((c) => {
      document.documentElement.setAttribute('data-bs-theme', c);
    });
  }

  openChangePassword() {
    this.modal.open(ChangePasswordModal, { centered: true });
  }

  doLogout() {
    this.store.dispatch(logout());
  }
}
