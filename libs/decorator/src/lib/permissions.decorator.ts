import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';
import {ApiBearerAuth} from "@nestjs/swagger";

/*export const RequirePermissions = (...permissions: PermissionEnum[]) => {
  return applyDecorators(SetMetadata(PERMISSIONS_KEY, permissions), UseGuards(AuthGuard, PermissionsGuard), ApiBearerAuth())
};*/
