import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParamsMapService {
  private _params!: ParamMap;

  public get params() {
    return this._params;
  }

  public set params(value) {
    this._params = value;
  }



  constructor() { }
}
