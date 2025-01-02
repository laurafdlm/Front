import { Component, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterModule } from '@angular/router'; // Importa RouterModule


@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './listas.component.html',
})
export class ListasComponent implements OnInit {
  listas: any[] = [];
  listaSeleccionada: any | null = null; // Define la propiedad listaSeleccionada


  constructor(private listaService: ListaService) {}

  ngOnInit() {
    
    this.cargarListas();
  }

  cargarListas() {
    this.listaService.getListas().subscribe((data) => (this.listas = data));
  }

  crearLista() {
    const nombre = prompt('Introduce el nombre de la nueva lista:');
    if (nombre) {
      this.listaService.crearLista(nombre).subscribe(() => this.cargarListas());
    }
  }

  eliminarLista(idLista: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta lista?')) {
      this.listaService.eliminarLista(idLista).subscribe(() => this.cargarListas());
    }
  }
  seleccionarLista(lista: any) {
    this.listaSeleccionada = lista;
    if (!lista.productos || lista.productos.length === 0) {
      this.listaService.getProductos(lista.id).subscribe((productos) => {
        lista.productos = productos; // Asigna los productos obtenidos al atributo de la lista
      });
    }
  }
  
  
  agregarProducto(lista: any) {
    const nombre = prompt('Introduce el nombre del producto:');
    const udsPedidas = parseFloat(prompt('Introduce las unidades pedidas:') || '0');
    if (nombre && udsPedidas > 0) {
      const producto = { name: nombre, udsPedidas };
      this.listaService.addProducto(lista.id, producto).subscribe(() => {
        this.seleccionarLista(lista); // Actualizar lista tras añadir producto
      });
    }
  }
  
  compartirLista(idLista: string) {
    const email = prompt('Introduce el email con el que compartir la lista:');
    if (email) {
      this.listaService.compartirLista(idLista, email).subscribe((sharedUrl) => {
        alert(`Lista compartida con éxito. URL: ${sharedUrl}`);
      });
    }
  }
  comprarProducto(lista: any, producto: any) {
    const unidadesCompradas = producto.unidadesCompradas;
    if (unidadesCompradas > 0 && unidadesCompradas <= producto.udsPedidas - producto.udsCompradas) {
      this.listaService.comprarProducto(producto.id, unidadesCompradas).subscribe(() => {
        this.seleccionarLista(lista); // Actualizar lista tras la compra
      });
    } else {
      alert('Cantidad no válida');
    }
  }
  
  eliminarProducto(lista: any, idProducto: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.listaService.eliminarProducto(idProducto).subscribe(() => {
        this.seleccionarLista(lista); // Actualizar lista tras eliminar el producto
      });
    }
  }
  
}
