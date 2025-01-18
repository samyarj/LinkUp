import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BrowserModule, RouterModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/navigate']);
  }

  setupProfile() {
    this.router.navigate(['/setup-profile']);
  }

  createEvent() {
    this.router.navigate(['/create-event']);
  }
}
