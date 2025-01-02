import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirListaComponent } from './compartir-lista.component';

describe('CompartirListaComponent', () => {
  let component: CompartirListaComponent;
  let fixture: ComponentFixture<CompartirListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompartirListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompartirListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
