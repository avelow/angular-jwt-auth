import { ModuleWithProviders } from '@angular/core';
import { AvelowAuthConfig } from './avelow-auth-config';
export * from './avelow-auth-config';
export * from './avelow-auth-service.service';
export * from './avelow-auth.guard';
export * from './avelow-roles.guard';
export declare class AvelowAuthModule {
    static forRoot(AVELOW_AUTH_DI_CONFIG: AvelowAuthConfig): ModuleWithProviders;
}
