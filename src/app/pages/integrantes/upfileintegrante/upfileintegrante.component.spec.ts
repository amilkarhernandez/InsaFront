import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpfileintegranteComponent } from './upfileintegrante.component';

describe('UpfileintegranteComponent', () => {
  let component: UpfileintegranteComponent;
  let fixture: ComponentFixture<UpfileintegranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpfileintegranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpfileintegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
