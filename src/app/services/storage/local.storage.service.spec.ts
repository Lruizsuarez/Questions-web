import { TestBed } from '@angular/core/testing';

import { Local.StorageService } from './local.storage.service';

describe('Local.StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Local.StorageService = TestBed.get(Local.StorageService);
    expect(service).toBeTruthy();
  });
});
