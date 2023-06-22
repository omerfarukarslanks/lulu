import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {CustomerModule} from "../customer/customer.module";
import {PassportModule} from "@nestjs/passport";
import {CustomerService} from "../customer/customer.service";
import {BcryptService, PrismaService} from "@translations-config/service";
import {jwtConstants} from "@translations-config/model";

@Module({
  controllers: [AuthController],
  providers: [AuthService, CustomerService, PrismaService, BcryptService],
  imports: [
    PassportModule,CustomerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ]
})
export class AuthModule {}
