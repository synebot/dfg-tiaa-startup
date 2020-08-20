import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignerUpdatedComponent } from './form-designer-updated.component';

describe('FormDesignerUpdatedComponent', () => {
  let component: FormDesignerUpdatedComponent;
  let fixture: ComponentFixture<FormDesignerUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesignerUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignerUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
