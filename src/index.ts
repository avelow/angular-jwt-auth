import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AvelowJwtAuthGuard } from './avelow-jwt-auth.guard';
import { AvelowJwtRolesGuard } from './avelow-jwt-roles.guard';
import { AvelowJwtAuthService } from './avelow-jwt-auth.service';
import { AVELOW_JWT_AUTH_CONFIG, AvelowJwtAuthConfig } from './avelow-jwt-auth.config';

export * from './avelow-jwt-auth.config';
export * from './avelow-jwt-auth.service';
export * from './avelow-jwt-auth.guard';
export * from './avelow-jwt-roles.guard';

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
export class AvelowJwtAuthModule {
  static forRoot(AVELOW_JWT_AUTH_DI_CONFIG: AvelowJwtAuthConfig): ModuleWithProviders {
      return {
      ngModule: AvelowJwtAuthModule,
      providers: [
          {
              provide: AVELOW_JWT_AUTH_CONFIG,
              useValue: AVELOW_JWT_AUTH_DI_CONFIG
          },
          AvelowJwtAuthService,
          AvelowJwtAuthGuard,
          AvelowJwtRolesGuard
      ]
    };
  }
}
