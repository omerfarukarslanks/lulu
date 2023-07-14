export interface BaseSupplierDto {
  name: string;
  email: string;
  phoneNumber: string;
  roleIds: Array<string>;
  shopId: number;
  isActive: boolean;
}
