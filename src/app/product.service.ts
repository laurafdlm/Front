import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root', // Esto lo hace disponible globalmente
})
export class ProductService {
  private baseUrl = '/listas';

  constructor(private http: HttpClient) {}

  getProducts(idLista: string): Observable<any[]> {
    const headers = new HttpHeaders().set('idLista', idLista);
    return this.http.get<any[]>(`${this.baseUrl}/getProductos`, { headers });
  }
  

  addProduct(idLista: string, product: any): Observable<any> {
    const headers = new HttpHeaders().set('idLista', idLista);
    return this.http.post(`${this.baseUrl}/addProducto`, product, { headers });
  }

  buyProduct(idProducto: string, units: number): Observable<any> {
    const body = { idProducto, unidadesCompradas: units };
    return this.http.put(`${this.baseUrl}/comprar`, body);
  }

  deleteProduct(idProducto: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/eliminarProducto`, {
      params: { idProducto },
      headers: { Authorization: token || '' },
      responseType: 'text'
    });
  }
  
  
}
