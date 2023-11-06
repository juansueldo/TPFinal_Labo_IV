import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDetalleComponent } from './pacientes-detalle.component';

describe('PacientesDetalleComponent', () => {
  let component: PacientesDetalleComponent;
  let fixture: ComponentFixture<PacientesDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesDetalleComponent]
    });
    fixture = TestBed.createComponent(PacientesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
