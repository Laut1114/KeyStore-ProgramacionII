import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];

  usuario =  {
    email: "",
    password: ""
  };

  userloged: boolean = false;

  constructor(private authService: AuthService, private messageService : MessageService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-align-justify',
        items: [
          {
            label: 'Juegos',
            icon: 'pi pi-fw pi-caret-right',
            routerLink: 'juegos'
          },
          {
            label: 'Software',
            icon: 'pi pi-fw pi-desktop',
            routerLink: 'software',
            items: [
              {
                label: 'Sistemas Operativos',
                icon: 'pi pi-fw pi-microsoft',
              },
              {
                label: 'Antivirus',
                icon: 'pi pi-fw pi-shield',
              },
              {
                label: 'Diseño e Ilustración',
                icon: 'pi pi-fw pi-instagram',
              }
            ]
          },
          {
            label: 'Gift Cards',
            icon: 'pi pi-fw pi-credit-card',
            routerLink: 'gift-cards',
            items: [
              {
                label: 'Amazon',
                icon: 'pi pi-fw pi-amazon'
              },
              {
                label: 'Paypal',
                icon: 'pi pi-fw pi-paypal'
              },
              {
                label: 'Play Store',
                icon: 'pi pi-fw pi-google'
              },
              {
                label: 'App Store',
                icon: 'pi pi-fw pi-apple'
              },
            ]
          },
          {
            label: 'Subscripciones',
            icon: 'pi pi-fw pi-ticket',
            routerLink: 'suscripciones',
            items: [
              {
                label: 'Youtube Premium',
                icon: 'pi pi-fw pi-youtube'
              },
              {
                label: 'Discord Nitro',
                icon: 'pi pi-fw pi-discord'
              },
              {
                label: 'PlayStation Plus',
                icon: 'pi pi-fw pi-plus'
              },
              {
                label: 'Xbox Game Pass',
                icon: 'pi pi-fw pi-box'
              },
            ]
          },
          {
            label: 'eBooks',
            icon: 'pi pi-fw pi-book',
            routerLink: 'e-books',
          },

        ]
      },
      {
        label: 'Ofertas',
        icon: 'pi pi-fw pi-tags',
        routerLink: 'ofertas'
      },
    ];
  }

  loginMsg() {
    this.messageService.add({key: 'bc', severity:'info', summary:'Bienvenido', detail:'Usuario logeado correctamente'});
  }

  logoutMsg() {
    this.messageService.add({key: 'bc', severity:'warn', summary:'Adios', detail:'Se ha cerrado sesión'});
  }

  //LOGIN CON GOOGLE -----------------
  ingresarGoogle() {
    const {email, password} = this.usuario;
    this.authService.loginGoogle(email, password).then(() => {
        this.loginMsg();
        this.userloged = true;
    });
  }

  cerrarSesion() {
    this.authService.logout().then(() => {
      this.logoutMsg();
      this.userloged = false;
    });
  }

  userlog() {
    if (this.userloged == false){ 
      this.ingresarGoogle();
    } 
    else {
      this.cerrarSesion();
    }
  }
}