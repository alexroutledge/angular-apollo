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

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { TopBarComponent } from './../navigation/top-bar/top-bar.component';
import { SideBarComponent } from './../navigation/side-bar/side-bar.component';
import { AlertButtonComponent } from './../navigation/top-bar/alert-button/alert-button.component';
import { UserButtonComponent } from './../navigation/top-bar/user-button/user-button.component';
import { HelpButtonComponent } from './../navigation/top-bar/help-button/help-button.component';
import { VdlIconRegistry, VdlRootModule } from 'vdl-angular';

describe('LayoutComponent', () => {

  const mockVdlIconRegistry: VdlIconRegistry = jasmine.createSpyObj(
    'mockVdlIconRegistry', ['registerFontClassAlias', 'addSvgIcon']
  );

  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        TopBarComponent,
        SideBarComponent,
        AlertButtonComponent,
        UserButtonComponent,
        HelpButtonComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: VdlIconRegistry, useValue: mockVdlIconRegistry }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
