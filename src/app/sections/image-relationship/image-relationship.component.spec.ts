import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRelationshipComponent } from './image-relationship.component';

describe('ImageRelationshipComponent', () => {
  let component: ImageRelationshipComponent;
  let fixture: ComponentFixture<ImageRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageRelationshipComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
