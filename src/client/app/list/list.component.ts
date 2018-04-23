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

@Component({
  selector: 'angular-apollo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private courses: Observable<Course[]>;

  constructor(private apollo: Apollo) { }

  public ngOnInit() {
    this.courses = this.apollo.watchQuery<Query>({
      query: gql`
        query allCourses {
          allCourses {
            id
            title
            author
            description
            topic
            url
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map((result) => result.data.allCourses)
      );
  }
}
