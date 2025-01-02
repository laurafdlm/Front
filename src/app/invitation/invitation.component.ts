// src/app/invitation/invitation.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
})
export class InvitationComponent {
  sharedUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService
  ) {
    this.sharedUrl = this.route.snapshot.queryParamMap.get('sharedUrl') || '';
  }

  acceptInvitation(): void {
    this.listService.acceptInvitation(this.sharedUrl).subscribe({
      next: () => {
        alert('Invitación aceptada. Ahora puedes ver y gestionar la lista.');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al aceptar la invitación:', error);
        alert('No se pudo procesar la invitación.');
      },
    });
  }

  rejectInvitation(): void {
    alert('Has rechazado la invitación.');
    this.router.navigate(['/home']);
  }
}

