import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  suscrip!: ProductInterface[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getSuscriptions().then(data => this.suscrip = data);
  }

}
