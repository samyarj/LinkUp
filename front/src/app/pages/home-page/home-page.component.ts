import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/navigate']); // Update with your navigation path
  }

  setupProfile() {
    this.router.navigate(['/my-profile']); // Update with your setup profile path
  }

  createEvent() {
    this.router.navigate(['/create-event']); // Update with your create event path
  }
}
