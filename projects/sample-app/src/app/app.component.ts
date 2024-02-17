import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Observable, timer} from "rxjs";
import {reactiveState, reactiveStateLogger} from 'ng-reactive-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sample-app';

  @reactiveStateLogger
  counter = reactiveState<number>(1)

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
