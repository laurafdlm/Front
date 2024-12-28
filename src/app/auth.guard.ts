import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const cookies = document.cookie.split('; ').find((row) => row.startsWith('token='));
    const token = cookies ? cookies.split('=')[1] : null;
  
    if (token) {
      return true; // Token válido, permitir acceso
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no hay token
      return false;
    }
  }
  
  
}
