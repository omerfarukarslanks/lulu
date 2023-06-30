import {Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleController} from './role.controller';
import {PrismaService} from "@lulu/service";

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
})
export class RoleModule {
}
