import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css'],
})
export class Register1Component {
  email?: string;
  pwd1?: string;
  pwd2?: string;

  constructor(private service: UserService, private router: Router) {}

  registrar() {
    if (this.pwd1 !== this.pwd2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.service.register1(this.email!, this.pwd1!, this.pwd2!).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        alert('Usuario registrado con éxito');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        alert('Error al registrar el usuario.');
      }
    );
  }
}
