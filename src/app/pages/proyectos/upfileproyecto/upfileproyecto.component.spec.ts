import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpfileproyectoComponent } from './upfileproyecto.component';

describe('UpfileproyectoComponent', () => {
  let component: UpfileproyectoComponent;
  let fixture: ComponentFixture<UpfileproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpfileproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpfileproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
