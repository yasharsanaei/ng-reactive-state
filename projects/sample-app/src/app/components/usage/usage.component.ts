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

  counter = reactiveState<number | string>(0, {
    mutations: {
      increase: (data) => {
        let v = +data;
        return ++v;
      },
      decrease: (data) => {
        let v = +data;
        return --v;
      },
      makeString: (data): string => {
        return data.toString()
      }
    }
  })

  ngOnInit(): void {
    this.counter.mutate('wqe');
    this.counter.mutate('increase');
    this.counter.mutate('increase');
    this.counter.mutate('increase');
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


  #increase = (data: number | string): number => {
    let v = +data;
    return ++v;
  };

  #decrease = (data: number | string): number => {
    let v = +data;
    return --v;
  }

  #makeString = (data: number | string): string => {
    return data.toString()
  }
}
