import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprincipalComponent } from './editprincipal.component';

describe('EditprincipalComponent', () => {
  let component: EditprincipalComponent;
  let fixture: ComponentFixture<EditprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
