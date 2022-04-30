import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-proceso-compra',
  templateUrl: './proceso-compra.component.html',
  styleUrls: ['./proceso-compra.component.css']
})
export class ProcesoCompraComponent implements OnInit {

  steps!: any[];

  constructor() { }

  ngOnInit(){
    this.steps = [
      {
        status: "Ordenado",
        icon: PrimeIcons.SHOPPING_CART,
        color: "#1e88e5",
        text: "Agregas el producto al carrito, ingresas el metodo de pago y le das al boton de comprar"
      },
      {
        status: "Procesando",
        icon: PrimeIcons.SPINNER,
        color: "#F4D03F",
        text: "Esperas mientras se procesa el pago"
      },
      {
        status: "Comprado",
        icon: PrimeIcons.CHECK,
        color: "#27AE60",
        text: "Unas ves procesado y completado el pago, se mostrara un recibo de compra"
      },
      {
        status: "Entregado",
        icon: PrimeIcons.ENVELOPE,
        color: "#607D8B",
        text: "Se te enviara un email con tu key del producto, activalo en la plataforma a la que corresponda y listo"
      }
    ];
  }

}
