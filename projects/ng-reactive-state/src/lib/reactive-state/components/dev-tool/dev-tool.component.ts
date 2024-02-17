import {Component} from '@angular/core';

@Component({
  selector: 'lib-dev-tool',
  templateUrl: './dev-tool.component.html',
  styleUrl: './dev-tool.component.css'
})
export class DevToolComponent {
  constructor() {
    console.log('----- DevToolComponent constructor! -----')
  }
}
