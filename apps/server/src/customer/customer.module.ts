import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import {BcryptService, PrismaService} from "@translations-config/service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, BcryptService],
})
export class CustomerModule {}
