(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/http'), require('@angular/router'), require('angular2-jwt'), require('rxjs/Observable'), require('rxjs/add/operator/map'), require('rxjs/add/operator/catch'), require('rxjs/add/observable/throw')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/http', '@angular/router', 'angular2-jwt', 'rxjs/Observable', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/add/observable/throw'], factory) :
	(factory((global['avelow-auth'] = global['avelow-auth'] || {}),global._angular_core,global._angular_common,global._angular_http,global._angular_router,global.angular2Jwt,global.rxjs_Observable));
}(this, (function (exports,_angular_core,_angular_common,_angular_http,_angular_router,angular2Jwt,rxjs_Observable) { 'use strict';

var AvelowAuthService$$1 = (function () {
    /**
     * @param {?} http
     * @param {?} config
     */
    function AvelowAuthService$$1(http, config) {
        this.http = http;
        this.config = config;
        this.jwtHelper = new angular2Jwt.JwtHelper();
    }
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    AvelowAuthService$$1.prototype.authenticate = function (username, password) {
        var /** @type {?} */ body = new _angular_http.URLSearchParams();
        body.append(this.config.usernameParam, username);
        body.append(this.config.passwordParam, password);
        var /** @type {?} */ headers = new _angular_http.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var /** @type {?} */ options = new _angular_http.RequestOptions({ headers: headers });
        return this.http
            .post(this.config.apiUrl, body.toString(), options)
            .map(function (data) { return data.json(); })
            .catch(function (error) { return rxjs_Observable.Observable.throw(error.json()); });
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
        return angular2Jwt.tokenNotExpired(this.config.tokenName);
    };
    return AvelowAuthService$$1;
}());
AvelowAuthService$$1.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
AvelowAuthService$$1.ctorParameters = function () { return [
    { type: _angular_http.Http, },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [AVELOW_AUTH_CONFIG,] },] },
]; };

var AVELOW_AUTH_CONFIG = new _angular_core.InjectionToken('avelow.auth.config');

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
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
AvelowAuthGuard.ctorParameters = function () { return [
    { type: AvelowAuthService$$1, },
    { type: _angular_router.Router, },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [AVELOW_AUTH_CONFIG,] },] },
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
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
AvelowRolesGuard.ctorParameters = function () { return [
    { type: AvelowAuthGuard, },
    { type: AvelowAuthService$$1, },
    { type: _angular_router.Router, },
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
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_http.HttpModule,
                ],
                declarations: [],
                exports: [
                    _angular_http.HttpModule
                ]
            },] },
];
/**
 * @nocollapse
 */
AvelowAuthModule.ctorParameters = function () { return []; };

exports.AvelowAuthModule = AvelowAuthModule;
exports.AVELOW_AUTH_CONFIG = AVELOW_AUTH_CONFIG;
exports.AvelowAuthService = AvelowAuthService$$1;
exports.AvelowAuthGuard = AvelowAuthGuard;
exports.AvelowRolesGuard = AvelowRolesGuard;

Object.defineProperty(exports, '__esModule', { value: true });

})));
