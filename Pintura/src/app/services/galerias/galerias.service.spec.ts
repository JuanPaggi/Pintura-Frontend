import { TestBed } from '@angular/core/testing';

import { GaleriasService } from './galerias.service';

describe('GaleriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaleriasService = TestBed.get(GaleriasService);
    expect(service).toBeTruthy();
  });
});
