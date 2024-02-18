import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveStateService} from "./service/reactive-state.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ReactiveStateService],
})
export class ReactiveStateModule {

  static forRoot(): ModuleWithProviders<ReactiveStateModule> {
    return {
      ngModule: ReactiveStateModule,
      providers: [ReactiveStateService],
    }
  }

  constructor() {

  }
}
