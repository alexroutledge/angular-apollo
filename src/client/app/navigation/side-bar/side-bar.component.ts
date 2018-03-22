/*
 * Copyright (c) 2018 Veritas Technologies LLC.
 * All rights reserved.
 *
 * Veritas and the Veritas Logo are trademarks
 * or registered trademarks of Veritas Technologies LLC
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * IV49-4028-9371-66-15-7
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'vdl-angular';

@Component({
  selector: 'angular-starter-kit-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent {

  public categoryList: Category[] = [
    { displayName: 'Dashboard', icon: 'fa-tachometer' },
    { displayName: 'Inventory', icon: 'fa-inbox' },
    {
      displayName: 'List Views', icon: 'fa-list',
      subCategories: [
        { displayName: 'Applications', icon: 'fa-window-maximize' },
        { displayName: 'Line of Business', icon: 'fa-window-restore' },
        { displayName: 'Locations', icon: 'fa-map' },
        { displayName: 'Content Sources', icon: 'fa-server' },
        { displayName: 'Personal Data', icon: 'fa-user-circle' }
      ]
    },
  ];

  public selectedCategory: Category;

  public categorySelected(category: Category) {
    this.selectedCategory = category;
  }

}
