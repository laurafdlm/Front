import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component {
  email?: string;
  pwd1?: string;
  pwd2?: string;

  constructor(private service: UserService) {}

  registrar() {
    if (this.pwd1 !== this.pwd2) {
      console.error('Las contraseñas no coinciden');
      return;
    }
  
    this.service.register1(this.email!, this.pwd1!, this.pwd2!).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        alert(response); // Mostrar el texto plano devuelto por el backend
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        alert('Hubo un problema al registrar el usuario.');
      }
    );
  }
  
  
}
