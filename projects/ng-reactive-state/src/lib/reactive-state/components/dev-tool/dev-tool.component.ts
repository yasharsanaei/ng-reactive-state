import {Component, inject} from '@angular/core';
import {ReactiveStateService} from "../../service/reactive-state.service";
import {Observable} from "rxjs";

@Component({
  selector: 'lib-dev-tool',
  templateUrl: './dev-tool.component.html',
  styleUrl: './dev-tool.component.css',
})
export class DevToolComponent {
  #reactiveStateService = inject(ReactiveStateService);
  states: [string, Observable<unknown>][];

  constructor() {
    this.states = this.#reactiveStateService.dataArray;
  }
}
