import {CompanyType} from "@prisma/client";

export interface BaseCompanyDto {
  name: string;
  email: string;
  phoneNumber: string;
  isActive?: boolean;
  type: CompanyType;
}
