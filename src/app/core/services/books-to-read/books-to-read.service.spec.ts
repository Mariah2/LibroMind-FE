import { TestBed } from '@angular/core/testing';

import { BooksToReadService } from './books-to-read.service';

describe('BooksToReadService', () => {
  let service: BooksToReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksToReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
