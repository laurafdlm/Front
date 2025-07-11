import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
constructor(private router: Router, private userService: UserService) {}

canActivate(): boolean {
  if (this.userService.isAuthenticated()) {
    return true;
  }

  this.router.navigate(['/login']);
  return false;
}


}
