import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, filter, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss'
})
export class AuthButtonComponent implements OnInit, OnDestroy{
  private unsubscribe$ = new Subject<void>();
  public isUserLogged: boolean = false;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    combineLatest([this.auth.isAuthenticated$])
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(([isAuthenticated]) => isAuthenticated)
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

  public isLogged(): void {
    this.auth.isAuthenticated$.subscribe((isLogged) => {
      this.isUserLogged =  isLogged;
    });
  }

}