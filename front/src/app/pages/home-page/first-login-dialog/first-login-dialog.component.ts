import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrl: './first-login-dialog.component.scss'
})
export class FirstLoginDialogComponent {
  constructor(private router: Router) {}

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
