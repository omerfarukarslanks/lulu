import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {RoleEnum} from "@lulu/model";
import {ROLES_KEY} from "@lulu/decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    return requiredRoles.some((requiredRole) => requiredRole === user?.role);
  }
}
