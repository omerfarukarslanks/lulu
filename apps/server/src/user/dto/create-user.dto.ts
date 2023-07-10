import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";

export class CreateUserDto {
  id: number;

  @IsNotEmpty({
    message: 'Name cannot be empty'
  })
  name: string;

  @IsNotEmpty({
    message: 'Email cannot be empty'
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'PhoneNumber cannot be empty'
  })
  phoneNumber: string;

  @IsNotEmpty({
    message: 'Password cannot be empty'
  })
  password: string;

  @IsNotEmpty({
    message: 'Shop cannot be empty'
  })
  @IsNumber()
  shopId: number;

  @IsNotEmpty({
    message: 'Role cannot be empty'
  })
  roleIds: Array<number>;

  isActive: boolean
}
