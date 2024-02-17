import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToolComponent } from './dev-tool.component';

describe('DevToolComponent', () => {
  let component: DevToolComponent;
  let fixture: ComponentFixture<DevToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
