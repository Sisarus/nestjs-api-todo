import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtGuard } from "src/auth/guard";
import { PasswordDto } from "./dto";
import { UserService } from "./user.service";

@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(JwtGuard)
  @Put('changePassword')
  changePassword(dto: PasswordDto) {
    return this.userService.changePassword(dto);
  }
}