import { TestBed } from '@angular/core/testing';

import { AccountDataService } from './account-data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountDataService = TestBed.get(AccountDataService);
    expect(service).toBeTruthy();
  });
});
