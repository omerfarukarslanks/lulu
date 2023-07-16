import {CustomerType} from "@prisma/client";

export interface ICustomerResponseModel {
  name: string;
  email: string;
  phoneNumber: string;
  type: CustomerType;
  shopId: number;
  roleId: number;
  isActive: boolean;
}
