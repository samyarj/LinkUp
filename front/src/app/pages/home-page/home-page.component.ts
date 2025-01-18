import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router) {}

  createEvent() {
    console.log('create event');
    this.router.navigate(['/new-event']);
  }

  editProfile() {
    this.router.navigate(['/my-profile']);
  }

  navigate() {
    this.router.navigate(['/navigate']);
  }
}
