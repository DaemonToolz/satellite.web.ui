import { TestBed } from '@angular/core/testing';

import { MyspaceService } from './myspace.service';

describe('MyspaceService', () => {
  let service: MyspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
