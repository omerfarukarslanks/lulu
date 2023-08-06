import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {PrismaService} from "@lulu/prisma";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
  exports: [CompanyService]
})
export class CompanyModule {}
