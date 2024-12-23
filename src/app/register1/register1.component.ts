import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register1',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir CommonModule y FormsModule
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css'],
})
export class Register1Component {
  email?: string;
  pwd1?: string;
  pwd2?: string;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private service: UserService, private router: Router) {}

  registrar() {
    if (this.pwd1 !== this.pwd2) {
      this.message = 'Las contraseñas no coinciden.';
      this.isSuccess = false;
      return;
    }
  
    this.service.register1(this.email!, this.pwd1!, this.pwd2!).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
  
        // Asegúrate de guardar el token si lo devuelve el backend
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
  
        this.message = 'Usuario registrado con éxito.';
        this.isSuccess = true;
  
        // Redirigir a la página principal
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        this.message = 'Error al registrar el usuario. Intenta de nuevo.';
        this.isSuccess = false;
      }
    );
  }
  
}
