import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, filter, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss'
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    combineLatest([this.auth.isAuthenticated$, this.tokenService.getToken$()])
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(([isAuthenticated, token]) => isAuthenticated && !!token)
      )
      .subscribe();

    this.auth.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}