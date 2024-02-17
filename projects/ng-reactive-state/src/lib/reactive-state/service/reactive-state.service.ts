import {Injectable} from '@angular/core';
import {DevToolData} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class ReactiveStateService {
  dataArray: DevToolData[] = [];

  log(devToolData: DevToolData) {
    this.dataArray.push(devToolData);
  }
}
