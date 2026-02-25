import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

export interface UserListItem {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/users`;

  getList(): Observable<UserListItem[]> {
    return this.http.get<UserListItem[]>(this.apiUrl);
  }

  create(request: CreateUserRequest): Observable<UserListItem> {
    return this.http.post<UserListItem>(this.apiUrl, request);
  }
}
