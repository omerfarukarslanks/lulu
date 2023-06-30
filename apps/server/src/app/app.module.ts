import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";
import {CompanyModule} from "../company/company.module";
import {RoleModule} from "../role/role.module";

@Module({
  imports: [UserModule, AuthModule, CompanyModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
