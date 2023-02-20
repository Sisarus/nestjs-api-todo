import {Body, Controller, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { PasswordDto } from "./dto";
import { UserService } from "./user.service";
import { GetUser} from '../auth/decorator'
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService){}


  @Put('changePassword')
  async changePassword(@Body() dto: PasswordDto, @GetUser() user: User ) {

    return this.userService.changePassword(dto, user);
  }
}