import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private baseUrl = '/listas';

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
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/eliminarLista`, { headers, body: { idLista: listId } });
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
    return this.http.delete<void>(`${this.baseUrl}/eliminarProducto`, {
      body: { idProducto: productId },
    });
  }

  shareList(idLista: string, email: string): Observable<any> {
    const body = { idLista, email };
    return this.http.post('/listas/compartirLista', body);
  }
  
  acceptInvitation(sharedUrl: string): Observable<any> {
    const body = { sharedUrl };
    return this.http.post('/listas/aceptarInvitacion', body);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: token || '' });
  }
}
