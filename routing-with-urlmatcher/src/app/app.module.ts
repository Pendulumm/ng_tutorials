import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, UrlSegment } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

let couter = 0;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        matcher: (url) => {
          console.log(`url>>>${couter++}`, url);
          console.log('return object >>>', {
            consumed: url,
            posParams: {
              username: new UrlSegment(url[0].path.slice(1), {}),
              password: new UrlSegment('pwd', {})
            }
          });

          if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
            return {
              consumed: url,
              posParams: {
                username: new UrlSegment(url[0].path.slice(1), {}),
                password: new UrlSegment('pwd', {})
              }
            };
          }

          return null;
        },
        component: ProfileComponent
      }
    ])],
  declarations: [AppComponent, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
