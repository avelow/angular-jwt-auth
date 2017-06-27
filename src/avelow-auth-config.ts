import { InjectionToken } from '@angular/core';

export let AVELOW_AUTH_CONFIG = new InjectionToken<AvelowAuthConfig>('avelow.auth.config');
export interface AvelowAuthConfig {
    loginUrl: string;
    apiUrl: string;
    tokenName: string;
    usernameParam: string;
    passwordParam: string;
}
