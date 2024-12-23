import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component'; // Importa LoginComponent
import { ProtectedComponent } from './protected/protected.component'; // Importa ProtectedComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, ProtectedComponent], // Importa ambos componentes aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
