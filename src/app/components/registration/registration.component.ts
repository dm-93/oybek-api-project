import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { HttpErrorResponse } from '@angular/common/http/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private registration: RegistrationService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
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
