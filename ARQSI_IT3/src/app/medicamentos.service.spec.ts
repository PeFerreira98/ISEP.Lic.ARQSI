import { TestBed, inject } from '@angular/core/testing';

import { MedicamentosService } from './medicamentos.service';

describe('MedicamentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicamentosService]
    });
  });

  it('should be created', inject([MedicamentosService], (service: MedicamentosService) => {
    expect(service).toBeTruthy();
  }));
});
