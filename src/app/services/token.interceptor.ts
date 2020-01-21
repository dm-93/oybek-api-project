import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.isAuthenticated()) {
            req = req.clone(
                {
                    setHeaders: {
                        Authorization: `Bearer ${this.loginService.token}`
                    }
                }
            );
        }
        console.log('interseptor', req);
        return next.handle(req);
    }

}

//jumaniyozov@oybek.com