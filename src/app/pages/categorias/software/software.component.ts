import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  software!: ProductInterface[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getSoftware().then(data => this.software = data);
  }

}