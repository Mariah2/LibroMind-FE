import { TestBed } from '@angular/core/testing';

import { LibraryBooksService } from './library-books.service';

describe('LibraryBooksService', () => {
  let service: LibraryBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
