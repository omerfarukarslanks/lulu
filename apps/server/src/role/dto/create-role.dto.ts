import {IsNotEmpty} from "class-validator";
import {PermissionDto} from "./permission.dto";

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Name cannot be empty'
  })
  name: string;

  @IsNotEmpty({
    message: 'Permissions cannot be empty'
  })
  permissions: Array<PermissionDto>;
  isActive: boolean;
}
