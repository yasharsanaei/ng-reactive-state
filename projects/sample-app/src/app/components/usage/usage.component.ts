import {Component, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import { reactiveStateLogger } from '../../../../../ng-reactive-state/src/lib/meta';
import {reactiveState} from "../../../../../ng-reactive-state/src/lib/reactive-state";


@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [],
  templateUrl: './usage.component.html',
  styleUrl: './usage.component.css'
})
export class UsageComponent implements OnInit {
  title = 'sample-app';

  @reactiveStateLogger
  counter = reactiveState<number>(0)

  @reactiveStateLogger
  counter1 = reactiveState<number>(1)

  @reactiveStateLogger
  counter2 = reactiveState<number>(2)

  @reactiveStateLogger
  counter3 = reactiveState<number>(3)

  @reactiveStateLogger
  counter4 = reactiveState<number>(4)

  @reactiveStateLogger
  counter5 = reactiveState<number>(5)

  @reactiveStateLogger
  counter6 = reactiveState<number>(6)

  ngOnInit(): void {
    this.counter.mutate((data) => data++)
  }

  asyncRandomNumber(data: number) {
    return new Observable<number>(observer => {
      timer(1000).subscribe(value => {
        const n = Math.random();
        if (n > 0.5) observer.next(n + data)
        else observer.error(`Number is less than 0.5 ---> ${n}`,)
        observer.complete();
      })
    })
  }


  increase(data: number) {
    return ++data
  };
}
