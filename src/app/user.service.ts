// UserService actualizado
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/users'; // Usar ruta relativa para aprovechar el proxy

  constructor(private http: HttpClient) {}

  // Registro de usuarios
  register1(email: string, pwd1: string, pwd2: string): Observable<any> {
    const body = { email, pwd1, pwd2 };
    return this.http.post(`${this.baseUrl}/registrar1`, body);
  }

  // Inicio de sesión
  login(email: string, password: string): Observable<any> {
    const body = { email, pwd: password };
    return this.http.put(`${this.baseUrl}/login1`, body, { observe: 'response' }).pipe(
      tap((response: any) => {
        const token = response.body.token; // Obtén el token del backend
        if (token) {
          localStorage.setItem('token', token); // Almacénalo en localStorage
        }
      })
    );
  }
  

  // Recuperación de contraseña
  sendPasswordRecovery(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.baseUrl}/forgot-password`, body, {
      responseType: 'text',
    });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    if (!token) {
      throw new Error('Token no encontrado en localStorage');
    }
    const headers = new HttpHeaders({ token }); // Añade el token en los headers
    return this.http.get(`${this.baseUrl}/profile`, { headers });
  }
  
  
  // Actualizar perfil del usuario
  updateProfile(updates: { email?: string; pwd?: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ token: token || '' });
    return this.http.put(`${this.baseUrl}/profile/update`, updates, { headers });
  }

  // Eliminar cuenta del usuario
  deleteAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ token: token || '' });
    return this.http.delete(`${this.baseUrl}/delete-account`, { headers });
  }

  // Restablecimiento de contraseña
  resetPassword(token: string, password: string): Observable<any> {
    const body = { token, password };
    return this.http.post(`${this.baseUrl}/reset-password`, body);
  }

  // Estado de pago
  getPaymentStatus(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ token: token || '' });
    return this.http.get(`${this.baseUrl}/payment-status`, { headers });
  }

  // Realizar pago
  processPayment(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ token: token || '' });
    return this.http.post(`${this.baseUrl}/payment`, {}, { headers });
  }
}

