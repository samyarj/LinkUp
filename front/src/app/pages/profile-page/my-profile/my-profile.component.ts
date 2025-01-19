import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUser } from '../../../interfaces/user.interface';
import { ProfileService } from '../../../services/profile-service/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  @Input() user!: AppUser;
  @Output() userUpdated = new EventEmitter<AppUser>();
  editProfileForm!: FormGroup;
  pronounsOptions: string[] = ['He/Him', 'She/Her', 'They/Them', 'Other'];
  avatarOptions: string[] = [];
  selectedAvatar: string = '';


  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.loadAvatars();
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId && !this.user.id) {
        this.loadUserData(userId);
      } else {
        this.initializeForm();
      }
    });
  }

  selectAvatar(avatar: string): void {
    this.selectedAvatar = avatar;
    this.user.avatar = avatar;
    this.emitUserUpdate();
  }


  private loadUserData(userId: string): void {
    this.profileService.getIfUserExist(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.initializeForm();
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      },
    });
  }
  // Initialize the form with current user data
  private initializeForm(): void {
    this.editProfileForm = this.fb.group({
      username: [
        this.user.username,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [{ value: this.user.email, disabled: true }],
      description: [this.user.description],
      isProfilePublic: [this.user.isPublic],
      avatar: [this.user.avatar],
      age: [this.user.age, [Validators.min(0)]],
      pronouns: [this.user.pronouns],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editProfileForm.valid) {
      this.user = {
        ...this.user,
        ...this.editProfileForm.value,
        avatar: this.selectedAvatar,
      };
      this.emitUserUpdate();
      this.saveUser();
    }
  }

  saveUser() {
    this.profileService.createUser(this.user).subscribe({
      next: (createdUser) => {
        console.log('User created:', createdUser);

      },
      error: (error) => {
        console.error('Error creating user:', error);
      },
    });
  }
      

  private loadAvatars(): void {
    this.avatarOptions = Array.from({ length: 6 }, (_, i) => `avatar${i + 1}.png`);
  }
  private emitUserUpdate(): void {
    this.userUpdated.emit(this.user);
  }
}


