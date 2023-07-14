import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CompanyResponse} from "./response/company.response";
import {PrismaService} from "@lulu/service";
import {CreateCompanyDto, UpdateCompanyDto} from "@lulu/model";
import {CompanyValidation} from "./validation/company-validation";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createCompanyDto: CreateCompanyDto) {
    const invalidCompany = CompanyValidation.createCompanyDtoValidation(createCompanyDto);
    if (invalidCompany)
      throw new BadRequestException(null, invalidCompany);

    const emailAvailableValues = await this.checkEmailUniqueness(createCompanyDto.email);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'company.error-message.duplicate-email');

    const company = await this.prismaService.company.create({
      data: {
        email: createCompanyDto.email,
        name: createCompanyDto.name,
        isActive: createCompanyDto.isActive,
        phoneNumber: createCompanyDto.phoneNumber,
        type: createCompanyDto.type
      }
    })
    return CompanyResponse.fromCompanyToEntity(company);
  }

  async findAll() {
    return this.prismaService.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prismaService.company.findUnique({where: {id}});
    if(!company) {
      throw new NotFoundException('','company.error-message.not-found-company')
    }
    return CompanyResponse.fromCompanyToEntity(company);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const findCompany = await this.prismaService.company.findUnique({where: {id}});
    if(!findCompany) {
      throw new NotFoundException('','company.error-message.not-found-company')
    }

    const invalidCompany = CompanyValidation.updateCompanyDtoValidation(updateCompanyDto);
    if (invalidCompany)
      throw new BadRequestException(null, invalidCompany);

    const emailAvailableValues = await this.checkEmailUniqueness(updateCompanyDto.email,id);
    if (emailAvailableValues?.length > 0)
      throw new BadRequestException(null, 'company.error-message.duplicate-email');

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
    return CompanyResponse.fromCompanyToEntity(company);
  }

  async companyActivation(id: number, isActive: boolean) {
    const findCompany = await this.prismaService.company.findUnique({where: {id}});
    if(!findCompany) {
      throw new NotFoundException('','company.error-message.not-found-company')
    }
    const company = await this.prismaService.company.update({where: {id}, data: {isActive}})
    return CompanyResponse.fromCompanyToEntity(company);
  }

  checkEmailUniqueness(email: string,id?: number) {
    if(id) {
      return this.prismaService.company.findMany({where: {AND: {email, NOT: {id}}}})
    }
    return this.prismaService.company.findMany({where: {email}})
  }
}
