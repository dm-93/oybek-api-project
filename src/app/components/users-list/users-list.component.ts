import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { UserModel } from 'src/app/shared/models/user.model';

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
    private Router: Router
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

}
