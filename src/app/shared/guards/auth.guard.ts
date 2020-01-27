import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private loginService: LoginService, 
        private router: Router
        ) {}
    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean |  UrlTree> | Promise<boolean |  UrlTree> {

        if (this.loginService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['login'],{
                queryParams: {
                    Authorization: false
                }
            })
        }
    }

}