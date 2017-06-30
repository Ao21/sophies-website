import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
	selector: 'login-page',
	templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.login();
  }
}
