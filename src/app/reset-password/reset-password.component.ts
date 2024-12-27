import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { HttpClient } from '@angular/common/http'; // Para realizar peticiones HTTP
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como ngClass y ngIf

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule], // Incluye FormsModule y CommonModule aquí
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})

export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  password: string = '';
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token'); // Captura el token
    console.log('Token recibido:', this.token);

    if (!this.token) {
      this.message = 'Token inválido o faltante.';
      this.isSuccess = false;
    }
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
        setTimeout(() => this.router.navigate(['/login']), 3000); // Redirige después de 3 segundos
      },
      (error) => {
        console.error('Error al restablecer la contraseña:', error);
        this.message = 'No se pudo restablecer la contraseña.';
        this.isSuccess = false;
      }
    );
  }
}