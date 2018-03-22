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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './layout.routes';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './../navigation/top-bar/top-bar.component';
import { SideBarComponent } from './../navigation/side-bar/side-bar.component';
import { VdlRootModule } from 'vdl-angular';
import { AlertButtonComponent } from './../navigation/top-bar/alert-button/alert-button.component';
import { UserButtonComponent } from './../navigation/top-bar/user-button/user-button.component';
import { HelpButtonComponent } from './../navigation/top-bar/help-button/help-button.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    TopBarComponent,
    SideBarComponent,
    AlertButtonComponent,
    UserButtonComponent,
    HelpButtonComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    VdlRootModule,
    RouterModule.forChild ( ROUTES ),
  ]
})
export class LayoutModule { }
