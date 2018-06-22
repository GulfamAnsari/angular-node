import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http'
import { User } from './user';
import { map } from 'rxjs/operators';
@Injectable()
export class LoginService {
    url = 'http://localhost:4100/login'
    constructor(private http: Http,
    ) {
    }

    public login(member: any): any {
        console.log(member)
        return this.http.post(this.url, member, this.options())
            .pipe(map(this.extractData))
    }
    public options = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': userData ? userData.clientToken : ''
            })
        })
    }
    public extractData(res: Response) {
        if (res.status != 204) return res.json() || {}
        return {}
    }

}
