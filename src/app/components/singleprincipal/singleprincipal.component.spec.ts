import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleprincipalComponent } from './singleprincipal.component';

describe('SingleprincipalComponent', () => {
  let component: SingleprincipalComponent;
  let fixture: ComponentFixture<SingleprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleprincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
