import { Component } from '@angular/core';

@Component({
    selector: 'admin-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent {

  links = [
    { path: 'paintings', label: 'Add new painting' },
    { path: 'auctions', label: 'Plan new auction' },
  ];

  activeLink = this.links[0];

    constructor() {

    }
}
