import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cuotas, Envio, MetodoPago } from 'src/app/models/dropdown';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [MessageService]
})
export class CarritoComponent implements OnInit {

  carro: ProductInterface[] = [];
  precioP: number;
  precioTotal: number;

  envios: Envio[];
  selectedEnvio: Envio;
  cuotas: Cuotas[];
  selectedCuota: Cuotas;
  pagos: MetodoPago[];
  selectedPago: MetodoPago;

  constructor(private productService: ProductService, private messageService: MessageService) {
    this.envios = [
      { opcion: 'Email' },
      { opcion: 'Mensaje de Texto' },
      { opcion: 'WhatsApp' },
      { opcion: 'Tarjeta Fisica', codigo: 'TF' },
      { opcion: 'Otro' }
    ];
    this.pagos = [
      { opcion: 'Efectivo/Transferencia'},
      { opcion: 'Visa'},
      { opcion: 'Mastercard' },
      { opcion: 'Mercado Pago' },
      { opcion: 'Otro' }
    ];
    this.cuotas = [
      { opcion: 1 },
      { opcion: 3 },
      { opcion: 6 },
      { opcion: 9 },
      { opcion: 12 }
    ];
  }

  ngOnInit() {
    this.getCarrito()

  }

  getCarrito() {
    this.productService.getCarroS().subscribe(product => {
      this.carro = product;
      this.precio()
    });
  }

  eliminarProduct(id: string) {
    this.productService.deleteCarroS(id).then(() => {
      this.messageService.add({ severity: 'error', summary: 'Listo', detail: 'Producto eliminado del Carrito' });
    });
  }

  sum(nombre: string) {
    this.carro.forEach((productos) => {
      if (productos.nombre === nombre) {
        console.log("Se aumento la cantidad de " + nombre);
        productos.cantidad += 1;
      };
    });
    return this.precioP;
  }

  res(nombre: string, id: string) {
    this.carro.forEach((productos) => {
      if (productos.nombre === nombre) {
        console.log("Se resto la cantidad de " + nombre);
        if (productos.cantidad <= 1) {
          this.eliminarProduct(id);
        } else {
          productos.cantidad -= 1;
        }
      }
    });
  }

  precio(): void {
    this.precioP = 0;
    this.precioTotal = 0;
    if (this.carro) {
      this.carro.map(p => {
        this.precioP += p.precio;
        this.precioTotal += p.precio * p.cantidad;
      })
    }
  }
}
