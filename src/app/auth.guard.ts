import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log('AuthGuard: Token encontrado:', token); // Añadir log para verificar el token
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
