import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import {PrismaService} from "@lulu/service";
import {CompanyService} from "../company/company.service";

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService, CompanyService],
})
export class ShopModule {}
