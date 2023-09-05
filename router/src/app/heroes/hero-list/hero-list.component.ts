// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  selectedId = 0;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
  ) {
    // console.log('2**2 is>>>', 2 ** 2);
  }

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        /* console.log('hero-list route>>>', this.route);
        console.log('hero-id params>>>', params);
        console.log('hero-id params id>>>', params.get('id'));
        console.log('------------------------------------------------'); */

        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getHeroes();
      })
    );

    /* this.heroes$.subscribe(heroes => {
      console.log('heros>>>', heroes);
    }); */
  }
}
