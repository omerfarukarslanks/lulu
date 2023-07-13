import {CreateRoleDto, UpdateRoleDto} from "@lulu/model";

export class RoleValidation {
  static createRoleValidation(role: CreateRoleDto) {
    if(!role?.name)
      return 'role.validation.name-required';
    if(role?.permissions && role?.permissions?.length > 0) {
      role.permissions.forEach(permission => {
        if(!permission?.name)
          return 'role.validation.permission-name-required';
        if(!permission?.description)
          return 'role.validation.permission-description-required';
      })
    }
  }

  static updateRoleValidation(role: UpdateRoleDto) {
    if(!role?.name)
      return 'role.validation.name-required';
    if(role?.permissions && role?.permissions?.length > 0) {
      role.permissions.forEach(permission => {
        if(!permission?.name)
          return 'role.validation.permission-name-required';
        if(!permission?.description)
          return 'role.validation.permission-description-required';
      })
    }
  }
}
