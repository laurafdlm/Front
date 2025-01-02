import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private baseUrl = '/listas';

  constructor(private http: HttpClient) {}

  // Obtener todas las listas
  getListas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getListas`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error al obtener las listas:', error.message || error);
        return throwError(() => new Error('Error al obtener las listas.'));
      })
    );
  }
  
  
  
  // Obtener productos de una lista
  getProductos(idLista: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProductos`, {
      headers: { idLista },
    });
  }

  // Crear una nueva lista
  crearLista(nombre: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/crearLista`, { name: nombre }, {
      headers: this.getAuthHeaders(),
    });
  }
  

  // Eliminar una lista
  eliminarLista(idLista: string): Observable<any> {
    return this.http.request('DELETE', `${this.baseUrl}/eliminarLista`, {
      headers: this.getAuthHeaders(),
    });
  }
  

  // Añadir un producto
  addProducto(idLista: string, producto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProducto`, producto, {
      headers: this.getAuthHeaders().append('idLista', idLista),
    });
  }


  // Compartir una lista
  compartirLista(idLista: string, email: string): Observable<string> {
    const payload = { idLista, email };
    return this.http.post<{ sharedUrl: string }>('/listas/compartirLista', payload).pipe(
      map(response => response.sharedUrl)
    );
  }
  
  
  

  // Aceptar invitación
  aceptarInvitacion(sharedUrl: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/aceptarInvitacion`, { sharedUrl });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    console.log('Token obtenido:', token); // Depuración
    if (!token) {
      console.error('Token no encontrado. Por favor, inicia sesión.');
      throw new Error('Token no encontrado. Por favor, inicia sesión.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  
  
  
  
  comprarProducto(idProducto: string, unidadesCompradas: number): Observable<any> {
    const payload = { idProducto, unidadesCompradas };
    return this.http.put('/listas/comprar', payload);
  }
  
  eliminarProducto(idProducto: string): Observable<any> {
    return this.http.request('DELETE', `${this.baseUrl}/eliminarProducto`, {
    });
  }
  
}
