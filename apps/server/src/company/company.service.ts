import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CompanyResponse} from "./response/company.response";
import {CreateCompanyDto, UpdateCompanyDto} from "@lulu/model";
import {CompanyValidation} from "./validation/company-validation";
import {handlePrismaError, PrismaService} from "@lulu/prisma";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createCompanyDto: CreateCompanyDto) {

    try {
      const invalidCompany = CompanyValidation.createCompanyDtoValidation(createCompanyDto);
      if (invalidCompany)
        throw new BadRequestException(null, invalidCompany);

      const company = await this.prismaService.company.create({
        data: {
          email: createCompanyDto.email,
          name: createCompanyDto.name,
          isActive: createCompanyDto.isActive,
          phoneNumber: createCompanyDto.phoneNumber,
          type: createCompanyDto.type
        }
      })
      return CompanyResponse.fromEntityToResponse(company);
    } catch (err) {
      handlePrismaError(err, 'company');
    }

  }

  async findAll() {
    return this.prismaService.company.findMany();
  }

  async findOne(id: number) {
    try {
      const company = await this.findCompanyById(id);
      if (!company)
        throw new NotFoundException('', 'company.error-message.not-found-company')

      return CompanyResponse.fromEntityToResponse(company);
    } catch (err) {
      handlePrismaError(err, 'company');
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const invalidCompany = CompanyValidation.updateCompanyDtoValidation(updateCompanyDto);
      if (invalidCompany)
        throw new BadRequestException(null, invalidCompany);

      const company = await this.prismaService.company.update({
        where: {
          id
        },
        data: {
          email: updateCompanyDto.email,
          name: updateCompanyDto.name,
          phoneNumber: updateCompanyDto.phoneNumber,
          type: updateCompanyDto.type,
          isActive: updateCompanyDto.isActive
        }
      })
      return CompanyResponse.fromEntityToResponse(company);
    } catch (err) {
      handlePrismaError(err, 'company');
    }

  }

  async companyActivation(id: number, isActive: boolean) {
    try {
      const company = await this.prismaService.company.update({where: {id}, data: {isActive}})
      return CompanyResponse.fromEntityToResponse(company);
    } catch (err) {
      handlePrismaError(err, 'company');
    }

  }

  async checkEmailUniquenessCountByEmailOrById(email: string, id?: number) {
    if (id)
      return this.prismaService.company.count({where: {AND: {email, NOT: {id}}}});
    return this.prismaService.company.count({where: {email}});
  }

  async findCompanyCountById(id: number) {
    return this.prismaService.company.count({where: {id}});
  }

  async findCompanyById(id: number) {
    return this.prismaService.company.findUnique({where: {id}});
  }
}
