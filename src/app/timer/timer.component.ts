import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {Timer, TimerService} from "../timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timer: Timer;
  timerActive = false;
  waiting = false;
  timerSub: Subscription;

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.timer = this.timerService.getInitialValues();
  }

  start() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.timerSub = this.timerService.startTimer()
      .subscribe(_ => {
          this.timerActive = true;
          this.waiting = false;

          this.timer.seconds++;
          if (this.timer.seconds > 59) {
            this.timer.seconds = 0;
            this.timer.minutes++

          }
          if (this.timer.minutes > 59) {
            this.timer.minutes = 0;
            this.timer.hours++
          }
        }
      )
  }

  stop() {
    if (this.timerSub) {
      this.timerSub.unsubscribe()
    }
    this.timerActive = false;
    this.waiting = false;
    this.timer = this.timerService.getInitialValues()
  }

  reset() {
    if (this.timerActive || this.waiting) {
      this.stop();
      this.start();
    }
  }

  wait(e: Event) {
  this.timerService.waitTimer(e.target)
      .subscribe(_ => {
        console.log(_)
        this.waiting = true;
        this.timerActive = false;
        if (this.timerSub) {
          this.timerSub.unsubscribe()
        }
      })
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
