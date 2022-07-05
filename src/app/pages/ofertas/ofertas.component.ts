import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  
  ofertas!: ProductInterface[];

  constructor(private productService: ProductService) { }

  ngOnInit(){
    this.productService.getOfertas().then(data => this.ofertas = data);
  }
}