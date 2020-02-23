import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    
    this.userForm =this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      role: ['', Validators.required],
      
    })
  }

  onSubmit() {
    this.authService.register(this.userForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  gotoList() {
    this.router.navigate(['login']);
  }

}
