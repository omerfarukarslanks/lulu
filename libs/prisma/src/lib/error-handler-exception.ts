import {HttpException} from "@nestjs/common";

export class ErrorHandlerException extends HttpException{
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
