import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añade FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email?: string;
  password?: string;

  constructor() {}

  login() {
    console.log('Intento de inicio de sesión:', this.email, this.password);
  }
}
