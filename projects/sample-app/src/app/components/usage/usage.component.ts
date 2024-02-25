import {Component, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {ReactiveState} from "../../../../../ng-reactive-state/src/lib/reactive-state";


@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [],
  templateUrl: './usage.component.html',
  styleUrl: './usage.component.css'
})
export class UsageComponent implements OnInit {
  title = 'sample-app';

  #increase = (data: number): number => ++data;
  #decrease = (data: number): number => --data;

  counter = new ReactiveState<number, 'increase' | 'decrease'>({
    defaultValue: 0,
    mutations: {
      increase: this.#increase,
      decrease: this.#decrease
    }
  })

  ngOnInit(): void {
    this.counter.perform('increase');
  }

  asyncRandomNumber(data: number) {
    return new Observable<number>(observer => {
      timer(1000).subscribe(() => {
        const n = Math.random();
        if (n > 0.5) observer.next(n + data)
        else observer.error(`Number is less than 0.5 ---> ${n}`,)
        observer.complete();
      })
    })
  }

}
