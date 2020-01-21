import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/shared/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  grant_type = 'password';
  submitted: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {

    if(this.form.invalid) {
      return
    }
    const loginModel: LoginModel = {
      Username: this.form.get('email').value,
      Password: this.form.get('password').value,
      Grant_type: this.grant_type
    }

    this.loginService.login(loginModel).subscribe(
      response => {
        console.log(response);
        this.form.reset(),
        this.router.navigate(['/']);
      }
    )
  }
}
