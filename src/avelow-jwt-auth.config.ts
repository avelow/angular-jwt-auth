import { InjectionToken } from '@angular/core';

export let AVELOW_JWT_AUTH_CONFIG = new InjectionToken<AvelowJwtAuthConfig>('avelow.jwt.auth.config');
export interface AvelowJwtAuthConfig {
    loginUrl: string;
    apiUrl: string;
    tokenName: string;
    usernameParam: string;
    passwordParam: string;
}
