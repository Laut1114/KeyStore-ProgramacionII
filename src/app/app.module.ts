// -------- MODULOS -----------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//-------- COMPONENTS -----------
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
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
import { ProcesoCompraComponent } from './pages/home/components/proceso-compra/proceso-compra.component';

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
import { TimelineModule } from 'primeng/timeline';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';

//-------- FIREBASE -----------
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    //COMPONENTES DEL HOME -----------------
    HomeComponent,
    CarrouselHomeComponent,
    CardHomeComponent,
    ProcesoCompraComponent,
    //--------------------------------------
    //COMPONENTES DE CATEGORIAS ------------
    JuegosComponent,
    SoftwareComponent,
    GiftCardComponent,
    SuscripcionesComponent,
    EBooksComponent,
    //--------------------------------------
    OfertasComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // PRIME NG
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
    TimelineModule,
    SkeletonModule,
    DialogModule,
    InputNumberModule,
    InputTextareaModule,
    SpeedDialModule,
    TooltipModule,
    // FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
