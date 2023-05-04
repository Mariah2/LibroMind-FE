import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from "@angular/material/tooltip";

import { LibrariesService } from 'src/app/core/services/libraries/libraries.service';
import LibraryModel from 'src/app/shared/models/libraries/library.model';

@Component({
  selector: 'app-libraries',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, RouterLink, MatTooltipModule],
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibrariesComponent implements OnInit {
  private readonly libraryService = inject(LibrariesService);

  libraries$?: Observable<LibraryModel[]>;

  ngOnInit() {
    this.libraries$ = this.libraryService.getLibraries();
  }

  createLibraryAddress(library: LibraryModel): string {
    return library.address.street + ', ' +
      library.address.number + ', ' +
      library.address.city + ', ' +
      library.address.county + ', ' +
      library.address.country;
  }
}
