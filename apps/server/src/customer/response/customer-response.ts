import {Customer} from "../entities/customer.entity";

export class CustomerResponse {
  id: number
  static fromUserEntity(entity: Customer) {
    const response = new CustomerResponse();
    response.id = entity.id;
    return response;
  }
}
