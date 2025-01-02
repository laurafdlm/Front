import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  amount: number = 3; // Monto fijo en euros
  stripe: Stripe | null = null; // Objeto Stripe
  cardElement: any; // Elemento de tarjeta
  email: string = ''; // Email dinámico del usuario
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // Cargar el perfil del usuario
    this.userService.getProfile().subscribe(
      (profile) => {
        this.email = profile.email; // Almacenar email del usuario
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
        this.message = 'No se pudo cargar la información del usuario.';
      }
    );

    // Cargar Stripe.js
    this.stripe = await loadStripe('pk_test_51QbLhWHtZ5AX085GrzNfPuTFh9ESuF64aISYzDv85sM1HkbJ4EOxdbpKN8PZf5DmtZaLbzjE5CO4lv8tMqttg0bj00LsF6m0Xk'); // Usa tu clave pública de prueba

    if (this.stripe) {
      const elements = this.stripe.elements();

      // Crear el elemento de tarjeta con estilo
      this.cardElement = elements.create('card', {
        style: {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        },
        hidePostalCode: false, // Mostrar el código postal si es necesario
      });

      this.cardElement.mount('#card-element');
    }
  }

  async processPayment() {
    if (!this.stripe || !this.cardElement) {
      console.error('Stripe o el elemento de tarjeta no están inicializados.');
      this.message = 'No se pudo inicializar el pago. Inténtalo nuevamente más tarde.';
      this.isSuccess = false;
      return;
    }

    // Crear método de pago con los detalles de la tarjeta
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
      billing_details: {
        email: this.email, // Asegúrate de que el email esté configurado
      },
    });

    if (error) {
      console.error('Error al crear el método de pago:', error);
      this.message = 'Hubo un problema con tu tarjeta.';
      this.isSuccess = false;
      return;
    }

    // Llamar al backend para crear un PaymentIntent
    this.userService.processPayment(this.amount * 100, paymentMethod!.id, this.email).subscribe(
      (response: any) => {
        if (!response || !response.clientSecret) {
          console.error('Respuesta inválida del backend:', response);
          this.message = 'Hubo un problema al procesar el pago.';
          this.isSuccess = false;
          return;
        }
    
        const clientSecret = response.clientSecret;
    
        // Confirmar el pago en el frontend
        this.stripe!.confirmCardPayment(clientSecret).then((result: any) => {
          if (result.error) {
            console.error('Error al confirmar el pago:', result.error);
            this.message = 'Error al procesar el pago. Inténtalo nuevamente.';
            this.isSuccess = false;
          } else {
            console.log('Pago exitoso:', result.paymentIntent);
            this.message = 'Pago realizado con éxito. ¡Gracias por tu compra!';
            this.isSuccess = true;
          }
        });
      },
      (error: any) => {
        console.error('Error en el backend:', error);
        this.message = 'Hubo un problema al procesar el pago. Inténtalo nuevamente.';
        this.isSuccess = false;
      }
    );
    
    
  }
}