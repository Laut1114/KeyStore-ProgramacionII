// -------- MODULOS -----------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule  } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

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
import { OfertasComponent } from './pages/ofertas/ofertas.component';

// -------- PRIMENG -----------
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';


//-------- FIREBASE -----------
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    //COMPONENTES DEL HOME -----------------
    HomeComponent,
    CarrouselHomeComponent,
    CardHomeComponent,
    //--------------------------------------
    //COMPONENTES DE CATEGORIAS ------------
    JuegosComponent,
    SoftwareComponent,
    GiftCardComponent,
    SuscripcionesComponent,
    EBooksComponent,
    //--------------------------------------
    OfertasComponent,
    SignInComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    TableModule,
    ScrollingModule,
    ToastModule,
    RatingModule,
    SkeletonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
