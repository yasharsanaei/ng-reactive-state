import {ApplicationRef, isDevMode, ModuleWithProviders, NgModule, ViewContainerRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveStateService} from "./service/reactive-state.service";
import {DevToolComponent} from "./components/dev-tool/dev-tool.component";
import {skip, take} from "rxjs";

@NgModule({
  declarations: [DevToolComponent],
  imports: [CommonModule],
  providers: [ReactiveStateService],
  bootstrap: [DevToolComponent],
})
export class ReactiveStateModule {
  private static _showDevTools: boolean = false;

  static forRoot({showDevTools}: { showDevTools: boolean }): ModuleWithProviders<ReactiveStateModule> {
    this._showDevTools = showDevTools;
    return {
      ngModule: ReactiveStateModule,
      providers: [ReactiveStateService],
    }
  }

  constructor(private applicationRef: ApplicationRef) {
    if (isDevMode() && ReactiveStateModule._showDevTools) {
      this.applicationRef.isStable.pipe(skip(1), take(1)).subscribe({
        next: value => {
          const rootView = this.applicationRef.components[0].injector.get(ViewContainerRef)
          const devRef = rootView.createComponent(DevToolComponent);
        }
      })
    }
  }
}
