export interface IUserResponseModel {
  id: number;
  name: string;
  email: string
  phoneNumber: string;
  shopId: number;
  roleId: number;
  permissions: Array<string>;
  isActive: boolean;
}
