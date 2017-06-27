import { Http } from '@angular/http';
import { AvelowAuthConfig } from './index';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export declare class AvelowAuthService {
    private http;
    private config;
    jwtHelper: JwtHelper;
    constructor(http: Http, config: AvelowAuthConfig);
    authenticate(username: string, password: string): Observable<any>;
    decodedToken(): any;
    logout(): void;
    loggedIn(): boolean;
}
