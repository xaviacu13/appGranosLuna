import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallasRegistroComponent } from './tallas-registro.component';

describe('TallasRegistroComponent', () => {
  let component: TallasRegistroComponent;
  let fixture: ComponentFixture<TallasRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallasRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallasRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
