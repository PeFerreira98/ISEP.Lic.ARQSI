import { TestBed, inject } from '@angular/core/testing';

import { PrescricoesService } from './prescricoes.service';

describe('PrescricoesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrescricoesService]
    });
  });

  it('should be created', inject([PrescricoesService], (service: PrescricoesService) => {
    expect(service).toBeTruthy();
  }));
});
