import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir CommonModule y FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email?: string;
  password?: string;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private service: UserService, private router: Router) {}

  login() {
    this.service.login(this.email!, this.password!).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.token); // Guardar el token
        this.router.navigate(['/home']); // Redirigir al home
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        this.message = 'Credenciales incorrectas.';
        this.isSuccess = false;
      }
    );
  }
  
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  
}
