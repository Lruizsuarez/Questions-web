import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowCardComponent } from './shadow-card.component';

describe('ShadowCardComponent', () => {
  let component: ShadowCardComponent;
  let fixture: ComponentFixture<ShadowCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadowCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
