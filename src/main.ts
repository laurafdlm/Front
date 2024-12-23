import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Para importar módulos
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { LoginComponent } from './app/login/login.component';
import { Register1Component } from './app/register1/register1.component';
import { HomeComponent } from './app/home/home.component';
import { AuthGuard } from './app/auth.guard'; // Importa el guard

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: Register1Component },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protegida con el guard
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule), // Asegúrate de incluir HttpClientModule aquí
  ],
});
