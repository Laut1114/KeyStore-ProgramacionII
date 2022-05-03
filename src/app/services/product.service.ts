import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //productCollection: AngularFirestoreCollection<ProductInterface>;
  juegoCollection: AngularFirestoreCollection<ProductInterface>;
  softwareCollection: AngularFirestoreCollection<ProductInterface>;
  gifcardCollection: AngularFirestoreCollection<ProductInterface>;
  suscripCollection: AngularFirestoreCollection<ProductInterface>;


  constructor(private db: AngularFirestore, private http: HttpClient) { 
    //this.productCollection = this.db.collection<ProductInterface>('Productos');
    this.juegoCollection = this.db.collection<ProductInterface>('Juegos');
    this.softwareCollection = this.db.collection<ProductInterface>('Software');
    this.gifcardCollection = this.db.collection<ProductInterface>('Gift Card');
    this.suscripCollection = this.db.collection<ProductInterface>('Suscripciones');
  }

  // BASE DE DATOS FIRESTORE

  // JUEGOS ---------------------------------------------------------------------
  getJuegoS() {
    return this.juegoCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarJuegoS(data: ProductInterface) {
    return new Promise(async (resolve, reject) => {
      try {
        const idFire = this.db.createId();
        data.id = idFire;

        const result = await this.juegoCollection.doc(idFire).set(data);
        resolve(result);

      } catch (error) {
        reject(error);
      }
    });
  }

  updateJuegoS(idFire: string, data: any) {
    return this.db.collection('Juegos').doc(idFire).update(data);
  }

  deleteJuegoS(idFire: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.juegoCollection.doc(idFire).delete();
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  // ----------------------------------------------------------------------------
  // // SOFTWARE  ---------------------------------------------------------------
  getSoftwareS() {
    return this.softwareCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }
  
  agregarSoftwareS(data: ProductInterface) {
    return new Promise(async (resolve, reject) => {
      try {
        const idFire = this.db.createId();
        data.id = idFire;

        const result = await this.softwareCollection.doc(idFire).set(data);
        resolve(result);

      } catch (error) {
        reject(error);
      }
    });
  }

  updateSoftwareS(idFire: string, data: any) {
    return this.db.collection('Software').doc(idFire).update(data);
  }

  deleteSoftwareS(idFire: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.softwareCollection.doc(idFire).delete();
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
  // // -------------------------------------------------------------------------
  // // GIFT CARDS --------------------------------------------------------------
  getGiftCardS() {
    return this.gifcardCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarGiftCardS(data: ProductInterface) {
    return new Promise(async (resolve, reject) => {
      try {
        const idFire = this.db.createId();
        data.id = idFire;

        const result = await this.gifcardCollection.doc(idFire).set(data);
        resolve(result);

      } catch (error) {
        reject(error);
      }
    });
  }

  updateGiftCardS(idFire: string, data: any) {
    return this.db.collection('Gift Card').doc(idFire).update(data);
  }

  deleteGiftCardS(idFire: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.gifcardCollection.doc(idFire).delete();
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
  // //--------------------------------------------------------------------------
  // // SUSCRIPCIONES -----------------------------------------------------------
  getSuscripcioneS() {
    return this.suscripCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarSuscripcioneS(data: ProductInterface) {
    return new Promise(async (resolve, reject) => {
      try {
        const idFire = this.db.createId();
        data.id = idFire;

        const result = await this.suscripCollection.doc(idFire).set(data);
        resolve(result);

      } catch (error) {
        reject(error);
      }
    });
  }

  updateSuscripcioneS(idFire: string, data: any) {
    return this.db.collection('Suscripciones').doc(idFire).update(data);
  }

  deleteSuscripcioneS(idFire: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.suscripCollection.doc(idFire).delete();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  //-----------------------------------------------------------------------------
  // PRODUCTOS DEL CARROUSEL ----------------------------------------------------
  async getProducts() {
    const res = await this.http!.get<any>('assets/productos.json')
      .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }
  //-----------------------------------------------------------------------------
  // PRODUCTOS DE OFERTAS -------------------------------------------------------
  async getOfertas() {
    const res = await this.http!.get<any>('assets/ofertas.json')
    .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }
}
