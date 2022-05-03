import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  juegos: ProductInterface[] = [];
  formProducto: FormGroup;

  public header: string = 'Agregar un nuevo juego';
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
    this.productService.getJuegoS().subscribe((productos) => {
      this.juegos = productos
    });
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  guardarJuego() {
    if (this.edit == false) {
      if (!this.formProducto.invalid) {
        this.productService.agregarJuegoS(this.formProducto.value).then(() => {
          this.displayMaximizable = false;
          alert('Producto Agregado Correctamente');
        });
      } else {
        alert('Hay campos incompletos');
      }
      this.formProducto.reset();
    } else {
      this.productService.updateJuegoS(this.itemSelected.id, this.formProducto.value);
      this.displayMaximizable = false;
      this.edit = false;
      this.formProducto.reset();
      this.header = 'Agregar un nuevo juego';
      alert('Juego editado');
    }
  }

  dialogCancel() {
    this.edit = false;
    this.formProducto.reset();
    this.header = 'Agregar un nuevo juego';
    this.displayMaximizable = false;
  }

  updateJuego(juegoSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = juegoSelected;
    this.header = 'Editar Juego';
    this.formProducto.setValue({
      nombre: juegoSelected.nombre,
      precio: juegoSelected.precio,
      url: juegoSelected.url,
      plataforma: juegoSelected.plataforma,
      status: juegoSelected.status,
      descripcion: juegoSelected.descripcion
    });
    this.showMaximizableDialog()
  }

  deleteJuego(id: string) {
    this.productService.deleteJuegoS(id).then(() => {
      alert('Juego eliminado')
    });
  }
}