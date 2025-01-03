import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitation-accepted',
  template: `
    <div class="container mt-5 text-center">
      <h2>¡Invitación aceptada!</h2>
      <p>Ahora puedes iniciar sesión para gestionar la lista.</p>
      <button class="btn btn-primary mt-3" (click)="goToLogin()">Iniciar sesión</button>
    </div>
  `,
  styles: [],
})
export class InvitationAcceptedComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
