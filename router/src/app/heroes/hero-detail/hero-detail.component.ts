import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ParamsMapService } from 'src/app/params-map.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero$!: Observable<Hero>;
  timer!: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService,
    private paramServ: ParamsMapService
  ) { }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }


  ngOnInit() {
    // console.log('hero-detail OnInit');
    // console.log('hero-detail route>>>', this.route);

    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // console.log('hero-detail route>>> ', this.route);
        // console.log('hero-detail route params>>> ', params);
        // console.log('hero-detail route params id>>> ', params.get('id'));
        this.paramServ.params = params;
        /* this.timer = setInterval(() => {
          console.log('hero-detail');
        }, 1000) */

        return this.service.getHero(params.get('id')!)
      })
    );

    /* this.hero$.subscribe(hero => {
      console.log('hero-detail hero >>> ', hero);
    }) */
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}
