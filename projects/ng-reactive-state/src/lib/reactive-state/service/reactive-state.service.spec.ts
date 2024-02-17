import { TestBed } from '@angular/core/testing';

import { ReactiveStateService } from './reactive-state.service';

describe('ReactiveStateService', () => {
  let service: ReactiveStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
