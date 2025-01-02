import { Component, OnInit } from '@angular/core';
import { ListaService } from '../../services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  listas: any[] = [];
  token: string = 'your-auth-token'; // Reemplaza con el token del usuario

  constructor(private listaService: ListaService) {}

  ngOnInit(): void {
    this.listaService.getListas(this.token).subscribe(
      (data) => {
        this.listas = data;
      },
      (error) => {
        console.error('Error al obtener las listas:', error);
      }
    );
  }
}
