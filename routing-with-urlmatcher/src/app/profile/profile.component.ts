import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isShow: boolean;

  username$ = this.route.paramMap
    .pipe(
      map((params: ParamMap) => {
        console.log('params >>> ', params);
        console.log('username, return >>>', params.get('username'));

        return params.get('username')
      })
    );
  password$ = this.route.params.pipe(
    map((value, index) => {
      console.log('value >>>', value);
      return value['password'];
    })
  )
  constructor(private route: ActivatedRoute) {
    console.log('route>>> ', this.route);
    console.log('paramMap>>> ', this.route.paramMap);
    this.isShow = false;
  }
  showPwd() {
    this.isShow = true;
    console.log('password$', this.password$);
  }
}
