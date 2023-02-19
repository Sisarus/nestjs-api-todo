import { Body, Controller, Put } from "@nestjs/common";
import { PasswordDto } from "./dto";
import { UserService } from "./user.service";

@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService){}

  @Put('changePassword')
  changePassword(@Body() dto: PasswordDto) {
    return this.userService.changePassword(dto);
  }
}