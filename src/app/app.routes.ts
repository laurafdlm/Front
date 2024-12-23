import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Register1Component } from './register1/register1.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: Register1Component },
    { path: 'forgot-password', component: ForgotPasswordComponent }, // Ruta correcta para recuperación
    { path: 'home', component: HomeComponent },
  ];
  