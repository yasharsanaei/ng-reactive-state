import {Component, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
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

  counter = reactiveState<number>(0)

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
