import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRegistroComponent } from './item-registro.component';

describe('ItemRegistroComponent', () => {
  let component: ItemRegistroComponent;
  let fixture: ComponentFixture<ItemRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
