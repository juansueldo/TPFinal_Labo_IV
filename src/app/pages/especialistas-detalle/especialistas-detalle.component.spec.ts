import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasDetalleComponent } from './especialistas-detalle.component';

describe('EspecialistasDetalleComponent', () => {
  let component: EspecialistasDetalleComponent;
  let fixture: ComponentFixture<EspecialistasDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialistasDetalleComponent]
    });
    fixture = TestBed.createComponent(EspecialistasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
