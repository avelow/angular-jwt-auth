import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AvelowJwtAuthService } from './avelow-jwt-auth.service';
import { AVELOW_JWT_AUTH_CONFIG, AvelowJwtAuthConfig } from './avelow-jwt-auth.config';

@Injectable()
export class AvelowJwtAuthGuard implements CanActivate {

    constructor(private authService: AvelowJwtAuthService, private router: Router,
                @Inject(AVELOW_JWT_AUTH_CONFIG) private config: AvelowJwtAuthConfig) {}

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate([this.config.loginUrl]);

            return false;
        }
    }
}
