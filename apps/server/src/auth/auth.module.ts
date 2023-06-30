import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {UserService} from "../user/user.service";
import {CompanyModule} from "../company/company.module";
import {BcryptService, PrismaService} from "@lulu/service";
import {jwtConstants} from "@lulu/model";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, BcryptService],
  imports: [
    PassportModule,UserModule, CompanyModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ]
})
export class AuthModule {}
