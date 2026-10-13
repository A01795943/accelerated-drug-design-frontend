import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

export interface AppSetting {
  key: string;
  value: string;
  defaultValue: string;
  type: string;
  min: number | null;
  max: number | null;
  description: string;
  group: string;
  updatedAt?: string | null;
  updatedBy?: string | null;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/settings`;

  list(): Observable<AppSetting[]> {
    return this.http.get<AppSetting[]>(this.apiUrl);
  }

  update(key: string, value: string): Observable<AppSetting> {
    return this.http.put<AppSetting>(`${this.apiUrl}/${key}`, { value });
  }
}
