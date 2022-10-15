import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadrasasComponent } from './madrasas.component';

describe('MadrasasComponent', () => {
  let component: MadrasasComponent;
  let fixture: ComponentFixture<MadrasasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadrasasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadrasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
