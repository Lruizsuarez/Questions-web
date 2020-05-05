import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContextComponent } from './section-context.component';

describe('SectionContextComponent', () => {
  let component: SectionContextComponent;
  let fixture: ComponentFixture<SectionContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
