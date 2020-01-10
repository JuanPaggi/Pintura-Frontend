import { TestBed } from '@angular/core/testing';

import { UsuariosServiceService } from './usuarios-service.service';

describe('UsuariosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosServiceService = TestBed.get(UsuariosServiceService);
    expect(service).toBeTruthy();
  });
});
