import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-e-books',
  templateUrl: './e-books.component.html',
  styleUrls: ['./e-books.component.css']
})
export class EBooksComponent implements OnInit {

  books!: ProductInterface[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getSuscriptions().then(data => this.books = data);
  }

}