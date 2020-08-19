import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazdevD3Component } from './hazdev-d3.component';

describe('HazdevD3Component', () => {
  let component: HazdevD3Component;
  let fixture: ComponentFixture<HazdevD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazdevD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazdevD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
