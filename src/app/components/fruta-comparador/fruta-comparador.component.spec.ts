import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutaComparadorComponent } from './fruta-comparador.component';

describe('FrutaComparadorComponent', () => {
  let component: FrutaComparadorComponent;
  let fixture: ComponentFixture<FrutaComparadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrutaComparadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrutaComparadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
