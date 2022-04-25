import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EBooksComponent } from './pages/categorias/e-books/e-books.component';
import { GiftCardComponent } from './pages/categorias/gift-card/gift-card.component';
import { JuegosComponent } from './pages/categorias/juegos/juegos.component';
import { SoftwareComponent } from './pages/categorias/software/software.component';
import { SuscripcionesComponent } from './pages/categorias/suscripciones/suscripciones.component';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'juegos',
    component: JuegosComponent,
  },
  {
    path: 'software',
    component: SoftwareComponent,
  },
  {
    path: 'gift-cards',
    component: GiftCardComponent,
  },
  {
    path: 'suscripciones',
    component: SuscripcionesComponent,
  },
  {
    path: 'e-books',
    component: EBooksComponent,
  },
  {
    path: 'ofertas',
    component: OfertasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
