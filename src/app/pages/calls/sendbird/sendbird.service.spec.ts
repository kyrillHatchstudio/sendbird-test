import { TestBed } from '@angular/core/testing';

import { SendbirdService } from './sendbird.service';

describe('SendbirdService', () => {
  let service: SendbirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendbirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
