import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class UserService {
  private apiUrl = 'https://localhost:7265/api/user';

  constructor(private http: HttpClient) {}

  // Get all users
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAll`);
  }

  // Get user by name
  getByName(name: string): Observable<any> {
    const url = `${this.apiUrl}?name=${name}`;
    return this.http.get<any>(url);
  }

  // Add a new user
  add(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, user, { headers });
  }
}
