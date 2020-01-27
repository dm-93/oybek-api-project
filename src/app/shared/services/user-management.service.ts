import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UsersListModel } from '../models/users-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  getUsers(pageNumber?: number): Observable<UsersListModel<UserModel>> {
    if (typeof pageNumber !== 'number' || pageNumber != pageNumber || pageNumber <= 0) {
      pageNumber = 1;
    }
    const url = `http://demo.oybek.com/api/UserManagement?pageNumber=${pageNumber}`;
    return this.http.get<UsersListModel<UserModel>>(url);
  }
}
