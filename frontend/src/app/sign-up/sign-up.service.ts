import {Injectable} from '@angular/core'
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { Headers, RequestOptions } from '@angular/http'
import {User} from '../login/user'

@Injectable()
export class SignupService {
    url = 'http://localhost:4100/signup'
    constructor (
        private http: Http,
    ){
    }
    register (member: any): Observable<any>{
        return this.http.post(this.url, member, this.options())
            .pipe(map(this.extractData))
            
    }
   
    public options = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': userData ? userData.token : ''
            })
        })
    }

    public extractData(res: Response) {
        if (res.status != 204) return res.json() || {}
        return {}
    }
}
