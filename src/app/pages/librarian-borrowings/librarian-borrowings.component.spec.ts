import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianBorrowingsComponent } from './librarian-borrowings.component';

describe('LibrarianBorrowingsComponent', () => {
  let component: LibrarianBorrowingsComponent;
  let fixture: ComponentFixture<LibrarianBorrowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibrarianBorrowingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianBorrowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
