import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectionQuestionComponent } from './multiple-selection-question.component';

describe('MultipleSelectionQuestionComponent', () => {
  let component: MultipleSelectionQuestionComponent;
  let fixture: ComponentFixture<MultipleSelectionQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleSelectionQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
