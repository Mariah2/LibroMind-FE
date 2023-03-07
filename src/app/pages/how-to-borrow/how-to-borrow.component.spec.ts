import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToBorrowComponent } from './how-to-borrow.component';

describe('HowToBorrowComponent', () => {
  let component: HowToBorrowComponent;
  let fixture: ComponentFixture<HowToBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HowToBorrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
