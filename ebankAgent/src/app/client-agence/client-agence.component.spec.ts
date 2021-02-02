import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAgenceComponent } from './client-agence.component';

describe('ClientAgenceComponent', () => {
  let component: ClientAgenceComponent;
  let fixture: ComponentFixture<ClientAgenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAgenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
