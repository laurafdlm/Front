import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar CommonModule y RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {}

ngOnInit(): void {
  const tieneToken = this.userService.isAuthenticated();
  this.isLoggedIn = tieneToken;
  this.userService.authStatus.subscribe((status) => {
    this.isLoggedIn = status;
  });
}


toggleNavbar() {
  const navbar = document.getElementById('navbarNav');
  if (navbar) {
    navbar.classList.toggle('show');
  }
}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}