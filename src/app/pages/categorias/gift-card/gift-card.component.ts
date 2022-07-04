import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductInterface } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css'],
  providers: [MessageService],
})
export class GiftCardComponent implements OnInit {

  logged: boolean = false;

  public giftCard: ProductInterface[];
  public formProducto: FormGroup;

  public header: string = 'Agregar un nuevo producto';
  public edit: Boolean = false;
  private itemSelected: ProductInterface;

  public loading: boolean;
  public displayMaximizable: boolean;
  public autoResize = true;

  public file?: File;
  private imagePath: string;
  private categoria = "giftCard";

  constructor(private fb: FormBuilder, private productService: ProductService, private messageService: MessageService, private authService: AuthService,) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      url: ['', Validators.required],
      urlname: [],
      plataforma: ['', Validators.required],
      status: ['En Stock'],
      descripcion: [''],
    })
  }
  
  ngOnInit() {
    if (this.authService.userLogged) {
      this.logged = true;
    }
    // "carga de tabla"
    this.loading = true;
    setTimeout(() => {
      this.getProducts();
    }, 1500);
  }

  getProducts() {
    this.productService.getGiftCardS().subscribe((producto) => {
      this.giftCard = producto;
      this.loading = false;
    })
  }

  addCart(productSelected: ProductInterface) {
    this.productService.agregarCarroS(productSelected)
    this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Producto agregado al Carrito' });
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  obtenerFile(event: any) {
    this.file = event.currentFiles[0];
    //PATH PARA GUARDARLO EN STORAGE
    this.imagePath = `imagenes/categorias/gift_card/${this.file!.name}`;
  }

  guardarGiftCard() {
    if (!this.formProducto.invalid) {
      // SI NO SE VA A EDITAR UN PRODUCTO -----------------------------
      if (this.edit == false) {
        // SE AGREGAR EL PRODUCTO Y SE RESETEAN VALORES
        this.productService.subirImagen(this.file!, this.formProducto.value, this.categoria, this.imagePath);
        this.displayMaximizable = false;
        this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Producto agregado correctamente' });
        this.formProducto.reset();
        this.file = undefined;
      } // SI SE VA A EDITAR UN PRODUCTO -----------------------------
      else {
        if (this.file == undefined) {
          //SI NO SE CAMBIA LA IMAGEN DEL PRODUCTO HACE ESTO ---------
          this.productService.updateGiftCardS(this.itemSelected.id, this.formProducto.value);
          this.displayMaximizable = false;
          this.edit = false;
          this.header = 'Agregar un nuevo producto';
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Producto actualizado correctamente' });
          this.formProducto.reset();
        } else {
          //SI SE CAMBIA LA IMAGEN DEL PRODUCTO HACE ESTO --------
          this.productService.subirImagen(this.file!, this.formProducto.value, this.categoria, this.imagePath, this.itemSelected.id);
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Producto actualizado correctamente' });
          this.displayMaximizable = false;
          this.edit = false;
          this.header = 'Agregar un nuevo producto';
          this.file = undefined;
          this.formProducto.reset();
        }
      }
    } else {
      //SI EL FORMULARIO ESTA INCOMPLETO, MUESTRA ESTE TOAST
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hay campos incompletos, por favor ingrese todos los datos', life: 3500 });
    }
  }

  dialogCancel() {
    this.edit = false;
    this.formProducto.reset();
    this.header = 'Agregar un nuevo producto';
    this.displayMaximizable = false;
    this.file = undefined;
  }

  updateGiftCard(giftcardSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = giftcardSelected;
    this.header = 'Editar Producto';
    const { nombre, precio, url, urlname, plataforma, descripcion, status } = giftcardSelected;
    this.formProducto.setValue({ nombre, precio, url, urlname, plataforma, descripcion, status });
    this.showMaximizableDialog()
  }

  deleteGiftcard(id: string, nombre: string) {
    this.productService.deleteGiftCardS(id).then(() => {
      this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: `Se ha eliminado un producto (${nombre})`, life: 4500 });
    });
  }
}