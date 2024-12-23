import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
  protectedData?: any;

  fetchProtectedData() {
    // Simulación de datos protegidos
    this.protectedData = { mensaje: 'Acceso permitido' };
  }
}
