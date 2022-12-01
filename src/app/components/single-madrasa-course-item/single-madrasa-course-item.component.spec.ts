import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMadrasaCourseItemComponent } from './single-madrasa-course-item.component';

describe('SingleMadrasaCourseItemComponent', () => {
  let component: SingleMadrasaCourseItemComponent;
  let fixture: ComponentFixture<SingleMadrasaCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMadrasaCourseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMadrasaCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
