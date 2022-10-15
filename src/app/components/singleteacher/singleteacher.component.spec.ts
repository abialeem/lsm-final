import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleteacherComponent } from './singleteacher.component';

describe('SingleteacherComponent', () => {
  let component: SingleteacherComponent;
  let fixture: ComponentFixture<SingleteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleteacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
