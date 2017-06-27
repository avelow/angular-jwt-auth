import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import {AVELOW_AUTH_CONFIG, AvelowAuthConfig} from './index';

import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AvelowAuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
      private http: Http,
      @Inject(AVELOW_AUTH_CONFIG) private config: AvelowAuthConfig) {}

  authenticate(username: string, password: string) {
    let body = new URLSearchParams();
    body.append(this.config.usernameParam, username);
    body.append(this.config.passwordParam, password);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});

    return this.http
        .post(this.config.apiUrl, body.toString(), options)
        .map((data: Response) => data.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }

  decodedToken(): any {
    let token = localStorage.getItem(this.config.tokenName);

    return this.jwtHelper.decodeToken(token);
  }

  logout() {
    localStorage.removeItem(this.config.tokenName);
  }

  loggedIn() {
    return tokenNotExpired(this.config.tokenName);
  }
}
