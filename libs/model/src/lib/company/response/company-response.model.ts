import {CompanyType} from "@prisma/client";

export interface ICompanyResponseModel {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: CompanyType | null;
  isActive: boolean
}
