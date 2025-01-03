import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Register1Component } from './register1/register1.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component'; // Asegúrate de importar el componente
import { InvitationAcceptedComponent } from './invitation-accepted/invitation-accepted.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register1Component },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] }, // Añade esta línea
  { path: 'invitation-accepted', component: InvitationAcceptedComponent },

];
