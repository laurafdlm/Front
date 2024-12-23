import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Comprueba si hay un token en el almacenamiento local
    if (token) {
      return true; // Permite el acceso si hay un token
    }

    // Redirige al usuario al login si no está autenticado
    this.router.navigate(['/login']);
    return false;
  }
}
