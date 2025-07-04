import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private baseUrl = '/listas'; // La base URL relativa

  constructor(private http: HttpClient) {}

  getLists(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/getListas`, { headers });
  }

  createList(name: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/crearLista`, { name }, { headers });
  }

  deleteList(listId: string): Observable<void> {
    const token = localStorage.getItem('token'); // Obtener el token
    return this.http.delete<void>(`${this.baseUrl}/eliminarLista?idLista=${listId}&token=${token}`);
  }
  
  
  

  getProducts(listId: string): Observable<any[]> {
    const headers = this.getAuthHeaders().set('idLista', listId);
    return this.http.get<any[]>(`${this.baseUrl}/getProductos`, { headers });
  }

  addProduct(listId: string, product: any): Observable<any> {
    const headers = this.getAuthHeaders().set('idLista', listId);
    return this.http.post<any>(`${this.baseUrl}/addProducto`, product, { headers });
  }

  deleteProduct(productId: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/eliminarProducto`, { headers, body: { idProducto: productId } });
  }

  shareList(listId: string, email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/compartirLista`, { idLista: listId, email }, { headers });
  }

  acceptInvitation(sharedUrl: string): Observable<any> {
    const body = { sharedUrl };
    return this.http.post(`${this.baseUrl}/aceptarInvitacion`, body);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: token || '' });
  }
  getSharedLists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listasCompartidas`, {
      headers: { Authorization: localStorage.getItem('token') || '' },
    });
  }

  getSharedUsers(listId: string): Observable<string[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(`${this.baseUrl}/usuariosCompartidos`, {
      headers,
      params: { idLista: listId }, // Usa el parámetro idLista
    });
  }
  
  revokeAccess(listId: string, email: string): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/revocarAcceso`, {
      headers,
      params: { idLista: listId, emailUsuario: email },
      responseType: 'text', // Especificamos que la respuesta es texto plano
    }).pipe(
      tap((response: string) => {
        console.log('Respuesta del backend:', response);
      })
    );
  }
  
  
  
}
