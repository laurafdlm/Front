import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../lista.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-lista-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './lista-detalle.component.html',
})
export class ListaDetalleComponent implements OnInit {
  productos: any[] = [];
  idLista!: string;

  constructor(private route: ActivatedRoute, private listaService: ListaService) {}

  ngOnInit() {
    this.idLista = this.route.snapshot.params['id'];
    if (this.idLista) {
      this.cargarProductos();
    } else {
      console.error('ID de lista no proporcionado');
    }
  }
  
  cargarProductos() {
    this.listaService.getProductos(this.idLista).subscribe((data) => (this.productos = data));
  }

  anadirProducto() {
    const nombre = prompt('Nombre del producto:');
    const uds = parseFloat(prompt('Unidades pedidas:') || '0');
    if (nombre && uds > 0) {
      const producto = { name: nombre, udsPedidas: uds };
      this.listaService.addProducto(this.idLista, producto).subscribe(() => this.cargarProductos());
    }
  }

  eliminarProducto(idProducto: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.listaService.eliminarProducto(idProducto).subscribe(() => this.cargarProductos());
    }
  }
}
