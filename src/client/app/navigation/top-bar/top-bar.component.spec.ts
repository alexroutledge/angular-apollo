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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { VdlIconRegistry, VdlRootModule } from 'vdl-angular';
import { HttpClientModule } from '@angular/common/http';
import { AlertButtonComponent } from './alert-button/alert-button.component';
import { UserButtonComponent } from './user-button/user-button.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { noop } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TopBarComponent', () => {

  const mockVdlIconRegistry = {
    addSvgIcon: noop
  };

  const mockDomSanitizer = {
    bypassSecurityTrustResourceUrl: noop
  };

  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopBarComponent
      ],
      imports: [
        HttpClientModule,
        VdlRootModule
      ],
      providers: [
        { provide: VdlIconRegistry, useValue: mockVdlIconRegistry },
        { provide: DomSanitizer, useValue: mockDomSanitizer }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
