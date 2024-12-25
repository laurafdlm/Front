import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { HttpClient } from '@angular/common/http'; // Para realizar peticiones HTTP
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como ngClass y ngIf

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule], // Incluye FormsModule y CommonModule aquí
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})

export class ResetPasswordComponent implements OnInit {
  password: string = '';
  token: string | null = null;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    console.log('ResetPasswordComponent inicializado');
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Token:', this.token);
    if (!this.token) {
      this.message = 'Token inválido o faltante.';
      this.isSuccess = false;
    }
  }

  resetPassword() {
    if (!this.token) {
      this.message = 'Token inválido o faltante.';
      this.isSuccess = false;
      return;
    }
  
    this.http.post('http://localhost:9000/users/reset-password', {
      token: this.token,
      password: this.password,
    }).subscribe(
      () => {
        console.log('Contraseña restablecida correctamente.');
        this.message = 'Contraseña restablecida con éxito.';
        this.isSuccess = true;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      (error) => {
        console.error('Error al restablecer la contraseña:', error);
        this.message = 'No se pudo restablecer la contraseña.';
        this.isSuccess = false;
      }
    );
  }
}