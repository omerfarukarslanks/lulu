import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UserController} from "./user.controller";
import {CompanyService} from "../company/company.service";
import {BcryptService, PrismaService} from "@lulu/service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BcryptService, CompanyService],
})
export class UserModule {}
