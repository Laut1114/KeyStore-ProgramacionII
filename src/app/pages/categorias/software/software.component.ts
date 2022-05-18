import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css'],
  providers: [MessageService],
})
export class SoftwareComponent implements OnInit {

  public software: ProductInterface[];
  public formProducto: FormGroup;

  public header: string = 'Agregar un nuevo producto';
  public edit: Boolean = false;
  private itemSelected: ProductInterface;

  public displayMaximizable: boolean;
  public autoResize = true;

  public file?: File;
  private imagePath: string;
  private categoria: string = "software";

  constructor(private fb: FormBuilder, private productService: ProductService, private messageService: MessageService) {
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
    this.productService.getSoftwareS().subscribe((productos) => {
      this.software = productos
    });
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  obtenerFile(event: any) {
    this.file = event.currentFiles[0];
    this.imagePath = `imagenes/categorias/software/${this.file!.name}`;
  }

  guardarSoftware() {
    if (!this.formProducto.invalid) {
      if (this.edit == false) {
        this.productService.subirImagen(this.file!, this.formProducto.value, this.categoria, this.imagePath);
        this.displayMaximizable = false;
        this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Producto agregado correctamente' });
        this.formProducto.reset();
        this.file = undefined;
      } else {
        if (this.file == undefined) {
          //SI NO SE CAMBIA LA IMAGEN DEL PRODUCTO HACE ESTO ---------
          this.productService.updateSoftwareS(this.itemSelected.id, this.formProducto.value);
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

  updateSoftware(softwareSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = softwareSelected;
    this.header = 'Editar Producto';
    const { nombre, precio, url, urlname, plataforma, descripcion, status } = softwareSelected;
    this.formProducto.setValue({ nombre, precio, url, urlname, plataforma, descripcion, status });
    this.showMaximizableDialog();
  }

  deleteSoftware(id: string, nombre: string) {
    this.productService.deleteSoftwareS(id).then(() => {
      this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: `Se ha eliminado un producto (${nombre})`, life: 4500 });
    });
  }
}