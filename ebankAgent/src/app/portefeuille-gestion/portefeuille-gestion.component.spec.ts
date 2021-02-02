import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortefeuilleGestionComponent } from './portefeuille-gestion.component';

describe('PortefeuilleGestionComponent', () => {
  let component: PortefeuilleGestionComponent;
  let fixture: ComponentFixture<PortefeuilleGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortefeuilleGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortefeuilleGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
