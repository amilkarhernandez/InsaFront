import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormintegranteComponent } from './formintegrante.component';

describe('FormintegranteComponent', () => {
  let component: FormintegranteComponent;
  let fixture: ComponentFixture<FormintegranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormintegranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormintegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
