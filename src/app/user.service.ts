import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9000/users';

  constructor(private http: HttpClient) {}

  register1(email: string, pwd1: string, pwd2: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar1`, { email, pwd1, pwd2 });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/login1`, { email, pwd: password });
  }

  getProtectedData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/getAllUsers`, { headers });
  }
}
