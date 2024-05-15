import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { BlogUserModule } from '@project/blog-user';
import { getJwtOptions } from '@project/account-configuration';
import { NotifyModule } from '@project/account-notify';

import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
  ]
})
export class AuthenticationModule {}
