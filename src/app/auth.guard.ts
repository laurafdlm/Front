import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Comprueba si hay un token de sesión
    const isResetPasswordRoute = route.routeConfig?.path === 'reset-password';
    if (!isLoggedIn && !isResetPasswordRoute) {
        this.router.navigate(['/login']);
        return false;
    
    
    }
  
    return true; // Permite el acceso
  }
  
}
