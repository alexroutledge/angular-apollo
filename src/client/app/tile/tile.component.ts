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

import { Component, OnInit, ViewChild } from '@angular/core';
import { isUndefined, toNumber, get } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { random } from 'lodash';

@Component({
  selector: 'angular-apollo-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  public chartOptions = {
    responsive: false
  };

  public chartData: any = [
    { data: [9, 3, 9, 45, 5, 9, 7], label: 'Active Users' }
  ];

  public chartLabels = [
    '7:00 - 9:00',
    '9:00 - 11:00',
    '11:00 - 13:00',
    '15:00 - 17:00',
    '17:00 - 19:00',
    '19:00 - 21:00'
  ];

  private users: Observable<any[]>;

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: 'GET_USERS'
    });
    this.users = this.store.select('users')
    .map((state) => {
      const count = state.data.map((item) => item.count);
      const items = Array
      .apply(null, {length: 6})
      .map(Number.call, Number)
      .map((item) => random(1, count) * count);
      return [
        {
          data: items,
          label: 'Active Users'
        }
      ];
    });
  }

}
