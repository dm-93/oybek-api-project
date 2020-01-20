import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { UserRegistrationResponse } from '../shared/models/user-registration-response.model';
import { UserModel } from '../shared/models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  register(user: UserModel): Observable<UserRegistrationResponse> {
    const url = 'http://demo.oybek.com/api/User/Register'
    return this.http.post<UserRegistrationResponse>(url, user).pipe(
      catchError(this.handleError.bind(this)) 
    );
  }

   private handleError(error: HttpErrorResponse) {
    const message: string = error.error.Error;
    switch (message) {
      case 'Duplicate email':
        this.error$.next('Duplicate email');
        break;
    }
    return throwError(error);
  }
}
