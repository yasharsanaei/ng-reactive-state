import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ReactiveState} from "../../../ng-reactive-state/src/lib/reactive-state";
import {Observable, timer} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sample-app';
  counter = new ReactiveState<number>({
    defaultValue: 0,
    mutate: (data) => this.asyncRandomNumber(data)
  })

  ngOnInit(): void {
    this.counter.customSet({data: 5})
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

}
