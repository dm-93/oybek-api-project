import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { UserModel, UserExtendedModel } from '../models/user.model';
import { UsersListModel } from '../models/users-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private managementUrl: string = 'http://demo.oybek.com/api/UserManagement';
  public $selectedUser: BehaviorSubject<UserExtendedModel> = new BehaviorSubject<UserExtendedModel>(null); 

  constructor(private http: HttpClient) { }

  getUsers(pageNumber?: number): Observable<UsersListModel<UserModel>> {
    if (typeof pageNumber !== 'number' || pageNumber != pageNumber || pageNumber <= 0) {
      pageNumber = 1;
    }
    const url = `${this.managementUrl}?pageNumber=${pageNumber}`;
    return this.http.get<UsersListModel<UserModel>>(url);
  }

  updateUser(user: UserExtendedModel) {
    console.log(user);
    if(!user) {
      throw Error("user object is null");
    }
    return this.http.post<UserExtendedModel>(this.managementUrl, user);
  }
}
