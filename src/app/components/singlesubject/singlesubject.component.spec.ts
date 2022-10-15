import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesubjectComponent } from './singlesubject.component';

describe('SinglesubjectComponent', () => {
  let component: SinglesubjectComponent;
  let fixture: ComponentFixture<SinglesubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglesubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglesubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
