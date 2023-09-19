import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { authGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { ComposeMessageAgainComponent } from './compose-message/compose-message-again.component';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'again',
    component: ComposeMessageAgainComponent,
    outlet: 'popupAgain'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canMatch: [authGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m => {
      // console.log('m>>>', m);
      return m.CrisisCenterModule
    }),
    data: { preload: true }
  },
  // {
  //   path: 'admin',
  //   loadComponent: () => import('./admin/admin-cannotFound').then(c => {
  //     // console.log('m>>>', c);
  //     return c.AdminCannotFoundComponent;
  //   })
  // },
  { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
  // { path: '**', redirectTo: '/superheroes', pathMatch: 'prefix' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        // preloadingStrategy: PreloadAllModules,
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
