import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { EBooksComponent } from './pages/categorias/e-books/e-books.component';
import { GiftCardComponent } from './pages/categorias/gift-card/gift-card.component';
import { JuegosComponent } from './pages/categorias/juegos/juegos.component';
import { SoftwareComponent } from './pages/categorias/software/software.component';
import { SuscripcionesComponent } from './pages/categorias/suscripciones/suscripciones.component';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { AuthGuard } from './services/auth/auth-guard.guard';

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
  },
  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
