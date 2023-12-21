import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgReactiveStateComponent } from './ng-reactive-state.component';

describe('NgReactiveStateComponent', () => {
  let component: NgReactiveStateComponent;
  let fixture: ComponentFixture<NgReactiveStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgReactiveStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgReactiveStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
