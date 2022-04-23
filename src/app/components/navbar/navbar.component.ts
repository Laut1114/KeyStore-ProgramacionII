import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-align-justify',
        items: [
          {
            label: 'Juegos',
            icon: 'pi pi-fw pi-caret-right'
          },
          {
            label: 'Software',
            icon: 'pi pi-fw pi-desktop',
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
            icon: 'pi pi-fw pi-book'
          },

        ]
      },
      {
        label: 'Ofertas',
        icon: 'pi pi-fw pi-tags',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Iniciar Sesión',
            icon: 'pi pi-fw pi-sign-in',

          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-sign-out',
          },
          {
            label: 'Ajustes',
            icon: 'pi pi-fw pi-cog'
          }
        ]
      },
    ];
  }
}
