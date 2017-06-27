import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AvelowAuthService } from './avelow-auth-service.service';
import { AvelowAuthGuard } from './avelow-auth.guard';
export declare class AvelowRolesGuard implements CanActivate {
    private authGuard;
    private authService;
    private router;
    decodedToken: any;
    constructor(authGuard: AvelowAuthGuard, authService: AvelowAuthService, router: Router);
    canActivate(route: ActivatedRouteSnapshot): boolean;
}
