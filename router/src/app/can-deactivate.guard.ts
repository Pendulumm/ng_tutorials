import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate?: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> =
  (component: CanComponentDeactivate) => {
    // console.log('canDeactivateGuard component', component);
    // console.log('canDeactivate is a fn ', component.canDeactivate);
    console.log('canDeactivate returns >>>', component.canDeactivate!());

    return component.canDeactivate ? component.canDeactivate() : true;
  }
