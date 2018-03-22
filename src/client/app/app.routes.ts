/*
 * Copyright (c) 2017 Veritas Technologies LLC.
 * All rights reserved.
 *
 * Veritas and the Veritas Logo are trademarks
 * or registered trademarks of Veritas Technologies LLC
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * IV49-4028-9371-66-15-7
 */

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule' },
  // { path: '', redirectTo: 'apps/visibility', pathMatch: 'full'},
];
