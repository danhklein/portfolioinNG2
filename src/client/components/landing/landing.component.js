'use strict';

import {Component} from '@angular/core';


@Component({
  selector: 'my-landing',
  templateUrl: 'components/landing/landing.component.html',
  styleUrls: ['components/landing/landing.component.css']
})
export class LandingComponent{
 constructor(){
    this.title = "Home";
  }
}


