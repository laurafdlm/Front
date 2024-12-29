import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Para importar módulos
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { LoginComponent } from './app/login/login.component';
import { Register1Component } from './app/register1/register1.component';
import { HomeComponent } from './app/home/home.component';
import { ForgotPasswordComponent } from './app/forgot-password/forgot-password.component';
import { AuthGuard } from './app/auth.guard'; // Importa el guard
import { ResetPasswordComponent } from './app/reset-password/reset-password.component'; // Asegúrate de importar ResetPasswordComponent
import { ProfileComponent } from './app/profile/profile.component'; // Asegúrate de importar ProfileComponent
import { PaymentComponent } from './app/payment/payment.component'; // Asegúrate de importar PaymentComponent

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register1Component },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] }, 

];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule), // Asegúrate de incluir HttpClientModule aquí
  ],
});
