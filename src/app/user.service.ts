import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/users'; // Usar ruta relativa para el proxy
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Registro de usuarios
  register1(email: string, pwd1: string, pwd2: string): Observable<any> {
    const body = { email, pwd1, pwd2 };
    return this.http.post(`${this.baseUrl}/registrar1`, body).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          this.authStatusSubject.next(true);
        }
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('token'); // O 'sessionStorage' si lo estás usando
  }
  // Inicio de sesión
  login(email: string, password: string): Observable<any> {
    const body = { email, pwd: password };
    return this.http.put(`${this.baseUrl}/login1`, body, { observe: 'response' }).pipe(
      tap((response: any) => {
        const token = response.body.token;
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          this.authStatusSubject.next(true);
        }
      })
    );
  }

  cancelPremium(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }
    return this.http.put(`${this.baseUrl}/users/cancel-premium`, null, {
      headers: new HttpHeaders({
        token: token,
      }),
    });
  }
  
  // Cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    this.authStatusSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
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

  deleteAccount(): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ token: token || '' });
    return this.http.delete<string>(`${this.baseUrl}/delete-account`, {
      headers,
      responseType: 'text' as 'json', // Configuración para texto
    });
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

  processPayment(amount: number, paymentMethodId: string, email: string): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del usuario
    const headers = new HttpHeaders({ token: token || '' }); // Incluye el token en los headers
  
    const body = {
      amount: amount, // En centavos ya no es necesario multiplicar si el backend lo hace
      paymentMethodId, // ID del método de pago
      email, // Email dinámico del usuario
    };
  
    return this.http.post(`${this.baseUrl}/payment`, body, { headers });
  }
  
  markAsPaid(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del usuario
    const headers = new HttpHeaders({ token: token || '' }); // Incluye el token en los headers
    return this.http.post(`${this.baseUrl}/pay`, {}, { headers });
  }
  
  
}

