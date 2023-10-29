import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSpecialistComponent } from './form-specialist.component';

describe('FormSpecialistComponent', () => {
  let component: FormSpecialistComponent;
  let fixture: ComponentFixture<FormSpecialistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSpecialistComponent]
    });
    fixture = TestBed.createComponent(FormSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
