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

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataService } from './../services/data.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersEffects {

  @Effect() private getUsers$ = this.actions$
    .ofType('GET_USERS')
    .switchMap((action) =>
      this.dataService.getUsers()
        .map((items) => ({ type: 'GET_USERS_SUCCESS', payload: items }))
        .catch(() => Observable.of({ type: 'GET_USERS_ERROR' })));

  constructor(
    private actions$: Actions,
    private dataService: DataService) {
  }

}
