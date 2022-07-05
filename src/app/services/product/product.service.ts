import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../../models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlImg: string = '';

  carroCollection: AngularFirestoreCollection<ProductInterface>;
  juegoCollection: AngularFirestoreCollection<ProductInterface>;
  softwareCollection: AngularFirestoreCollection<ProductInterface>;
  gifcardCollection: AngularFirestoreCollection<ProductInterface>;
  suscripCollection: AngularFirestoreCollection<ProductInterface>;

  constructor(private db: AngularFirestore, private http: HttpClient, private storage: AngularFireStorage) {
    this.carroCollection = this.db.collection<ProductInterface>('Carro de Compras');
    this.juegoCollection = this.db.collection<ProductInterface>('Juegos');
    this.softwareCollection = this.db.collection<ProductInterface>('Software');
    this.gifcardCollection = this.db.collection<ProductInterface>('Gift Card');
    this.suscripCollection = this.db.collection<ProductInterface>('Suscripciones');
  }

  // PRODUCTOS DEL CARROUSEL EN EL HOMECOMPONENT ----------------------------------------------------
  async getProducts() {
    const res = await this.http!.get<any>('assets/productos.json')
      .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }
  //-----------------------------------------------------------------------------
  // PRODUCTOS DE OFERTAS EN EL OFERTASCOMPONENT -------------------------------------------------------
  async getOfertas() {
    const res = await this.http!.get<any>('assets/ofertas.json')
      .toPromise();
    const data = <ProductInterface[]>res.data;
    return data;
  }

  // ------------------------------------------------------------ BASE DE DATOS FIRESTORE -------------------------------------------------------------
  // -------------------------------- CARRO DE COMPRAS --------------------------
  getCarroS() {
    return this.carroCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarCarroS(product: ProductInterface) {
    return new Promise(async (resolve, reject) => {
      try {
        const idFire = this.db.createId();
        product.id = idFire;

        const result = await this.carroCollection.doc(idFire).set(product);
        resolve(result)

      } catch (error) {
        reject(console.log(error))
      }
    })
  }

  deleteCarroS(idFire: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.carroCollection.doc(idFire).delete();
        resolve(result);
      } catch (error) {
        reject(console.log(error))
      }
    })
  }
   // ---------------------------------------------------------------------------
  // -------------------------------- CATEGORIAS --------------------------------
  // JUEGOS ---------------------------------------------------------------------
  getJuegoS() {
    //TRAE LOS PRODUCTOS
    return this.juegoCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarJuegoS(data: ProductInterface) {
    //SE AGREGA EL PRODUCTO A FIRESTORE CON ID GENERADO
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
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LE AGREGAN LOS DATOS ACTUALIZADOS
    return this.db.collection('Juegos').doc(idFire).update(data);
  }

  deleteJuegoS(idFire: string): Promise<any> {
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LO ELIMINA DE LA BASE DE DATOS
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
    //TRAE LOS PRODUCTOS
    return this.softwareCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarSoftwareS(data: ProductInterface) {
    //SE AGREGA EL PRODUCTO A FIRESTORE CON ID GENERADO
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
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LE AGREGAN LOS DATOS ACTUALIZADOS
    return this.db.collection('Software').doc(idFire).update(data);
  }

  deleteSoftwareS(idFire: string): Promise<any> {
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LO ELIMINA DE LA BASE DE DATOS
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
    //TRAE LOS PRODUCTOS
    return this.gifcardCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarGiftCardS(data: ProductInterface) {
    //SE AGREGA EL PRODUCTO A FIRESTORE CON ID GENERADO
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
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LE AGREGAN LOS DATOS ACTUALIZADOS
    return this.db.collection('Gift Card').doc(idFire).update(data);
  }

  deleteGiftCardS(idFire: string): Promise<any> {
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LO ELIMINA DE LA BASE DE DATOS
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
    //TRAE LOS PRODUCTOS
    return this.suscripCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ProductInterface))
    );
  }

  agregarSuscripcioneS(data: ProductInterface) {
    //SE AGREGA EL PRODUCTO A FIRESTORE CON ID GENERADO
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
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LE AGREGAN LOS DATOS ACTUALIZADOS
    return this.db.collection('Suscripciones').doc(idFire).update(data);
  }

  deleteSuscripcioneS(idFire: string): Promise<any> {
    // BUSCA EL DOCUMENTO EN FIRESTORE POR SU ID Y SE LO ELIMINA DE LA BASE DE DATOS
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

  //-------------------------------------------------------------------- ClOUD STORAGE -------------------------------------------------------------
  subirImagen(file: File, product: ProductInterface, categoria: string, imgpath: string, idProduct?: string) {
    //DEF DE RUTA EN STORAGE
    const imagePath = imgpath;
    // REFERENCIA A LA IMAGEN EN STORAGE
    const imageRef = this.storage.ref(imagePath);
    //SUBIMOS LA IMAGEN A STORAGE
    const uploadImg = this.storage.upload(imagePath, file)

    uploadImg.snapshotChanges().pipe(finalize(() => {
      imageRef.getDownloadURL().subscribe((url => {
        this.urlImg = url;
        product.urlname = file.name;
        //Agregar la url al producto
        product.url = this.urlImg;

        if (idProduct != undefined) {
          switch (categoria) {
            case "juegos":
              this.updateJuegoS(idProduct, product);
              break;
            case "software":
              this.updateSoftwareS(idProduct, product);
              break;
            case "giftCard":
              this.updateGiftCardS(idProduct, product);
              break;
            case "suscrip":
              this.updateSuscripcioneS(idProduct, product);
              break;
            default:
              console.log("no se envio ninguna categoria");
              break;
          }
        } else {
          switch (categoria) {
            case "juegos":
              this.agregarJuegoS(product);
              break;
            case "software":
              this.agregarSoftwareS(product);
              break;
            case "giftCard":
              this.agregarGiftCardS(product);
              break;
            case "suscrip":
              this.agregarSuscripcioneS(product);
              break;
            default:
              console.log("no se envio ninguna categoria");
              break;
          }
        }
      }))
    })).subscribe()
  }
}