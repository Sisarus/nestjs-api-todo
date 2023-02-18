import { Body, Controller, Post } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('api/v1')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signup();
  }

  @Post('signin')
  signin(@Body() dto: AuthDto){
    return this.authService.signin;
  }
}