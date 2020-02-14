import { TestBed } from '@angular/core/testing';

import { RabbitmqHubService } from './rabbitmq-hub.service';

describe('RabbitmqHubService', () => {
  let service: RabbitmqHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RabbitmqHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
