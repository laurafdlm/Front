import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  listId: string | null = null;
  products: any[] = [];
  newProductName: string = '';
  newProductQuantity: number | null = null;
  message: string | null = null;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    if (this.listId) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    this.listService.getProducts(this.listId!).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.message = 'Error al cargar los productos.';
      }
    );
  }

  addProduct(): void {
    if (!this.newProductName.trim() || this.newProductQuantity === null || this.newProductQuantity <= 0) {
      this.message = 'El nombre y la cantidad del producto deben ser válidos.';
      return;
    }
    const product = { name: this.newProductName, udsPedidas: this.newProductQuantity };
    this.listService.addProduct(this.listId!, product).subscribe(
      (updatedList) => {
        this.products = updatedList.productos;
        this.newProductName = '';
        this.newProductQuantity = null;
      },
      (error) => {
        console.error('Error al añadir producto:', error);
        this.message = 'Error al añadir el producto.';
      }
    );
  }

  deleteProduct(productId: string): void {
    this.listService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter((product) => product.id !== productId);
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
        this.message = 'Error al eliminar el producto.';
      }
    );
  }
}
