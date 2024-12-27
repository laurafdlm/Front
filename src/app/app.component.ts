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
  
    // Redirigir solo si no está autenticado y no está en una ruta pública
    if (!this.isLoggedIn() && !publicRoutes.some(route => currentUrl.startsWith(route))) {
      this.router.navigate(['/login']);
    }
  }
  

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    alert('Has cerrado sesión');
    this.router.navigate(['/login']);
  }

}
