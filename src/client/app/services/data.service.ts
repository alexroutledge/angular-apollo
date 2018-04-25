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
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Course, Query } from '../types';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    this.apollo.create({
      link: this.httpLink.create({
        uri: 'http://localhost:3000/graphql'
      }),
      cache: new InMemoryCache()
    });
  }

  public getItems() {
    return this.apollo.watchQuery<Query>({
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

  public getUsers() {
    return this.apollo.watchQuery<Query>({
      query: gql`
        query allUsers {
          allUsers {
            id
            count
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map((result) => result.data.allUsers)
      );
  }

}
