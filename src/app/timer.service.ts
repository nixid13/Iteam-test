import {Injectable} from '@angular/core';
import {fromEvent, interval} from "rxjs";
import {buffer, debounceTime, filter, map} from "rxjs/operators";

export interface Timer {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  private initValues: Timer = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  constructor() {
  }

  getInitialValues() {
    return {...this.initValues};
  }

  startTimer() {
    return interval(1000)
  }

  waitTimer(btn) {
    const click = fromEvent<MouseEvent>(btn, 'click');

    return click
      .pipe(
        buffer(click.pipe(debounceTime(300))),
        map(clicks => clicks.length),
        filter(clicksCount => clicksCount === 2),
      )

  }

}
