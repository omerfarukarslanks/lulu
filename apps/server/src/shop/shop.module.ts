import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import {CompanyService} from "../company/company.service";
import {PrismaService} from "@lulu/prisma";

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService, CompanyService],
  exports: [ShopService]
})
export class ShopModule {}
