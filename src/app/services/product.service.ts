import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  async getProducts() {
    const res = await this.http!.get<any>('assets/productos.json')
      .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }

  async getJuegos() {
    const res = await this.http!.get<any>('assets/juegos.json')
    .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }

  async getSoftware() {
    const res = await this.http!.get<any>('assets/software.json')
    .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }

  async getGiftCards() {
    const res = await this.http!.get<any>('assets/gift-card.json')
    .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }

  async getSuscriptions() {
    const res = await this.http!.get<any>('assets/suscripciones.json')
    .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }

  async getOfertas() {
    const res = await this.http!.get<any>('assets/ofertas.json')
    .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }
}
