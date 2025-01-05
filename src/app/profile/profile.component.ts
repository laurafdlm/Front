import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Datos del usuario
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);
        if (error.status === 400) {
          this.message = 'Token inválido o expirado. Por favor, inicie sesión nuevamente.';
        } else {
          this.message = 'Error al cargar los datos del perfil.';
        }
        this.isSuccess = false;
      }
    );
  }

  deleteAccount(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.userService.deleteAccount().subscribe({
        next: () => {
          alert('Cuenta eliminada correctamente');
          this.router.navigate(['/login']); // Redirigir al usuario
        },
        error: (err) => {
          console.error('Error al eliminar la cuenta:', err);
          this.message = err.status === 403 ? 'Error: Token inválido.' : 'Error al eliminar la cuenta.';
          this.isSuccess = false;
        },
      });
    }
  }

  cancelSubscription(): void {
    if (confirm('¿Estás seguro de que deseas cancelar tu suscripción premium?')) {
      this.userService.cancelPremium().subscribe({
        next: () => {
          this.message = 'Suscripción premium cancelada con éxito.';
          this.isSuccess = true;
          this.loadProfile(); // Actualizar el perfil
        },
        error: (err) => {
          console.error('Error al cancelar la suscripción:', err);
          this.message =
            err.status === 404
              ? 'La funcionalidad de cancelar suscripción no está disponible.'
              : 'Error al cancelar la suscripción. Inténtalo nuevamente.';
          this.isSuccess = false;
        },
      });
    }
  }
  
}
