import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteActiveComponent } from './compte-active.component';

describe('CompteActiveComponent', () => {
  let component: CompteActiveComponent;
  let fixture: ComponentFixture<CompteActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
