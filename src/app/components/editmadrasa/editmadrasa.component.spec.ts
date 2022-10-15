import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmadrasaComponent } from './editmadrasa.component';

describe('EditmadrasaComponent', () => {
  let component: EditmadrasaComponent;
  let fixture: ComponentFixture<EditmadrasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmadrasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmadrasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
