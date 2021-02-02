import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteDesativeComponent } from './compte-desative.component';

describe('CompteDesativeComponent', () => {
  let component: CompteDesativeComponent;
  let fixture: ComponentFixture<CompteDesativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteDesativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteDesativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
