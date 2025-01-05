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
  user: any = {}; // Aquí se almacenan los datos del usuario
  message: string | null = null;
  isSuccess: boolean = false;
  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.userService.getProfile().subscribe(
        (data) => {
            this.user = data;
        },
        (error) => {
            this.message = 'Error al cargar los datos del perfil.';
        }
    );
}

  

  loadProfile(): void {
    this.userService.getProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        if (error.status === 400) {
          this.message = 'Token inválido o expirado. Por favor, inicie sesión de nuevo.';
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
          console.log('Cuenta eliminada correctamente');
          alert('Cuenta eliminada correctamente');
          // Aquí puedes redirigir al usuario, por ejemplo:
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al eliminar la cuenta:', err);
          if (err.status === 403) {
            alert('Error: Token inválido');
          } else {
            alert('Error al eliminar la cuenta');
          }
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
          this.loadProfile(); // Refrescar los datos del perfil
        },
        error: (err) => {
          console.error('Error al cancelar la suscripción:', err);
          this.message = 'Error al cancelar la suscripción. Inténtalo nuevamente.';
          this.isSuccess = false;
        },
      });
    }
  }
  
  
}
