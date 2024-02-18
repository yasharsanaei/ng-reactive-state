import {Component} from '@angular/core';
import {reactiveStateLogger} from "../../../../../ng-reactive-state/src/lib/meta";
import {reactiveState} from "../../../../../ng-reactive-state/src/lib/reactive-state";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @reactiveStateLogger
  homeState1 = reactiveState<number>(1)

  @reactiveStateLogger
  homeState2 = reactiveState<number>(2)

}
