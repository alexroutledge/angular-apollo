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
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

@Injectable()
export class DataService {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    const subscriptionLink = new WebSocketLink({
      uri:
        'ws://localhost:3000/subscriptions',
      options: {
        reconnect: true,
        connectionParams: {}
      }
    });

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      subscriptionLink,
      this.httpLink.create({
        uri: 'http://localhost:3000/graphql'
      })
    );
    this.apollo.create({
      link,
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
    return this.apollo
      .subscribe({
        query: gql`
          subscription {
            userAdded(channelId: 1) {
              id
              count
            }
          }
        `
      })
      .map((result) => [result.data.userAdded]);
  }

}
