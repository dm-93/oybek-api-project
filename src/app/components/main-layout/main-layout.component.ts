import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  isAdmin: boolean;
  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
    this.isAdmin = this.loginService.isAdmin();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

}
