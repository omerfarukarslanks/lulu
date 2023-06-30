import {IsNotEmpty} from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Name cannot be empty'
  })
  name: string;

  @IsNotEmpty({
    message: 'Permissions cannot be empty'
  })
  permissions: Array<string>;
}
