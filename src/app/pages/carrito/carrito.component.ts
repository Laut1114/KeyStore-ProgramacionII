import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [MessageService]
})
export class CarritoComponent implements OnInit {

  

  @Input() carro: ProductInterface[] = [];
  cantProducto: number;
  precioProduct: number;
  precioTotal: number;

  constructor(private productService: ProductService) {
    this.productService.carro.subscribe(producto => {
      alert("cart-list-ngOnInit");
      let index = -1;
      index = this.carro.findIndex(
        p => p.id == producto.id
      );
      if (index != -1) {
        this.carro[index].cantidad += 1;
      } else if (index == -1) {
        this.carro.push(producto);
      }
      this.sum();
      console.log(producto + "aca esta el producto")
    });
  }

  ngOnInit() {

  }

  eliminarProduct(id: string) {
    let index = this.carro.findIndex(item => item.id === id);
    this.carro.splice(index, 1);
    this.sum();
  }

  sum(): void {
    this.cantProducto = 0;
    this.precioProduct = 0;
    this.precioTotal = 0;
    if (this.carro) {
      this.cantProducto += this.cantProducto;
      this.carro.map(product => {
        this.precioProduct += product.precio;
        this.precioTotal += product.precio * this.cantProducto
        // this.precioProduct += this.carro.findIndex(precioP => precioP.precio);
        // this.precioTotal += product.product_price * product.product_quanity;

      });
    }
  }
}
