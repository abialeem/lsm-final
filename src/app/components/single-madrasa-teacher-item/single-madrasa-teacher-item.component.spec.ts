import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMadrasaTeacherItemComponent } from './single-madrasa-teacher-item.component';

describe('SingleMadrasaTeacherItemComponent', () => {
  let component: SingleMadrasaTeacherItemComponent;
  let fixture: ComponentFixture<SingleMadrasaTeacherItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMadrasaTeacherItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMadrasaTeacherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
