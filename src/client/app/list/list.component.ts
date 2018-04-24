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

import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Course, Query } from '../types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'angular-apollo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  private courses: Observable<Course[]>;

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: 'GET_ITEMS'
    });
    this.courses = this.store.select('items')
    .map((state) => state.data);
  }

}
