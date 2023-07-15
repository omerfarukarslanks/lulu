import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {RoleEnum} from "@lulu/model";
import {ROLE_KEY} from "@lulu/decorator";
import {RoleService} from "../../../../apps/server/src/role/role.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleService: RoleService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride<RoleEnum>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const role = await this.roleService.findRoleById(user.roleId);
    return requiredRole === role?.name;
  }
}
