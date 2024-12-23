import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component'; // Importar LoginComponent
import { ProtectedComponent } from './protected/protected.component'; // Importar ProtectedComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, ProtectedComponent], // Agregar componentes aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
