import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  suscrip: ProductInterface[];

  formProducto: FormGroup;
  header: string = 'Agregar un nuevo producto';
  edit: Boolean = false;
  itemSelected: ProductInterface
  displayMaximizable: boolean;
  autoResize = true

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      url: ['', Validators.required],
      plataforma: ['', Validators.required],
      status: ['En Stock'],
      descripcion: [''],
    })
  }

  ngOnInit() {
    this.productService.getSuscripcioneS().subscribe((producto) => {
      this.suscrip = producto
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  guardarSuscripcion() {
    if (this.edit == false) {
      if (!this.formProducto.invalid) {
        this.productService.agregarSuscripcioneS(this.formProducto.value).then(() => {
          this.displayMaximizable = false;
          alert('Producto Agregado Correctamente');
        });
      } else {
        alert('Hay campos incompletos');
      }
      this.formProducto.reset();
    } else {
      this.productService.updateSuscripcioneS(this.itemSelected.id, this.formProducto.value);
      this.displayMaximizable = false;
      this.edit = false;
      this.formProducto.reset();
      this.header = 'Agregar un nuevo producto';
      alert('Producto editado');
    }
  }

  dialogCancel() {
    this.edit = false;
    this.formProducto.reset();
    this.header = 'Agregar un nuevo producto';
    this.displayMaximizable = false;
  }

  updateSuscripcion(suscripSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = suscripSelected;
    this.header = 'Editar Producto';
    this.formProducto.setValue({
      nombre: suscripSelected.nombre,
      precio: suscripSelected.precio,
      url: suscripSelected.url,
      plataforma: suscripSelected.plataforma,
      status: suscripSelected.status,
      descripcion: suscripSelected.descripcion
    });
    this.showMaximizableDialog()
  }

  deleteSuscripcion(id: string) {
    this.productService.deleteSuscripcioneS(id).then(() => {
      alert('Producto eliminado')
    });
  }
}