import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Status } from '../enum';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  description: string

  @IsEnum(Status)
  @IsString()
  @IsNotEmpty()
  status: Status
}