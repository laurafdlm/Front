import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Proporcionar en la raíz para evitar dependencias circulares
})
export class UserService {
  private baseUrl = 'http://localhost:9000/users';

  constructor(private http: HttpClient) {}

  // Método para registro
  register1(email: string, pwd1: string, pwd2: string): Observable<any> {
    const body = { email, pwd1, pwd2 };
    return this.http.post(`${this.baseUrl}/registrar1`, body);
  }

  // Método para inicio de sesión
  login(email: string, password: string): Observable<any> {
    const body = { email, pwd: password };
    return this.http.put(`${this.baseUrl}/login1`, body, { observe: 'response' });
  }
  

  sendPasswordRecovery(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.baseUrl}/forgot-password`, body, { responseType: 'text' }); // Ajusta `responseType` a `text`
  }
  
  getProfile() {
    return this.http.get('/api/users/profile');
  }
  
  deleteAccount() {
    return this.http.delete('/api/users/delete-account');
  }
  
  
}
