import {Customer} from "../entities/customer.entity";

export class CustomerResponse {
  id: number;
  name: string;
  email: string
  phoneNumber: string;
  static fromUserEntity(entity: Customer) {
    const response = new CustomerResponse();
    response.id = entity.id;
    response.name = entity.name
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    return response;
  }
}
