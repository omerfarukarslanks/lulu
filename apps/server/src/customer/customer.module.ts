import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import {ShopService} from "../shop/shop.service";
import {UserService} from "../user/user.service";
import {CompanyService} from "../company/company.service";
import {BcryptService, PrismaService} from "@lulu/service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, BcryptService, ShopService, UserService, CompanyService],
})
export class CustomerModule {}