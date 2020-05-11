import { TestBed } from '@angular/core/testing';

import { SectionCreationService } from './section-creation.service';

describe('SectionCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SectionCreationService = TestBed.get(SectionCreationService);
    expect(service).toBeTruthy();
  });
});
