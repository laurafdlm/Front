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
      (response) => {
        // Extraer el token del cuerpo de la respuesta (o cabecera si lo devuelves ahí)
        const token = response.body.token; // Asegúrate de que el backend devuelve el token correctamente
  
        // Guardar el token en una cookie con un tiempo de expiración de 1 hora
        document.cookie = `token=${token};path=/;max-age=3600`;
  
        // Redirigir al home
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error en el login:', error);
        this.message = 'Credenciales incorrectas.';
      }
    );
  }
  
  
  
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  
}
