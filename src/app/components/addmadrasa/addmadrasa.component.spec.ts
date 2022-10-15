import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmadrasaComponent } from './addmadrasa.component';

describe('AddmadrasaComponent', () => {
  let component: AddmadrasaComponent;
  let fixture: ComponentFixture<AddmadrasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmadrasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmadrasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
