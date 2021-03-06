import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { LoginService } from './login.service'
import { User } from './user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = ''
  public password: string = ''
  public errorMessage: string = ''
  user: User;
  constructor(
    private titleService: Title,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('This is login page');
    this.loginService.checkLogin().subscribe(
      res => {
        if (res) {
          this.user = res
          this.loginSuccessful(res)
          this.router.navigate(['/dashboard'])
        }
      },
      error => {
        if (error) {
        }
      }
    )
  }

  private login() {
    this.loginService.login({
      email: this.email,
      password: this.password
    })
      .subscribe(
        res => {
          if (res) {
            this.user = res
            this.loginSuccessful(res)
          }
        },
        error => {
          if (error) {
            this.errorMessage = 'Please check your email or password'
          }
        }
      )
  }

  private loginSuccessful(user) {
    this.setUserDetails(user)
    this.router.navigate(['/dashboard'])
  }

  private setUserDetails(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public signup() {
    this.router.navigate(['/signup'])
  }
}
