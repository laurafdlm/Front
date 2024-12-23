import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Proporcionar en la raíz para evitar dependencias circulares
})
export class UserService {
  private baseUrl = 'http://localhost:9000/users'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  register1(email: string, pwd1: string, pwd2: string): Observable<any> {
    const body = { email, pwd1, pwd2 };
    return this.http.post(`${this.baseUrl}/registrar1`, body);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, pwd: password };
    return this.http.put(`${this.baseUrl}/login1`, body);
  }
}
