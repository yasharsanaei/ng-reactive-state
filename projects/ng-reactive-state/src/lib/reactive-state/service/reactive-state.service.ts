import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReactiveStateService {
  dataArray: [string, Observable<unknown>][] = [];

  log(name: string, observable: Observable<unknown>) {
    this.dataArray.push([name, observable]);
  }
}
