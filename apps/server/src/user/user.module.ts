import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from "./user.controller";
import {BcryptService} from "@lulu/service";
import {ShopService} from "../shop/shop.service";
import {CompanyService} from "../company/company.service";
import {RoleService} from "../role/role.service";
import {PrismaService} from "@lulu/prisma";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BcryptService, ShopService, CompanyService, RoleService],
})
export class UserModule {
}
