// -------- MODULOS -----------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//-------- COMPONENTS -----------
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { JuegosComponent } from './pages/categorias/juegos/juegos.component';
import { SoftwareComponent } from './pages/categorias/software/software.component';
import { GiftCardComponent } from './pages/categorias/gift-card/gift-card.component';
import { SuscripcionesComponent } from './pages/categorias/suscripciones/suscripciones.component';
import { EBooksComponent } from './pages/categorias/e-books/e-books.component';
import { CarrouselHomeComponent } from './pages/home/components/carrousel-home/carrousel-home.component';
import { CardHomeComponent } from './pages/home/components/card-home/card-home.component';

// -------- PRIMENG -----------
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    //COMPONENTES DEL HOME -----------------
    CarrouselHomeComponent,
    CardHomeComponent,
    //--------------------------------------
    SignInComponent,
    JuegosComponent,
    SoftwareComponent,
    GiftCardComponent,
    SuscripcionesComponent,
    EBooksComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    MessagesModule,
    CarouselModule,
    HttpClientModule,
    DividerModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
