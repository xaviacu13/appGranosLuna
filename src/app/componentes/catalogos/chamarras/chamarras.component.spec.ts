import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamarrasComponent } from './chamarras.component';

describe('ChamarrasComponent', () => {
  let component: ChamarrasComponent;
  let fixture: ComponentFixture<ChamarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
