import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PassMatchValidator } from 'src/app/shared/validators/pass-match.validator';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { UserExtendedModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserExtendedModel = this.userManage.$selectedUser.getValue();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userManage: UserManagementService
  ) { }

  ngOnInit() {
    if (!this.user) {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: [``]
      });
    }
    else {
      this.form = this.fb.group({
        firstName: [`${this.user.FirstName}`, [Validators.required]],
        lastName: [`${this.user.LastName}`, [Validators.required]],
        email: [`${this.user.Email}`, [Validators.required, Validators.email]],
        password: [`New Password`, [Validators.required, Validators.minLength(6)]],
        role:[`${this.user.Role === 'Admin' ? true : ''}`]
      });
    }
  }

  update() {
    if(this.form.invalid) {
      return
    }
    const updatedUser = {
      Email: this.form.get('email').value,
      Password: this.form.get('password').value,
      FirstName: this.form.get('firstName').value,
      LastName: this.form.get('lastName').value,
      Role: this.form.get('role').value ? 'Admin' : 'User',
      UserId: this.user.UserId,
    }
    this.userManage.updateUser(updatedUser).subscribe(resp => console.log(resp));
  }
}
