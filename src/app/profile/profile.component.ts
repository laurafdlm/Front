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
        if (error.status === 401) {
          this.message = 'Token inválido o expirado. Por favor, inicie sesión de nuevo.';
          this.router.navigate(['/login']);
        } else {
          this.message = 'Error al cargar los datos del perfil.';
        }
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
      this.userService.deleteAccount().subscribe(
        (response) => {
          console.log('Cuenta eliminada con éxito:', response);
          this.message = 'Cuenta eliminada con éxito.';
          this.isSuccess = true;
          // Redirigir al login después de eliminar la cuenta
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        },
        (error) => {
          console.error('Error al eliminar la cuenta:', error);
          this.message = 'Error al eliminar la cuenta.';
          this.isSuccess = false;
        }
      );
    }
  }
}
