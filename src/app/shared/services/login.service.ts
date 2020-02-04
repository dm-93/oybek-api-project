import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, concatMap } from 'rxjs/operators';
import { AuthServerResponse } from '../models/auth-server-response.models';
import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public error$: Subject<string> = new Subject<string>();
  public currentUser$: Subject<CurrentUser> = new Subject<CurrentUser>()
  
  constructor(private http: HttpClient) {}

  get token() {
    const expDate = new Date(+sessionStorage.getItem('expiresIn'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return sessionStorage.getItem('accessToken');
  }

  login(loginModel: LoginModel): Observable < any > {
    const payload = `username=${encodeURIComponent(loginModel.Username)}&password=${encodeURIComponent(loginModel.Password)}&grant_type=password`;
    return this.http.post < any > ('http://demo.oybek.com/oauth/token', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      concatMap((response) => {
        this.setToken(response);
        let url = 'http://demo.oybek.com/api/User/Details';
        return this.http.get < CurrentUser > (url).pipe(
          tap(userInfoResponse => {
            if (!!userInfoResponse) {
              this.currentUser$.next(userInfoResponse);
              sessionStorage.setItem('role', userInfoResponse.Data.Role)
            }
          })
        )
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logout() {
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('role') === 'Admin' ? true : false
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error.error.error_description;
    if (message === 'Invalid credentials') {
      this.error$.next('Invalid credentials');
    }
    return throwError(error);
  }

  private setToken(serverResponse: AuthServerResponse | null) {
    const expDate = new Date(new Date().getTime() + +serverResponse.expires_in * 1000);
    if (serverResponse) {
      sessionStorage.setItem('accessToken', serverResponse.access_token);
      sessionStorage.setItem('token_type', serverResponse.token_type);
      sessionStorage.setItem('expiresIn', expDate.toString());
    } else {
      sessionStorage.clear();
    }
  }
}
