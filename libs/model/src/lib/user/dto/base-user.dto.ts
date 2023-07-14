export interface BaseUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  shopId: number;
  roleIds: Array<number>;
  isActive: boolean;
}
