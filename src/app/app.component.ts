import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar CommonModule y RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {
    const currentUrl = this.router.url;
    const publicRoutes = ['/reset-password', '/forgot-password', '/register', '/login'];
  
  }
  
  

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  logout(): void {
    // Eliminar la cookie del token
    document.cookie = 'token=;path=/;max-age=0';
  
    // Informar al usuario y redirigir al login
    alert('Has cerrado sesión');
    this.router.navigate(['/login']);
  }
  
  

}
