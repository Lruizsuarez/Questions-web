import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationRelationshipComponent } from './conversation-relationship.component';

describe('ConversationRelationshipComponent', () => {
  let component: ConversationRelationshipComponent;
  let fixture: ComponentFixture<ConversationRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
