import { InjectionToken } from '@angular/core';
export declare let AVELOW_AUTH_CONFIG: InjectionToken<AvelowAuthConfig>;
export interface AvelowAuthConfig {
    loginUrl: string;
    apiUrl: string;
    tokenName: string;
    usernameParam: string;
    passwordParam: string;
}
