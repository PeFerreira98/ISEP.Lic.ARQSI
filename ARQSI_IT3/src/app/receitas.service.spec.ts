import { TestBed, inject } from '@angular/core/testing';

import { ReceitasService } from './receitas.service';

describe('ReceitasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceitasService]
    });
  });

  it('should be created', inject([ReceitasService], (service: ReceitasService) => {
    expect(service).toBeTruthy();
  }));
});
