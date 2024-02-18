import {Component, inject} from '@angular/core';
import {ReactiveStateService} from "../../service/reactive-state.service";
import {DevToolData} from "../../../types";

@Component({
  selector: 'lib-dev-tool',
  templateUrl: './dev-tool.component.html',
  styleUrl: './dev-tool.component.css',
})
export class DevToolComponent {
  #reactiveStateService = inject(ReactiveStateService);
  states: DevToolData[];

  constructor() {
    this.states = this.#reactiveStateService.dataArray;
  }
}
