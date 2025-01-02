import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private baseUrl = 'http://localhost:80/listas'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Obtener todas las listas del usuario
  getListas(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.baseUrl}/getListas`, { headers });
  }

  // Crear una nueva lista
  crearLista(name: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${this.baseUrl}/crearLista`, { name }, { headers });
  }

  // Añadir un producto a una lista
  addProducto(idLista: string, producto: any): Observable<any> {
    const headers = new HttpHeaders().set('idLista', idLista);
    return this.http.post(`${this.baseUrl}/addProducto`, producto, { headers });
  }

  // Eliminar una lista
  eliminarLista(idLista: string, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminarLista`, {
      body: { idLista, token },
    });
  }

  // Compartir una lista
  compartirLista(idLista: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${this.baseUrl}/compartirLista`, { idLista }, { headers });
  }

  // Aceptar una invitación
  aceptarInvitacion(sharedUrl: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/aceptarInvitacion`, { sharedUrl });
  }
}
