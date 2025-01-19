import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note, Event } from '../../../interfaces/note.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  styleUrl: './map-sidebar.component.scss'
})
export class MapSidebarComponent {
  @Input() notes: Note[] = [];
  @Input() events: Event[] = [];
  @Output() itemSelected = new EventEmitter<Note | Event>();

  constructor(private router: Router) {}
  private expandedItems = new Set<Note | Event>();

  toggleExpand(item: Note | Event): void {
    if (this.expandedItems.has(item)) {
      this.expandedItems.delete(item);
    } else {
      this.expandedItems.add(item);
    }
  }

  isExpanded(item: Note | Event): boolean {
    return this.expandedItems.has(item);
  }

  selectItem(item: Note | Event): void {
    this.itemSelected.emit(item);
  }

  returnToHome(): void {
    this.router.navigate(['/home']);
  }
}
