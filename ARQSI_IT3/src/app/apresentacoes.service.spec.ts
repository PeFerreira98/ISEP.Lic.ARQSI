import { TestBed, inject } from '@angular/core/testing';

import { ApresentacoesService } from './apresentacoes.service';

describe('ApresentacoesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApresentacoesService]
    });
  });

  it('should be created', inject([ApresentacoesService], (service: ApresentacoesService) => {
    expect(service).toBeTruthy();
  }));
});
