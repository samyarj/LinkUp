import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUser, Pronouns } from '../../../interfaces/user.interface';
import { ProfileService } from '../../../services/profile-service/profile.service';

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

  user!: AppUser;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

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

      this.saveUser();
    }
  }

  saveUser() {
    this.profileService.getIfUserExist(this.user.id).subscribe({
      next: (existingUser) => {
        if (existingUser) {
          this.profileService.updateUser(this.user).subscribe({
            next: (updatedUser) => {
              console.log('User updated:', updatedUser);
            },
            error: (error) => {
              console.error('Error updating user:', error);
            },
          });
        } else {
          this.profileService.createUser(this.user).subscribe({
            next: (createdUser) => {
              console.log('User created:', createdUser);
            },
            error: (error) => {
              console.error('Error creating user:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error checking if user exists:', error);
        // Assuming that if there's an error, the user does not exist
        this.profileService.createUser(this.user).subscribe({
          next: (createdUser) => {
            console.log('User created:', createdUser);
          },
          error: (error) => {
            console.error('Error creating user:', error);
          },
        });
      },
    });
  }
}
