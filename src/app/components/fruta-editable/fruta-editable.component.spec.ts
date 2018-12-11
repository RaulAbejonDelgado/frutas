import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutaEditableComponent } from './fruta-editable.component';

describe('FrutaEditableComponent', () => {
  let component: FrutaEditableComponent;
  let fixture: ComponentFixture<FrutaEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrutaEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrutaEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
