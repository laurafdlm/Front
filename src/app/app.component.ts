import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register1Component } from "./register1/register1.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Register1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sslfe';
}
