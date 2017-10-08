import { Component, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

declare var ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  answers = [];

  constructor(public platform: Platform, public ngZone: NgZone) {
    platform.ready().then(() => {

      ApiAIPromises.init({
        clientAccessToken: "996215250fd4438db3ff5cf9d5957c3e"
      })
      .then((result) =>  console.log(result))

    });
  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.answers.push(speech);
       });
    })
  }
}
