import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprincipalComponent } from './addprincipal.component';

describe('AddprincipalComponent', () => {
  let component: AddprincipalComponent;
  let fixture: ComponentFixture<AddprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
