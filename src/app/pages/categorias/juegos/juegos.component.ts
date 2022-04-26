import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  juegos!: ProductInterface[];

  constructor(private productService: ProductService) { }

  ngOnInit(){
    this.productService.getJuegos().then(data => this.juegos = data);
  }

}
