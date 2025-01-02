import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Para importar módulos
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

// Componentes existentes
import { LoginComponent } from './app/login/login.component';
import { Register1Component } from './app/register1/register1.component';
import { HomeComponent } from './app/home/home.component';
import { ForgotPasswordComponent } from './app/forgot-password/forgot-password.component';
import { AuthGuard } from './app/auth.guard';
import { ResetPasswordComponent } from './app/reset-password/reset-password.component';
import { ProfileComponent } from './app/profile/profile.component';
import { PaymentComponent } from './app/payment/payment.component';

// Nuevos componentes
import { ListComponent } from './app/list/list.component';
import { ProductsComponent } from './app/products/products.component';
import { InvitationComponent } from './app/invitation/invitation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register1Component },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },

  // Nuevas rutas
  { path: 'lists', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'lists/:id/products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'invitation', component: InvitationComponent }, // Invitaciones no necesitan autenticación
  { path: 'lists/:id/products', component: ProductsComponent, canActivate: [AuthGuard] },

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule), // Asegúrate de incluir HttpClientModule aquí
  ],
});
