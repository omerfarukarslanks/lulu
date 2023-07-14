import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from "./user.controller";
import {BcryptService, PrismaService} from "@lulu/service";
import {ShopService} from "../shop/shop.service";
import {CompanyService} from "../company/company.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BcryptService, ShopService, CompanyService],
})
export class UserModule {
}
