import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {

  giftCard!: ProductInterface[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getGiftCards().then(data => this.giftCard = data);
  }

}