import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiVentanaModalComponent } from './mi-ventana-modal.component';

describe('MiVentanaModalComponent', () => {
  let component: MiVentanaModalComponent;
  let fixture: ComponentFixture<MiVentanaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiVentanaModalComponent]
    });
    fixture = TestBed.createComponent(MiVentanaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
