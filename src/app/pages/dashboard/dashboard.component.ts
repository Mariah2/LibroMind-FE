import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../dashboard/components/carousel/carousel.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
