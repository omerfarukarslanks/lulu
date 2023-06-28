import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {BcryptService, PrismaService} from "@translations-config/service";
import {UserController} from "./user.controller";
import {CompanyService} from "../company/company.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BcryptService, CompanyService],
})
export class UserModule {}
