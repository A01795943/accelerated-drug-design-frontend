import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, type UserListItem, type CreateUserRequest } from '@/app/core/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserList implements OnInit {
  title = 'Usuarios';
  users: UserListItem[] = [];
  loading = true;
  error: string | null = null;

  private userService = inject(UserService);
  private modal = inject(NgbModal);
  private fb = inject(FormBuilder);

  createForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    role: ['USER' as const, Validators.required],
  });
  createOpen = false;
  createLoading = false;
  createError = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getList().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || err?.message || 'Error al cargar usuarios';
        this.loading = false;
      },
    });
  }

  openCreate(): void {
    this.createForm.reset({ username: '', email: '', password: '', role: 'USER' });
    this.createError = '';
    this.createOpen = true;
  }

  closeCreate(): void {
    this.createOpen = false;
  }

  submitCreate(): void {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) return;
    const v = this.createForm.getRawValue();
    const request: CreateUserRequest = {
      username: v.username!,
      email: v.email!,
      password: v.password!,
      role: v.role! as 'USER' | 'ADMIN',
    };
    this.createLoading = true;
    this.createError = '';
    this.userService.create(request).subscribe({
      next: () => {
        this.createLoading = false;
        this.closeCreate();
        this.loadUsers();
      },
      error: (err) => {
        this.createLoading = false;
        this.createError = err?.error?.error || err?.message || 'Error al crear usuario';
      },
    });
  }
}
