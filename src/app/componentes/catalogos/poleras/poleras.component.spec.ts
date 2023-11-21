import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolerasComponent } from './poleras.component';

describe('PolerasComponent', () => {
  let component: PolerasComponent;
  let fixture: ComponentFixture<PolerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
