import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.scss',
})
export class CreateEventPageComponent {
  noteEventForm!: FormGroup;
  isEvent: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.noteEventForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      expirationDate: ['', Validators.required],
      location: ['', Validators.required],
      isPublic: [false],
      publicationDate: ['', Validators.required],
      userId: ['', Validators.required],
      messages: this.fb.array([]),
      startingHour: [''],
      endingHour: [''],
    });
  }

  onSubmit(): void {
    if (this.noteEventForm.valid) {
      const formValue = this.noteEventForm.value;
      if (this.isEvent) {
        // Handle Event creation
        console.log('Event created:', formValue);
      } else {
        // Handle Note creation
        console.log('Note created:', formValue);
      }
    }
  }

  toggleEvent(isEvent: boolean): void {
    this.isEvent = isEvent;
    if (this.noteEventForm) {
      if (isEvent) {
        this.noteEventForm
          .get('startingHour')
          ?.setValidators([Validators.required]);
        this.noteEventForm
          .get('endingHour')
          ?.setValidators([Validators.required]);
      } else {
        this.noteEventForm.get('startingHour')?.clearValidators();
        this.noteEventForm.get('endingHour')?.clearValidators();
      }
      this.noteEventForm.get('startingHour')?.updateValueAndValidity();
      this.noteEventForm.get('endingHour')?.updateValueAndValidity();
    }
  }
}
