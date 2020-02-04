import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { UsersListModel } from 'src/app/shared/models/users-list.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: Array < UserModel > = [];
  items = []

  constructor(
    private loginService: LoginService,
    private userManagService: UserManagementService,
    private Router: Router
  ) {}

  ngOnInit() {
    this.userManagService.getUsers(1).subscribe(
      response => {
        this.usersList = response.Data
        this.items = this.usersList
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.usersList = pageOfItems;
}

}
