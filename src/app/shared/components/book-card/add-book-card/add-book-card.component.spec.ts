import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookCardComponent } from './add-book-card.component';

describe('AddBookCardComponent', () => {
  let component: AddBookCardComponent;
  let fixture: ComponentFixture<AddBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddBookCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
