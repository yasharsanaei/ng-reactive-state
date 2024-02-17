import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveStateService} from "./service/reactive-state.service";
import {DevToolComponent} from "./components/dev-tool/dev-tool.component";

@NgModule({
  declarations: [DevToolComponent],
  imports: [CommonModule],
  providers: [ReactiveStateService],
  bootstrap: [DevToolComponent]
})
export class ReactiveStateModule {
}
