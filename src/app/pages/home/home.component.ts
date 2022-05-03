import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public productosCollection: ProductInterface[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.productService.getProductos().subscribe((productos) => {
    //   console.log(productos)
    //   this.productosCollection = productos
    // });
  }
}