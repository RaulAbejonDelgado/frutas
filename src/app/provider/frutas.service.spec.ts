import { TestBed } from '@angular/core/testing';

import { FrutasService } from './frutas.service';

describe('FrutasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrutasService = TestBed.get(FrutasService);
    expect(service).toBeTruthy();
  });
});
