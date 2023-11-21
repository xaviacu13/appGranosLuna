import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTrabajoComponent } from './r-trabajo.component';

describe('RTrabajoComponent', () => {
  let component: RTrabajoComponent;
  let fixture: ComponentFixture<RTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
