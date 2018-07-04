import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';
export const TOKEN_NAME: string = 'jwt_token';
@Injectable()
export class AuthService {
  url = '/login'
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { 
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    console.log('in')
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    console.log(!(date.valueOf() > new Date().valueOf()))
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user): any{
    return this.http
      .post(this.url, user, { headers: this.headers })
  }

}