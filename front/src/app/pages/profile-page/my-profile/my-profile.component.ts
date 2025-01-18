import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUser, Pronouns } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  pronounsOptions: string[] = ['He/Him', 'She/Her', 'They/Them', 'Other'];

  // Mock current user data (replace with actual user data from your backend or service)
  currentUser: AppUser = {
    id: '12345',
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    description: 'Hello, I love coding!',
    isPublic: true,
    avatar: 'https://example.com/avatar.jpg',
    age: 30,
    pronouns: Pronouns.HE_HIM,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the form with current user data
  private initializeForm(): void {
    this.editProfileForm = this.fb.group({
      username: [
        this.currentUser.username,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [{ value: this.currentUser.email, disabled: true }], // Disable email field
      description: [this.currentUser.description],
      isProfilePublic: [this.currentUser.isPublic],
      avatar: [this.currentUser.avatar],
      age: [this.currentUser.age, [Validators.min(0)]],
      pronouns: [this.currentUser.pronouns],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const updatedUser: AppUser = {
        ...this.currentUser,
        ...this.editProfileForm.value,
      };

      console.log('Updated User:', updatedUser);
      // Call your backend service to save the changes
    }
  }
}
