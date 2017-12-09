import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricoesComponent } from './prescricoes.component';

describe('PrescricoesComponent', () => {
  let component: PrescricoesComponent;
  let fixture: ComponentFixture<PrescricoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescricoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
