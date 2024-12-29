import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  amount: number = 3; // Monto fijo en euros
  stripe: any; // Objeto Stripe
  cardElement: any; // Elemento de tarjeta
  email: string = ''; // Email dinámico del usuario
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // Cargar el perfil del usuario
    this.userService.getProfile().subscribe(
      (profile) => {
        this.email = profile.email; // Almacenar email
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
        this.message = 'No se pudo cargar la información del usuario.';
      }
    );

    // Cargar Stripe.js
    this.stripe = await loadStripe('https://buy.stripe.com/test_9AQ3er7lm8Na5ag4gg'); // Reemplaza con tu clave pública de Stripe
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async processPayment() {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('Error al crear el método de pago:', error);
      this.message = 'Hubo un problema con tu tarjeta.';
      this.isSuccess = false;
      return;
    }

    // Llamar al backend con el PaymentMethodId generado
    this.userService.processPayment(this.amount, paymentMethod.id, this.email).subscribe(
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
