import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyIndentificationComponent } from './vocabulary-indentification.component';

describe('VocabularyIndentificationComponent', () => {
  let component: VocabularyIndentificationComponent;
  let fixture: ComponentFixture<VocabularyIndentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyIndentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyIndentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
