import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AvelowAuthService } from './avelow-auth-service.service';
import { AvelowAuthGuard } from './avelow-auth.guard';

@Injectable()
export class AvelowRolesGuard implements CanActivate {
    decodedToken: any;

    constructor(
        private authGuard: AvelowAuthGuard,
        private authService: AvelowAuthService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.authGuard.canActivate()) {
            this.decodedToken = this.authService.decodedToken();
            if (this.decodedToken.roles.some(userRole => route.data['roles'].includes(userRole))) {

                return true;
            } else {
                this.router.navigate([route.data['accessDeniedUrl']]);

                return false;
            }
        }
    }
}
