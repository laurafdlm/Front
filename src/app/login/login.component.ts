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

  login() {
    this.service.login(this.email!, this.password!).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas.');
      }
    );
  }
}
