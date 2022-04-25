import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product';

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
}
