import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import LibraryModel from 'src/app/shared/models/libraries/library.model';
import { LibrariesService } from 'src/app/core/services/libraries/libraries.service';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-libraries',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibrariesComponent implements OnInit{
  private readonly libraryService = inject(LibrariesService);

  libraries$?: Observable<LibraryModel[]>;

  ngOnInit() {
    this.libraries$ = this.libraryService.getLibraries();
  }
}
