import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HeroesModule,
    AuthModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('router>>>', router);
    console.log('config >>>', router.config);

    // Use a custom replacer to display function names in the route configs
    const replacer = (key: any, value: { name: any; }) => {
      // console.log('key >>>', key);
      // console.log('----------------------');
      // console.log('value >>>', value);
      // console.log('typeof value >>>', typeof value);
      // console.log('----------------------');
      /* if (typeof value === 'function') {
        console.log('value >>>', value.name);
      } */

      return (typeof value === 'function') ? value.name : value;
    }
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
