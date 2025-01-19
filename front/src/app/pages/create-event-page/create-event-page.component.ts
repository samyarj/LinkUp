import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile-service/profile.service';
import { Address } from '../../interfaces/address.interface';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.scss',
})
export class CreateEventPageComponent implements OnInit {
  noteEventForm!: FormGroup;
  isEvent: boolean = false;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.noteEventForm = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      date: [Date.now()],
      expirationDate: ['', Validators.required],
      location: ['', Validators.required],
      isPublic: [false],
      publicationDate: ['', Validators.required],
      startingHour: [''],
      endingHour: [''],
    });
  }

  onSubmit(): void {
    if (this.noteEventForm.valid) {
      const formValue = this.noteEventForm.value;
      const data = {
        ...formValue,
        userId: this.userId,
      };

      if (this.isEvent) {
        this.profileService.createEventByUser(data, this.userId).subscribe({
          next: (response) => console.log('Event created:', response),
          error: (err) => console.error('Failed to create event:', err),
        });
      } else {
        this.profileService.createNoteByUser(data, this.userId).subscribe({
          next: (response) => console.log('Note created:', response),
          error: (err) => console.error('Failed to create note:', err),
        });
      }
    }
  }

  toggleEvent(event: any): void {
    this.isEvent = event.value;
    if (this.isEvent) {
      this.noteEventForm.get('startingHour')?.setValidators([Validators.required]);
      this.noteEventForm.get('endingHour')?.setValidators([Validators.required]);
    } else {
      this.noteEventForm.get('startingHour')?.clearValidators();
      this.noteEventForm.get('endingHour')?.clearValidators();
    }
  
    this.noteEventForm.get('startingHour')?.updateValueAndValidity();
    this.noteEventForm.get('endingHour')?.updateValueAndValidity();
  }
  

  onAddressSelected(address: Address): void {
    this.noteEventForm.get('location')?.setValue(address);
  }

  
}