import { TestBed } from '@angular/core/testing';

import { HazdevD3Service } from './hazdev-d3.service';

describe('HazdevD3Service', () => {
  let service: HazdevD3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HazdevD3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
