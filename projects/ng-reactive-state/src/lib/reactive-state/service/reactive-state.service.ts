import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReactiveStateService {

  dataArray: Observable<unknown>[] = [];

  constructor() {
    console.log('---> ReactiveStateService Injected <---');
  }

  log(observable: Observable<unknown>) {
    this.dataArray.push(observable);
  }
}
