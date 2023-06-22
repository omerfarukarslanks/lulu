import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {BcryptService, PrismaService} from "@translations-config/service";
import {UserController} from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BcryptService],
})
export class UserModule {}
