import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private productService: ProductService, // Inyección del servicio
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idLista = this.route.snapshot.paramMap.get('id')!;
    this.loadProducts();
  }

  loadProducts(): void {
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
      },
      (error) => {
        console.error('Error al añadir el producto:', error);
        this.message = 'Hubo un problema al añadir el producto.';
      }
    );
  }

  buyProduct(idProducto: string, units: number): void {
    if (units <= 0) {
      this.message = 'Debe comprar una cantidad mayor a 0.';
      return;
    }

    this.productService.buyProduct(idProducto, units).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error al comprar el producto:', error);
        this.message = 'Hubo un problema al comprar el producto.';
      }
    );
  }
}
