import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMadrasaComponent } from './single-madrasa.component';

describe('SingleMadrasaComponent', () => {
  let component: SingleMadrasaComponent;
  let fixture: ComponentFixture<SingleMadrasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMadrasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMadrasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
