import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipQuestionComponent } from './relationship-question.component';

describe('RelationshipQuestionComponent', () => {
  let component: RelationshipQuestionComponent;
  let fixture: ComponentFixture<RelationshipQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
