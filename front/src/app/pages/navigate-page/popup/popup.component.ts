import { Component, Input, OnInit } from '@angular/core';
import { Event, Note } from '../../../interfaces/note.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {
  @Input() element!: Note | Event;

  constructor(private router: Router) { }
  ngOnInit(): void {
    console.log('Popup element:', this.element);
  }

  openInfo(): void {
    this.router.navigate(['/info', this.element.id]);
  }

  isEvent(): boolean {
    return 'startingHour' in this.element && 'endingHour' in this.element;
  }

  getEventTiming(): string {
    if (this.isEvent()) {
      const event = this.element as Event;
      return `${event.startingHour}:00 - ${event.endingHour}:00`;
    }
    return '';
  }
}