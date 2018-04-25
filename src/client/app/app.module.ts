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

import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule, APP_INITIALIZER } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';

import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ListComponent } from './list/list.component';
import { StoreModule, StoreFeatureModule  } from '@ngrx/store';
import { itemReducer } from './reducers/item.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects } from './effects/item.effects';
import { UsersEffects } from './effects/users.effects';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { TileComponent } from './tile/tile.component';
import { usersReducer } from './reducers/users.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(ROUTES),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ApolloModule,
    HttpLinkModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('items', itemReducer),
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forRoot([ItemsEffects, UsersEffects]),
    FormsModule,
    ChartsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    DataService,
    StoreFeatureModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve) => {
    injector.get(LOCATION_INITIALIZED, Promise.resolve()).then(() => {
      translate.addLangs(['en-US', 'it']);
      translate.setDefaultLang('en-US');
      translate.use('en-US').subscribe(() => { resolve(); });
    });
  });
}
