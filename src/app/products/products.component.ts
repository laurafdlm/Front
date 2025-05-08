import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProductName: string = '';
  newProductQuantity: number = 0;
  message: string = '';
  idLista: string = '';
  isOwner: boolean = false;


  constructor(
    private productService: ProductService, // Inyección del servicio
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idLista = params['id'];
      if (!this.idLista) {
        console.warn('No se pudo obtener idLista desde los parámetros');
        return;
      }
  
      this.route.queryParams.subscribe(query => {
        this.isOwner = query['owner'] === 'true';
      });
  
      // Aquí fuera del segundo subscribe
      this.websocketService.message$.subscribe(() => {
        this.loadProducts();
      });
  
      this.loadProducts();
    });
  }
  
  
  loadProducts(): void {
    if (!this.idLista) {
      console.warn('No hay idLista definido');
      return;
    }
  
    this.productService.getProducts(this.idLista).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
        this.message = 'Hubo un problema al cargar los productos.';
      }
    );
  }
  
  
  

  addProduct(): void {
    if (!this.newProductName || this.newProductQuantity <= 0) {
      this.message = 'Debe proporcionar un nombre y una cantidad válida.';
      return;
    }

    const product = {
      name: this.newProductName,
      udsPedidas: this.newProductQuantity,
    };

    this.productService.addProduct(this.idLista, product).subscribe(
      () => {
        this.newProductName = '';
        this.newProductQuantity = 0;
        this.loadProducts();
        this.websocketService.enviarMensaje('producto actualizado'); // Aquí
      },
    
      (error) => {
        if (error.status === 403) {
          this.message = 'Necesitas ser usuario premium para realizar esta acción.';
        } else {
          this.message = 'Error al añadir el producto.';
        }
      }
      
    );
  }

  goBack(): void {
    window.history.back();
  }
  
  buyProduct(idProducto: string, units: number): void {
    if (units <= 0) {
      this.message = 'Debe comprar una cantidad mayor a 0.';
      return;
    }

    this.productService.buyProduct(idProducto, units).subscribe(
      () => {
        this.loadProducts();
        this.websocketService.enviarMensaje('producto comprado'); 
      },    
      (error) => {
        console.error('Error al comprar el producto:', error);
        this.message = 'Hubo un problema al comprar el producto.';
      }
    );
    
  }

  deleteProduct(idProducto: string): void {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
  
    this.productService.deleteProduct(idProducto).subscribe(
      () => {
        this.message = 'Producto eliminado correctamente.';
        this.loadProducts();
        this.websocketService.enviarMensaje('producto actualizado');
      },
      (error) => {
        this.message = 'Error al eliminar el producto.';
      }
    );
  }
  
  
}
