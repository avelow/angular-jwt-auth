import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AvelowAuthGuard } from './avelow-auth.guard';
import { AvelowRolesGuard } from './avelow-roles.guard';
import { AvelowAuthService } from './avelow-auth-service.service';
import { AVELOW_AUTH_CONFIG, AvelowAuthConfig } from './avelow-auth-config';

export * from './avelow-auth-config';
export * from './avelow-auth-service.service';
export * from './avelow-auth.guard';
export * from './avelow-roles.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,

  ],
  declarations: [],
  exports: [
      HttpModule
  ]
})
export class AvelowAuthModule {
  static forRoot(AVELOW_AUTH_DI_CONFIG: AvelowAuthConfig): ModuleWithProviders {
      return {
      ngModule: AvelowAuthModule,
      providers: [
          {
              provide: AVELOW_AUTH_CONFIG,
              useValue: AVELOW_AUTH_DI_CONFIG
          },
          AvelowAuthService,
          AvelowAuthGuard,
          AvelowRolesGuard
      ]
    };
  }
}
