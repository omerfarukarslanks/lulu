import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import {BcryptService, PrismaService} from "@lulu/service";
import {ShopService} from "../shop/shop.service";
import {UserService} from "../user/user.service";
import {CustomerService} from "../customer/customer.service";
import {CompanyService} from "../company/company.service";
import {RoleService} from "../role/role.service";

@Module({
  controllers: [SupplierController],
  providers: [SupplierService, PrismaService, BcryptService, ShopService, UserService, CustomerService, CompanyService, RoleService],
})
export class SupplierModule {}
