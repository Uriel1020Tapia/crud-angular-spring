import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleH5Component } from './title-h5.component';

describe('TitleH5Component', () => {
  let component: TitleH5Component;
  let fixture: ComponentFixture<TitleH5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleH5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleH5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
