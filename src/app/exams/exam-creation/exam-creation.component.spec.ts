import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCreationComponent } from './exam-creation.component';

describe('ExamCreationComponent', () => {
  let component: ExamCreationComponent;
  let fixture: ComponentFixture<ExamCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
