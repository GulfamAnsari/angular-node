import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http'
import { User } from './user';
import { map } from 'rxjs/operators';
import {AuthService} from './../guards/auth.service';
@Injectable()
export class LoginService {
    url = 'http://localhost:4100/login'
    checkurl = 'http://localhost:4100/check'
    constructor(private http: Http,
        private authService:AuthService
    ) {
    }

    public login(member: any): any {
        return this.authService.login(member)
        .pipe(map(this.extractData))
    }
    public options = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': userData ? userData.token : '',
                withCredentials:true
            })
        })
    }
    public extractData(res: Response) {
        if (res.status != 204) return res.json() || {}
        return {}
    }

    public checkLogin() {
        return this.http.get(this.checkurl, this.options())
            .pipe(map(this.extractData))
    }

}
