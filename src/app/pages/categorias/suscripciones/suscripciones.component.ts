import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductInterface } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css'],
  providers: [MessageService],
})
export class SuscripcionesComponent implements OnInit {

  logged: boolean = false;
  userAdmin: boolean;

  public suscrip: ProductInterface[];
  public formProducto: FormGroup;

  public header: string = 'Agregar un nuevo producto';
  public edit: Boolean = false;
  private itemSelected: ProductInterface;

  public loading: boolean;
  public displayMaximizable: boolean;
  public autoResize = true

  public file?: File;
  private imagePath: string;
  private categoria: string = "suscrip";

  constructor(private fb: FormBuilder, private productService: ProductService, private messageService: MessageService, private authService: AuthService) {
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
    if (this.authService.userLogged()) {
      this.logged = true;
      const userUid = JSON.parse(localStorage.getItem("user")!);
      this.authService.getUser(userUid.uid).subscribe(user =>{
        console.log(user.admin)
        this.userAdmin = user.admin;
      });
    }
    this.loading = true;
    setTimeout(() => {
      this.productService.getSuscripcioneS().subscribe((producto) => {
        this.suscrip = producto;
        this.loading = false;
      })
    }, 1500);
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
    this.imagePath = `imagenes/categorias/suscripciones/${this.file!.name}`;
  }

  guardarSuscripcion() {
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
          this.productService.updateSuscripcioneS(this.itemSelected.id, this.formProducto.value);
          this.displayMaximizable = false;
          this.edit = false;
          this.header = 'Agregar un nuevo producto';
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Producto actualizado correctamente' });
          this.formProducto.reset();
        } else {
          //SI SE CAMBIA LA IMAGEN DEL PRODUCTO HACE ESTO --------
          this.productService.subirImagen(this.file!, this.formProducto.value, this.categoria, this.imagePath ,this.itemSelected.id);
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

  updateSuscripcion(suscripSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = suscripSelected;
    this.header = 'Editar Producto';
    const { nombre, precio, url, urlname, plataforma, descripcion, status } = suscripSelected;
    this.formProducto.setValue({ nombre, precio, url, urlname, plataforma, descripcion, status });
    this.showMaximizableDialog()
  }

  deleteSuscripcion(id: string, nombre: string) {
    this.productService.deleteSuscripcioneS(id).then(() => {
      this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: `Se ha eliminado un producto (${nombre})`, life: 4500 });
    });
  }
}