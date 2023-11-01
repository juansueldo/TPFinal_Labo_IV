import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEspecialidadComponent } from './select-especialidad.component';

describe('SelectEspecialidadComponent', () => {
  let component: SelectEspecialidadComponent;
  let fixture: ComponentFixture<SelectEspecialidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectEspecialidadComponent]
    });
    fixture = TestBed.createComponent(SelectEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
