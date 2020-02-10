import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { UserModel, UserExtendedModel } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: Array < UserModel > = [];
  collectionSize: number;
  pageNumber: number;
  currentPage: number;

  constructor(
    private loginService: LoginService,
    private userManagService: UserManagementService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userManagService.getUsers().subscribe(
      response => {
        this.collectionSize = response.PageInfo.TotalPages * 30;
        this.currentPage = response.PageInfo.CurrentPage;
        this.usersList = response.Data;
      }
    );
  }

  onChangePage() {
    this.userManagService.getUsers(this.currentPage).subscribe(
      response => {
        this.collectionSize = response.PageInfo.TotalPages * 30;
        this.currentPage = response.PageInfo.CurrentPage;
        this.usersList = response.Data;
      })
  }

  selectUser(user: UserExtendedModel) {
    this.userManagService.$selectedUser.next(user);
    console.log(this.userManagService.$selectedUser.getValue());
  }
}
