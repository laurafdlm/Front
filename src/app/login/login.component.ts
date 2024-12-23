import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email?: string;
  password?: string;

  constructor(private service: UserService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    this.service.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso. Token:', response.token);
        localStorage.setItem('token', response.token); // Guardar token en localStorage
        alert('Inicio de sesión exitoso.');
        this.router.navigate(['/protected']); // Redirigir a la página protegida
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas.');
      }
    );
  }
}
