
import { IsNotEmpty, IsString } from "class-validator"

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  name: string

  description: string

  @IsNotEmpty()
  status: string
}