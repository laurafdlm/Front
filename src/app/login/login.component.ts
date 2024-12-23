import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email?: string;
  password?: string;

  
  constructor(private service: UserService, private router: Router) {}
  message: string | null = null; // Mensaje a mostrar
  isSuccess: boolean = false; // Determina el tipo de mensaj

login() {
  this.service.login(this.email!, this.password!).subscribe(
    (response: any) => {
      console.log('Inicio de sesión exitoso:', response);
      localStorage.setItem('token', response.token);
      this.message = 'Inicio de sesión exitoso.';
      this.isSuccess = true;
      this.router.navigate(['/home']);
    },
    (error: any) => {
      console.error('Error en el inicio de sesión:', error);
      this.message = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      this.isSuccess = false;
    }
  );
}
  
}
