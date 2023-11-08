import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEspecialistaComponent } from './card-especialista.component';

describe('CardEspecialistaComponent', () => {
  let component: CardEspecialistaComponent;
  let fixture: ComponentFixture<CardEspecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardEspecialistaComponent]
    });
    fixture = TestBed.createComponent(CardEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
