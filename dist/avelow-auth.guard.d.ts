import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AvelowAuthService } from './avelow-auth-service.service';
import { AvelowAuthConfig } from './avelow-auth-config';
export declare class AvelowAuthGuard implements CanActivate {
    private authService;
    private router;
    private config;
    constructor(authService: AvelowAuthService, router: Router, config: AvelowAuthConfig);
    canActivate(): boolean;
}
