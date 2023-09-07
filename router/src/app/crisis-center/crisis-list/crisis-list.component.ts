import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CrisisService } from '../crisis.service';
import { Crisis } from '../crisis';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises$?: Observable<Crisis[]>;
  selectedId = 0;

  constructor(
    private service: CrisisService,
    private _route: ActivatedRoute
  ) { }

  public get route() {
    return this._route;
  }

  ngOnInit() {
    this.crises$ = this.route.firstChild?.paramMap.pipe(
      switchMap(params => {
        console.log('crisis-list route >>>', this.route);
        // console.log('crisis-list route firstChild>>>', this.route.firstChild);
        // console.log('crisis-list params>>>', params);

        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getCrises();
      })
    );
  }
}
