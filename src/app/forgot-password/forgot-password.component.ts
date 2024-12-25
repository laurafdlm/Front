import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  
})
export class ForgotPasswordComponent {
  email?: string;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private userService: UserService) {}

  sendRecoveryEmail() {
    if (!this.email) {
      this.message = 'Por favor, introduce tu correo electrónico.';
      this.isSuccess = false;
      return;
    }

    this.userService.sendPasswordRecovery(this.email).subscribe(
      (response) => {
        this.message = '¡Correo enviado! Revisa tu bandeja de entrada.';
        this.isSuccess = true;
      },
      (error) => {
        this.message = 'Error al enviar el correo. Intenta de nuevo.';
        this.isSuccess = false;
      }
    );
  }
}
