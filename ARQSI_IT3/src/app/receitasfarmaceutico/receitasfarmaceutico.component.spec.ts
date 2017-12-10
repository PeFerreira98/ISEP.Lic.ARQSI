import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasfarmaceuticoComponent } from './receitasfarmaceutico.component';

describe('ReceitasfarmaceuticoComponent', () => {
  let component: ReceitasfarmaceuticoComponent;
  let fixture: ComponentFixture<ReceitasfarmaceuticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitasfarmaceuticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasfarmaceuticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
