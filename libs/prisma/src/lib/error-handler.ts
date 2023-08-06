import {ErrorHandlerException} from "./error-handler-exception";

export const handlePrismaError = (err: any, moduleName?: string) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      throw new ErrorHandlerException(`${moduleName}.error-message.${err.meta.target}`, 400);
    case 'P2014':
      // handling invalid id errors
      throw new ErrorHandlerException(`Invalid ID: ${err.meta.target}`, 400);
    case 'P2003':
      // handling invalid data errors
      throw new ErrorHandlerException(`Invalid input data: ${err.meta.target}`, 400);
    case 'P2025':
      // handling invalid data errors
      throw new ErrorHandlerException(`${moduleName}.error-message.not-found-${moduleName}`, 500);
    default:
      // handling all other errors
      throw new ErrorHandlerException(`${err.message}`, 500);
  }
};
