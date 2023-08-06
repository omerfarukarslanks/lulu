import {Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleController} from './role.controller';
import {PrismaService} from "@lulu/prisma";

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
  exports: [RoleService]
})
export class RoleModule {
}
