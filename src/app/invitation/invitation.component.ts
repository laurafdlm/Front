import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
})
export class InvitationComponent implements OnInit {
  sharedUrl: string | null = null;
  message: string | null = null;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sharedUrl = this.route.snapshot.queryParamMap.get('sharedUrl');
    if (!this.sharedUrl) {
      this.message = 'URL de invitación no válida.';
    }
  }

  acceptInvitation(): void {
    if (!this.sharedUrl) return;
    this.listService.acceptInvitation(this.sharedUrl).subscribe(
      (list) => {
        this.message = `Has aceptado la invitación a la lista: ${list.name}`;
      },
      (error) => {
        console.error('Error al aceptar la invitación:', error);
        this.message = 'Error al aceptar la invitación.';
      }
    );
  }

  rejectInvitation(): void {
    this.message = 'Has rechazado la invitación.';
  }
}
