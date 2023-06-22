import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';
import {PermissionEnum, PERMISSIONS_KEY} from "@translations-config/model";
import {AuthGuard, PermissionsGuard} from "@translations-config/guard";
import {ApiBearerAuth} from "@nestjs/swagger";

/*export const RequirePermissions = (...permissions: PermissionEnum[]) => {
  return applyDecorators(SetMetadata(PERMISSIONS_KEY, permissions), UseGuards(AuthGuard, PermissionsGuard), ApiBearerAuth())
};*/
