import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {

  giftCard: ProductInterface[];

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
    this.productService.getGiftCardS().subscribe((productos) => {
      this.giftCard = productos
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  guardarGiftCard() {
    if (this.edit == false) {
      if (!this.formProducto.invalid) {
        this.productService.agregarGiftCardS(this.formProducto.value).then(() => {
          this.displayMaximizable = false;
          alert('Producto Agregado Correctamente');
        });
      } else {
        alert('Hay campos incompletos');
      }
      this.formProducto.reset();
    } else {
      this.productService.updateGiftCardS(this.itemSelected.id, this.formProducto.value);
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

  updateGiftCard(giftcardSelected: ProductInterface) {
    this.edit = true
    this.itemSelected = giftcardSelected;
    this.header = 'Editar Producto';
    this.formProducto.setValue({
      nombre: giftcardSelected.nombre,
      precio: giftcardSelected.precio,
      url: giftcardSelected.url,
      plataforma: giftcardSelected.plataforma,
      status: giftcardSelected.status,
      descripcion: giftcardSelected.descripcion
    });
    this.showMaximizableDialog()
  }

  deleteGiftcard(id: string) {
    this.productService.deleteGiftCardS(id).then(() => {
      alert('Producto eliminado')
    });
  }

}