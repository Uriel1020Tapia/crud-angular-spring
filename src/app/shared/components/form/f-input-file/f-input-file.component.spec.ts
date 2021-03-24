import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FInputFileComponent } from './f-input-file.component';

describe('FInputFileComponent', () => {
  let component: FInputFileComponent;
  let fixture: ComponentFixture<FInputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FInputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
