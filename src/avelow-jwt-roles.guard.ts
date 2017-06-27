import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AvelowJwtAuthService } from './avelow-jwt-auth.service';
import { AvelowJwtAuthGuard } from './avelow-jwt-auth.guard';

@Injectable()
export class AvelowJwtRolesGuard implements CanActivate {
    decodedToken: any;

    constructor(
        private authGuard: AvelowJwtAuthGuard,
        private authService: AvelowJwtAuthService,
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
