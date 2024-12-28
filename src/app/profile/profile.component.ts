import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (data) => (this.user = data),
      (error) => console.error(error)
    );
  }

  deleteAccount(): void {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
      this.userService.deleteAccount().subscribe(
        () => {
          alert('Cuenta eliminada con éxito.');
          this.router.navigate(['/login']);
        },
        (error) => console.error(error)
      );
    }
  }
}
