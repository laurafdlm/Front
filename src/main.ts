import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { Register1Component } from './app/register1/register1.component';
import { ProtectedComponent } from './app/protected/protected.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'register', component: Register1Component },
      { path: 'protected', component: ProtectedComponent },
    ]),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
