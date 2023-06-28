import {RoleEnum} from "@translations-config/model";
import {SetMetadata} from "@nestjs/common";

export const TokenDecodeDecorator = (token: string) => SetMetadata('Authorization', token);
