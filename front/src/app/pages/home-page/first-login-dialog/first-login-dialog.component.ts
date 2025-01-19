import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication-service/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrl: './first-login-dialog.component.scss'
})
export class FirstLoginDialogComponent implements OnInit {
   public userId: string | null = null;
   constructor(
    private router: Router, private auth: AuthenticationService,  private dialogRef: MatDialogRef<FirstLoginDialogComponent>
  ) {  }

  ngOnInit(): void {
    this.auth.loggedUser.subscribe((user) => {
      this.userId = user.id
    });
  }

  goToProfile(): void {
    this.router.navigate([`/my-profile/${this.userId}`]).then(() => {
      this.dialogRef.close(); 
    });
    console.log('userId', this.userId);
  }
}
