import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  software!: ProductInterface[];

  formProducto: FormGroup;

  public header: string = 'Agregar un nuevo producto';
  edit: Boolean = false;
  public itemSelected: ProductInterface

  displayMaximizable: boolean;
  public autoResize = true

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
    this.productService.getSoftwareS().subscribe((productos) => {
      this.software = productos
    });
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  guardarSoftware() {
    if (this.edit == false) {
      if (!this.formProducto.invalid) {
        this.productService.agregarSoftwareS(this.formProducto.value).then(() => {
          this.displayMaximizable = false;
          alert('Producto Agregado Correctamente');
        });
      } else {
        alert('Hay campos incompletos');
      }
      this.formProducto.reset();
    } else {
      this.productService.updateSoftwareS(this.itemSelected.id, this.formProducto.value);
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

  updateSoftware(softwareSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = softwareSelected;
    this.header = 'Editar Producto';
    this.formProducto.setValue({
      nombre: softwareSelected.nombre,
      precio: softwareSelected.precio,
      url: softwareSelected.url,
      plataforma: softwareSelected.plataforma,
      status: softwareSelected.status,
      descripcion: softwareSelected.descripcion
    });
    this.showMaximizableDialog()
  }

  deleteSoftware(id: string) {
    this.productService.deleteSoftwareS(id).then(() => {
      alert('Producto eliminado')
    });
  }
}