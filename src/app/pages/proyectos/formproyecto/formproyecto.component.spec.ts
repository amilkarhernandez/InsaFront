import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormproyectoComponent } from './formproyecto.component';

describe('FormproyectoComponent', () => {
  let component: FormproyectoComponent;
  let fixture: ComponentFixture<FormproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
