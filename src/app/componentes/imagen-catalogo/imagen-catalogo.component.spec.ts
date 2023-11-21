import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenCatalogoComponent } from './imagen-catalogo.component';

describe('ImagenCatalogoComponent', () => {
  let component: ImagenCatalogoComponent;
  let fixture: ComponentFixture<ImagenCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
