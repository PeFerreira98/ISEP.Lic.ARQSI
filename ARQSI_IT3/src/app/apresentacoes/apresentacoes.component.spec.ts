import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApresentacoesComponent } from './apresentacoes.component';

describe('ApresentacoesComponent', () => {
  let component: ApresentacoesComponent;
  let fixture: ComponentFixture<ApresentacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApresentacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApresentacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
