import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AvelowAuthService } from './avelow-auth-service.service';
import { AVELOW_AUTH_CONFIG, AvelowAuthConfig } from './avelow-auth-config';

@Injectable()
export class AvelowAuthGuard implements CanActivate {

    constructor(private authService: AvelowAuthService, private router: Router,
                @Inject(AVELOW_AUTH_CONFIG) private config: AvelowAuthConfig) {}

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate([this.config.loginUrl]);

            return false;
        }
    }
}
