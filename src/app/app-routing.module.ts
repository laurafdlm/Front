import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Register1Component } from './register1/register1.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component'; // Asegúrate de importar el componente
import { AuthGuard } from './auth.guard';
import { InvitationAcceptedComponent } from './invitation-accepted/invitation-accepted.component';
import { RedirectIfAuthGuard } from './redirect-if-auth.guard';

const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [RedirectIfAuthGuard] },
  { path: 'register', component: Register1Component, canActivate: [RedirectIfAuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] }, // Añade esta línea
  { path: 'invitation-accepted', component: InvitationAcceptedComponent },
  {
    path: 'lists/:idLista/products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), PaymentComponent],
  exports: [RouterModule],
})
export class AppRoutingModule {}
