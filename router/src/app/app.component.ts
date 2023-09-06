import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from './animations';
import { ParamsMapService } from './params-map.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  private id: number | undefined;
  private _router: string | undefined;
  constructor(
    private contexts: ChildrenOutletContexts,
    private router: Router,
    private paramServ: ParamsMapService
  ) { }

  ngOnInit(): void {
    // console.log('app route >>>', this.route);
    // console.log('app router >>>', this.router);
    // console.log('app contexts>>> ', this.contexts);
  }
  /* 
    -----
    Only for testing
    -----
    Here's a severe logical problem if click back navigation bar on the browser
    ...
  */
  pageForward() {
    let _id = parseInt(this.paramServ.params.get('id') as string, 10);
    // console.log('serv id>>> ', _id);

    if (this.id === undefined || this.id === _id) {
      this.id = ++_id;
    } else {
      this.id++;
    }
    // console.log('forward page id>>>', this.id);
    this.router.navigate(['superhero', `${this.id}`]);
  }
  pageBack() {
    let _id = parseInt(this.paramServ.params.get('id') as string, 10);
    if (this.id === undefined || this.id === _id) {
      this.id = --_id;
    } else {
      this.id--;
    }
    // console.log('back page id>>>', this.id);
    this.router.navigate(['superhero', `${this.id}`]);
  }


  getRouteAnimationData() {
    // console.log('app contexts primary>>> ', this.contexts.getContext('primary'));
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
