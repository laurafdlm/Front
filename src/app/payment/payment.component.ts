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
  isLoading: boolean = false; // Indicador de carga

  constructor(private userService: UserService) {}

  async ngOnInit() {
    try {
      // Cargar perfil del usuario
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
      this.stripe = await loadStripe('pk_test_51QbLhWHtZ5AX085GrzNfPuTFh9ESuF64aISYzDv85sM1HkbJ4EOxdbpKN8PZf5DmtZaLbzjE5CO4lv8tMqttg0bj00LsF6m0Xk'); // Clave pública de prueba

      if (this.stripe) {
        const elements = this.stripe.elements();
        // Crear el elemento de tarjeta
        this.cardElement = elements.create('card', {
          style: {
            base: {
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '16px',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
            },
          },
          hidePostalCode: false,
        });

        this.cardElement.mount('#card-element');
      }
    } catch (error) {
      console.error('Error al inicializar Stripe:', error);
      this.message = 'Error al inicializar Stripe.';
    }
  }

  async processPayment() {
    if (!this.stripe || !this.cardElement) {
        this.message = 'No se pudo inicializar el pago. Inténtalo nuevamente más tarde.';
        this.isSuccess = false;
        return;
    }

    this.isLoading = true;

    try {
        // Crear método de pago en Stripe
        const { paymentMethod, error } = await this.stripe.createPaymentMethod({
            type: 'card',
            card: this.cardElement,
            billing_details: { email: this.email },
        });

        if (error) {
            this.message = 'Hubo un problema con tu tarjeta.';
            this.isLoading = false;
            return;
        }

        // Enviar datos al backend
        this.userService.processPayment(this.amount * 100, paymentMethod!.id, this.email).subscribe({
            next: (response: any) => {
                // Confirmar el pago en Stripe
                this.stripe!.confirmCardPayment(response.clientSecret).then((result) => {
                    if (result.error) {
                        this.message = `Error al confirmar el pago: ${result.error.message}`;
                        this.isSuccess = false;
                    } else if (result.paymentIntent?.status === 'succeeded') {
                        this.message = 'Pago realizado con éxito. Ahora eres usuario premium.';
                        this.isSuccess = true;
                    } else {
                        this.message = 'El pago no pudo completarse. Intenta nuevamente.';
                        this.isSuccess = false;
                    }
                    this.isLoading = false;
                });
            },
            error: () => {
                this.message = 'Hubo un problema al procesar el pago. Intenta nuevamente.';
                this.isLoading = false;
            },
        });
    } catch (error) {
        this.message = 'Error inesperado al procesar el pago.';
        this.isLoading = false;
    }
}

  
}
