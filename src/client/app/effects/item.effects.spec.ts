/*
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

import { TestBed, inject } from '@angular/core/testing';

import { ItemsEffects } from './item.effects';

describe('ItemEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsEffects]
    });
  });

  it('should be created', inject([ItemsEffects], (service: ItemsEffects) => {
    expect(service).toBeTruthy();
  }));
});
