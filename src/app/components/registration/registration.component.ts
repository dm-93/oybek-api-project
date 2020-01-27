import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { PassMatchValidator } from 'src/app/shared/validators/pass-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router, 
    private registration: RegistrationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required,Validators.minLength(6),]]
    }, {
      validator: PassMatchValidator.checkPasswords('password', 'passwordConfirmation')
    });
    console.log(this.form);
  }

  signUp() {

    if(this.form.invalid) {
      return;
    }
    const user = Object.assign({}, this.form.value);
    this.registration.register(user).subscribe(responce => {
      if(responce.Success)
      {
        this.router.navigate(['login']);
      }
    },
    (err: HttpErrorResponse) => {
      return console.log('Problem: ' + err.message, 'Error: ' + err.error);
    })
  }

}
