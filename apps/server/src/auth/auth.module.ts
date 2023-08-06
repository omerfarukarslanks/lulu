import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserService} from "../user/user.service";
import {BcryptService} from "@lulu/service";
import {jwtConstants} from "@lulu/model";
import {CompanyService} from "../company/company.service";
import {ShopService} from "../shop/shop.service";
import {RoleService} from "../role/role.service";
import {PrismaService} from "@lulu/prisma";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, BcryptService, CompanyService, ShopService, RoleService],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ]
})
export class AuthModule {}
