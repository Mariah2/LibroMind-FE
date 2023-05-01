import { TestBed } from '@angular/core/testing';

import { BorrowingsService } from './borrowings.service';

describe('BorrowingsService', () => {
  let service: BorrowingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
