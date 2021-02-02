import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontantDureeComponent } from './montant-duree.component';

describe('MontantDureeComponent', () => {
  let component: MontantDureeComponent;
  let fixture: ComponentFixture<MontantDureeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontantDureeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontantDureeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
