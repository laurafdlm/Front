import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
  protectedData?: any;

  constructor(private service: UserService) {}

  fetchProtectedData() {
    this.service.getProtectedData().subscribe(
      (response: any) => {
        console.log('Datos protegidos:', response);
        this.protectedData = response;
      },
      (error: any) => {
        console.error('Error al cargar datos protegidos:', error);
        alert('No tienes acceso.');
      }
    );
  }
}
