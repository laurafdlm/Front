import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para manejar formularios
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service'; // Servicio para interactuar con el backend

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  amount: number = 3; // Monto fijo para el pago (3 euros)
  paymentMethodId: string = ''; // ID del método de pago proporcionado por Stripe
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private userService: UserService) {}

  processPayment() {
    if (!this.paymentMethodId) {
      this.message = 'Por favor, proporciona un método de pago válido.';
      this.isSuccess = false;
      return;
    }

    this.userService.processPayment(this.amount, this.paymentMethodId).subscribe(
      (response) => {
        console.log('Pago exitoso:', response);
        this.message = 'Pago realizado con éxito.';
        this.isSuccess = true;
      },
      (error) => {
        console.error('Error en el pago:', error);
        this.message = 'Hubo un problema al procesar el pago. Inténtalo nuevamente.';
        this.isSuccess = false;
      }
    );
  }
}
