import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],
  providers: [ConfirmationService, MessageService,],
})
export class JuegosComponent implements OnInit {

  logged: boolean = false;

  public juegos: ProductInterface[] = [];
  public formProducto: FormGroup;

  public header: string = 'Agregar un nuevo juego';
  public edit: boolean = false;
  private itemSelected: ProductInterface;

  public loading: boolean;
  public displayMaximizable: boolean;
  public autoResize = true;

  public file?: File;
  private imagePath: string;
  private categoria: string = "juegos"

  constructor(private fb: FormBuilder, private productService: ProductService, private messageService: MessageService, private authService: AuthService) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      url: ['', Validators.required],
      urlname: [],
      plataforma: ['', Validators.required],
      status: ['En Stock'],
      descripcion: [''],
    });
  }

  ngOnInit() {
    if (this.authService.userLogged) {
      this.logged = true;
    }
    this.loading = true;
    setTimeout(() => {
      this.productService.getJuegoS().subscribe((productos) => {
        this.juegos = productos;
        this.loading = false;
      });
    }, 1500);
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  obtenerFile(event: any) {
    this.file = event.currentFiles[0];
    this.imagePath = `imagenes/categorias/juegos/${this.file!.name}`;
  }

  guardarJuego() {
    if (!this.formProducto.invalid) {
      // SI NO SE VA A EDITAR UN PRODUCTO -----------------------------
      if (this.edit == false) {
        // SE AGREGAR EL PRODUCTO Y SE RESETEAN VALORES
        this.productService.subirImagen(this.file!, this.formProducto.value, this.categoria, this.imagePath);
        this.displayMaximizable = false;
        this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Juego agregado correctamente' });
        this.formProducto.reset();
        this.file = undefined;
      } // SI SE VA A EDITAR UN PRODUCTO -----------------------------
      else {
        if (this.file == undefined) {
          //SI NO SE CAMBIA LA IMAGEN DEL PRODUCTO HACE ESTO ---------
          this.productService.updateJuegoS(this.itemSelected.id, this.formProducto.value);
          this.displayMaximizable = false;
          this.edit = false;
          this.header = 'Agregar un nuevo juego';
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Juego actualizado correctamente' });
          this.formProducto.reset();
        } else {
          //SI SE CAMBIA LA IMAGEN DEL PRODUCTO HACE ESTO --------
          this.productService.subirImagen(this.file!, this.formProducto.value, this.categoria, this.itemSelected.id);
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Juego actualizado correctamente' });
          this.displayMaximizable = false;
          this.edit = false;
          this.header = 'Agregar un nuevo juego';
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
    this.header = 'Agregar un nuevo juego';
    this.displayMaximizable = false;
    this.file = undefined;
  }

  updateJuego(juegoSelected: ProductInterface) {
    this.edit = true;
    this.itemSelected = juegoSelected;
    this.header = 'Editar Juego';
    const { nombre, precio, url, urlname, plataforma, descripcion, status } = juegoSelected;

    this.formProducto.setValue({
      nombre, precio, url, urlname, plataforma, descripcion, status
    });
    this.showMaximizableDialog();
  }

  deleteJuego(id: string, nombre: string) {
    this.productService.deleteJuegoS(id).then(() => {
      this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: `Se ha eliminado un juego (${nombre})`, life: 4500 });
    });

    // this.confirmationService.confirm({
    //   message: '¿Esta seguro que quiere eliminar ' + nombre + '?',
    //   header: 'Eliminar',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.productService.deleteJuegoS(id).then(() => {
    //       this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: `Se ha eliminado un juego (${nombre})`, life: 4500 });
    //     });
    //   }
    // });
  }
}