import {CustomerType} from "@prisma/client";

export interface BaseCustomerDto {
  name: string;
  email: string;
  phoneNumber: string;
  type: CustomerType;
  shopId: number;
  roleIds: Array<number>;
  isActive: boolean;
}
