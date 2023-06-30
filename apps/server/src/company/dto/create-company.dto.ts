import {IsNotEmpty} from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty({
    message: 'Name cannot be empty'
  })
  name: string;
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  email: string;
}
