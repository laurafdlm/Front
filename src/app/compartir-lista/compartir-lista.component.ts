import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../lista.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-compartir-lista',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './compartir-lista.component.html',
})
export class CompartirListaComponent implements OnInit {
  email: string = '';
  mensaje: string = '';
  idLista!: string;

  constructor(private route: ActivatedRoute, private listaService: ListaService) {}

  ngOnInit() {
    this.idLista = this.route.snapshot.params['id'];
  }

  compartir() {
    if (!this.email) {
      this.mensaje = 'Por favor, introduce un email válido.';
      return;
    }
    this.listaService.compartirLista(this.idLista, this.email).subscribe(
      (response) => {
        this.mensaje = 'Lista compartida con éxito. Se ha enviado un correo.';
      },
      (error) => {
        this.mensaje = `Error al compartir la lista: ${error.message || 'Error desconocido'}`;
      }
    );
  }
  
}
