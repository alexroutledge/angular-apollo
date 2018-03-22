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

import { Component, OnInit } from '@angular/core';
import { VdlIconRegistry } from 'vdl-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'angular-starter-kit-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(vdlIconRegistry: VdlIconRegistry,
              private _sanitizer: DomSanitizer) {
    vdlIconRegistry.addSvgIcon('mcdmp-logo', _sanitizer.bypassSecurityTrustResourceUrl('assets/img/mcdmp-logo.svg'));
  }

}
