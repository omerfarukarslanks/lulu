import {BadRequestException, Injectable} from '@nestjs/common';
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

    const isEmailAvailable = await this.checkEmailUniqueness(createCompanyDto.email);
    if (isEmailAvailable)
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
    return this.prismaService.company.findUnique({where: {id}});
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const invalidCompany = CompanyValidation.updateCompanyDtoValidation(updateCompanyDto);
    if (invalidCompany)
      throw new BadRequestException(null, invalidCompany);

    const isEmailAvailable = await this.checkEmailUniqueness(updateCompanyDto.email);
    if (!!isEmailAvailable && id !== isEmailAvailable.id)
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
    const company = await this.prismaService.company.update({where: {id}, data: {isActive}})
    return CompanyResponse.fromCompanyToEntity(company);
  }

  checkEmailUniqueness(email: string) {
    return this.prismaService.company.findUnique({where: {email}})
  }
}
