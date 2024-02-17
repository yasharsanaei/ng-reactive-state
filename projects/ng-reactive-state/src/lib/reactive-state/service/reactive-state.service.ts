import {ApplicationRef, Injectable, isDevMode, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs";
import {DevToolComponent} from "../components/dev-tool/dev-tool.component";

@Injectable({
  providedIn: 'root'
})
export class ReactiveStateService {

  dataArray: Observable<unknown>[] = [];

  constructor(private applicationRef: ApplicationRef) {
    if (isDevMode()) {
      const rootView = this.applicationRef.components[0].injector.get(ViewContainerRef)
      const devRef = rootView.createComponent(DevToolComponent);
    }
  }

  log(observable: Observable<unknown>) {
    this.dataArray.push(observable);
  }
}
