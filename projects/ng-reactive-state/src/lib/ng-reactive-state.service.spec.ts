import { TestBed } from '@angular/core/testing';

import { NgReactiveStateService } from './ng-reactive-state.service';

describe('NgReactiveStateService', () => {
  let service: NgReactiveStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgReactiveStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
