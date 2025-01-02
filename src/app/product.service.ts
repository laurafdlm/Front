import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Esto lo hace disponible globalmente
})
export class ProductService {
  private baseUrl = '/listas';

  constructor(private http: HttpClient) {}

  getProducts(idLista: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getProductos`, {
      headers: { idLista },
    });
  }

  addProduct(idLista: string, product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProducto`, product, {
      headers: { idLista },
    });
  }

  buyProduct(idProducto: string, units: number): Observable<any> {
    const body = { idProducto, unidadesCompradas: units };
    return this.http.put(`${this.baseUrl}/comprar`, body);
  }
}
