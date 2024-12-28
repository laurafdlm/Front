import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token'); // Verifica si el token existe
      if (token) {
        return true; // Permite el acceso
      }
    }

    this.router.navigate(['/login']); // Redirige al login si no hay token
    return false; // Bloquea el acceso
  }
}
