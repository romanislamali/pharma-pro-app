import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  users: User[] = [];
  userId = 1;

  userForm!: FormGroup;
  roles = ['USER', 'ADMIN', 'MANAGER'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required],
    });
  }

  registerUser() {
    if (this.userForm.invalid) return;

    const newUser: User = {
      id: this.userId++,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
    };

    this.users.push(newUser);
    this.userForm.reset({ role: 'USER' });
  }

}
