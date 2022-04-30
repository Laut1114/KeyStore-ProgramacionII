import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-carrousel-home',
  templateUrl: './carrousel-home.component.html',
  styleUrls: ['./carrousel-home.component.css']
})
export class CarrouselHomeComponent implements OnInit {

  productos!: ProductInterface[];

  constructor(private productService: ProductService) {}

  ngOnInit(){
    this.productService.getProducts().then(products => {
      this.productos = products;
    });
  }
} 