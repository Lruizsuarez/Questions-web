import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipOptionComponent } from './relationship-option.component';

describe('RelationshipOptionComponent', () => {
  let component: RelationshipOptionComponent;
  let fixture: ComponentFixture<RelationshipOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
