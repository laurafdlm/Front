import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  password: string = '';
  message: string | null = null;
  isSuccess: boolean = false;
  isTokenValid: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.message = 'Token inválido o faltante.';
      return;
    }
  
    // Valida el token llamando al backend
    this.http.get(`http://localhost:9000/users/validate-token?token=${this.token}`).subscribe(
      () => {
        // Token válido, muestra el formulario
        this.isTokenValid = true;
      },
      () => {
        // Token inválido, muestra un mensaje de error
        this.message = 'El token es inválido o ha expirado.';
        this.isTokenValid = false;
      }
    );
  }
  
  
  

  resetPassword(): void {
    if (!this.token || !this.password) {
      this.message = 'Debe completar todos los campos.';
      this.isSuccess = false;
      return;
    }

    this.http.post('http://localhost:9000/users/reset-password', {
      token: this.token,
      password: this.password,
    }).subscribe(
      () => {
        this.message = 'Contraseña restablecida con éxito.';
        this.isSuccess = true;
      },
      (error) => {
        console.error('Error al restablecer la contraseña:', error);
        this.message = 'No se pudo restablecer la contraseña.';
        this.isSuccess = false;
      }
    );
  }
}
