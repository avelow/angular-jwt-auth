import { Inject, Injectable, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Headers, Http, HttpModule, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

var AvelowAuthService$$1 = (function () {
    /**
     * @param {?} http
     * @param {?} config
     */
    function AvelowAuthService$$1(http, config) {
        this.http = http;
        this.config = config;
        this.jwtHelper = new JwtHelper();
    }
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    AvelowAuthService$$1.prototype.authenticate = function (username, password) {
        var /** @type {?} */ body = new URLSearchParams();
        body.append(this.config.usernameParam, username);
        body.append(this.config.passwordParam, password);
        var /** @type {?} */ headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var /** @type {?} */ options = new RequestOptions({ headers: headers });
        return this.http
            .post(this.config.apiUrl, body.toString(), options)
            .map(function (data) { return data.json(); })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    /**
     * @return {?}
     */
    AvelowAuthService$$1.prototype.decodedToken = function () {
        var /** @type {?} */ token = localStorage.getItem(this.config.tokenName);
        return this.jwtHelper.decodeToken(token);
    };
    /**
     * @return {?}
     */
    AvelowAuthService$$1.prototype.logout = function () {
        localStorage.removeItem(this.config.tokenName);
    };
    /**
     * @return {?}
     */
    AvelowAuthService$$1.prototype.loggedIn = function () {
        return tokenNotExpired(this.config.tokenName);
    };
    return AvelowAuthService$$1;
}());
AvelowAuthService$$1.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AvelowAuthService$$1.ctorParameters = function () { return [
    { type: Http, },
    { type: undefined, decorators: [{ type: Inject, args: [AVELOW_AUTH_CONFIG,] },] },
]; };

var AVELOW_AUTH_CONFIG = new InjectionToken('avelow.auth.config');

var AvelowAuthGuard = (function () {
    /**
     * @param {?} authService
     * @param {?} router
     * @param {?} config
     */
    function AvelowAuthGuard(authService, router, config) {
        this.authService = authService;
        this.router = router;
        this.config = config;
    }
    /**
     * @return {?}
     */
    AvelowAuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate([this.config.loginUrl]);
            return false;
        }
    };
    return AvelowAuthGuard;
}());
AvelowAuthGuard.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AvelowAuthGuard.ctorParameters = function () { return [
    { type: AvelowAuthService$$1, },
    { type: Router, },
    { type: undefined, decorators: [{ type: Inject, args: [AVELOW_AUTH_CONFIG,] },] },
]; };

var AvelowRolesGuard = (function () {
    /**
     * @param {?} authGuard
     * @param {?} authService
     * @param {?} router
     */
    function AvelowRolesGuard(authGuard, authService, router) {
        this.authGuard = authGuard;
        this.authService = authService;
        this.router = router;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    AvelowRolesGuard.prototype.canActivate = function (route) {
        if (this.authGuard.canActivate()) {
            this.decodedToken = this.authService.decodedToken();
            if (this.decodedToken.roles.some(function (userRole) { return route.data['roles'].includes(userRole); })) {
                return true;
            }
            else {
                this.router.navigate([route.data['accessDeniedUrl']]);
                return false;
            }
        }
    };
    return AvelowRolesGuard;
}());
AvelowRolesGuard.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AvelowRolesGuard.ctorParameters = function () { return [
    { type: AvelowAuthGuard, },
    { type: AvelowAuthService$$1, },
    { type: Router, },
]; };

var AvelowAuthModule = (function () {
    function AvelowAuthModule() {
    }
    /**
     * @param {?} AVELOW_AUTH_DI_CONFIG
     * @return {?}
     */
    AvelowAuthModule.forRoot = function (AVELOW_AUTH_DI_CONFIG) {
        return {
            ngModule: AvelowAuthModule,
            providers: [
                {
                    provide: AVELOW_AUTH_CONFIG,
                    useValue: AVELOW_AUTH_DI_CONFIG
                },
                AvelowAuthService$$1,
                AvelowAuthGuard,
                AvelowRolesGuard
            ]
        };
    };
    return AvelowAuthModule;
}());
AvelowAuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpModule,
                ],
                declarations: [],
                exports: [
                    HttpModule
                ]
            },] },
];
/**
 * @nocollapse
 */
AvelowAuthModule.ctorParameters = function () { return []; };

export { AvelowAuthModule, AVELOW_AUTH_CONFIG, AvelowAuthService$$1 as AvelowAuthService, AvelowAuthGuard, AvelowRolesGuard };
