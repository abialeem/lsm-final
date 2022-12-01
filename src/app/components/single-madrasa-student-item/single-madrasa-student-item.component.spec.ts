import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMadrasaStudentItemComponent } from './single-madrasa-student-item.component';

describe('SingleMadrasaStudentItemComponent', () => {
  let component: SingleMadrasaStudentItemComponent;
  let fixture: ComponentFixture<SingleMadrasaStudentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMadrasaStudentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMadrasaStudentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
