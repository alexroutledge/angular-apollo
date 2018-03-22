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

import { Component } from '@angular/core';
import { VdlIconRegistry } from 'vdl-angular';

@Component({
  selector: 'angular-starter-kit-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private vdlIconRegistry: VdlIconRegistry) {
    vdlIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
